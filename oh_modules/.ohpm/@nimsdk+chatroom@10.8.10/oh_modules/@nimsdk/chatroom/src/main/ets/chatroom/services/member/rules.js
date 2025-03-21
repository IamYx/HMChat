import { getEnumValues } from '@nimsdk/base';
import { V2NIMChatroomMemberRole } from '../../sdk/types';
export const getMemberListByOptionRules = {
    option: {
        type: 'object',
        rules: {
            memberRoles: { type: 'array', itemType: 'enum', values: getEnumValues(V2NIMChatroomMemberRole), required: false },
            onlyBlocked: { type: 'boolean', required: false },
            onlyChatBanned: { type: 'boolean', required: false },
            onlyOnline: { type: 'boolean', required: false },
            pageToken: { type: 'string', required: false },
            limit: { type: 'number', min: 1, required: false }
        }
    }
};
export const updateParamsRoleRules = {
    accountId: { type: 'string', allowEmpty: false },
    updateParams: {
        type: 'object',
        rules: {
            memberRole: {
                type: 'enum',
                values: [
                    V2NIMChatroomMemberRole.V2NIM_CHATROOM_MEMBER_ROLE_MANAGER,
                    V2NIMChatroomMemberRole.V2NIM_CHATROOM_MEMBER_ROLE_NORMAL,
                    V2NIMChatroomMemberRole.V2NIM_CHATROOM_MEMBER_ROLE_NORMAL_GUEST
                ]
            },
            memberLevel: { type: 'number', min: 0, required: false },
            notificationExtension: { type: 'string', required: false }
        }
    }
};
export const setMemberBlockedStatusRules = {
    accountId: { type: 'string', allowEmpty: false },
    blocked: { type: 'boolean' },
    notificationExtension: { type: 'string', required: false }
};
export const setMemberChatBannedStatusRules = {
    accountId: { type: 'string', allowEmpty: false },
    chatBanned: { type: 'boolean' },
    notificationExtension: { type: 'string', required: false }
};
export const updateSelfMemberInfoRules = {
    updateParams: {
        type: 'object',
        rules: {
            roomNick: { type: 'string', allowEmpty: false, required: false },
            roomAvatar: { type: 'string', required: false },
            serverExtension: { type: 'string', required: false },
            notificationEnabled: { type: 'boolean', required: false },
            notificationExtension: { type: 'string', required: false },
            persistence: { type: 'boolean', required: false }
        }
    },
    antispamConfig: {
        type: 'object',
        required: false,
        rules: {
            antispamBusinessId: { type: 'string', required: false }
        }
    }
};
export const setMemberTempChatBannedRules = {
    accountId: { type: 'string', allowEmpty: false },
    tempChatBannedDuration: { type: 'number', min: 0 },
    notificationEnabled: { type: 'boolean' },
    notificationExtension: { type: 'string', required: false }
};
export const getMemberListByTagRules = {
    option: {
        type: 'object',
        rules: {
            tag: { type: 'string', allowEmpty: false },
            pageToken: { type: 'string', required: false },
            limit: { type: 'number', min: 1, required: false }
        }
    }
};
