import { ColumnInfo } from "@nimsdk/base";
export declare function createTableSql(w52: string, x52: string | boolean, y52: ColumnInfo[], z52?: string[]): string;
export declare function createTableIndex(r52: string, s52: string, t52: string[]): string;
export declare function createTableUniqueIndex(m52: string, n52: string, o52: string[]): string;
export declare function queryTableInfoSql(k52: string): string;
/**
 * ALERT sql like:
 *
 *
 * ```
 * ALTER TABLE your_table
 * ADD your_text_column TEXT NOT NULL DEFAULT 'N/A';
 * ```
 * @param tableName
 * @param column
 * @returns
 */
export declare function addTableColumnSql(h52: string, i52: ColumnInfo): string;
export declare function deleteTableSql(g52: string): string;
export declare function clearTableSql(f52: string): string;
