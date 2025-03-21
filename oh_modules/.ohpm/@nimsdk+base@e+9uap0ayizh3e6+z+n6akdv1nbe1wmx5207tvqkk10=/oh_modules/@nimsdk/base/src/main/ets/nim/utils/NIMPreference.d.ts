import dataPreferences from '@ohos.data.preferences';
import { common } from '@kit.AbilityKit';
export declare class NIMPreference {
    private context;
    private name;
    private preferencePromise;
    private isRejected;
    constructor(c25: common.Context, d25: string);
    private getPreferences;
    deletePreferences(): Promise<void>;
    put(x24: string, y24: dataPreferences.ValueType): Promise<void>;
    has(u24: string): Promise<boolean>;
    /**
     * Get preference data.
     */
    get(q24: string, r24: dataPreferences.ValueType): Promise<dataPreferences.ValueType>;
    delete(n24: string): Promise<void>;
    deleteSync(k24: string): Promise<void>;
    flush(): Promise<void>;
    onChange(g24: (key: string) => void): Promise<void>;
    onMultiChange(e24: (key: string) => void): Promise<void>;
    private initPreferences;
}
