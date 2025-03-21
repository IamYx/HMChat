import Config from './Config';
import { FileState } from './fileState';
import { IUploadInfo } from './types';
import fs from '@ohos.file.fs';
type UploadState = 'uploading' | 'paused' | 'ended' | 'abort';
declare class Task {
    uploadState: UploadState;
    config: Config;
    file: fs.File;
    param: IUploadInfo;
    fileKey: string;
    fileState: FileState;
    constructor(f176: fs.File, g176: IUploadInfo, h176: Config, i176: FileState);
    resume(): void;
    pause(): void;
    abort(): void;
    private setUploadState;
    setContext(a176: string): void;
    setComplete(): void;
}
export default Task;
