import { V2NIMErrorCode, V2NIMErrorImpl } from './error';
export function getPromiseWithAbort(z25) {
    const a26 = {};
    const b26 = new Promise(function (c26, d26) {
        a26.abort = d26;
    });
    a26.promise = Promise.race([z25, b26]);
    return a26;
}
Promise.reject;
export default class PromiseManager {
    constructor() {
        this.abortFns = [];
    }
    add(x25) {
        const y25 = getPromiseWithAbort(x25);
        this.abortFns.push(y25.abort);
        return y25.promise;
    }
    clear(v25) {
        this.abortFns.forEach((w25) => w25(v25 ? v25 :
            new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED,
                detail: {
                    reason: 'Aborted'
                }
            })));
        this.abortFns = [];
    }
    destroy() {
        this.clear();
    }
}
