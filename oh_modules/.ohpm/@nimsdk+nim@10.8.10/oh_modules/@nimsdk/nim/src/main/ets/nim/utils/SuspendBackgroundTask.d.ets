export declare class SuspendBackgroundTask {
    private taskId?;
    private delayTime?;
    private static instance;
    constructor();
    requestSuspendDelay(): void;
    cancelSuspendDelay(): void;
}
