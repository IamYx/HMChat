import { NIMEBaseServiceInterface, V2NIMDownloadMessageAttachmentParams, V2NIMGetMediaResourceInfoResult, V2NIMMessageAttachment, V2NIMSize } from '@nimsdk/base';
export interface V2NIMChatroomStorageService extends NIMEBaseServiceInterface<V2NIMStorageListener> {
    /**
     * 设置自定义场景
     *
     * @param sceneName 自定义的场景名
     * @param expireTime 文件过期时间. 单位秒. 数值要求大于等于 86400 秒, 即 1 天.
     */
    addCustomStorageScene(sceneName: string, expireTime: number): V2NIMStorageScene;
    /**
     * 查询存储场景列表
     */
    getStorageSceneList(): V2NIMStorageScene[];
    /**
     * 创建文件上传任务
     *
     * @param fileParams 上传文件参数
     * @returns 上传任务
     */
    createUploadFileTask(fileParams: V2NIMUploadFileParams): V2NIMUploadFileTask | null;
    /**
     * 上传文件
     *
     * @param fileTask 上传任务，createUploadTask 函数返回值
     * @returns 文件的 url
     */
    uploadFile(fileTask: V2NIMUploadFileTask, progress: V2NIMProgressCallback): Promise<string>;
    /**
     * 取消文件上传
     *
     * @param fileTask 上传任务，createUploadTask 函数返回值
     */
    cancelUploadFile(fileTask: V2NIMUploadFileTask): Promise<void>;
    /**
     * 下载文件
     *
     * @param url 下载文件 url
     * @param filePath 文件下载存放的本地路径
     * @returns 文件的 url
     */
    downloadFile(url: string, filePath: string, progress: V2NIMProgressCallback): Promise<string>;
    /**
     * 下载消息附件
     * @param downloadParam 下载参数
     * @param progress 下载消息附件进度回调
     * @returns 下载的文件路径
     */
    downloadAttachment(downloadParam: V2NIMDownloadMessageAttachmentParams, progress: V2NIMProgressCallback): Promise<string>;
    /**
     * 生成图片缩略链接
     */
    getImageThumbUrl(attachment: V2NIMMessageAttachment, thumbSize: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
    /**
     * 生成视频封面图链接
     */
    getVideoCoverUrl(attachment: V2NIMMessageAttachment, thumbSize: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
}
export type V2NIMStorageListener = {};
export interface V2NIMStorageScene {
    /**
     * 场景名
     */
    sceneName: string;
    /**
     * 该场景下文件的过期时间. 单位秒.
     */
    expireTime?: number;
}
export interface V2NIMUploadFileParams {
    /**
     * 文件路径
     */
    filePath: string;
    /**
     * 场景名
     */
    sceneName: string;
}
export interface V2NIMUploadFileTask {
    /**
     * 任务 ID, 内部生成
     */
    taskId: string;
    /**
     * 任务参数
     */
    uploadParams: V2NIMUploadFileParams;
}
/**
 * 文件上传进度变化回调函数。取值范围 [0, 100]
 */
export type V2NIMProgressCallback = (progress: number) => void;
