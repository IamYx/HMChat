import dataRdb from '@ohos.data.relationalStore';
import { RdbStoreImpl } from './RdbStoreImpl';
export class RdbStoreManagerImpl {
    constructor(k50, l50) {
        this.rdbStoreMap = new Map();
        this.customDir = '';
        this.dbName = '';
        this.core = k50;
        this.dbContext = k50.context;
        this.dbName = l50;
        this.options = {
            securityLevel: 1,
            encrypt: false
        };
    }
    syncCreateDB(g50, h50, i50, j50) {
        this.customDir = g50;
        if (typeof h50 !== 'undefined') {
            this.options = h50;
            this.reporterService = j50;
        }
        this.pluginLibs = i50;
    }
    async getDb(b50) {
        try {
            if (!this.dbContext || !b50 || b50.length === 0 || !this.customDir) {
                throw new Error(`create db params invalid, is dbContext empty? ${!this.dbContext}, dbContext.databaseDir: ${JSON.stringify(this.dbContext.databaseDir)}, dbName: ${JSON.stringify(b50)}, customDir: ${JSON.stringify(this.customDir)}`);
            }
            let d50 = this.rdbStoreMap.get(b50);
            if (!d50) {
                const e50 = {
                    name: b50,
                    securityLevel: this.options.securityLevel ?? 1,
                    customDir: this.customDir,
                    encrypt: this.options.encrypt ?? false,
                };
                if (this.pluginLibs && this.pluginLibs.length > 0) {
                    e50.pluginLibs = this.pluginLibs;
                }
                const f50 = new RdbStoreImpl(this.core, e50, this.reporterService);
                d50 = await f50.getRdb(this.dbContext);
                this.dbName = b50;
                this.rdbStoreMap.set(b50, d50);
            }
            return d50;
        }
        catch (c50) {
            throw c50;
        }
    }
    async deleteDb(y49, z49) {
        try {
            return await dataRdb.deleteRdbStore(y49, z49);
        }
        catch (a50) {
            throw new Error(`delete db failed ${a50}`);
        }
    }
    async beginTransaction() {
        try {
            const x49 = await this.getDb(this.dbName);
            x49.beginTransaction();
        }
        catch (w49) {
            throw new Error(`beginTransaction failed ${w49}`);
        }
    }
    async commit() {
        try {
            const v49 = await this.getDb(this.dbName);
            v49.commit();
        }
        catch (u49) {
            throw new Error(`commit failed ${u49}`);
        }
    }
    async rollBack() {
        try {
            const t49 = await this.getDb(this.dbName);
            t49.rollBack();
        }
        catch (s49) {
            throw new Error(`rollBack failed ${s49}`);
        }
    }
    async close() {
        try {
            const r49 = await this.getDb(this.dbName);
            await r49.close();
            this.rdbStoreMap.delete(this.dbName);
        }
        catch (q49) {
            throw new Error(`close failed ${q49}`);
        }
    }
    async createTable(k49, l49, m49, n49) {
        try {
            const p49 = await this.getDb(this.dbName);
            await p49.createTable(k49, l49, m49, n49);
        }
        catch (o49) {
            throw new Error(`createTable failed ${o49}`);
        }
    }
    async createTableIndex(h49) {
        try {
            const j49 = await this.getDb(this.dbName);
            await j49.createTableIndex(h49.tableName, h49.indexName, h49.columns);
        }
        catch (i49) {
            throw new Error(`createTableIndex failed ${i49}`);
        }
    }
    async createTableUniqueIndex(e49) {
        try {
            let g49 = await this.getDb(this.dbName);
            await g49.createTableUniqueIndex(e49.tableName, e49.indexName, e49.columns);
        }
        catch (f49) {
            throw new Error(`createTableUniqueIndex failed ${f49}`);
        }
    }
    async createIndex(a49, b49) {
        try {
            let d49 = await this.getDb(this.dbName);
            await d49.createTableIndex(a49, b49.indexName, b49.columns);
        }
        catch (c49) {
            throw new Error(`createIndex failed ${c49}`);
        }
    }
    async createUniqueIndex(w48, x48) {
        try {
            let z48 = await this.getDb(this.dbName);
            await z48.createTableUniqueIndex(w48, x48.indexName, x48.columns);
        }
        catch (y48) {
            throw new Error(`createUniqueIndex failed ${y48}`);
        }
    }
    async upgradeVersion(s48, t48) {
        try {
            let v48 = await this.getDb(this.dbName);
            await v48.upgradeVersion(s48, t48);
        }
        catch (u48) {
            throw new Error(`upgradeVersion failed ${u48}`);
        }
    }
    async deleteTable(p48) {
        try {
            let r48 = await this.getDb(this.dbName);
            await r48.deleteTable(p48);
        }
        catch (q48) {
            throw new Error(`deleteTable failed ${q48}`);
        }
    }
    async clearTable(m48) {
        try {
            let o48 = await this.getDb(this.dbName);
            await o48.clearTable(m48);
        }
        catch (n48) {
            throw new Error(`clearTable failed ${n48}`);
        }
    }
    async backup(j48) {
        try {
            let l48 = await this.getDb(this.dbName);
            await l48.backup(j48);
        }
        catch (k48) {
            throw new Error(`backup failed ${k48}`);
        }
    }
    async restore(g48) {
        try {
            let i48 = await this.getDb(this.dbName);
            await i48.restore(g48);
        }
        catch (h48) {
            throw new Error(`restore failed ${h48}`);
        }
    }
    async executeSql(c48, d48) {
        try {
            let f48 = await this.getDb(this.dbName);
            await f48.execute(c48, d48 ?? []);
        }
        catch (e48) {
            throw new Error(`restore failed ${e48}`);
        }
    }
    async insert(y47, z47) {
        try {
            let b48 = await this.getDb(this.dbName);
            return await b48.insert(y47, z47);
        }
        catch (a48) {
            throw new Error(`insert failed ${a48}`);
        }
    }
    async queryCount(u47, v47) {
        const w47 = await u47.querySql(`SELECT COUNT(*) FROM ${v47}`, undefined);
        if (w47.length > 0) {
            const x47 = w47[0]['COUNT(*)'];
            return x47;
        }
        else {
            return 0;
        }
    }
    async insertOrReplace(q47, r47) {
        try {
            let t47 = await this.getDb(this.dbName);
            return await t47.insertOrReplace(q47, r47);
        }
        catch (s47) {
            throw new Error(`insertOrReplace failed ${s47}`);
        }
    }
    async update(m47, n47) {
        try {
            if (Object.keys(m47).length <= 0) {
                return 0;
            }
            let p47 = await this.getDb(this.dbName);
            return await p47.update(m47, n47);
        }
        catch (o47) {
            throw new Error(`update failed ${o47}`);
        }
    }
    async query(h47, i47) {
        try {
            let k47 = await this.getDb(this.dbName);
            const l47 = await k47.query(h47, i47 ?? []);
            return l47;
        }
        catch (j47) {
            throw new Error(`query failed ${j47}`);
        }
    }
    async queryAll(e47) {
        try {
            let g47 = await this.getDb(this.dbName);
            return await g47.querys(e47);
        }
        catch (f47) {
            throw new Error(`queryAll failed ${f47}`);
        }
    }
    async queryBySql(a47, b47) {
        try {
            let d47 = await this.getDb(this.dbName);
            return await d47.querySql(a47, b47);
        }
        catch (c47) {
            throw new Error(`queryBySql failed ${c47}`);
        }
    }
    async delete(x46) {
        try {
            let z46 = await this.getDb(this.dbName);
            return await z46.delete(x46);
        }
        catch (y46) {
            throw new Error(`del failed ${y46}`);
        }
    }
    async deletes(t46, u46) {
        try {
            let w46 = await this.getDb(this.dbName);
            return await w46.deletes(t46, u46);
        }
        catch (v46) {
            throw new Error(`del failed ${v46}`);
        }
    }
}
