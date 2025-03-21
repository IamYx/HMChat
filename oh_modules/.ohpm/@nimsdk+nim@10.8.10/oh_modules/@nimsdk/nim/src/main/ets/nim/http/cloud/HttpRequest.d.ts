/**
 * Request params of protocol:
 * getNosToken
 */
export declare class GetNosTokenRequest {
    count: number;
    nosToken: NosTokenParams;
    constructor(x55: number, y55: NosTokenParams);
}
/**
 * Params of 'GetNosTokenRequest'
 */
export declare class NosTokenParams {
    tag: string;
    expireSec: number;
    constructor(v55: string, w55: number);
}
/**
 * Request params of protocol:
 * getOriginUrl
 */
export declare class GetOriginUrlRequest {
    nosSafeUrlTag: NosSafeUrlTagParam;
    constructor(u55: NosSafeUrlTagParam);
}
/**
 * Params of 'GetOriginUrlRequest'
 */
export declare class NosSafeUrlTagParam {
    safeUrl: string;
    constructor(t55: string);
}
export declare class GetNosAccessTokenTag {
    tag: GetNosAccessTokenTagParam;
    constructor(s55: GetNosAccessTokenTagParam);
}
export declare class GetNosAccessTokenTagParam {
    url: string;
    userAgent?: string;
    ext?: string;
    constructor(p55: string, q55?: string, r55?: string);
}
export declare class DeleteNosAccessTokenTag {
    tag: DeleteNosAccessTokenTagParam;
    constructor(o55: DeleteNosAccessTokenTagParam);
}
export declare class DeleteNosAccessTokenTagParam {
    token: string;
    constructor(n55: string);
}
