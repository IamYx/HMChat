import { DisconnectType, IM_ELITE_SDK_VERSION, IM_ELITE_SDK_VERSION_HUMAN, V2NIMErrorCode, V2NIMLoginClientType } from '@nimsdk/base';
import bundleManager from "@ohos.bundle.bundleManager";
import deviceInfo from '@ohos.deviceInfo';
import HashMap from "@ohos.util.HashMap";
import { CRLoginLifeCycleEvent } from './CRLoginLifeCycle';
import { ChatroomLoginRequest } from './cloud/CRLoginRequest';
const TAG = '[CRLoginAuthenticator]';
export default class CRLoginAuthenticator {
    constructor(l8) {
        this.lastLoginClientKey = '__NIM_LAST_LOGIN_CLIENT__';
        this.lastLoginClientMap = new HashMap();
        this.core = l8;
        this.loginService = l8.loginService;
        this.context = this.core.context;
    }
    async verifyAuthentication(b8) {
        try {
            this.core.logger.info(TAG + `verifyAuthentication: ${b8}`);
            const e8 = this.createChatroomLoginTags(b8, this.loginService.loginParams.enterParams);
            const f8 = await this.createLoginTags(b8);
            this.loginService.lifeCycle.processEvent(CRLoginLifeCycleEvent.LoginStart);
            const g8 = new ChatroomLoginRequest(2, e8, f8);
            const h8 = (await this.loginService.loginPromise.doLoginAdd(this.loginService.clientSocket.sendCmd('v2ChatroomLogin', g8)));
            const { chatroomInfo: i8, chatroomMember: j8, chatroomCdnInfo: k8 } = h8.content;
            this.lastLoginClientMap.set(this.lastLoginClientKey, JSON.stringify({
                account: this.loginService.core.options.account,
                deviceId: this.core.config.deviceId
            }));
            this.core.logger.info(TAG + `verifyAuthentication success: ${JSON.stringify(i8)},${JSON.stringify(j8)}`);
            return {
                chatroom: i8,
                selfMember: j8
            };
        }
        catch (c8) {
            const d8 = c8;
            if (d8.code === V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED || d8.code === V2NIMErrorCode.V2NIM_ERROR_CODE_TIMEOUT) {
                throw d8;
            }
            this.processLoginFailed(d8);
            throw d8;
        }
    }
    reset() {
        this.lastLoginClientMap.clear();
    }
    checkAutoLogin() {
        try {
            const x7 = this.lastLoginClientMap.get(this.lastLoginClientKey);
            if (!x7) {
                return false;
            }
            const y7 = JSON.parse(x7);
            const z7 = y7.deviceId;
            const a8 = y7.account;
            if (z7 === this.core.config.deviceId && a8 === this.core.options.account) {
                return true;
            }
        }
        catch (w7) {
            return false;
        }
    }
    processLoginFailed(v7) {
        this.loginService.clientSocket.doDisconnect(DisconnectType.ACTIVE, v7);
        if (this.loginService.loginParams.checkLoginTerminalCode(v7.code)) {
            this.reset();
        }
        this.loginService.lifeCycle.processEvent(CRLoginLifeCycleEvent.LoginFail, v7);
    }
    async createLoginTags(t7) {
        const u7 = await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_DEFAULT);
        return {
            clientType: V2NIMLoginClientType.V2NIM_LOGIN_CLIENT_TYPE_HARMONY,
            appkey: this.core.options.appkey,
            clientVersion: IM_ELITE_SDK_VERSION,
            bundleId: u7.name,
            protocolVersion: 1,
            clientSession: this.core.config.clientSession,
            os: deviceInfo.osFullName,
            deviceId: this.core.config.deviceId,
            deviceModel: deviceInfo.productModel,
            deviceInfo: JSON.stringify({
                PRODUCT: deviceInfo.productModel,
                DEVICE: deviceInfo.deviceType,
                MANUFACTURER: deviceInfo.manufacture,
                BRAND: deviceInfo.brand,
                MODEL: deviceInfo.hardwareModel,
            }),
            manualLogin: t7 ? 0 : 1,
            vendor: deviceInfo.manufacture,
            sdkHumanVersion: IM_ELITE_SDK_VERSION_HUMAN,
            sdkType: 1,
            userAgent: 'Native/' + IM_ELITE_SDK_VERSION_HUMAN,
            appAccount: this.core.options.account,
            customClientType: this.core.options.customClientType,
            authType: this.loginService.loginParams.authType,
            loginExt: this.loginService.loginParams.loginExt,
            loginToken: this.loginService.loginParams.token
        };
    }
    createChatroomLoginTags(q7, r7) {
        const s7 = {
            appkey: this.core.options.appkey,
            account: this.core.options.account,
            deviceId: this.core.config.deviceId,
            chatroomId: this.loginService.loginParams.roomId,
            appLogin: q7 ? 0 : 1,
            chatroomNick: r7?.roomNick,
            chatroomAvatar: r7?.roomAvatar || '',
            serverExtension: r7?.serverExtension,
            notificationExtension: r7?.notificationExtension,
            clientSession: this.core.config.clientSession,
            isAnonymous: this.loginService.loginParams.isAnonymous,
            notifyTargetTags: r7?.tagConfig?.notifyTargetTags,
            authType: this.loginService.loginParams.authType,
            loginExt: this.loginService.loginParams.loginExt,
            x: r7?.locationConfig?.locationInfo?.x,
            y: r7?.locationConfig?.locationInfo?.y,
            z: r7?.locationConfig?.locationInfo?.z,
            distance: r7?.locationConfig?.distance,
            antiSpamBusinessId: r7?.antispamConfig?.antispamBusinessId
        };
        if (r7?.tagConfig?.tags?.length > 0) {
            s7.tags = r7?.tagConfig?.tags;
        }
        return s7;
    }
}
