import { EventEmitter, get } from '@nimsdk/vendor/Index';
const TAG = '[CRBaseService]';
export default class CRBaseService extends EventEmitter {
    constructor(w3, x3) {
        super();
        this.name = w3;
        this.logger = x3.logger;
        this.core = x3;
    }
    emit(s3, ...t3) {
        try {
            this.logger.debug(`${this.name}::emit event: "${s3.toString()}",`, typeof t3[0] !== 'undefined' ? t3[0] : '', typeof t3[1] !== 'undefined' ? t3[1] : '', typeof t3[2] !== 'undefined' ? t3[2] : '');
            const v3 = super.emit(s3, ...t3);
            return v3;
        }
        catch (u3) {
            setTimeout(() => {
                this.logger.error(`${this.name}::emit throw error in setTimeout. event: ${s3.toString()}. Error`, u3);
                throw u3;
            }, 0);
            return false;
        }
    }
    process(m3) {
        const n3 = this[m3.cmd + 'Handler'];
        if (typeof n3 === 'function') {
            if (m3.error) {
                this.logger.error(TAG, `${m3.cmd}::recvError`, m3.error);
                return Promise.reject(m3.error);
            }
            try {
                const r3 = n3.call(this, m3);
                return Promise.resolve(r3);
            }
            catch (q3) {
                return Promise.reject(q3);
            }
        }
        const o3 = m3.error;
        const p3 = get(m3, 'error.detail.ignore');
        if (o3 && !p3) {
            return Promise.reject(o3);
        }
        return Promise.resolve(m3);
    }
}
