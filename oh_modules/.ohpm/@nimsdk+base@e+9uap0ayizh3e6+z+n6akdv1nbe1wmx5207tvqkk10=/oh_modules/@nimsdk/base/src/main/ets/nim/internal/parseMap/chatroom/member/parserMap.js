import { boolToInt, invertSerializeItem, objectToJSONString, stringToJSONObject } from '../../../../parser';
import { formatMultiEnterInfo } from '../services/format';
const serviceName = 'memberService';
export const cmdMap = {
    '36_15': 'v2ChatroomUpdateSelfMemberInfo',
    '36_16': 'v2ChatroomGetMemberByIds',
    '36_17': 'v2ChatroomKickMember',
    '36_19': 'v2ChatroomSetMemberTempChatBanned',
    '36_41': 'v2ChatroomGetMemberListByTag',
    '36_32': 'v2ChatroomGetMemberCountByTag',
    '36_37': 'v2ChatroomGetMemberListByOption',
    '36_38': 'v2ChatroomUpdateMemberRole',
    '36_39': 'v2ChatroomSetMemberBlockedStatus',
    '36_40': 'v2ChatroomSetMemberChatBannedStatus',
    '13_101': 'v2ChatroomOnMemberTagUpdated'
};
export const chatroomMemberTag = {
    roomId: 1,
    accountId: 2,
    memberRole: {
        id: 3,
        retType: 'number'
    },
    memberLevel: {
        id: 4,
        retDef: 0,
        retType: 'number'
    },
    roomNick: 5,
    roomAvatar: 6,
    serverExtension: 7,
    isOnline: {
        id: 8,
        retType: 'boolean'
    },
    enterTime: {
        id: 10,
        retType: 'number'
    },
    blocked: {
        id: 12,
        retType: 'boolean'
    },
    chatBanned: {
        id: 13,
        retType: 'boolean'
    },
    valid: {
        id: 14,
        retDef: true,
        retType: 'boolean'
    },
    updateTime: {
        id: 15,
        retDef: 0,
        retType: 'number'
    },
    tempChatBanned: {
        id: 16,
        retType: 'boolean',
        retDef: false
    },
    tempChatBannedDuration: {
        id: 17,
        retType: 'number'
    },
    tags: {
        id: 18,
        converter: objectToJSONString,
        retConverter: stringToJSONObject
    },
    notifyTargetTags: 19,
    multiEnterInfo: {
        id: 20,
        retConverter: formatMultiEnterInfo
    }
};
const chatroomMemberQueryByRoleTag = {
    memberRoles: {
        id: 1,
        converter: (i7) => i7.join(',')
    },
    onlyBlocked: {
        id: 2,
        converter: boolToInt
    },
    onlyChatBanned: {
        id: 3,
        converter: boolToInt
    },
    onlyOnline: {
        id: 4,
        converter: boolToInt
    },
    pageToken: 5,
    limit: 6
};
const chatroomAddMemberRoleTag = {
    accountId: 1,
    memberRole: 2,
    memberLevel: 3,
    notificationExtension: 4
};
export const cmdConfig = {
    v2ChatroomGetMemberByIds: {
        sid: 36,
        cid: 16,
        service: serviceName,
        params: [{ type: 'StrArray', name: 'accountIds' }],
        response: [{ type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(chatroomMemberTag) }]
    },
    v2ChatroomGetMemberListByOption: {
        sid: 36,
        cid: 37,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: chatroomMemberQueryByRoleTag }],
        response: [
            { type: 'Int', name: 'hasMore' },
            { type: 'String', name: 'pageToken' },
            { type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(chatroomMemberTag) }
        ]
    },
    v2ChatroomUpdateSelfMemberInfo: {
        sid: 36,
        cid: 15,
        service: serviceName,
        params: [
            { type: 'Property', name: 'tag', reflectMapper: chatroomMemberTag },
            { type: 'Bool', name: 'notificationEnabled' },
            { type: 'String', name: 'notificationExtension' },
            { type: 'Bool', name: 'persistence' },
            { type: 'Property', name: 'antispamConfig', reflectMapper: { antispamBusinessId: 1 } }
        ]
    },
    v2ChatroomSetMemberTempChatBanned: {
        sid: 36,
        cid: 19,
        service: serviceName,
        params: [
            { type: 'String', name: 'accountId' },
            { type: 'Long', name: 'tempChatBannedDuration' },
            { type: 'Bool', name: 'notificationEnabled' },
            { type: 'String', name: 'notificationExtension' }
        ]
    },
    v2ChatroomGetMemberListByTag: {
        sid: 36,
        cid: 41,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: { tag: 1, pageToken: 2, limit: 3 } }],
        response: [
            { type: 'Int', name: 'hasMore' },
            { type: 'String', name: 'pageToken' },
            { type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(chatroomMemberTag) }
        ]
    },
    v2ChatroomGetMemberCountByTag: {
        sid: 36,
        cid: 32,
        service: serviceName,
        params: [{ type: 'String', name: 'tag' }],
        response: [{ type: 'Long', name: 'data' }]
    },
    v2ChatroomKickMember: {
        sid: 36,
        cid: 17,
        service: serviceName,
        params: [
            { type: 'String', name: 'accountId' },
            { type: 'String', name: 'notificationExtension' }
        ]
    },
    v2ChatroomUpdateMemberRole: {
        sid: 36,
        cid: 38,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: chatroomAddMemberRoleTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(chatroomMemberTag) }]
    },
    v2ChatroomSetMemberBlockedStatus: {
        sid: 36,
        cid: 39,
        service: serviceName,
        params: [
            { type: 'String', name: 'accountId' },
            { type: 'Bool', name: 'blocked' },
            { type: 'String', name: 'notificationExtension' }
        ],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(chatroomMemberTag) }]
    },
    v2ChatroomSetMemberChatBannedStatus: {
        sid: 36,
        cid: 40,
        service: serviceName,
        params: [
            { type: 'String', name: 'accountId' },
            { type: 'Bool', name: 'chatBanned' },
            { type: 'String', name: 'notificationExtension' }
        ],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(chatroomMemberTag) }]
    },
    v2ChatroomOnMemberTagUpdated: {
        sid: 36,
        cid: 101,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: { 1: 'tag' } }]
    }
};
export const serializeTag = {};
