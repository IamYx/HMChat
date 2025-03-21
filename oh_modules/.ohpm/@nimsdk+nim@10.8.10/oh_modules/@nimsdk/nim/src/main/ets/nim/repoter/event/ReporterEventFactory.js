import { APITraceEvent } from './APITraceEvent';
import { DatabaseEvent } from './DatabaseEvent';
import { ExceptionEvent } from './ExceptionEvent';
import { LoginEvent } from './LoginEvent';
import { ResourceEvent } from './ResourceEvent';
import { SyncEvent } from './SyncEvent';
export class ReporterEventFactory {
    static createEvent(o99, p99) {
        if (o99 === "exceptions") {
            return new ExceptionEvent().operation(o99, p99);
        }
        else if (o99 === "nim_api_trace") {
            return new APITraceEvent().operation(o99, p99);
        }
        else if (o99 === "nim_sdk_database_trace") {
            return new DatabaseEvent().operation(o99, p99);
        }
        else if (o99 === "login") {
            return new LoginEvent().operation(o99, p99);
        }
        else if (o99 === "nim_sdk_resources") {
            return new ResourceEvent().operation(o99, p99);
        }
        else if (o99 === "nim_sdk_sync") {
            return new SyncEvent().operation(o99, p99);
        }
        else {
            throw new Error('Invalid product type');
        }
    }
}
