import { NIM } from '../../NIM';
import { V2NIMConversationType } from '../../sdk/V2NIMConversationService';
import V2NIMConversationIdUtilInternal from './V2NIMConversationIdUtilInternal';
export default class V2NIMConversationIdUtilImpl implements V2NIMConversationIdUtilInternal {
    core: NIM;
    constructor(w: NIM);
    p2pConversationId(v: string): string;
    teamConversationId(u: string): string;
    superTeamConversationId(t: string): string;
    /**
     * 从仅有 conversationType, senderId, receiverId 的消息中，获取 conversationId
     * @param message
     */
    messageConversationId(q: V2NIMConversationType, r: string, s: string): string;
    receiveId(l: string, m: string): string;
    parseConversationType(i: string): V2NIMConversationType;
    parseConversationTargetId(f: string): string;
    parseConversationMyAccountId(d: string): string;
}
