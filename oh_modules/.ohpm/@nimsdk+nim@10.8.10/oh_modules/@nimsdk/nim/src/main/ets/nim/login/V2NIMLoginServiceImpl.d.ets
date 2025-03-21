import { CmdForSend, DisconnectType, LoginTraceStep, NIM, NIMEStrAnyObj, NIMLoginServiceConfig, NIMServiceName, Packet, PickForRequired, PromiseManager, SendCmdOptions, TimerManager, V2NIMConnectStatus, V2NIMDataSyncDetail, V2NIMKickedOfflineDetail, V2NIMLoginClient, V2NIMLoginLbsInternal, V2NIMLoginListener, V2NIMLoginOption, V2NIMLoginService, V2NIMLoginServiceInternal, V2NIMLoginStatus, V2Service } from '@nimsdk/base/';
import common from '@ohos.app.ability.common';
import { HMNetConnection } from '../link/websocket/HMNetConnection';
import V2ClientSocket from '../link/websocket/V2ClientSocket';
import { LoginTraceReporter } from './LoginTraceReporter';
import V2NIMLoginAuthenticator from './V2NIMLoginAuthenticator';
import V2NIMLoginDataSync from './V2NIMLoginDataSync';
import V2NIMLoginLifeCycle from './V2NIMLoginLifeCycle';
import V2NIMLoginReconnect from './V2NIMLoginReconnect';
export default class V2NIMLoginServiceImpl extends V2Service<V2NIMLoginListener> implements V2NIMLoginService, V2NIMLoginServiceInternal {
    context: common.Context;
    clientSocket: V2ClientSocket;
    reconnect: V2NIMLoginReconnect;
    lbs: V2NIMLoginLbsInternal;
    authenticator: V2NIMLoginAuthenticator;
    dataSync: V2NIMLoginDataSync;
    lifeCycle: V2NIMLoginLifeCycle;
    netConnectionReceiver: HMNetConnection;
    account: string;
    previousLoginAccount: string;
    token: string;
    deviceId: string;
    clientSession: string;
    loginTimerManager: TimerManager;
    originLoginPromise?: Promise<V2NIMLoginClient>;
    previousLoginManager: PromiseManager;
    doLoginStepsManager: PromiseManager;
    loginOption: PickForRequired<V2NIMLoginOption, 'retryCount' | 'forceMode' | 'authType' | 'syncLevel' | 'timeout'>;
    config: PickForRequired<NIMLoginServiceConfig, 'lbsUrls' | 'linkUrl'>;
    kickedDetail: V2NIMKickedOfflineDetail | null;
    loginReporter: LoginTraceReporter;
    loginFailedCount: number;
    debug: boolean;
    constructor(s90: NIM, t90: NIMServiceName, u90: NIMLoginServiceConfig);
    onLoginStart(r90: string): Promise<void>;
    onLoginFinished(q90: string): Promise<void>;
    sendCmd(n90: string, o90?: NIMEStrAnyObj, p90?: SendCmdOptions): Promise<void | Packet | CmdForSend>;
    ping(): Promise<void>;
    doDisconnect(l90: DisconnectType, m90: string | NIMEStrAnyObj): void;
    setOptions(k90: NIMLoginServiceConfig): void;
    checkIllegalState(): void;
    /**
     * 登录接口
     *
     * @param account 账号 id
     * @param token 账号 token
     * @param loginOption 登录选项
     * @returns 登录端信息
     */
    login(e90: string, f90: string, g90?: V2NIMLoginOption): Promise<void>;
    /**
     * 尝试做一次登录。
     *
     * 注：发起一次 LBS, TCP, Protocol 认证的请求。
     * @param isReconnect 是否为重连.
     * @returns V2NIMLoginClient
     */
    doLogin(y89: boolean, z89: boolean): Promise<import("@nimsdk/base/").V2NIMLoginClientField>;
    /**
     * 平滑登录处理
     *
     * 设计文档参见: https://docs.popo.netease.com/lingxi/2dc3df08ecac408c9d549ccb89022621?header=false%2Cfalse#VerN-1663144352766
     *
     * SDK 内部平滑处理
     *   2. 当前已登录。
     *     a. if isSameLogin 为 true，是相同的登录。直接回调成功
     *     b. if isSameLogin 为 false，是不同的登录。触发 logout，再触发登录
     */
    smoothForLogined(u89: string, v89: string, w89: V2NIMLoginOption): Promise<void>;
    /**
     * 平滑登录处理
     *
     * 设计文档参见: https://docs.popo.netease.com/lingxi/2dc3df08ecac408c9d549ccb89022621?header=false%2Cfalse#VerN-1663144352766
     *
     * SDK 内部平滑处理
     *   3. 当前登录中，即前面已经有了一次登录（不区分是 API 调用的 login 还是断网重连的 auto login）
     *     a. if isSameLogin 为 true，是相同的登录。
     *       * 前一次 login 动作 reject v2NIMError，错误类型 aborted 中止
     *       * 覆盖登录参数
     *       * 重置重连参数，包括重连尝试次数设置为 1， 清除重连定时器
     *       * 本次 login 动作接管前一次的 login 进度（比方说上一次的进度正在 tcp 建连过程中，那么这次 login 动作就接管了这个 tcp 建连，不会从 lbs 阶段重头走起）
     *     b. if isSameLogin 为 false, 是不同的登录
     *       * 前一次 login 动作 reject v2NIMError，错误类型 aborted 中止
     *       * 覆盖登录参数
     *       * 重置重连参数，包括重连尝试次数设置为 1， 清除重连定时器
     *       * 中止前一次 login 动作的所有异步接口，错误类型都为 aborted 中止。
     *       * 断开可能存在的连接并，所有生命周期等状态复位
     *       * 本次 login 重头开始
     */
    smoothForLogining(p89: string, q89: string, r89: V2NIMLoginOption, s89: boolean): Promise<void>;
    /**
     * 校验是否为相同的登录
     *
     * if 分支说明:
     * 1. account 和 鉴权模式相同下
     *   a. 若为静态登录. 判定 token 是否也相同再返回
     *   b. 若为动态的或者第三方的登录. 满足 1 条件足够，所以直接返回 true.
     * 2. account 和 鉴权模式只要有一个不同，认为不是相同登录，返回 false
     */
    checkIsSameLogin(m89: string, n89: string, o89: V2NIMLoginOption): boolean;
    logout(): Promise<void>;
    getConnectStatus(): V2NIMConnectStatus;
    getLoginStatus(): V2NIMLoginStatus;
    getLoginUser(): string;
    getLoginClients(): V2NIMLoginClient[];
    getCurrentLoginClient(): V2NIMLoginClient | void;
    getDataSync(): V2NIMDataSyncDetail[] | null;
    setReconnectDelayProvider(e89: (delay: number) => number): void;
    /**
     * 获取聊天室 link 地址
     */
    getChatroomLinkAddress(c89: string): Promise<Array<string>>;
    kickOffline(z88: V2NIMLoginClient): Promise<void>;
    getKickedOfflineDetail(): V2NIMKickedOfflineDetail | null;
    onLogout(): void;
    loginTrace(w88: LoginTraceStep, x88?: string, y88?: string): void;
    checkLogUpload(): void;
    checkLoginTerminalCode(p88: number): boolean;
    private _createIllegalStateError;
    private _finalizeLogout;
    /**
     * 封装函数, 尝试多次 doLogin 登录操作.
     *
     * @param originLoginPromise 上一次的 login 动作的 promise. 如果是 smoothForLogining "平滑登录" 需要, 则传入这个参数来 “接管” 上一次 login 的进展.
     * @returns Promise<V2NIMLoginClient>
     */
    private multiTryDoLogin;
    private v2LoginHandler;
    private v2LoginClientChangeHandler;
    private nimLoginClientChangeHandler;
    private qchatLoginClientChangeHandler;
    private v2BeKickedHandler;
    private sdkLogUploadHandler;
}
