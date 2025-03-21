import { createCmd, LoginLifeCycleEvent, LoginTraceStep, V2NIMConnectStatus, V2NIMErrorCode, V2NIMErrorImpl, V2NIMLoginStatus } from '@nimsdk/base';
import { Backoff } from '@nimsdk/vendor/';
import WebsocketAdapter from './WebsocketAdapter';
import { NetworkingInstance } from '../../repoter/Networking';
import { BackgroundCallback } from './BackgroundCallback';
const TAG = '[ClientSocket]';
export var DisconnectType;
(function (e77) {
    e77[e77["ACTIVE"] = 1] = "ACTIVE";
    e77[e77["KICKED"] = 2] = "KICKED";
    e77[e77["OFFLINE"] = 3] = "OFFLINE";
})(DisconnectType || (DisconnectType = {}));
export class V2ClientSocketImpl {
    constructor(d77) {
        this.isForeground = undefined;
        this.sendingCmdMap = new Map();
        this.isReconnect = false;
        this.packetTimeout = 60 * 1000;
        this.packetSer = 1;
        this.backoff = new Backoff({ max: 8000, min: 1600, jitter: 0.01 });
        this.pingTimer = 0;
        this.hasNetworkListener = false;
        this.lifecycleId = -1;
        this.core = d77;
        this.auth = d77.loginService;
        this.logger = d77.logger;
        this.timerManager = d77.timerManager;
        this.eventBus = d77.eventBus;
        this.currentApplication = this.core.context.getApplicationContext();
        this.setListener();
        this.registerAbilityLifecycleCallbacks();
    }
    setSessionId(c77) {
        if (this.socket) {
            this.socket.sessionId = c77;
        }
    }
    async connect(v76, w76 = false) {
        this.isReconnect = w76;
        const x76 = this.core.loginService.getConnectStatus();
        if (x76 === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED) {
            const a77 = `connect status is ${x76}, and would not repeat connect`;
            const b77 = new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: {
                    reason: a77
                }
            });
            this.logger.warn(TAG, a77);
            return Promise.reject(b77);
        }
        this.auth.lifeCycle.processEvent(LoginLifeCycleEvent.Connecting);
        try {
            this.core.loginService.loginTrace(LoginTraceStep.linkStart);
            await this.auth.doLoginStepsManager.add(this.doConnect(v76));
            this.logger.info(TAG, 'connect success with link', v76, 'isReconnect', w76);
            this.core.loginService.loginTrace(LoginTraceStep.linkSuccess, 'link succeed', v76);
            this.auth.lifeCycle.processEvent(LoginLifeCycleEvent.ConnectSuccess);
        }
        catch (y76) {
            const z76 = y76;
            this.core.loginService.loginTrace(LoginTraceStep.linkFailed, JSON.stringify(y76), v76);
            if (z76.code === V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED ||
                z76.code === V2NIMErrorCode.V2NIM_ERROR_CODE_TIMEOUT) {
                this.socket.close();
                throw y76;
            }
            this.logger.warn(TAG, 'connect failed with link url', v76, z76);
            this.auth.lifeCycle.processEvent(LoginLifeCycleEvent.ConnectFail, z76);
            throw y76;
        }
    }
    resetSocketConfig() {
        this.backoff.reset();
        this.initOnlineListener();
    }
    doDisconnect(r76, s76) {
        this.logger.info(TAG, `doDisconnect: type ${r76}, reason`, s76);
        if (this.core.loginService.getConnectStatus() === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED ||
            this.core.loginService.getConnectStatus() === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_WAITING) {
            this.logger.warn(TAG, 'doDisconnect: already disconnected or watting');
            return;
        }
        const t76 = {
            1: 'close',
            2: 'kicked',
            3: 'broken'
        };
        const u76 = t76[r76] || '';
        this.markAllCmdInvalid(new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_DISCONNECT,
            detail: {
                reason: 'Packet timeout due to instance disconnect',
                disconnect_reason: u76
            }
        }));
        this.timerManager.destroy();
        clearTimeout(this.pingTimer);
        this.cleanSocket();
        if (r76 === DisconnectType.ACTIVE) {
            this.destroyOnlineListener();
        }
        else if (r76 === DisconnectType.KICKED) {
            this.destroyOnlineListener();
        }
        else if (r76 === DisconnectType.OFFLINE) {
            this.auth.lifeCycle.processEvent(LoginLifeCycleEvent.ConnectionBroken, new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_DISCONNECT,
                detail: { reason: 'connection broken due to internal reasons' }
            }));
            this.logger.info(TAG, `doDisconnect: pending reconnect ${this.isReconnect}`);
            this.isReconnect && this.auth.lifeCycle.processEvent(LoginLifeCycleEvent.Waiting);
        }
    }
    async sendCmd(u75, v75, w75) {
        const x75 = this.core.loginService.getLoginStatus();
        const y75 = ['v2Login', 'v2ChatroomLogin'];
        const z75 = { cmd: u75 };
        if (!(x75 === V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED || y75.includes(u75))) {
            this.logger.warn(TAG, `NIM login status is ${x75}, so can not sendCmd ${u75}`);
            return Promise.reject(new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: {
                    reason: 'Can not sendCmd due to no logined',
                    ...z75
                }
            }));
        }
        const a76 = this.core.frequencyService.isForbidden(u75);
        if (a76) {
            return Promise.reject(new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_RATE_LIMIT_REACHED,
                detail: {
                    reason: 'Can not sendCmd due server frequency',
                    ...z75
                }
            }));
        }
        const b76 = u75 !== 'heartbeat';
        const c76 = b76 ? this.packetSer++ : 0;
        const d76 = createCmd(u75, c76, this.logger, v75);
        if (!d76) {
            const q76 = new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_INTERNAL,
                detail: {
                    ...z75,
                    reason: `SendCmd::createCmd error: ${c76} ${u75}`
                }
            });
            this.logger.error(TAG, 'creatCmdResult error', q76);
            return Promise.reject(q76);
        }
        const { packet: e76, hasPacketResponse: f76, hasPacketTimer: g76 } = d76;
        if (b76) {
            this.core.options.logLevel === "Debug"
                ?
                    this.logger.debug(TAG, 'sendCmd', u75, `sid: ${e76.SID} cid: ${e76.CID}, ser:${c76}`, e76)
                : this.logger.info(TAG, 'sendCmd', u75, `sid: ${e76.SID} cid: ${e76.CID}, ser:${c76}`);
        }
        const h76 = new Date().getTime();
        return new Promise((l76, m76) => {
            if (f76) {
                this.sendingCmdMap.set(c76, {
                    cmd: u75,
                    params: v75,
                    callback: [l76, m76],
                    timer: g76 ? setTimeout(() => {
                        const p76 = new V2NIMErrorImpl({
                            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PROTOCOL_TIMEOUT,
                            detail: {
                                ser: c76,
                                reason: `Packet Timeout: ser ${c76} cmd ${u75}`,
                                timetag: new Date().getTime(),
                                ...z75
                            }
                        });
                        this.markCmdInvalid(c76, p76, u75);
                    }, w75 && w75.timeout ? w75.timeout : this.packetTimeout)
                        : null
                });
            }
            try {
                this.socket.send(e76.SID, e76.CID, c76, u75, e76.Q);
                if (!f76) {
                    l76(e76);
                }
            }
            catch (n76) {
                const o76 = new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED,
                    detail: {
                        ser: c76,
                        reason: `Unable to send packet${n76 && n76.message ? ': ' + n76.message : ''}`,
                        timetag: new Date().getTime(),
                        rawError: n76,
                        ...z75
                    }
                });
                this.markCmdInvalid(c76, o76, u75);
                m76(o76);
            }
        }).catch(async (i76) => {
            const j76 = i76;
            const k76 = [
                V2NIMErrorCode.V2NIM_ERROR_CODE_DISCONNECT,
                V2NIMErrorCode.V2NIM_ERROR_CODE_PROTOCOL_TIMEOUT,
                V2NIMErrorCode.V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED
            ];
            if (j76.code === V2NIMErrorCode.V2NIM_ERROR_CODE_RATE_LIMIT_REACHED) {
                this.core.frequencyService.addForbidden(j76.detail.cmd, j76.duration);
            }
            if (!k76.includes(j76.code)) {
                return Promise.reject(j76);
            }
            this.reportSendCmdFailed(j76, { sid: e76.SID, cid: e76.CID, ser: c76 }, h76);
            return Promise.reject(j76);
        });
    }
    onMessage(q75) {
        if (!q75) {
            return;
        }
        for (const r75 of q75) {
            const s75 = r75.raw.ser;
            if (r75.error) {
                const t75 = r75.error.duration;
                r75.error = new V2NIMErrorImpl({
                    name: r75.error.name,
                    code: r75.error.code,
                    desc: r75.error.desc,
                    message: r75.error.message,
                    detail: r75.error.detail,
                });
                r75.error.duration = t75;
                this.logger.error(TAG, 'onMessage packet error', `${r75.raw.sid}_${r75.raw.cid}, ser:${s75},`, r75.error);
            }
            if (r75.notFound) {
                this.logger.warn(TAG, 'onMessage packet not found', `${r75.raw.sid}_${r75.raw.cid}, ser:${s75}`);
                return;
            }
            if (r75.cmd !== 'heartbeat') {
                this.logCommandWithContentFiltering(r75, s75);
            }
            this.packetHandler(r75);
        }
    }
    async ping(m75) {
        clearTimeout(this.pingTimer);
        try {
            if (m75) {
                await this.sendCmd('heartbeat', {}, { timeout: m75 });
            }
            else {
                await this.sendCmd('heartbeat');
            }
        }
        catch (n75) {
            const o75 = n75;
            if (o75.code === V2NIMErrorCode.V2NIM_ERROR_CODE_DISCONNECT) {
                return;
            }
            const p75 = await this.testHeartBeat5Timeout();
            if (p75) {
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
        for (let k75 = 0; k75 < 5; k75++) {
            try {
                await this.sendCmd('heartbeat', {}, { timeout: 3000 });
                return false;
            }
            catch (l75) {
                this.logger.error(TAG, `test heartbeat ${k75} Timeout`);
            }
        }
        return true;
    }
    onAbilityForeground() {
        this.logger.info(TAG, 'onAbilityForeground');
        const i75 = this.core.loginService.getConnectStatus();
        const j75 = this.core.loginService.getLoginStatus();
        if (NetworkingInstance.getInstance().judgeHasNet() &&
            j75 === V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED) {
            this.logger.info(TAG, 'onAbilityForeground network reconnect and logined start 3000ms ping');
            this.ping(3000);
        }
        else if (NetworkingInstance.getInstance().judgeHasNet() &&
            i75 === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_WAITING) {
            this.logger.info(TAG, 'onAbilityForeground:online and connectStatus is waiting, do reLogin');
            this.core.loginService.reconnect.clearReconnectTimer();
            this.core.loginService.reconnect.doReLogin();
        }
        else if (!NetworkingInstance.getInstance().judgeHasNet()) {
            this.logger.warn(TAG, 'onAbilityForeground disconnect');
        }
    }
    logCommandWithContentFiltering(e75, f75) {
        const g75 = [
            '8_109',
            '21_109',
            '8_126',
            '21_111',
            '12_5',
            '12_6',
            '3_8',
            '3_109',
            '4_4',
            '4_9',
            '4_17',
            '4_12',
            '7_15',
            '4_19',
            '4_21',
            '4_24',
            '4_16',
            '4_6',
            '4_18',
            '7_33',
            '4_27',
            '4_28',
            '4_100',
            '4_101',
            '28_20',
            '28_21'
        ];
        const h75 = `${e75.raw.sid}_${e75.raw.cid}`;
        if (g75.includes(h75)) {
            this.logger.info(TAG, `recvCmd ${e75.raw.sid}_${e75.raw.cid}, ser:${f75}, cmd: ${e75.cmd}`);
        }
        else {
            this.logger.info(TAG, `recvCmd ${e75.raw.sid}_${e75.raw.cid}, ser:${f75}, cmd: ${e75.cmd}`, e75.content);
        }
    }
    unregisterAbilityLifecycleCallbacks() {
        if (this.lifecycleId < 0) {
            return;
        }
        try {
            this.currentApplication.off('abilityLifecycle', this.lifecycleId, (c75, d75) => {
                if (c75) {
                    this.core.logger.error(TAG, `unregisterAbilityLifecycleCallback fail, err`, c75);
                }
                else {
                    this.core.logger.info(TAG, 'unregisterAbilityLifecycleCallback success, data', d75);
                }
            });
        }
        catch (b75) {
            this.core.logger.error(TAG, `error: ${b75.code}, ${b75.message}`);
        }
        this.lifecycleId = -1;
    }
    registerAbilityLifecycleCallbacks() {
        if (this.lifecycleId >= 0) {
            this.unregisterAbilityLifecycleCallbacks();
        }
        try {
            this.lifecycleId = this.currentApplication.on('abilityLifecycle', new BackgroundCallback(this));
        }
        catch (a75) {
            this.core.logger.error(TAG, `error: ${a75.code}, ${a75.message}`);
        }
        this.core.logger.info(TAG, `registerAbilityLifecycleCallback lifecycleId: ${this.lifecycleId}`);
    }
    setListener() {
        this.core.eventBus.on('V2NIMLoginService/loginLifeCycleLoginSucc', () => {
            this.isReconnect = true;
        });
    }
    doConnect(t74) {
        let u74 = false;
        return new Promise((v74, w74) => {
            this.socket = new WebsocketAdapter(this.core, t74);
            this.socket.on('connect', () => {
                this.logger.info(TAG, 'socket on connect', t74);
                u74 = true;
                v74();
            });
            this.socket.on('message', this.onMessage.bind(this));
            this.socket.on('disconnect', async (y74, z74) => {
                u74 = true;
                this.logger.info(TAG, 'socket on disconnect', y74, 'isActive: ' + z74);
                if (z74 === true) {
                    this.doDisconnect(DisconnectType.ACTIVE, 'SocketOnDisconnect');
                }
                else {
                    this.doDisconnect(DisconnectType.OFFLINE, 'SocketOnDisconnect');
                }
            });
            this.socket.on('connectFailed', (x74) => {
                if (u74) {
                    this.ping();
                }
                else {
                    this.logger.error(TAG, `connectFailed: '${x74 && x74.message}'`);
                    this.cleanSocket();
                }
                u74 = true;
                w74(x74);
            });
        });
    }
    cleanSocket() {
        this.logger.warn(TAG, 'cleanSocket', this.socket);
        if (this.socket) {
            this.socket.removeListeners();
            this.socket.close();
        }
    }
    reportSendCmdFailed(q74, r74, s74) {
        this.logger.info(TAG, `reportSendCmdFailed ${JSON.stringify(q74)} ${JSON.stringify(r74)} ${s74}`);
        if (r74.sid === 26 && r74.cid === 5) {
            return;
        }
        this.core.reporterService.addException({
            action: 2,
            code: q74.code,
            description: q74.message,
            operationType: 0,
            timestamp: s74,
            context: JSON.stringify(r74),
            target: this.socket.socketUrl
        });
    }
    packetHandler(h74) {
        if (!h74) {
            return;
        }
        const i74 = h74.raw.ser;
        const j74 = this.sendingCmdMap.get(i74);
        if (j74 && j74.cmd === h74.cmd) {
            const { callback: k74, timer: l74, params: m74 } = j74;
            clearTimeout(l74);
            h74.params = m74;
            this.sendingCmdMap.delete(i74);
            if (h74.cmd === 'heartbeat') {
                k74[0]();
                return;
            }
            const n74 = this.core[h74.service]?.process(h74);
            if (n74 && typeof n74.then === 'function') {
                n74.then((p74) => {
                    k74[0](p74);
                })
                    .catch((o74) => {
                    k74[1](o74);
                });
            }
            else {
                this.logger.info(TAG, 'handlerFn without promise', h74.service, h74.cmd);
                k74[0](h74);
            }
        }
        else {
            this.core[h74.service]?.process(h74);
        }
    }
    markCmdInvalid(b74, c74, d74) {
        const e74 = this.sendingCmdMap.get(b74);
        if (!e74) {
            return;
        }
        const { callback: f74, timer: g74 } = e74;
        g74 && clearTimeout(g74);
        this.sendingCmdMap.delete(b74);
        this.logger.warn(TAG, `packet ${b74}, ${d74} is invalid:`, c74);
        f74[1](c74);
    }
    markAllCmdInvalid(w73) {
        this.logger.info(TAG, 'markAllCmdInvalid', w73);
        this.sendingCmdMap.forEach((x73) => {
            const { callback: y73, timer: z73, cmd: a74 } = x73;
            z73 && clearTimeout(z73);
            y73[1](w73);
        });
        this.sendingCmdMap.clear();
    }
    initOnlineListener() {
        if (this.hasNetworkListener) {
            return;
        }
        this.logger.info(TAG, 'onlineListener:init');
        this.hasNetworkListener = true;
        this.core.loginService.netConnectionReceiver.onNetworkStatusChange(this, (t73) => {
            this.logger.info(TAG, 'onlineListener:network change', JSON.stringify(t73));
            const u73 = this.core.loginService.getConnectStatus();
            const v73 = this.core.loginService.getLoginStatus();
            if (t73.isConnected && v73 === V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED) {
                this.logger.info(TAG, 'network reconnect and logined start 3000ms ping');
                this.ping(3000);
            }
            else if (t73.isConnected && u73 === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_WAITING) {
                this.logger.info(TAG, 'onlineListener:online and connectStatus is waiting, do reLogin');
                this.core.loginService.reconnect.clearReconnectTimer();
                this.core.loginService.reconnect.doReLogin();
            }
            else if (!t73.isConnected) {
                this.logger.warn(TAG, 'network change to disconnect, sdk do disconnect');
                this.doDisconnect(DisconnectType.OFFLINE, 'OfflineListener');
            }
        });
    }
    destroyOnlineListener() {
        this.logger.info(TAG, 'onlineListener:destroy');
        this.core.loginService.netConnectionReceiver.offNetworkStatusChange(this);
        this.hasNetworkListener = false;
    }
}
