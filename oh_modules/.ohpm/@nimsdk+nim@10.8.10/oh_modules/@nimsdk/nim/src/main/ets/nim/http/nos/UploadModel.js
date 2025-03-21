export const NosHeaders = {
    NOS_TOKEN: 'x-nos-token',
    CONTENT_MD5: 'content-md5',
    CONTENT_TYPE: 'content-type',
};
export class CustomError extends Error {
    constructor(q61, r61) {
        super('NosUploadError:' + q61);
        this.errCode = r61;
        this.errMsg = q61;
    }
}
