export class RdbTableImpl {
    constructor(d4, e4) {
        this.createTableError = null;
        this.rdbStoreManager = d4;
        this.tableName = e4 ?? '';
        this.createTablePromise = this.createTable();
    }
    createTable() {
        throw new Error('Method not implemented.');
    }
    async ensureCreateTable() {
        await this.createTablePromise;
        if (this.createTableError) {
            throw Error('create table error');
        }
        else {
            return true;
        }
    }
}
