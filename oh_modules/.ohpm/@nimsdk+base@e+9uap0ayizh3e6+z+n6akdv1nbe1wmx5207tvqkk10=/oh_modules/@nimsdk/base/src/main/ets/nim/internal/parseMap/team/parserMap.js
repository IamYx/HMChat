import { invertSerializeItem } from '../../../parser';
export let cmdMap = {
    '31_1': 'v2TeamCreate',
    '32_1': 'v2SuperTeamCreate',
    '31_5': 'v2TeamInviteMembers',
    '32_5': 'v2SuperTeamInviteMembers',
    '31_6': 'v2TeamKickMembers',
    '32_6': 'v2SuperTeamKickMembers',
    '31_8': 'v2TeamLeave',
    '32_7': 'v2SuperTeamLeave',
    '31_7': 'v2TeamUpdateInfo',
    '32_8': 'v2SuperTeamUpdateInfo',
    '31_9': 'v2TeamGetInfo',
    '32_9': 'v2SuperTeamGetInfo',
    '31_11': 'v2TeamMemberDoSync',
    '32_13': 'v2SuperTeamMemberDoSync',
    '31_12': 'v2TeamDismiss',
    '32_4': 'v2SuperTeamDismiss',
    '31_13': 'v2TeamApplyToJoin',
    '32_20': 'v2SuperTeamApplyToJoin',
    '31_14': 'v2TeamAcceptJoinApplication',
    '32_21': 'v2SuperTeamAcceptJoinApplication',
    '31_15': 'v2TeamRejectJoinApplication',
    '32_22': 'v2SuperTeamRejectJoinApplication',
    '31_16': 'v2TeamAddManagers',
    '32_26': 'v2SuperTeamAddManagers',
    '31_17': 'v2TeamRemoveManagers',
    '32_27': 'v2SuperTeamRemoveManagers',
    '31_18': 'v2TeamTransferOwner',
    '32_31': 'v2SuperTeamTransferOwner',
    '31_19': 'v2TeamUpdateSelfMemberInfo',
    '32_10': 'v2SuperTeamUpdateSelfMemberInfo',
    '31_20': 'v2TeamUpdateMember',
    '32_30': 'v2SuperTeamUpdateMember',
    '31_21': 'v2TeamAcceptInvitation',
    '32_23': 'v2SuperTeamAcceptInvitation',
    '31_22': 'v2TeamRejectInvite',
    '32_24': 'v2SuperTeamRejectInvite',
    '31_33': 'v2TeamGetMemberInvitor',
    '32_35': 'v2SuperTeamGetMemberInvitor',
    '31_25': 'v2TeamMemberSetChatBannedStatus',
    '32_29': 'v2SuperTeamMemberSetChatBannedStatus',
    '31_32': 'v2TeamSetChatBannedMode',
    '32_28': 'v2SuperTeamSetChatBannedMode',
    '31_34': 'v2TeamGetByIds',
    '32_36': 'v2SuperTeamGetByIds',
    '31_35': 'v2TeamMemberGetListByIds',
    '32_37': 'v2SuperTeamMemberGetListByIds',
    '31_36': 'v2TeamMemberGetList',
    '8_101': 'v2TeamCreateMultiSync',
    '8_111': 'v2TeamSyncMember',
    '8_119': 'v2TeamMemberUpdateMultiSync',
    '21_101': 'v2SuperTeamCreateMultiSync',
    '21_110': 'v2SuperTeamMemberUpdateMultiSync',
    '21_113': 'v2SuperTeamSyncMember'
};
export const antispamTag = {
    antispamBusinessId: 1
};
export const serviceName = 'teamService';
export const teamTag = {
    teamId: 1,
    name: 3,
    teamType: {
        id: 4,
        retConverter: (r8) => {
            if (+r8 == 0) {
                return 1;
            }
            return +r8;
        }
    },
    ownerAccountId: 5,
    memberLimit: {
        id: 6,
        retType: 'number'
    },
    isValidTeam: {
        id: 8,
        retConverter: (p8, q8) => {
            if (+p8 === 1 && (typeof q8[13] === 'undefined' || +q8[13] === 1)) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    memberCount: {
        id: 9,
        retType: 'number'
    },
    memberUpdateTime: {
        id: 10,
        retType: 'number'
    },
    createTime: {
        id: 11,
        retType: 'number'
    },
    updateTime: {
        id: 12,
        retType: 'number'
    },
    intro: 14,
    announcement: 15,
    joinMode: {
        id: 16,
        retType: 'number'
    },
    serverExtension: 18,
    customerExtension: 19,
    avatar: 20,
    agreeMode: { id: 21, retType: 'number' },
    inviteMode: { id: 22, retType: 'number' },
    updateInfoMode: { id: 23, retType: 'number' },
    updateExtensionMode: { id: 24, retType: 'number' },
    chatBannedMode: { id: 101, retType: 'number' }
};
export const teamMemberTag = {
    teamId: 1,
    accountId: 3,
    memberRole: { id: 4, retType: 'number' },
    teamNick: 5,
    bits: { id: 7, retType: 'number' },
    inTeam: { id: 9, retType: 'boolean' },
    joinTime: { id: 10, retType: 'number' },
    updateTime: { id: 11, retType: 'number' },
    serverExtension: 12,
    chatBanned: { id: 13, retType: 'boolean' },
    invitorAccountId: 14
};
export const superTeamMemberTag = {
    teamId: 1,
    accountId: 3,
    memberRole: { id: 4, retType: 'number' },
    teamNick: 5,
    bits: { id: 7, retType: 'number' },
    inTeam: { id: 9, retType: 'boolean' },
    updateTime: { id: 11, retType: 'number' },
    serverExtension: 12,
    chatBanned: { id: 13, retType: 'boolean' },
    invitorAccountId: 14,
    joinTime: { id: 15, retType: 'number' }
};
export const teamMemberListRequestTag = {
    teamId: 1,
    teamType: 2,
    roleQueryType: 3,
    onlyChatBanned: {
        id: 4,
        converter(o8) {
            return +o8;
        }
    },
    nextToken: 5,
    limit: 6,
    direction: 7
};
export const cmdConfig = {
    v2TeamCreate: {
        sid: 31,
        cid: 1,
        service: serviceName,
        params: [
            { type: 'Property', name: 'team', reflectMapper: teamTag },
            { type: 'StrArray', name: 'inviteeAccountIds' },
            { type: 'String', name: 'postscript' },
            { type: 'Property', name: 'antispamConfig', reflectMapper: antispamTag }
        ],
        response: [
            { type: 'Property', name: 'team', reflectMapper: invertSerializeItem(teamTag) },
            { type: 'StrArray', name: 'failedList' }
        ]
    },
    v2SuperTeamCreate: {
        sid: 32,
        cid: 1,
        service: serviceName,
        params: [
            { type: 'Property', name: 'team', reflectMapper: teamTag },
            { type: 'StrArray', name: 'inviteeAccountIds' },
            { type: 'String', name: 'postscript' },
            { type: 'Property', name: 'antispamConfig', reflectMapper: antispamTag }
        ],
        response: [
            { type: 'Property', name: 'team', reflectMapper: invertSerializeItem(teamTag) },
            { type: 'StrArray', name: 'failedList' }
        ]
    },
    v2TeamInviteMembers: {
        sid: 31,
        cid: 5,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'StrArray', name: 'accounts' },
            { type: 'String', name: 'ps' },
            { type: 'String', name: 'attach' }
        ],
        response: [
            { type: 'Long', name: 'time' },
            { type: 'StrArray', name: 'abortedAccidList' }
        ]
    },
    v2SuperTeamInviteMembers: {
        sid: 32,
        cid: 5,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'StrArray', name: 'accounts' },
            { type: 'String', name: 'ps' },
            { type: 'String', name: 'attach' }
        ],
        response: [
            { type: 'StrArray', name: 'abortedAccidList' },
            { type: 'Long', name: 'time' }
        ]
    },
    v2TeamUpdateInfo: {
        sid: 31,
        cid: 7,
        service: serviceName,
        params: [
            { type: 'Property', name: 'team', reflectMapper: teamTag },
            { type: 'Property', name: 'antispamConfig', reflectMapper: antispamTag }
        ],
        response: [
            { type: 'Long', name: 'teamId' },
            { type: 'Long', name: 'timestamp' }
        ]
    },
    v2SuperTeamUpdateInfo: {
        sid: 32,
        cid: 8,
        service: serviceName,
        params: [
            { type: 'Property', name: 'team', reflectMapper: teamTag },
            { type: 'Property', name: 'antispamConfig', reflectMapper: antispamTag }
        ],
        response: [{ type: 'Long', name: 'timestamp' }]
    },
    v2TeamLeave: {
        sid: 31,
        cid: 8,
        service: serviceName,
        params: [{ type: 'Long', name: 'teamId' }]
    },
    v2SuperTeamLeave: {
        sid: 32,
        cid: 7,
        service: serviceName,
        params: [{ type: 'Long', name: 'teamId' }]
    },
    v2TeamGetInfo: {
        sid: 31,
        cid: 9,
        service: serviceName,
        params: [{ type: 'Long', name: 'teamId' }],
        response: [{ type: 'Property', name: 'team', reflectMapper: invertSerializeItem(teamTag) }]
    },
    v2SuperTeamGetInfo: {
        sid: 32,
        cid: 9,
        service: serviceName,
        params: [{ type: 'Long', name: 'teamId' }],
        response: [{ type: 'Property', name: 'team', reflectMapper: invertSerializeItem(teamTag) }]
    },
    v2TeamMemberDoSync: {
        sid: 31,
        cid: 11,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'Long', name: 'timetag' }
        ],
        response: [
            { type: 'Long', name: 'teamId' },
            { type: 'PropertyArray', name: 'members', reflectMapper: invertSerializeItem(teamMemberTag) },
            { type: 'Long', name: 'timetag' },
            { type: 'Bool', name: 'fullSync' }
        ]
    },
    v2SuperTeamMemberDoSync: {
        sid: 32,
        cid: 13,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'Long', name: 'timetag' }
        ],
        response: [
            { type: 'Long', name: 'timetag' }
        ]
    },
    v2TeamGetByIds: {
        sid: 31,
        cid: 34,
        service: serviceName,
        params: [{ type: 'LongArray', name: 'teamIds' }],
        response: [
            { type: 'PropertyArray', name: 'teams', reflectMapper: invertSerializeItem(teamTag) },
            { type: 'LongArray', name: 'tids' }
        ]
    },
    v2SuperTeamGetByIds: {
        sid: 32,
        cid: 36,
        service: serviceName,
        params: [{ type: 'LongArray', name: 'teamIds' }],
        response: [
            { type: 'PropertyArray', name: 'teams', reflectMapper: invertSerializeItem(teamTag) },
            { type: 'LongArray', name: 'tids' }
        ]
    },
    v2TeamDismiss: {
        sid: 31,
        cid: 12,
        service: serviceName,
        params: [{ type: 'Long', name: 'teamId' }]
    },
    v2SuperTeamDismiss: {
        sid: 32,
        cid: 4,
        service: serviceName,
        params: [{ type: 'Long', name: 'teamId' }]
    },
    v2TeamAcceptInvitation: {
        sid: 31,
        cid: 21,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'String', name: 'from' }
        ],
        response: [{ type: 'Property', name: 'team', reflectMapper: invertSerializeItem(teamTag) }]
    },
    v2SuperTeamAcceptInvitation: {
        sid: 32,
        cid: 23,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'String', name: 'from' }
        ],
        response: [{ type: 'Property', name: 'team', reflectMapper: invertSerializeItem(teamTag) }]
    },
    v2TeamRejectInvite: {
        sid: 31,
        cid: 22,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'String', name: 'from' },
            { type: 'String', name: 'ps' }
        ]
    },
    v2SuperTeamRejectInvite: {
        sid: 32,
        cid: 24,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'String', name: 'from' },
            { type: 'String', name: 'ps' }
        ]
    },
    v2TeamKickMembers: {
        sid: 31,
        cid: 6,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'StrArray', name: 'accounts' }
        ]
    },
    v2SuperTeamKickMembers: {
        sid: 32,
        cid: 6,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'StrArray', name: 'accounts' }
        ]
    },
    v2TeamApplyToJoin: {
        sid: 31,
        cid: 13,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'String', name: 'ps' }
        ],
        response: [
            { type: 'Property', name: 'team', reflectMapper: invertSerializeItem(teamTag) },
            { type: 'Int', name: 'isInTeam' }
        ]
    },
    v2SuperTeamApplyToJoin: {
        sid: 32,
        cid: 20,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'String', name: 'ps' }
        ],
        response: [
            { type: 'Property', name: 'team', reflectMapper: invertSerializeItem(teamTag) },
            { type: 'Int', name: 'isInTeam' }
        ]
    },
    v2TeamAcceptJoinApplication: {
        sid: 31,
        cid: 14,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'String', name: 'from' }
        ]
    },
    v2SuperTeamAcceptJoinApplication: {
        sid: 32,
        cid: 21,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'String', name: 'from' }
        ]
    },
    v2TeamRejectJoinApplication: {
        sid: 31,
        cid: 15,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'String', name: 'from' },
            { type: 'String', name: 'ps' }
        ]
    },
    v2SuperTeamRejectJoinApplication: {
        sid: 32,
        cid: 22,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'String', name: 'from' },
            { type: 'String', name: 'ps' }
        ]
    },
    v2TeamAddManagers: {
        sid: 31,
        cid: 16,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'StrArray', name: 'accounts' }
        ]
    },
    v2SuperTeamAddManagers: {
        sid: 32,
        cid: 26,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'StrArray', name: 'accounts' }
        ]
    },
    v2TeamRemoveManagers: {
        sid: 31,
        cid: 17,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'StrArray', name: 'accounts' }
        ]
    },
    v2SuperTeamRemoveManagers: {
        sid: 32,
        cid: 27,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'StrArray', name: 'accounts' }
        ]
    },
    v2TeamTransferOwner: {
        sid: 31,
        cid: 18,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'String', name: 'account' },
            { type: 'Bool', name: 'leave' }
        ]
    },
    v2SuperTeamTransferOwner: {
        sid: 32,
        cid: 31,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'String', name: 'account' },
            { type: 'Bool', name: 'leave' }
        ]
    },
    v2TeamUpdateSelfMemberInfo: {
        sid: 31,
        cid: 19,
        service: serviceName,
        params: [{ type: 'Property', name: 'teamMember', reflectMapper: teamMemberTag }]
    },
    v2SuperTeamUpdateSelfMemberInfo: {
        sid: 32,
        cid: 10,
        service: serviceName,
        params: [{ type: 'Property', name: 'teamMember', reflectMapper: superTeamMemberTag }]
    },
    v2TeamUpdateMember: {
        sid: 31,
        cid: 20,
        service: serviceName,
        params: [{ type: 'Property', name: 'teamMember', reflectMapper: teamMemberTag }]
    },
    v2SuperTeamUpdateMember: {
        sid: 32,
        cid: 30,
        service: serviceName,
        params: [{ type: 'Property', name: 'teamMember', reflectMapper: superTeamMemberTag }]
    },
    v2TeamGetMemberInvitor: {
        sid: 31,
        cid: 33,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'StrArray', name: 'accounts' }
        ],
        response: [{ type: 'StrStrMap', name: 'accountsMap' }]
    },
    v2SuperTeamGetMemberInvitor: {
        sid: 32,
        cid: 35,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'StrArray', name: 'accounts' }
        ],
        response: [{ type: 'StrStrMap', name: 'accountsMap' }]
    },
    v2TeamMemberSetChatBannedStatus: {
        sid: 31,
        cid: 25,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'String', name: 'accountId' },
            { type: 'Int', name: 'chatBanned' }
        ]
    },
    v2SuperTeamMemberSetChatBannedStatus: {
        sid: 32,
        cid: 29,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'StrArray', name: 'accountId' },
            { type: 'Int', name: 'chatBanned' }
        ]
    },
    v2TeamSetChatBannedMode: {
        sid: 31,
        cid: 32,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'Int', name: 'chatBannedMode' }
        ]
    },
    v2SuperTeamSetChatBannedMode: {
        sid: 32,
        cid: 28,
        service: serviceName,
        params: [
            { type: 'Long', name: 'teamId' },
            { type: 'Int', name: 'chatBannedMode' }
        ]
    },
    v2TeamMemberGetListByIds: {
        sid: 31,
        cid: 35,
        service: serviceName,
        params: [{ type: 'StrArray', name: 'tag' }],
        response: [{ type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(teamMemberTag) }]
    },
    v2SuperTeamMemberGetListByIds: {
        sid: 32,
        cid: 37,
        service: serviceName,
        params: [{ type: 'StrArray', name: 'tag' }],
        response: [{ type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(superTeamMemberTag) }]
    },
    v2TeamMemberGetList: {
        sid: 31,
        cid: 36,
        service: serviceName,
        hasPacketTimer: false,
        params: [{ type: 'Property', name: 'tag', reflectMapper: teamMemberListRequestTag }],
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(teamMemberTag) },
            { type: 'Property', name: 'pageInfo', reflectMapper: { 1: 'hasMore', 2: 'nextToken' } }
        ]
    },
    v2TeamSyncMember: {
        sid: 8,
        cid: 111,
        service: serviceName,
        response: [
            { type: 'Long', name: 'teamId' },
            { type: 'PropertyArray', name: 'members', reflectMapper: invertSerializeItem(teamMemberTag) },
            { type: 'Long', name: 'timetag' }
        ]
    },
    v2SuperTeamSyncMember: {
        sid: 21,
        cid: 113,
        service: serviceName,
        response: [
            { type: 'Long', name: 'teamId' },
            { type: 'PropertyArray', name: 'members', reflectMapper: invertSerializeItem(teamMemberTag) },
            { type: 'Long', name: 'timetag' }
        ]
    },
    v2TeamCreateMultiSync: {
        sid: 8,
        cid: 101,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(teamTag) }]
    },
    v2TeamMemberUpdateMultiSync: {
        sid: 8,
        cid: 119,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(teamMemberTag) }]
    },
    v2SuperTeamCreateMultiSync: {
        sid: 21,
        cid: 101,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(teamTag) }]
    },
    v2SuperTeamMemberUpdateMultiSync: {
        sid: 21,
        cid: 110,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(superTeamMemberTag) }]
    }
};
export const serializeTag = {
    teamTag: teamTag,
    teamMemberTag: teamMemberTag,
    superTeamMemberTag: superTeamMemberTag
};
