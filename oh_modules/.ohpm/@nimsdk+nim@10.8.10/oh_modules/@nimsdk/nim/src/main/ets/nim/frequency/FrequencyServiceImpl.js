import HashMap from "@ohos.util.HashMap";
import { V2Service } from '@nimsdk/base';
class ServerFrequency {
    constructor(l55, m55) {
        this.timestamp = l55;
        this.durationMs = m55;
    }
    isInForbiddenPeriod(k55) {
        return k55 - this.timestamp <= this.durationMs;
    }
}
const TAG = '[FrequencyServiceImpl]';
export class FrequencyServiceImpl extends V2Service {
    constructor(h55, i55, j55) {
        super(i55, h55);
        this.frequencyMap = new HashMap();
    }
    async onLoginStart(g55) {
    }
    async onLoginFinished(f55) {
    }
    onLogout() {
        this.frequencyMap.clear();
    }
    addForbidden(b55, c55) {
        if (!this.isValidCommand(b55) || !this.isValidDuration(c55)) {
            this.core.logger.warn(TAG, `Invalid parameters - cmd:${b55}, duration:${c55}`);
            return;
        }
        const d55 = c55 * 1000;
        const e55 = Date.now();
        this.frequencyMap.set(b55, new ServerFrequency(e55, d55));
        this.core.logger.warn(TAG, `Command forbidden - cmd:${b55}, duration:${c55}s, effectiveUntil:${new Date(e55 + d55)}`);
    }
    isForbidden(y54) {
        if (!this.isValidCommand(y54)) {
            return false;
        }
        const z54 = this.frequencyMap.get(y54);
        if (!z54) {
            return false;
        }
        const a55 = z54.isInForbiddenPeriod(Date.now());
        if (a55) {
            this.core.logger.warn(TAG, `Command forbidden blocked - cmd:${y54}`);
        }
        return a55;
    }
    isValidCommand(x54) {
        return typeof x54 === 'string' && x54.trim().length > 0 && x54 !== 'heartbeat';
    }
    isValidDuration(w54) {
        return typeof w54 === 'number' && w54 > 0;
    }
}
