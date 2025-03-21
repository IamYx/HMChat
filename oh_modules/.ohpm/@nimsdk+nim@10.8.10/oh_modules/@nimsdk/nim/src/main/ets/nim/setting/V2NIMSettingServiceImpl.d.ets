import { NIM, NIMServiceConfig, NIMServiceName, V2NIMConversationType, V2NIMDndConfig, V2NIMP2PMessageMuteMode, V2NIMSettingListener, V2NIMSettingServiceInternal, V2NIMTeamMessageMuteMode, V2NIMTeamType, V2Service } from '@nimsdk/base';
import { SettingCloud } from './setting/SettingCloud';
import { SettingModel } from './setting/SettingModel';
import { HashMap } from '@kit.ArkTS';
export default class V2NIMSettingServiceImpl extends V2Service<V2NIMSettingListener> implements V2NIMSettingServiceInternal {
    private lifecycleId;
    isForeground: boolean | undefined;
    private currentApplication;
    constructor(d111: NIM, e111: NIMServiceName, f111: NIMServiceConfig);
    private _cloud?;
    get cloud(): SettingCloud;
    private _model?;
    get model(): SettingModel;
    onLoginStart(b111: string): Promise<void>;
    onLoginFinished(a111: string): Promise<void>;
    onLogout(): void;
    getConversationMuteStatus(z110: string): Promise<boolean>;
    setTeamMessageMuteMode(w110: string, x110: V2NIMTeamType, y110: V2NIMTeamMessageMuteMode): Promise<void>;
    getTeamMessageMuteMode(u110: string, v110: V2NIMTeamType): Promise<V2NIMTeamMessageMuteMode>;
    setP2PMessageMuteMode(s110: string, t110: V2NIMP2PMessageMuteMode): Promise<void>;
    getP2PMessageMuteMode(r110: string): Promise<V2NIMP2PMessageMuteMode>;
    getP2PMessageMuteList(): Promise<string[]>;
    setPushMobileOnDesktopOnline(q110: boolean): Promise<void>;
    setDndConfig(p110: V2NIMDndConfig): Promise<void>;
    getDndConfig(): Promise<V2NIMDndConfig>;
    private setListener;
    v2IGetConversationMuteStatus(g110: string): Promise<boolean>;
    /**
     * 提供 conversationIds （均为同一类型）
     * @param conversationIds
     * @param conversationType
     * @returns
     */
    v2IGetConversationMuteStatusBatch(b110: string[], c110: V2NIMConversationType): Promise<HashMap<string, boolean>>;
    v2ISetTeamMessageMuteMode(x109: string, y109: V2NIMTeamType, z109: V2NIMTeamMessageMuteMode): Promise<void>;
    v2IGetTeamMessageMuteMode(u109: string, v109: V2NIMTeamType): Promise<V2NIMTeamMessageMuteMode>;
    /**
     * 批量获取群免打扰状态，并以 HashMap<teamId, boolean> 格式返回
     * @param teamIds
     * @param teamType
     * @returns
     */
    v2IGetTeamMessageMuteModeBatch(o109: string[], p109: V2NIMTeamType): Promise<HashMap<string, boolean>>;
    v2ISetP2PMessageMuteMode(l109: string, m109: V2NIMP2PMessageMuteMode): Promise<void>;
    v2IGetP2PMessageMuteMode(j109: string): Promise<V2NIMP2PMessageMuteMode>;
    /**
     * 获取点对点消息免打扰列表。
     */
    v2IGetP2PMessageMuteList(): Promise<string[]>;
    v2ISetPushMobileOnDesktopOnline(f109: boolean): Promise<void>;
    v2ISetDndConfig(d109: V2NIMDndConfig): Promise<void>;
    v2IGetDndConfig(): Promise<V2NIMDndConfig>;
    /**
     * 设置应用前后台状态
     *
     * web端运行在移动端时，需要用户调用此接口告知应用的前后台状态
     *
     * 该函数仅在使用 uniapp 编译至 ios，或者 android 时有效，它告知服务器应用的前后台状态，服务器根据此状态调整推送策略
     *
     * @param isBackground 是否在后台
     * @param badge 应用图标上的未读数。当前仅 ios 使用
     */
    setAppBackground(a109: boolean, b109?: number): Promise<void>;
    private registerInnerService;
    private unRegisterInnerService;
    /**
     * 注销前后台监听器，by lifecycleId
     */
    private unregisterAbilityLifecycleCallbacks;
    /**
     * 注册前后台监听器
     */
    private registerAbilityLifecycleCallbacks;
    private p2pMessageMuteModeChangeHandler;
    v2IGetIsForeground(): boolean | undefined;
}
