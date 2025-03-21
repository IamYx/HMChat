import { EventEmitter } from '@nimsdk/vendor/';
import PacketEncoder from '../parser/encoder';
import webSocket from '@ohos.net.webSocket';
import { cmdConfig, notiCmdMap, parseCmd, V2NIMErrorCode, V2NIMErrorImpl, } from '@nimsdk/base';
import PacketDecoder from '../parser/decoder';
import { WorkerHolder } from '../../workers/WorkerHolder';
const TAG = '[webSocket]';
export default class WebsocketAdapter extends EventEmitter {
    constructor(a79, b79) {
        super();
        this.websocket = null;
        this.socketConnectTimer = 0;
        this.messageCountInWorker = 0;
        this.pendingRemoveListeners = false;
        this.core = a79;
        this.url = b79;
        this.socketConnectTimeout = this.core.options.socketConnectTimeout || 8000;
        this.status = 'disconnected';
        this.messageCountInWorker = 0;
        this.pendingRemoveListeners = false;
        this.workerId = this.core.getWorkerId();
        this.isHttps = this.core.loginService.config.isHttps;
        WorkerHolder.getInstance().registerNim(this.workerId, this);
        this.connect();
    }
    connect() {
        if (this.status === 'connecting' || this.status === 'connected') {
            this.core.logger.warn(TAG, 'socket is connecting or connected', this.status);
            return;
        }
        this.status = 'connecting';
        const x78 = this.buildWebSocketUrl();
        this._createWebsocket(x78);
        this.websocket.connect(this.socketUrl, (y78, z78) => {
            if (!y78) {
                this.core.logger.info(TAG, 'socket start connect', this.socketUrl);
            }
            else {
                this.core.logger.error(TAG, 'connect fail, err:', this.socketUrl, y78);
                this.clean();
                this.reportException(V2NIMErrorCode.V2NIM_ERROR_CODE_CONNECT_FAILED, 'start connect failed', 'connect fail, err:' + JSON.stringify(y78));
            }
        });
    }
    close() {
        if (!this.websocket) {
            return;
        }
        if (this.status === 'disconnected' || this.status === 'connecting') {
            this.core.logger.info(TAG, 'websocket is not connected', this.socketUrl);
            return;
        }
        this.core.logger.info(TAG, 'close websocket');
        try {
            this.websocket.close((v78, w78) => {
                if (!v78) {
                    this.core.logger.info(TAG, 'close websocket start', this.socketUrl);
                }
                else {
                    this.core.logger.error(TAG, 'close websocket fail', this.socketUrl, v78);
                }
            });
        }
        catch (u78) {
            this.core.logger.error(TAG, 'attempt to close websocket error', this.socketUrl, u78);
            this.core.reporterService?.addException({
                action: 0,
                code: u78.code,
                description: JSON.stringify(u78),
                operationType: 0,
                context: 'close',
                target: this.socketUrl
            });
        }
    }
    removeListeners() {
        this.core.logger.warn(TAG, `messageCountInWorker(${this.messageCountInWorker}) when removeListeners`);
        if (this.messageCountInWorker <= 0) {
            this.removeAllListeners();
        }
        else {
            this.pendingRemoveListeners = true;
        }
    }
    clean() {
        this.status = 'disconnected';
        if (!this.websocket) {
            return;
        }
        if (this.socketConnectTimer) {
            clearTimeout(this.socketConnectTimer);
            this.socketConnectTimer = 0;
        }
        this.socketUrl = undefined;
    }
    onConnect() {
        this.core.logger.info(TAG, 'on connect', this.socketUrl);
        this.status = 'connected';
        this.emit('connect');
        if (this.socketConnectTimer) {
            clearTimeout(this.socketConnectTimer);
            this.socketConnectTimer = 0;
        }
    }
    onMessage(s78) {
        const t78 = this.inMainThreadHandler(s78);
        if (t78 === false) {
            WorkerHolder.getInstance().postBinaryMessage(this.workerId, s78);
            this.messageCountInWorker += 1;
        }
    }
    onMessageFromWorker(r78) {
        if (r78) {
            this.emit('message', r78);
        }
        this.messageCountInWorker -= 1;
        if (this.messageCountInWorker <= 0) {
            if (this.pendingRemoveListeners) {
                this.core.logger.debug(`messageCountInWorker(${this.messageCountInWorker}) <= 0 to removeListeners: ${JSON.stringify(r78)}`);
                this.removeListeners();
            }
        }
    }
    inMainThreadHandler(f78) {
        const g78 = new PacketDecoder(f78);
        try {
            let i78 = {
                sid: -1,
                cid: -1,
                ser: -1,
                priority: 0,
                packetLength: -1
            };
            g78.unmarshalHeader();
            i78 = g78.getHeader();
            if (i78.priority > 0 && f78 instanceof ArrayBuffer) {
                let j78 = g78.getInnerHeader();
                const k78 = j78 ? j78.sid : i78.sid;
                const l78 = j78 ? j78.cid : i78.cid;
                const m78 = `${k78}_${l78}`;
                const n78 = notiCmdMap[m78];
                if (n78 && n78.length > 0) {
                    const o78 = n78[0].config;
                    let p78 = g78.unmarshal(o78.response);
                    const q78 = parseCmd(p78, undefined);
                    if (q78) {
                        this.emit('message', q78);
                        return true;
                    }
                    else {
                        this.core.logger.warn('[socket]', 'cmd not found cmdArr', m78);
                    }
                }
                else {
                    this.core.logger.warn('[socket]', 'cmd not found', m78);
                }
            }
        }
        catch (h78) {
            this.core.logger.error('[socket]', 'parse header error', h78);
        }
        finally {
            g78.reset();
        }
        return false;
    }
    async send(v77, w77, x77, y77, z77) {
        this.core.logger.info(TAG, 'send packet', v77, w77, z77);
        const a78 = new PacketEncoder(v77, w77, x77);
        const b78 = cmdConfig[y77];
        let c78 = undefined;
        try {
            c78 = a78.marshal(z77, b78.params);
        }
        catch (e78) {
            a78.reset();
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_PACK_ERROR,
                detail: {
                    reason: `${v77}-${w77}, ser ${x77} marshal error, raw: ${JSON.stringify(z77)}`,
                    rawError: e78
                }
            });
        }
        try {
            await this.websocket?.send(c78);
        }
        catch (d78) {
            this.core.logger.error(TAG, 'send fail, err', d78);
            this.reportException(V2NIMErrorCode.V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED, 'send' + JSON.stringify(d78), `${v77}-${w77}, ser ${x77} send failed, raw: ${JSON.stringify(z77)}`);
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED,
                detail: {
                    reason: `${v77}-${w77}, ser ${x77} send failed, raw: ${JSON.stringify(z77)}`,
                    rawError: d78
                }
            });
        }
        finally {
            a78.reset();
        }
    }
    buildWebSocketUrl() {
        const u77 = this.isHttps !== false ? 'wss' : 'ws';
        return `${u77}://${this.url.replace(/^https?:\/\//, '')}/websocket`;
    }
    _createWebsocket(i77) {
        this.socketConnectTimer = setTimeout(() => {
            this.core.logger.error(TAG, 'connect timeout. url: ', i77);
            this.emit('connectFailed', new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_CONNECT_TIMEOUT,
                detail: {
                    reason: `Websocket connect timeout. url: ${i77}`
                }
            }));
            this.reportException(V2NIMErrorCode.V2NIM_ERROR_CODE_CONNECT_TIMEOUT, 'create web socket', 'Websocket connect timeout.');
        }, this.socketConnectTimeout);
        this.socketUrl = i77;
        this.websocket = webSocket.createWebSocket();
        this.websocket.on('message', (p77, q77) => {
            if (typeof q77 === 'string' && q77 === 'bye') {
                this.core.logger.info(TAG, 'receive "bye" form server');
                this.websocket.close((s77, t77) => {
                    if (!s77 && t77) {
                        this.core.logger.info(TAG, 'Connection closed successfully');
                    }
                    else {
                        this.core.logger.info(TAG, 'Failed to close the connection. Err', s77);
                    }
                });
                return;
            }
            if (!p77 && q77 instanceof ArrayBuffer) {
                try {
                    if (q77.byteLength > 0) {
                        this.onMessage(q77);
                    }
                    else {
                        this.core.logger.error(TAG, 'detached ArrayBuffer');
                    }
                }
                catch (r77) {
                    this.core.logger.error(TAG, 'detached ArrayBuffer', r77);
                }
            }
            else {
                this.core.logger.error(TAG, 'message error', this.socketUrl, p77, q77);
                this.reportException(V2NIMErrorCode.V2NIM_ERROR_CODE_CONNECT_FAILED, 'on message', `on message error: ${JSON.stringify(p77)}, value: ${JSON.stringify(q77)}`);
            }
        });
        this.websocket.on('close', (m77, n77) => {
            this.core.logger.info(TAG, 'on close done', 'status: ' + this.status, 'url: ' + i77, 'value reason: ' + n77.reason, 'value code: ' + n77.code, 'err: ' + m77);
            if (this.status === 'connected') {
                this.clean();
                let o77 = false;
                if (n77.reason === 'Bye' && n77.code === 1000) {
                    o77 = true;
                }
                if (typeof m77 === 'undefined') {
                    m77 = {
                        code: n77.code,
                        message: n77.reason
                    };
                }
                this.emit('disconnect', m77, o77);
            }
            else {
                this.clean();
                this.emit('connectFailed', new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CONNECT_FAILED,
                    detail: {
                        reason: `Websocket onclose done`
                    }
                }));
                this.core.logger.warn(TAG, 'on close done', 'status' + this.status, 'url' + i77, 'vale: ' + JSON.stringify(n77), 'err:' + JSON.stringify(m77));
            }
        });
        this.websocket.on('error', (l77) => {
            this.core.logger.error(TAG, 'on error', this.socketUrl, l77);
            if (this.status === 'connected') {
                this.clean();
                this.emit('disconnect', l77, false);
                if (l77.code !== 1000 && l77.code !== 1001 && l77.code !== 200) {
                    this.reportException(V2NIMErrorCode.V2NIM_ERROR_CODE_CONNECT_FAILED, `Websocket onerror, ${JSON.stringify(l77)})`, 'Websocket onerror.');
                }
            }
            else {
                this.emit('connectFailed', new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CONNECT_FAILED,
                    detail: {
                        reason: `Websocket onerror.`
                    }
                }));
            }
        });
        this.websocket.on('open', (j77, k77) => {
            this.core.logger.info(TAG, 'connect succeeded, url', i77, k77['status'], k77['message']);
            this.onConnect();
        });
    }
    reportException(f77, g77, h77) {
        this.core.reporterService?.addException({
            action: 0,
            code: f77,
            description: h77,
            operationType: 0,
            context: g77,
            target: this.socketUrl
        });
    }
}
