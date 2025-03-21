import { RdbStoreManager } from './RdbStoreManager';
import { RdbTableInterface } from './RdbTableInterface';
export declare class RdbTableImpl implements RdbTableInterface {
    createTablePromise: Promise<void>;
    createTableError: Error | null;
    rdbStoreManager: RdbStoreManager;
    tableName: string;
    constructor(d4: RdbStoreManager, e4?: string);
    createTable(): Promise<void>;
    ensureCreateTable(): Promise<boolean>;
}
