import { ReporterTable } from './ReporterTable';
import { RdbStoreManagerImpl } from '../../database/rdb/RdbStoreManagerImpl';
export class ReporterDB {
    constructor(t100, u100) {
        this.rdbStore = new RdbStoreManagerImpl(t100, 'apm_event.db');
        this.rdbStore.syncCreateDB(u100);
        this.table = new ReporterTable(this.rdbStore);
    }
    async createDB() {
        await this.rdbStore.getDb('apm_event.db');
        this.table = new ReporterTable(this.rdbStore);
    }
    async addItem(s100) {
        await this.table.addItem(s100);
    }
    async getItem(r100) {
        return await this.table.getItem(r100);
    }
    async deleteItems(q100) {
        return await this.table.deleteItems(q100);
    }
}
