import { ReporterEvent } from '@nimsdk/base';
export class LoginEvent {
    operation(g99, h99) {
        const i99 = h99;
        const j99 = new ReporterEvent();
        j99.tag = g99;
        j99.action = i99.action;
        j99.state = i99.code === 200 ? 0 : 1;
        j99.start_time = i99.start_time;
        j99.user_id = i99.user_id;
        j99.duration = i99.duration;
        j99.priority = 0;
        j99.succeed = i99.succeed;
        j99.extension = [];
        return j99;
    }
}
