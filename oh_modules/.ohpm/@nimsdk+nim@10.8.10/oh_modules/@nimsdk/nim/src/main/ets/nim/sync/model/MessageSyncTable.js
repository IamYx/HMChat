import { ColumnInfo, ColumnType, RdbPredicates, RdbTableImpl, V2NIMErrorImpl, V2NIMErrorMap } from '@nimsdk/base';
import { registerAspect } from './Aspect';
export const NIM_SYNC_TABLE_MESSAGE = {
    tableName: 'message_sync_table',
    columns: [
        'sync_key',
        'sync_timestamp'
    ]
};
export const SYNC_COLUMNS = [
    new ColumnInfo('sync_key', ColumnType.TEXT, -1, false),
    new ColumnInfo('sync_timestamp', ColumnType.INTEGER, -1, false),
];
const TAG = '[MessageSyncTable]';
const tableName = NIM_SYNC_TABLE_MESSAGE.tableName;
export class MessageSyncTable extends RdbTableImpl {
    constructor(z141, a142) {
        super(z141);
        this.logger = a142.logger;
        registerAspect(tableName, MessageSyncTable, a142);
    }
    async createTable() {
        try {
            this.createTableError = null;
            const y141 = {
                tableName: tableName,
                indexName: 'sync_index',
                columns: ['sync_key']
            };
            await Promise.all([
                await this.rdbStoreManager.createTable(tableName, false, SYNC_COLUMNS),
                await this.rdbStoreManager.createTableUniqueIndex(y141)
            ]);
        }
        catch (x141) {
            this.logger.error(TAG, 'createTable', tableName, x141);
            this.createTableError = x141;
        }
    }
    async queryBySyncKey(r141) {
        try {
            await this.ensureCreateTable();
            const t141 = r141.toString();
            const u141 = new RdbPredicates(tableName);
            u141.equalTo('sync_key', t141);
            const v141 = await this.rdbStoreManager.query(u141);
            if (v141.length > 0) {
                const w141 = v141[0];
                return w141.sync_timestamp;
            }
            else {
                return null;
            }
        }
        catch (s141) {
            this.logger.error(TAG, 'queryBySyncKey', tableName, s141);
            if (s141 instanceof V2NIMErrorImpl || s141.name === 'V2NIMError') {
                throw s141;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code,
                    desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message,
                    detail: { reason: `queryBySyncKey ${r141}`, rawError: s141 }
                });
            }
        }
    }
    async upsertBySyncKey(m141, n141) {
        try {
            await this.ensureCreateTable();
            const p141 = {};
            const q141 = m141.toString();
            p141['sync_key'] = q141;
            p141['sync_timestamp'] = n141;
            return await this.rdbStoreManager.insertOrReplace(tableName, [p141]);
        }
        catch (o141) {
            this.logger.error(TAG, 'upsertBySyncKey', tableName, o141);
            if (o141 instanceof V2NIMErrorImpl || o141.name === 'V2NIMError') {
                throw o141;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code,
                    desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message,
                    detail: { 'reason': `upsertBySyncKey ${m141} ${n141} ${JSON.stringify(o141)}` }
                });
            }
        }
    }
}
