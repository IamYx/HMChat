import Logger from "@nimsdk/base/src/main/ets/nim/utils/logger";
export declare class SyncEventProcessor {
    private queue;
    private processing;
    private logger;
    private tag;
    constructor(a144: Logger, b144: string);
    enqueueEvent(z143: SyncEvent): void;
    private processQueue;
}
export declare class SyncEvent {
    private _eventName;
    private _cmd;
    private _handler;
    constructor(v143: string, w143: string, x143: () => Promise<void>);
    eventName(): string;
    handler(q143: Logger, r143: string): Promise<void>;
}
