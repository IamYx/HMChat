import { NIM, NIMEStrAnyObj, NIMServiceConfig, NIMServiceName, Packet, V2NIMNotificationListener, V2NIMNotificationServiceInternal, V2NIMSendCustomNotificationParams, V2Service } from '@nimsdk/base';
export declare class V2NIMNotificationServiceStub extends V2Service<V2NIMNotificationListener> implements V2NIMNotificationServiceInternal {
    constructor(s129: NIM, t129: NIMServiceName, u129: NIMServiceConfig);
    v2ISyncOfflineSysMsgsHandler(r129: Packet): Promise<void>;
    v2ISyncBroadcastMsgHandler(q129: Packet): Promise<void>;
    v2IMarkSysMsgAck(p129: NIMEStrAnyObj[]): void;
    sendCustomNotification(m129: string, n129: string, o129?: V2NIMSendCustomNotificationParams | undefined): Promise<void>;
    onLoginStart(l129: string): Promise<void>;
    onLoginFinished(k129: string): Promise<void>;
    onLogout(): void;
}
