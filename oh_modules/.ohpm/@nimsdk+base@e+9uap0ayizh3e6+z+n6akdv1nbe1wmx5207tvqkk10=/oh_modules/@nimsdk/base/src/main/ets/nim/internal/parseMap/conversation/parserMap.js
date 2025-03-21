import { invert } from '@nimsdk/vendor';
export let cmdMap = {
    '28_1': 'v2ConversationCreate',
    '28_2': 'v2ConversationDelete',
    '28_3': 'v2ConversationUpdate',
    '28_4': 'v2ConversationSetTop',
    '28_5': 'v2ConversationUnreadClear',
    '28_6': 'v2ConversationGet',
    '28_7': 'v2ConversationGetByIds',
    '28_8': 'v2ConversationGetList',
    '28_17': 'v2ConversationsDelete',
    '28_18': 'v2ConversationsUnreadClear',
    '28_19': 'v2ConversationSync',
    '28_20': 'v2ConversationNotifySync',
    '28_21': 'v2ConversationNotifySyncOnline',
    '28_23': 'v2ConversationClearTotalUnread',
    '28_24': 'v2ConversationClearTypeUnread',
    '28_25': 'v2ConversationClearGroupUnread',
    '4_14': 'syncSessionAck',
    '4_20': 'syncSuperTeamSessionAck',
    '30_16': 'v2MarkConversationReadTime',
    '32_25': 'v2MarkSuperTeamReadTime',
    '7_116': 'v2MultiDeviceConversationReadTime',
    '21_125': 'v2MultiDeviceSuperTeamReadTime'
};
export const serviceName = 'conversationService';
export const conversationTag = {
    conversationId: 1,
    type: 2,
    serverExtension: 3,
    groupIds: 4,
    lastMessage: 5,
    lastMessageState: 6,
    unreadCount: 7,
    stickTop: 8,
    sortOrder: 9,
    version: 10,
    deleteFlag: 11,
    createTime: 12,
    updateTime: 13
};
export const conversationOnlineSyncNotifyTag = {
    type: 1,
    oneClickClearUnreadType: 2,
    oneClickClearUnreadConversationType: 3,
    oneClickClearUnreadGroupId: 4,
    oneClickClearUnreadVersion: 5,
    deleteConversationClearMessage: 6
};
export const cmdConfig = {
    v2ConversationCreate: {
        sid: 28,
        cid: 1,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    conversationId: 1
                }
            }
        ],
        response: [{ type: 'Property', name: 'data', reflectMapper: invert(conversationTag) }]
    },
    v2ConversationDelete: {
        sid: 28,
        cid: 2,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    conversationId: 1,
                    clearMessage: 2
                }
            }
        ],
        response: [{ type: 'Property', name: 'data', reflectMapper: invert(conversationTag) }]
    },
    v2ConversationUpdate: {
        sid: 28,
        cid: 3,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    conversationId: 1,
                    serverExtension: 2
                }
            }
        ],
        response: [{ type: 'Property', name: 'data', reflectMapper: invert(conversationTag) }]
    },
    v2ConversationSetTop: {
        sid: 28,
        cid: 4,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    conversationId: 1,
                    stickTop: 2
                }
            }
        ],
        response: [{ type: 'Property', name: 'data', reflectMapper: invert(conversationTag) }]
    },
    v2ConversationUnreadClear: {
        sid: 28,
        cid: 5,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    conversationId: 1
                }
            }
        ],
        response: [{ type: 'Property', name: 'data', reflectMapper: invert(conversationTag) }]
    },
    v2ConversationGet: {
        sid: 28,
        cid: 6,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    conversationId: 1
                }
            }
        ],
        response: [{ type: 'Property', name: 'data', reflectMapper: invert(conversationTag) }]
    },
    v2ConversationGetByIds: {
        sid: 28,
        cid: 7,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    conversationIds: 1
                }
            }
        ],
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invert(conversationTag) },
            { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } }
        ]
    },
    v2ConversationGetList: {
        sid: 28,
        cid: 8,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    cursor: 1,
                    limit: 2
                }
            }
        ],
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invert(conversationTag) },
            { type: 'Property', name: 'info', reflectMapper: { 1: 'hasMore', 2: 'offset' } }
        ]
    },
    v2ConversationsDelete: {
        sid: 28,
        cid: 17,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    conversationIds: 1,
                    clearMessage: 2
                }
            }
        ],
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invert(conversationTag) },
            { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } }
        ]
    },
    v2ConversationsUnreadClear: {
        sid: 28,
        cid: 18,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    conversationIds: 1
                }
            }
        ],
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invert(conversationTag) },
            { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } }
        ]
    },
    v2ConversationSync: {
        sid: 28,
        cid: 19,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    cursor: 1
                }
            }
        ],
        response: [{ type: 'Property', name: 'info', reflectMapper: { 1: 'nextCursor', 2: 'syncType' } }]
    },
    v2ConversationNotifySync: {
        sid: 28,
        cid: 20,
        service: serviceName,
        hasPacketTimer: false,
        response: [
            { type: 'Property', name: 'info', reflectMapper: { 1: 'nextCursor', 2: 'syncType' } },
            { type: 'PropertyArray', name: 'datas', reflectMapper: invert(conversationTag) }
        ]
    },
    v2ConversationNotifySyncOnline: {
        sid: 28,
        cid: 21,
        service: serviceName,
        response: [
            { type: 'Property', name: 'info', reflectMapper: invert(conversationOnlineSyncNotifyTag) },
            { type: 'PropertyArray', name: 'datas', reflectMapper: invert(conversationTag) }
        ]
    },
    v2ConversationClearTotalUnread: {
        sid: 28,
        cid: 23,
        service: serviceName,
        response: [{ type: 'Property', name: 'info', reflectMapper: invert(conversationOnlineSyncNotifyTag) }]
    },
    v2ConversationClearTypeUnread: {
        sid: 28,
        cid: 24,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    conversationType: 1
                }
            }
        ],
        response: [{ type: 'Property', name: 'info', reflectMapper: invert(conversationOnlineSyncNotifyTag) }]
    },
    v2ConversationClearGroupUnread: {
        sid: 28,
        cid: 25,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    groupId: 1
                }
            }
        ],
        response: [{ type: 'Property', name: 'info', reflectMapper: invert(conversationOnlineSyncNotifyTag) }]
    },
    syncSessionAck: {
        sid: 4,
        cid: 14,
        service: serviceName,
        response: [
            { type: 'StrLongMap', name: 'p2p' },
            { type: 'LongLongMap', name: 'team' },
            { type: 'Long', name: 'timetag' }
        ]
    },
    syncSuperTeamSessionAck: {
        sid: 4,
        cid: 20,
        service: serviceName,
        response: [
            { type: 'LongLongMap', name: 'superTeam' },
            { type: 'Long', name: 'timetag' }
        ]
    }
};
export const serializeTag = {
    conversationTag: conversationTag
};
