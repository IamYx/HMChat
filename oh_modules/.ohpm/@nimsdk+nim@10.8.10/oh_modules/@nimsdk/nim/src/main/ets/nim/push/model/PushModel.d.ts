import { NIM } from '@nimsdk/base';
import { RdbStoreManager } from '@nimsdk/base';
import { PushTable } from './PushTable';
export declare class PushModel {
    core: NIM;
    pushTable: PushTable;
    constructor(b96: NIM, c96: RdbStoreManager);
    private getPushValue;
    private upsertPushValue;
    getPushEnable(): Promise<boolean>;
    updatePushEnable(r95: boolean): Promise<void>;
    getPushTokenExpireTime(): Promise<number>;
    updatePushTokenExpireTime(n95: number): Promise<void>;
    getPushToken(): Promise<string>;
    updatePushToken(l95: string): Promise<void>;
}
