class Config {
    constructor(a174) {
        this.directUploadAddr = 'https://wanproxy-web.127.net';
        this.retryCount = 1;
        this.trunkSize = 4 * 1024 * 1024;
        this.trunkUploadTimeout = 50000;
        this.getOffsetTimeout = 10000;
        this.version = '1.0';
        this.enableCache = true;
        this.logger = console;
        this.onError = function (e174) {
        };
        this.onUploadProgress = function (d174) {
        };
        this.onComplete = function (c174) {
        };
        for (let b174 in a174) {
            this[b174] = a174[b174];
        }
    }
}
export default Config;
