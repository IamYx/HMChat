import { NIM, NIMEStrAnyObj, NIMServiceConfig, NIMServiceName, NIMStorageServiceConfig, UploadFileResult, UploadFileTaskOption, V2NIMGetMediaResourceInfoResult, V2NIMMessageAttachment, V2NIMProgressCallback, V2NIMSize, V2NIMStorageScene, V2NIMStorageServiceInternal, V2NIMUploadFileParams, V2NIMUploadFileTask, V2Service } from '@nimsdk/base';
import { V2NIMDownloadMessageAttachmentParams } from '@nimsdk/base/src/main/ets/nim/sdk/V2NIMStorageService';
import request from '@ohos.request';
interface UploadFileTask {
    task: NIMEStrAnyObj;
    abort: boolean;
}
/**
 * 存储模块实现
 */
export default class V2NIMStorageServiceImpl extends V2Service implements V2NIMStorageServiceInternal {
    core: NIM;
    sceneMap: Map<string, V2NIMStorageScene>;
    uploadingCatch: Map<string, UploadFileTask>;
    downloadTaskCatch: Map<string, request.DownloadTask>;
    config: NIMStorageServiceConfig;
    constructor(a117: NIM, b117: NIMServiceName, c117: NIMServiceConfig);
    onLoginStart(z116: string): Promise<void>;
    onLoginFinished(y116: string): Promise<void>;
    onLogout(): Promise<void>;
    addCustomStorageScene(u116: string, v116: number): V2NIMStorageScene;
    getStorageSceneList(): V2NIMStorageScene[];
    createUploadFileTask(t116: V2NIMUploadFileParams): V2NIMUploadFileTask | null;
    uploadFile(r116: V2NIMUploadFileTask, s116: V2NIMProgressCallback): Promise<string>;
    cancelUploadFile(q116: V2NIMUploadFileTask): Promise<void>;
    downloadFile(n116: string, o116: string, p116: V2NIMProgressCallback): Promise<string>;
    cancelDownloadFile(m116: string): Promise<void>;
    shortUrlToLong(l116: string): Promise<string>;
    getSdkLogPath(): string;
    getSdkLogDirPath(): string;
    uploadSDKLogs(): Promise<string>;
    downloadAttachment(j116: V2NIMDownloadMessageAttachmentParams, k116: V2NIMProgressCallback): Promise<string>;
    getImageThumbUrl(h116: V2NIMMessageAttachment, i116: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
    getVideoCoverUrl(f116: V2NIMMessageAttachment, g116: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
    v2IAddCustomStorageScene(c116: string, d116: number): V2NIMStorageScene;
    v2IGetStorageSceneList(): V2NIMStorageScene[];
    v2IDownloadFile(u115: string, v115: string, w115: V2NIMProgressCallback): Promise<string>;
    v2IDownloadAttachment(l115: V2NIMDownloadMessageAttachmentParams, m115: V2NIMProgressCallback): Promise<string>;
    v2ICancelDownloadFile(g115: string): Promise<void>;
    v2IShortUrlToLong(e115: string): Promise<string>;
    v2IGetImageThumbUrl(c115: V2NIMMessageAttachment, d115: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
    /**
     * 生成视频封面图链接
     */
    v2IGetVideoCoverUrl(a115: V2NIMMessageAttachment, b115: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
    v2ICreateUploadFileTask(y114: V2NIMUploadFileParams): V2NIMUploadFileTask | null;
    v2IUploadFile(v114: V2NIMUploadFileTask, w114?: V2NIMProgressCallback): Promise<string>;
    v2ICancelUploadFile(u114: V2NIMUploadFileTask): Promise<void>;
    v2IGetSdkLogPath(): string;
    v2IGetSdkLogDirPath(): string;
    v2IUploadSDKLogs(): Promise<string>;
    v2IHasStorageScene(n114: string): boolean;
    v2IUploadFileTask(z113: V2NIMUploadFileTask, a114?: V2NIMProgressCallback, b114?: UploadFileTaskOption): Promise<UploadFileResult>;
    private _cancelUploadFile;
    private _downloadFile;
    private getStorageScene;
    private getSavePath;
}
export {};
