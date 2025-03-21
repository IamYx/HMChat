import { NIMLoginServiceConfig, V2NIMLoginService } from './V2NIMLoginService';
import { V2NIMNotificationService } from './V2NIMNotificationService';
import { NIMMessageServiceConfig, V2NIMAntispamService, V2NIMMessage, V2NIMMessageConverter, V2NIMMessageCreator, V2NIMMessageService } from './V2NIMMessageService';
import { V2NIMConversationIdUtil, V2NIMConversationService } from './V2NIMConversationService';
import { V2NIMTeamService } from './V2NIMTeamService';
import { V2NIMUserService } from './V2NIMUserService';
import { V2NIMFriendService } from './V2NIMFriendService';
import { V2NIMSettingService } from './V2NIMSettingService';
import { NIMPushServiceConfig, V2NIMPushService } from './V2NIMPushService';
import { V2NIMSearchService } from './V2NIMSearchService';
import { V2NIMHttpServiceInternal } from '../internal/http/V2NIMHttpServiceInternal';
import { ABTestServiceInternal } from '../internal/abt/ABTestServiceInternal';
import { ReporterServiceInternal } from '../internal/reporter/ReporterServiceInternal';
import { V2NIMLocalConversationService } from './V2NIMLocalConversationService';
import { V2NIMStorageService, V2NIMStorageUtil } from './V2NIMStorageService';
import { V2NIMConversationGroupService } from './V2NIMConversationGroupService';
import { V2NIMSignallingService } from './V2NIMSignallingService';
import { YSFService } from './YSFService';
import { NIMEBaseListener } from './types';
import V2Service from '../v2Service';
import { NIM } from '../NIM';
import Logger from '../utils/logger';
import { V2NIMPassthroughService } from './V2NIMPassthroughService';
import { V2NIMAIService } from './V2NIMAIService';
import { V2NIMSubscriptionService } from './V2NIMSubscriptionService';
/**
 * NIMSDK 对外提供的服务接口
 *
 * 业务插件，需要在登录后才有效
 */
export interface V2NIMInterface {
    conversationService: V2NIMConversationService | undefined;
    conversationGroupService: V2NIMConversationGroupService | undefined;
    localConversationService: V2NIMLocalConversationService | undefined;
    messageService: V2NIMMessageService | undefined;
    signallingService: V2NIMSignallingService | undefined;
    teamService: V2NIMTeamService | undefined;
    userService: V2NIMUserService | undefined;
    friendService: V2NIMFriendService | undefined;
    aiService: V2NIMAIService | undefined;
    subscriptionService: V2NIMSubscriptionService;
    loginService: V2NIMLoginService;
    notificationService: V2NIMNotificationService | undefined;
    settingService: V2NIMSettingService | undefined;
    storageService: V2NIMStorageService | undefined;
    pushService: V2NIMPushService;
    httpService: V2NIMHttpServiceInternal;
    passthroughService: V2NIMPassthroughService;
    searchService: V2NIMSearchService;
    ysfService: YSFService;
    conversationIdUtil: V2NIMConversationIdUtil;
    storageUtil: V2NIMStorageUtil | undefined;
    messageCreator: V2NIMMessageCreator;
    messageConverter: V2NIMMessageConverter;
    clientAntispamUtil: V2NIMAntispamService;
    logger: Logger;
    abtService: ABTestServiceInternal;
    reporterService: ReporterServiceInternal;
    /**
     * 更新初始化传入的配置，在初始化完成后使用，在下一次建立连接时生效
     */
    updateOptions(options: NIMInitializeOptions): void;
    /**
     * 销毁实例
     *
     * 销毁当前 IM 实例，同时会退出登录状态，并断开websocket连接
     * 移除所有监听事件，销毁部分内部变量，并且此实例再也无法调用 connect 恢复 IM 连接
     */
    destroy(): Promise<void>;
}
/**
 * NIM 的构造函数初始化参数
 *
 * eg. new NIM({ ...NIMInitializeOptions })
 *
 */
export interface NIMInitializeOptions {
    /**
     * app key, 向云信申请的产品标识
     */
    appkey: string;
    /**
     * 日志分级， SDK 将根据您设置的级别，进行日志采集，建议您，将log级别设置为 Debug。您也可以不进行设置，默认级别就是Debug
     *
     * 可选值 "Error" | "Warn" | "Info" | "Debug"。
     * 和鸿蒙系统日志方案相同， 如果选择 Debug， 将输出全部等级log，选择Error 只会输出Error 级别log
     *
     */
    logLevel?: LogLevel;
    /**
     * 建立连接时的 xhr 请求的超时时间。默认为 30000 ms
     */
    xhrConnectTimeout?: number;
    /**
     * 建立 socket 长连接的超时时间。默认为 30000 ms
     */
    socketConnectTimeout?: number;
    /**
     * 是否将SDK log 输出到控制台, 默认不输出。
     */
    isOpenConsoleLog?: boolean;
}
/**
 * 和鸿蒙系统日志方案相同， 可选值 "Error" | "Warn" | "Info" | "Debug"。
 */
export declare const enum LogLevel {
    Debug = "Debug",
    Info = "Info",
    Warn = "Warn",
    Error = "Error"
}
/**
 * 初始化配置
 */
export interface NIMServiceOptions {
    /**
     * 登录模块的特殊配置
     */
    loginServiceConfig?: NIMLoginServiceConfig;
    /**
     * 消息模块配置项
     */
    messageServiceConfig?: NIMMessageServiceConfig;
    /**
     * 推送配置项
     */
    pushServiceConfig?: NIMPushServiceConfig;
    /**
     * HTTP 配置项，含私有化配置
     */
    httpServiceConfig?: NIMHttpServiceConfig;
    /**
     * 数据库初始化配置
     */
    databaseServiceConfig?: DatabaseOptions;
    /**
     * NOS 下载配置
     */
    storageServiceConfig?: NIMStorageServiceConfig;
    /**
     * 本地会话设置
     */
    localConversationServiceConfig?: LocalConversationConfig;
}
/**
 * 本地会话设置
 */
export interface LocalConversationConfig extends NIMServiceConfig {
    /**
     * 过滤函数: 由在线/同步/多端同步的消息触发的更新会话过程中，该函数判定这条消息是否允许被计入 conversation 的未读数
     */
    unreadCountFilterFn?: (_msg: V2NIMMessage) => boolean;
    /**
     * 过滤函数: 由在线/同步/多端同步的消息触发的更新会话过程中，该函数判定这条消息是否允许被计入 conversation.lastMessage 的更新
     */
    lastMessageFilterFn?: (_msg: V2NIMMessage) => boolean;
}
/**
 * 资源上传
 */
export interface NIMHttpServiceConfig extends NIMServiceConfig {
    /**
     * NOS上传地址（分片）
     */
    chunkUploadHost?: string;
    /**
     * 发送文件消息中文件的url的通配符地址，例：'https://{host}/{object}'
     */
    uploadReplaceFormat?: string;
}
/**
 * 资源下载
 */
export interface NIMStorageServiceConfig extends NIMServiceConfig {
    /**
     * NOS下载地址
     */
    downloadHost?: string;
    /**
     * 发送文件消息中文件的url的通配符地址，例：'https://{host}/{object}'
     */
    downloadReplaceFormat?: string;
}
/**
 * 数据库
 */
export interface DatabaseOptions extends NIMServiceConfig {
    /**
     * initialization app key， 必须与初始化使用的appkey 相同
     */
    appKey: string;
    /**
     * db security level, default 1
     *
     */
    securityLevel?: number;
    /**
     * Specifies whether the database is encrypted.
     *
     */
    encrypt?: boolean;
}
export interface NIMServiceConfig {
    /**
     * login account
     */
    services?: string[];
}
export type V2ServiceCreator = (core: NIM, service: V2NIMProvidedServiceType, options: NIMServiceConfig) => V2Service<NIMEBaseListener>;
/**
 * NIMSDK 提供插件化的使用方式，以下服务可以根据您的需求，进行选择注册。
 *
 * 注: localConversationService 与 conversationService 是互斥的，选择其一即可。同时会话需要强制依赖 messageService，不然无法使用
 */
export declare const enum V2NIMProvidedServiceType {
    V2NIM_PROVIDED_SERVICE_CONVERSATION = "conversationService",
    V2NIM_PROVIDED_SERVICE_LOCAL_CONVERSATION = "localConversationService",
    V2NIM_PROVIDED_SERVICE_CONVERSATION_GROUP = "conversationGroupService",
    V2NIM_PROVIDED_SERVICE_MESSAGE = "messageService",
    V2NIM_PROVIDED_SERVICE_CLIENT_ANTISPAM_UTIL = "clientAntispamUtil",
    V2NIM_PROVIDED_SERVICE_TEAM = "teamService",
    V2NIM_PROVIDED_SERVICE_USER = "userService",
    V2NIM_PROVIDED_SERVICE_FRIEND = "friendService",
    V2NIM_PROVIDED_SERVICE_SIGNALLING = "signallingService",
    V2NIM_PROVIDED_SERVICE_SEARCH = "searchService",
    /** 特殊 ysf，可忽略 **/
    V2NIM_PROVIDED_SERVICE_YSF = "ysfService"
}
