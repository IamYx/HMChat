import { NIM, V2NIMDndConfig, V2NIMP2PMessageMuteMode, V2NIMTeamType } from '@nimsdk/base';
export declare class SettingCloud {
    private core;
    constructor(h108: NIM);
    setTeamMessageMuteMode(a108: string, b108: V2NIMTeamType, c108: string, d108: number): Promise<void>;
    setP2PMessageMuteMode(x107: string, y107: V2NIMP2PMessageMuteMode): Promise<void>;
    setAppBackground(u107: boolean, v107?: number): Promise<void>;
    setPushMobileOnDesktopOnline(r107: boolean): Promise<void>;
    setDndConfig(o107: V2NIMDndConfig): Promise<void>;
}
