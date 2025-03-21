import { NIMServiceConfig } from '../../sdk/V2NIMInterface';
interface MessageSyncOptions {
    /**
     * 是否同步离线消息和离线系统通知。默认 true
     * Whether to synchronize offline messages and offline system notifications. Default value: true
     */
    offlineMsgs?: boolean;
    /**
     * 是否同步漫游消息。默认 true
     * Whether to synchronize roaming messages. Default value: true
     */
    roamingMsgs?: boolean;
    /**
     * 是否同步已读回执。默认 true
     * Whether to synchronize read receipts. Default value: true
     */
    msgReceipts?: boolean;
    /**
     * 桌面端在线时，移动端是否需要推送。默认 true
     */
    /**
     * 是否同步撤回消息离线和漫游通知。默认 true
     * Whether to synchronize the recalled messages. Default value: true
     */
    recallMsg?: boolean;
    /**
     * 是否同步离线的广播消息，默认 false
     * Whether the broadcast messages that are received during offline are synchronized
     */
    broadcastMsgs?: boolean;
    /**
     * 是否同步单向删除信息，默认 true
     * Whether to synchronize one-way delete information (default value: true)
     */
    deleteSelfMsgs?: boolean;
    /**
     * 是否同步会话历史消息的删除信息。默认 true
     * Whether to synchronize the deletion information of the conversation's history messages (default value: true)
     */
    sessionHistoryMsgsDelete?: boolean;
    /**
     * 是否同步超大群漫游消息。默认 true
     * Whether to synchronize roaming messages in supergroup (default value: true)
     */
    quickCommentMsg?: boolean;
    /**
     * 是否同步超大群撤回消息离线和漫游通知，默认 true
     * Whether to synchronize the recalled messages in the supergroup, the default value is true
     */
    deleteSuperTeamMsg?: boolean;
    /**
     * 是否同步p2p 和 team 的消息更新
     * Whether to synchronize the recalled messages in the supergroup, the default value is true
     */
    p2pTeamModifyMessage?: boolean;
    /**
     * 是否同步超大群消息更新
     */
    superTeamModifyMessage?: boolean;
    /**
     * 是否云商服专用的过滤消息。默认 false
     */
    filterMsgs?: boolean;
}
export type MessageSyncKey = keyof MessageSyncOptions;
export declare const MessageSyncKeys: MessageSyncKey[];
interface MainSyncOptions {
    /**
     * 是否同步用户信息。默认 true
     * Whether to synchronize user information. Default value: true
     */
    myInfo?: boolean;
    /**
     * 是否同步黑名单和静音列表。默认 true
     * Whether to synchronize the blacklist and mute list. Default value: true
     */
    relations?: boolean;
    /**
     * 是否同步好友列表。默认 true
     * Whether to synchronize the friend list. Default value: true
     */
    friends?: boolean;
    /**
     * 是否同步好友的用户名片。默认 true
     * Whether to synchronize friends’ name cards. Default value: true
     */
    friendUsers?: boolean;
    /**
     * 是否同步机器人列表最后更新时间戳。默认false，弃用
     */
    /**
     * 是否同步音视频独立信令，默认 false
     */
    avSignal?: boolean;
}
export type MainSyncKey = keyof MainSyncOptions;
export declare const MainSyncKeys: MainSyncKey[];
interface V1ConversationSyncOptions {
    /**
     * 是否同步会话列表。默认 false。弃用
     */
    /**
     * 是否同步消息会话 ack，时间戳单位毫秒。默认 false
     * Whether to synchronize conversation ACK of the message (timestamp unit: milliseconds, default value: false)
     *
     * 会话 ACK 代表本账号在此会话里读过的最新消息的时间戳
     * Conversation ACK represents the timestamp of the latest message read by the account in a conversation.
     */
    sessionAck?: boolean;
    /**
     * 是否同步置顶会话信息，默认 false
     * Whether to synchronize information of pinned conversation (default value: false)
     */
    stickTopSessions?: boolean;
    /**
     * 是否同步超大群会话 ack 位置列表，默认 false
     * Whether to synchronize the supergroup's conversation ACK (default value: false)
     */
    superTeamSessionAck?: boolean;
}
export type V1ConversationSyncKey = keyof V1ConversationSyncOptions;
export declare const V1ConversationSyncKeys: V1ConversationSyncKey[];
interface TeamSyncOptions {
    /**
     * 是否同步群列表。默认 true
     * Whether to synchronize the group list. Default value: true
     */
    teams?: boolean;
    /**
     * 是否同步超大群信息，默认 true
     * Whether to synchronize supergroup information (default value: true)
     */
    superTeams?: boolean;
    /**
     * 是否同步当前用户的所有群的群成员信息。默认 true
     * Whether to synchronize the current user’s member information in all groups. Default value: true
     */
    myTeamMembers?: boolean;
    /**
     * 是否同步所在的超大群的群成员信息，默认 true
     * Whether to synchronize the group member information of the super group where it is located (default value: true)
     */
    mySuperTeamMembers?: boolean;
}
export type TeamSyncKey = keyof TeamSyncOptions;
export declare const TeamSyncKeys: TeamSyncKey[];
interface V2ConversationSyncOptions {
    /**
     * conversation
     */
    conversation?: boolean;
    /**
     * clear all unread conversation version
     */
    clearAllUnread?: boolean;
    /**
     * clear P2P unread conversation version
     */
    clearP2PUnread?: boolean;
    /**
     * clear team unread conversation version
     */
    clearTeamUnread?: boolean;
    /**
     * clear super team unread conversation version
     */
    clearSuperTeamUnread?: boolean;
}
export type V2ConversationSyncKey = keyof V2ConversationSyncOptions;
export declare const V2ConversationSyncKeys: V2ConversationSyncKey[];
export interface SyncOptions extends MessageSyncOptions, MainSyncOptions, V1ConversationSyncOptions, TeamSyncOptions, V2ConversationSyncOptions {
}
export type SyncKey = keyof SyncOptions;
export interface SyncServiceOptions extends NIMServiceConfig {
    enableMessage: boolean;
    enableMain: boolean;
    enableTeam: boolean;
    enableV1Conversation: boolean;
    enableV2Conversation: boolean;
}
export type SyncTimetags = Partial<{
    [key in SyncKey]: number;
}>;
export {};
