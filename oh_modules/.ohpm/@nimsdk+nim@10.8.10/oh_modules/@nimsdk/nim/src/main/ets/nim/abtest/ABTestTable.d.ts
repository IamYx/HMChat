import { ABTExperiment, ColumnInfo, RdbStoreManager, RdbTableImpl, TableType } from '@nimsdk/base';
import { HashMap } from '@kit.ArkTS';
export declare const ABT_TABLE: TableType;
export declare const ABTestColumns: ColumnInfo[];
export declare class ABTestTable extends RdbTableImpl {
    constructor(c34: RdbStoreManager);
    createTable(): Promise<void>;
    addExperiments(w33: ABTExperiment[]): Promise<void>;
    getExperiment(r33: string): Promise<ABTExperiment>;
    getExperimentByScheme(l33: string, m33: string): Promise<ABTExperiment>;
    loadAllExperiment(): Promise<HashMap<string, ABTExperiment>>;
    private safeStringify;
    private generateBucket;
    private getObjectByValue;
}
