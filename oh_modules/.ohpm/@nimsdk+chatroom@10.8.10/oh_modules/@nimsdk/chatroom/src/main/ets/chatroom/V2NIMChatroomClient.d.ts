import { IMKVManager, Logger, NIMEStrAnyObj, TimerManager } from '@nimsdk/base';
import { EventEmitter } from '@nimsdk/vendor';
import { common } from '@kit.AbilityKit';
import { CRHttpServiceImpl } from './services/http/CRHttpServiceImpl';
import { LoggerServiceImpl } from './services/utils/LoggerService';
import CRLoginServiceImpl from './services/login/CRLoginServiceImpl';
import CRLocalAntispamUtil from './services/antispam/CRLocalAntispamUtil';
import CRStorageServiceImpl from './services/storage/CRStorageServiceImpl';
import CRServiceImpl from './services/service/ChatroomServiceImpl';
import { V2NIMChatroomClientListener, V2NIMChatroomEnterResult, V2NIMChatroomInfo } from '../chatroom/sdk/V2NIMChatroomClient';
import { V2NIMChatroomEnterParams, V2NIMChatroomInitParams } from '../chatroom/sdk/V2NIMChatroomService';
import CRInfoServiceInternal from '../chatroom/internal/CRInfoServiceInternal';
import CRMemberServiceInternal from '../chatroom/internal/CRMemberServiceInternal';
import CRMessageCreatorInternal from '../chatroom/internal/CRMessageCreatorInternal';
import CRQueueServiceInternal from '../chatroom/internal/CRQueueServiceInternal';
import CRMessageServiceInternal from '../chatroom/internal/CRMessageServiceInternal';
import TimeOrigin from './services/utils/timeOrigin';
import { CRBinaryClientSocketImpl } from './services/login/socket/CRBinaryClientSocketImpl';
/**
 * 聊天室
 */
export default class V2NIMChatroomClient extends EventEmitter<V2NIMChatroomClientListener> {
    private static idCounter;
    private _id;
    get id(): number;
    getWorkerId(): string;
    context: common.Context;
    /** ---------- 基础能力 ----------- */
    logger: Logger;
    eventBus: EventEmitter<string | symbol, any>;
    timerManager: TimerManager;
    timeOrigin: TimeOrigin;
    httpService: CRHttpServiceImpl;
    kvManager: IMKVManager;
    /** ---------- 基础能力 end ----------- */
    /** ---------- 子模块分类 ----------- */
    loggerService: LoggerServiceImpl;
    loginService: CRLoginServiceImpl;
    clientSocket: CRBinaryClientSocketImpl;
    localAntispamUtil: CRLocalAntispamUtil;
    storageService: CRStorageServiceImpl;
    messageService: CRMessageServiceInternal;
    messageCreator: CRMessageCreatorInternal;
    queueService: CRQueueServiceInternal;
    infoService: CRInfoServiceInternal;
    memberService: CRMemberServiceInternal;
    chatroomService: CRServiceImpl;
    /** ---------- 子模块分类 end ----------- */
    /**
     * options & config 的参数放在 auth 更为合理。不过由于 IM 代码直接从 core.options, core.config 中读取一些数据，
     * 因此这里也保留了 options & config 属性。
     */
    instanceId: number;
    options: {
        appkey: string;
        account: string;
        tags: Array<string>;
        debugLevel: string;
        xhrConnectTimeout: number;
        socketConnectTimeout: number;
        customClientType?: number;
        isFixedDeviceId?: boolean;
    };
    config: {
        deviceId: string;
        clientSession: string;
    };
    /**
     * 单例模式下，得到的实例
     */
    static instance: V2NIMChatroomClient | undefined;
    static getInstanceList(): V2NIMChatroomClient[];
    static getInstance(f178: number): V2NIMChatroomClient;
    static newInstance(c178: common.Context, d178: V2NIMChatroomInitParams): V2NIMChatroomClient;
    static destroyInstance(a178: number): Promise<void>;
    static destroyAll(): void;
    constructor(x177: common.Context, y177: V2NIMChatroomInitParams);
    getInstanceId(): number;
    /**
     * Enters a chatroom with the specified room ID and entrance parameters.
     * @param roomId - The ID of the chatroom to enter.
     * @param enterParams - The parameters for entering the chatroom.
     * @returns A Promise that resolves with the entered chatroom information.
     * @throws {V2NIMErrorImpl} - Throws an error if the entered parameters are invalid or if authentication requirements are not met.
     */
    enter(t177: string, u177: V2NIMChatroomEnterParams): Promise<V2NIMChatroomEnterResult>;
    exit(): void;
    /**
     * 实例被销毁时，调用子模块的 reset 方法，清除数据
     */
    _clearModuleData(): void;
    private _removeAllModuleListeners;
    private _clear;
    private _exitAsync;
    sendCmd(l177: string, m177?: NIMEStrAnyObj, n177?: {
        timeout?: number;
    }): Promise<import("@nimsdk/base").CmdForSend | import("@nimsdk/base").Packet>;
    get account(): string;
    get tags(): string[];
    /**
     * 如果登录了，clientSocket 会用这个状态判断是否等于 'logined'，来决定是否需要 ping
     */
    get status(): "" | "logined";
    /** ---------- info service start ----------- */
    getChatroomInfo(): V2NIMChatroomInfo | null;
}
