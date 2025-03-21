import { ColumnInfo, DatabaseOptions, IndexType, NIM, RdbPredicates, RdbStoreInterface, RdbStoreManager, ReporterServiceInternal, TableIndexType } from '@nimsdk/base';
import { Context } from '@ohos.abilityAccessCtrl';
import dataRdb from '@ohos.data.relationalStore';
import { ValueType } from '@ohos.data.ValuesBucket';
export declare class RdbStoreManagerImpl implements RdbStoreManager {
    private rdbStoreMap;
    private core;
    private dbContext;
    private customDir;
    private dbName;
    private options;
    private reporterService?;
    private pluginLibs?;
    constructor(k50: NIM, l50: string);
    syncCreateDB(g50: string, h50?: DatabaseOptions, i50?: string[], j50?: ReporterServiceInternal): void;
    getDb(b50: string): Promise<RdbStoreInterface>;
    deleteDb(y49: Context, z49: string): Promise<void>;
    beginTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollBack(): Promise<void>;
    close(): Promise<void>;
    createTable(k49: string, l49: string | boolean, m49: ColumnInfo[], n49?: string[]): Promise<void>;
    createTableIndex(h49: TableIndexType): Promise<void>;
    createTableUniqueIndex(e49: TableIndexType): Promise<void>;
    createIndex(a49: string, b49: IndexType): Promise<void>;
    createUniqueIndex(w48: string, x48: IndexType): Promise<void>;
    upgradeVersion(s48: string, t48: ColumnInfo): Promise<void>;
    deleteTable(p48: string): Promise<void>;
    clearTable(m48: string): Promise<void>;
    backup(j48: string): Promise<void>;
    restore(g48: string): Promise<void>;
    executeSql(c48: string, d48?: ValueType[]): Promise<void>;
    insert(y47: string, z47: dataRdb.ValuesBucket[]): Promise<number>;
    /**
     * 获取一张表内的元素数量
     * @param dbStore
     * @param tableName
     * @returns
     */
    private queryCount;
    insertOrReplace(q47: string, r47: dataRdb.ValuesBucket[]): Promise<number>;
    update(m47: dataRdb.ValuesBucket, n47: RdbPredicates): Promise<number>;
    query(h47: RdbPredicates, i47?: string[] | undefined): Promise<dataRdb.ValuesBucket[]>;
    queryAll(e47: string): Promise<dataRdb.ValuesBucket[]>;
    queryBySql(a47: string, b47?: dataRdb.ValueType[]): Promise<dataRdb.ValuesBucket[]>;
    delete(x46: RdbPredicates): Promise<number>;
    deletes(t46: string, u46: RdbPredicates[]): Promise<void>;
}
