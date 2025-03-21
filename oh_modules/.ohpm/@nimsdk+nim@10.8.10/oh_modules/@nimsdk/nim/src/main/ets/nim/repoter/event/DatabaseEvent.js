import { ReporterAPIEvent } from '@nimsdk/base';
export class DatabaseEvent {
    operation(w98, x98) {
        const y98 = x98;
        const z98 = new ReporterAPIEvent();
        z98.db = y98.db;
        z98.api_name = y98.api_name;
        z98.class_name = y98.class_name;
        z98.error_msg = y98.error_msg;
        z98.error_code = y98.error_code;
        z98.duration = y98.duration;
        z98.lag = y98.lag;
        z98.tag = w98;
        z98.action = y98.action;
        z98.state = y98.state;
        return z98;
    }
}
