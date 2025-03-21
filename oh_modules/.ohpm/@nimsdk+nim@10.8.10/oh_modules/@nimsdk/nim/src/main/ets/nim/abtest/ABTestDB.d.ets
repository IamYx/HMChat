import { ABTExperiment, NIM } from '@nimsdk/base';
import { HashMap } from '@kit.ArkTS';
export declare class ABTestDB {
    private rdbStore;
    private table;
    constructor(f32: NIM, g32: string);
    createDB(): Promise<void>;
    createTable(): Promise<void>;
    loadAllExperiment(): Promise<HashMap<string, ABTExperiment>>;
    addExperiments(d32: ABTExperiment[]): Promise<void>;
    getExperiment(c32: string): Promise<ABTExperiment>;
    getExperimentByScheme(a32: string, b32: string): Promise<ABTExperiment>;
}
