import { V2NIMMessageCustomAttachment } from '@nimsdk/base';
import CRBaseService from '../../base/CRBaseService';
import V2NIMChatroomClient from '../../../V2NIMChatroomClient';
import CRMessageCreatorInternal from '../../../internal/CRMessageCreatorInternal';
import { V2NIMChatroomMessage } from '../../../sdk/types';
export default class CRMessageCreatorImpl extends CRBaseService implements CRMessageCreatorInternal {
    defaultNosSceneName: string;
    constructor(n28: V2NIMChatroomClient);
    createCustomMessageWithAttachment(k28: V2NIMMessageCustomAttachment, l28: number): V2NIMChatroomMessage;
    createTextMessage(i28: string): V2NIMChatroomMessage;
    createFileMessage(d28: string, e28?: string, f28?: string): Promise<V2NIMChatroomMessage>;
    createImageMessage(w27: string, x27?: string, y27?: string, z27?: number, a28?: number): Promise<V2NIMChatroomMessage>;
    createAudioMessage(q27: string, r27?: string, s27?: string, t27?: number): Promise<V2NIMChatroomMessage>;
    createVideoMessage(i27: string, j27?: string, k27?: string, l27?: number, m27?: number, n27?: number): Promise<V2NIMChatroomMessage>;
    /**
     * 创建位置消息
     */
    createLocationMessage(d27: number, e27: number, f27: string): V2NIMChatroomMessage;
    createCustomMessage(a27: string): V2NIMChatroomMessage;
    createForwardMessage(x26: V2NIMChatroomMessage): V2NIMChatroomMessage | null;
    createTipsMessage(v26: string): V2NIMChatroomMessage;
    private createMessage;
    private defaultMessageConfig;
    private defaultPushConfig;
    private defaultRouteConfig;
    private defaultAntispamConfig;
    fileInfo(t26: string): void;
    md5(s26: string): Promise<string>;
}
