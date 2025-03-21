import { V2NIMTeamType } from './V2NIMTeamService';
import { NIMEBaseListener, NIMEBaseServiceInterface } from './types';
export interface V2NIMSettingService extends NIMEBaseServiceInterface<V2NIMSettingListener> {
    /**
     * 获取会话消息免打扰状态
     *
     * 注: 若会话类型为群, 则群消息免打扰模式为 {@link V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF | V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF} 返回为false. 其他的返回 true.
     *
     * @param conversationId 会话 id
     * @return mute 是否被免打扰
     */
    getConversationMuteStatus(conversationId: string): Promise<boolean>;
    /**
     * 设置群消息免打扰模式
     *
     * @param teamId 群组ID
     * @param teamType 群组类型
     * @param muteMode 群消息免打扰模式
     */
    setTeamMessageMuteMode(teamId: string, teamType: V2NIMTeamType, muteMode: V2NIMTeamMessageMuteMode): Promise<void>;
    /**
     * 获取群消息免打扰模式
     *
     * @param teamId 群组ID
     * @param teamType 群组类型
     * @return muteMode 群消息免打扰模式
     */
    getTeamMessageMuteMode(teamId: string, teamType: V2NIMTeamType): Promise<V2NIMTeamMessageMuteMode>;
    /**
     * 设置点对点消息免打扰模式
     *
     * @param accountId 目标账号 ID
     * @param muteMode 设置用户的免打扰模式
     */
    setP2PMessageMuteMode(accountId: string, muteMode: V2NIMP2PMessageMuteMode): Promise<void>;
    /**
     * 获取用户消息免打扰模式
     *
     * @param accountId 目标账号 ID
     * @return muteMode p2p 类型消息免打扰模式
     */
    getP2PMessageMuteMode(accountId: string): Promise<V2NIMP2PMessageMuteMode>;
    /**
     * 获取点对点消息免打扰列表。
     *
     * 返回 V2NIMP2PMessageMuteMode 为 V2NIM_P2P_MESSAGE_MUTE_MODE_ON 的 accountId 列表。
     */
    getP2PMessageMuteList(): Promise<string[]>;
    /**
     * 设置当桌面端在线时，移动端是否需要推送
     *
     * @param need 桌面端在线时，移动端是否需要推送
     */
    setPushMobileOnDesktopOnline(need: boolean): Promise<void>;
    /**
     *  设置Apns免打扰与详情显示
     *
     *  @param config 免打扰与详情配置参数
     */
    setDndConfig(config: V2NIMDndConfig): Promise<void>;
    /**
     * 获取Apns免打扰与详情显示
     *
     * @return 免打扰与详情配置参数
     */
    getDndConfig(): Promise<V2NIMDndConfig>;
}
/**
 * 群消息免打扰模式
 */
export declare enum V2NIMTeamMessageMuteMode {
    /**
     * 群消息免打扰关闭
     */
    V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF = 0,
    /**
     * 群消息免打扰开启
     */
    V2NIM_TEAM_MESSAGE_MUTE_MODE_ON = 1,
    /**
     * 发送者为普通成员的群消息免打扰开启
     */
    V2NIM_TEAM_MESSAGE_MUTE_MODE_NORMAL_ON = 2
}
/**
 * p2p 消息免打扰模式
 */
export declare enum V2NIMP2PMessageMuteMode {
    /**
     * 点对点消息免打扰关闭
     */
    V2NIM_P2P_MESSAGE_MUTE_MODE_OFF = 0,
    /**
     * 点对点消息免打扰开启
     */
    V2NIM_P2P_MESSAGE_MUTE_MODE_ON = 1
}
/**
 * setting 模块的监听事件
 */
export interface V2NIMSettingListener extends NIMEBaseListener {
    /**
     * 群组消息免打扰回调
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param muteMode 消息提醒模式
     */
    onTeamMessageMuteModeChanged: [
        teamId: string,
        teamType: V2NIMTeamType,
        muteMode: V2NIMTeamMessageMuteMode
    ];
    /**
     * P2P消息免打扰回调
     * @param accountId 账号id
     * @param muteMode 消息提醒模式
     */
    onP2PMessageMuteModeChanged: [
        accountId: string,
        muteMode: V2NIMP2PMessageMuteMode
    ];
}
/**
 * 离线推送配置参数
 */
export interface V2NIMDndConfig {
    /**
     *  是否显示详情
     *  true： 显示
     *  false：不限制
     */
    showDetail?: boolean;
    /**
     * 免打扰是否开启
     * true：开启
     * false：关闭
     */
    dndOn?: boolean;
    /**
     * 如果开启免打扰，开始小时数(Integer)
     * dndOn， 该字段必传
     */
    fromH?: number;
    /**
     * 如果开启免打扰，开始分钟数(Integer)
     * dndOn， 该字段必传
     */
    fromM?: number;
    /**
     * 如果开启免打扰，截止小时数(Integer)
     * dndOn， 该字段必传
     */
    toH?: number;
    /**
     * 如果开启免打扰，截止分钟数(Integer)
     * dndOn， 该字段必传
     */
    toM?: number;
}
export interface V2NIMManufacturerPushConfig {
    /**
     * 推送应用 AppId
     */
    appId?: string;
    /**
     * 推送应用 AppKey
     */
    appKey?: string;
    /**
     * 推送应用证书名。证书在云信后台上传
     */
    certificateName: string;
    /**
     * 推送应用密钥
     */
    secret?: string;
}
