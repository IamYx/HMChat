import { NIM, NIMServiceConfig, NIMServiceName, Packet, V2NIMMessage, V2NIMSendCustomNotificationParams, V2NIMSendMessageParams, V2NIMSendMessageResult, V2Service, YSFListener, YSFServiceInternal } from "@nimsdk/base";
export declare class YSFServiceStub extends V2Service<YSFListener> implements YSFServiceInternal {
    constructor(z137: NIM, a138: NIMServiceName, b138: NIMServiceConfig);
    sendMessage(v137: V2NIMMessage, w137: string, x137?: V2NIMSendMessageParams | undefined, y137?: ((percentage: number) => void) | undefined): Promise<V2NIMSendMessageResult>;
    cancelMessageAttachmentUpload(u137: V2NIMMessage): Promise<void>;
    sendCustomNotification(r137: string, s137: string, t137?: V2NIMSendCustomNotificationParams | undefined): Promise<void>;
    v2IYSFSyncOfflineMsgsHandler(q137: Packet): Promise<void>;
    v2IYSFSyncSysNotificationHandler(p137: Packet): Promise<void>;
    onLoginStart(o137: string): Promise<void>;
    onLoginFinished(n137: string): Promise<void>;
    onLogout(): void;
}
