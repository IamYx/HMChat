import KVStore from '@ohos.data.distributedKVStore';
const TAG = 'SettingModel';
export class SettingModel {
    constructor(u108) {
        this.core = u108;
    }
    async saveDndConfig(r108) {
        const s108 = await this.core.kvManager.getKVStore(this.core.account);
        const t108 = [];
        if (typeof r108.showDetail !== 'undefined') {
            t108.push(this.generateEntry("dndConfig_showDetail", r108.showDetail, KVStore.ValueType.BOOLEAN));
        }
        if (typeof r108.dndOn !== 'undefined') {
            t108.push(this.generateEntry("dndConfig_dndOn", r108.dndOn, KVStore.ValueType.BOOLEAN));
        }
        if (typeof r108.fromH !== 'undefined') {
            t108.push(this.generateEntry("dndConfig_fromH", r108.fromH, KVStore.ValueType.INTEGER));
        }
        if (typeof r108.fromM !== 'undefined') {
            t108.push(this.generateEntry("dndConfig_fromM", r108.fromM, KVStore.ValueType.INTEGER));
        }
        if (typeof r108.toH !== 'undefined') {
            t108.push(this.generateEntry("dndConfig_toH", r108.toH, KVStore.ValueType.INTEGER));
        }
        if (typeof r108.toM !== 'undefined') {
            t108.push(this.generateEntry("dndConfig_toM", r108.toM, KVStore.ValueType.INTEGER));
        }
        await s108.putBatch(t108);
        return;
    }
    async queryDndConfig() {
        const p108 = await this.core.kvManager.getKVStore(this.core.account);
        const q108 = {};
        q108.showDetail = await this.getNullableValue(p108, "dndConfig_showDetail") ?? false;
        q108.dndOn = await this.getNullableValue(p108, "dndConfig_dndOn") ?? false;
        q108.fromH = await this.getNullableValue(p108, "dndConfig_fromH") ?? 0;
        q108.fromM = await this.getNullableValue(p108, "dndConfig_fromM") ?? 0;
        q108.toH = await this.getNullableValue(p108, "dndConfig_toH") ?? 0;
        q108.toM = await this.getNullableValue(p108, "dndConfig_toM") ?? 0;
        this.core.logger.info(TAG, 'queryDndConfig success, config', q108);
        return q108;
    }
    generateEntry(l108, m108, n108) {
        const o108 = {
            key: l108,
            value: {
                type: n108,
                value: m108
            }
        };
        return o108;
    }
    async getNullableValue(i108, j108) {
        try {
            return await i108.get(j108);
        }
        catch (k108) {
            this.core.logger.error(TAG, `kv store read key '${j108}' throw error: ${JSON.stringify(k108)}`);
            return undefined;
        }
    }
}
