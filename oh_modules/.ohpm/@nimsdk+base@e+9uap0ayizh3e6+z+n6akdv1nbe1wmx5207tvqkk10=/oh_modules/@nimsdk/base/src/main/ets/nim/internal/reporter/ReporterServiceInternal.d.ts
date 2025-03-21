import { V2InternalService } from '../V2NIMInternalService';
import { ExceptionData, ReporterAPIEvent, ReporterEvent } from './ReporterService';
export interface ReporterServiceInternal extends V2InternalService {
    addBizEvent(event: ReporterEvent): void;
    addAPIEvent(event: ReporterAPIEvent): void;
    addAspect(targetClass: Object, methodName: string): void;
    addDatabaseAspect(targetClass: Object, methodName: string): void;
    addException(exception: ExceptionData): any;
}
