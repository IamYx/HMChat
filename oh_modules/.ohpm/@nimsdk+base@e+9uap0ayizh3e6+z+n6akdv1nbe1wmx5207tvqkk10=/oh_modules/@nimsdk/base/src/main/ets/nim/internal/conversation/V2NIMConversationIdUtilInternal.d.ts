import { V2NIMConversationIdUtil, V2NIMConversationType } from '../../sdk/V2NIMConversationService';
export default interface V2NIMConversationIdUtilInternal extends V2NIMConversationIdUtil {
    messageConversationId(conversationType: V2NIMConversationType, senderId: string, receiverId: string): string;
    receiveId(conversationId: string, sendId: string): string;
    parseConversationMyAccountId(conversationId: string): string;
}
