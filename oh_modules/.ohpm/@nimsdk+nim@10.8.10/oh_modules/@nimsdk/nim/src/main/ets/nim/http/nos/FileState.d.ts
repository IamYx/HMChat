import fs from '@ohos.file.fs';
import { NIMPreferenceSync } from '@nimsdk/base';
import { IFileInfo, IUploadInfo } from './UploadModel';
export declare class FileState {
    storage: NIMPreferenceSync;
    constructor(x56: NIMPreferenceSync);
    getFileKey(t56: fs.File): string;
    getFileInfo(q56: string): IFileInfo | null;
    initFile(l56: IUploadInfo, m56: fs.File, n56: boolean): string;
    setUploadContext(h56: string, i56: string, j56: boolean): void;
    setComplete(e56: string, f56: boolean): void;
    getUploadContext(c56: string): string;
    removeFileInfo(b56: string): void;
    /**
     * 清理超出容量限制的存储，或者超出时间限制的存储
     */
    clearExpiredInfo(): void;
}
