import { Packet } from '../../parser';
import { V2NIMNotificationService } from '../../sdk/V2NIMNotificationService';
import { NIMEStrAnyObj } from '../types';
import { V2InternalService } from '../V2NIMInternalService';
export default interface V2NIMNotificationServiceInternal extends V2NIMNotificationService, V2InternalService {
    v2ISyncOfflineSysMsgsHandler(packet: Packet): Promise<void>;
    v2ISyncBroadcastMsgHandler(packet: Packet): Promise<void>;
    v2IMarkSysMsgAck(sysMsgs: NIMEStrAnyObj[]): any;
}
