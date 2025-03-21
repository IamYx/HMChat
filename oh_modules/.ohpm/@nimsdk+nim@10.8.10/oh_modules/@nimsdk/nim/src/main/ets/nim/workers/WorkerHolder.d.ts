import { WorkerMessageReceiver } from './WorkerMessageReceiver';
export declare class WorkerHolder {
    private static instance;
    private worker;
    private nimMap;
    private constructor();
    static getInstance(): WorkerHolder;
    postBinaryMessage(t153: string, u153: ArrayBuffer): void;
    registerNim(r153: string, s153: WorkerMessageReceiver): void;
    unregisterNim(q153: string): void;
    terminate(): void;
    private initWorker;
}
