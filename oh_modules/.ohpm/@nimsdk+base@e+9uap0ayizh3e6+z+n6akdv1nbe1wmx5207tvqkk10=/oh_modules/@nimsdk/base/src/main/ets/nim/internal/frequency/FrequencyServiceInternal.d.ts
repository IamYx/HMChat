import { V2InternalService } from '../V2NIMInternalService';
export interface FrequencyServiceInternal extends V2InternalService {
    addForbidden(cmd: string, duration: number): any;
    isForbidden(cmd: string): boolean;
}
