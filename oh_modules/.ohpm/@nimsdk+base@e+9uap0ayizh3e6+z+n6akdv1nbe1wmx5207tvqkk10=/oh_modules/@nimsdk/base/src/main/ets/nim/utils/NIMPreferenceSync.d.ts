import dataPreferences from '@ohos.data.preferences';
import common from '@ohos.app.ability.common';
export declare class NIMPreferenceSync {
    private context;
    private name;
    private preference;
    constructor(t25: common.Context, u25: string);
    put(q25: string, r25: dataPreferences.ValueType): void;
    batch(l25: string[], m25: dataPreferences.ValueType, n25?: boolean): void;
    has(j25: string): boolean;
    /**
     * Get preference data.
     */
    get(g25: string, h25: dataPreferences.ValueType): dataPreferences.ValueType;
    delete(e25: string): void;
}
