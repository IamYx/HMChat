import { guid, ReporterEvent, ReportEventExtension } from '@nimsdk/base';
export class ExceptionEvent {
    operation(a99, b99) {
        const c99 = new ReporterEvent();
        const d99 = b99;
        c99.tag = a99;
        c99.action = d99.action;
        c99.start_time = d99.timestamp || new Date().getTime();
        c99.priority = 0;
        c99.trace_id = guid();
        c99.state = 1;
        c99.extension = [new ReportEventExtension(d99.operationType, d99.target, d99.code, d99.description, d99.context)];
        return c99;
    }
}
