import { invert } from '@nimsdk/vendor';
const serviceName = 'httpService';
export let cmdMap = {
    '6_1': 'getNosToken',
    '6_22': 'getOriginUrl',
    '6_26': 'getNosCdnHost'
};
export const serializeTag = {
    nosToken: {
        objectName: 1,
        token: 2,
        bucket: 3,
        expireTime: 4,
        expireSec: 7,
        tag: 8,
        shortUrl: 9
    },
    mixStoreTokenReqTag: {
        provider: 0,
        tokenCount: 1,
        nosSurvivalTime: 2,
        tag: 3,
        returnBody: 4
    },
    nosConfigTag: {
        bucket: 1,
        cdnDomain: 2,
        expire: 3,
        objectNamePrefix: 4
    },
    grayConfigTag: {
        config: 0,
        ttl: 1
    },
    mixStorePolicyTag: {
        providers: 0,
        ttl: 1,
        mixEnable: 2,
        nosPolicy: 3,
        s3Policy: 4
    },
    mixStoreTokenResTag: {
        provider: 0,
        accessKeyId: 1,
        secretAccessKey: 2,
        sessionToken: 3,
        token: 4,
        expireTime: 5,
        bucket: 6,
        objectName: 7,
        fileExpireSec: 8,
        tag: 9,
        shortUrl: 10,
        region: 11
    },
    nosSafeUrlTag: {
        safeUrl: 0,
        originUrl: 1
    },
    mixStoreAuthTokenReqTag: {
        type: 1,
        urls: 2
    },
    mixStoreAuthTokenResTag: {
        type: 1,
        tokens: 2,
        token: 3,
        ttl: 4
    },
    nosAccessTokenTag: {
        token: 0,
        url: 1,
        userAgent: 2,
        ext: 3
    }
};
export const cmdConfig = {
    getNosToken: {
        sid: 6,
        cid: 1,
        service: serviceName,
        params: [
            { type: 'Long', name: 'count' },
            { type: 'Property', name: 'nosToken', reflectMapper: serializeTag.nosToken }
        ],
        response: [{ type: 'PropertyArray', name: 'nosToken', reflectMapper: invert(serializeTag.nosToken) }]
    },
    getOriginUrl: {
        sid: 6,
        cid: 22,
        service: serviceName,
        params: [{ type: 'Property', name: 'nosSafeUrlTag', reflectMapper: serializeTag.nosSafeUrlTag }],
        response: [{ type: 'Property', name: 'nosSafeUrlTag', reflectMapper: invert(serializeTag.nosSafeUrlTag) }]
    },
    getNosCdnHost: {
        sid: 6,
        cid: 26,
        service: serviceName,
        response: [{ type: 'Property', name: 'nosConfigTag', reflectMapper: invert(serializeTag.nosConfigTag) }]
    },
    getGrayscaleConfig: {
        sid: 6,
        cid: 27,
        service: 'cloudStorage',
        params: [{ type: 'Property', name: 'config' }],
        response: [{ type: 'Property', name: 'grayConfigTag', reflectMapper: invert(serializeTag.grayConfigTag) }]
    },
    getMixStorePolicy: {
        sid: 6,
        cid: 28,
        service: 'cloudStorage',
        params: [{ type: 'LongArray', name: 'supportType' }],
        response: [{ type: 'Property', name: 'mixStorePolicyTag', reflectMapper: invert(serializeTag.mixStorePolicyTag) }]
    },
    getMixStoreToken: {
        sid: 6,
        cid: 29,
        service: 'cloudStorage',
        params: [{ type: 'Property', name: 'mixStoreTokenReqTag', reflectMapper: serializeTag.mixStoreTokenReqTag }],
        response: [{ type: 'Property', name: 'mixStoreTokenResTag', reflectMapper: invert(serializeTag.mixStoreTokenResTag) }]
    },
    getFileAuthToken: {
        sid: 6,
        cid: 30,
        service: 'cloudStorage',
        params: [{ type: 'Property', name: 'mixStoreAuthTokenReqTag', reflectMapper: serializeTag.mixStoreAuthTokenReqTag }],
        response: [{ type: 'Property', name: 'mixStoreAuthTokenResTag', reflectMapper: invert(serializeTag.mixStoreAuthTokenResTag) }]
    },
    getNosAccessToken: {
        sid: 6,
        cid: 24,
        service: 'cloudStorage',
        params: [{ type: 'Property', name: 'tag', reflectMapper: serializeTag.nosAccessTokenTag }],
        response: [{ type: 'Property', name: 'tag', reflectMapper: invert(serializeTag.nosAccessTokenTag) }]
    },
    deleteNosAccessToken: {
        sid: 6,
        cid: 25,
        service: 'cloudStorage',
        params: [{ type: 'Property', name: 'tag', reflectMapper: serializeTag.nosAccessTokenTag }]
    }
};
