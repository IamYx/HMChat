import { NIM, NIMEStrAnyObj, NIMServiceConfig, NIMServiceName, Packet, V2NIMNotificationListener, V2NIMNotificationServiceInternal, V2NIMSendCustomNotificationParams, V2Service } from '@nimsdk/base';
export default class V2NIMNotificationServiceImpl extends V2Service<V2NIMNotificationListener> implements V2NIMNotificationServiceInternal {
    constructor(b93: NIM, c93: NIMServiceName, d93: NIMServiceConfig);
    onLoginStart(a93: string): Promise<void>;
    onLoginFinished(z92: string): Promise<void>;
    onLogout(): void;
    sendCustomNotification(q92: string, r92: string, s92?: V2NIMSendCustomNotificationParams): Promise<void>;
    private markBroadcastMsgAck;
    v2ISyncOfflineSysMsgsHandler(g92: Packet): Promise<void>;
    v2ISyncBroadcastMsgHandler(b92: Packet): Promise<void>;
    v2IMarkSysMsgAck(u91: NIMEStrAnyObj[]): Promise<void>;
    private onBroadcastMsgHandler;
    /**
     * 收到系统通知, 7_3 & 21_19 & 101_3 都会触发
     *
     * 需要根据系统通知类型来区分，类型定义见 http://doc.hz.netease.com/display/MMC/SystemMsgType
     *
     * [0-4], [15-18] 分发去 v2 群模块触发群邀请，申请事件
     * [5-6] 分发去 v2 好友模块触发好友增删事件
     * [7, 8, 12] 分发去 v2 消息模块触发撤回事件(已经不需要了，因为 v2 消息模块通过接受 7-14 消息来得知撤回通知, 不再需要依赖系统通知)
     * [100-103] 直接触发 onReceiveCustomNotifications 事件
     */
    private onSysMsgHandler;
    private processSystemMessage;
}
