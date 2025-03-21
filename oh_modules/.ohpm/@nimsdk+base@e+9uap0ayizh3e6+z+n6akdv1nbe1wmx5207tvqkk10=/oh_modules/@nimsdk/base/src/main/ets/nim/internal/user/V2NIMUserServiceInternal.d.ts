import { Packet } from '../../parser';
import { V2NIMP2PMessageMuteMode } from '../../sdk/V2NIMSettingService';
import { V2NIMUser, V2NIMUserSearchOption, V2NIMUserService, V2NIMUserUpdateParams } from '../../sdk/V2NIMUserService';
import { V2InternalService } from '../V2NIMInternalService';
import { HashMap } from '@kit.ArkTS';
export default interface V2NIMUserServiceInternal extends V2NIMUserService, V2InternalService {
    v2ISyncSelfUserInfoHandler(packet: Packet, updateSyncTimestamp: boolean): Promise<void>;
    v2ISyncBlockAndMuteListHandler(packet: Packet, updateSyncTimestamp: boolean): Promise<void>;
    v2IIsBlocked(accountId: string): Promise<boolean>;
    v2IGetMuteList(): Promise<string[]>;
    v2IIsMute(accountId: string): Promise<boolean>;
    v2IIsMuteBatch(accountIds: string[]): Promise<HashMap<string, boolean>>;
    v2ISetAccountMuteMode(accountId: string, muteMode: V2NIMP2PMessageMuteMode): Promise<void>;
    v2IGetUser(accountId: string): Promise<V2NIMUser | undefined>;
    v2IGetUsers(accountIds: string[]): Promise<V2NIMUser[]>;
    v2IGetLocalUser(accountId: string): Promise<V2NIMUser | undefined>;
    v2IGetLocalUsers(accountIds: string[]): Promise<HashMap<string, V2NIMUser | undefined>>;
    v2ISetUsersBySync(users: V2NIMUser[], timetag: number): Promise<void>;
    v2IRefreshUserInfo(accountId: string, timetag?: number): Promise<void>;
    v2IRefreshUserInfoBatch(map: HashMap<string, number>): Promise<void>;
    /**
     * Internal API calling use following functions.
     */
    v2IGetUserList(accountIds: string[]): Promise<V2NIMUser[]>;
    v2IGetUserListFromCloud(accountIds: string[]): Promise<V2NIMUser[]>;
    v2IUpdateSelfUserProfile(updateParams: V2NIMUserUpdateParams): Promise<void>;
    v2IAddUserToBlockList(accountId: string): Promise<void>;
    v2IRemoveUserFromBlockList(accountId: string): Promise<void>;
    v2IGetBlockList(): Promise<string[]>;
    v2ISearchUserByOption(option: V2NIMUserSearchOption): Promise<V2NIMUser[]>;
}
