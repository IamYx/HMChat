import { V2Service, V2NIMErrorImpl, V2NIMErrorCode } from '@nimsdk/base';
import HashMap from "@ohos.util.HashMap";
const TAG = 'V2NIMTeamServiceStub';
export class V2NIMTeamServiceStub extends V2Service {
    constructor(b136, c136, d136) {
        super(c136, b136);
    }
    v2IUpdateTeamMemberBits(x135, y135, z135, a136) {
        this.core.logger.error(TAG, `Method 'v2IUpdateTeamMemberBits' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IUpdateTeamMemberBits' not implemented.`
            }
        });
    }
    v2IGetTeamMessageMuteMode(v135, w135) {
        this.core.logger.error(TAG, `Method 'v2IGetTeamMessageMuteMode' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetTeamMessageMuteMode' not implemented.`
            }
        });
    }
    v2IGetTeamMessageMuteModeBatch(t135, u135) {
        this.core.logger.error(TAG, `Method 'v2IGetTeamMessageMuteModeBatch' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetTeamMessageMuteModeBatch' not implemented.`
            }
        });
    }
    v2ISyncTeamSyncHandler(s135) {
        this.core.logger.warn(TAG, 'v2ISyncTeamSyncHandler not implemented.');
        return;
    }
    v2ISyncSuperTeamSyncHandler(r135) {
        this.core.logger.warn(TAG, 'v2ISyncSuperTeamSyncHandler not implemented.');
        return;
    }
    v2ISyncTeamMembersOfSelfInSyncHandler(q135) {
        this.core.logger.warn(TAG, 'v2ISyncTeamMembersOfSelfInSyncHandler not implemented.');
        return;
    }
    v2ISyncSuperTeamMembersOfSelfInSyncHandler(p135) {
        this.core.logger.warn(TAG, 'v2ISyncSuperTeamMembersOfSelfInSyncHandler not implemented.');
        return;
    }
    async clearAllTeamJoinActionInfo() {
        this.core.logger.error(TAG, `Method 'clearAllTeamJoinActionInfo' not implemented.`);
    }
    async deleteTeamJoinActionInfo(o135) {
        this.core.logger.error(TAG, `Method 'deleteTeamJoinActionInfo' not implemented.`);
    }
    inviteMemberEx(l135, m135, n135) {
        this.core.logger.error(TAG, `Method 'inviteMemberEx' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'inviteMemberEx' not implemented.`
            }
        });
    }
    v2InviteMemberEx(i135, j135, k135) {
        this.core.logger.error(TAG, `Method 'v2InviteMemberEx' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2InviteMemberEx' not implemented.`
            }
        });
    }
    v2ITeamProcessSysNotification(h135) {
        this.core.logger.error(TAG, `Method 'v2ITeamProcessSysNotification' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2ITeamProcessSysNotification' not implemented.`
            }
        });
    }
    v2ITeamQueryMemberUpdateTimeMap(g135) {
        this.core.logger.error(TAG, `Method 'v2ITeamQueryMemberUpdateTimeMap' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2ITeamQueryMemberUpdateTimeMap' not implemented.`
            }
        });
    }
    searchTeamMembers(f135) {
        this.core.logger.error(TAG, `Method 'searchTeamMembers' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'searchTeamMembers' not implemented.`
            }
        });
    }
    searchTeamByKeyword(e135) {
        this.core.logger.error(TAG, `Method 'searchTeamByKeyword' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'searchTeamByKeyword' not implemented.`
            }
        });
    }
    async v2IGetLocalTeamById(c135, d135) {
        this.core.logger.error(TAG, `Method 'getLocalTeamById' not implemented. no har`);
        return undefined;
    }
    async v2IGetLocalTeamByIds(a135, b135) {
        this.core.logger.error(TAG, `Method 'v2IGetLocalTeamByIds' not implemented. no har`);
        return new HashMap();
    }
    async v2IGetLocalTeamMemberById(x134, y134, z134) {
        this.core.logger.error(TAG, `Method 'getLocalTeamMemberById' not implemented. on har`);
        return undefined;
    }
    v2IQueryLocalAllTeams() {
        this.core.logger.error(TAG, `Method 'queryLocalAllTeams' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `Method 'queryLocalAllTeams' not implemented.`
            }
        });
    }
    v2IQueryLocalAllSuperTeams() {
        this.core.logger.error(TAG, `Method 'queryLocalAllSuperTeams' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'queryLocalAllSuperTeams' not implemented.`
            }
        });
    }
    teamProcessNotification(w134) {
        this.core.logger.error(TAG, `Method 'teamProcessNotification' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'teamProcessNotification' not implemented.`
            }
        });
    }
    createTeam(s134, t134, u134, v134) {
        this.core.logger.error(TAG, `Method 'createTeam' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'createTeam' not implemented.`
            }
        });
    }
    updateTeamInfo(o134, p134, q134, r134) {
        this.core.logger.error(TAG, `Method 'updateTeamInfo' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'updateTeamInfo' not implemented.`
            }
        });
    }
    leaveTeam(m134, n134) {
        this.core.logger.error(TAG, `Method 'leaveTeam' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'leaveTeam' not implemented.`
            }
        });
    }
    getTeamInfo(k134, l134) {
        this.core.logger.error(TAG, `Method 'getTeamInfo' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getTeamInfo' not implemented.`
            }
        });
    }
    getJoinedTeamList(j134) {
        this.core.logger.error(TAG, `Method 'getJoinedTeamList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getJoinedTeamList' not implemented.`
            }
        });
    }
    getJoinedTeamCount(i134) {
        this.core.logger.error(TAG, `Method 'getJoinedTeamCount' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getJoinedTeamCount' not implemented.`
            }
        });
    }
    getTeamInfoByIds(g134, h134) {
        this.core.logger.error(TAG, `Method 'getTeamInfoByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getTeamInfoByIds' not implemented.`
            }
        });
    }
    dismissTeam(e134, f134) {
        this.core.logger.error(TAG, `Method 'dismissTeam' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'dismissTeam' not implemented.`
            }
        });
    }
    inviteMember(a134, b134, c134, d134) {
        this.core.logger.error(TAG, `Method 'inviteMember' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'inviteMember' not implemented.`
            }
        });
    }
    acceptInvitation(z133) {
        this.core.logger.error(TAG, `Method 'acceptInvitation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'acceptInvitation' not implemented.`
            }
        });
    }
    rejectInvitation(x133, y133) {
        this.core.logger.error(TAG, `Method 'rejectInvitation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'rejectInvitation' not implemented.`
            }
        });
    }
    kickMember(u133, v133, w133) {
        this.core.logger.error(TAG, `Method 'kickMember' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'kickMember' not implemented.`
            }
        });
    }
    applyJoinTeam(r133, s133, t133) {
        this.core.logger.error(TAG, `Method 'applyJoinTeam' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'applyJoinTeam' not implemented.`
            }
        });
    }
    acceptJoinApplication(q133) {
        this.core.logger.error(TAG, `Method 'acceptJoinApplication' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'acceptJoinApplication' not implemented.`
            }
        });
    }
    rejectJoinApplication(o133, p133) {
        this.core.logger.error(TAG, `Method 'rejectJoinApplication' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'rejectJoinApplication' not implemented.`
            }
        });
    }
    updateTeamMemberRole(k133, l133, m133, n133) {
        this.core.logger.error(TAG, `Method 'updateTeamMemberRole' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'updateTeamMemberRole' not implemented.`
            }
        });
    }
    transferTeamOwner(g133, h133, i133, j133) {
        this.core.logger.error(TAG, `Method 'transferTeamOwner' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'transferTeamOwner' not implemented.`
            }
        });
    }
    updateSelfTeamMemberInfo(d133, e133, f133) {
        this.core.logger.error(TAG, `Method 'updateSelfTeamMemberInfo' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'updateSelfTeamMemberInfo' not implemented.`
            }
        });
    }
    updateTeamMemberNick(z132, a133, b133, c133) {
        this.core.logger.error(TAG, `Method 'updateTeamMemberNick' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'updateTeamMemberNick' not implemented.`
            }
        });
    }
    setTeamChatBannedMode(w132, x132, y132) {
        this.core.logger.error(TAG, `Method 'setTeamChatBannedMode' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'setTeamChatBannedMode' not implemented.`
            }
        });
    }
    setTeamMemberChatBannedStatus(s132, t132, u132, v132) {
        this.core.logger.error(TAG, `Method 'setTeamMemberChatBannedStatus' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'setTeamMemberChatBannedStatus' not implemented.`
            }
        });
    }
    getTeamMemberList(p132, q132, r132) {
        this.core.logger.error(TAG, `Method 'getTeamMemberList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getTeamMemberList' not implemented.`
            }
        });
    }
    getTeamMemberListByIds(m132, n132, o132) {
        this.core.logger.error(TAG, `Method 'getTeamMemberListByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getTeamMemberListByIds' not implemented.`
            }
        });
    }
    getTeamMemberInvitor(j132, k132, l132) {
        this.core.logger.error(TAG, `Method 'getTeamMemberInvitor' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getTeamMemberInvitor' not implemented.`
            }
        });
    }
    getTeamJoinActionInfoList(i132) {
        this.core.logger.error(TAG, `Method 'getTeamJoinActionInfoList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getTeamJoinActionInfoList' not implemented.`
            }
        });
    }
    async onLoginStart(h132) {
        this.core.logger.info(TAG, `Method 'onLoginStart' not implemented.`);
    }
    async onLoginFinished(g132) {
        this.core.logger.info(TAG, `Method 'onLoginFinished' not implemented.`);
    }
    onLogout() {
        this.core.logger.info(TAG, `Method 'onLogout' not implemented.`);
    }
}
