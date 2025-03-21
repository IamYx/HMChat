import { guid, ReporterAPIEvent } from '@nimsdk/base';
export class APITraceEvent {
    operation(s98, t98) {
        const u98 = t98;
        const v98 = new ReporterAPIEvent();
        v98.api_name = u98.api_name;
        v98.class_name = u98.class_name;
        v98.error_msg = u98.error_msg;
        v98.error_code = u98.error_code;
        v98.duration = u98.duration;
        v98.lag = u98.lag;
        v98.tag = s98;
        v98.action = u98.action;
        v98.state = u98.state;
        v98.trace_id = guid();
        return v98;
    }
}
