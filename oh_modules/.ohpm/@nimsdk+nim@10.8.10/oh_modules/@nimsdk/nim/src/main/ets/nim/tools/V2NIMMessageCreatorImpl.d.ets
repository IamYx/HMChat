import { NIM, NIMServiceConfig, NIMServiceName, V2NIMMessage, V2NIMMessageCallDuration, V2NIMMessageCreatorInternal, V2NIMMessageCustomAttachment, V2Service } from '@nimsdk/base';
export default class V2NIMMessageCreatorImpl extends V2Service implements V2NIMMessageCreatorInternal {
    private defaultNosSceneName;
    constructor(o151: NIM, p151: NIMServiceName, q151: NIMServiceConfig);
    createCustomMessageWithAttachment(l151: V2NIMMessageCustomAttachment, m151?: number | undefined): V2NIMMessage;
    createTextMessage(j151: string): V2NIMMessage;
    createFileMessage(e151: string, f151?: string, g151?: string): Promise<V2NIMMessage>;
    createImageMessage(x150: string, y150?: string, z150?: string, a151?: number, b151?: number): Promise<V2NIMMessage>;
    createAudioMessage(r150: string, s150?: string, t150?: string, u150?: number): Promise<V2NIMMessage>;
    createVideoMessage(j150: string, k150?: string, l150?: string, m150?: number, n150?: number, o150?: number): Promise<V2NIMMessage>;
    /**
     * 创建位置消息
     */
    createLocationMessage(e150: number, f150: number, g150: string): V2NIMMessage;
    createCustomMessage(a150: string, b150: string): V2NIMMessage;
    /**
     * 创建话单消息，接口不对外
     * @param type 话单类型， 业务自定义
     * @param channelId 话单频道ID
     * @param status 通话状态，业务自定义状态
     * @param durations 通话成员时长列表
     * @param text 话单描述
     */
    createCallMessage(t149: number, u149: string, v149: number, w149: V2NIMMessageCallDuration[], x149?: string): V2NIMMessage;
    createForwardMessage(q149: V2NIMMessage): V2NIMMessage | null;
    createTipsMessage(o149: string): V2NIMMessage;
    private createMessage;
    private defaultMessageConfig;
    private defaultPushConfig;
    private defaultRouteConfig;
    private defaultAntispamConfig;
}
export declare function getFileExtension(l149: string): string;
