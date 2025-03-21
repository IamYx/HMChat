import { UploadFileProgress } from '@nimsdk/base';
import { IUploadInfo } from './types';
declare class Config {
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
    constructor(a174: Partial<{
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
export default Config;
