import { invert } from '@nimsdk/vendor';
const serviceName = 'loginService';
export let cmdMap = {
    '26_2': 'v2Login',
    '26_5': 'v2Logout',
    '26_8': 'v2KickOffline',
    '26_9': 'v2BeKicked',
    '26_10': 'v2LoginClientChange',
    '6_3': 'sdkLogUpload',
    '6_4': 'uploadLogUrl',
    '6_23': 'getServerTime',
    '36_1': 'v2GetChatroomLinkAddress'
};
export const conflictCmdMap = {
    '1_2': 'heartbeat',
    '2_7': 'nimLoginClientChange',
    '24_8': 'qchatLoginClientChange'
};
export const serializeTag = {
    loginReqTag: {
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
        appKey: 18,
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
    },
    mixAuthRepTag: {
        clientId: 1,
        consid: 2,
        clientIP: 3,
        port: 4,
        type: 5,
        customClientType: 6,
        timetag: 7,
        customTag: 8,
        os: 9,
        pushType: 10,
        hasTokenPreviously: 11,
        loginType: 12
    },
    nimAuthRepTag: {
        type: 3,
        os: 4,
        mac: 5,
        clientId: 13,
        account: 19,
        deviceInfo: 32,
        customTag: 38,
        customClientType: 39,
        consid: 102,
        clientIP: 103,
        port: 104,
        timetag: 109,
        pushType: 110,
        hasTokenPreviously: 111
    },
    qchatAuthRepTag: {
        clientId: 8,
        consid: 102,
        ip: 103,
        port: 104,
        type: 6,
        customClientType: 13,
        timetag: 105,
        os: 30,
        pushType: 100,
        hasTokenPreviously: 101
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
    v2Login: {
        sid: 26,
        cid: 2,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: serializeTag.loginReqTag }],
        response: [
            { type: 'Property', name: 'data', reflectMapper: invert(serializeTag.mixAuthRepTag) },
            { type: 'PropertyArray', name: 'loginClients', reflectMapper: invert(serializeTag.mixAuthRepTag) }
        ]
    },
    v2Logout: {
        sid: 26,
        cid: 5,
        service: serviceName,
        response: []
    },
    v2KickOffline: {
        sid: 26,
        cid: 8,
        service: serviceName,
        params: [{ type: 'StrArray', name: 'clientIds' }],
        response: [{ type: 'StrArray', name: 'clientIds' }]
    },
    v2BeKicked: {
        sid: 26,
        cid: 9,
        service: serviceName,
        response: [
            { type: 'Int', name: 'clientType' },
            { type: 'Int', name: 'reason' },
            { type: 'String', name: 'reasonDesc' },
            { type: 'Int', name: 'customClientType' }
        ]
    },
    v2LoginClientChange: {
        sid: 26,
        cid: 10,
        service: serviceName,
        response: [
            { type: 'Byte', name: 'state' },
            { type: 'PropertyArray', name: 'datas', reflectMapper: invert(serializeTag.mixAuthRepTag) }
        ]
    },
    v2GetChatroomLinkAddress: {
        sid: 36,
        cid: 1,
        service: serviceName,
        params: [
            { type: 'Long', name: 'roomId' },
            { type: 'Bool', name: 'type' }
        ],
        response: [{ type: 'StrArray', name: 'linkAddress' }]
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
    },
    getServerTime: {
        sid: 6,
        cid: 23,
        service: serviceName,
        response: [{ type: 'Long', name: 'time' }]
    }
};
export const conflictCmdConfig = {
    heartbeat: {
        sid: 1,
        cid: 2,
        service: serviceName
    },
    nimLoginClientChange: {
        sid: 2,
        cid: 7,
        service: serviceName,
        response: [
            { type: 'Byte', name: 'state' },
            { type: 'PropertyArray', name: 'datas', reflectMapper: invert(serializeTag.nimAuthRepTag) }
        ]
    },
    qchatLoginClientChange: {
        sid: 24,
        cid: 8,
        service: serviceName,
        response: [
            { type: 'Byte', name: 'state' },
            { type: 'Property', name: 'data', reflectMapper: invert(serializeTag.qchatAuthRepTag) }
        ]
    }
};
