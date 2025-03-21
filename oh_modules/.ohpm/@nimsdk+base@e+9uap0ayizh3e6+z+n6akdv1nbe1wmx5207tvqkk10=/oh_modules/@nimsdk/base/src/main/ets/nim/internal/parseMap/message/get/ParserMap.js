import { invertSerializeItem } from '../../../../parser';
import { messageTag } from '../../../message/messageTags';
export const serviceName = 'messageService';
export let cmdMap = {
    '30_6': 'v2GetMessageList',
    '33_2': 'v2GetMessageListByRefers',
    '31_23': 'v2GetTeamMessageList',
    '32_14': 'v2GetSuperTeamMessageList',
    '30_26': 'v2SearchCloudMessagesGroupByConversation',
    '30_27': 'v2SearchCloudMessages',
    '33_1': 'v2GetThreadMessageList'
};
export const msgFullSearchRequestExcludeSessionTag = {
    keyword: 1,
    beginTime: 2,
    endTime: 3,
    messageLimit: 5,
    sortOrder: {
        id: 6,
        converter: (z7) => {
            return z7 === 0 ? 2 : 1;
        }
    },
    p2pAccountIds: {
        id: 7,
        converter(y7) {
            return y7.join(',');
        }
    },
    teamIds: {
        id: 8,
        converter(x7) {
            return x7.join(',');
        }
    },
    senderAccountIds: {
        id: 9,
        converter(w7) {
            return w7.join(',');
        }
    },
    messageTypes: {
        id: 10,
        converter(v7) {
            return v7.join(',');
        }
    },
    messageSubtypes: {
        id: 11,
        converter(u7) {
            return u7.join(',');
        }
    }
};
export const msgFullSearchRequestTag = {
    ...msgFullSearchRequestExcludeSessionTag,
    conversationLimit: 4
};
const getThreadMessageListOption = {
    beginTime: 1,
    endTime: 2,
    excludeMessageServerId: 3,
    limit: 4,
    reverse: 5
};
const replyThreadMessageMeta = {
    total: {
        id: 1,
        retType: 'number'
    },
    timestamp: {
        id: 2,
        retType: 'number'
    }
};
export const getMessageListCommonParams = [
    { type: 'Long', name: 'beginTime' },
    { type: 'Long', name: 'endTime' },
    { type: 'Long', name: 'lastMsgId' },
    { type: 'Int', name: 'limit' },
    { type: 'Bool', name: 'direction' },
    { type: 'LongArray', name: 'msgTypes' }
];
export const cmdConfig = {
    v2GetMessageList: {
        sid: 30,
        cid: 6,
        service: serviceName,
        params: [{ type: 'String', name: 'to' }, ...getMessageListCommonParams],
        response: [{ type: 'PropertyArray', name: 'msgs', reflectMapper: invertSerializeItem(messageTag) }]
    },
    v2GetTeamMessageList: {
        sid: 31,
        cid: 23,
        service: serviceName,
        params: [{ type: 'Long', name: 'to' }, ...getMessageListCommonParams],
        response: [{ type: 'PropertyArray', name: 'msgs', reflectMapper: invertSerializeItem(messageTag) }]
    },
    v2GetSuperTeamMessageList: {
        sid: 32,
        cid: 14,
        service: serviceName,
        params: [{ type: 'Long', name: 'to' }, ...getMessageListCommonParams],
        response: [{ type: 'PropertyArray', name: 'msgs', reflectMapper: invertSerializeItem(messageTag) }]
    },
    v2GetMessageListByRefers: {
        sid: 33,
        cid: 2,
        service: serviceName,
        params: [
            {
                type: 'PropertyArray',
                name: 'tag',
                reflectMapper: messageTag,
                select: ['conversationType', 'senderId', 'receiverId', 'createTime', 'messageServerId']
            }
        ],
        response: [{ type: 'PropertyArray', name: 'msgs', reflectMapper: invertSerializeItem(messageTag) }]
    },
    v2SearchCloudMessagesGroupByConversation: {
        sid: 30,
        cid: 26,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: msgFullSearchRequestTag }],
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(messageTag) }]
    },
    v2SearchCloudMessages: {
        sid: 30,
        cid: 27,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: msgFullSearchRequestExcludeSessionTag }],
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(messageTag) }]
    },
    v2GetThreadMessageList: {
        sid: 33,
        cid: 1,
        service: serviceName,
        params: [
            { type: 'Property', name: 'messageRefer', reflectMapper: messageTag },
            { type: 'Property', name: 'tag', reflectMapper: getThreadMessageListOption }
        ],
        response: [
            { type: 'Property', name: 'message', reflectMapper: invertSerializeItem(messageTag) },
            { type: 'Property', name: 'replyResult', reflectMapper: invertSerializeItem(replyThreadMessageMeta) },
            { type: 'PropertyArray', name: 'replyList', reflectMapper: invertSerializeItem(messageTag) }
        ]
    }
};
