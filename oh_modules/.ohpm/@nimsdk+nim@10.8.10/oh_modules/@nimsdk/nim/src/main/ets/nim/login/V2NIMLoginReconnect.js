import { Backoff } from '@nimsdk/vendor';
import { DisconnectType, LoginLifeCycleEvent, LoginTraceStep, V2NIMConnectStatus } from '@nimsdk/base/';
const TAG = '[LoginReconnect]';
export default class V2NIMLoginReconnect {
    constructor(w87) {
        this.currenRetryCount = 0;
        this.backoff = new Backoff({ max: 16000, min: 1600, jitter: 0.01 });
        this.reconnectTimer = 0;
        this.core = w87;
        this.loginService = w87.loginService;
    }
    reset() {
        this.currenRetryCount = 0;
        this.backoff.reset();
        this.reconnectTimer && clearTimeout(this.reconnectTimer);
    }
    clearReconnectTimer() {
        this.reconnectTimer && clearTimeout(this.reconnectTimer);
    }
    attempt2ReLogin() {
        let s87 = this.backoff.duration();
        if (typeof this.reconnectDelayProvider === 'function') {
            try {
                const v87 = this.reconnectDelayProvider(s87);
                if (typeof v87 === 'number' && v87 >= 0) {
                    s87 = v87 >= 1000 ? v87 : v87 + 200 + Math.ceil(Math.random() * 300);
                }
            }
            catch (u87) {
                this.core.logger.error(TAG, 'attempt2ReLogin excited failed', u87);
            }
        }
        this.currenRetryCount++;
        this.core.logger.info(TAG, `attempt2ReLogin timer set, delay: ${s87} ms, retry count: ${this.currenRetryCount}`);
        this.clearReconnectTimer();
        this.reconnectTimer = setTimeout(() => {
            this.core.logger.info(TAG, `reconnect timer is now triggered`);
            const t87 = this.loginService.getConnectStatus();
            if (t87 !== V2NIMConnectStatus.V2NIM_CONNECT_STATUS_WAITING) {
                this.core.logger.warn(TAG, `reconnect timer is over because connect status now is ${t87}`);
                return;
            }
            this.doReLogin();
        }, s87);
        return true;
    }
    doReLogin() {
        this.loginService.loginOption.forceMode = false;
        this.core.loginService.loginTrace(LoginTraceStep.autoLoginStart);
        this.loginService.originLoginPromise = this.loginService.doLogin(true, false);
        const o87 = this.loginService.previousLoginManager.add(this.loginService.originLoginPromise);
        o87.then(() => {
            this.core.loginService.loginTrace(LoginTraceStep.autoLoginSucceed, 'auto login succeed');
        }).catch((p87) => {
            const q87 = p87;
            this.core.logger.error(TAG, 'reconnect try login failed code', q87.code, q87.detail);
            this.core.loginService.loginTrace(LoginTraceStep.autoLoginFailed, JSON.stringify(q87));
            const r87 = this.loginService.checkLoginTerminalCode(q87 && q87.code);
            if (r87) {
                this.loginService.doDisconnect(DisconnectType.ACTIVE, `ReloginTerminated`);
                this.loginService.lifeCycle.processEvent(LoginLifeCycleEvent.Exited);
                this.core.onLogout();
                return;
            }
            if (q87 && q87.code === 399) {
                this.loginService.lbs.refresh();
            }
            this.loginService.lifeCycle.processEvent(LoginLifeCycleEvent.Waiting);
        });
        return o87;
    }
    _setReconnectDelayProvider(n87) {
        this.reconnectDelayProvider = n87;
    }
}
