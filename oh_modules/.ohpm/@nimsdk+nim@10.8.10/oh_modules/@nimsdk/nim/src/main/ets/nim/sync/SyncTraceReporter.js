import { NetWorkingInStance } from "@nimsdk/base";
import { ReporterEventFactory } from "../repoter/event/ReporterEventFactory";
export class SyncTraceReporter {
    constructor(h144) {
        this.core = h144;
        this.startTime = Date.now();
    }
    addSyncTrace(c144, d144) {
        const e144 = {
            user_id: this.core.account,
            start_time: this.startTime,
            action: c144 ? 1 : 0,
            sync_begin_time: this.startTime,
            sync_duration: Date.now() - this.startTime,
            sync_end_time: Date.now(),
            description: d144,
        };
        const f144 = ReporterEventFactory.createEvent("nim_sdk_sync", e144);
        const g144 = NetWorkingInStance.getInstance().getNetInfoSync();
        f144.net_connect = g144.isConnected;
        f144.net_type = g144.netType;
        this.core.logger.info('[SyncTrace]', 'addSyncTrace', f144);
        this.core.reporterService.addBizEvent(f144);
    }
}
