import { Packet } from '../../parser';
import { V2NIMTeamMessageMuteMode } from '../../sdk/V2NIMSettingService';
import { V2NIMTeam, V2NIMTeamMember, V2NIMTeamService, V2NIMTeamType } from '../../sdk/V2NIMTeamService';
import { NIMEStrAnyObj } from '../types';
import { V2InternalService } from '../V2NIMInternalService';
import { HashMap } from '@kit.ArkTS';
export default interface V2NIMTeamServiceInternal extends V2NIMTeamService, V2InternalService {
    /**
     * 如果需要再在 ServiceInternal 公开
     */
    v2IGetLocalTeamById(teamId: string, teamType: V2NIMTeamType): Promise<V2NIMTeam | undefined>;
    v2IGetLocalTeamByIds(teamIds: string[], teamType: V2NIMTeamType): Promise<HashMap<string, V2NIMTeam | undefined>>;
    v2IGetLocalTeamMemberById(teamId: string, teamType: V2NIMTeamType, accountId: string): Promise<V2NIMTeamMember | undefined>;
    v2IQueryLocalAllTeams(): Promise<V2NIMTeam[]>;
    v2IQueryLocalAllSuperTeams(): Promise<V2NIMTeam[]>;
    v2ITeamProcessSysNotification(data: NIMEStrAnyObj): Promise<void>;
    v2ITeamQueryMemberUpdateTimeMap(teamType: V2NIMTeamType): Promise<HashMap<string, number>>;
    v2IGetTeamMessageMuteMode(teamId: string, teamType: V2NIMTeamType): Promise<V2NIMTeamMessageMuteMode>;
    v2IGetTeamMessageMuteModeBatch(teamIds: string[], teamType: V2NIMTeamType): Promise<HashMap<string, V2NIMTeamMessageMuteMode>>;
    /**
     * Update
     */
    v2IUpdateTeamMemberBits(teamId: string, teamType: V2NIMTeamType, accountId: string, muteMode: V2NIMTeamMessageMuteMode): Promise<void>;
    /**
     * syncs
     */
    v2ISyncTeamSyncHandler(packet: Packet): Promise<void>;
    v2ISyncSuperTeamSyncHandler(packet: Packet): Promise<void>;
    v2ISyncTeamMembersOfSelfInSyncHandler(packet: Packet): Promise<void>;
    v2ISyncSuperTeamMembersOfSelfInSyncHandler(packet: Packet): Promise<void>;
}
