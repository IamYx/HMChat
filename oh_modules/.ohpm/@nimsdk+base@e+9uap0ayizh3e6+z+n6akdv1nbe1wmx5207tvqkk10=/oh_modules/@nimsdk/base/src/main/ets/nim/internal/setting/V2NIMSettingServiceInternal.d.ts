import { V2NIMDndConfig, V2NIMP2PMessageMuteMode, V2NIMSettingService, V2NIMTeamMessageMuteMode } from '../../sdk/V2NIMSettingService';
import { V2NIMTeamType } from '../../sdk/V2NIMTeamService';
import { V2InternalService } from '../V2NIMInternalService';
import { HashMap } from '@kit.ArkTS';
import { V2NIMConversationType } from '../../sdk/V2NIMConversationService';
export default interface V2NIMSettingServiceInternal extends V2NIMSettingService, V2InternalService {
    /**
     * 获取前后台信息
     * @returns true/false 表示前台/后台；undefined 则无效
     */
    v2IGetIsForeground(): boolean | undefined;
    /**
     * Internal API calling use following functions.
     */
    v2IGetConversationMuteStatus(conversationId: string): Promise<boolean>;
    v2IGetConversationMuteStatusBatch(targetIds: string[], conversationType: V2NIMConversationType): Promise<HashMap<string, boolean>>;
    v2ISetTeamMessageMuteMode(teamId: string, teamType: V2NIMTeamType, muteMode: V2NIMTeamMessageMuteMode): Promise<void>;
    v2IGetTeamMessageMuteMode(teamId: string, teamType: V2NIMTeamType): Promise<V2NIMTeamMessageMuteMode>;
    v2ISetP2PMessageMuteMode(accountId: string, muteMode: V2NIMP2PMessageMuteMode): Promise<void>;
    v2IGetP2PMessageMuteMode(accountId: string): Promise<V2NIMP2PMessageMuteMode>;
    v2IGetP2PMessageMuteList(): Promise<string[]>;
    v2ISetPushMobileOnDesktopOnline(need: boolean): Promise<void>;
    v2ISetDndConfig(config: V2NIMDndConfig): Promise<void>;
    v2IGetDndConfig(): Promise<V2NIMDndConfig>;
}
