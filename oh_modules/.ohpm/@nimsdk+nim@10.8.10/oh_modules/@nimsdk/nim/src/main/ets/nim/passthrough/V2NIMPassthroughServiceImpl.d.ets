import { NIM, NIMServiceName, V2Service, V2NIMPassthroughListener, V2NIMPassthroughServiceInternal, NIMServiceConfig, V2NIMProxyRequest, V2NIMProxyResponse, Packet } from "@nimsdk/base";
export default class V2NIMPassthroughServiceImpl extends V2Service<V2NIMPassthroughListener> implements V2NIMPassthroughServiceInternal {
    constructor(u94: NIM, v94: NIMServiceName, w94: NIMServiceConfig);
    onLoginStart(t94: string): Promise<void>;
    onLoginFinished(s94: string): Promise<void>;
    onLogout(): void;
    httpProxy(i94: V2NIMProxyRequest): Promise<V2NIMProxyResponse>;
    /**
     * 22-2
     * @param packet
     */
    onSendMsgHandler(d94: Packet): Promise<void>;
}
