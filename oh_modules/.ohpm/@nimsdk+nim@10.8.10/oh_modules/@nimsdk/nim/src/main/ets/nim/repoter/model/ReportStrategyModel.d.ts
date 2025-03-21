export declare class ReportStrategyData {
    endpoint: string;
    maxInterval: number;
    maxSize: number;
    minInterval: number;
    maxDelay: number;
    constructor(j102: string, k102: number, l102: number, m102: number, n102: number);
}
export declare class ReportStrategyResponesModel {
    code: number;
    data: ReportStrategyData;
    requestId: string;
}
