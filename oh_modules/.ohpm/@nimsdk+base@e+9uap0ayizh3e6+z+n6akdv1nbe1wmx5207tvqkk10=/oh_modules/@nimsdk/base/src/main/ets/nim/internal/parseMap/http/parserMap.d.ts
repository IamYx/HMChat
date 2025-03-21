import { CmdConfigMap, CmdMap } from '../../../parser';
import { NIMServiceName } from '../../../sdk/types';
export declare const serviceName: NIMServiceName;
export declare let cmdMap: CmdMap;
export declare const serializeTag: {
    nosToken: {
        objectName: number;
        token: number;
        bucket: number;
        expireTime: number;
        expireSec: number;
        tag: number;
        shortUrl: number;
    };
    mixStoreTokenReqTag: {
        provider: number;
        tokenCount: number;
        nosSurvivalTime: number;
        tag: number;
        returnBody: number;
    };
    nosConfigTag: {
        bucket: number;
        cdnDomain: number;
        expire: number;
        objectNamePrefix: number;
    };
    grayConfigTag: {
        config: number;
        ttl: number;
    };
    mixStorePolicyTag: {
        providers: number;
        ttl: number;
        mixEnable: number;
        nosPolicy: number;
        s3Policy: number;
    };
    mixStoreTokenResTag: {
        provider: number;
        accessKeyId: number;
        secretAccessKey: number;
        sessionToken: number;
        token: number;
        expireTime: number;
        bucket: number;
        objectName: number;
        fileExpireSec: number;
        tag: number;
        shortUrl: number;
        region: number;
    };
    nosSafeUrlTag: {
        safeUrl: number;
        originUrl: number;
    };
    mixStoreAuthTokenReqTag: {
        type: number;
        urls: number;
    };
    mixStoreAuthTokenResTag: {
        type: number;
        tokens: number;
        token: number;
        ttl: number;
    };
    nosAccessTokenTag: {
        token: number;
        url: number;
        userAgent: number;
        ext: number;
    };
};
export declare const cmdConfig: CmdConfigMap;
