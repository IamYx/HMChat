import { get } from '@nimsdk/vendor/Index';
import { boolToInt, invertSerializeItem, objectToJSONString } from '../../../../parser';
import { chatroomAttachmentToRaw, chatroomRawToAttachment } from '../../../../utils/format';
import { chatroomCdnInfoTag } from '../login/parseMap';
const serviceName = 'messageService';
export const cmdMap = {
    '36_6': 'v2ChatroomSendMessage',
    '36_9': 'v2ChatroomGetMessageList',
    '36_35': 'v2ChatroomMessageAck',
    '36_36': 'v2ChatroomGetMessageListByTag',
    '13_7': 'v2ChatroomOnMessage',
    '29_17': 'v2ChatroomDownloadLocalAntiSpamVocabs',
    '6_23': 'v2ChatroomGetServerTime',
    '13_99': 'v2ChatroomUpdateCDNInfo'
};
const clientAntiSpamTag = {
    version: 1,
    md5: 2,
    nosurl: 3,
    thesaurus: 4
};
export const chatroomMsgTag = {
    messageClientId: 1,
    messageType: {
        id: 2,
        retType: 'number'
    },
    attachment: {
        id: 3,
        converter: (p7, q7) => {
            return chatroomAttachmentToRaw(q7.messageType, p7);
        },
        retConverter: (m7, n7) => {
            const o7 = Number(n7['2']);
            return chatroomRawToAttachment(m7, o7);
        }
    },
    serverExtension: 4,
    resend: {
        id: 5,
        converter: boolToInt,
        retType: 'boolean'
    },
    userInfoTimestamp: {
        id: 6,
        access: 'userInfoConfig.userInfoTimestamp',
        retType: 'number'
    },
    senderNick: {
        id: 7,
        access: 'userInfoConfig.senderNick'
    },
    senderAvatar: {
        id: 8,
        access: 'userInfoConfig.senderAvatar'
    },
    senderExtension: {
        id: 9,
        access: 'userInfoConfig.senderExtension'
    },
    antispamCustomMessageEnabled: {
        id: 10,
        def: (l7) => {
            return get(l7, 'antispamConfig.antispamCustomMessage') ? 1 : 0;
        },
        retConverter: () => undefined
    },
    antispamCustomMessage: {
        id: 11,
        access: 'antispamConfig.antispamCustomMessage'
    },
    historyEnabled: {
        id: 12,
        access: 'messageConfig.historyEnabled',
        converter: (k7) => {
            return k7 ? 0 : 1;
        },
        retConverter: (j7) => {
            return parseInt(j7) ? false : true;
        }
    },
    text: 13,
    antiSpamBusinessId: {
        id: 14,
        access: 'antispamConfig.antispamBusinessId'
    },
    clientAntispamHit: {
        id: 15,
        access: 'clientAntispamHit',
        converter: boolToInt,
        retType: 'boolean'
    },
    antispamEnabled: {
        id: 16,
        access: 'antispamConfig.antispamEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    createTime: {
        id: 20,
        retType: 'number'
    },
    senderId: 21,
    roomId: 22,
    senderClientType: {
        id: 23,
        retType: 'number'
    },
    highPriority: {
        id: 25,
        access: 'messageConfig.highPriority',
        converter: boolToInt,
        retType: 'boolean'
    },
    callbackExtension: 27,
    subType: {
        id: 28,
        retType: 'number'
    },
    antispamCheating: {
        id: 29,
        access: 'antispamConfig.antispamCheating'
    },
    routeEnvironment: {
        id: 30,
        access: 'routeConfig.routeEnvironment'
    },
    notifyTargetTags: 31,
    antispamExtension: {
        id: 32,
        access: 'antispamConfig.antispamExtension'
    },
    antispamResult: 33,
    x: {
        id: 34,
        access: 'locationInfo.x',
        retType: 'number'
    },
    y: {
        id: 35,
        access: 'locationInfo.y',
        retType: 'number'
    },
    z: {
        id: 36,
        access: 'locationInfo.z',
        retType: 'number'
    },
    receiverIds: {
        id: 37,
        converter: objectToJSONString
    },
    routeEnabled: {
        id: 100,
        access: 'routeConfig.routeEnabled',
        converter: boolToInt,
        retType: 'boolean',
        retDef: true
    }
};
const chatRoomTagHistoryMsgRequestTag = {
    tags: 1,
    messageTypes: 2,
    beginTime: 3,
    endTime: 4,
    limit: 5,
    reverse: 6
};
export const cmdConfig = {
    v2ChatroomSendMessage: {
        sid: 36,
        cid: 6,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: chatroomMsgTag
            }
        ],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(chatroomMsgTag) }]
    },
    v2ChatroomOnMessage: {
        sid: 13,
        cid: 7,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(chatroomMsgTag) }]
    },
    v2ChatroomGetMessageList: {
        sid: 36,
        cid: 9,
        service: serviceName,
        params: [
            { type: 'Long', name: 'beginTime' },
            { type: 'Int', name: 'limit' },
            { type: 'Bool', name: 'reverse' },
            { type: 'LongArray', name: 'messageTypes' }
        ],
        response: [{ type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(chatroomMsgTag) }]
    },
    v2ChatroomMessageAck: {
        sid: 36,
        cid: 35,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: { messageClientId: 1, roomId: 2 } }]
    },
    v2ChatroomGetMessageListByTag: {
        sid: 36,
        cid: 36,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: chatRoomTagHistoryMsgRequestTag }],
        response: [{ type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(chatroomMsgTag) }]
    },
    v2ChatroomDownloadLocalAntiSpamVocabs: {
        sid: 29,
        cid: 17,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: clientAntiSpamTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(clientAntiSpamTag) }]
    },
    v2ChatroomGetServerTime: {
        sid: 6,
        cid: 23,
        service: serviceName,
        response: [{ type: 'Long', name: 'time' }]
    },
    v2ChatroomUpdateCDNInfo: {
        sid: 13,
        cid: 99,
        service: serviceName,
        response: [{ type: 'Property', name: 'chatroomCdnInfo', reflectMapper: invertSerializeItem(chatroomCdnInfoTag) }]
    }
};
export const serializeTag = {};
