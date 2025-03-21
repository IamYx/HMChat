import { ReporterEvent, ReporterEventTag, ReporterData } from '@nimsdk/base';
import { EventProduct } from './EventProduct';
export declare class DatabaseEvent implements EventProduct {
    operation(w98: ReporterEventTag, x98: ReporterData): ReporterEvent;
}
