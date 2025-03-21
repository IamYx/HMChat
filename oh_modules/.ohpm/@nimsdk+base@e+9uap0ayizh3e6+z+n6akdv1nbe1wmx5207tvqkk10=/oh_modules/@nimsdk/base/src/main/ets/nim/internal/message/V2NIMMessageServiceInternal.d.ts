import { Packet } from '../../parser';
import { V2NIMMessage, V2NIMMessageFilter, V2NIMMessageRefer, V2NIMMessageRevokeNotification, V2NIMMessageService } from '../../sdk/V2NIMMessageService';
import { NIMEStrAnyObj } from '../types';
import { V2InternalService } from '../V2NIMInternalService';
import dataRdb from '@ohos.data.relationalStore';
export default interface V2NIMMessageServiceInternal extends V2NIMMessageService, V2InternalService {
    v2ISyncSuperTeamRevokeMessageHandler(packet: Packet): Promise<void>;
    v2ISyncClearHistoryMessageHandler(packet: Packet): Promise<void>;
    v2ISyncOnDeleteMessagesHandler(packet: Packet): Promise<void>;
    v2ISyncRevokeMessageHandler(packet: Packet): Promise<void>;
    v2ISyncP2PMessageReceiptsHandler(packet: Packet): Promise<void>;
    v2ISyncRoamingMsgsHandler(packet: Packet): Promise<void>;
    v2ISyncOfflineMsgsHandler(packet: Packet): Promise<void>;
    v2ISyncMessageOnModifiedHandler(packet: Packet): Promise<void>;
    v2ISyncMessageModifiedRoamHandler(packet: Packet): Promise<void>;
    v2IProcessMessageAttachment(message: V2NIMMessage): V2NIMMessage;
    v2IGetLastMessageFast(conversationId: string, onlyLastMessageUpdateEnabled: boolean): Promise<V2NIMMessage | undefined>;
    v2IDeleteLocalMessageByConversation(conversationId: string): Promise<void>;
    v2IGetUnreadMessageList(conversationId: string, readTime: number): Promise<V2NIMMessage[]>;
    v2IGetUnreadMessageCount(conversationId: string, readTime: number): Promise<number>;
    v2IFormatMessageRefer(message: V2NIMMessage | V2NIMMessageRefer): V2NIMMessageRefer;
    v2IFormatRevokeMessage(data: NIMEStrAnyObj): V2NIMMessageRevokeNotification;
    v2IUpdateAttachment(messageClientId: string, filePath: string): Promise<void>;
    markMessagesAck(messages: V2NIMMessage[]): void;
    get messageFilter(): V2NIMMessageFilter | undefined;
    messageFilterShouldIgnore(message: V2NIMMessage): Promise<boolean>;
    v2ICreateMessageByResultValue(valuesBucket: dataRdb.ValuesBucket): V2NIMMessage | undefined;
}
