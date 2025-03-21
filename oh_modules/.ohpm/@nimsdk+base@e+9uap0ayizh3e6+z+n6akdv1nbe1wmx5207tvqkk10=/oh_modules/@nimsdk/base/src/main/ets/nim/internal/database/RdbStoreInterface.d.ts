import rdb from '@ohos.data.relationalStore';
import { Context } from '@ohos.abilityAccessCtrl';
import { ValueType } from '@ohos.data.ValuesBucket';
import { ColumnInfo } from './ColumnInfo';
import { RdbPredicates } from './RdbPredicates';
export interface RdbStoreInterface {
    /**
     * Get name of database
     * @returns database name
     */
    getDbName(): string;
    /**
     * Obtains a RDB store
     * @param context the context of application or capability
     * @returns
     */
    getRdb(context: Context): Promise<RdbStoreInterface>;
    /**
     * Backs up a database in a specified name.
     *
     * @param { string } destName - Indicates the name that saves the database backup.
     * @returns { Promise<void> } The promise returned by the function.
     */
    backup(destName: string): Promise<void>;
    /**
     * Restores a database from a specified database file.
     *
     * @param { string } srcName - Indicates the name that saves the database file.
     * @returns { Promise<void> } The promise returned by the function.
     */
    restore(srcName: string): Promise<void>;
    /**
     * close database
     * api12+
     */
    close(): Promise<void>;
    /**
     * Create table in the database
     * @param tableName the target table
     * @param columns the columns to alert
     * @returns
     */
    createTable(tableName: string, autoincrement: string | boolean, columns: ColumnInfo[], primaries?: string[]): Promise<void>;
    /**
     * upgrade version, do add column to table
     * @param tableName
     * @param column
     * @returns
     */
    upgradeVersion(tableName: string, column: ColumnInfo): Promise<void>;
    /**
     * beginTransaction
     * @returns
     */
    beginTransaction(): void;
    /**
     * commit
     * @returns
     */
    commit(): void;
    /**
     * rollBack
     * @returns
     */
    rollBack(): void;
    /**
     *
     * @param indexName
     * @param tableName
     * @param columns
     * @returns
     */
    createTableIndex(indexName: string, tableName: string, columns: string[]): Promise<void>;
    /**
     *
     * @param indexName
     * @param tableName
     * @param columns
     * @returns
     */
    createTableUniqueIndex(indexName: string, tableName: string, columns: string[]): Promise<void>;
    /**
     * drop table in database
     * @param tableName
     * @returns
     */
    deleteTable(tableName: string): Promise<void>;
    /**
     * Clear table in database
     * @param tableName
     * @returns
     */
    clearTable(tableName: string): Promise<void>;
    /**
     * Execute sql in the database
     * @param sql statement to execute
     * @returns
     */
    execute(sql: string, bindArgs: ValueType[]): Promise<rdb.ValueType>;
    /**
     * Inserts a row of data or batch of data into the target table
     * @param tableName
     * @param values indicates the row of data {@link ValuesBucket} to be inserted into the table
     * @returns
     */
    insert(tableName: string, values: rdb.ValuesBucket[]): Promise<number>;
    /**
     * Inserts a row of data or batch of data into the target table, replace if conflict.
     * @param tableName
     * @param values indicates the row of data {@link ValuesBucket} to be inserted into the table
     * @returns
     */
    insertOrReplace(tableName: string, values: rdb.ValuesBucket[]): Promise<number>;
    /**
     * Updates data in the database based on a specified instance object of RdbPredicates
     * @param values
     * @param rdbPredicates
     * @returns
     */
    update(values: rdb.ValuesBucket, predicates: RdbPredicates): Promise<number>;
    /**
     * Queries data in the database based on specified conditions
     * @param rdbPredicates
     * @param columns
     * @returns
     */
    query(predicates: RdbPredicates, columns: string[]): Promise<rdb.ValuesBucket[]>;
    /**
     * Queries data in the database based on table name
     * @param tableName
     * @returns {@Link ResultSet} object if the operation is successful
     */
    querys(tableName: string): Promise<rdb.ValuesBucket[]>;
    /**
     * Queries data in the database based on SQL statement
     * @param sql
     * @param bindArgs
     * @returns {@Link ResultSet} object if the operation is successful
     */
    querySql(sql: string, bindArgs: rdb.ValueType[]): Promise<rdb.ValuesBucket[]>;
    /**
     * Delete data in the database based on specified conditions
     * @param rdbPredicates
     * @returns the number of affected rows.
     */
    delete(predicates: RdbPredicates): Promise<number>;
    /**
     *
     * @param tableName
     * @param predicates
     * @returns
     */
    deletes(tableName: string, predicates: RdbPredicates[]): Promise<void>;
}
