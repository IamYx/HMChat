import { DatabaseOptions, NIM, NIMDatabaseName, NIMServiceName, RdbStoreManager, V2NIMDatabaseServiceInternal, V2Service, RdbStoreInterface } from '@nimsdk/base';
export declare class V2NIMDatabaseServiceImpl extends V2Service implements V2NIMDatabaseServiceInternal {
    config: DatabaseOptions;
    private rdbStoreManagerMap;
    private hasInitialized;
    private notifyDatabaseOpen;
    private databases;
    constructor(t54: NIM, u54: NIMServiceName, v54: DatabaseOptions);
    notifyDatabaseReady(s54: string): Promise<void>;
    onLoginStart(r54: string): Promise<void>;
    onLoginFinished(q54: string): Promise<void>;
    justBeforeOnLogin(p54: string): Promise<void>;
    onLogout(): Promise<void>;
    getDatabase(k54: NIM, l54: NIMDatabaseName): RdbStoreManager;
    initDB(d54: NIM, e54: string): Promise<void>;
    doSyncCrateDB(): Promise<void>;
    restore(q53: RdbStoreManager, r53: string): Promise<void>;
    backup(m53: RdbStoreInterface, n53: string): Promise<void>;
    /**
     * 消息表 db & 启用 searchService，则在 rdb 中注册 libsimple.so 的路径
     * @param context 上下文，用于获取 context.bundleCodeDir
     * @param dbName 数据库名称，用于判断数据库
     * @returns
     */
    private acquireFtsPluginLibs;
    /**
     * 查看文件列表
     */
    private getListFile;
}
