import { EventEmitter, ValidEventTypes } from '@nimsdk/vendor';
import { Packet } from './parser';
import { NIM } from './NIM';
import Logger from './utils/logger';
export default abstract class V2Service<T extends ValidEventTypes = string> extends EventEmitter<T> {
    logger: Logger;
    name: string;
    core: NIM;
    constructor(b30: string, c30: NIM);
    /**
     * 重载 EventEmitter 的 emit 函数：
     * 1. 防止回调函数抛出异常阻塞了sdk内部流程
     * 2. 如果回调用时较长，给出警告信息
     *
     * @param event
     * @param args
     * @returns
     */
    emit(x29: EventEmitter.EventNames<T>, ...y29: EventEmitter.EventArgs<T, EventEmitter.EventNames<T>>): boolean;
    /**
     *  所有从websocket收到的包，都会进入对应子模块的process处理分发
     */
    process(r29: Packet): Promise<Packet | void>;
    checkLogin(): void;
}
