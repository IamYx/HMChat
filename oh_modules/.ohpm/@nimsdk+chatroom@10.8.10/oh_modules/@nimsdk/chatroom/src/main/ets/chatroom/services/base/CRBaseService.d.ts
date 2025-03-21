import { Logger, Packet } from '@nimsdk/base';
import { EventEmitter, ValidEventTypes } from '@nimsdk/vendor/Index';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
export default abstract class CRBaseService<T extends ValidEventTypes = string> extends EventEmitter<T> {
    logger: Logger;
    name: string;
    core: V2NIMChatroomClient;
    constructor(w3: string, x3: V2NIMChatroomClient);
    /**
     * 重载 EventEmitter 的 emit 函数：
     * 1. 防止客户的回调函数抛出异常阻塞了sdk内部流程
     * 2. 如果回调用时较长，给出警告信息
     *
     * @param event
     * @param args
     * @returns
     */
    emit(s3: EventEmitter.EventNames<T>, ...t3: EventEmitter.EventArgs<T, EventEmitter.EventNames<T>>): boolean;
    /**
     *  所有从websocket收到的包，都会进入对应子模块的process处理分发
     */
    process(m3: Packet): Promise<unknown>;
}
