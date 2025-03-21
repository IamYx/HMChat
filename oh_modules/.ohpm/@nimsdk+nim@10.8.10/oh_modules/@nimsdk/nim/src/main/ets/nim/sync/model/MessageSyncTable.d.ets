import { ColumnInfo, NIM, RdbStoreManager, RdbTableImpl, SyncKey, TableType } from '@nimsdk/base';
export declare const NIM_SYNC_TABLE_MESSAGE: TableType;
export declare const SYNC_COLUMNS: ColumnInfo[];
export declare class MessageSyncTable extends RdbTableImpl {
    private logger;
    constructor(z141: RdbStoreManager, a142: NIM);
    createTable(): Promise<void>;
    queryBySyncKey(r141: SyncKey): Promise<number | null>;
    upsertBySyncKey(m141: SyncKey, n141: number): Promise<number>;
}
