import { UploadFileProgress } from '@nimsdk/base';
import { IUploadInfo } from './UploadModel';
export declare class NosConfig {
    directUploadAddr: string;
    retryCount: number;
    trunkSize: number;
    trunkUploadTimeout: number;
    getOffsetTimeout: number;
    version: string;
    enableCache: boolean;
    logger: typeof console;
    onError: (err: Error) => void;
    onUploadProgress: (progressEvent: UploadFileProgress) => void;
    onComplete: (uploadInfo: IUploadInfo) => void;
    constructor(k59: Partial<{
        directUploadAddr: string;
        retryCount: number;
        trunkSize: number;
        trunkUploadTimeout: number;
        getOffsetTimeout: number;
        onError: (errObj: Error) => any;
        onProgress: Function;
        onUploadProgress: Function;
        onComplete: Function;
        version: string;
        logger: any;
        enableCache: boolean;
    }>);
}
