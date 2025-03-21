import { chatroomInfoTag } from '../login/parseMap';
import { invertSerializeItem } from '../../../../parser';
const serviceName = 'infoService';
export const cmdMap = {
    '36_13': 'v2GetChatroomInfo',
    '36_14': 'v2UpdateChatroomInfo',
    '36_30': 'v2SetTempChatBannedByTag',
    '13_33': 'v2UpdateChatroomLocation',
    '36_34': 'v2UpdateChatroomTags'
};
export const chatroomLocationTag = {
    x: 1,
    y: 2,
    z: 3,
    distance: 4
};
export const chatroomTagsUpdate = {
    tags: {
        id: 1,
        converter(e7) {
            return JSON.stringify(e7);
        }
    },
    notifyTargetTags: 2,
    notificationEnabled: {
        id: 3,
        converter(d7) {
            return +d7;
        }
    },
    notificationExtension: 4
};
export const chatroomTagMute = {
    targetTag: 1,
    duration: 2,
    notificationEnabled: {
        id: 3,
        converter: (c7) => +c7
    },
    notificationExtension: 4,
    notifyTargetTags: 5
};
export const cmdConfig = {
    v2GetChatroomInfo: {
        sid: 36,
        cid: 13,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(chatroomInfoTag) }]
    },
    v2UpdateChatroomInfo: {
        sid: 36,
        cid: 14,
        service: serviceName,
        params: [
            { type: 'Property', name: 'chatroom', reflectMapper: chatroomInfoTag },
            { type: 'Bool', name: 'notificationEnabled' },
            { type: 'String', name: 'notificationExtension' }
        ]
    },
    v2SetTempChatBannedByTag: {
        sid: 36,
        cid: 30,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: chatroomTagMute }]
    },
    v2UpdateChatroomLocation: {
        sid: 13,
        cid: 33,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: chatroomLocationTag }]
    },
    v2UpdateChatroomTags: {
        sid: 36,
        cid: 34,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: chatroomTagsUpdate }]
    }
};
export const serializeTag = {};
