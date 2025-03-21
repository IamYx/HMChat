import { V2NIMP2PMessageMuteMode, V2NIMTeamType } from '@nimsdk/base';
import { MobilePushTag, PushMobileOnDesktopOnlineRequest, SetAppBackgroundRequest, SetDndConfigParam, SetDndConfigRequest, SetP2PMessageMuteModeRequest, TeamMessageMuteModeInfo, TeamMessageMuteModeRequest } from './cloud/SettingRequest';
export class SettingCloud {
    constructor(h108) {
        this.core = h108;
    }
    async setTeamMessageMuteMode(a108, b108, c108, d108) {
        const e108 = b108 === V2NIMTeamType.V2NIM_TEAM_TYPE_SUPER ? 'v2SuperTeamUpdateSelfMemberInfo' :
            'v2TeamUpdateSelfMemberInfo';
        const f108 = new TeamMessageMuteModeInfo(a108, b108, c108, d108);
        const g108 = new TeamMessageMuteModeRequest(f108);
        await this.core.sendCmd(e108, g108);
        return;
    }
    async setP2PMessageMuteMode(x107, y107) {
        const z107 = new SetP2PMessageMuteModeRequest(x107, y107 === V2NIMP2PMessageMuteMode.V2NIM_P2P_MESSAGE_MUTE_MODE_ON ? true : false);
        await this.core.sendCmd('v2SetP2PMessageMuteMode', z107);
        return;
    }
    async setAppBackground(u107, v107) {
        const w107 = new SetAppBackgroundRequest(u107, v107 || 0);
        await this.core.sendCmd('v2SetAppBackground', w107);
        return;
    }
    async setPushMobileOnDesktopOnline(r107) {
        r107 = r107 === undefined ? true : r107;
        const s107 = new MobilePushTag(r107);
        const t107 = new PushMobileOnDesktopOnlineRequest(s107);
        await this.core.sendCmd('v2SetPushMobileOnDesktopOnline', t107);
        return;
    }
    async setDndConfig(o107) {
        o107.showDetail = o107.showDetail ?? false;
        o107.dndOn = o107.dndOn ?? false;
        o107.fromH = o107.fromH ?? 0;
        o107.fromM = o107.fromM ?? 0;
        o107.toH = o107.toH ?? 0;
        o107.toM = o107.toM ?? 0;
        const p107 = new SetDndConfigParam(o107.showDetail ? 1 : 2, o107.dndOn ? 1 : 2, o107.fromH, o107.fromM, o107.toH, o107.toM);
        const q107 = new SetDndConfigRequest(p107);
        await this.core.sendCmd('v2SetDndConfig', q107);
        return;
    }
}
