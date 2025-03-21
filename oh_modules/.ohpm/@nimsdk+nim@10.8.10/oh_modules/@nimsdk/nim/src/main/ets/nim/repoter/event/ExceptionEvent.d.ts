import { ReporterData, ReporterEvent, ReporterEventTag } from '@nimsdk/base';
import { EventProduct } from './EventProduct';
export declare class ExceptionEvent implements EventProduct {
    operation(a99: ReporterEventTag, b99: ReporterData): ReporterEvent;
}
