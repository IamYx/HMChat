export class NosConfig {
    constructor(k59) {
        this.directUploadAddr = 'https://wanproxy-web.127.net';
        this.retryCount = 1;
        this.trunkSize = 4 * 1024 * 1024;
        this.trunkUploadTimeout = 50000;
        this.getOffsetTimeout = 10000;
        this.version = '1.0';
        this.enableCache = true;
        this.logger = console;
        this.onError = function (o59) {
        };
        this.onUploadProgress = function (n59) {
        };
        this.onComplete = function (m59) {
        };
        for (let l59 in k59) {
            this[l59] = k59[l59];
        }
    }
}
