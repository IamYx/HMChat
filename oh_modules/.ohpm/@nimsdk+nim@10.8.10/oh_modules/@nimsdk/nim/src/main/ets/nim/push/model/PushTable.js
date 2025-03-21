import { ColumnInfo, ColumnType, RdbPredicates, V2NIMErrorImpl, V2NIMErrorMap } from '@nimsdk/base';
export const NIM_PUSH_TABLE_MAIN = 'push_table';
export const NIM_PUSH_TABLE_COLUMN_KEY = 'push_key';
export const NIM_PUSH_TABLE_COLUMN_VALUE = 'push_value';
const PUSH_COLUMNS = [
    new ColumnInfo(NIM_PUSH_TABLE_COLUMN_KEY, ColumnType.TEXT, -1, false),
    new ColumnInfo(NIM_PUSH_TABLE_COLUMN_VALUE, ColumnType.TEXT, -1, false),
];
export class PushTable {
    constructor(m96) {
        this.rdbStoreManager = m96;
        this.tableType = {
            tableName: NIM_PUSH_TABLE_MAIN,
            columns: [
                PUSH_COLUMNS[0].name,
                PUSH_COLUMNS[1].name,
            ]
        };
        this.createTablePromise = this.createTable();
        this.createTableError = null;
    }
    async createTable() {
        try {
            this.createTableError = null;
            await Promise.all([
                await this.rdbStoreManager.createTable(this.tableType.tableName, false, PUSH_COLUMNS),
                await this.rdbStoreManager.createUniqueIndex(this.tableType.tableName, { indexName: 'client_id_index', columns: [NIM_PUSH_TABLE_COLUMN_KEY] })
            ]);
        }
        catch (l96) {
            this.createTableError = l96;
            throw new Error;
        }
    }
    async ensureCreateTable() {
        await this.createTablePromise;
        if (this.createTableError) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code,
                desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message,
                detail: { 'reason': `ensureCreateTable ${this.tableType} ${this.createTableError}` }
            });
        }
        else {
            return true;
        }
    }
    async queryByPushKey(h96) {
        try {
            await this.ensureCreateTable();
            const j96 = new RdbPredicates(this.tableType.tableName);
            j96.equalTo(NIM_PUSH_TABLE_COLUMN_KEY, h96);
            const k96 = await this.rdbStoreManager.query(j96);
            if (k96.length <= 0) {
                return null;
            }
            else {
                return k96[0].push_value;
            }
        }
        catch (i96) {
            if (i96 instanceof V2NIMErrorImpl || i96.name === 'V2NIMError') {
                throw i96;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code,
                    desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message,
                    detail: { reason: `queryByPushKey ${h96}`, rawError: i96 }
                });
            }
        }
    }
    async upsertByPushKey(d96, e96) {
        try {
            await this.ensureCreateTable();
            let g96 = {};
            g96[NIM_PUSH_TABLE_COLUMN_KEY] = d96;
            g96[NIM_PUSH_TABLE_COLUMN_VALUE] = e96;
            return await this.rdbStoreManager.insertOrReplace(this.tableType.tableName, [g96]);
        }
        catch (f96) {
            if (f96 instanceof V2NIMErrorImpl || f96.name === 'V2NIMError') {
                throw f96;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code,
                    desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message,
                    detail: { 'reason': `upsertByPushKey ${d96} ${e96} ${JSON.stringify(f96)}` }
                });
            }
        }
    }
}
