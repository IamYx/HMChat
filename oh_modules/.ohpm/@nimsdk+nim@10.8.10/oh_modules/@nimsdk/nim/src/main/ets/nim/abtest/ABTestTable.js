import { ABTExperiment, ColumnInfo, ColumnType, RdbPredicates, RdbTableImpl } from '@nimsdk/base';
import HashMap from "@ohos.util.HashMap";
var COL_NAME;
(function (d34) {
    d34["KEY"] = "experiment_key";
    d34["SCHEME_KEY"] = "scheme_key";
    d34["VARIATES"] = "variates";
})(COL_NAME || (COL_NAME = {}));
export const ABT_TABLE = {
    tableName: 'ab_test_table',
    columns: [
        COL_NAME.KEY,
        COL_NAME.SCHEME_KEY,
        COL_NAME.VARIATES
    ]
};
export const ABTestColumns = [
    new ColumnInfo(COL_NAME.KEY, ColumnType.TEXT, -1, false),
    new ColumnInfo(COL_NAME.SCHEME_KEY, ColumnType.INTEGER, -1, true),
    new ColumnInfo(COL_NAME.VARIATES, ColumnType.TEXT, -1, true)
];
export class ABTestTable extends RdbTableImpl {
    constructor(c34) {
        super(c34, ABT_TABLE.tableName);
    }
    async createTable() {
        try {
            this.createTableError = null;
            const b34 = {
                tableName: ABT_TABLE.tableName,
                indexName: 'EXPERIMENT_KEY_INDEX',
                columns: [COL_NAME.KEY]
            };
            await Promise.all([
                await this.rdbStoreManager.createTable(ABT_TABLE.tableName, false, ABTestColumns),
                await this.rdbStoreManager.createTableUniqueIndex(b34)
            ]);
        }
        catch (a34) {
            console.error(`create table data: abTest ${a34}`);
            this.createTableError = a34;
        }
    }
    async addExperiments(w33) {
        try {
            if (typeof w33 === 'undefined' || w33.length <= 0) {
                return;
            }
            await this.ensureCreateTable();
            await this.rdbStoreManager.clearTable(this.tableName);
            let y33 = [];
            if (w33.length > 0) {
                y33 = w33.map(z33 => {
                    return this.generateBucket(z33);
                });
            }
            else {
                return;
            }
            await this.rdbStoreManager.insert(this.tableName, y33);
        }
        catch (x33) {
            throw x33;
        }
    }
    async getExperiment(r33) {
        try {
            await this.ensureCreateTable();
            const t33 = new RdbPredicates(this.tableName)
                .equalTo(COL_NAME.KEY, r33);
            const u33 = await this.rdbStoreManager.query(t33);
            let v33 = {};
            if (u33.length > 0) {
                v33 = this.getObjectByValue(u33[0]);
            }
            return v33;
        }
        catch (s33) {
            throw s33;
        }
    }
    async getExperimentByScheme(l33, m33) {
        try {
            await this.ensureCreateTable();
            const o33 = new RdbPredicates(this.tableName)
                .equalTo(COL_NAME.KEY, l33)
                .and()
                .equalTo(COL_NAME.SCHEME_KEY, m33);
            const p33 = await this.rdbStoreManager.query(o33);
            let q33 = {};
            if (p33.length > 0) {
                q33 = this.getObjectByValue(p33[0]);
            }
            return q33;
        }
        catch (n33) {
            throw n33;
        }
    }
    async loadAllExperiment() {
        try {
            await this.ensureCreateTable();
            const h33 = await this.rdbStoreManager.queryAll(this.tableName);
            const i33 = new HashMap();
            h33.map(j33 => {
                const k33 = this.getObjectByValue(j33);
                if (typeof k33.experimentKey === 'string' && k33.experimentKey.length > 0) {
                    i33.set(k33.experimentKey, k33);
                }
            });
            return i33;
        }
        catch (g33) {
            throw g33;
        }
    }
    safeStringify(e33) {
        try {
            return JSON.stringify(e33);
        }
        catch (f33) {
            return undefined;
        }
    }
    generateBucket(b33) {
        let c33 = {};
        ABT_TABLE.columns.forEach((d33) => {
            switch (d33) {
                case COL_NAME.KEY:
                    c33[d33] = b33.experimentKey;
                    break;
                case COL_NAME.SCHEME_KEY:
                    c33[d33] = b33.schemeKey;
                    break;
                case COL_NAME.VARIATES:
                    c33[d33] = this.safeStringify(b33.variates);
                    break;
                default:
                    break;
            }
        });
        return c33;
    }
    getObjectByValue(x32) {
        try {
            const z32 = new ABTExperiment();
            z32.experimentKey = x32.experiment_key;
            z32.schemeKey = x32.scheme_key;
            const a33 = x32.variates;
            z32.variates = JSON.parse(a33);
            return z32;
        }
        catch (y32) {
            return {};
        }
    }
}
