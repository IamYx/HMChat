import { rcp } from "@kit.RemoteCommunicationKit";
import { NIM } from "@nimsdk/base";
export declare class HttpExceptionInterceptor implements rcp.Interceptor {
    private core;
    constructor(q63: NIM);
    intercept(k63: rcp.RequestContext, l63: rcp.RequestHandler): Promise<rcp.Response>;
}
