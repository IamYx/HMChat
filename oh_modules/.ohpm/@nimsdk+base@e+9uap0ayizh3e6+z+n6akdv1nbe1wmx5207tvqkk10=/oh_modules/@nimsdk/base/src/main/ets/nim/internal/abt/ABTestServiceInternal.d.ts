import { V2InternalService } from '../V2NIMInternalService';
import { ABTExperiment } from './ABTestService';
export interface ABTestServiceInternal extends V2InternalService {
    getExperimentForKey(key: string): ABTExperiment | undefined;
}
