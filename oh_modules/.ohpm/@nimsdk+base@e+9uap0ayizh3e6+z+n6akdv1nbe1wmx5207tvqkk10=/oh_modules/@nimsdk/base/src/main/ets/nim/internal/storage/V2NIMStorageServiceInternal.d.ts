import { V2NIMMessageAttachment, V2NIMMessageType } from '../../sdk/V2NIMMessageService';
import { V2NIMDownloadMessageAttachmentParams, V2NIMGetMediaResourceInfoResult, V2NIMProgressCallback, V2NIMSize, V2NIMStorageScene, V2NIMStorageService, V2NIMUploadFileParams, V2NIMUploadFileTask } from '../../sdk/V2NIMStorageService';
import { UploadFileResult } from '../http/types';
import { V2InternalService } from '../V2NIMInternalService';
export default interface V2NIMStorageServiceInternal extends V2NIMStorageService, V2InternalService {
    v2IHasStorageScene(sceneName: string): boolean;
    v2IUploadFileTask(fileTask: V2NIMUploadFileTask, progress?: V2NIMProgressCallback, options?: UploadFileTaskOption): Promise<UploadFileResult>;
    /**
     * Internal API calling use following functions.
     */
    v2IAddCustomStorageScene(sceneName: string, expireTime: number): V2NIMStorageScene;
    v2IGetStorageSceneList(): V2NIMStorageScene[];
    v2ICreateUploadFileTask(fileParams: V2NIMUploadFileParams): V2NIMUploadFileTask | null;
    v2IUploadFile(fileTask: V2NIMUploadFileTask, progress: V2NIMProgressCallback): Promise<string>;
    v2ICancelUploadFile(fileTask: V2NIMUploadFileTask): Promise<void>;
    v2IDownloadFile(url: string, filePath: string, progress: V2NIMProgressCallback): Promise<string>;
    v2ICancelDownloadFile(url: string): Promise<void>;
    v2IShortUrlToLong(url: string): Promise<string>;
    v2IGetSdkLogPath(): string;
    v2IGetSdkLogDirPath(): string;
    v2IUploadSDKLogs(): Promise<string>;
    v2IDownloadAttachment(downloadParam: V2NIMDownloadMessageAttachmentParams, progress: V2NIMProgressCallback): Promise<string>;
    v2IGetImageThumbUrl(attachment: V2NIMMessageAttachment, thumbSize: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
    v2IGetVideoCoverUrl(attachment: V2NIMMessageAttachment, thumbSize: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
}
export interface UploadFileTaskOption {
    fileType?: V2NIMMessageType;
}
