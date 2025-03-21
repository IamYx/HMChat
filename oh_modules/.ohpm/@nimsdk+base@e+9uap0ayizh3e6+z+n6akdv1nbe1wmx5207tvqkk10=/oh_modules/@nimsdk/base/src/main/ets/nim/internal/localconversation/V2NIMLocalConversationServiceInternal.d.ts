import { Packet } from '../../parser';
import { V2NIMConversationType } from '../../sdk/V2NIMConversationService';
import { V2NIMLocalConversation, V2NIMLocalConversationFilter, V2NIMLocalConversationOperationResult, V2NIMLocalConversationOption, V2NIMLocalConversationResult, V2NIMLocalConversationService, V2NIMLocalConversationUpdate } from '../../sdk/V2NIMLocalConversationService';
import { V2NIMClearHistoryNotification, V2NIMMessage, V2NIMMessageDeletedNotification, V2NIMMessageRevokeNotification } from '../../sdk/V2NIMMessageService';
import { V2InternalService } from '../V2NIMInternalService';
/**
 * V2NIMLocalConversationServiceInternal 开放的所有接口均不可调用，即将将从 Internal 移除。
 * 现在均使用 emit3 通讯
 */
export interface V2NIMLocalConversationServiceInternal extends V2NIMLocalConversationService, V2InternalService {
    onMessageReceived(message: V2NIMMessage): Promise<void>;
    onMessageSent(message: V2NIMMessage): Promise<void>;
    onMessageInserted(message: V2NIMMessage): Promise<void>;
    onMessagesDeleted(deleteNotifications: V2NIMMessageDeletedNotification[]): Promise<void>;
    onMessagesRevoked(revokeNotifications: V2NIMMessageRevokeNotification[]): Promise<void>;
    onMessagesSynced(messages: V2NIMMessage[]): Promise<void>;
    onConversationSetMute(conversationId: string, mute: boolean): Promise<void>;
    onMessagesFetched(messages: V2NIMMessage[]): Promise<void>;
    onMessagesCleared(clearNotifications: V2NIMClearHistoryNotification[]): Promise<void>;
    onMessagesModify(messages: V2NIMMessage[]): Promise<void>;
    v2ISyncMultiMarkSessionAckHandler(packet: Packet, updateSyncTimestamp: boolean): Promise<void>;
    v2ISyncMultiMarkSuperTeamSessionAckHandler(packet: Packet, updateSyncTimestamp: boolean): Promise<void>;
    v2ISyncStickTopSessionsHandler(packet: Packet, updateSyncTimestamp: boolean): Promise<void>;
    /**
     * Internal API calling use following functions.
     */
    v2IGetConversationList(offset: number, limit: number): Promise<V2NIMLocalConversationResult>;
    v2IGetConversationListByOption(offset: number, limit: number, option: V2NIMLocalConversationOption): Promise<V2NIMLocalConversationResult>;
    v2IGetConversation(conversationId: string): Promise<V2NIMLocalConversation>;
    v2IGetConversationListByIds(conversationIds: string[]): Promise<V2NIMLocalConversation[]>;
    v2ICreateConversation(conversationId: string): Promise<V2NIMLocalConversation>;
    v2IDeleteConversation(conversationId: string, clearMessage?: boolean): Promise<void>;
    v2IDeleteConversationListByIds(conversationIds: string[], clearMessage?: boolean): Promise<V2NIMLocalConversationOperationResult[]>;
    v2IStickTopConversation(conversationId: string, stickTop: boolean): Promise<void>;
    v2IUpdateConversation(conversationId: string, updateInfo: V2NIMLocalConversationUpdate): Promise<void>;
    v2IUpdateConversationLocalExtension(conversationId: string, localExtension: string): Promise<void>;
    v2IGetTotalUnreadCount(): number;
    v2IGetUnreadCountByIds(conversationIds: string[]): Promise<number>;
    v2IGetUnreadCountByFilter(filter: V2NIMLocalConversationFilter): Promise<number>;
    v2IClearTotalUnreadCount(): Promise<void>;
    v2IClearUnreadCountByIds(conversationIds: string[]): Promise<V2NIMLocalConversationOperationResult[]>;
    v2IClearUnreadCountByTypes(types: V2NIMConversationType[]): Promise<void>;
    v2ISubscribeUnreadCountByFilter(filter: V2NIMLocalConversationFilter): void;
    v2IUnsubscribeUnreadCountByFilter(filter: V2NIMLocalConversationFilter): void;
    v2IMarkConversationRead(conversationId: string): Promise<number>;
    v2IGetConversationReadTime(conversationId: string): Promise<number>;
}
