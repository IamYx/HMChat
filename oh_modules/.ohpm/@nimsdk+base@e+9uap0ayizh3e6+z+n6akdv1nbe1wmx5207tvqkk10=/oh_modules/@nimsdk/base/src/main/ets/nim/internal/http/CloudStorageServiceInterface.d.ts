import { UploadFileOptions, UploadFileResult } from './types';
export interface CloudStorageServiceInterface {
    /**
     * 上传文件
     * Upload files
     */
    uploadFile(options: UploadFileOptions): Promise<UploadFileResult>;
    /**
     * 短链转长链
     * Convert a shortened URL to a full URL.
     * */
    getOriginUrl(options: string): Promise<string>;
}
