import { PromiseManager, V2NIMErrorCode, V2Service } from "@nimsdk/base";
import { get } from "@nimsdk/vendor";
import systemDateTime from "@ohos.systemDateTime";
const defaultTimeOriginConfig = {
    tolerantRTT: 3000,
    bestRTT: 100,
    maxChances: 5,
    enable: true
};
const defaultOrigin = { timestamp: 0, rtt: 0, baseClock: 0, baseTime: 0 };
const TAG = '[NTPTimer]';
const CMD_NAME = 'getServerTime';
export class NTPTimer extends V2Service {
    constructor(w93, x93, y93) {
        super(x93, w93);
        this.serverOrigin = defaultOrigin;
        this.config = defaultTimeOriginConfig;
        this.isSettingNTP = false;
        this.currentChance = 0;
        this.failedDelay = 2000;
        this.successDelay = 5 * 60 * 1000;
        this.timer = 0;
        this.cmdName = 'getServerTime';
        this.core = w93;
        this.logger = w93.logger;
        this.promiseManager = new PromiseManager();
        this.config = defaultTimeOriginConfig;
    }
    async onLoginStart(v93) {
        this.core.logger.info(TAG, 'onLoginStart');
    }
    async onLoginFinished(u93) {
        this.getServerTime();
    }
    onLogout() {
        this.reset();
    }
    reset() {
        this.timer && clearTimeout(this.timer);
        this.promiseManager.clear();
        this.serverOrigin = defaultOrigin;
        this.currentChance = 0;
    }
    async getServerTime() {
        if (!this.config.enable)
            return;
        if (this.isSettingNTP)
            return;
        if (this.currentChance >= this.config.maxChances)
            return;
        this.isSettingNTP = true;
        this.currentChance++;
        this.timer && clearTimeout(this.timer);
        this.timer = 0;
        const o93 = Date.now();
        this.core.logger.debug(TAG, 'getServerTime start, times', this.currentChance);
        let p93;
        try {
            const t93 = (await this.promiseManager.add(this.core.sendCmd(this.cmdName)));
            p93 = get(t93, 'content.time');
            this.isSettingNTP = false;
        }
        catch (r93) {
            const s93 = r93;
            this.isSettingNTP = false;
            this.logger.warn(TAG, 'Calculate Delay time, getServerTime error', s93);
            if (s93.code !== V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED) {
                this.timer = setTimeout(() => {
                    this.getServerTime();
                }, this.failedDelay);
            }
            return;
        }
        if (!p93) {
            this.core.logger.warn(TAG, 'Calculate Delay time incorrect format');
            this.config.enable = false;
            return;
        }
        const q93 = Date.now() - o93;
        this.doSet(p93, q93);
    }
    doSet(m93, n93) {
        if (n93 > this.config.tolerantRTT) {
            this.logger.warn(TAG, 'Denied, cause of exceeding the maximum tolerance range of RTT', n93);
            this.timer = setTimeout(() => {
                this.getServerTime();
            }, this.failedDelay);
        }
        else if (n93 > this.config.bestRTT) {
            if (this.serverOrigin.rtt && n93 >= this.serverOrigin.rtt) {
                this.logger.warn(TAG, 'Denied, cause of current.RTT >= serverOrigin.RTT', n93);
            }
            else {
                this.setServerOrigin(n93, m93);
                this.logger.info(TAG, 'Accept within maximum tolerance range of RTT', n93, this.serverOrigin.timestamp, this.serverOrigin.baseClock, this.serverOrigin.baseTime);
            }
            this.timer = setTimeout(() => {
                this.getServerTime();
            }, this.failedDelay);
        }
        else {
            this.setServerOrigin(n93, m93);
            this.logger.debug(TAG, 'Accept within best RTT', n93, this.serverOrigin.timestamp, this.serverOrigin.baseClock, this.serverOrigin.baseTime);
            this.currentChance = 0;
            this.timer = setTimeout(() => {
                this.getServerTime();
            }, this.successDelay);
        }
    }
    getNTPTime() {
        const j93 = this.getTimeNode();
        if (this.checkNodeReliable(j93)) {
            const k93 = Math.floor(j93.time - this.serverOrigin.baseTime);
            const l93 = this.serverOrigin.timestamp + k93;
            this.core.logger.info(TAG, 'get current ntp time', l93, Date.now());
            return l93;
        }
        else {
            return Date.now();
        }
    }
    checkNodeReliable(g93) {
        if (this.serverOrigin.timestamp) {
            if (this.serverOrigin.baseClock === 0)
                return true;
            const h93 = g93.clock - this.serverOrigin.baseClock;
            const i93 = g93.time - this.serverOrigin.baseTime;
            return Math.abs(i93 - h93) < 500;
        }
        return false;
    }
    getTimeNode() {
        return {
            clock: systemDateTime.getTime(),
            time: Date.now()
        };
    }
    setServerOrigin(e93, f93) {
        this.serverOrigin = {
            timestamp: f93 + Math.floor(e93 / 2),
            rtt: e93,
            baseClock: systemDateTime.getTime(),
            baseTime: Date.now()
        };
    }
}
