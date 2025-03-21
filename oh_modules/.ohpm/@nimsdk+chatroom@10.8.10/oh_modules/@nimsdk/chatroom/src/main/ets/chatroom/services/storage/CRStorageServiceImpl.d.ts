import { NIMEStrAnyObj, UploadFileResult, V2NIMDownloadMessageAttachmentParams, V2NIMGetMediaResourceInfoResult, V2NIMMessageAttachment, V2NIMMessageType, V2NIMSize, V2NIMStorageScene, V2NIMUploadFileParams, V2NIMUploadFileTask } from '@nimsdk/base';
import { V2NIMChatroomStorageService, V2NIMProgressCallback, V2NIMStorageListener } from '../../sdk/V2NIMChatroomStorageService';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import CRBaseService from '../base/CRBaseService';
import { request } from '@kit.BasicServicesKit';
interface UploadFileTask {
    task: NIMEStrAnyObj;
    abort: boolean;
}
/**
 * 存储模块实现
 */
export default class CRStorageServiceImpl extends CRBaseService<V2NIMStorageListener> implements V2NIMChatroomStorageService {
    /**
     * core
     */
    core: V2NIMChatroomClient;
    /**
     * sceneMap
     */
    sceneMap: Map<string, V2NIMStorageScene>;
    uploadingCatch: Map<string, UploadFileTask>;
    downloadTaskCatch: Map<string, request.DownloadTask>;
    constructor(t43: V2NIMChatroomClient);
    addCustomStorageScene(q43: string, r43: number): V2NIMStorageScene;
    getStorageSceneList(): V2NIMStorageScene[];
    getStorageScene(p43: string): V2NIMStorageScene;
    hasStorageScene(n43: string): boolean;
    createUploadFileTask(l43: V2NIMUploadFileParams): V2NIMUploadFileTask | null;
    uploadFile(i43: V2NIMUploadFileTask, j43?: V2NIMProgressCallback): Promise<string>;
    cancelAllUpload(): Promise<void>;
    cancelUploadFile(e43: V2NIMUploadFileTask): Promise<void>;
    cancelUploadFileByTaskId(b43: string): Promise<void>;
    uploadFileTask(n42: V2NIMUploadFileTask, o42?: V2NIMProgressCallback, p42?: CRUploadFileTaskOption): Promise<UploadFileResult>;
    downloadFile(v41: string, w41: string, x41: V2NIMProgressCallback): Promise<string>;
    downloadAttachment(a41: V2NIMDownloadMessageAttachmentParams, b41: V2NIMProgressCallback): Promise<string>;
    getImageThumbUrl(u40: V2NIMMessageAttachment, v40: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
    /**
     * 生成视频封面图链接
     */
    getVideoCoverUrl(o40: V2NIMMessageAttachment, p40: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
    /**
     * 获取图片缩略图。
     *
     * 如果有融合存储策略，则按照融合存储策略的配置生成缩略图链接。
     * 如果没有融合存储策略，则按照默认的策略生成缩略图链接。
     */
    makeThumbUrl(k40: string, l40: number, m40: number): string;
    /**
     * 获取视频封面图。
     *
     * 如果有融合存储策略，则按照融合存储策略的配置生成缩略图链接。
     * 如果没有融合存储策略，则按照默认的策略生成缩略图链接。
     */
    makeVideoCoverUrl(g40: string, h40: number, i40: number): string;
    shortUrlToLong(e40: string): Promise<string>;
    private getSavePath;
}
export interface CRUploadFileTaskOption {
    fileType?: V2NIMMessageType;
}
export {};
