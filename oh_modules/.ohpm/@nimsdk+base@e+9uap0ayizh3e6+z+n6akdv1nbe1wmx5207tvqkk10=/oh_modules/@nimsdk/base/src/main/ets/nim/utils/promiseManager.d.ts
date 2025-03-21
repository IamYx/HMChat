interface PromiseWithAbort<T> {
    abort: (error: Error) => void;
    promise: Promise<T>;
}
export declare function getPromiseWithAbort<k127>(z25: k127 | Promise<k127>): PromiseWithAbort<k127>;
/**
 * 异步任务的管理器
 *
 * 存放统一能在 disconnect，destroy 时销毁的 promise。
 *
 * 注, 使用场景:
 *   某些请求如 lbs，假设网络差过了若干秒才能返回，在此期间手动断开退出,
 *   我们希望能够忽略这个请求 then 或者 catch 后续触发连接的动作.
 *   在没有这个管理器前，只能够不停的在原型链上设置是否断开，是否正在连接中等等标志位，代码零散 bug 频出。
 */
export default class PromiseManager {
    private abortFns;
    /**
     * 异步任务的终止管理器的构造器
     */
    constructor();
    /**
     * 新增定时器
     * @param promise promise 对象
     * @return promise
     */
    add<j127>(x25: Promise<j127>): Promise<j127>;
    clear(v25?: Error): void;
    destroy(): void;
}
export {};
