import { NIM } from "@nimsdk/base";
export declare enum ResourceTraceStep {
    start = 0,
    uploading = 1,
    success = 2,
    failed = 3,
    abort = 4
}
export interface ResourceTraceData {
    startTime?: number;
    offset?: number;
    total?: number;
    transferred?: number;
    url?: string;
    description?: string;
}
declare class ResourceTraceDataModel {
    startTime?: number;
    offset?: number;
    total?: number;
    transferred?: number;
    url?: string;
    description?: string;
}
export declare class ResourceTraceReporter {
    resourceModel: ResourceTraceDataModel;
    action: number;
    core: NIM;
    constructor(n61: number, o61: NIM);
    updateReporterTrace(l61: ResourceTraceStep, m61: ResourceTraceData): void;
    reportEvent(i61: number): void;
}
export {};
