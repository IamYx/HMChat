import { ColumnInfo, ColumnType, RdbPredicates, RdbTableImpl, V2NIMErrorImpl, V2NIMErrorMap } from '@nimsdk/base';
import { registerAspect } from './Aspect';
export const NIM_SYNC_TABLE_MAIN = {
    tableName: 'main_sync_table',
    columns: [
        'sync_key',
        'sync_timestamp'
    ]
};
export const SYNC_COLUMNS = [
    new ColumnInfo('sync_key', ColumnType.TEXT, -1, false),
    new ColumnInfo('sync_timestamp', ColumnType.INTEGER, -1, false),
];
const TAG = '[MainSyncTable]';
const tableName = NIM_SYNC_TABLE_MAIN.tableName;
export class MainSyncTable extends RdbTableImpl {
    constructor(k141, l141) {
        super(k141);
        this.logger = l141.logger;
        registerAspect(tableName, MainSyncTable, l141);
    }
    async createTable() {
        try {
            this.createTableError = null;
            const j141 = {
                tableName: tableName,
                indexName: 'sync_index',
                columns: ['sync_key']
            };
            await Promise.all([
                await this.rdbStoreManager.createTable(tableName, false, SYNC_COLUMNS),
                await this.rdbStoreManager.createTableUniqueIndex(j141)
            ]);
        }
        catch (i141) {
            this.logger.error(TAG, 'createTable', tableName, i141);
            this.createTableError = i141;
        }
    }
    async queryBySyncKey(d141) {
        try {
            await this.ensureCreateTable();
            const f141 = d141.toString();
            const g141 = new RdbPredicates(tableName);
            g141.equalTo('sync_key', f141);
            const h141 = await this.rdbStoreManager.query(g141);
            if (h141.length > 0) {
                return h141[0].sync_timestamp;
            }
            else {
                return null;
            }
        }
        catch (e141) {
            this.logger.error(TAG, 'queryBySyncKey', tableName, e141);
            if (e141 instanceof V2NIMErrorImpl || e141.name === 'V2NIMError') {
                throw e141;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code,
                    desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message,
                    detail: { reason: `queryBySyncKey ${d141}`, rawError: e141 }
                });
            }
        }
    }
    async upsertBySyncKey(y140, z140) {
        try {
            await this.ensureCreateTable();
            const b141 = {};
            const c141 = y140.toString();
            b141['sync_key'] = c141;
            b141['sync_timestamp'] = z140;
            return await this.rdbStoreManager.insertOrReplace(tableName, [b141]);
        }
        catch (a141) {
            this.logger.error(TAG, 'upsertBySyncKey', tableName, a141);
            if (a141 instanceof V2NIMErrorImpl || a141.name === 'V2NIMError') {
                throw a141;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code,
                    desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message,
                    detail: { 'reason': `upsertBySyncKey ${y140} ${z140} ${JSON.stringify(a141)}` }
                });
            }
        }
    }
}
