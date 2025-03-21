import { V2NIMMessageCustomAttachmentParser } from '@nimsdk/base';
import { V2NIMChatroomMessage, V2NIMChatroomMessageListOption, V2NIMChatroomTagMessageOption, V2NIMSendChatroomMessageParams, V2NIMSendChatroomMessageResult } from '../sdk/types';
export default interface CRMessageServiceInternal {
    sendMessage(message: V2NIMChatroomMessage, params?: V2NIMSendChatroomMessageParams, progress?: (percentage: number) => void): Promise<V2NIMSendChatroomMessageResult>;
    cancelMessageAttachmentUpload(message: V2NIMChatroomMessage): Promise<void>;
    getMessageList(option: V2NIMChatroomMessageListOption): Promise<V2NIMChatroomMessage[]>;
    getMessageListByTag(messageOption: V2NIMChatroomTagMessageOption): Promise<V2NIMChatroomMessage[]>;
    registerCustomAttachmentParser(parser: V2NIMMessageCustomAttachmentParser): void;
    unregisterCustomAttachmentParser(parser: V2NIMMessageCustomAttachmentParser): void;
    getCustomAttachmentParsers(): V2NIMMessageCustomAttachmentParser[];
}
