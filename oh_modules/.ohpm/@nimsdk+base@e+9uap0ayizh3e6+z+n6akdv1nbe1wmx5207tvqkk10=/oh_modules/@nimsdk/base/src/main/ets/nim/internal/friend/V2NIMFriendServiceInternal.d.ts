import { Packet } from '../../parser';
import { V2NIMFriend, V2NIMFriendService } from '../../sdk/V2NIMFriendService';
import { V2InternalService } from '../V2NIMInternalService';
import { HashMap } from '@kit.ArkTS';
export default interface V2NIMFriendServiceInternal extends V2NIMFriendService, V2InternalService {
    v2ISyncFriendUserListHandler(packet: Packet, updateSyncTimestamp: boolean): Promise<void>;
    v2ISyncFriendListHandler(packet: Packet, updateSyncTimestamp: boolean): Promise<void>;
    v2IGetFriend(accountId: string): Promise<V2NIMFriend | undefined>;
    v2IGetLocalFriendAlias(accountId: string): Promise<string | undefined>;
    v2IGetLocalFriendAliasBatch(accountIds: string[]): Promise<HashMap<string, string | undefined>>;
}
