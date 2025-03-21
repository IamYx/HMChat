import { cmdConfig, notiCmdMap, parseCmd, V2NIMErrorCode, V2NIMErrorImpl } from '@nimsdk/base/Index';
import { EventEmitter } from '@nimsdk/vendor';
import webSocket from '@ohos.net.webSocket';
import PacketDecoder from './decoder';
import PacketEncoder from './encoder';
export class CRBinaryBaseWebSocket extends EventEmitter {
    constructor(k13, l13) {
        super();
        this.url = l13;
        this.websocket = null;
        this.socketConnectTimer = 0;
        this.core = k13;
        this.url = l13;
        this.status = 'disconnected';
        this.logger = k13.logger;
        this.connect();
    }
    connect() {
        if (this.status === 'connecting' || this.status === 'connected') {
            this.logger.warn('imsocket::socket is connecting or connected', this.status);
            return;
        }
        this.status = 'connecting';
        this._createWebsocket('wss://' + this.url + '/websocket');
        this.websocket.connect(this.socketUrl, (i13, j13) => {
            if (!i13) {
                console.log("connect success");
            }
            else {
                console.log("connect fail, err:" + JSON.stringify(i13));
            }
        });
    }
    close() {
        this.status = 'disconnected';
        if (!this.websocket)
            return;
        this.logger.info('imsocket:: close websocket');
        try {
            this.websocket.close((g13, h13) => {
                if (!g13) {
                    console.log("close success");
                }
                else {
                    console.log("close fail, err is " + JSON.stringify(g13));
                }
                this.clean();
                this.emit('disconnect');
            });
        }
        catch (f13) {
            this.logger.warn('imsocket::attempt to close websocket error', f13);
        }
    }
    clean() {
        this.status = 'disconnected';
        if (!this.websocket)
            return;
        this.socketUrl = undefined;
        this.websocket = null;
    }
    onConnect() {
        this.status = 'connected';
        this.emit('connect');
        clearTimeout(this.socketConnectTimer);
    }
    _createWebsocket(x12) {
        this.socketConnectTimer = setTimeout(() => {
            this.logger.error('imsocket::Websocket connect timeout. url: ', this.socketUrl);
            this.emit('connectFailed', new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_CONNECT_TIMEOUT,
                detail: { reason: `imsocket::Websocket connect timeout. url: ${this.socketUrl}` }
            }));
        }, this.core.options.socketConnectTimeout || 8000);
        this.socketUrl = x12;
        this.websocket = webSocket.createWebSocket();
        this.websocket.on('message', (d13, e13) => {
            console.log(`on message, message: ${d13} ${e13}`);
            if (!d13 && e13 instanceof ArrayBuffer) {
                this.onMessage(e13);
            }
        });
        this.websocket.on('close', (b13, c13) => {
            this.logger.info(`imsocket::Websocket onclose done ${JSON.stringify(b13)} ${JSON.stringify(c13)}`);
            if (this.status === 'connected') {
                this.clean();
                this.emit('disconnect');
            }
            else {
                this.clean();
                this.emit('connectFailed', new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CONNECT_FAILED,
                    detail: { reason: `imsocket::Websocket onclose done` }
                }));
            }
        });
        this.websocket.on("error", (a13) => {
            this.logger.error('imsocket::Websocket onerror', JSON.stringify(a13));
            if (this.status === 'connected') {
                this.clean();
                this.emit('disconnect');
            }
            else {
                this.clean();
                this.emit('connectFailed', new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CONNECT_FAILED,
                    detail: { reason: `imsocket::Websocket onerror.` }
                }));
            }
        });
        this.websocket.on('open', (y12, z12) => {
            console.log("on open, status:" + z12['status'] + ", message:" + z12['message']);
            this.onConnect();
        });
    }
    onMessage(h12) {
        if (h12) {
            const i12 = new PacketDecoder(h12);
            let j12 = { sid: -1, cid: -1, ser: -1, packetLength: -1 };
            let k12 = null;
            try {
                i12.unmarshalHeader();
                j12 = i12.getHeader();
                k12 = i12.getInnerHeader();
            }
            catch (u12) {
                const v12 = k12 ? k12.sid : j12?.sid;
                const w12 = k12 ? k12.cid : j12?.cid;
                this.reportBinaryError({
                    err: u12,
                    sid: v12,
                    cid: w12,
                    type: 'decode'
                });
            }
            const l12 = k12 ? k12.sid : j12.sid;
            const m12 = k12 ? k12.cid : j12.cid;
            const n12 = `${l12}_${m12}`;
            const o12 = notiCmdMap[n12];
            if (o12 && o12.length > 0) {
                const p12 = o12[0].config;
                let q12;
                try {
                    q12 = i12.unmarshal(p12.response);
                }
                catch (s12) {
                    this.reportBinaryError({ err: s12, sid: l12, cid: m12, type: 'decode' });
                    i12.reset();
                    const t12 = {
                        ...j12,
                        sid: l12,
                        cid: m12,
                        code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNPACK_ERROR
                    };
                    this.logger.error(`imsocket::onMessage "${t12.sid}_${t12.cid}", ser ${t12.ser}, packetLength ${t12.packetLength} unmarshal error`);
                    this.emit('message', JSON.stringify(t12));
                    return;
                }
                const r12 = parseCmd(q12, undefined);
                if (r12) {
                    this.emit('message', r12);
                }
            }
            else {
                this.core.logger.warn('imsocket::onMessage cmd not found', n12);
            }
            i12.reset();
        }
    }
    send(w11, x11, y11, z11, a12) {
        const b12 = new PacketEncoder(w11, x11, y11);
        const c12 = cmdConfig[z11];
        let d12;
        let e12 = '';
        try {
            e12 = JSON.stringify(a12);
            d12 = b12.marshal(JSON.parse(e12), c12.params);
        }
        catch (g12) {
            this.reportBinaryError({ err: g12, sid: w11, cid: x11, rawStr: e12, type: 'encode' });
            b12.reset();
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_PACK_ERROR,
                detail: {
                    reason: `${w11}-${x11}, ser ${y11} marshal error`,
                    rawError: g12
                }
            });
        }
        try {
            this.websocket?.send(d12);
        }
        catch (f12) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED,
                detail: {
                    reason: `${w11}-${x11}, ser ${y11} send failed, raw: ${JSON.stringify(a12)}`,
                    rawError: f12
                }
            });
        }
        finally {
            b12.reset();
        }
    }
    reportBinaryError(q11) {
        const { err: r11, rawStr: s11, sid: t11, cid: u11, type: v11 } = q11;
    }
}
