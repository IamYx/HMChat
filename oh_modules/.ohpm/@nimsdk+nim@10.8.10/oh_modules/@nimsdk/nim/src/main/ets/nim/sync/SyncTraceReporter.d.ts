import { NIM } from "@nimsdk/base";
export declare class SyncTraceReporter {
    private core;
    private startTime;
    constructor(h144: NIM);
    addSyncTrace(c144: boolean, d144: string): void;
}
