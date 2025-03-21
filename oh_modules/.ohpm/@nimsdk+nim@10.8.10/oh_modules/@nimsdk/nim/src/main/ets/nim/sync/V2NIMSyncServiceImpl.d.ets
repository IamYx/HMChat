import { NIM, NIMServiceName, SyncKey, SyncServiceOptions, V2NIMConversationType, V2NIMSyncServiceInternal, V2NIMTeamType, V2Service } from '@nimsdk/base/';
import { SyncCloud } from './cloud/SyncCloud';
import { V2NIMSyncModelImpl } from './model/V2NIMSyncModelImpl';
export default class V2NIMSyncServiceImpl extends V2Service implements V2NIMSyncServiceInternal {
    syncConfig: SyncServiceOptions;
    private basicSyncComplete;
    private syncLevel;
    private syncStart;
    private syncEventProcessorPre;
    private syncEventProcessor;
    private syncTrace?;
    constructor(q148: NIM, r148: NIMServiceName, s148: SyncServiceOptions);
    _syncModel?: V2NIMSyncModelImpl;
    get syncModel(): V2NIMSyncModelImpl;
    _cloud?: SyncCloud;
    get cloud(): SyncCloud;
    get isBasicSyncComplete(): boolean;
    getTeamMemberSyncTimestamp(o148: string, p148: V2NIMTeamType): number;
    setTeamMemberSyncTimestamp(l148: string, m148: V2NIMTeamType, n148: number): void;
    setSyncConfig(k148: number): void;
    onLoginStart(i148: string): Promise<void>;
    onLoginFinished(g148: string): Promise<void>;
    onLogout(): void;
    private setListener;
    updateSyncTimestamp2(e148: number, f148: SyncKey): Promise<void>;
    updateSyncTimestamp(x147: number, y147: SyncKey): Promise<void>;
    getRoamingMessageSyncTimestamp(): Promise<number>;
    getV2ConversationSyncTimestamp(): Promise<number>;
    getConversationSyncClearAllUnreadTimestamp(): Promise<number>;
    getConversationSyncClearUnreadByTypeTimestamp(w147: V2NIMConversationType): Promise<number>;
    getConversationSyncClearTeamUnreadTimestamp(): Promise<number>;
    getConversationSyncClearSuperTeamUnreadTimestamp(): Promise<number>;
    private afterPreSyncComplete;
    private afterBasicSyncComplete;
    private syncData;
    /**
     * 登录 & 断网重连将触发数据同步
     *
     * 同步动作严格按照以下顺序执行：
     * 1. 群 & 好友同步；
     * 2. 云端会话同步；
     * 3. 其余主要数据同步;
     *
     * @returns
     */
    private syncMainData;
    private syncMainDataBasic;
    private preSyncKey;
    /**
     * syncMainDataPre 所使用的请求时间戳
     * @returns
     */
    private generatePreSyncStamps;
    /**
     * syncMainDataBasic 所使用的请求时间戳
     * @returns
     */
    private generateBasicSyncStamps;
    /**
     * Pre sync 分三种情况：
     * 1. 成功 -> 触发 conv 同步开始，通过事件 syncMainDataPreSuccess
     * 2. 失败 -> 触发 conv 同步失败回调 & 自身同步失败，通过事件 syncMainDataPreFail
     * 3. 不做 -> 同成功
     * @returns
     */
    private syncMainDataPre;
    private syncTeamMembers;
    private syncSuperTeamMembers;
    /**
     * chunkSyncTeamMembers, for TEAM
     * @param syncTeamIds
     * @param extra
     * @returns
     */
    private chunkSyncTeamMembers;
    /**
     * chunkSyncSuperTeamMembers, for SUPER_TEAM
     * @param syncSuperTeamIds
     * @param extra
     * @returns
     */
    private chunkSyncSuperTeamMembers;
    private doQchatSync;
    private update;
    private change;
    private makeLongLongMap;
    private registerInnerService;
    private unRegisterInnerService;
    /************** pre sync handlers ***********/
    private v2TeamSyncHandler;
    private v2SuperTeamSyncHandler;
    private v2TeamMembersOfSelfInSyncHandler;
    private v2SuperTeamMembersOfSelfInSyncHandler;
    private v2SyncFriendListHandler;
    private v2SyncFriendUserListHandler;
    /************** basic sync handlers ***********/
    private syncMultiMarkSessionAckHandler;
    private syncMultiMarkSuperTeamSessionAckHandler;
    private nimSyncStickTopSessionsHandler;
    private syncBlockAndMuteListHandler;
    private v2SyncSelfUserInfoHandler;
    private syncOfflineMsgsHandler;
    private syncRoamingMsgsHandler;
    private syncSuperTeamRoamingMsgsHandler;
    private syncP2PMessageReceiptsHandler;
    private syncRevokeMessageHandler;
    private syncBroadcastMsgHandler;
    private syncOnDeleteMessagesHandler;
    private syncClearHistoryMessageHandler;
    private syncSuperTeamRevokeMessageHandler;
    private v2SyncOfflineSysMsgsHandler;
    /**
     * 消息修改多端同步
     */
    private v2MessageOnModifiedHandler;
    /**
     * 消息修改漫游, p2p, team 和 superTeam, 4_27 || 4_28
     */
    private v2MessageSyncModifiedHandler;
    /**
     * ysf 同步离线消息
     * @param packet
     * @returns
     */
    private ysfSyncOfflineMsgsHandler;
    /**
     * ysf 同步离线通知
     * @param packet
     * @returns
     */
    private ysfSyncSysNotificationHandler;
}
