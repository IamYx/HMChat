import { boolToInt, invertSerializeItem } from '../../../../parser';
import { conversationTypeV1ToV2, conversationTypeV2ToV1, messageTag } from '../../../message/messageTags';
export const serviceName = 'messageService';
export let cmdMap = {
    '33_3': 'v2AddQuickComment',
    '33_4': 'v2RemoveQuickComment',
    '33_7': 'v2GetQuickComment',
    '23_5': 'onAddQuickComment',
    '23_6': 'onRemoveQuickComment',
    '23_103': 'onAddQuickComment',
    '23_104': 'onRemoveQuickComment'
};
export const quickCommentInfoTag = {
    operatorId: 1,
    index: {
        id: 2,
        retType: 'number'
    },
    createTime: {
        id: 3,
        retType: 'number'
    },
    serverExtension: 4,
    pushEnabled: {
        id: 5,
        access: 'pushConfig.pushEnabled',
        converter: boolToInt
    },
    needBadge: {
        id: 6,
        access: 'pushConfig.needBadge',
        converter: boolToInt
    },
    title: {
        id: 7,
        access: 'pushConfig.title'
    },
    pushContent: {
        id: 8,
        access: 'pushConfig.pushContent'
    },
    pushPayload: {
        id: 9,
        access: 'pushConfig.pushPayload'
    }
};
export const getQuickCommentMsg = {
    conversationType: {
        id: 1,
        converter: conversationTypeV2ToV1,
        retConverter: conversationTypeV1ToV2,
        access: 'messageRefer.conversationType'
    },
    senderId: {
        id: 2,
        access: 'messageRefer.senderId'
    },
    receiverId: {
        id: 3,
        access: 'messageRefer.receiverId'
    },
    createTime: {
        id: 4,
        retType: 'number',
        access: 'messageRefer.createTime'
    },
    messageServerId: {
        id: 5,
        access: 'messageRefer.messageServerId'
    },
    messageClientId: {
        id: 6,
        access: 'messageRefer.messageClientId'
    },
    detail: 7,
    modify: {
        id: 8,
        retType: 'number'
    },
    timestamp: {
        id: 100,
        retType: 'number'
    }
};
export const cmdConfig = {
    v2AddQuickComment: {
        sid: 33,
        cid: 3,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'message',
                reflectMapper: messageTag,
                select: ['conversationType', 'senderId', 'receiverId', 'createTime', 'messageClientId', 'messageServerId']
            },
            {
                type: 'Property',
                name: 'quickComment',
                reflectMapper: quickCommentInfoTag
            }
        ],
        response: [{ type: 'Long', name: 'timetag' }]
    },
    v2RemoveQuickComment: {
        sid: 33,
        cid: 4,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'message',
                reflectMapper: messageTag,
                select: ['conversationType', 'senderId', 'receiverId', 'createTime', 'messageClientId', 'messageServerId']
            },
            {
                type: 'Property',
                name: 'quickComment',
                reflectMapper: quickCommentInfoTag
            }
        ],
        response: [{ type: 'Long', name: 'timetag' }]
    },
    onAddQuickComment: {
        sid: 23,
        cid: 5,
        service: serviceName,
        response: [
            {
                type: 'Property',
                name: 'message',
                reflectMapper: invertSerializeItem(messageTag)
            },
            {
                type: 'Property',
                name: 'quickComment',
                reflectMapper: invertSerializeItem(quickCommentInfoTag)
            }
        ]
    },
    onRemoveQuickComment: {
        sid: 23,
        cid: 6,
        service: serviceName,
        response: [
            {
                type: 'Property',
                name: 'message',
                reflectMapper: invertSerializeItem(messageTag)
            },
            {
                type: 'Property',
                name: 'quickComment',
                reflectMapper: invertSerializeItem(quickCommentInfoTag)
            }
        ]
    },
    v2GetQuickComment: {
        sid: 33,
        cid: 7,
        service: serviceName,
        params: [
            {
                type: 'PropertyArray',
                name: 'tag',
                reflectMapper: getQuickCommentMsg
            }
        ],
        response: [
            {
                type: 'PropertyArray',
                name: 'data',
                reflectMapper: invertSerializeItem(getQuickCommentMsg)
            }
        ]
    }
};
