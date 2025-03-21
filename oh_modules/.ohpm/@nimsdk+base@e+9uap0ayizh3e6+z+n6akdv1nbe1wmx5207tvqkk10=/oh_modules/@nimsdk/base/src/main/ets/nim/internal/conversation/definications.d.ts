import { SerializeItem } from '../../parser';
import { V2NIMConversation, V2NIMConversationType, V2NIMLastMessage } from '../../sdk/V2NIMConversationService';
export declare const conversationTag: SerializeItem;
export interface V2NIMConversationField {
    conversationId: string;
    type: V2NIMConversationType;
    version: number;
    stickTop?: boolean;
    groupIds?: string;
    localExtension?: string;
    serverExtension?: string;
    lastMessage?: V2NIMLastMessage | string;
    lastMessageState?: number;
    unreadCount?: number;
    deleteFlag: boolean;
    sortOrder?: number;
    createTime?: number;
    updateTime?: number;
    isLocal?: boolean;
}
/**
 * v2 会话结构
 */
export interface V2NIMConversationExtend extends V2NIMConversation {
    /**
     * 逻辑还需要补全，在发送消息时如果没有会话，那么这个会话时本地会话，之后在发送成功之后，该消息才能从转为云端会话
     */
    isLocal: boolean;
}
