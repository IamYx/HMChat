export interface WorkerMessageReceiver {
    onMessageFromWorker(data: any): void;
}
