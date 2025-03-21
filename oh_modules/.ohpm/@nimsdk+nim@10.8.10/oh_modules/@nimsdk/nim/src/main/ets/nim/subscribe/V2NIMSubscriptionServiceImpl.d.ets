import { NIM, NIMServiceConfig, NIMServiceName, V2NIMCustomUserStatusParams, V2NIMCustomUserStatusPublishResult, V2NIMSubscribeListener, V2NIMSubscribeUserStatusOption, V2NIMSubscriptionServiceInternal, V2NIMUnsubscribeUserStatusOption, V2NIMUserStatusSubscribeResult, V2Service } from '@nimsdk/base';
import { SubscriptionCloud } from './Cloud';
export default class V2NIMSubscriptionServiceImpl extends V2Service<V2NIMSubscribeListener> implements V2NIMSubscriptionServiceInternal {
    constructor(h140: NIM, i140: NIMServiceName, j140: NIMServiceConfig);
    private _cloud?;
    get cloud(): SubscriptionCloud;
    onLoginStart(f140: string): Promise<void>;
    onLoginFinished(e140: string): Promise<void>;
    onLogout(): void;
    /**
     * 订阅用户状态，包括在线状态，或自定义状态
     * 单次订阅人数最多100，如果有较多人数需要调用，需多次调用该接口
     * 如果同一账号多端重复订阅， 订阅有效期会默认后一次覆盖前一次时长
     * 总订阅人数最多3000， 被订阅人数3000，在线状态事件订阅是单向的
     */
    subscribeUserStatus(a140: V2NIMSubscribeUserStatusOption): Promise<string[]>;
    /**
     * 取消订阅用户状态。返回值为取消订阅失败的用户列表
     */
    unsubscribeUserStatus(w139: V2NIMUnsubscribeUserStatusOption): Promise<string[]>;
    /**
     * 发布用户自定义状态。如果默认在线状态不满足业务需求，可以发布自定义用户状态
     */
    publishCustomUserStatus(s139: V2NIMCustomUserStatusParams): Promise<V2NIMCustomUserStatusPublishResult>;
    /**
     * 查询用户状态订阅关系。
     * 输入账号列表，查询自己订阅了哪些账号列表，返回订阅账号列表
     */
    queryUserStatusSubscriptions(q139: string[]): Promise<Array<V2NIMUserStatusSubscribeResult>>;
    /**
     * 14-2
     * @param packet
     */
    private v2OnUserStatusChangeHandler;
    /**
     * 14-9
     * @param packet
     */
    private v2OnMultiUserStatusChangeHandler;
    private registerInnerService;
    private unRegisterInnerService;
}
