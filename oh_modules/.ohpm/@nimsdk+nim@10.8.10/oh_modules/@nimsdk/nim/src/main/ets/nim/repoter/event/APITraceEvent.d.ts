import { ReporterData, ReporterEvent, ReporterEventTag } from '@nimsdk/base';
import { EventProduct } from './EventProduct';
export declare class APITraceEvent implements EventProduct {
    operation(s98: ReporterEventTag, t98: ReporterData): ReporterEvent;
}
