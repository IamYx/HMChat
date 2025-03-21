import { assignOptions, cmdConfigLogin, cmdMapLogin, conflictCmdConfigLogin, conflictCmdMapLogin, DisconnectType, guid, LBS_DEFAULT, LINK_DEFAULT, LoginLifeCycleEvent, LoginTraceStep, PromiseManager, registerParser, TimerManager, V2NIMConnectStatus, V2NIMDataSyncLevel, V2NIMDataSyncLevelValues, V2NIMErrorCode, V2NIMErrorImpl, V2NIMLoginAuthType, V2NIMLoginAuthTypeValues, V2NIMLoginClientChange, V2NIMLoginStatus, V2Service, validate, ValidateErrorV2 } from '@nimsdk/base/';
import { get, pick } from '@nimsdk/vendor';
import { HMNetConnection } from '../link/websocket/HMNetConnection';
import { V2ClientSocketImpl } from '../link/websocket/V2ClientSocketImpl';
import { registerAspect } from './Aspect';
import { GetChatroomLinkAddressRequest, KickOfflineRequest } from './cloud/LoginRequest';
import { formatBeKickedTag, getLoginClients } from './Format';
import { LoginTraceReporter } from './LoginTraceReporter';
import V2NIMLoginAuthenticator from './V2NIMLoginAuthenticator';
import V2NIMLoginDataSync from './V2NIMLoginDataSync';
import V2NIMLoginLbs from './V2NIMLoginLbs';
import V2NIMLoginLifeCycle from './V2NIMLoginLifeCycle';
import V2NIMLoginReconnect from './V2NIMLoginReconnect';
const defaultLoginOption = {
    retryCount: 3,
    timeout: 30000,
    forceMode: false,
    authType: V2NIMLoginAuthType.V2NIM_LOGIN_AUTH_TYPE_DEFAULT,
    syncLevel: V2NIMDataSyncLevel.V2NIM_DATA_SYNC_TYPE_LEVEL_FULL
};
const TAG = '[LoginService]';
export default class V2NIMLoginServiceImpl extends V2Service {
    constructor(s90, t90, u90) {
        super(t90, s90);
        this.account = '';
        this.previousLoginAccount = '';
        this.token = '';
        this.deviceId = '';
        this.clientSession = '';
        this.kickedDetail = null;
        this.loginFailedCount = 0;
        this.debug = false;
        this.context = s90.context;
        this.loginReporter = new LoginTraceReporter(s90);
        registerParser(s90, {
            cmdMap: cmdMapLogin, cmdConfig: cmdConfigLogin
        });
        registerParser(s90, {
            cmdMap: conflictCmdMapLogin, cmdConfig: conflictCmdConfigLogin
        });
        this.previousLoginManager = new PromiseManager();
        this.doLoginStepsManager = new PromiseManager();
        this.loginTimerManager = new TimerManager();
        this.loginOption = assignOptions({}, defaultLoginOption);
        this.config = {
            lbsUrls: LBS_DEFAULT,
            linkUrl: LINK_DEFAULT,
        };
        this.setOptions(u90);
        s90.loginService = this;
        this.clientSocket = new V2ClientSocketImpl(this.core);
        this.lifeCycle = new V2NIMLoginLifeCycle(s90);
        this.reconnect = new V2NIMLoginReconnect(s90);
        this.lbs = new V2NIMLoginLbs(s90);
        this.authenticator = new V2NIMLoginAuthenticator(s90);
        this.dataSync = new V2NIMLoginDataSync(s90);
        this.netConnectionReceiver = new HMNetConnection(s90.logger);
        registerAspect(V2NIMLoginServiceImpl, s90);
    }
    onLoginStart(r90) {
        return this.core.logger.info(TAG, 'login onLoginStart receive self');
    }
    onLoginFinished(q90) {
        return this.core.logger.info(TAG, 'login onLoginFinished self');
    }
    sendCmd(n90, o90, p90) {
        return this.clientSocket.sendCmd(n90, o90, p90);
    }
    ping() {
        return this.clientSocket.ping();
    }
    doDisconnect(l90, m90) {
        this.clientSocket.doDisconnect(l90, m90);
    }
    setOptions(k90) {
        validate({
            lbsUrls: {
                type: 'array',
                itemType: 'string',
                min: 1,
                required: false
            },
            linkUrl: {
                type: 'string', allowEmpty: false, required: false
            },
            supportProtocolFamily: {
                type: 'number', allowEmpty: false, required: false
            },
        }, k90, '', true);
        this.config = assignOptions(this.config, k90);
    }
    checkIllegalState() {
        if (!this.getLoginUser()) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE
            });
        }
    }
    async login(e90, f90, g90 = {}) {
        this.core.logger.info(TAG, 'call API login start', e90, f90, g90);
        this.loginTrace(LoginTraceStep.loginStart);
        this.core.preferenceSync.put('login_count', 0);
        if (!e90) {
            throw new ValidateErrorV2({
                detail: {
                    reason: 'Empty account'
                }
            });
        }
        validate({
            retryCount: {
                type: 'number', min: 1, required: false
            },
            forceMode: {
                type: 'boolean', required: false
            },
            authType: {
                type: 'enum', values: V2NIMLoginAuthTypeValues, required: false
            },
            syncLevel: {
                type: 'enum', values: V2NIMDataSyncLevelValues, required: false
            }
        }, g90, '', true);
        g90 = assignOptions(defaultLoginOption, g90);
        this.core.logger.info(TAG, 'setup sync level', g90.syncLevel);
        this.dataSync.setup(g90.syncLevel);
        if (g90.authType === 0 && !f90) {
            this.core.logger.error(TAG, 'authType is 0, token cannot be empty');
            throw new ValidateErrorV2({
                detail: {
                    reason: 'When authType is 0, token cannot be empty'
                }
            });
        }
        if (this.previousLoginAccount !== '' && this.previousLoginAccount !== e90) {
            this.core.logger.warn(TAG, 'login account change logout');
            await this.core.onLogout();
        }
        this.deviceId = await this.core.preference.get('__NIM_DEVC_ID__', "");
        this.clientSession = await this.core.preference.get('__NIM_CLIENT_SESSION_ID__', "");
        if (!this.deviceId || !this.clientSession) {
            this.deviceId = guid();
            this.clientSession = guid();
            this.core.logger.info(TAG, 'deviceId & clientSession', this.deviceId, this, this.clientSession);
            await this.core.preference.put('__NIM_DEVC_ID__', this.deviceId);
            await this.core.preference.put('__NIM_CLIENT_SESSION_ID__', this.clientSession);
        }
        const h90 = await this.authenticator.checkAutoLogin(g90.forceMode, this.deviceId, e90);
        this.logger.info(TAG, 'login isLoginResume:', h90);
        if (this.getLoginStatus() === V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGOUT) {
            this.logger.info(TAG, 'smooth for login status: logout');
        }
        else if (this.getLoginStatus() === V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED) {
            this.logger.info(TAG, 'smooth for login status: logined');
            return this.smoothForLogined(e90, f90, g90);
        }
        else if (this.getLoginStatus() === V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINING) {
            this.logger.info(TAG, 'smooth for login status: logining');
            return this.smoothForLogining(e90, f90, g90, h90);
        }
        this.account = e90;
        this.token = f90;
        this.previousLoginAccount = e90;
        this.loginOption = g90;
        this.kickedDetail = null;
        this.core.logger.info(TAG, 'login info', this.account, f90, this.previousLoginAccount, this.loginOption);
        this.loginTimerManager.destroy();
        this.loginTimerManager.addTimer(() => {
            const j90 = new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_TIMEOUT,
                detail: {
                    reason: 'Login API timeout'
                }
            });
            this.loginTrace(LoginTraceStep.loginTimeout, JSON.stringify(j90));
            this.logger.error(TAG, 'Login API timeout');
            this.previousLoginManager.clear(j90);
            this.doLoginStepsManager.clear(j90);
            this.originLoginPromise = undefined;
            this.lifeCycle.processEvent(LoginLifeCycleEvent.LoginFail, j90);
        }, this.loginOption.timeout, 1);
        try {
            await this.multiTryDoLogin(h90);
            this.loginTimerManager.destroy();
        }
        catch (i90) {
            this.loginTimerManager.destroy();
            this.logger.error(TAG, 'multiTryDoLogin', i90);
            this.loginTrace(LoginTraceStep.loginFailed, i90);
            if (i90 instanceof V2NIMErrorImpl) {
                throw i90;
            }
            else {
                throw new V2NIMErrorImpl({
                    desc: `Caught an exception: ${JSON.stringify(i90)}`
                });
            }
        }
        this.core.logger.info(TAG, 'call API login end', e90);
    }
    async doLogin(y89, z89) {
        this.core.logger.info(TAG, `doLogin isReconnect: ${y89}, isLoginResume: ${z89}`);
        const a90 = y89 ? true : z89;
        if (!y89) {
            this.core.logger.info(TAG, 'doLogin wait db open start is not reconnect');
            const d90 = Date.now();
            await this.core.databaseService.justBeforeOnLogin(this.account);
            await this.core.onLoginStart(this.account);
            await this.core.databaseService.notifyDatabaseReady(this.account);
            this.core.logger.info(TAG, 'doLogin wait db open duration', Date.now() - d90);
        }
        const b90 = await this.doLoginStepsManager.add(this.lbs.getLink());
        this.core.logger.info(TAG, `doLogin get lbs link: ${b90} autoConnect: ${a90}`);
        await this.doLoginStepsManager.add(this.clientSocket.connect(b90, y89));
        this.core.logger.info(TAG, `doLogin steps manager add clientSocket`);
        const c90 = await this.doLoginStepsManager.add(this.authenticator.verifyAuthentication(a90, this.deviceId, this.clientSession));
        this.core.logger.info(TAG, 'doLogin steps manager add verify Authentication', c90);
        this.lifeCycle.processEvent(LoginLifeCycleEvent.LoginSuccess, undefined, {
            'accountId': this.account,
            'isReconnect': y89,
            'loginResult': c90
        });
        if (!y89) {
            this.core.logger.info(TAG, 'doLogin all sync');
            await this.core.onLoginFinished(this.account);
        }
        else {
            this.core.logger.info(TAG, 'doLogin is reconnect, do sync');
            await this.core.onLoginSync(this.account);
        }
        this.core.logger.info(TAG, 'doLogin setp reset socket');
        this.clientSocket.resetSocketConfig();
        this.core.logger.info(TAG, `doLogin setp reset reconent`);
        this.reconnect.reset();
        this.core.logger.info(TAG, `doLogin setp ping keep`);
        this.clientSocket.ping();
        this.core.logger.info(TAG, 'login result:', c90);
        return c90;
    }
    async smoothForLogined(u89, v89, w89) {
        const x89 = this.checkIsSameLogin(u89, v89, w89);
        this.logger.info(TAG, 'smoothForLogined', x89);
        if (x89) {
            return;
        }
        else {
            this.logger.info(TAG, 'smoothForLogined is not same account, do logout', u89, v89, w89);
            await this.logout();
            return this.login(u89, v89, w89);
        }
    }
    async smoothForLogining(p89, q89, r89, s89) {
        const t89 = this.checkIsSameLogin(p89, q89, r89);
        this.logger.info(TAG, 'smoothForLogining', p89, q89, t89);
        this.previousLoginManager.clear();
        this.reconnect.reset();
        this.account = p89;
        this.previousLoginAccount = p89;
        this.token = q89;
        this.loginOption = assignOptions(this.loginOption, r89);
        if (t89) {
            this.logger.info(TAG, 'smoothForLogining same login');
            if (!this.originLoginPromise) {
                this.logger.info(TAG, 'smoothForLogining same login && origin login promise is nil');
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INTERNAL,
                    detail: {
                        reason: 'No previous login exists'
                    }
                });
            }
            this.reconnect.reset();
            await Promise.resolve();
            await this.multiTryDoLogin(s89, this.originLoginPromise);
        }
        else {
            this.logger.info(TAG, 'smoothForLogining is not same login, reset and logout, retry login');
            this.doLoginStepsManager.clear();
            this.doDisconnect(DisconnectType.ACTIVE, 'Aborted');
            this.onLogout();
            this.lifeCycle.processEvent(LoginLifeCycleEvent.Logout);
            await Promise.resolve();
            return this.login(p89, q89, r89);
        }
    }
    checkIsSameLogin(m89, n89, o89) {
        if (this.account === m89 && this.loginOption.authType === o89.authType) {
            if (o89.authType === V2NIMLoginAuthType.V2NIM_LOGIN_AUTH_TYPE_DEFAULT) {
                return this.token === n89;
            }
            return true;
        }
        return false;
    }
    async logout() {
        this.core.logger.info(TAG, 'call API start logout');
        this.previousLoginManager.clear();
        this.doLoginStepsManager.clear();
        this.loginTimerManager.destroy();
        this.originLoginPromise = undefined;
        const j89 = this.getConnectStatus();
        const k89 = this.getLoginStatus();
        switch (k89) {
            case V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED:
                try {
                    this.core.logger.info(TAG, 'send cmd logout status', k89);
                    await this.clientSocket.sendCmd('v2Logout', undefined, {
                        timeout: 1000
                    });
                    await this._finalizeLogout();
                }
                catch (l89) {
                    this.logger.warn(TAG, 'sendCmd:logout error', l89);
                    await this._finalizeLogout();
                }
                break;
            case V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINING:
                this.core.logger.info(TAG, 'on logging run logout', k89);
                await this._finalizeLogout();
                break;
            case V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGOUT:
                if (j89 === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_WAITING) {
                    this.core.logger.info(TAG, 'on logout run logout with waiting connect');
                    await this._finalizeLogout();
                }
                else {
                    this.core.logger.error(TAG, 'illegal logout state', k89, j89);
                    throw this._createIllegalStateError(k89, j89);
                }
                break;
            default:
                this.core.logger.error(TAG, 'default logout case', k89, j89);
                await this.core.onLogout();
                throw this._createIllegalStateError(k89, j89);
        }
    }
    getConnectStatus() {
        return this.lifeCycle.getConnectStatus();
    }
    getLoginStatus() {
        return this.lifeCycle.getLoginStatus();
    }
    getLoginUser() {
        return this.account;
    }
    getLoginClients() {
        return getLoginClients(this.authenticator.loginClients);
    }
    getCurrentLoginClient() {
        if (this.authenticator.loginClientOfThisConnection?.clientId) {
            return pick(this.authenticator.loginClientOfThisConnection, ['type', 'os', 'timestamp', 'customTag', 'customClientType', 'clientId', 'clientIP']);
        }
    }
    getDataSync() {
        const f89 = this.dataSync.datas;
        if (f89 && f89.length > 0) {
            const g89 = [];
            for (let h89 = 0; h89 < f89.length; h89++) {
                const i89 = f89[h89];
                g89.push({
                    type: i89.type, state: i89.state
                });
            }
            return g89;
        }
        else {
            return null;
        }
    }
    setReconnectDelayProvider(e89) {
        this.reconnect._setReconnectDelayProvider(e89);
    }
    async getChatroomLinkAddress(c89) {
        this.core.logger.info(TAG, 'getChatroomLinkAddress', c89);
        validate({
            roomId: {
                type: 'string', required: true, allowEmpty: false
            },
        }, {
            roomId: c89
        }, '', true);
        if (!allCharactersAreNumbers(c89)) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                detail: {
                    reason: 'roomId must be a positive number'
                }
            });
        }
        const d89 = await this.clientSocket.sendCmd('v2GetChatroomLinkAddress', new GetChatroomLinkAddressRequest(c89, 1));
        return d89.content.linkAddress;
    }
    async kickOffline(z88) {
        this.core.logger.info(TAG, 'call API kickOffline', z88);
        validate({
            clientId: {
                type: 'string', allowEmpty: false
            }
        }, z88, '', true);
        const a89 = (await this.clientSocket.sendCmd('v2KickOffline', new KickOfflineRequest([z88.clientId])));
        const b89 = get(a89, 'content.clientIds.length');
        if (b89 === 0) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_REQUEST_FAILED
            });
        }
    }
    getKickedOfflineDetail() {
        return this.kickedDetail;
    }
    onLogout() {
        this.account = '';
        this.token = '';
        this.lbs.reset();
        this.reconnect.reset();
        this.authenticator.reset();
        this.authenticator.clearLastLoginClient();
        this.dataSync.reset();
    }
    loginTrace(w88, x88, y88) {
        this.loginReporter.loginTrace(w88, x88, y88);
    }
    checkLogUpload() {
        const q88 = new Date();
        const r88 = q88.getFullYear();
        const s88 = q88.getMonth();
        const t88 = q88.getDay();
        const u88 = `${r88}` + `${s88}` + `${t88}`;
        let v88 = this.core.preferenceSync.get(u88, 0);
        if (v88 > 20) {
            this.sdkLogUploadHandler();
        }
        else {
            this.core.preferenceSync.put(u88, v88++);
        }
    }
    checkLoginTerminalCode(p88) {
        return this.authenticator.checkLoginTerminalCode(p88);
    }
    _createIllegalStateError(n88, o88) {
        return new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
            detail: {
                reason: `Illegal logout. loginStatus: ${n88}, connectStatus: ${o88}`
            }
        });
    }
    async _finalizeLogout() {
        this.doDisconnect(DisconnectType.ACTIVE, 'UserActiveDisconnect');
        await this.core.onLogout();
        this.lifeCycle.processEvent(LoginLifeCycleEvent.Logout);
    }
    async multiTryDoLogin(f88, g88) {
        this.core.logger.info(TAG, 'multiTryDoLogin', f88, g88);
        let h88 = new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_INTERNAL,
            detail: { reason: 'loginFailed' }
        });
        for (let i88 = 0; i88 <= this.loginOption.retryCount; i88++) {
            const j88 = TAG + ` times of login try: ${i88}`;
            i88 > 0 ? this.logger.warn(j88) : this.logger.info(j88);
            try {
                this.originLoginPromise = g88 ?? this.doLogin(false, f88);
                g88 = undefined;
                const m88 = await this.previousLoginManager.add(this.originLoginPromise);
                this.loginTrace(LoginTraceStep.loginSucceed, `loginCount ${i88}`);
                this.previousLoginManager.clear();
                this.doLoginStepsManager.clear();
                this.originLoginPromise = undefined;
                return m88;
            }
            catch (k88) {
                h88 =
                    k88 || h88;
                this.logger.error(TAG, `login failed, times of login try: ${i88}, err.code: ${h88?.code}, err.message: "${h88?.message}"`);
                if (h88.code !== V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED) {
                    this.logger.error(TAG, `login failed, err.code is not cannelled`);
                    this.lbs.discard();
                }
                this.reconnect.clearReconnectTimer();
                const l88 = this.checkLoginTerminalCode(h88 && h88.code);
                if (l88) {
                    this.lifeCycle.processEvent(LoginLifeCycleEvent.Exited, h88);
                    this.logger.error(TAG, 'login failed, is terminated');
                    throw h88;
                }
                if (h88 && h88.code === 399) {
                    this.logger.error(TAG, 'login failed, error code 399');
                    this.lbs.refresh();
                }
            }
        }
        this.lifeCycle.processEvent(LoginLifeCycleEvent.Exited, h88);
        throw h88;
    }
    v2LoginHandler(e88) {
        this.core.logger.info(TAG, 'v2LoginHandler', e88);
        if (e88.error) {
            this.core.logger.error(TAG, 'v2LoginHandler error', e88);
            if (this.debug) {
                e88.error.code = 415;
            }
            this.doDisconnect(DisconnectType.ACTIVE, e88.error);
            throw e88.error;
        }
        return e88;
    }
    v2LoginClientChangeHandler(d88) {
        this.core.logger.info(TAG, 'v2LoginClientChangeHandler', d88);
        this.authenticator.changeLoginClient(parseInt(get(d88.content, "state")), get(d88.content, "datas"));
    }
    nimLoginClientChangeHandler(c88) {
        this.core.logger.info(TAG, 'nimLoginClientChangeHandler', c88);
        this.authenticator.changeLoginClient(parseInt(get(c88.content, "state")), get(c88.content, "datas"));
    }
    qchatLoginClientChangeHandler(a88) {
        this.core.logger.info(TAG, 'qchatLoginClientChangeHandler', a88);
        let b88 = parseInt(get(a88.content, 'state'));
        b88 = b88 === 1 ? V2NIMLoginClientChange.V2NIM_LOGIN_CLIENT_CHANGE_LOGIN :
            V2NIMLoginClientChange.V2NIM_LOGIN_CLIENT_CHANGE_LOGOUT;
        this.authenticator.changeLoginClient(b88, [get(a88.content, 'data')]);
    }
    async v2BeKickedHandler(y87) {
        this.core.logger.info(TAG, 'v2BeKickedHandler', y87);
        if (y87.error) {
            this.core.logger.error(TAG, 'v2BeKickedHandler error', y87.error);
            return;
        }
        const z87 = formatBeKickedTag(y87.content);
        this.core.logger.warn(TAG, 'v2Bekicked::', z87);
        this.kickedDetail = z87;
        this.doDisconnect(DisconnectType.KICKED, z87);
        await this.core.onLogout();
        this.lifeCycle.processEvent(LoginLifeCycleEvent.Kicked, new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_DISCONNECT,
            detail: {
                reason: 'disconnect due to kicked'
            }
        }), z87);
        this.emit('onKickedOffline', z87);
    }
    sdkLogUploadHandler() {
        this.core.logger.info(TAG, `receive log update order`);
        this.core.eventBus.emit('LoggerServiceImpl/onUploadLogFiles');
    }
}
function allCharactersAreNumbers(x87) {
    return /^\d+$/.test(x87);
}
