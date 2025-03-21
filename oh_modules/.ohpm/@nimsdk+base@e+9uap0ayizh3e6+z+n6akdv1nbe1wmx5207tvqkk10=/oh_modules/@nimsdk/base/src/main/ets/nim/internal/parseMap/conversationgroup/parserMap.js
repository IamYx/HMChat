import { invert } from '@nimsdk/vendor';
import { conversationTag } from '../conversation/parserMap';
export let cmdMap = {
    '28_9': 'v2ConversationGroupCreate',
    '28_10': 'v2ConversationGroupDelete',
    '28_11': 'v2ConversationGroupUpdate',
    '28_12': 'v2ConversationGroupGet',
    '28_13': 'v2ConversationGroupsGet',
    '28_14': 'v2ConversationGroupListGet',
    '28_15': 'v2ConversationGroupAddTo',
    '28_16': 'v2ConversationGroupRemoveFrom',
    '28_22': 'v2ConversationGroupNotifySyncOnline'
};
export const serviceName = 'conversationGroupService';
export const conversationGroupTag = {
    groupId: 1,
    name: 2,
    serverExtension: 3,
    createTime: 4,
    updateTime: 5
};
export const cmdConfig = {
    v2ConversationGroupCreate: {
        sid: 28,
        cid: 9,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    conversationIds: 1,
                    name: 2,
                    serverExtension: 3
                }
            }
        ],
        response: [
            { type: 'Property', name: 'data', reflectMapper: invert(conversationGroupTag) },
            { type: 'PropertyArray', name: 'conversations', reflectMapper: invert(conversationTag) },
            { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } }
        ]
    },
    v2ConversationGroupDelete: {
        sid: 28,
        cid: 10,
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
        response: [
            {
                type: 'Property',
                name: 'info',
                reflectMapper: {
                    1: 'type',
                    2: 'deleteVersion',
                    3: 'groupList'
                }
            }
        ]
    },
    v2ConversationGroupUpdate: {
        sid: 28,
        cid: 11,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    groupId: 1,
                    name: 2,
                    serverExtension: 3
                }
            }
        ],
        response: [{ type: 'Property', name: 'data', reflectMapper: invert(conversationGroupTag) }]
    },
    v2ConversationGroupGet: {
        sid: 28,
        cid: 12,
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
        response: [{ type: 'Property', name: 'data', reflectMapper: invert(conversationGroupTag) }]
    },
    v2ConversationGroupsGet: {
        sid: 28,
        cid: 13,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    groupIds: 1
                }
            }
        ],
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invert(conversationGroupTag) },
            { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } }
        ]
    },
    v2ConversationGroupListGet: {
        sid: 28,
        cid: 14,
        service: serviceName,
        response: [{ type: 'PropertyArray', name: 'datas', reflectMapper: invert(conversationGroupTag) }]
    },
    v2ConversationGroupAddTo: {
        sid: 28,
        cid: 15,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    groupId: 1,
                    conversationIds: 2
                }
            }
        ],
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invert(conversationTag) },
            { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } }
        ]
    },
    v2ConversationGroupRemoveFrom: {
        sid: 28,
        cid: 16,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    groupId: 1,
                    conversationIds: 2
                }
            }
        ],
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invert(conversationTag) },
            { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } }
        ]
    },
    v2ConversationGroupNotifySyncOnline: {
        sid: 28,
        cid: 22,
        service: serviceName,
        response: [
            {
                type: 'Property',
                name: 'info',
                reflectMapper: {
                    1: 'type',
                    2: 'deleteVersion',
                    3: 'conversationIds'
                }
            },
            { type: 'Property', name: 'data', reflectMapper: invert(conversationGroupTag) }
        ]
    }
};
export const serializeTag = {};
