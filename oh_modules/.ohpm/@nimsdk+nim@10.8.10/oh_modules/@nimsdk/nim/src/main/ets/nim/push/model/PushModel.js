import { parseInt } from '@nimsdk/vendor';
import { PushTable } from './PushTable';
const TAG = "[PushModel]";
export class PushModel {
    constructor(b96, c96) {
        this.core = b96;
        this.pushTable = new PushTable(c96);
    }
    async getPushValue(y95) {
        try {
            const a96 = await this.pushTable.queryByPushKey(y95);
            this.core.logger.info(TAG, `getPushValue result <${y95}, ${a96}>`);
            if (a96) {
                return a96;
            }
            else {
                return undefined;
            }
        }
        catch (z95) {
            this.core.logger.error(TAG, 'getPushValue', y95, z95);
            return undefined;
        }
    }
    async upsertPushValue(u95, v95) {
        try {
            const x95 = await this.pushTable.upsertByPushKey(u95, v95);
            this.core.logger.info(TAG, `upsertPushValue result ${x95}: <${u95}, ${v95}>`);
            return;
        }
        catch (w95) {
            this.core.logger.error(TAG, 'upsertPushValue', w95, u95, v95);
            return;
        }
    }
    async getPushEnable() {
        const t95 = await this.getPushValue("pushEnable");
        this.core.logger.info(TAG, `getPushEnable: ${t95}`);
        switch (t95) {
            case EPushEnable.ENABLE: return true;
            case EPushEnable.DISABLE: return false;
            default: return true;
        }
    }
    async updatePushEnable(r95) {
        const s95 = r95 ? EPushEnable.ENABLE : EPushEnable.DISABLE;
        this.core.logger.info(TAG, `updatePushEnable: ${s95}`);
        await this.upsertPushValue("pushEnable", s95);
    }
    async getPushTokenExpireTime() {
        const p95 = await this.getPushValue("pushTokenExpireTime");
        const q95 = parseInt(p95);
        this.core.logger.info(TAG, `getPushTokenExpireTime: ${q95}`);
        return isNaN(q95) ? 0 : q95;
    }
    async updatePushTokenExpireTime(n95) {
        const o95 = n95.toString();
        this.core.logger.info(TAG, `updatePushTokenExpireTime: ${o95}`);
        await this.upsertPushValue("pushTokenExpireTime", o95);
    }
    async getPushToken() {
        const m95 = await this.getPushValue("pushToken") ?? "";
        this.core.logger.info(TAG, `getPushToken: ${m95}`);
        return m95;
    }
    async updatePushToken(l95) {
        await this.upsertPushValue("pushToken", l95);
        this.core.logger.info(TAG, `updatePushToken: ${l95}`);
    }
}
const EPushEnable = {
    ENABLE: "enable",
    DISABLE: "disable"
};
