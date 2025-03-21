import { boolToInt, invertSerializeItem } from '../../../../parser';
import { conversationTypeV1ToV2, messageTag } from '../../../message/messageTags';
export let cmdMap = {
    '33_15': 'v2PinMessage',
    '33_16': 'v2UpdatePinMessage',
    '33_17': 'v2UnpinMessage',
    '23_18': 'onPinMessage',
    '23_19': 'onUpdatePinMessage',
    '23_20': 'onUnpinMessage',
    '23_115': 'onPinMessage',
    '23_116': 'onUpdatePinMessage',
    '23_117': 'onUnpinMessage',
    '33_21': 'v2GetPinMessageList'
};
export const getPinListTag = {
    conversationId: 1,
    timetag: 2
};
export const getPinListResponseTag = {
    conversationType: {
        id: 1,
        access: 'messageRefer.conversationType',
        retConverter: conversationTypeV1ToV2
    },
    senderId: {
        id: 2,
        access: 'messageRefer.senderId'
    },
    receiverId: {
        id: 3,
        access: 'messageRefer.receiverId'
    },
    time: {
        id: 4,
        access: 'messageRefer.createTime',
        converter: boolToInt,
        retType: 'number'
    },
    messageServerId: {
        id: 5,
        access: 'messageRefer.messageServerId'
    },
    messageClientId: {
        id: 6,
        access: 'messageRefer.messageClientId'
    },
    operatorId: 7,
    serverExtension: 8,
    createTime: {
        id: 9,
        converter: boolToInt,
        retType: 'number'
    },
    updateTime: {
        id: 10,
        converter: boolToInt,
        retType: 'number'
    }
};
export const pinTag = {
    accid: 1,
    serverExtension: 2,
    createTime: {
        id: 3,
        retType: 'number'
    },
    updateTime: {
        id: 4,
        retType: 'number'
    }
};
export const cmdConfig = {
    v2PinMessage: {
        sid: 33,
        cid: 15,
        service: 'messageService',
        params: [
            {
                type: 'Property',
                name: 'msg',
                reflectMapper: messageTag,
                select: ['conversationType', 'receiverId', 'senderId', 'createTime', 'messageClientId', 'messageServerId']
            },
            { type: 'Property', name: 'msgPin', reflectMapper: pinTag }
        ],
        response: [{ type: 'Long', name: 'timetag' }]
    },
    v2UnpinMessage: {
        sid: 33,
        cid: 17,
        service: 'messageService',
        params: [
            {
                type: 'Property',
                name: 'msg',
                reflectMapper: messageTag,
                select: ['conversationType', 'receiverId', 'senderId', 'createTime', 'messageClientId', 'messageServerId']
            },
            { type: 'Property', name: 'msgPin', reflectMapper: pinTag }
        ],
        response: [{ type: 'Long', name: 'timetag' }]
    },
    v2UpdatePinMessage: {
        sid: 33,
        cid: 16,
        service: 'messageService',
        params: [
            {
                type: 'Property',
                name: 'msg',
                reflectMapper: messageTag,
                select: ['conversationType', 'receiverId', 'senderId', 'createTime', 'messageClientId', 'messageServerId']
            },
            { type: 'Property', name: 'msgPin', reflectMapper: pinTag }
        ],
        response: [{ type: 'Long', name: 'timetag' }]
    },
    v2GetPinMessageList: {
        sid: 33,
        cid: 21,
        service: 'messageService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: getPinListTag }],
        response: [
            { type: 'Long', name: 'timetag' },
            { type: 'Bool', name: 'changed' },
            { type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(getPinListResponseTag) }
        ]
    },
    onPinMessage: {
        sid: 23,
        cid: 18,
        service: 'messageService',
        response: [
            { type: 'Property', name: 'msg', reflectMapper: invertSerializeItem(messageTag) },
            {
                type: 'Property',
                name: 'pinInfo',
                reflectMapper: invertSerializeItem(pinTag)
            }
        ]
    },
    onUpdatePinMessage: {
        sid: 23,
        cid: 19,
        service: 'messageService',
        response: [
            { type: 'Property', name: 'msg', reflectMapper: invertSerializeItem(messageTag) },
            {
                type: 'Property',
                name: 'pinInfo',
                reflectMapper: invertSerializeItem(pinTag)
            }
        ]
    },
    onUnpinMessage: {
        sid: 23,
        cid: 20,
        service: 'messageService',
        response: [
            { type: 'Property', name: 'msg', reflectMapper: invertSerializeItem(messageTag) },
            {
                type: 'Property',
                name: 'pinInfo',
                reflectMapper: invertSerializeItem(pinTag)
            }
        ]
    }
};
