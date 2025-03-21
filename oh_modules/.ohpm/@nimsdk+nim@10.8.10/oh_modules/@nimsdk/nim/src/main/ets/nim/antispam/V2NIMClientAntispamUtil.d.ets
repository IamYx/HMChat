import { NIM, NIMServiceConfig, NIMServiceName, V2NIMClientAntispamResult, V2NIMLocalAntispamUtilInternal, V2Service } from '@nimsdk/base';
export default class V2NIMClientAntispamUtil extends V2Service implements V2NIMLocalAntispamUtilInternal {
    private model;
    private cloud;
    constructor(u37: NIM, v37: NIMServiceName, w37?: NIMServiceConfig);
    onLoginStart(t37: string): Promise<void>;
    onLoginFinished(r37: string): Promise<void>;
    onLogout(): void;
    private syncLocalAntispam;
    /**
     * 本地客户端反垃圾检测
     */
    checkTextAntispam(f37?: string, g37?: string): V2NIMClientAntispamResult;
    /**
     * 使用 thesaurus 中单个规则进行过滤
     */
    private filterContent;
    /**
     * 实际检测函数
     */
    private matchContent;
}
