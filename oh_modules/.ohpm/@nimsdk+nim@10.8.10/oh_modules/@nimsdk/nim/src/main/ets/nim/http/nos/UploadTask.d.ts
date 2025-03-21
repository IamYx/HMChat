import fs from '@ohos.file.fs';
import { NIM } from '@nimsdk/base';
import { NosConfig } from './NosConfig';
import { IUploadInfo } from './UploadModel';
import { FileState } from './FileState';
import { ResourceTraceReporter } from './ResourceTraceReporter';
type UploadState = 'uploading' | 'paused' | 'ended' | 'abort';
export declare class UploadTask {
    uploadState: UploadState;
    config: NosConfig;
    file: fs.File;
    param: IUploadInfo;
    fileKey: string;
    fileState: FileState;
    appKey: string;
    reporter: ResourceTraceReporter;
    constructor(c62: fs.File, d62: IUploadInfo, e62: NosConfig, f62: FileState, g62: NIM);
    resume(): void;
    pause(): void;
    abort(): void;
    setContext(t61: string): void;
    setComplete(): void;
    private setUploadState;
}
export {};
