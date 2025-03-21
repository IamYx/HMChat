import { boolToInt, invertSerializeItem } from '../../../parser';
export const serviceName = 'friendService';
export let cmdMap = {
    '35_1': 'v2AddFriend',
    '35_2': 'v2DeleteFriend',
    '35_3': 'v2SetFriendInfo',
    '35_4': 'v2IncFriendInfo',
    '12_101': 'v2OnAddFriend',
    '12_102': 'v2OnDeleteFriend',
    '12_103': 'v2OnUpdateFriendInfo'
};
export const deleteParamsTag = {
    deleteAlias: {
        id: 1,
        converter: boolToInt
    }
};
export const friendTag = {
    accountId: 4,
    source: {
        id: 7,
        retType: 'number'
    },
    alias: 8,
    serverExtension: 10,
    createTime: {
        id: 11,
        retType: 'number'
    },
    updateTime: {
        id: 12,
        retType: 'number'
    },
    customerExtension: 13
};
export const serializeTag = {
    friendTag: friendTag
};
export const serverExtTag = {
    serverExt: 1
};
export const cmdConfig = {
    v2AddFriend: {
        sid: 35,
        cid: 1,
        service: serviceName,
        params: [
            { type: 'String', name: 'accountId' },
            { type: 'Byte', name: 'verifyType' },
            { type: 'String', name: 'postscript' }
        ],
        response: []
    },
    v2DeleteFriend: {
        sid: 35,
        cid: 2,
        service: serviceName,
        params: [
            { type: 'String', name: 'accountId' },
            { type: 'Property', name: 'params', reflectMapper: deleteParamsTag }
        ]
    },
    v2SetFriendInfo: {
        sid: 35,
        cid: 3,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: friendTag }]
    },
    v2OnAddFriend: {
        sid: 12,
        cid: 101,
        service: serviceName,
        response: [
            { type: 'String', name: 'accountId' },
            { type: 'Byte', name: 'verifyType' },
            { type: 'String', name: 'postscript' },
            { type: 'Property', name: 'ext', reflectMapper: invertSerializeItem(serverExtTag) }
        ]
    },
    v2OnDeleteFriend: {
        sid: 12,
        cid: 102,
        service: serviceName,
        response: [{ type: 'String', name: 'accountId' }]
    },
    v2OnUpdateFriendInfo: {
        sid: 12,
        cid: 103,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(friendTag) }]
    },
    v2IncFriendInfo: {
        sid: 35,
        cid: 4,
        service: serviceName,
        params: [{ type: 'Long', name: 'timetag' }],
        response: [
            {
                type: 'PropertyArray',
                name: 'friends',
                reflectMapper: invertSerializeItem(friendTag)
            },
            {
                type: 'Long',
                name: 'timetag'
            }
        ]
    }
};
