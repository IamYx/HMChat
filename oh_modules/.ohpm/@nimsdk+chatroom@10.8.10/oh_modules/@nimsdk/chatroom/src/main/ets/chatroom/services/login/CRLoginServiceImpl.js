import { DisconnectType, registerParser, V2NIMErrorCode, V2NIMErrorImpl, validate } from '@nimsdk/base';
import CRLoginAuthenticator from './CRLoginAuthenticator';
import CRLoginLifeCycle, { CRLoginLifeCycleEvent } from './CRLoginLifeCycle';
import { cmdConfigCRLogin, cmdMapCRLogin } from '@nimsdk/base';
import CRLoginReconnect from './CRLoginReconnect';
import { chatroomLoginRules } from './rules';
import CRBaseService from '../base/CRBaseService';
import { V2NIMLoginStatus } from '../../sdk/loginTypes';
import { CRLoginParams } from './CRLoginParams';
import { CRLoginPromise } from './CRLoginPromise';
import { registerCRAspect } from './Aspect';
import { HarmonyNetConnectionReceiverCR } from '../utils/HarmonyNetworkCR';
const TAG = '[CRLoginServiceImpl]';
export default class CRLoginServiceImpl extends CRBaseService {
    constructor(n11) {
        super('loginService', n11);
        registerParser(n11, { cmdMap: cmdMapCRLogin, cmdConfig: cmdConfigCRLogin });
        n11.loginService = this;
        this.loginParams = new CRLoginParams(n11);
        this.loginPromise = new CRLoginPromise(n11);
        this.lifeCycle = new CRLoginLifeCycle(n11);
        this.reconnect = new CRLoginReconnect(n11);
        this.authenticator = new CRLoginAuthenticator(n11);
        this.netConnectionReceiver = new HarmonyNetConnectionReceiverCR(n11.logger);
        registerCRAspect(CRLoginServiceImpl);
    }
    async login(h11, i11, j11) {
        this.logger.info(TAG, `login:roomId: ${i11}, enterParams: ${JSON.stringify(j11, null, 2)}`);
        validate(chatroomLoginRules, { appkey: h11, roomId: i11, enterParams: j11 }, '', true);
        const k11 = await this.smoothLogin(h11, i11, j11);
        if (k11 !== null) {
            return k11;
        }
        await this.loginParams.setParams(h11, i11, j11);
        this.resetTimerManager(j11.timeout);
        try {
            const m11 = await this.multiTryDoLogin();
            this.core.emit('onChatroomEntered');
            this.loginPromise.timerDestroy();
            return m11;
        }
        catch (l11) {
            this.loginPromise.timerDestroy();
            throw l11;
        }
    }
    resetTimerManager(f11) {
        this.loginPromise.resetTimerManager(f11, (g11) => {
            this.lifeCycle.processEvent(CRLoginLifeCycleEvent.LoginFail, g11);
            this.lifeCycle.processEvent(CRLoginLifeCycleEvent.Exited, g11);
        });
    }
    get clientSocket() {
        return this.core.clientSocket;
    }
    reset() {
        this.loginParams.reset();
        this.reconnect.reset();
        this.authenticator.reset();
    }
    ping() {
        return this.clientSocket.ping();
    }
    async multiTryDoLogin(z10) {
        let a11 = new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_INTERNAL,
            detail: { reason: 'loginFailed' }
        });
        for (let b11 = 0; b11 < this.loginParams.linkAddresses.length; b11++) {
            this.logger.info(TAG, `try Login: ${b11 + 1}th`);
            try {
                this.loginPromise.originLoginPromise = z10 ? z10 : this.doLogin(false);
                z10 = undefined;
                const e11 = await this.loginPromise.originLoginAdd();
                this.loginPromise.resetPromise();
                return e11;
            }
            catch (c11) {
                a11 = c11 || a11;
                this.logger.error(TAG, `login failed, try: ${b11}, : ${a11?.code}, ${a11?.message}`);
                this.reconnect.clearReconnectTimer();
                const d11 = this.loginParams.checkLoginTerminalCode(a11 && a11.code);
                if (d11 || (a11 && a11.code === V2NIMErrorCode.V2NIM_ERROR_CODE_SERVER_UNIT_ERROR)) {
                    this.lifeCycle.processEvent(CRLoginLifeCycleEvent.Exited, a11);
                    throw a11;
                }
            }
        }
        this.lifeCycle.processEvent(CRLoginLifeCycleEvent.Exited, a11);
        throw a11;
    }
    async doLogin(w10) {
        const x10 = w10 ? true : this.loginParams.connectParams.forceMode ? this.authenticator
            .checkAutoLogin() :
            false;
        await this.loginPromise.doLoginAdd(this.clientSocket.connect(this.loginParams.getNextLink(), w10));
        const y10 = await this.loginPromise.doLoginAdd(this.authenticator.verifyAuthentication(x10));
        this.lifeCycle.processEvent(CRLoginLifeCycleEvent.LoginSucc, undefined, { ...y10, isReconnect: w10 });
        this.clientSocket.resetSocketConfig();
        this.reconnect.reset();
        this.clientSocket.ping();
        this.core.localAntispamUtil.syncLocalAntispam();
        this.prevLoginResult = y10;
        return y10;
    }
    async smoothLogin(t10, u10, v10) {
        if (this.getLoginStatus() === V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED) {
            return await this.smoothForLogined(t10, u10, v10);
        }
        else if (this.getLoginStatus() === V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINING) {
            return await this.smoothForLogining(t10, u10, v10);
        }
        return null;
    }
    async smoothForLogined(p10, q10, r10) {
        const s10 = this.loginParams.checkIsSameLogin(p10, q10, r10);
        this.logger.warn(TAG, `smoothForLogined ${s10}`);
        if (s10) {
            return this.prevLoginResult;
        }
        else {
            await this.logout();
            return await this.login(p10, q10, r10);
        }
    }
    async smoothForLogining(l10, m10, n10) {
        const o10 = this.loginParams.checkIsSameLogin(l10, m10, n10);
        this.loginPromise.previousClear();
        this.reconnect.reset();
        if (o10) {
            if (!this.loginPromise.originLoginPromise) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INTERNAL,
                    detail: { reason: 'NoPreviousLoginExists' }
                });
            }
            this.reconnect.reset();
            await Promise.resolve();
            return await this.multiTryDoLogin(this.loginPromise.originLoginPromise);
        }
        else {
            this.loginPromise.doLoginClear();
            this.clientSocket.doDisconnect(DisconnectType.ACTIVE, 'Aborted');
            this.reset();
            this.lifeCycle.processEvent(CRLoginLifeCycleEvent.Logout);
            await Promise.resolve();
            return this.login(l10, m10, n10);
        }
    }
    async logout() {
        this.loginPromise.clearAll();
        const j10 = this.getConnectStatus();
        const k10 = this.getLoginStatus();
        await this.lifeCycle.setLoginStatus(k10, j10, new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_DISCONNECT,
            detail: {
                reason: 'disconnect due to logout'
            }
        }));
    }
    getConnectStatus() {
        return this.lifeCycle.getConnectStatus();
    }
    getLoginStatus() {
        return this.lifeCycle.getLoginStatus();
    }
    getRoomId() {
        return this.loginParams.roomId;
    }
    v2LoginHandler(i10) {
        if (i10.error) {
            this.clientSocket.doDisconnect(DisconnectType.ACTIVE, i10.error);
            throw i10.error;
        }
        return i10;
    }
    v2ChatroomBeKickedHandler(e10) {
        const f10 = e10.content;
        const { kickedReason: g10, serverExtension: h10 } = f10;
        this.clientSocket.doDisconnect(DisconnectType.KICKED, g10);
        this.lifeCycle.processEvent(CRLoginLifeCycleEvent.Kicked, new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_DISCONNECT,
            detail: {
                reason: 'disconnect due to kicked'
            }
        }), g10);
        this.core.emit('onChatroomKicked', {
            kickedReason: g10,
            serverExtension: h10
        });
    }
    sdkLogUploadHandler() {
        this.core.logger.info(TAG, `receive log update order`);
        this.core.eventBus.emit('CRLoggerServiceImpl/onUploadLogFiles');
    }
}
