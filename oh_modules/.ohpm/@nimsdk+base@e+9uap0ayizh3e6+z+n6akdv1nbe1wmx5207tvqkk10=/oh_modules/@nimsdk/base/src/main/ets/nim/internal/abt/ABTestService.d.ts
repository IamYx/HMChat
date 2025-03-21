export declare class ABTExperiment {
    experimentKey: string;
    schemeKey: string;
    variates: ABTExperimentItem[];
}
export declare class ABTExperimentItem {
    key: string;
    type: string;
    value: string | number | boolean;
    constructor(a: string, b: string, c: string | number | boolean);
}
