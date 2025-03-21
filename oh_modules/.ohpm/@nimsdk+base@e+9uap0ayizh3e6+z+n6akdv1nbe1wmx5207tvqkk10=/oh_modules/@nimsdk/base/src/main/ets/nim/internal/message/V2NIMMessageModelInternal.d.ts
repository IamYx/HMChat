import { V2NIMMessage } from '../../sdk/V2NIMMessageService';
export default interface V2NIMMessageModelInternal {
    getLastMessageOfConversation(conversationId: string): V2NIMMessage | void;
}
