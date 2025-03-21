export default class TimerManager {
    constructor() {
        this.timerList = [];
        this.id = 0;
        this.timer = null;
        this.timeout = 0;
    }
    addTimer(o26, p26 = 0, q26 = 1) {
        const r26 = new Date().getTime();
        const s26 = this.id;
        this.timerList.push({
            id: s26,
            loop: q26,
            count: 0,
            timeout: r26 + p26,
            interval: p26,
            callback: o26
        });
        this.id++;
        this.checkTimer(r26);
        return s26;
    }
    checkTimer(l26 = new Date().getTime()) {
        this.removeFinished();
        if (this.timerList.length === 0 && this.timer != null) {
            return;
        }
        let m26 = 0;
        for (const n26 of this.timerList) {
            if (m26 === 0 || m26 > n26.timeout) {
                m26 = n26.timeout;
            }
        }
        if (this.timerList.length === 0) {
            return;
        }
        if (this.timer === null || m26 < this.timeout || this.timeout < l26) {
            this.timer = setTimeout(this.nowTime.bind(this), m26 - l26);
            this.timeout = m26;
        }
    }
    nowTime() {
        const j26 = new Date().getTime();
        for (const k26 of this.timerList) {
            if (j26 >= k26.timeout) {
                k26.callback();
                k26.count++;
                k26.timeout = j26 + k26.interval;
            }
        }
        this.clearTime();
        this.checkTimer(j26);
    }
    clearTime() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    deleteTimer(g26) {
        for (let h26 = this.timerList.length - 1; h26 >= 0; h26--) {
            const i26 = this.timerList[h26];
            if (i26.id === g26) {
                this.timerList.splice(h26, 1);
            }
        }
    }
    removeFinished() {
        for (let e26 = this.timerList.length - 1; e26 >= 0; e26--) {
            const f26 = this.timerList[e26];
            if (f26.loop >= 0 && f26.count >= f26.loop) {
                this.timerList.splice(e26, 1);
            }
        }
    }
    destroy() {
        this.clearTime();
        this.timerList = [];
        this.id = 0;
        this.timer = null;
    }
}
