import { RdbStoreManager } from '@nimsdk/base';
export declare const NIM_PUSH_TABLE_MAIN: string;
export declare const NIM_PUSH_TABLE_COLUMN_KEY: string;
export declare const NIM_PUSH_TABLE_COLUMN_VALUE: string;
export interface PushOptions {
    pushEnable?: boolean;
    pushTokenExpireTime?: number;
    pushToken?: string;
}
export type PushKey = keyof PushOptions;
export declare class PushTable {
    private rdbStoreManager;
    private tableType;
    private createTablePromise;
    private createTableError;
    constructor(m96: RdbStoreManager);
    createTable(): Promise<void>;
    ensureCreateTable(): Promise<boolean>;
    queryByPushKey(h96: PushKey): Promise<string | null>;
    upsertByPushKey(d96: keyof PushOptions, e96: string): Promise<number>;
}
