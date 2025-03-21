import faultLogger from '@ohos.faultLogger';
import { IMKVManager } from '@nimsdk/base';
const TAG = '[FaultLogger]';
export class FaultLogger {
    constructor(o100) {
        this.core = o100;
        this.kvManager = new IMKVManager(o100.context);
    }
    async loadFaultLogger() {
        try {
            await this.kvManager.getKVStore('global');
            const g100 = await faultLogger.query(faultLogger.FaultType.NO_SPECIFIC);
            const h100 = g100.map(async (j100) => {
                const k100 = j100.timestamp;
                const l100 = await this.kvManager.get(k100.toString());
                if (!l100) {
                    await this.kvManager.put(k100.toString(), true);
                    const m100 = j100.fullLog;
                    let n100 = m100;
                    if (m100.length > 512) {
                        n100 = j100.summary;
                    }
                    this.core.reporterService.addException({
                        action: 6,
                        code: j100.uid,
                        description: n100,
                        operationType: j100.type,
                        context: j100.reason,
                        target: j100.module,
                        timestamp: j100.timestamp
                    });
                }
            });
            try {
                await Promise.all(h100);
            }
            catch (i100) {
                this.core.logger.error(TAG, 'get', i100);
            }
        }
        catch (f100) {
            this.core.logger.error(TAG, 'get', f100);
        }
    }
}
