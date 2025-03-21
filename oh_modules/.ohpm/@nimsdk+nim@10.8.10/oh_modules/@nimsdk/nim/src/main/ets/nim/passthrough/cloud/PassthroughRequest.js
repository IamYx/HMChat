import { V2NIMProxyRequestMethod } from "@nimsdk/base";
export class HttpProxyRequest {
    constructor(c94) {
        this.tag = c94;
    }
}
export class HttpProxyParam {
    constructor(b94) {
        this.zone = b94.zone;
        this.path = b94.path;
        this.method = b94.method ?? V2NIMProxyRequestMethod.V2NIM_PROXY_REQUEST_METHOD_POST;
        this.header = b94.header;
        this.body = b94.body;
    }
}
