import { IFileInfo, IUploadInfo } from './types';
import fs from '@ohos.file.fs';
import { NIMPreferenceSync } from '@nimsdk/base';
export declare class FileState {
    storage: NIMPreferenceSync;
    constructor(b175: NIMPreferenceSync);
    getFileKey(x174: fs.File): string;
    getFileInfo(u174: string): IFileInfo | null;
    initFile(p174: IUploadInfo, q174: fs.File, r174: boolean): string;
    setUploadContext(l174: string, m174: string, n174: boolean): void;
    setComplete(i174: string, j174: boolean): void;
    getUploadContext(g174: string): string;
    removeFileInfo(f174: string): void;
    /**
     * 清理超出容量限制的存储，或者超出时间限制的存储
     */
    clearExpiredInfo(): void;
}
