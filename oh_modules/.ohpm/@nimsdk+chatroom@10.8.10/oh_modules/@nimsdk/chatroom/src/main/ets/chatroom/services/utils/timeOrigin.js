import { PromiseManager, V2NIMErrorCode, V2NIMLoginStatus } from '@nimsdk/base';
import { get } from '@nimsdk/vendor/Index';
const defaultTimeOriginConfig = {
    tolerantRTT: 3000,
    bestRTT: 100,
    maxChances: 5,
    enable: true
};
const defaultOrigin = { timestamp: 0, rtt: 0, baseClock: 0, baseTime: 0 };
export default class TimeOrigin {
    constructor(q46, r46, s46 = 'getServerTime') {
        this.serverOrigin = defaultOrigin;
        this.config = defaultTimeOriginConfig;
        this.isSettingNTP = false;
        this.currentChance = 0;
        this.failedDelay = 2000;
        this.successDelay = 5 * 60 * 1000;
        this.timer = 0;
        this.cmdName = 'getServerTime';
        this.core = q46;
        this.logger = q46.logger;
        this.promiseManager = new PromiseManager();
        this.cmdName = s46;
        r46 && this.setOptions(r46);
    }
    setOptions(p46) {
        this.config = Object.assign({}, defaultTimeOriginConfig, this.config, p46);
    }
    reset() {
        this.timer && clearTimeout(this.timer);
        this.promiseManager.clear();
        this.serverOrigin = defaultOrigin;
        this.currentChance = 0;
    }
    async setOriginTimetick() {
        if (!this.config.enable)
            return;
        if (this.isSettingNTP)
            return;
        if (this.currentChance >= this.config.maxChances)
            return;
        const h46 = this.core.loginService.lifeCycle.getLoginStatus();
        if (h46 !== V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED)
            return;
        this.isSettingNTP = true;
        this.currentChance++;
        this.timer && clearTimeout(this.timer);
        this.timer = 0;
        const i46 = 'TimeOrigin::setOriginTimetick:';
        const j46 = Date.now();
        this.core.logger.info(`${i46} getServerTime start, times ${this.currentChance}`);
        let k46;
        try {
            const o46 = (await this.promiseManager.add(this.core.sendCmd(this.cmdName)));
            k46 = get(o46, 'content.time');
            this.isSettingNTP = false;
        }
        catch (m46) {
            const n46 = m46;
            this.isSettingNTP = false;
            this.logger.warn('NTP', `${i46} Calculate Delay time, getServerTime error`, n46);
            if (n46.code !== V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED) {
                this.timer = setTimeout(this.setOriginTimetick.bind(this), this.failedDelay);
            }
            return;
        }
        if (!k46) {
            this.core.logger.warn(`${i46} Calculate Delay time incorrect format`);
            this.config.enable = false;
            return;
        }
        const l46 = Date.now() - j46;
        this.doSet(k46, l46);
    }
    doSet(e46, f46) {
        const g46 = 'TimeOrigin::setOriginTimetick:';
        if (f46 > this.config.tolerantRTT) {
            this.logger.warn(`${g46} Denied, cause of exceeding the maximum tolerance range of RTT: ${f46}`);
            this.timer = setTimeout(this.setOriginTimetick.bind(this), this.failedDelay);
        }
        else if (f46 > this.config.bestRTT) {
            if (this.serverOrigin.rtt && f46 >= this.serverOrigin.rtt) {
                this.logger.info(`${g46} Denied, cause of current.RTT >= serverOrigin.RTT: ${f46}`);
            }
            else {
                this.setServerOrigin(f46, e46);
                this.logger.info(`${g46} Accept within maximum tolerance range of RTT: ${f46}, ntpTimestamp: ${this.serverOrigin.timestamp}, localClock: ${this.serverOrigin.baseClock}, localTime: ${this.serverOrigin.baseTime}`);
            }
            this.timer = setTimeout(this.setOriginTimetick.bind(this), this.failedDelay);
        }
        else {
            this.setServerOrigin(f46, e46);
            this.logger.info(`${g46} Accept within best RTT: ${f46}, ntpTimestamp: ${this.serverOrigin.timestamp}, localClock: ${this.serverOrigin.baseClock}, localTime: ${this.serverOrigin.baseTime}`);
            this.currentChance = 0;
            this.timer = setTimeout(this.setOriginTimetick.bind(this), this.successDelay);
        }
    }
    getNTPTime(c46) {
        if (typeof c46 === 'undefined') {
            c46 = this.getTimeNode();
        }
        if (this.checkNodeReliable(c46)) {
            const d46 = Math.floor(c46.time - this.serverOrigin.baseTime);
            return this.serverOrigin.timestamp + d46;
        }
        else {
            return Date.now();
        }
    }
    checkNodeReliable(z45) {
        if (this.serverOrigin.timestamp) {
            if (this.serverOrigin.baseClock === 0)
                return true;
            const a46 = z45.clock - this.serverOrigin.baseClock;
            const b46 = z45.time - this.serverOrigin.baseTime;
            return Math.abs(b46 - a46) < 500;
        }
        return false;
    }
    checkPerformance() {
        return false;
    }
    static checkPerformance() {
        return false;
    }
    getTimeNode() {
        return {
            clock: 0,
            time: Date.now()
        };
    }
    static getTimeNode() {
        return {
            clock: 0,
            time: Date.now()
        };
    }
    setServerOrigin(x45, y45) {
        this.serverOrigin = {
            timestamp: y45 + Math.floor(x45 / 2),
            rtt: x45,
            baseClock: 0,
            baseTime: Date.now()
        };
    }
}
