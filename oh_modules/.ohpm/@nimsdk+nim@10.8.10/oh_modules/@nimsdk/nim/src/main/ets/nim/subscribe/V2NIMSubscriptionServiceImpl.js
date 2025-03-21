import { cmdConfigSubscription, cmdMapSubscription, registerParser, V2NIMErrorCode, V2NIMErrorImpl, V2Service, validate, } from '@nimsdk/base';
import { get } from '@nimsdk/vendor';
import { PublishCustomUserStatusRequest, PublishCustomUserStatusRequestTag, SubscribeUserStatusRequest, SubscribeUserStatusTag, SubscriptionCloud, UnsubscribeUserStatusRequest, UnsubscribeUserStatusTag } from './Cloud';
import { customUserStatusParams, subscribeUserStatusRule, unsubscribeUserStatusRule } from './Rules';
const TAG = '[V2NIMSubscriptionServiceImpl]';
export default class V2NIMSubscriptionServiceImpl extends V2Service {
    constructor(h140, i140, j140) {
        super(i140, h140);
        registerParser(h140, {
            cmdMap: cmdMapSubscription, cmdConfig: cmdConfigSubscription
        });
    }
    get cloud() {
        if (this._cloud) {
            return this._cloud;
        }
        else {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: {
                    reason: 'V2NIMSubscriptionService cloud is unavailable'
                }
            });
        }
    }
    async onLoginStart(f140) {
        try {
            this.core.logger.info(TAG, 'onLoginStart', f140);
            this.registerInnerService(this.core);
        }
        catch (g140) {
            this.core.logger.info(TAG, 'onLoginStart', g140);
        }
    }
    async onLoginFinished(e140) {
        this.core.logger.info(TAG, 'onLoginFinished', e140);
    }
    onLogout() {
        this.core.logger.info(TAG, 'onLogout');
        this.unRegisterInnerService();
    }
    async subscribeUserStatus(a140) {
        try {
            this.core.logger.info(TAG, 'call API subscribeUserStatus', a140);
            this.checkLogin();
            validate(subscribeUserStatusRule, a140, '', true);
            const c140 = new SubscribeUserStatusTag(1, a140.duration || 60, a140.immediateSync === undefined ? false : a140.immediateSync);
            const d140 = new SubscribeUserStatusRequest(c140, a140.accountIds);
            return this.cloud.subscribeUserStatus(d140);
        }
        catch (b140) {
            this.core.logger.error(TAG, 'subscribeUserStatus', a140, b140);
            if (b140 instanceof V2NIMErrorImpl || b140.name === 'V2NIMError') {
                throw b140;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `subscribeUserStatus ${JSON.stringify(b140)}`, rawError: b140
                    }
                });
            }
        }
    }
    async unsubscribeUserStatus(w139) {
        try {
            this.core.logger.info(TAG, 'call API unsubscribeUserStatus', w139);
            this.checkLogin();
            validate(unsubscribeUserStatusRule, w139, '', true);
            const y139 = new UnsubscribeUserStatusTag(1);
            const z139 = new UnsubscribeUserStatusRequest(y139, w139.accountIds);
            return this.cloud.unsubscribeUserStatus(z139);
        }
        catch (x139) {
            this.core.logger.error(TAG, 'unsubscribeUserStatus', w139, x139);
            if (x139 instanceof V2NIMErrorImpl || x139.name === 'V2NIMError') {
                throw x139;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `unsubscribeUserStatus ${JSON.stringify(x139)}`, rawError: x139
                    }
                });
            }
        }
    }
    async publishCustomUserStatus(s139) {
        try {
            this.core.logger.info(TAG, 'call API publishCustomUserStatus', s139);
            this.checkLogin();
            validate(customUserStatusParams, s139, '', true);
            const u139 = new PublishCustomUserStatusRequestTag(s139.statusType, s139.duration, s139.extension, s139.onlineOnly, s139.multiSync);
            const v139 = new PublishCustomUserStatusRequest(u139);
            return this.cloud.publishCustomUserStatus(v139);
        }
        catch (t139) {
            this.core.logger.error(TAG, 'publishCustomUserStatus', s139, t139);
            if (t139 instanceof V2NIMErrorImpl || t139.name === 'V2NIMError') {
                throw t139;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `publishCustomUserStatus ${JSON.stringify(t139)}`, rawError: t139
                    }
                });
            }
        }
    }
    async queryUserStatusSubscriptions(q139) {
        try {
            this.core.logger.info(TAG, 'call API queryUserStatusSubscriptions', q139);
            this.checkLogin();
            validate({
                accountIds: {
                    type: 'array',
                    required: true,
                    itemType: 'string',
                    max: 3000
                }
            }, {
                accountIds: q139
            }, '', true);
            return this.cloud.queryUserStatusSubscriptions(q139);
        }
        catch (r139) {
            this.core.logger.error(TAG, 'queryUserStatusSubscriptions', q139, r139);
            if (r139 instanceof V2NIMErrorImpl || r139.name === 'V2NIMError') {
                throw r139;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `queryUserStatusSubscriptions ${JSON.stringify(r139)}`, rawError: r139
                    }
                });
            }
        }
    }
    v2OnUserStatusChangeHandler(n139) {
        this.core.logger.info(TAG, 'call Handler v2OnUserStatusChangeHandler');
        const o139 = get(n139.content, 'data');
        const p139 = {
            accountId: o139.accountId,
            statusType: o139.statusType,
            clientType: o139.clientType,
            publishTime: o139.publishTime,
            uniqueId: o139.uniqueId,
            duration: o139.duration,
            extension: o139.extensionReceived,
            serverExtension: o139.serverExtension
        };
        if (o139.eventType === 1) {
            this.emit('onUserStatusChanged', [p139]);
        }
        else {
            this.logger.warn(TAG, 'v2OnUserStatusChangeHandler', o139);
        }
    }
    v2OnMultiUserStatusChangeHandler(i139) {
        this.core.logger.info(TAG, 'call Handler v2OnMultiUserStatusChangeHandler');
        const j139 = get(i139.content, 'data');
        const k139 = j139.filter((m139) => m139.eventType === 1).map(l139 => {
            return {
                accountId: l139.accountId,
                statusType: l139.statusType,
                clientType: l139.clientType,
                publishTime: l139.publishTime,
                uniqueId: l139.uniqueId,
                duration: l139.duration,
                extension: l139.extensionReceived,
                serverExtension: l139.serverExtension
            };
        });
        if (k139.length > 0) {
            this.emit('onUserStatusChanged', k139);
        }
    }
    registerInnerService(h139) {
        this._cloud = new SubscriptionCloud(h139);
    }
    unRegisterInnerService() {
        this._cloud = undefined;
    }
}
