import { Backoff } from '@nimsdk/vendor';
import { NIM, V2NIMLoginReconnectInternal, V2NIMLoginServiceInternal } from '@nimsdk/base/';
/**
 * 重连逻辑处理类
 */
export default class V2NIMLoginReconnect implements V2NIMLoginReconnectInternal {
    core: NIM;
    loginService: V2NIMLoginServiceInternal;
    currenRetryCount: number;
    backoff: Backoff;
    reconnectTimer: number;
    reconnectDelayProvider?: (delay: number) => number;
    constructor(w87: NIM);
    reset(): void;
    clearReconnectTimer(): void;
    /**
     * 重连准备
     *
     * @returns 是否会进行重连
     */
    attempt2ReLogin(): boolean;
    doReLogin(): Promise<import("@nimsdk/base/").V2NIMLoginClient>;
    _setReconnectDelayProvider(n87: (delay: number) => number): void;
}
