import { ReporterData, ReporterEvent, ReporterEventTag } from '@nimsdk/base';
import { EventProduct } from './EventProduct';
export declare class SyncEvent implements EventProduct {
    operation(u99: ReporterEventTag, v99: ReporterData): ReporterEvent;
}
