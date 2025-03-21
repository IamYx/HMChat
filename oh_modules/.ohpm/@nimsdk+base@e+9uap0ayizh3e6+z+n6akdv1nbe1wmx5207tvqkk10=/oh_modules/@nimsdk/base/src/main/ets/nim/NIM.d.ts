/**
 * NIM core
 *
 * Initialize the IM service and act as a mediator, responsible for coordinating various services.
 *
 */
import { EventEmitter } from '@nimsdk/vendor';
import { LogLevel, NIMInitializeOptions, NIMServiceConfig, NIMServiceOptions, V2NIMInterface, V2NIMProvidedServiceType } from './sdk/V2NIMInterface';
import { NIMEBaseListener, NIMServiceName } from './sdk/types';
import { NIMEStrAnyObj } from './internal/types';
import V2Service from './v2Service';
import V2NIMLoginServiceInternal from './internal/login/V2NIMLoginServiceInternal';
import V2NIMMessageServiceInternal from './internal/message/V2NIMMessageServiceInternal';
import V2NIMConversationServiceInternal from './internal/conversation/V2NIMConversationServiceInternal';
import V2NIMConversationGroupServiceInternal from './internal/conversationgroup/V2NIMConversationGroupServiceInternal';
import V2NIMNotificationServiceInternal from './internal/notification/V2NIMNotificationServiceInternal';
import V2NIMClientAntispamUtilInternal from './internal/V2NIMClientAntispamUtilInternal';
import V2NIMConversationIdUtilInternal from './internal/conversation/V2NIMConversationIdUtilInternal';
import V2NIMFriendServiceInternal from './internal/friend/V2NIMFriendServiceInternal';
import V2NIMTeamServiceInternal from './internal/team/V2NIMTeamServiceInternal';
import V2NIMUserServiceInternal from './internal/user/V2NIMUserServiceInternal';
import V2NIMSettingServiceInternal from './internal/setting/V2NIMSettingServiceInternal';
import V2NIMMessageCreatorInternal from './internal/message/V2NIMMessageCreatorInternal';
import V2NIMMessageAttachmentCreatorInternal from './internal/message/V2NIMMessageAttachmentCreatorInternal';
import common from '@ohos.app.ability.common';
import TimerManager from './utils/timer';
import Logger from './utils/logger';
import { CmdForSend, Packet } from './parser';
import { IMKVManager } from './utils/KVManager';
import V2NIMSyncServiceInternal from './internal/sync/V2NIMSyncServiceInternal';
import { NIMPreference } from './utils/NIMPreference';
import { NIMPreferenceSync } from './utils/NIMPreferenceSync';
import V2NIMDatabaseServiceInternal from './internal/database/V2NIMDatabaseServiceInternal';
import V2NIMPushServiceInternal from './internal/push/V2NIMPushServiceInternal';
import { V2NIMHttpServiceInternal } from './internal/http/V2NIMHttpServiceInternal';
import LoggerServiceInternal from './internal/logger/LoggerServiceInternal';
import V2NIMStorageServiceInternal from './internal/storage/V2NIMStorageServiceInternal';
import V2NIMSignallingServiceInternal from './internal/signalling/V2NIMSignallingServiceInternal';
import { V2NIMLocalConversationServiceInternal } from './internal/localconversation/V2NIMLocalConversationServiceInternal';
import V2NIMStorageUtilInternal from './internal/storage/V2NIMStorageUtilInternal';
import { V2NIMMessageConverter } from './sdk/V2NIMMessageService';
import YSFServiceInternal from './internal/ysf/YSFServiceInternal';
import { ABTestServiceInternal } from './internal/abt/ABTestServiceInternal';
import { ReporterServiceInternal } from './internal/reporter/ReporterServiceInternal';
import V2NIMSubscriptionServiceInternal from './internal/subscribe/V2NIMSubscriptionServiceInternal';
import { FrequencyServiceInternal } from './internal/frequency/FrequencyServiceInternal';
import V2NIMPassthroughServiceInternal from './internal/passthrough/V2NIMPassthroughServiceInternal';
import V2NIMAIServiceInternal from './internal/ai/V2NIMAIServiceInternal';
import V2NIMSearchServiceInternal from './internal/search/V2NIMSearchServiceInternal';
import { NTPTimerInternal } from '../../../../Index';
export type ServiceCreator = (core: NIM, serviceName: NIMServiceName, options: NIMServiceConfig) => V2Service<NIMEBaseListener>;
type LoggerCreator = (core: NIM, logLevel?: LogLevel, isOpenConsoleLog?: boolean) => LoggerServiceInternal;
export declare class NIM implements V2NIMInterface {
    private static idCounter;
    context: common.Context;
    timerManager: TimerManager;
    preference: NIMPreference;
    /** ---------- 基础能力 ----------- */
    preferenceSync: NIMPreferenceSync;
    kvManager: IMKVManager;
    eventBus: EventEmitter;
    options: Required<NIMInitializeOptions>;
    serviceOptions: NIMServiceOptions;
    /** ---------- 辅助工具类 ----------- */
    conversationIdUtil: V2NIMConversationIdUtilInternal;
    messageCreator: V2NIMMessageCreatorInternal;
    messageAttachmentCreator: V2NIMMessageAttachmentCreatorInternal;
    messageConverter: V2NIMMessageConverter;
    /** ---------- 模块服务 ----------- */
    loginService: V2NIMLoginServiceInternal;
    /** ---------- 基础能力 end ----------- */
    syncService: V2NIMSyncServiceInternal;
    notificationService: V2NIMNotificationServiceInternal;
    /** ---------- 辅助工具类 end ----------- */
    messageService: V2NIMMessageServiceInternal;
    conversationService: V2NIMConversationServiceInternal;
    localConversationService: V2NIMLocalConversationServiceInternal;
    conversationGroupService: V2NIMConversationGroupServiceInternal;
    clientAntispamUtil: V2NIMClientAntispamUtilInternal;
    userService: V2NIMUserServiceInternal;
    friendService: V2NIMFriendServiceInternal;
    settingService: V2NIMSettingServiceInternal;
    teamService: V2NIMTeamServiceInternal;
    pushService: V2NIMPushServiceInternal;
    httpService: V2NIMHttpServiceInternal;
    passthroughService: V2NIMPassthroughServiceInternal;
    loggerService: LoggerServiceInternal;
    storageService: V2NIMStorageServiceInternal;
    storageUtil: V2NIMStorageUtilInternal;
    signallingService: V2NIMSignallingServiceInternal;
    subscriptionService: V2NIMSubscriptionServiceInternal;
    aiService: V2NIMAIServiceInternal;
    ysfService: YSFServiceInternal;
    searchService: V2NIMSearchServiceInternal;
    databaseService: V2NIMDatabaseServiceInternal;
    /** ---------- 模块服务 end ----------- */
    logger: Logger;
    abtService: ABTestServiceInternal;
    ntp: NTPTimerInternal;
    frequencyService: FrequencyServiceInternal;
    reporterService: ReporterServiceInternal;
    constructor(u11: common.Context, v11: NIMInitializeOptions, w11?: NIMServiceOptions);
    private _id;
    get id(): number;
    get account(): string;
    static isRegisteredService(t11: V2NIMProvidedServiceType): ServiceCreator | undefined;
    static registerService(r11: NIMServiceName | V2NIMProvidedServiceType, s11: ServiceCreator): void;
    static unregisterService(q11: NIMServiceName | V2NIMProvidedServiceType): void;
    static registerLogger(o11: string, p11: LoggerCreator): void;
    static unRegisterLogger(n11: string): void;
    static enableService(m11: NIMServiceName): void;
    static disableService(l11: NIMServiceName): void;
    static disableAllServices(): void;
    static isServiceEnabled(k11: NIMServiceName): boolean;
    static getLogger(): Logger | undefined;
    getWorkerId(): string;
    /**
     * 客户调用更新参数。常用于设置动态登录 token
     *
     * 注: 随着 v2 api 后，这个方法不再推荐设置 token，lbsUrls 等.
     */
    updateOptions(i11: Partial<NIMInitializeOptions>): void;
    /**
     * 销毁实例
     *
     * 销毁当前 IM 实例，同时会退出登录状态，并断开websocket连接
     * 移除所有监听事件，销毁部分内部变量，并且此实例再也无法调用 connect 恢复 IM 连接
     *
     * 实现法则：不能使正在运行中的promise/callback访问不到某实例的变量报错，因此只是掐断实例接收新消息的通道，并且移除所有的监听，移除所有能通知上层的事件。
     *
     * 在 disconnect 断开连接后：
     * 1. 标明 status 为 destroy
     * 2. 移除 connect 等方法使连接状态无法再此更改。
     */
    destroy(): Promise<void>;
    sendCmd(f11: string, g11?: NIMEStrAnyObj, h11?: {
        timeout?: number;
    }): Promise<Packet | void | CmdForSend>;
    onLoginStart(w10: string): Promise<void>;
    onLoginFinished(n10: string): Promise<void>;
    onLoginSync(j10: string): Promise<void>;
    onLogout(): Promise<void>;
    /**
     * 退出登录，并断开websocket连接
     *
     * 注: 内部供销毁函数用的，外部不要调用。外部的 disconnect 函数等效于 V1NIMLoginService.disconnect
     */
    private _disconnect;
    private _clearModuleData;
    private _removeAllModuleListeners;
    private createServiceByName;
    private createDBServiceByName;
    private createLoggerService;
    private createAbtServiceByName;
    private createReporterServiceByName;
    /**
     * 初始化设置参数
     *
     * 注: 随着 v2 api 后，这个方法不再推荐设置 token，lbsUrls 等.
     */
    private setInitOptions;
}
export {};
