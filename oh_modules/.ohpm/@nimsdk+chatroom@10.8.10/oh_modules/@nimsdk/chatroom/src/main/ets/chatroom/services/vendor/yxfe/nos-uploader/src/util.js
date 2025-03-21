export class CustomError extends Error {
    constructor(j177, k177) {
        super('NosUploadError:' + j177);
        this.errCode = k177;
        this.errMsg = j177;
    }
}
