import { NIM, NIMServiceConfig, NIMServiceName, V2NIMConversationType, V2NIMDndConfig, V2NIMP2PMessageMuteMode, V2NIMSettingListener, V2NIMSettingServiceInternal, V2NIMTeamMessageMuteMode, V2NIMTeamType, V2Service } from '@nimsdk/base';
import { HashMap } from '@kit.ArkTS';
export declare class V2NIMSettingServiceStub extends V2Service<V2NIMSettingListener> implements V2NIMSettingServiceInternal {
    constructor(d131: NIM, e131: NIMServiceName, f131: NIMServiceConfig);
    v2IGetConversationMuteStatus(c131: string): Promise<boolean>;
    v2IGetConversationMuteStatusBatch(a131: string[], b131: V2NIMConversationType): Promise<HashMap<string, boolean>>;
    v2ISetTeamMessageMuteMode(x130: string, y130: V2NIMTeamType, z130: V2NIMTeamMessageMuteMode): Promise<void>;
    v2IGetTeamMessageMuteMode(v130: string, w130: V2NIMTeamType): Promise<V2NIMTeamMessageMuteMode>;
    v2ISetP2PMessageMuteMode(t130: string, u130: V2NIMP2PMessageMuteMode): Promise<void>;
    v2IGetP2PMessageMuteMode(s130: string): Promise<V2NIMP2PMessageMuteMode>;
    v2IGetP2PMessageMuteList(): Promise<string[]>;
    v2ISetPushMobileOnDesktopOnline(r130: boolean): Promise<void>;
    v2ISetDndConfig(q130: V2NIMDndConfig): Promise<void>;
    v2IGetDndConfig(): Promise<V2NIMDndConfig>;
    v2IGetIsForeground(): boolean | undefined;
    setAppBackground(o130: boolean, p130?: number | undefined): Promise<void>;
    getConversationMuteStatus(n130: string): Promise<boolean>;
    setTeamMessageMuteMode(k130: string, l130: V2NIMTeamType, m130: V2NIMTeamMessageMuteMode): Promise<void>;
    getTeamMessageMuteMode(i130: string, j130: V2NIMTeamType): Promise<V2NIMTeamMessageMuteMode>;
    setP2PMessageMuteMode(g130: string, h130: V2NIMP2PMessageMuteMode): Promise<void>;
    getP2PMessageMuteMode(f130: string): Promise<V2NIMP2PMessageMuteMode>;
    getP2PMessageMuteList(): Promise<string[]>;
    setPushMobileOnDesktopOnline(e130: boolean): Promise<void>;
    setDndConfig(d130: V2NIMDndConfig): Promise<void>;
    getDndConfig(): Promise<V2NIMDndConfig>;
    onLoginStart(c130: string): Promise<void>;
    onLoginFinished(b130: string): Promise<void>;
    onLogout(): void;
}
