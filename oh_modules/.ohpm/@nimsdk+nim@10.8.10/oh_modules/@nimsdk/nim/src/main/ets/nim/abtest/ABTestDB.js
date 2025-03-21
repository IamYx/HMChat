import { ABTestTable } from './ABTestTable';
import { RdbStoreManagerImpl } from '../database/rdb/RdbStoreManagerImpl';
export class ABTestDB {
    constructor(f32, g32) {
        this.rdbStore = new RdbStoreManagerImpl(f32, 'abtest.db');
        this.rdbStore.syncCreateDB(g32);
        this.table = new ABTestTable(this.rdbStore);
    }
    async createDB() {
        await this.rdbStore.getDb('abtest.db');
        this.table = new ABTestTable(this.rdbStore);
    }
    async createTable() {
        await this.table.createTable();
    }
    async loadAllExperiment() {
        const e32 = await this.table.loadAllExperiment();
        return e32;
    }
    async addExperiments(d32) {
        await this.table?.addExperiments(d32);
    }
    async getExperiment(c32) {
        return await this.table.getExperiment(c32);
    }
    async getExperimentByScheme(a32, b32) {
        return await this.table.getExperimentByScheme(a32, b32);
    }
}
