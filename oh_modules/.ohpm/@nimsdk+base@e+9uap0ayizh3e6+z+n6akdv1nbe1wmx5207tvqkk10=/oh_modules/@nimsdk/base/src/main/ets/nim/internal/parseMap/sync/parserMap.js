import { messageTag, serializeTagFriend, serializeTagLocalConversation, serializeTagMessage, serializeTagNotification, serializeTagUser, sysMsgTag, serializeTagTeam } from '../../../../../../../Index';
import { invertSerializeItem, invertSerializeMap } from '../../../parser';
export const serviceName = 'syncService';
export let cmdMap = {
    '27_1': 'v2NIMSync',
    '27_2': 'v2NIMSyncTeamMembers',
    '27_3': 'v2NIMSyncSuperTeamMembers',
    '27_10': 'v2QChatSync',
    '4_14': 'syncMultiMarkSessionAck',
    '4_20': 'syncMultiMarkSuperTeamSessionAck',
    '4_23': 'nimSyncStickTopSessions',
    '4_25': 'syncSessionReliableInfo',
    '8_109': 'v2TeamSync',
    '21_109': 'v2SuperTeamSync',
    '8_126': 'v2TeamMembersOfSelfInSync',
    '21_111': 'v2SuperTeamMembersOfSelfInSync',
    '12_5': 'v2SyncFriendList',
    '12_6': 'v2SyncFriendUserList',
    '3_8': 'syncBlockAndMuteList',
    '3_109': 'v2SyncSelfUserInfo',
    '4_4': 'syncOfflineMsgs',
    '4_9': 'syncRoamingMsgs',
    '4_17': 'syncSuperTeamRoamingMsgs',
    '4_12': 'syncP2PMessageReceipts',
    '7_15': 'syncRevokeMessage',
    '4_19': 'syncSuperTeamRevokeMessage',
    '4_21': 'syncOnDeleteMessages',
    '4_24': 'syncClearHistoryMessage',
    '4_16': 'syncBroadcastMsg',
    '4_6': 'v2SyncOfflineSysMsgs',
    '4_18': 'v2SyncOfflineSysMsgs',
    '7_33': 'v2MessageOnModified',
    '4_27': 'v2MessageSyncModified',
    '4_28': 'v2MessageSyncModified',
    '4_100': 'ysfSyncOfflineMsgs',
    '4_101': 'ysfSyncSysNotification'
};
export const serializeTag = {
    syncPropTag: {
        myInfo: 1,
        offlineMsgs: 2,
        teams: 3,
        roamingMsgs: 7,
        relations: 9,
        friends: 11,
        friendUsers: 13,
        msgReceipts: 14,
        myTeamMembers: 15,
        donnop: 16,
        recallMsg: 17,
        sessionAck: 18,
        broadcastMsgs: 20,
        avSignal: 21,
        superTeams: 22,
        mySuperTeamMembers: 23,
        superTeamRoamingMsgs: 24,
        deleteSuperTeamMsg: 25,
        superTeamSessionAck: 26,
        deleteSelfMsgs: 27,
        stickTopSessions: 28,
        sessionHistoryMsgsDelete: 29,
        p2pTeamModifyMessage: 30,
        superTeamModifyMessage: 31,
        filterMsgs: 100
    }
};
export const sessionReliableSyncTag = {
    scene: 1,
    sessionId: 2,
    syncStatus: 3,
    syncEndMsgId: 4,
    syncEndMsgidClient: 5,
    syncEndMsgTime: 6,
    syncStartMsgid: 7,
    syncStartMsgidClient: 8,
    syncStartMsgTime: 9,
    nextMsgid: 10,
    nextMsgidClient: 11,
    nextMsgTime: 12,
    roamMsgSync: 13,
    offlineMsgSync: 14,
    netCallOfflineMsgSync: 15
};
export const cmdConfig = {
    v2NIMSync: {
        sid: 27,
        cid: 1,
        service: serviceName,
        hasPacketTimer: false,
        params: [{ type: 'Property', name: 'tag', reflectMapper: serializeTag.syncPropTag }],
        response: [{ type: 'Long', name: 'timetag' }]
    },
    v2NIMSyncTeamMembers: {
        sid: 27,
        cid: 2,
        service: serviceName,
        hasPacketTimer: false,
        params: [{ type: 'LongLongMap', name: 'times' }],
        response: [{ type: 'Long', name: 'timetag' }]
    },
    v2NIMSyncSuperTeamMembers: {
        sid: 27,
        cid: 3,
        service: serviceName,
        hasPacketTimer: false,
        params: [{ type: 'LongLongMap', name: 'times' }],
        response: [{ type: 'Long', name: 'timetag' }]
    },
    v2QChatSync: {
        sid: 27,
        cid: 10,
        service: serviceName,
        hasPacketTimer: false,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    systemNotification: 1,
                    pushConfig: 2
                }
            }
        ],
        response: [{ type: 'Long', name: 'timetag' }]
    },
    syncMultiMarkSessionAck: {
        sid: 4,
        cid: 14,
        service: serviceName,
        response: [
            { type: 'StrLongMap', name: 'p2p' },
            { type: 'LongLongMap', name: 'team' },
            { type: 'Long', name: 'timetag' }
        ]
    },
    syncMultiMarkSuperTeamSessionAck: {
        sid: 4,
        cid: 20,
        service: serviceName,
        response: [
            { type: 'LongLongMap', name: 'superTeam' },
            { type: 'Long', name: 'timetag' }
        ]
    },
    nimSyncStickTopSessions: {
        sid: 4,
        cid: 23,
        service: serviceName,
        response: [
            { type: 'Long', name: 'timetag' },
            { type: 'Bool', name: 'isThereAnyChange' },
            { type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeMap(serializeTagLocalConversation).stickTopSessionTag }
        ]
    },
    v2TeamSync: {
        sid: 8,
        cid: 109,
        service: serviceName,
        response: [
            { type: 'Long', name: 'timetag' },
            { type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(serializeTagTeam.teamTag) }
        ]
    },
    v2SuperTeamSync: {
        sid: 21,
        cid: 109,
        service: serviceName,
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(serializeTagTeam.teamTag) },
            { type: 'Bool', name: 'isAll' },
            { type: 'Long', name: 'timetag' }
        ]
    },
    v2TeamMembersOfSelfInSync: {
        sid: 8,
        cid: 126,
        service: serviceName,
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(serializeTagTeam.teamMemberTag) },
            { type: 'Long', name: 'timetag' }
        ]
    },
    v2SuperTeamMembersOfSelfInSync: {
        sid: 21,
        cid: 111,
        service: serviceName,
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(serializeTagTeam.superTeamMemberTag) },
            { type: 'Long', name: 'timetag' }
        ]
    },
    v2SyncFriendList: {
        sid: 12,
        cid: 5,
        service: serviceName,
        response: [
            {
                type: 'PropertyArray',
                name: 'friends',
                reflectMapper: invertSerializeItem(serializeTagFriend.friendTag)
            },
            {
                type: 'Long',
                name: 'timetag'
            }
        ]
    },
    v2SyncFriendUserList: {
        sid: 12,
        cid: 6,
        service: serviceName,
        response: [
            {
                type: 'PropertyArray',
                name: 'users',
                reflectMapper: invertSerializeItem(serializeTagUser.userInfoTag)
            },
            { type: 'Long', name: 'timetag' }
        ]
    },
    syncBlockAndMuteList: {
        sid: 3,
        cid: 8,
        service: serviceName,
        response: [
            { type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(serializeTagUser.relationTag) },
            { type: 'Long', name: 'timetag' }
        ]
    },
    v2SyncSelfUserInfo: {
        sid: 3,
        cid: 109,
        service: serviceName,
        response: [
            { type: 'Property', name: 'user', reflectMapper: invertSerializeItem(serializeTagUser.userInfoTag) },
            { type: 'Long', name: 'timetag' }
        ]
    },
    syncOfflineMsgs: {
        sid: 4,
        cid: 4,
        service: serviceName,
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(serializeTagMessage.messageTag) }]
    },
    syncRoamingMsgs: {
        sid: 4,
        cid: 9,
        service: serviceName,
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(serializeTagMessage.messageTag) }]
    },
    syncSuperTeamRoamingMsgs: {
        sid: 4,
        cid: 17,
        service: serviceName,
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(serializeTagMessage.messageTag) }]
    },
    syncP2PMessageReceipts: {
        sid: 4,
        cid: 12,
        service: serviceName,
        response: [
            { type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(serializeTagMessage.messageTag) },
            { type: 'Long', name: 'timetag' }
        ]
    },
    syncRevokeMessage: {
        sid: 7,
        cid: 15,
        service: serviceName,
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(serializeTagMessage.systemMsgTag) },
            { type: 'Long', name: 'timetag' },
            { type: 'Byte', name: 'type' }
        ]
    },
    syncSuperTeamRevokeMessage: {
        sid: 4,
        cid: 19,
        service: serviceName,
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(serializeTagMessage.systemMsgTag) },
            { type: 'Long', name: 'timetag' },
            { type: 'Byte', name: 'type' }
        ]
    },
    syncOnDeleteMessages: {
        sid: 4,
        cid: 21,
        service: serviceName,
        response: [{ type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(serializeTagMessage.deleteMessageTag) }]
    },
    syncClearHistoryMessage: {
        sid: 4,
        cid: 24,
        service: serviceName,
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(serializeTagMessage.clearHistoryMessageTag) }]
    },
    syncBroadcastMsg: {
        sid: 4,
        cid: 16,
        service: serviceName,
        response: [{ type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(serializeTagNotification.broadcastMsgTag) }]
    },
    v2SyncOfflineSysMsgs: {
        sid: 4,
        cid: 9,
        service: serviceName,
        response: [{ type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(serializeTagNotification.sysMsgTag) }]
    },
    syncSessionReliableInfo: {
        sid: 4,
        cid: 25,
        service: 'session',
        response: [
            {
                type: 'Property',
                name: 'context',
                reflectMapper: {
                    1: 'timetag',
                    2: 'type'
                }
            },
            {
                type: 'PropertyArray',
                name: 'datas',
                reflectMapper: invertSerializeItem(sessionReliableSyncTag)
            }
        ]
    },
    v2MessageOnModified: {
        sid: 7,
        cid: 33,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(messageTag) }]
    },
    v2MessageSyncModified: {
        sid: 4,
        cid: 27,
        service: serviceName,
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(messageTag) },
            { type: 'Long', name: 'time' }
        ]
    },
    v2MessageSuperTeamSyncModified: {
        sid: 4,
        cid: 28,
        service: serviceName,
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(messageTag) },
            { type: 'Long', name: 'time' }
        ]
    },
    ysfSyncOfflineMsgs: {
        sid: 4,
        cid: 100,
        service: serviceName,
        response: [{ type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(messageTag) }]
    },
    ysfSyncSysNotification: {
        sid: 4,
        cid: 101,
        service: serviceName,
        response: [{ type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(sysMsgTag) }]
    }
};
