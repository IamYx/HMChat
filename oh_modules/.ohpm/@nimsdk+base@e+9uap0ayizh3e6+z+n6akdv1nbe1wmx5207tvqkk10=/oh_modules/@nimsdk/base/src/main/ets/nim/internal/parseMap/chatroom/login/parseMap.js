import { chatroomMemberTag } from '../member/parserMap';
import { invertSerializeItem } from '../../../../parser';
const serviceName = 'loginService';
export const cmdMap = {
    '1_2': 'heartbeat',
    '36_2': 'v2ChatroomLogin',
    '13_3': 'v2ChatroomBeKicked',
    '36_4': 'v2ChatroomLogout',
    '6_3': 'sdkLogUpload',
    '6_4': 'uploadLogUrl'
};
export const chatroomLoginTag = {
    appkey: 1,
    account: 2,
    deviceId: 3,
    chatroomId: 5,
    appLogin: 8,
    chatroomNick: 20,
    chatroomAvatar: 21,
    serverExtension: 22,
    notificationExtension: 23,
    clientSession: 26,
    isAnonymous: {
        id: 38,
        converter: (h7) => +h7
    },
    tags: {
        id: 39,
        converter: (g7) => {
            if (Array.isArray(g7) && g7.length > 0) {
                return JSON.stringify(g7);
            }
        }
    },
    notifyTargetTags: 40,
    authType: 41,
    loginExt: 42,
    x: 43,
    y: 44,
    z: 45,
    distance: 46,
    antiSpamBusinessId: 47
};
export const loginReqTag = {
    uid: 0,
    userState: 1,
    clientType: 3,
    os: 4,
    mac: 5,
    clientVersion: 6,
    channel: 7,
    manualLogin: 8,
    protocolVersion: 9,
    pushTokenName: 10,
    pushToken: 11,
    deviceId: 13,
    simCarrierCode: 14,
    simCountryCode: 15,
    networkCode: 16,
    appkey: 18,
    appAccount: 19,
    bundleId: 25,
    clientSession: 26,
    deviceModel: 27,
    androidid: 28,
    imei: 29,
    idfv: 30,
    openuuid: 31,
    deviceInfo: 32,
    vendor: 33,
    bssid: 34,
    onlineStats: 35,
    customTag: 38,
    customClientType: 39,
    sdkHumanVersion: 40,
    sdkType: 41,
    userAgent: 42,
    eid: 43,
    consid: 102,
    clientIp: 103,
    loginTime: 109,
    customPushContentType: 114,
    authType: 115,
    loginExt: 116,
    oldLastDeviceIdMd5: 117,
    loginToken: 1000
};
export const chatroomInfoTag = {
    roomId: 1,
    roomName: 3,
    announcement: 4,
    liveUrl: 5,
    isValidRoom: {
        id: 9,
        retType: 'boolean'
    },
    serverExtension: 12,
    queueLevelMode: {
        id: 16,
        retType: 'number'
    },
    creatorAccountId: 100,
    onlineUserCount: {
        id: 101,
        retType: 'number'
    },
    chatBanned: {
        id: 102,
        retType: 'boolean'
    }
};
export const chatroomCdnInfoTag = {
    enabled: {
        id: 1,
        retType: 'boolean'
    },
    cdnUrls: {
        id: 2,
        retConverter(f7) {
            if (typeof f7 === 'string' && f7 !== '') {
                return f7.split('|');
            }
        }
    },
    timestamp: {
        id: 3,
        retType: 'number'
    },
    pollingIntervalSeconds: {
        id: 4,
        retType: 'number'
    },
    decryptType: {
        id: 5,
        retType: 'number'
    },
    decryptKey: 6,
    pollingTimeoutMillis: {
        id: 7,
        retType: 'number'
    }
};
export const uploadTaskTag = {
    sdklogUploadType: {
        id: 1,
        retType: 'number'
    },
    sdklogUploadMsg: {
        id: 2,
        retType: 'string'
    }
};
export const cmdConfig = {
    heartbeat: {
        sid: 1,
        cid: 2,
        service: serviceName,
        response: []
    },
    v2ChatroomLogin: {
        sid: 36,
        cid: 2,
        service: serviceName,
        params: [
            { type: 'Byte', name: 'type' },
            { type: 'Property', name: 'chatroomLogin', reflectMapper: chatroomLoginTag },
            { type: 'Property', name: 'chatroomIMLogin', reflectMapper: loginReqTag }
        ],
        response: [
            { type: 'Property', name: 'chatroomInfo', reflectMapper: invertSerializeItem(chatroomInfoTag) },
            { type: 'Property', name: 'chatroomMember', reflectMapper: invertSerializeItem(chatroomMemberTag) },
            { type: 'Property', name: 'chatroomCdnInfo', reflectMapper: invertSerializeItem(chatroomCdnInfoTag) }
        ]
    },
    v2ChatroomLogout: {
        sid: 36,
        cid: 4,
        service: serviceName,
        params: []
    },
    v2ChatroomBeKicked: {
        sid: 13,
        cid: 3,
        service: serviceName,
        response: [
            { type: 'Int', name: 'kickedReason' },
            { type: 'String', name: 'serverExtension' }
        ]
    },
    sdkLogUpload: {
        sid: 6,
        cid: 3,
        service: serviceName,
        hasPacketResponse: false
    },
    uploadLogUrl: {
        sid: 6,
        cid: 4,
        service: serviceName,
        params: [
            { type: 'String', name: 'url' },
            { type: 'Property', name: 'info', reflectMapper: uploadTaskTag }
        ]
    }
};
export const serializeTag = {};
