import { V2NIMConversationFilter } from '../../../sdk/V2NIMConversationService';
export interface V2NIMConversationUnreadInternal {
    reset(): void;
    getTotalUnreadCount(): number | undefined;
    resetTotalAfterSyncDone(): number;
    digestUnreadCountChange(): void;
    getUnreadCountByIds(conversationIds: string[]): number;
    getUnreadCountByFilter(filter: V2NIMConversationFilter): number;
    addFilter(filter: V2NIMConversationFilter): void;
    deleteFilter(filter: V2NIMConversationFilter): void;
}
