import { NIM, NIMPreferenceSync, V2NIMLoginLbsInternal, V2NIMLoginServiceInternal, NIMLbsChosenProtocolFamily } from '@nimsdk/base/';
/**
 * lbs 处理类
 */
export default class V2NIMLoginLbs implements V2NIMLoginLbsInternal {
    core: NIM;
    loginService: V2NIMLoginServiceInternal;
    linkCache: LinkCache | null;
    nimPreferenceSync: NIMPreferenceSync;
    lbsCache: string[];
    private fetchLbsIndex;
    private fetchLbsPromise;
    constructor(a87: NIM);
    private saveToCache;
    private loadFromCache;
    /**
     * 请求 LBS 连接，去获取一些配置和 socket 长连接地址
     *
     * @returns socket 长连接的地址列表
     */
    getLink(): Promise<string>;
    fetchLbs(): Promise<string[]>;
    performFetchLbs(): Promise<string[]>;
    doFetchLbs(h86: string, i86: NIMLbsChosenProtocolFamily): Promise<string[][]>;
    chooseLbsProtocolFamily(): NIMLbsChosenProtocolFamily;
    reset(): void;
    refresh(): void;
    discard(): void;
}
declare class LinkCache {
    cachedUrls: string[];
    timestamp: number;
    constructor(b86: string[], c86: number);
    isExpired(): boolean;
    needFetchNew(): boolean;
}
export {};
