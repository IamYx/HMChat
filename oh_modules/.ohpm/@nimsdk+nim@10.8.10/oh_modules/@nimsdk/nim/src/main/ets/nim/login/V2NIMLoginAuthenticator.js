import { DisconnectType, IM_ELITE_SDK_VERSION, IM_ELITE_SDK_VERSION_HUMAN, LoginLifeCycleEvent, V2NIMErrorCode, V2NIMErrorImpl, V2NIMLoginAuthType, V2NIMLoginClientChange, V2NIMLoginClientType } from '@nimsdk/base/';
import { formatLoginInfo } from './Format';
import { assign, get, remove } from '@nimsdk/vendor';
import deviceInfo from '@ohos.deviceInfo';
import bundleManager from '@ohos.bundle.bundleManager';
import { LoginRequest } from './cloud/LoginRequest';
const TAG = '[V2NIMLoginAuthenticator]';
export default class V2NIMLoginAuthenticator {
    constructor(r85) {
        this.lastLoginClientKey = '__NIM_LAST_LOGIN_CLIENT__';
        this.loginClients = [];
        this.loginClientOfThisConnection = {};
        this.core = r85;
        this.loginService = r85.loginService;
        this.context = this.core.context;
    }
    async verifyAuthentication(d85, e85, f85) {
        this.core.logger.info(TAG, 'verifyAuthentication', d85, e85, f85);
        const g85 = await this.loginService.doLoginStepsManager.add(this.refreshLoginToken(this.loginService.account));
        const h85 = await this.loginService.doLoginStepsManager.add(this.refreshThirdPartyExt(this.loginService.account));
        this.loginService.token = g85;
        const i85 = await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_DEFAULT);
        const j85 = {
            clientType: V2NIMLoginClientType.V2NIM_LOGIN_CLIENT_TYPE_HARMONY,
            appKey: this.core.options.appkey,
            clientVersion: IM_ELITE_SDK_VERSION,
            bundleId: i85.name,
            protocolVersion: 1,
            clientSession: f85,
            os: deviceInfo.osFullName,
            deviceId: e85,
            deviceModel: deviceInfo.productModel,
            deviceInfo: JSON.stringify({
                PRODUCT: deviceInfo.productModel,
                DEVICE: deviceInfo.deviceType,
                MANUFACTURER: deviceInfo.manufacture,
                BRAND: deviceInfo.brand,
                MODEL: deviceInfo.hardwareModel,
            }),
            manualLogin: d85 ? 0 : 1,
            vendor: deviceInfo.manufacture,
            customTag: this.loginService.config.customTag,
            sdkHumanVersion: IM_ELITE_SDK_VERSION_HUMAN,
            sdkType: 1,
            userAgent: 'Native/' + IM_ELITE_SDK_VERSION_HUMAN,
            appAccount: this.loginService.account,
            customClientType: this.loginService.config.customClientType,
            authType: this.loginService.loginOption.authType,
            loginExt: h85,
            loginToken: g85,
        };
        const k85 = j85;
        this.core.logger.info(TAG, 'do login');
        let l85;
        try {
            const q85 = new LoginRequest(k85);
            l85 = (await this.loginService.doLoginStepsManager.add(this.loginService.sendCmd('v2Login', q85)));
        }
        catch (o85) {
            const p85 = o85;
            this.core.logger.error(TAG, 'do login error ', p85.code, o85);
            if (p85.code === V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED || p85.code === V2NIMErrorCode.V2NIM_ERROR_CODE_TIMEOUT) {
                throw p85;
            }
            this.processLoginFailed(p85);
            throw p85;
        }
        const m85 = get(l85.content, 'data');
        const n85 = get(l85.content, 'loginClients');
        this.changeLoginClient(V2NIMLoginClientChange.V2NIM_LOGIN_CLIENT_CHANGE_LIST, n85);
        this.loginClientOfThisConnection = formatLoginInfo(m85);
        this.core.logger.info(TAG, 'save login data ', m85);
        this.core.preference.put(this.lastLoginClientKey, JSON.stringify(assign({ account: this.loginService.account }, this.loginClientOfThisConnection)));
        return this.loginClientOfThisConnection;
    }
    async refreshLoginToken(y84) {
        this.core.logger.info(TAG, 'refreshLoginToken', y84);
        if (this.loginService.loginOption.authType === V2NIMLoginAuthType.V2NIM_LOGIN_AUTH_TYPE_DEFAULT) {
            return this.loginService.token;
        }
        if (typeof this.loginService.loginOption.tokenProvider !== 'function') {
            return this.loginService.token;
        }
        try {
            const c85 = await this.loginService.loginOption.tokenProvider(y84);
            this.core.logger.info(TAG, 'refreshLoginToken tokenProvider', c85);
            if (typeof c85 === 'string') {
                return c85;
            }
            else {
                this.core.logger.error('V2NIMLoginService::excute tokenProvider complete but got Unexpected value:', c85);
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CALLBACK_FAILED,
                    detail: {
                        reason: `Excute tokenProvider complete but got Unexpected value`,
                        rawData: c85
                    }
                });
            }
        }
        catch (z84) {
            const a85 = z84;
            let b85 = a85;
            if (a85.code !== V2NIMErrorCode.V2NIM_ERROR_CODE_CALLBACK_FAILED) {
                this.core.logger.error(TAG, 'excute tokenProvider error:', a85);
                b85 = new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CALLBACK_FAILED,
                    desc: `Excute tokenProvider error`,
                    detail: {
                        rawError: z84
                    }
                });
            }
            this.processLoginFailed(a85);
            throw b85;
        }
    }
    async refreshThirdPartyExt(t84) {
        this.core.logger.info(TAG, 'refreshThirdPartyExt', t84);
        if (typeof this.loginService.loginOption.loginExtensionProvider !== 'function') {
            return '';
        }
        try {
            const x84 = await this.loginService.loginOption.loginExtensionProvider(t84);
            this.core.logger.info(TAG, 'refreshThirdPartyExt result', x84);
            if (typeof x84 === 'string') {
                return x84;
            }
            else {
                this.core.logger.error(TAG, 'excute loginExtensionProvider complete but got Unexpected value:', x84);
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CALLBACK_FAILED,
                    detail: {
                        reason: `Excute loginExtensionProvider complete but got Unexpected value`,
                        rawData: x84
                    }
                });
            }
        }
        catch (u84) {
            const v84 = u84;
            let w84 = v84;
            if (v84.code !== V2NIMErrorCode.V2NIM_ERROR_CODE_CALLBACK_FAILED) {
                this.core.logger.error(TAG, 'excute loginExtensionProvider error:', u84);
                w84 = new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CALLBACK_FAILED,
                    detail: {
                        reason: `Excute loginExtensionProvider error`,
                        rawError: u84
                    }
                });
            }
            if (this.loginService.loginOption.authType === V2NIMLoginAuthType.V2NIM_LOGIN_AUTH_TYPE_THIRD_PARTY) {
                this.processLoginFailed(v84);
                throw w84;
            }
            else {
                return '';
            }
        }
    }
    processLoginFailed(s84) {
        this.core.logger.warn(TAG, 'processLoginFailed', s84);
        this.loginService.doDisconnect(DisconnectType.ACTIVE, 'LoginFailed');
        if (this.checkLoginTerminalCode(s84.code)) {
            this.loginService.authenticator.reset();
            this.loginService.authenticator.clearLastLoginClient();
        }
        this.loginService.lifeCycle.processEvent(LoginLifeCycleEvent.LoginFail, s84);
    }
    changeLoginClient(d84, e84) {
        const f84 = e84.map((r84) => formatLoginInfo(r84));
        this.core.logger.info(TAG, 'changeLoginClient', d84, e84);
        if (d84 === V2NIMLoginClientChange.V2NIM_LOGIN_CLIENT_CHANGE_LIST) {
            this.loginClients = f84;
            const p84 = this.loginClients.map(q84 => {
                return {
                    type: q84.type,
                    os: q84.os,
                    timestamp: q84.timestamp,
                    customTag: q84.customTag,
                    customClientType: q84.customClientType,
                    clientId: q84.clientId
                };
            });
            this.loginService.emit('onLoginClientChanged', d84, p84);
        }
        else if (d84 === V2NIMLoginClientChange.V2NIM_LOGIN_CLIENT_CHANGE_LOGIN) {
            const l84 = f84.filter((m84) => {
                const n84 = this.loginClients.filter((o84) => o84.clientId === m84.clientId);
                this.loginClients.push(m84);
                return n84.length === 0;
            });
            l84.length > 0 && this.loginService.emit('onLoginClientChanged', d84, l84);
        }
        else if (d84 === V2NIMLoginClientChange.V2NIM_LOGIN_CLIENT_CHANGE_LOGOUT) {
            const g84 = f84.filter((h84) => {
                remove(this.loginClients, (k84) => k84.clientId === h84.clientId && k84.consid === h84.consid);
                const i84 = this.loginClients.filter((j84) => j84.clientId === h84.clientId);
                return i84.length === 0;
            });
            g84.length > 0 && this.loginService.emit('onLoginClientChanged', d84, g84);
        }
    }
    async checkAutoLogin(w83, x83, y83) {
        this.core.logger.info(TAG, 'checkAutoLogin', w83, x83, y83);
        if (w83)
            return false;
        const z83 = await this.core.preference.get(this.lastLoginClientKey, "");
        if (!z83) {
            return false;
        }
        let a84 = '';
        let b84 = '';
        try {
            a84 = get(JSON.parse(z83), `clientId`);
            b84 = get(JSON.parse(z83), `account`);
        }
        catch (c84) {
            return false;
        }
        if (a84 === x83 && b84 === y83) {
            return true;
        }
        else {
            return false;
        }
    }
    checkLoginTerminalCode(u83) {
        const v83 = [
            V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED,
            V2NIMErrorCode.V2NIM_ERROR_CODE_HANDSHAKE,
            302,
            317,
            V2NIMErrorCode.V2NIM_ERROR_CODE_FORBIDDEN,
            V2NIMErrorCode.V2NIM_ERROR_CODE_NOT_FOUND,
            V2NIMErrorCode.V2NIM_ERROR_CODE_PARAMETER_ERROR,
            V2NIMErrorCode.V2NIM_ERROR_CODE_MULTI_LOGIN_FORBIDDEN,
            422,
            V2NIMErrorCode.V2NIM_ERROR_CODE_IM_DISABLED,
            V2NIMErrorCode.V2NIM_ERROR_CODE_APPKEY_NOT_EXIST,
            V2NIMErrorCode.V2NIM_ERROR_CODE_BUNDLEID_CHECK_FAILED,
            V2NIMErrorCode.V2NIM_ERROR_CODE_APPKEY_BLOCKED,
            V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_TOKEN,
            V2NIMErrorCode.V2NIM_ERROR_CODE_ROBOT_NOT_ALLOWED,
            V2NIMErrorCode.V2NIM_ERROR_CODE_ACCOUNT_NOT_EXIST,
            V2NIMErrorCode.V2NIM_ERROR_CODE_ACCOUNT_BANNED,
            V2NIMErrorCode.V2NIM_ERROR_CODE_USER_PROFILE_NOT_EXIST
        ];
        return v83.includes(u83);
    }
    reset() {
        this.loginClients = [];
        this.loginClientOfThisConnection = {};
    }
    clearLastLoginClient() {
        this.core.preference.delete(this.lastLoginClientKey);
    }
}
