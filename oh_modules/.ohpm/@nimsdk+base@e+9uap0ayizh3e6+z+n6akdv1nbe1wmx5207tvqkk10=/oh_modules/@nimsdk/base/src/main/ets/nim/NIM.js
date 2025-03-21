import { assign, EventEmitter, set } from '@nimsdk/vendor';
import { NIMServiceNames } from './sdk/types';
import { V2NIMConnectStatus, V2NIMLoginStatus } from './sdk/V2NIMLoginService';
import { IM_ELITE_SDK_VERSION, IM_SDK_VERSION } from './global';
import V2NIMConversationIdUtilImpl from './internal/conversation/V2NIMConversationIdUtilImpl';
import TimerManager from './utils/timer';
import Logger from './utils/logger';
import { validate } from './utils/validate';
import { V2NIMErrorCode, V2NIMErrorImpl } from './utils/error';
import { emptyFuncWithPromise } from './utils';
import { IMKVManager } from './utils/KVManager';
import { NIMPreference } from './utils/NIMPreference';
import { NIMPreferenceSync } from './utils/NIMPreferenceSync';
import HashMap from "@ohos.util.HashMap";
import { BizServicesName, InnerServicesName } from './internal/V2NIMInternalService';
const LoggerMap = new Map();
const serviceMap = new Map();
const enabledServiceNameSet = new Set(NIMServiceNames);
const CurrentLoggerMap = new HashMap();
const defaultOptions = {
    debugLevel: 'off',
    xhrConnectTimeout: 30000,
    socketConnectTimeout: 30000
};
const TAG = '[NIM]';
export class NIM {
    constructor(u11, v11, w11 = {}) {
        this.eventBus = new EventEmitter();
        this.options = {};
        this.context = u11;
        this._id = NIM.idCounter++;
        this.createLoggerService(v11.logLevel, v11.isOpenConsoleLog);
        this.logger.info(TAG, '******************* sdk init start *******************');
        this.setInitOptions(v11);
        this.serviceOptions = assign({}, w11);
        this.timerManager = new TimerManager();
        this.createAbtServiceByName();
        this.createReporterServiceByName();
        const x11 = 'NIM_' + this.options.appkey;
        this.preference = new NIMPreference(u11, x11);
        this.preferenceSync = new NIMPreferenceSync(u11, x11);
        this.kvManager = new IMKVManager(this.context);
        this.createDBServiceByName('databaseService');
        this.conversationIdUtil = new V2NIMConversationIdUtilImpl(this);
        const y11 = {
            enableMessage: NIM.isServiceEnabled('messageService'),
            enableMain: true,
            enableTeam: true,
            enableV1Conversation: true,
            enableV2Conversation: false
        };
        set(this.serviceOptions, 'syncServiceConfig', y11);
        Array.from(serviceMap)
            .filter(([d12, e12]) => NIM.isServiceEnabled(d12))
            .filter(([b12, c12]) => b12 !== 'databaseService')
            .forEach(([z11, a12]) => {
            this.createServiceByName(z11);
        });
        this.logger.info(TAG, 'init sdkVersion', IM_SDK_VERSION);
        this.logger.info(TAG, 'init server_api', IM_ELITE_SDK_VERSION);
        this.logger.info(TAG, 'start appkey', v11.appkey);
        this.logger.info(TAG, 'init options', v11);
        this.logger.info(TAG, 'service options', w11);
        this.logger.info(TAG, '******************* sdk init finished *******************');
    }
    get id() {
        return this._id;
    }
    get account() {
        return this.loginService.getLoginUser();
    }
    static isRegisteredService(t11) {
        return serviceMap.get(t11);
    }
    static registerService(r11, s11) {
        serviceMap.set(r11, s11);
    }
    static unregisterService(q11) {
        serviceMap.delete(q11);
    }
    static registerLogger(o11, p11) {
        LoggerMap.set(o11, p11);
    }
    static unRegisterLogger(n11) {
        LoggerMap.delete(n11);
    }
    static enableService(m11) {
        enabledServiceNameSet.add(m11);
    }
    static disableService(l11) {
        enabledServiceNameSet.delete(l11);
    }
    static disableAllServices() {
        enabledServiceNameSet.clear();
    }
    static isServiceEnabled(k11) {
        return enabledServiceNameSet.has(k11);
    }
    static getLogger() {
        const j11 = CurrentLoggerMap.get('current_logger');
        return j11;
    }
    getWorkerId() {
        return `NIM-${this.id}`;
    }
    updateOptions(i11) {
        if (typeof i11 !== 'object' || i11 === null) {
            return;
        }
        if (Object.getOwnPropertyNames(i11).includes('appkey') && i11.appkey !== this.options.appkey) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
                detail: {
                    reason: 'NIM::updateOptions account and appkey is not allowed to reset'
                }
            });
        }
        validate({
            appkey: { type: 'string', required: false },
            debugLevel: { type: 'string', required: false },
            xhrConnectTimeout: { type: 'number', required: false },
            socketConnectTimeout: { type: 'number', required: false }
        }, i11);
        this.logger.info(TAG, 'NIM::updateOptions options is', i11);
        this.options = {
            ...this.options,
            ...i11
        };
    }
    async destroy() {
        await this._disconnect();
        this.eventBus.removeAllListeners();
        this.timerManager.destroy();
        this._removeAllModuleListeners();
        this._disconnect = emptyFuncWithPromise;
        this.destroy = emptyFuncWithPromise;
    }
    sendCmd(f11, g11, h11) {
        return this.loginService.sendCmd(f11, g11, h11);
    }
    async onLoginStart(w10) {
        const x10 = Object.values(this);
        let y10;
        const z10 = [];
        const a11 = [];
        for (const e11 of x10) {
            if (e11 && typeof e11.onLoginStart === 'function') {
                if (BizServicesName.includes(e11.name)) {
                    z10.push(e11);
                }
                else if (InnerServicesName.includes(e11.name)) {
                    a11.push(e11);
                }
                else if (e11.name === 'syncService') {
                    y10 = e11;
                }
            }
        }
        const b11 = Date.now();
        await Promise.all(a11.map(async (d11) => await d11.onLoginStart(w10)));
        await Promise.all(z10.map(async (c11) => await c11.onLoginStart(w10)));
        await y10.onLoginStart(w10);
        this.logger.info(TAG, ' onLoginStart done duration:', Date.now() - b11);
    }
    async onLoginFinished(n10) {
        const o10 = Object.values(this);
        let p10;
        const q10 = [];
        const r10 = [];
        for (const v10 of o10) {
            if (v10 && typeof v10.onLoginFinished === 'function') {
                if (BizServicesName.includes(v10.name)) {
                    q10.push(v10);
                }
                else if (InnerServicesName.includes(v10.name)) {
                    r10.push(v10);
                }
                else if (v10.name === 'syncService') {
                    p10 = v10;
                }
            }
        }
        await Promise.all(r10.map(async (u10) => await u10.onLoginFinished(n10)));
        await Promise.all(q10.map(async (t10) => await t10.onLoginFinished(n10)));
        const s10 = Date.now();
        await p10.onLoginFinished(n10);
        this.logger.info(TAG, p10.name + ' onLoginFinished duration:', Date.now() - s10);
        this.logger.info(TAG, 'onLoginFinished done.');
    }
    async onLoginSync(j10) {
        const k10 = Object.values(this);
        let l10;
        k10.forEach((m10) => {
            if (m10 && typeof m10.onLoginFinished === 'function') {
                if (m10.name === 'syncService') {
                    l10 = m10;
                }
            }
        });
        await l10.onLoginFinished(j10);
        this.logger.info(TAG, 'onLoginSync done.');
    }
    async onLogout() {
        const g10 = Object.values(this);
        for (const h10 of g10) {
            if (h10 && typeof h10.onLogout === 'function') {
                try {
                    await h10.onLogout();
                }
                catch (i10) {
                    this.logger.error(TAG, 'onLogout failed', h10);
                }
            }
        }
        this.logger.info(TAG, 'onLogout done.');
        return;
    }
    _disconnect() {
        if (this.loginService?.lifeCycle?.getConnectStatus() === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED
            && this.loginService?.lifeCycle?.getLoginStatus() === V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGOUT) {
            return Promise.resolve();
        }
        else {
            return this.loginService.logout();
        }
    }
    async _clearModuleData() {
        await this.onLogout();
    }
    _removeAllModuleListeners() {
        const e10 = Object.values(this);
        e10.forEach((f10) => {
            if (f10 && typeof f10.removeAllListeners === 'function') {
                f10.removeAllListeners();
            }
        });
    }
    createServiceByName(a10) {
        const b10 = serviceMap.get(a10);
        if (b10) {
            const c10 = `${a10}Config`;
            let d10 = this.serviceOptions[c10] || {};
            set(this, a10, b10(this, a10, d10));
        }
    }
    createDBServiceByName(w9) {
        const x9 = serviceMap.get(w9);
        if (x9) {
            const y9 = `${w9}Config`;
            let z9 = this.serviceOptions[y9] || {};
            this.logger.info(TAG, 'createDBServiceByName', z9);
            set(this, w9, x9(this, w9, z9));
        }
    }
    createLoggerService(s9, t9) {
        const u9 = 'loggerService';
        const v9 = LoggerMap.get(u9);
        if (v9) {
            set(this, u9, v9(this, s9, t9));
        }
        this.logger = new Logger(this);
        CurrentLoggerMap.clear();
        CurrentLoggerMap.set('current_logger', this.logger);
    }
    createAbtServiceByName() {
        const o9 = 'abtService';
        const p9 = serviceMap.get(o9);
        if (p9) {
            const q9 = `${o9}Config`;
            let r9 = this.serviceOptions[q9] || {};
            set(this, o9, p9(this, o9, r9));
        }
    }
    createReporterServiceByName() {
        const k9 = 'reporterService';
        const l9 = serviceMap.get(k9);
        if (l9) {
            const m9 = `${k9}Config`;
            let n9 = this.serviceOptions[m9] || {};
            set(this, k9, l9(this, k9, n9));
        }
    }
    setInitOptions(j9) {
        validate({
            appkey: { type: 'string' },
            debugLevel: { type: 'string', required: false },
            xhrConnectTimeout: { type: 'number', required: false },
            socketConnectTimeout: { type: 'number', required: false }
        }, j9);
        this.options = {
            ...defaultOptions,
            ...j9
        };
    }
}
NIM.idCounter = 0;
