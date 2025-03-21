import { V2InternalService } from '../V2NIMInternalService';
import { V2NIMPushService } from '../../sdk/V2NIMPushService';
export default interface V2NIMPushServiceInternal extends V2NIMPushService, V2InternalService {
}
export declare class MixPushState {
    /**
     * has pushed during last offline, server told us when login
     * used to control offline stuff
     */
    private hasPushed;
    /**
     * Constructor
     * @param hasPushed
     * @param lastDeviceId
     */
    constructor(s8: boolean);
    getHasPushed(): boolean;
}
