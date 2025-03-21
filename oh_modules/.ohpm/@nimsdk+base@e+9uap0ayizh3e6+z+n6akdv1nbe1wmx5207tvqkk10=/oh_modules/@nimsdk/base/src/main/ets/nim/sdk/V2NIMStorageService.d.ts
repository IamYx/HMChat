import { V2NIMMessageAttachment } from './V2NIMMessageService';
/**
 * 文件存储场景
 */
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
/**
 * 文件存储场景
 */
export interface V2NIMStorageService {
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
     * 取消文件下载
     *
     * @param url 下载文件 url
     * @returns
     */
    cancelDownloadFile(url: string): Promise<void>;
    /**
     * 短链接转长链接
     *
     * @param url 文件远程地址
     * @returns 文件的 url
     */
    shortUrlToLong(url: string): Promise<string>;
    /**
     * 当前正在写入的sdk 日志文件路径
     *
     */
    getSdkLogPath(): string;
    /**
     * sdk 日志存放的文件夹地址
     *
     */
    getSdkLogDirPath(): string;
    /**
     * 上传sdk 日志， 会将 sdk 日志文件夹内的日志打包上传
     *
     * @returns 上传的文件 url
     */
    uploadSDKLogs(): Promise<string>;
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
/**
 * 存储 工具类
 *
 */
export interface V2NIMStorageUtil {
    /**
     * 缩略图
     * @param url 图片原始链接
     * @param thumbSize 缩放的尺寸
     *
     */
    imageThumbUrl(url: string, thumbSize: number): string;
    /**
     * 视频封面
     * @param url 视频原始链接
     * @param offset 从第几秒开始截
     *
     */
    videoCoverUrl(url: string, offset: number): string;
    /**
     * 生成缩略图链接
     *
     * 获取图片消息中的图片缩略图步骤
     * - 1. 传入短链自动获取长链地址并携带缩略图相关 URL 查询参数
     * - 2. 旧的下载地址需要做新的 CDN 加速域名地址替换
     * - 3. 生成缩略图 URL
     *
     */
    getImageThumbUrl(attachment: V2NIMMessageAttachment, thumbSize: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
    /**
     * 生成视频封面图链接
     */
    getVideoCoverUrl(attachment: V2NIMMessageAttachment, thumbSize: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
}
export declare class V2NIMStorageSceneConfig {
    /**
     * 默认头像类型等场景, 默认不过期
     */
    static DEFAULT_PROFILE(): V2NIMStorageScene;
    /**
     * 默认文件类型等场景, 默认不过期
     */
    static DEFAULT_IM(): V2NIMStorageScene;
    /**
     * 默认日志类型等场景, 默认不过期
     */
    static DEFAULT_SYSTEM(): V2NIMStorageScene;
    /**
     * 安全链接，每次大家需要密钥才能查看,默认不过期
     */
    static SECURITY_LINK(): V2NIMStorageScene;
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
export declare const enum V2NIMDownloadAttachmentType {
    V2NIM_DOWNLOAD_ATTACHMENT_TYPE_SOURCE = 0,
    V2NIM_DOWNLOAD_ATTACHMENT_TYPE_THUMBNAIL = 1,
    V2NIM_DOWNLOAD_ATTACHMENT_TYPE_VIDEO_COVER = 2
}
export interface V2NIMSize {
    /**
     * 宽度。如果不填，默认为 0，表示根据填入的高度，在保留原始宽高比的情况下，等比缩放
     *
     * 宽度、高度不能同时设置为 0，或者同时不填
     */
    width?: number;
    /**
     * 高度。如果不填， 默认为 0，表示根据填入的宽度，在保留原始宽高比的情况下，等比缩放
     *
     * 宽度、高度不能同时设置为 0，或者同时不填
     */
    height?: number;
}
export interface V2NIMGetMediaResourceInfoResult {
    /**
     * 获取缩略图，视频封面返回的 URL 链接地址
     */
    url: string;
    /**
     * 下载该资源所需的鉴q权信息，当列表为空时则代表不需要鉴权，若不为空则需要将该列表添加到请求时的 Header 中
     */
    authHeaders?: Map<string, string>;
}
export interface V2NIMDownloadMessageAttachmentParams {
    /**
     * 要下载附件
     */
    attachment: V2NIMMessageAttachment;
    /**
     * 下载附件的类型，如原始文件、缩略图、视频封面
     */
    type: V2NIMDownloadAttachmentType;
    /**
     * 如果下载的是缩略图或者视频封面，通过该参数指定缩略图大小或视频封面大小
     */
    thumbSize?: V2NIMSize;
    /**
     * 可选参数，如果指定了该参数并且下载的是原始文件，
     * SDK 会将下载完成后的本地附件保存路径更新到消息数据库中，下一次查询时将直接返回对应的路径
     */
    messageClientId?: string;
    /**
     * 附件保存路径，如未指定 SDK 将下载到登录用户缓存目录，如指定该参数则以指定的路径为准
     */
    saveAs?: string;
}
/**
 * 文件上传进度变化回调函数。取值范围 [0, 100]
 */
export type V2NIMProgressCallback = (progress: number) => void;
