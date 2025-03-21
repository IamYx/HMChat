import { Logger, NIMEStrAnyObj } from '@nimsdk/base/Index';
import { EventEmitter } from '@nimsdk/vendor';
import webSocket from '@ohos.net.webSocket';
import V2NIMChatroomClient from '../../../V2NIMChatroomClient';
/**
 * 目前还是旧模式，先用一个http请求协商参数
 * 自定义数据收发
 */
export declare class CRBinaryBaseWebSocket extends EventEmitter {
    url: string;
    core: V2NIMChatroomClient;
    logger: Logger;
    status: 'connected' | 'disconnected' | 'connecting';
    websocket?: webSocket.WebSocket | null;
    sessionId?: string;
    socketUrl?: string;
    socketConnectTimer: number;
    constructor(k13: V2NIMChatroomClient, l13: string);
    connect(): void;
    /**
     * 主动关闭 websocket 连接。
     *
     * 非来自于 websocket 监听到的 close 事件。
     */
    close(): void;
    /**
     * 清除websocket上面的回调事件等
     */
    clean(): void;
    onConnect(): void;
    _createWebsocket(x12: string): void;
    onMessage(h12: ArrayBuffer): void;
    send(w11: number, x11: number, y11: number, z11: string, a12: NIMEStrAnyObj[]): void;
    /**
     * 上报二进制编解码过程中的异常
     */
    reportBinaryError(q11: {
        err: NIMEStrAnyObj;
        rawStr?: string;
        sid?: number;
        cid?: number;
        type: 'encode' | 'decode';
    }): void;
}
