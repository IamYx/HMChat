import { NIMServiceConfig } from './V2NIMInterface';
import { NIMEBaseListener, NIMEBaseServiceInterface } from './types';
/**
 * V2NIMPushService 模块接口定义
 *
 * 注: v0.1.0 版本开始支持
 */
export interface V2NIMPushService extends NIMEBaseServiceInterface<V2NIMPushListener> {
    /**
     * 异步，开启/关闭第三方推送服务
     *
     * @param enable true 开启，SDK 需要与云信服务器做确认；false 关闭，SDK 也需要通知云信服务器。
     */
    enable(enable: boolean): Promise<void>;
    /**
     * 同步，是否开启了第三方推送服务
     *
     * @return 默认开启
     */
    isEnable(): Promise<boolean>;
}
/**
 * V2NIMPushListener 模块监听事件定义
 * 目前 PushService 没有需要监听的模块
 */
export interface V2NIMPushListener extends NIMEBaseListener {
}
export interface NIMPushServiceConfig extends NIMServiceConfig {
    /**
     * 鸿蒙推送证书名，与云信控制台推送证书的"证书名称"对应
     */
    harmonyCertificateName?: string;
}
