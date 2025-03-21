export class SyncEventProcessor {
    constructor(a144, b144) {
        this.queue = [];
        this.processing = false;
        this.logger = a144;
        this.tag = b144;
    }
    enqueueEvent(z143) {
        this.queue.push(z143);
        this.processQueue();
    }
    async processQueue() {
        if (this.processing) {
            return;
        }
        this.processing = true;
        while (this.queue.length > 0) {
            const y143 = this.queue.shift();
            if (y143) {
                await y143.handler(this.logger, this.tag);
            }
        }
        this.processing = false;
    }
}
export class SyncEvent {
    constructor(v143, w143, x143) {
        this._eventName = v143;
        this._cmd = w143;
        this._handler = x143;
    }
    eventName() {
        return this._eventName;
    }
    async handler(q143, r143) {
        try {
            const t143 = new Date().getTime();
            await this._handler();
            const u143 = new Date().getTime();
            q143.info('SyncEventProcessor@' + r143, `${this.eventName()} '${this._cmd}' cost: ${u143 - t143}ms`);
            return;
        }
        catch (s143) {
            q143.error('SyncEventProcessor@' + r143, this.eventName(), this._cmd, JSON.stringify(s143));
        }
    }
}
