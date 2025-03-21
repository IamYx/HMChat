import { guid, ReporterSyncEvent } from '@nimsdk/base';
export class SyncEvent {
    operation(u99, v99) {
        const w99 = v99;
        const x99 = new ReporterSyncEvent();
        x99.tag = u99;
        x99.sync_begin_time = w99.sync_begin_time;
        x99.sync_end_time = w99.sync_end_time;
        x99.sync_duration = w99.sync_duration;
        x99.overall_duration = 0;
        x99.description = w99.description;
        x99.action = w99.action;
        x99.trace_id = guid();
        return x99;
    }
}
