import { invertSerializeItem } from '../../../parser';
export const serviceName = 'userService';
export let cmdMap = {
    '34_3': 'v2UpdateBlockList',
    '34_7': 'v2GetUserList',
    '34_10': 'v2UpdateSelfUserProfile',
    '3_110': 'onUpdateUserProfile',
    '3_103': 'onUpdateBlockList',
    '34_5': 'v2SetP2PMessageMuteMode',
    '3_105': 'v2OnUpdateMuteList'
};
export const relationTag = {
    accountId: 0,
    isMute: {
        id: 1,
        retType: 'boolean'
    },
    isBlock: {
        id: 2,
        retType: 'boolean'
    }
};
export const userInfoTag = {
    accountId: 1,
    name: 3,
    avatar: 4,
    sign: 5,
    gender: {
        id: 6,
        retType: 'number'
    },
    email: 7,
    birthday: 8,
    mobile: 9,
    serverExtension: 10,
    createTime: {
        id: 12,
        retType: 'number'
    },
    updateTime: {
        id: 13,
        retType: 'number'
    }
};
export const serializeTag = {
    userInfoTag: userInfoTag,
    relationTag: relationTag
};
export const cmdConfig = {
    v2UpdateBlockList: {
        sid: 34,
        cid: 3,
        service: serviceName,
        params: [
            { type: 'String', name: 'accountId' },
            { type: 'Bool', name: 'addToBlockList' }
        ]
    },
    v2GetUserList: {
        sid: 34,
        cid: 7,
        service: serviceName,
        params: [{ type: 'StrArray', name: 'accountIds' }],
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(userInfoTag) }]
    },
    v2UpdateSelfUserProfile: {
        sid: 34,
        cid: 10,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: userInfoTag }],
        response: [{ type: 'Long', name: 'updateTime' }]
    },
    onUpdateUserProfile: {
        sid: 3,
        cid: 110,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(userInfoTag) }]
    },
    onUpdateBlockList: {
        sid: 3,
        cid: 103,
        service: serviceName,
        response: [
            { type: 'String', name: 'accountId' },
            { type: 'Bool', name: 'addToBlockList' }
        ]
    },
    v2SetP2PMessageMuteMode: {
        sid: 34,
        cid: 5,
        service: serviceName,
        params: [
            { type: 'String', name: 'accountId' },
            { type: 'Bool', name: 'muteMode' }
        ]
    },
    v2OnUpdateMuteList: {
        sid: 3,
        cid: 105,
        service: serviceName,
        response: [
            { type: 'String', name: 'accountId' },
            { type: 'Bool', name: 'mute' }
        ]
    }
};
