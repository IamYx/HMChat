import { NIM, V2NIMDndConfig } from '@nimsdk/base';
export declare class SettingModel {
    private core;
    constructor(u108: NIM);
    /**
     * persist V2NIMDndConfig to kvStore
     * @param config
     */
    saveDndConfig(r108: V2NIMDndConfig): Promise<void>;
    /**
     * read V2NIMDndConfig from kvStore
     * @returns
     */
    queryDndConfig(): Promise<V2NIMDndConfig>;
    /**
     * Inner fn
     * @param key
     * @param v
     * @param type
     * @returns Construct a KVStore.Entry
     */
    private generateEntry;
    private getNullableValue;
}
