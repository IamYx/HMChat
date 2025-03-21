/**
 * Request params of protocol:
 * getNosToken
 */
export declare class CRGetNosTokenRequest {
    count: number;
    nosToken: CRNosTokenParams;
    constructor(c4: number, d4: CRNosTokenParams);
}
/**
 * Params of 'CRGetNosTokenRequest'
 */
export declare class CRNosTokenParams {
    tag: string;
    expireSec: number;
    constructor(a4: string, b4: number);
}
/**
 * Request params of protocol:
 * getOriginUrl
 */
export declare class CRGetOriginUrlRequest {
    nosSafeUrlTag: CRNosSafeUrlTagParam;
    constructor(z3: CRNosSafeUrlTagParam);
}
/**
 * Params of 'CRGetOriginUrlRequest'
 */
export declare class CRNosSafeUrlTagParam {
    safeUrl: string;
    constructor(y3: string);
}
