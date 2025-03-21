import { ReporterData, ReporterEvent, ReporterEventTag } from '@nimsdk/base';
import { EventProduct } from './EventProduct';
export declare class ResourceEvent implements EventProduct {
    operation(q99: ReporterEventTag, r99: ReporterData): ReporterEvent;
}
