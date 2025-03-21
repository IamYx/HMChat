import pushService from '@hms.core.push.pushService';
import { NIM_DATABASE_NAME_MAIN } from '@nimsdk/base';
import { registerParser, V2NIMErrorCode, V2NIMErrorImpl, V2NIMErrorMap, V2Service } from '@nimsdk/base';
import { registerAspect } from './Aspect';
import { PushCloud } from './cloud/PushCloud';
import { PushModel } from './model/PushModel';
import { cmdConfigPush, cmdMapPush } from '@nimsdk/base';
const TAG = "[V2NIMPushServiceImpl]";
const PUSH_TOKEN_NAME = "DEMO_HMOS_PUSH";
const CUSTOM_PUSH_CONTENT_TYPE = "";
const EXPIRE_TIME_GAP = 24 * 60 * 60 * 1000;
export class V2NIMPushServiceImpl extends V2Service {
    constructor(d97, e97, f97) {
        super(e97, d97);
        this.config = f97;
        registerParser(d97, { cmdMap: cmdMapPush, cmdConfig: cmdConfigPush });
        registerAspect(V2NIMPushServiceImpl, d97);
    }
    async onLoginStart(b97) {
        try {
            this.core.logger.info(TAG, 'onLoginStart', b97);
            this.registerInnerService(this.core);
        }
        catch (c97) {
            this.core.logger.error(TAG, 'onLoginStart', c97);
        }
    }
    async onLoginFinished(z96) {
        try {
            this.afterLogin();
        }
        catch (a97) {
            this.core.logger.error(TAG, 'onLoginFinished', a97);
        }
    }
    onLogout() {
        this.core.logger.info(TAG, 'onLogout');
        this.unRegisterInnerService();
    }
    async afterLogin() {
        if (await this.model.getPushEnable()) {
            this.doEnablePushToken();
        }
        else {
            this.doDisablePushToken();
        }
    }
    afterSync() {
        throw new Error('Method not implemented.');
    }
    clearNotification() {
        throw new Error('Method not implemented.');
    }
    hasPushed() {
        throw new Error('Method not implemented.');
    }
    async enable(y96) {
        this.core.logger.info(TAG, `call API enable`, y96);
        if (y96) {
            await this.model.updatePushEnable(true);
            return this.doEnablePushToken();
        }
        else {
            await this.model.updatePushEnable(false);
            return this.doDisablePushToken();
        }
    }
    async isEnable() {
        this.core.logger.info(TAG, `call API isEnable`);
        return await this.model.getPushEnable();
    }
    async doRegisterPushToken() {
        let v96 = "";
        try {
            v96 = await pushService.getToken();
            this.logger.info(TAG, `Push, Get push token successfully: ${v96}`);
            this.model.updatePushToken(v96);
            return v96;
        }
        catch (w96) {
            let x96 = w96;
            this.logger.error(TAG, 'Push, Get push token catch error: ' + x96.code + ' ' + x96.message);
            throw new V2NIMErrorImpl({
                code: V2NIMErrorMap.V2NIM_ERROR_CODE_REGISTER_PUSH_SDK_FAILED.code,
                desc: V2NIMErrorMap.V2NIM_ERROR_CODE_REGISTER_PUSH_SDK_FAILED.message,
                detail: {
                    reason: 'Push, Get push token catch error: ' + x96.code + ' ' + x96.message,
                    rawError: x96
                }
            });
        }
    }
    async doEnablePushToken() {
        const p96 = await this.model.getPushTokenExpireTime();
        let q96 = false;
        if (p96 < Date.now()) {
            q96 = true;
        }
        let r96 = "";
        if (!q96) {
            const u96 = await this.model.getPushToken();
            if (typeof u96 === 'undefined' || u96.length <= 0) {
                q96 = true;
            }
            else {
                q96 = false;
                r96 = u96;
            }
        }
        if (q96) {
            r96 = await this.doRegisterPushToken();
            const t96 = Date.now() + EXPIRE_TIME_GAP;
            this.model.updatePushTokenExpireTime(t96);
        }
        const s96 = this.config.harmonyCertificateName ?? PUSH_TOKEN_NAME;
        this.logger.info(TAG, `doRegisterPushToken doSendPushToken, pushTokenName: ${s96}, pushToken: ${r96}, customPushContentType: ${CUSTOM_PUSH_CONTENT_TYPE}`);
        await this.cloud.doSendPushToken(s96, r96, CUSTOM_PUSH_CONTENT_TYPE);
    }
    async doDisablePushToken() {
        this.logger.info(TAG, `doDisablePushToken doSendPushToken, pushTokenName: "", pushToken: "", customPushContentType: ""`);
        return await this.cloud.doSendPushToken("", "", "");
    }
    get model() {
        if (this._model) {
            return this._model;
        }
        else {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: { reason: `V2NIMPushService model is unavailable` }
            });
        }
    }
    get cloud() {
        if (this._cloud) {
            return this._cloud;
        }
        else {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: { reason: 'V2NIMPushService cloud is unavailable' }
            });
        }
    }
    registerInnerService(n96) {
        let o96 = n96.databaseService.getDatabase(n96, NIM_DATABASE_NAME_MAIN);
        this._model = new PushModel(n96, o96);
        this._cloud = new PushCloud(n96);
    }
    unRegisterInnerService() {
        this._model = undefined;
        this._cloud = undefined;
    }
}
