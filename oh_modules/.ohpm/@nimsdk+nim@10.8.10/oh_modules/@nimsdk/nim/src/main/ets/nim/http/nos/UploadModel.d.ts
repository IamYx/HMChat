export declare const NosHeaders: {
    NOS_TOKEN: string;
    CONTENT_MD5: string;
    CONTENT_TYPE: string;
};
export interface IUploadInfo {
    bucketName: string;
    objectName: string;
    token: string;
    md5?: string;
    ctx?: string;
    payload?: any;
    type?: 'image' | 'audio' | 'video' | 'file';
}
export interface IFileInfo extends IUploadInfo {
    ctx: string;
    modifyAt: number;
    end: boolean;
}
export declare class CustomError extends Error {
    errCode?: number;
    errMsg: string;
    constructor(q61: string, r61?: number);
}
