import JSON from "@ohos.util.json";
import taskpool from "@ohos.taskpool";
import { NIM } from '@nimsdk/base';
import RStore from '@ohos.data.relationalStore';
import { SRdbPredicatesFactory } from './SRdbPredicatesFactory';
import { addTableColumnSql, clearTableSql, createTableIndex, createTableSql, createTableUniqueIndex, deleteTableSql } from './TableHelper';
const TAG = '[RdbStoreImpl]';
async function getRdbStore(q46, r46) {
    "use concurrent";
    const s46 = await RStore.getRdbStore(q46, r46);
    return s46;
}
async function close(n46, o46) {
    "use concurrent";
    const p46 = await RStore.getRdbStore(n46, o46);
    return await p46.close();
}
async function insert(f46, g46, h46, i46, j46) {
    "use concurrent";
    const k46 = await RStore.getRdbStore(f46, g46);
    try {
        k46.beginTransaction();
        await Promise.all(i46.map(async (m46) => {
            await k46.insert(h46, m46, j46);
        }));
    }
    catch (l46) {
        throw l46;
    }
    finally {
        k46.commit();
    }
}
async function batchInsert(a46, b46, c46, d46) {
    "use concurrent";
    const e46 = await RStore.getRdbStore(a46, b46);
    return await e46.batchInsert(c46, d46);
}
async function update(u45, v45, w45, x45) {
    "use concurrent";
    const y45 = await RStore.getRdbStore(u45, v45);
    const z45 = new RStore.RdbPredicates(x45.tableName);
    SRdbPredicatesFactory.transform(x45, z45);
    return await y45.update(w45, z45);
}
async function del(n45, o45, p45) {
    "use concurrent";
    const q45 = await RStore.getRdbStore(n45, o45);
    let r45 = -1;
    try {
        q45.beginTransaction();
        const t45 = new RStore.RdbPredicates(p45.tableName);
        SRdbPredicatesFactory.transform(p45, t45);
        r45 = await q45.delete(t45);
    }
    catch (s45) {
        throw s45;
    }
    finally {
        q45.commit();
    }
    return r45;
}
async function deletes(f45, g45, h45, i45) {
    "use concurrent";
    const j45 = await RStore.getRdbStore(f45, g45);
    try {
        j45.beginTransaction();
        await Promise.allSettled(i45.map(async (l45) => {
            const m45 = new RStore.RdbPredicates(h45);
            SRdbPredicatesFactory.transform(l45, m45);
            await j45.delete(m45);
        }));
    }
    catch (k45) {
        throw k45;
    }
    finally {
        j45.commit();
    }
}
async function query(w44, x44, y44, z44) {
    "use concurrent";
    try {
        const b45 = await RStore.getRdbStore(w44, x44);
        const c45 = new RStore.RdbPredicates(y44.tableName);
        SRdbPredicatesFactory.transform(y44, c45);
        let d45;
        if (z44.length > 0) {
            d45 = await b45.query(c45, z44);
        }
        else {
            d45 = await b45.query(c45);
        }
        const e45 = new Array();
        while (d45.goToNextRow()) {
            e45.push(d45.getRow());
        }
        d45.close();
        return e45;
    }
    catch (a45) {
        throw a45;
    }
}
async function querySql(p44, q44, r44, s44) {
    "use concurrent";
    const t44 = await RStore.getRdbStore(p44, q44);
    let u44;
    if (s44.length > 0) {
        u44 = await t44.querySql(r44, s44);
    }
    else {
        u44 = await t44.querySql(r44);
    }
    const v44 = new Array();
    while (u44.goToNextRow()) {
        v44.push(u44.getRow());
    }
    u44.close();
    return v44;
}
async function executeSql(k44, l44, m44, n44) {
    "use concurrent";
    const o44 = await RStore.getRdbStore(k44, l44);
    if (n44.length > 0) {
        return await o44.executeSql(m44, n44);
    }
    else {
        return await o44.executeSql(m44);
    }
}
async function execute(f44, g44, h44, i44) {
    "use concurrent";
    const j44 = await RStore.getRdbStore(f44, g44);
    if (i44.length > 0) {
        return await j44.execute(h44, i44);
    }
    else {
        return await j44.execute(h44);
    }
}
async function beginTransaction(c44, d44) {
    "use concurrent";
    const e44 = await RStore.getRdbStore(c44, d44);
    return e44.beginTransaction();
}
async function commit(z43, a44) {
    "use concurrent";
    const b44 = await RStore.getRdbStore(z43, a44);
    return b44.commit();
}
async function rollBack(w43, x43) {
    "use concurrent";
    const y43 = await RStore.getRdbStore(w43, x43);
    return y43.rollBack();
}
async function backup(s43, t43, u43) {
    "use concurrent";
    const v43 = await RStore.getRdbStore(s43, t43);
    return await v43.backup(u43);
}
async function restore(o43, p43, q43) {
    "use concurrent";
    const r43 = await RStore.getRdbStore(o43, p43);
    return await r43.restore(q43);
}
export class RdbStoreImpl {
    constructor(l43, m43, n43) {
        this.databaseName = '';
        this.rdbStore = {};
        this.tablesInfoMap = new Map();
        this.storeConfig = {
            name: '',
            securityLevel: RStore.SecurityLevel.S1
        };
        this.context = l43.context;
        this.storeConfig = m43;
        this.reporterService = n43;
        this.sequenceRunner = new taskpool.SequenceRunner(taskpool.Priority.HIGH);
    }
    getDbName() {
        return this.databaseName;
    }
    async getRdb(h43) {
        try {
            const k43 = new taskpool.Task(getRdbStore, h43, this.storeConfig);
            this.rdbStore = await this.sequenceRunner.execute(k43);
            return this;
        }
        catch (i43) {
            const j43 = i43;
            this.reporterService?.addException({
                action: 4,
                code: j43.code,
                description: j43.message,
                operationType: 0,
                context: 'get rdb',
                target: this.databaseName
            });
            NIM.getLogger()?.error(TAG, `getRdbfailed ${i43}`);
            throw j43;
        }
    }
    getRdbStore() {
        return this.rdbStore;
    }
    async backup(d43) {
        try {
            const g43 = new taskpool.Task(backup, this.context, this.storeConfig, d43);
            await this.sequenceRunner.execute(g43);
        }
        catch (e43) {
            const f43 = e43;
            this.reporterService?.addException({
                action: 4,
                code: f43.code,
                description: f43.message,
                operationType: 2,
                context: 'backup',
                target: this.databaseName
            });
            NIM.getLogger()?.error(TAG, `${d43}, backup db failed ${e43}`);
            throw f43;
        }
    }
    async restore(z42) {
        try {
            const c43 = new taskpool.Task(restore, this.context, this.storeConfig, z42);
            await this.sequenceRunner.execute(c43);
        }
        catch (a43) {
            const b43 = a43;
            this.reporterService?.addException({
                action: 4,
                code: b43.code,
                description: b43.message,
                operationType: 2,
                context: 'restore',
                target: this.databaseName
            });
            NIM.getLogger()?.error(TAG, `${z42}, estore db failed${a43}`);
            throw b43;
        }
    }
    async rollBack() {
        try {
            const y42 = new taskpool.Task(rollBack, this.context, this.storeConfig);
            await this.sequenceRunner.execute(y42);
        }
        catch (w42) {
            const x42 = w42;
            this.reporterService?.addException({
                action: 4,
                code: x42.code,
                description: x42.message,
                operationType: 2,
                context: 'rollBack',
                target: this.databaseName
            });
            NIM.getLogger()?.error(TAG, 'executeSql failed', w42);
            throw x42;
        }
    }
    async beginTransaction() {
        try {
            const v42 = new taskpool.Task(beginTransaction, this.context, this.storeConfig);
            await this.sequenceRunner.execute(v42);
        }
        catch (t42) {
            const u42 = t42;
            this.reporterService?.addException({
                action: 4,
                code: u42.code,
                description: u42.message,
                operationType: 2,
                context: 'beginTransaction',
                target: this.databaseName
            });
            NIM.getLogger()?.error(TAG, 'beginTransaction failed', t42);
            throw u42;
        }
    }
    async commit() {
        try {
            const s42 = new taskpool.Task(commit, this.context, this.storeConfig);
            await this.sequenceRunner.execute(s42);
        }
        catch (q42) {
            const r42 = q42;
            this.reporterService?.addException({
                action: 4,
                code: r42.code,
                description: r42.message,
                operationType: 2,
                context: 'commit',
                target: this.databaseName
            });
            NIM.getLogger()?.error(TAG, 'commit failed', q42);
            throw r42;
        }
    }
    async close() {
        try {
            const p42 = new taskpool.Task(close, this.context, this.storeConfig);
            await this.sequenceRunner.execute(p42);
        }
        catch (n42) {
            const o42 = n42;
            if (o42.code !== 14800014) {
                this.reporterService?.addException({
                    action: 4,
                    code: o42.code,
                    description: o42.message,
                    operationType: 2,
                    context: 'close',
                    target: this.databaseName
                });
                NIM.getLogger()?.error(TAG, `estore close failed ${n42}`);
                throw o42;
            }
            NIM.getLogger()?.error(TAG, `close db failed${n42}`);
        }
    }
    async upgradeVersion(k42, l42) {
        const m42 = await this.loadTableInfo(k42);
        if (m42.includes(l42.name) === false) {
            await this.addTableColumn(k42, l42);
        }
    }
    async execute(f42, g42) {
        try {
            const j42 = new taskpool.Task(execute, this.context, this.storeConfig, f42, g42);
            return await this.sequenceRunner.execute(j42);
        }
        catch (h42) {
            const i42 = h42;
            this.reporterService?.addException({
                action: 4,
                code: i42.code,
                description: i42.message,
                operationType: 2,
                context: f42,
                target: this.databaseName
            });
            NIM.getLogger()?.error(TAG, `executeSql failed sql: ${f42}, args: ${JSON.stringify(g42)}, err: ${h42}`);
            throw i42;
        }
    }
    async createTable(x41, y41, z41, a42) {
        try {
            let d42 = '';
            if (a42 && a42.length > 0) {
                d42 = createTableSql(x41, y41, z41, a42);
            }
            else {
                d42 = createTableSql(x41, y41, z41);
            }
            const e42 = new taskpool.Task(executeSql, this.context, this.storeConfig, d42, []);
            await this.sequenceRunner.execute(e42);
        }
        catch (b42) {
            NIM.getLogger()?.error(TAG, `create table: ${x41}, columns: ${JSON.stringify(z41)}, ${JSON.stringify(b42)}`);
            const c42 = b42;
            this.reporterService?.addException({
                action: 4,
                code: c42.code,
                description: c42.message,
                operationType: 3,
                context: `create table ${x41}`,
                target: x41
            });
            throw c42;
        }
    }
    async createTableIndex(q41, r41, s41) {
        try {
            const v41 = createTableIndex(q41, r41, s41);
            const w41 = new taskpool.Task(executeSql, this.context, this.storeConfig, v41, []);
            await this.sequenceRunner.execute(w41);
        }
        catch (t41) {
            const u41 = t41;
            this.reporterService?.addException({
                action: 4,
                code: u41.code,
                description: u41.message,
                operationType: 3,
                context: `create table index ${q41}, ${r41}`,
                target: q41
            });
            NIM.getLogger()?.error(TAG, `create table index: ${q41}, index: ${r41}, columns: ${JSON.stringify(s41)}, ${JSON.stringify(t41)}`);
            throw u41;
        }
    }
    async createTableUniqueIndex(j41, k41, l41) {
        try {
            const o41 = createTableUniqueIndex(j41, k41, l41);
            const p41 = new taskpool.Task(executeSql, this.context, this.storeConfig, o41, []);
            await this.sequenceRunner.execute(p41);
        }
        catch (m41) {
            const n41 = m41;
            this.reporterService?.addException({
                action: 4,
                code: n41.code,
                description: n41.message,
                operationType: 3,
                context: `create table unique index ${j41}, ${k41}`,
                target: j41
            });
            NIM.getLogger()?.error(TAG, `create table unique  index: ${j41}, index: ${k41}, columns: ${JSON.stringify(l41)}`);
            throw n41;
        }
    }
    async deleteTable(e41) {
        try {
            const h41 = deleteTableSql(e41);
            const i41 = new taskpool.Task(executeSql, this.context, this.storeConfig, h41, []);
            await this.sequenceRunner.execute(i41);
        }
        catch (f41) {
            const g41 = f41;
            this.reporterService?.addException({
                action: 4,
                code: g41.code,
                description: g41.message,
                operationType: 3,
                context: `delete table ${e41}`,
                target: e41
            });
            NIM.getLogger()?.error(TAG, 'delete table', e41, f41);
            throw g41;
        }
    }
    async clearTable(z40) {
        try {
            const c41 = clearTableSql(z40);
            const d41 = new taskpool.Task(executeSql, this.context, this.storeConfig, c41, []);
            await this.sequenceRunner.execute(d41);
        }
        catch (a41) {
            const b41 = a41;
            this.reporterService?.addException({
                action: 4,
                code: b41.code,
                description: b41.message,
                operationType: 3,
                context: `delete table ${z40}`,
                target: z40
            });
            NIM.getLogger()?.error(TAG, 'clear table', z40, a41);
            throw b41;
        }
    }
    async insert(t40, u40) {
        try {
            const x40 = new taskpool.Task(batchInsert, this.context, this.storeConfig, t40, u40);
            const y40 = await this.sequenceRunner.execute(x40);
            return y40;
        }
        catch (v40) {
            const w40 = v40;
            this.reporterService?.addException({
                action: 4,
                code: w40.code,
                description: w40.message,
                operationType: 3,
                context: `insert ${t40}`,
                target: t40
            });
            NIM.getLogger()?.error(TAG, 'insert', t40, v40);
            throw w40;
        }
    }
    async insertOrReplace(n40, o40) {
        try {
            if (o40.length > 0) {
                const r40 = new taskpool.Task(insert, this.context, this.storeConfig, n40, o40, RStore.ConflictResolution.ON_CONFLICT_REPLACE);
                const s40 = await this.sequenceRunner.execute(r40);
                return s40;
            }
            return 0;
        }
        catch (p40) {
            const q40 = p40;
            this.reporterService?.addException({
                action: 4,
                code: q40.code,
                description: q40.message,
                operationType: 3,
                context: `insertOrReplace ${n40}`,
                target: n40
            });
            NIM.getLogger()?.error(TAG, 'insertOrReplace', n40, p40);
            throw q40;
        }
    }
    async update(g40, h40) {
        try {
            const k40 = SRdbPredicatesFactory.make(h40);
            const l40 = new taskpool.Task(update, this.context, this.storeConfig, g40, k40);
            const m40 = await this.sequenceRunner.execute(l40);
            return m40;
        }
        catch (i40) {
            const j40 = i40;
            this.reporterService?.addException({
                action: 4,
                code: j40.code,
                description: j40.message,
                operationType: 3,
                context: `update: ${JSON.stringify(g40)}`,
                target: this.databaseName
            });
            NIM.getLogger()?.error(TAG, 'update values', g40, h40, i40);
            throw j40;
        }
    }
    async query(a40, b40) {
        try {
            const d40 = SRdbPredicatesFactory.make(a40);
            const e40 = new taskpool.Task(query, this.context, this.storeConfig, d40, b40);
            const f40 = await this.sequenceRunner.execute(e40);
            return f40;
        }
        catch (c40) {
            NIM.getLogger()?.error(TAG, 'query', a40, b40, c40);
            throw c40;
        }
    }
    async querys(u39) {
        try {
            const x39 = `select * from ${u39}`;
            const y39 = new taskpool.Task(querySql, this.context, this.storeConfig, x39, []);
            const z39 = await this.sequenceRunner.execute(y39);
            return z39;
        }
        catch (v39) {
            const w39 = v39;
            this.reporterService?.addException({
                action: 4,
                code: w39.code,
                description: w39.message,
                operationType: 3,
                context: `querys: ${u39}`,
                target: u39
            });
            NIM.getLogger()?.error(TAG, 'querys', u39, v39);
            throw w39;
        }
    }
    async querySql(o39, p39) {
        try {
            const s39 = new taskpool.Task(querySql, this.context, this.storeConfig, o39, p39 ?? []);
            const t39 = await this.sequenceRunner.execute(s39);
            return t39;
        }
        catch (q39) {
            const r39 = q39;
            this.reporterService?.addException({
                action: 4,
                code: r39.code,
                description: r39.message,
                operationType: 3,
                context: `queryBySql: ${o39}`,
                target: this.databaseName
            });
            NIM.getLogger()?.error(TAG, 'query by sql', o39, p39, q39);
            throw r39;
        }
    }
    async delete(i39) {
        try {
            const l39 = SRdbPredicatesFactory.make(i39);
            const m39 = new taskpool.Task(del, this.context, this.storeConfig, l39);
            const n39 = await this.sequenceRunner.execute(m39);
            return n39;
        }
        catch (j39) {
            const k39 = j39;
            this.reporterService?.addException({
                action: 4,
                code: k39.code,
                description: k39.message,
                operationType: 3,
                context: `delete: ${JSON.stringify(i39)}`,
                target: this.databaseName
            });
            NIM.getLogger()?.error(TAG, 'delete', j39);
            throw k39;
        }
    }
    async deletes(a39, b39) {
        try {
            const e39 = [];
            b39.map(g39 => {
                const h39 = SRdbPredicatesFactory.make(g39);
                e39.push(h39);
            });
            const f39 = new taskpool.Task(deletes, this.context, this.storeConfig, a39, e39);
            await this.sequenceRunner.execute(f39);
        }
        catch (c39) {
            const d39 = c39;
            this.reporterService?.addException({
                action: 4,
                code: d39.code,
                description: d39.message,
                operationType: 3,
                context: `deletes: ${JSON.stringify(b39)}`,
                target: this.databaseName
            });
            NIM.getLogger()?.error(TAG, 'deletes', c39);
            throw d39;
        }
    }
    async loadTableInfo(w38) {
        try {
            let y38 = this.tablesInfoMap.get(w38);
            if (y38 && y38.length > 0) {
                return y38;
            }
            else {
                const z38 = await this.queryTableInfo(w38);
                return z38;
            }
        }
        catch (x38) {
            return [];
        }
    }
    async queryTableInfo(o38) {
        try {
            const q38 = `pragma table_info(${o38})`;
            const r38 = new taskpool.Task(querySql, this.context, this.storeConfig, q38, []);
            const s38 = await this.sequenceRunner.execute(r38);
            let t38 = [];
            s38.map(u38 => {
                const v38 = u38['name'];
                if (v38) {
                    t38.push(v38);
                }
            });
            return t38;
        }
        catch (p38) {
            return [];
        }
    }
    async addTableColumn(l38, m38) {
        const n38 = addTableColumnSql(l38, m38);
        await this.execute(n38, []);
    }
}
