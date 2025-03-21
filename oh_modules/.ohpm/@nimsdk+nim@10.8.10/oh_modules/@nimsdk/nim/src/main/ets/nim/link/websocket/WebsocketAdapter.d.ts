import { EventEmitter } from '@nimsdk/vendor/';
import webSocket from '@ohos.net.webSocket';
import { NIM, NIMEStrAnyObj } from '@nimsdk/base';
import { WorkerMessageReceiver } from '../../workers/WorkerMessageReceiver';
/**
 * 目前还是旧模式，先用一个http请求协商参数
 * 自定义数据收发
 */
export default class WebsocketAdapter extends EventEmitter implements WorkerMessageReceiver {
    status: 'connected' | 'disconnected' | 'connecting';
    websocket?: webSocket.WebSocket | null;
    sessionId?: string;
    socketUrl?: string;
    socketConnectTimer: number;
    messageCountInWorker: number;
    pendingRemoveListeners: boolean;
    private url;
    private socketConnectTimeout;
    private workerId;
    private isHttps?;
    private core;
    constructor(a79: NIM, b79: string);
    connect(): void;
    /**
     * 主动关闭 websocket 连接。
     *
     * 非来自于 websocket 监听到的 close 事件。
     */
    close(): void;
    removeListeners(): void;
    /**
     * TODO 清除websocket上面的回调事件等，清除后如果收到通知会出现crash
     */
    clean(): void;
    onConnect(): void;
    onMessage(s78: ArrayBuffer): void;
    onMessageFromWorker(r78: any): void;
    inMainThreadHandler(f78: ArrayBuffer): boolean;
    send(v77: number, w77: number, x77: number, y77: string, z77: NIMEStrAnyObj[]): Promise<void>;
    private buildWebSocketUrl;
    private _createWebsocket;
    private reportException;
}
