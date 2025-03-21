import { NIM } from '@nimsdk/base';
export declare class FaultLogger {
    private kvManager;
    private core;
    constructor(o100: NIM);
    loadFaultLogger(): Promise<void>;
}
