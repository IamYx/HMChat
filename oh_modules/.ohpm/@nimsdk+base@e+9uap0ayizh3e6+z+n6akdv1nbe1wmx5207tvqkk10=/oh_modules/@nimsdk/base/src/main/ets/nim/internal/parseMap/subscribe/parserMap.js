import { boolToInt, invertSerializeItem } from '../../../parser';
export const cmdMap = {
    '19_1': 'v2PublishEvent',
    '14_2': 'v2OnUserStatusChange',
    '19_3': 'v2SubscribeUserStatus',
    '19_4': 'v2UnsubscribeUserStatus',
    '19_5': 'v2UnsubscribeAllUserStatus',
    '19_6': 'v2QuerySubscribeEvent',
    '19_7': 'v2QueryAllSubscribeEvent',
    '14_9': 'v2OnMultiUserStatusChange'
};
const serviceName = 'subscriptionService';
const msgEventTag = {
    eventType: {
        id: 1,
        retType: 'number'
    },
    statusType: {
        id: 2,
        retType: 'number'
    },
    uniqueId: 3,
    extension: 4,
    duration: {
        id: 5,
        retType: 'number'
    },
    onlineOnly: {
        id: 6,
        retType: 'boolean',
        converter: (n8) => {
            return n8 ? 1 : 2;
        }
    },
    multiSync: {
        id: 7,
        retType: 'boolean',
        converter: boolToInt
    },
    publishTime: {
        id: 10,
        retType: 'number'
    },
    serverId: 11,
    clientType: {
        id: 12,
        retType: 'number'
    },
    serverExtension: 13,
    extensionReceived: 14,
    accountId: 103
};
const msgEventSubscribeTag = {
    eventType: {
        id: 1,
        retType: 'number'
    },
    duration: {
        id: 2,
        retType: 'number'
    },
    immediateSync: {
        id: 3,
        retType: 'number',
        converter: boolToInt
    },
    accountId: 102,
    subscribeTime: {
        id: 105,
        retType: 'number'
    }
};
export const cmdConfig = {
    v2PublishEvent: {
        sid: 19,
        cid: 1,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: msgEventTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(msgEventTag) }]
    },
    v2OnUserStatusChange: {
        sid: 14,
        cid: 2,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(msgEventTag) }]
    },
    v2SubscribeUserStatus: {
        sid: 19,
        cid: 3,
        service: serviceName,
        params: [
            { type: 'Property', name: 'tag', reflectMapper: msgEventSubscribeTag },
            {
                type: 'StrArray',
                name: 'accountIds'
            }
        ],
        response: [{ type: 'StrArray', name: 'failedList' }]
    },
    v2UnsubscribeUserStatus: {
        sid: 19,
        cid: 4,
        service: serviceName,
        params: [
            { type: 'Property', name: 'tag', reflectMapper: msgEventSubscribeTag },
            {
                type: 'StrArray',
                name: 'accountIds'
            }
        ],
        response: [{ type: 'StrArray', name: 'failedList' }]
    },
    v2UnsubscribeAllUserStatus: {
        sid: 19,
        cid: 5,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: msgEventSubscribeTag }]
    },
    v2QuerySubscribeEvent: {
        sid: 19,
        cid: 6,
        service: serviceName,
        params: [
            { type: 'Property', name: 'tag', reflectMapper: msgEventSubscribeTag },
            {
                type: 'StrArray',
                name: 'accountIds'
            }
        ],
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(msgEventSubscribeTag) }]
    },
    v2QueryAllSubscribeEvent: {
        sid: 19,
        cid: 7,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: msgEventSubscribeTag }],
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(msgEventSubscribeTag) }]
    },
    v2OnMultiUserStatusChange: {
        sid: 14,
        cid: 9,
        service: serviceName,
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(msgEventTag) }]
    }
};
