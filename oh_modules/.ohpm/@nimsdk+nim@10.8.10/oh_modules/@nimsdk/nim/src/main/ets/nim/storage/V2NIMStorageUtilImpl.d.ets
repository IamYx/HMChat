import { NIM, NIMServiceConfig, NIMServiceName, V2NIMGetMediaResourceInfoResult, V2NIMMessageAttachment, V2NIMSize, V2NIMStorageUtilInternal, V2Service } from '@nimsdk/base';
export default class V2NIMStorageUtilImpl extends V2Service implements V2NIMStorageUtilInternal {
    core: NIM;
    constructor(d118: NIM, e118: NIMServiceName, f118: NIMServiceConfig);
    onLoginStart(c118: string): Promise<void>;
    onLoginFinished(b118: string): Promise<void>;
    onLogout(): void;
    /**
     * 缩略图
     * @param url 图片原始链接
     * @param thumbSize 缩放的尺寸
     *
     */
    imageThumbUrl(z117: string, a118: number): string;
    /**
     * 视频封面
     * @param url 视频原始链接
     * @param offset 从第几秒开始截
     *
     */
    videoCoverUrl(x117: string, y117: number): string;
    /**
     * 生成缩略图链接
     *
     *
     * 获取图片消息中的图片缩略图步骤
     * - 1. 传入短链自动获取长链地址并携带缩略图相关 URL 查询参数
     * - 2. 旧的下载地址需要做新的 CDN 加速域名地址替换
     * - 3. 生成缩略图 URL
     *
     */
    getImageThumbUrl(r117: V2NIMMessageAttachment, s117: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
    /**
     * 生成视频封面图链接
     */
    getVideoCoverUrl(l117: V2NIMMessageAttachment, m117: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult>;
    /**
     * 获取图片缩略图。
     *
     * 如果有融合存储策略，则按照融合存储策略的配置生成缩略图链接。
     * 如果没有融合存储策略，则按照默认的策略生成缩略图链接。
     */
    makeThumbUrl(h117: string, i117: number, j117: number): string;
    /**
     * 获取视频封面图。
     *
     * 如果有融合存储策略，则按照融合存储策略的配置生成缩略图链接。
     * 如果没有融合存储策略，则按照默认的策略生成缩略图链接。
     */
    makeVideoCoverUrl(d117: string, e117: number, f117: number): string;
}
