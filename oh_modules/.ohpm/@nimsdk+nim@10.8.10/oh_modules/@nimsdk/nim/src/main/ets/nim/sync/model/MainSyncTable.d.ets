import { ColumnInfo, NIM, RdbStoreManager, RdbTableImpl, SyncKey, TableType } from '@nimsdk/base';
export declare const NIM_SYNC_TABLE_MAIN: TableType;
export declare const SYNC_COLUMNS: ColumnInfo[];
export declare class MainSyncTable extends RdbTableImpl {
    private logger;
    constructor(k141: RdbStoreManager, l141: NIM);
    createTable(): Promise<void>;
    queryBySyncKey(d141: SyncKey): Promise<number | null>;
    upsertBySyncKey(y140: SyncKey, z140: number): Promise<number>;
}
