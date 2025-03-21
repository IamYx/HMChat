export declare const NIM_DATABASE_NAME_MAIN: string;
export declare const NIM_DATABASE_NAME_MESSAGE: string;
export declare const NIM_DATABASE_NAMES: string[];
export type NIMDatabaseName = typeof NIM_DATABASE_NAMES[number];
export declare enum ColumnType {
    INTEGER = "integer",
    TEXT = "text",
    BOOLEAN = "boolean",
    BLOB = "blob"
}
export interface TableIndexType {
    tableName: string;
    indexName: string;
    columns: string[];
}
export interface IndexType {
    indexName: string;
    columns: string[];
}
export interface TableType {
    tableName: string;
    columns: string[];
}
