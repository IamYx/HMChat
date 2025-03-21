import KVStore from '@ohos.data.distributedKVStore';
import { common } from '@kit.AbilityKit';
export declare class IMKVManager {
    private kvManager;
    private context;
    private currentStore?;
    constructor(b22: common.Context);
    createKVManager(): KVStore.KVManager;
    /**
     * 获取对应账号的 kvStore
     * @param account 云信账号
     * @returns
     */
    getKVStore(w21: string): Promise<KVStore.SingleKVStore>;
    put(t21: string, u21: Uint8Array | string | number | boolean): Promise<void>;
    get(r21: string): Promise<boolean | string | number | Uint8Array>;
    delete(p21: string): Promise<void>;
    putBatch(n21: KVStore.Entry[]): Promise<void>;
}
