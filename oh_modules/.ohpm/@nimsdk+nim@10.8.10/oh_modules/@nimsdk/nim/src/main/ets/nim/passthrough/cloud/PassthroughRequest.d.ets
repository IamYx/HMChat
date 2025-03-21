import { V2NIMProxyRequest } from "@nimsdk/base";
/**
 * Request params of protocol:
 * v2UpdateSelfUserProfile
 */
export declare class HttpProxyRequest {
    tag: HttpProxyParam;
    constructor(c94: HttpProxyParam);
}
export declare class HttpProxyParam {
    zone?: string;
    path: string;
    method: number;
    header?: string;
    body?: string;
    constructor(b94: V2NIMProxyRequest);
}
