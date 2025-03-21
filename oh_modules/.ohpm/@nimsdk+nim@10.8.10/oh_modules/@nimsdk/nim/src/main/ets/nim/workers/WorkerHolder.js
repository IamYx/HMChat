import worker from "@ohos.worker";
export class WorkerHolder {
    constructor() {
        this.nimMap = new Map();
        this.initWorker();
    }
    static getInstance() {
        if (!WorkerHolder.instance) {
            WorkerHolder.instance = new WorkerHolder();
        }
        return WorkerHolder.instance;
    }
    postBinaryMessage(t153, u153) {
        if (!this.worker) {
            console.error('worker is null postBinaryMessager ID:', t153);
        }
        this.worker.postMessage({ 'id': t153, 'payload': u153 }, [u153]);
    }
    registerNim(r153, s153) {
        this.nimMap.set(r153, s153);
    }
    unregisterNim(q153) {
        this.nimMap.delete(q153);
    }
    terminate() {
        this.worker.terminate();
    }
    initWorker() {
        this.worker = new worker.ThreadWorker('./Worker');
        this.worker.onexit = () => {
            console.error('worker: main thread onexit');
        };
        this.worker.onerror = (p153) => {
            console.error('worker: main thread onerror:' + JSON.stringify(p153));
        };
        this.worker.onmessage = (l153) => {
            const { id: m153, payload: n153 } = l153.data;
            const o153 = this.nimMap.get(m153);
            if (o153) {
                o153.onMessageFromWorker(n153);
            }
            else {
                console.error('No handler registered for ID:', m153);
            }
        };
    }
}
