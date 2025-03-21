import { CmdForSend, NIM, NIMEStrAnyObj, Packet, V2NIMErrorImpl } from '@nimsdk/base';
import V2ClientSocket from './V2ClientSocket';
export declare enum DisconnectType {
    ACTIVE = 1,
    KICKED = 2,
    /**
     * 因网络变化，心跳超时，发包失败，login超时等调用 doDisconnect 的，会设置DisconnectType 为 OFFLINE
     *
     * 若登录保持阶段 转至 DisconnectType.OFFLINE，会触发 disconnect 事件，然后通知 willReconnect，并进行重连
     * 若手动登录期间 转至 DisconnectType.OFFLINE (表示 auth.isManualLoginAttempt = true, 亦即在用户手动 调用 connect 函数周期内), 此时不触发 willReconnect 和 disconnect 事件。
     *
     * 手动调用 connect 期间的 DisconnectType.OFFLINE 需要断开连接，并最终抛出异常给客户端。客户端捕获异常后，决定其应用接下来的行为
     */
    OFFLINE = 3
}
export declare class V2ClientSocketImpl implements V2ClientSocket {
    isForeground: boolean | undefined;
    /** 暂存进行中cmd的content、callback、timer 等内容 */
    protected sendingCmdMap: Map<any, any>;
    private core;
    private auth;
    private logger;
    private timerManager;
    private eventBus;
    private isReconnect;
    private packetTimeout;
    private socket;
    private packetSer;
    private backoff;
    private pingTimer;
    private hasNetworkListener;
    private lifecycleId;
    private currentApplication;
    constructor(d77: NIM);
    setSessionId(c77: string): void;
    /**
     * 建立 socket 长连接
     * @param linkUrl socket link 数组
     * @param isReconnect 是否为重连
     */
    connect(v76: string, w76?: boolean): Promise<void>;
    resetSocketConfig(): void;
    /**
     * 断开连接
     *
     * 1. 标记未完成的 cmd 无效
     * 2. 移除定时管理器 & 取消心跳定时
     * 3. 关闭长连接通道
     * 4. 通知长连接断开事件
     * 5. 区分断开类型（是否需要重连）
     *   5a. 主动断开的（登陆失败、握手失败这种初始化就不成功的，也算主动断开）: 1. 不需要重连、2. 移除网络监听
     *   5b. 被踢下线的: 1. 不需要重连、2. 移除网络监听、3. 通知上层 kicked 事件和原因
     *   5c. 因网络变化，心跳超时，发包失败等被动断开的: 1. 需要尝试重连、2. 不移除网络监听、3. 设置重连定时
     */
    doDisconnect(r76: DisconnectType, s76: string | NIMEStrAnyObj | V2NIMErrorImpl): void;
    /**
     * 发送协议函数
     * @param cmd 命令协议族，参见 CmdName
     * @param params 协议需要的参数
     * @param options 发送的其他选项，如超时时间
     * @returns Promise<unknown> 异步可能返回 Packet 包
     */
    sendCmd(u75: string, v75?: NIMEStrAnyObj, w75?: {
        timeout?: number;
    }): Promise<undefined | Packet | CmdForSend>;
    /**
     * 收到协议的加工处理函数
     *
     * @param raw 原始协议文本内容
     * @returns void
     */
    onMessage(q75: Array<Packet> | void): void;
    /**
     * 30 秒做一次 心跳检测
     */
    ping(m75?: number): Promise<void>;
    /**
     * 当心跳超时后做嗅探策略，变更发心跳包时间间隔为 3s，连发 5 次依旧无返回则可以认为断开
     */
    testHeartBeat5Timeout(): Promise<boolean>;
    onAbilityForeground(): void;
    logCommandWithContentFiltering(e75: Packet, f75: any): void;
    /**
     * 注销前后台监听器，by lifecycleId
     */
    private unregisterAbilityLifecycleCallbacks;
    /**
     * 注册前后台监听器
     */
    private registerAbilityLifecycleCallbacks;
    private setListener;
    private doConnect;
    /**
     * socket 存在的话，关闭长连接通道并移除长连接监听事件
     */
    private cleanSocket;
    private reportSendCmdFailed;
    /**
     * 协议包的分发处理函数，系 onMessage 的派生函数
     *
     * @param packet 协议包
     * @returns void
     */
    private packetHandler;
    /**
     * 标记某个协议命令无效
     *
     * @param ser 协议包序号
     * @param error 错误
     * @param cmd 协议包的名字
     * @returns void
     */
    private markCmdInvalid;
    /**
     * 标记所有的协议无效
     */
    private markAllCmdInvalid;
    private initOnlineListener;
    private destroyOnlineListener;
}
