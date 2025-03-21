export interface StrObj {
    [key: string]: string;
}
export interface StrAnyObj {
    [key: string]: any;
}
export interface NumAnyObj {
    [key: number]: any;
}
export type AnyArr = any[];
export declare const NIMServiceNames: string[];
export type NIMServiceName = typeof NIMServiceNames[number];
/**
 * 基础 service 模块定义
 *
 * 因 typedoc 无法编译 nodeModules 里的 eventEmitter，故而只能己方写个定义
 */
export interface NIMEBaseServiceInterface<I extends NIMEBaseListener> {
    /**
     * 继承自 eventEmitter3 的监听事件方法
     */
    on<T extends keyof I>(eventName: T, fn: (...args: I[T]) => void): void;
    /**
     * 继承自 eventEmitter3 的监听事件方法
     */
    once<T extends keyof I>(eventName: T, fn: (...args: I[T]) => void): void;
    /**
     * 继承自 eventEmitter3 的取消监听方法
     */
    off<T extends keyof I>(eventName: T, fn: (...args: I[T]) => void): void;
    /**
     * 继承自 eventEmitter3 的移除事件方法
     */
    removeAllListeners<T extends keyof I>(eventName?: T): void;
}
export interface NIMEBaseListener {
    [key: string]: [
        ...args: any
    ];
}
export interface V2NIMError extends Error {
    /**
     * 错误码
     *
     * 注: 客户端错误码范围: 190000 ~ 199999
     */
    code: number;
    /**
     * 错误描述
     */
    desc: string;
    /**
     * 错误详情
     */
    detail: V2NIMErrorDetail;
}
export interface V2NIMErrorDetail {
    /**
     * 可能的详细错误描述
     */
    reason?: string;
    /**
     * 原始错误
     */
    rawError?: Error;
    /**
     * 请求返回的原始数据
     */
    rawData?: string;
    /**
     * 错误发生的时间
     */
    timetag?: number;
    /**
     * 错误扩展
     */
    [key: string]: any;
}
/**
 * 易盾反垃圾配置
 *
 * 使用场景: 未使用云信安全通, 直接对接了易盾
 */
export interface V2NIMAntispamConfig {
    /**
     * 指定易盾业务ID，而不使用云信后台配置的安全通
     *
     * @example
     * ```
     * '{"textbid":"","picbid":""}'
     * ```
     */
    antispamBusinessId: string;
}
export declare enum V2NIMDisconnectReason {
    Destroy = "destroy",
    Logout = "logout"
}
export declare enum V2NIMProtocolFamily {
    /** 支持ipv4 */
    IPV4 = 0,
    /** 支持ipv6*/
    IPV6 = 1,
    /** 双栈支持 */
    DUAL_STACK = 2
}
