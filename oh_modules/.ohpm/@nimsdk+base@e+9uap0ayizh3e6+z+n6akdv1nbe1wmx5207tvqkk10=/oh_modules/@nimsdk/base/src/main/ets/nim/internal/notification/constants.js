import { V2NIMConversationType } from '../../sdk/V2NIMConversationService';
export const typeMap = {
    [V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P]: 100,
    [V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM]: 101,
    [V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM]: 103
};
export const sysTypeToConversationType = {
    100: V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P,
    101: V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM,
    102: V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P,
    103: V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM
};
