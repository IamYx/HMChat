import { DisconnectType, V2NIMConnectStatus, V2NIMErrorCode } from '@nimsdk/base';
import { CRLoginLifeCycleEvent } from './CRLoginLifeCycle';
const TAG = '[CRLoginReconnect]';
export default class CRLoginReconnect {
    constructor(d10) {
        this.retryCount = 0;
        this.reconnectTimer = 0;
        this.backoffIntervals = [1000, 2000, 3000];
        this.reconnectInterval = 0;
        this.core = d10;
        this.loginService = d10.loginService;
    }
    reset() {
        this.retryCount = 0;
        this.reconnectTimer && clearTimeout(this.reconnectTimer);
    }
    clearReconnectTimer() {
        this.reconnectTimer && clearTimeout(this.reconnectTimer);
    }
    attemptToReLogin() {
        const b10 = this.backoffIntervals[this.reconnectInterval];
        this.reconnectInterval = (this.reconnectInterval + 1) % this.backoffIntervals.length;
        this.retryCount++;
        this.core.logger.info(TAG + `attemptToReLogin: ${b10} ms, retry: ${this.retryCount}`);
        this.clearReconnectTimer();
        this.reconnectTimer = setTimeout(() => {
            this.core.logger.info(TAG + 'attemptToReLogin: reconnect timer is now triggered');
            const c10 = this.loginService.getConnectStatus();
            if (c10 !== V2NIMConnectStatus.V2NIM_CONNECT_STATUS_WAITING) {
                this.core.logger.warn(TAG + `attemptToReLogin: timerout : ${c10}`);
                return;
            }
            this.doReLogin();
        }, b10);
        return true;
    }
    async doReLogin() {
        this.loginService.loginParams.connectParams.forceMode = false;
        try {
            await this.loginService.loginParams.updateDynamicParameters(false);
        }
        catch (a10) {
            return this.loginService.lifeCycle.processEvent(CRLoginLifeCycleEvent.Waiting);
        }
        try {
            this.loginService.loginPromise.originLoginPromise = this.loginService.doLogin(true);
            await this.loginService.loginPromise.originLoginAdd();
            this.reconnectInterval = 0;
        }
        catch (w9) {
            const x9 = w9;
            this.core.logger.warn(TAG, 'doReLogin: failed:', x9);
            const y9 = this.loginService.loginParams.checkLoginTerminalCode(x9 && x9.code);
            if (y9) {
                this.loginService.clientSocket.doDisconnect(DisconnectType.ACTIVE, `ReloginTerminated}`);
                this.loginService.lifeCycle.processEvent(CRLoginLifeCycleEvent.Exited, x9);
                return;
            }
            if (x9 && x9.code === V2NIMErrorCode.V2NIM_ERROR_CODE_SERVER_UNIT_ERROR) {
                try {
                    await this.loginService.loginParams.updateLinkAddress();
                    this.loginService.lifeCycle.processEvent(CRLoginLifeCycleEvent.Waiting);
                }
                catch (z9) {
                    this.loginService.lifeCycle.processEvent(CRLoginLifeCycleEvent.ReconnectFail, z9);
                }
            }
            else {
                this.loginService.lifeCycle.processEvent(CRLoginLifeCycleEvent.Waiting);
            }
        }
    }
}
