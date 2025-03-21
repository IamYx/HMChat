import { ReporterResourceEvent } from '@nimsdk/base';
export class ResourceEvent {
    operation(q99, r99) {
        const s99 = r99;
        const t99 = new ReporterResourceEvent();
        t99.tag = q99;
        t99.action = s99.action;
        t99.state = s99.state;
        t99.start_time = s99.start_time;
        t99.duration = s99.duration;
        t99.priority = 0;
        t99.operation_type = s99.operation_type;
        t99.remote_addr = s99.remote_addr;
        t99.offset = s99.offset;
        t99.full_size = s99.full_size;
        t99.transferred_size = s99.transferred_size;
        t99.lib_env = s99.lib_env;
        return t99;
    }
}
