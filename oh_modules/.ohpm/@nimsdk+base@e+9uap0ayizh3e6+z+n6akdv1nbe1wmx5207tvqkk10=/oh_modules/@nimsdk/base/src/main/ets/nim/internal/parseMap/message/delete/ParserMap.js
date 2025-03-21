import { boolToInt, invertSerializeItem } from '../../../../parser';
export const serviceName = 'messageService';
export let cmdMap = {
    '30_18': 'v2ClearHistoryMessage',
    '30_23': 'v2DeleteMessage',
    '30_24': 'v2DeleteMessages',
    '7_123': 'onDeleteMessage',
    '7_124': 'onDeleteMessages',
    '7_118': 'onClearHistoryMessage'
};
export const clearHistoryMessageTag = {
    conversationType: {
        id: 0,
        retType: 'number'
    },
    receiverId: 1,
    deleteRoam: {
        id: 2,
        converter: boolToInt
    },
    teamId: 3,
    onlineSync: {
        id: 4,
        converter: boolToInt
    },
    deleteTime: {
        id: 6,
        retType: 'number'
    },
    serverExtension: 7
};
export const deleteMessageTag = {
    conversationType: {
        id: 1,
        access: 'messageRefer.conversationType',
        retType: 'number'
    },
    senderId: {
        id: 2,
        access: 'messageRefer.senderId'
    },
    receiverId: {
        id: 3,
        access: 'messageRefer.receiverId'
    },
    messageServerId: {
        id: 4,
        access: 'messageRefer.messageServerId'
    },
    messageClientId: {
        id: 5,
        access: 'messageRefer.messageClientId'
    },
    createTime: {
        id: 6,
        access: 'messageRefer.createTime',
        retType: 'number'
    },
    deleteTime: {
        id: 7,
        retType: 'number'
    },
    serverExtension: 8
};
export const cmdConfig = {
    v2DeleteMessage: {
        sid: 30,
        cid: 23,
        service: 'messageService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: deleteMessageTag }],
        response: [{ type: 'Long', name: 'timetag' }]
    },
    v2DeleteMessages: {
        sid: 30,
        cid: 24,
        service: 'messageService',
        params: [{ type: 'PropertyArray', name: 'tag', reflectMapper: deleteMessageTag }],
        response: [{ type: 'Long', name: 'timetag' }]
    },
    v2ClearHistoryMessage: {
        sid: 30,
        cid: 18,
        service: 'messageService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: clearHistoryMessageTag }],
        response: [{ type: 'Long', name: 'timetag' }]
    },
    onDeleteMessage: {
        sid: 7,
        cid: 123,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(deleteMessageTag) }]
    },
    onDeleteMessages: {
        sid: 7,
        cid: 124,
        service: serviceName,
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(deleteMessageTag) }]
    },
    onClearHistoryMessage: {
        sid: 7,
        cid: 118,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(clearHistoryMessageTag) }]
    }
};
