import Config from './Config';
import { IUploadInfo } from './types';
import fs from '@ohos.file.fs';
import { FileState } from './fileState';
import Task from './Task';
declare const NosUploader: {
    /**
     * 每次创建新的文件上传任务时，会检查是否cache过多，或者上传过期，然后删除不再符合要求的文件信息
     */
    /**
     * 最多存储默认6个文件上传信息
     */
    maxFileCache: number;
    /**
     * 默认1天后过期
     */
    expireTime: number;
    getFileUploadInformation: (file: fs.File, fileState: FileState) => null | {
        uploadInfo: IUploadInfo;
        complete: boolean;
    };
    setMaxFileCache: (val: number) => void;
    setExpireTime: (ms: number) => void;
    printCaches: () => void;
    createConfig: (params: Partial<{
        enableCache: boolean;
        directUploadAddr: string;
        retryCount: number;
        trunkSize: number;
        trunkUploadTimeout: number;
        getOffsetTimeout: number;
        onError: (err: Error) => any;
        onProgress: Function;
        onUploadProgress: Function;
        onComplete: Function;
        version: string;
    }>) => Config;
    createTask: (file: fs.File, param: IUploadInfo, config: Config, fileState: FileState) => Task;
};
export default NosUploader;
