import { V2NIMMessageSearchExParams, V2NIMMessageSearchResult } from '../../sdk/V2NIMMessageService';
import { V2NIMSearchService } from '../../sdk/V2NIMSearchService';
import { V2InternalService } from '../V2NIMInternalService';
export default interface V2NIMSearchServiceInternal extends V2NIMSearchService, V2InternalService {
    /**
     * For judge if fts is open
     * @returns
     */
    v2IIsEnable(): boolean;
    /**
     * Search by params
     * @param params V2NIMMessageSearchExParams
     * @returns V2NIMMessageSearchResult
     */
    v2ISearch(params: V2NIMMessageSearchExParams): Promise<V2NIMMessageSearchResult>;
}
