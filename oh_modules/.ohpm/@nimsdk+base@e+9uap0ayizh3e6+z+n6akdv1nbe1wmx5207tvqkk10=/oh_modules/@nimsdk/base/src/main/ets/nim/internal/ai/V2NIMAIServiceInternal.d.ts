import { V2NIMAIService, V2NIMAIUser, V2NIMProxyAIModelCallParams } from '../../sdk/V2NIMAIService';
import { V2InternalService } from '../V2NIMInternalService';
export default interface V2NIMAIServiceInternal extends V2NIMAIService, V2InternalService {
    /**
     * Internal API calling use following functions.
     */
    v2IGetAIUserList(): Promise<V2NIMAIUser[]>;
    v2IProxyAIModelCall(params: V2NIMProxyAIModelCallParams): Promise<void>;
}
