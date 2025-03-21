import { createCmd, V2NIMConnectStatus, V2NIMErrorCode, V2NIMErrorImpl, V2NIMLoginStatus } from '@nimsdk/base';
import { Backoff } from '@nimsdk/vendor';
import { CRLoginLifeCycleEvent } from '../CRLoginLifeCycle';
import { CRBinaryBaseWebSocket } from './CRBinaryBaseWebSocket';
export var DisconnectType;
(function (l16) {
    l16[l16["ACTIVE"] = 1] = "ACTIVE";
    l16[l16["KICKED"] = 2] = "KICKED";
    l16[l16["OFFLINE"] = 3] = "OFFLINE";
})(DisconnectType || (DisconnectType = {}));
const TAG = '[CRBinaryClientSocketImpl]';
export class CRBinaryClientSocketImpl {
    constructor(k16) {
        this.isReconnect = false;
        this.packetTimeout = 8000;
        this.packetSer = 1;
        this.backoff = new Backoff({ max: 8000, min: 1600, jitter: 0.01 });
        this.sendingCmdMap = new Map();
        this.pingTimer = 0;
        this.hasNetworkListener = false;
        this.core = k16;
        this.auth = k16.loginService;
        this.logger = k16.logger;
        this.timerManager = k16.timerManager;
        this.eventBus = k16.eventBus;
        this.setListener();
    }
    setListener() {
        this.core.eventBus.on('V2NIMLoginService/loginLifeCycleLoginSucc', () => {
            this.isReconnect = true;
        });
    }
    setSessionId(j16) {
        if (this.socket) {
            this.socket.sessionId = j16;
        }
    }
    async connect(c16, d16 = false) {
        this.isReconnect = d16;
        const e16 = this.core.loginService.getConnectStatus();
        if (e16 === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED) {
            const h16 = `clientSocket::connect status is ${e16}, and would not repeat connect`;
            const i16 = new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: {
                    reason: h16
                }
            });
            this.logger.warn(h16);
            return Promise.reject(i16);
        }
        this.auth.lifeCycle.processEvent(CRLoginLifeCycleEvent.Connect);
        try {
            await this.auth.loginPromise.doLoginStepsManager.add(this.doConnect(c16));
            this.logger.info(`clientSocketV2:: connect success with link url: ${c16}, isReconnect: ${d16}`);
            this.auth.lifeCycle.processEvent(CRLoginLifeCycleEvent.ConnectSucc);
        }
        catch (f16) {
            const g16 = f16;
            if (g16.code === V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED || g16.code === V2NIMErrorCode.V2NIM_ERROR_CODE_TIMEOUT) {
                this.socket?.close();
                this.socket?.removeAllListeners();
                this.socket = undefined;
                throw f16;
            }
            this.logger.warn(TAG, `clientSocketV2::connect failed with link url: ${c16}`, g16);
            this.auth.lifeCycle.processEvent(CRLoginLifeCycleEvent.ConnectFail, g16);
            throw f16;
        }
    }
    doConnect(w15) {
        let x15 = false;
        return new Promise((y15, z15) => {
            this.socket = new CRBinaryBaseWebSocket(this.core, w15);
            this.socket.on('connect', () => {
                this.logger.info('clientSocketV2::socket on connect', w15);
                x15 = true;
                y15();
            });
            this.socket.on('message', this.onMessage.bind(this));
            this.socket.on('disconnect', async (b16) => {
                x15 = true;
                this.logger.info('clientSocketV2::socket on disconnect', b16);
                this.doDisconnect(DisconnectType.OFFLINE, 'SocketOnDisconnect');
            });
            this.socket.on('connectFailed', (a16) => {
                if (x15) {
                    this.ping();
                }
                else {
                    this.logger.error(`clientSocketV2::connectFailed: "${a16 && a16.message}"`);
                    this.cleanSocket();
                }
                x15 = true;
                z15(a16);
            });
        });
    }
    cleanSocket() {
        if (this.socket) {
            typeof this.socket.removeAllListeners === 'function' && this.socket.removeAllListeners();
            typeof this.socket.close === 'function' && this.socket.close();
            this.socket = undefined;
        }
    }
    resetSocketConfig() {
        this.backoff.reset();
        this.initOnlineListener();
    }
    doDisconnect(s15, t15) {
        this.logger.info(TAG, `clientSocketV2::doDisconnect: type ${s15}, reason `, t15);
        if (this.core.loginService.getConnectStatus() === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED) {
            this.logger.warn(`clientSocketV2::doDisconnect: already disconnected`);
            return;
        }
        const u15 = {
            1: 'close',
            2: 'kicked',
            3: 'broken'
        };
        const v15 = u15[s15] || '';
        this.markAllCmdInvaild(new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_DISCONNECT,
            detail: {
                reason: 'Packet timeout due to instance disconnect',
                disconnect_reason: v15
            }
        }));
        this.timerManager.destroy();
        clearTimeout(this.pingTimer);
        this.cleanSocket();
        if (s15 === DisconnectType.ACTIVE) {
            this.destroyOnlineListener();
        }
        else if (s15 === DisconnectType.KICKED) {
            this.destroyOnlineListener();
        }
        else if (s15 === DisconnectType.OFFLINE) {
            this.auth.lifeCycle.processEvent(CRLoginLifeCycleEvent.ConnectionBroken, new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_DISCONNECT,
                detail: { reason: 'connection broken due to internal reasons' }
            }));
            this.logger.info(`clientSocketV2::doDisconnect: pending reconnect ${this.isReconnect}`);
            this.isReconnect && this.auth.lifeCycle.processEvent(CRLoginLifeCycleEvent.Waiting);
        }
    }
    sendCmd(v14, w14, x14) {
        const y14 = this.core.loginService.getLoginStatus();
        const z14 = ['v2Login', 'login', 'chatroomLogin', 'v2ChatroomLogin'];
        const a15 = { cmd: v14 };
        if (!(y14 === V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED || z14.includes(v14))) {
            this.logger.warn(`clientSocketV2::NIM login status is ${y14}, so can not sendCmd ${v14}`);
            return Promise.reject(new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: {
                    reason: 'Can not sendCmd due to no logined',
                    ...a15
                }
            }));
        }
        const b15 = v14 !== 'heartbeat';
        const c15 = b15 ? this.packetSer++ : 0;
        const d15 = createCmd(v14, c15, this.logger, w14);
        if (!d15) {
            const r15 = new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_INTERNAL,
                detail: {
                    ...a15,
                    reason: `SendCmd::createCmd error: ${c15} ${v14}`
                }
            });
            this.logger.error("creatCmdReuslt error:" + JSON.stringify(r15));
            return Promise.reject(r15);
        }
        const { packet: e15, hasPacketResponse: f15, hasPacketTimer: g15 } = d15;
        const h15 = JSON.stringify(e15);
        if (b15) {
            this.core.options.debugLevel === 'debug'
                ? this.logger.debug('clientSocketV2::sendCmd', v14, `ser:${c15}`, h15)
                : this.logger.info('clientSocketV2::sendCmd', v14, `ser:${c15}`);
        }
        const i15 = new Date().getTime();
        return new Promise((m15, n15) => {
            if (f15) {
                this.sendingCmdMap.set(c15, {
                    cmd: v14,
                    params: w14,
                    callback: [m15, n15],
                    timer: g15 ? setTimeout(() => {
                        const q15 = new V2NIMErrorImpl({
                            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PROTOCOL_TIMEOUT,
                            detail: {
                                ser: c15,
                                reason: `Packet Timeout: ser ${c15} cmd ${v14}`,
                                timetag: new Date().getTime(),
                                ...a15
                            }
                        });
                        this.markCmdInvalid(c15, q15, v14);
                    }, x14 && x14.timeout ? x14.timeout : this.packetTimeout)
                        : null
                });
            }
            try {
                this.socket.send(e15.SID, e15.CID, c15, v14, e15.Q);
                if (!f15)
                    m15(e15);
            }
            catch (o15) {
                const p15 = new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED,
                    detail: {
                        ser: c15,
                        reason: `Unable to send packet${o15 && o15.message ? ': ' + o15.message : ''}`,
                        timetag: new Date().getTime(),
                        rawError: o15,
                        ...a15
                    }
                });
                this.markCmdInvalid(c15, p15, v14);
                n15(p15);
            }
        }).catch(async (j15) => {
            const k15 = j15;
            const l15 = [
                V2NIMErrorCode.V2NIM_ERROR_CODE_DISCONNECT,
                V2NIMErrorCode.V2NIM_ERROR_CODE_PROTOCOL_TIMEOUT,
                V2NIMErrorCode.V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED
            ];
            if (!l15.includes(k15.code)) {
                return Promise.reject(k15);
            }
            this.reportSendCmdFailed(k15, { sid: e15.SID, cid: e15.CID, ser: c15 }, i15);
            return Promise.reject(k15);
        });
    }
    reportSendCmdFailed(s14, t14, u14) {
        this.logger.info(`reportSendCmdFailed ${JSON.stringify(s14)} ${JSON.stringify(t14)} ${u14}`);
    }
    onMessage(p14) {
        if (!p14)
            return;
        for (const q14 of p14) {
            const r14 = q14.raw.ser;
            if (q14.error) {
                this.logger.error('clientSocketV2::onMessage packet error', `${q14.raw.sid}_${q14.raw.cid}, ser:${r14},`, q14.error);
            }
            if (q14.notFound) {
                this.logger.warn('clientSocketV2::onMessage packet not found', `${q14.raw.sid}_${q14.raw.cid}, ser:${r14}`);
                return;
            }
            if (q14.cmd !== 'heartbeat') {
                this.core.options.debugLevel === 'debug'
                    ? this.logger.debug(`clientSocketV2::recvCmd ser:${r14}`, q14.cmd, q14.content)
                    : this.logger.info(`clientSocketV2::recvCmd ser:${r14}`, q14.cmd);
            }
            this.packetHandler(q14);
        }
    }
    packetHandler(g14) {
        if (!g14)
            return;
        const h14 = g14.raw.ser;
        const i14 = this.sendingCmdMap.get(h14);
        if (i14 && i14.cmd === g14.cmd) {
            const { callback: j14, timer: k14, params: l14 } = i14;
            clearTimeout(k14);
            g14.params = l14;
            this.sendingCmdMap.delete(h14);
            if (g14.cmd === 'heartbeat') {
                j14[0]();
                return;
            }
            const m14 = this.core[g14.service]?.process(g14);
            if (m14 && typeof m14.then === 'function') {
                m14.then((o14) => {
                    j14[0](o14);
                })
                    .catch((n14) => {
                    j14[1](n14);
                });
            }
            else {
                this.logger.info('clientSocketV2::handlerFn without promise', g14.service, g14.cmd);
                j14[0](g14);
            }
        }
        else {
            ;
            this.core[g14.service]?.process(g14);
        }
    }
    markCmdInvalid(a14, b14, c14) {
        const d14 = this.sendingCmdMap.get(a14);
        if (!d14)
            return;
        const { callback: e14, timer: f14 } = d14;
        f14 && clearTimeout(f14);
        this.sendingCmdMap.delete(a14);
        this.logger.warn(TAG, `clientSocketV2::packet ${a14}, ${c14} is invalid:`, b14);
        e14[1](b14);
    }
    markAllCmdInvaild(v13) {
        this.logger.info(TAG, 'markAllCmdInvaild', v13);
        this.sendingCmdMap.forEach((w13) => {
            const { callback: x13, timer: y13, cmd: z13 } = w13;
            this.logger.debug(`clientSocketV2::markAllCmdInvaild:cmd ${z13}`);
            y13 && clearTimeout(y13);
            x13[1](v13);
        });
        this.sendingCmdMap.clear();
    }
    async ping(r13) {
        clearTimeout(this.pingTimer);
        try {
            if (r13) {
                await this.sendCmd('heartbeat', {}, { timeout: r13 });
            }
            else {
                await this.sendCmd('heartbeat');
            }
        }
        catch (s13) {
            const t13 = s13;
            if (t13.code === V2NIMErrorCode.V2NIM_ERROR_CODE_DISCONNECT) {
                return;
            }
            const u13 = await this.testHeartBeat5Timeout();
            if (u13) {
                this.doDisconnect(DisconnectType.OFFLINE, 'PingError');
                return;
            }
        }
        this.pingTimer = setTimeout(() => {
            this.ping();
        }, 30000);
    }
    async testHeartBeat5Timeout() {
        clearTimeout(this.pingTimer);
        for (let p13 = 0; p13 < 5; p13++) {
            try {
                await this.sendCmd('heartbeat', {}, { timeout: 3000 });
                return false;
            }
            catch (q13) {
                this.logger.debug(`clientSocketV2::test heartbeat ${p13} Timeout`);
            }
        }
        return true;
    }
    initOnlineListener() {
        if (this.hasNetworkListener)
            return;
        this.logger.info('clientSocketV2::onlineListener:init');
        this.hasNetworkListener = true;
        this.core.loginService.netConnectionReceiver.onNetworkStatusChange(this, (m13) => {
            this.logger.info(TAG, 'clientSocketV2::onlineListener:network change', m13);
            const n13 = this.core.loginService.getConnectStatus();
            const o13 = this.core.loginService.getLoginStatus();
            if (m13.isConnected && o13 === V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED) {
                this.ping(3000);
            }
            else if (m13.isConnected && n13 === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_WAITING) {
                this.logger.info(`clientSocketV2::onlineListener:online and connectStatus is waiting, do reLogin`);
                this.core.loginService.reconnect.clearReconnectTimer();
                this.core.loginService.reconnect.doReLogin();
            }
            else if (!m13.isConnected) {
                this.doDisconnect(DisconnectType.OFFLINE, 'OfflineListener');
            }
        });
    }
    destroyOnlineListener() {
        this.logger.info(TAG, 'clientSocketV2::onlineListener:destroy');
        this.core.loginService.netConnectionReceiver.offNetworkStatusChange(this);
        this.hasNetworkListener = false;
    }
}
