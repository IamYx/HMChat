import { Packet } from '../../parser';
import { YSFService } from '../../sdk/YSFService';
import { V2InternalService } from '../V2NIMInternalService';
export default interface YSFServiceInternal extends YSFService, V2InternalService {
    v2IYSFSyncOfflineMsgsHandler(packet: Packet): Promise<void>;
    v2IYSFSyncSysNotificationHandler(packet: Packet): Promise<void>;
}
