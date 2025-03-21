import { ReporterEvent, ReporterEventTag, ReporterData } from '@nimsdk/base';
import { EventProduct } from './EventProduct';
export declare class LoginEvent implements EventProduct {
    operation(g99: ReporterEventTag, h99: ReporterData): ReporterEvent;
}
