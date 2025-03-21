import { NIM, NIMServiceConfig, NIMServiceName, V2NIMAIListener, V2NIMAIServiceInternal, V2NIMAIUser, V2NIMProxyAIModelCallParams, V2Service } from '@nimsdk/base';
export declare class V2NIMAIServiceImpl extends V2Service<V2NIMAIListener> implements V2NIMAIServiceInternal {
    constructor(o34: NIM, p34: NIMServiceName, q34: NIMServiceConfig);
    onLoginStart(n34: string): Promise<void>;
    onLoginFinished(m34: string): Promise<void>;
    onLogout(): void | Promise<void>;
    getAIUserList(): Promise<V2NIMAIUser[]>;
    proxyAIModelCall(l34: V2NIMProxyAIModelCallParams): Promise<void>;
    v2IGetAIUserList(): Promise<V2NIMAIUser[]>;
    /**
     * AI 数字人请求代理接口
     *
     * @param params 接口入参
     */
    v2IProxyAIModelCall(g34: V2NIMProxyAIModelCallParams): Promise<void>;
    /**
     * 4-26
     * @param packet
     */
    private v2AIChatNotifyHandler;
}
