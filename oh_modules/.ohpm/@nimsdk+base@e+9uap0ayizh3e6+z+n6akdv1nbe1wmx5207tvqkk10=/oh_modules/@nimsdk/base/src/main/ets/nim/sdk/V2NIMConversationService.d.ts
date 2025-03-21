import { V2NIMMessageAttachment, V2NIMMessageRefer, V2NIMMessageRevokeType, V2NIMMessageSendingState, V2NIMMessageType } from './V2NIMMessageService';
import { NIMEBaseListener, NIMEBaseServiceInterface, V2NIMError } from './types';
import { NIMServiceConfig } from './V2NIMInterface';
export interface V2NIMConversationService extends NIMEBaseServiceInterface<V2NIMConversationListener> {
    /**
     * 获取会话列表
     *
     * @param offset 分页偏移量. 首页应传 0, 其他页数据使用返回的 offset
     * @param limit 分页拉取数量，不建议超过 100
     *
     * @example
     * ```typescript
     * const { offset, finished, conversationList } = await nim.conversationService.getConversationList(0, 100)
     * ```
     */
    getConversationList(offset: number, limit: number): Promise<V2NIMConversationResult>;
    /**
     * 获取会话列表. 可以指定筛选条件，按会话类型，未读等
     *
     * @param offset 会话标记. 首页应传 0, 其他页数据使用返回的 offset
     * @param limit 分页拉取数量, 不建议超过100
     * @param option 查询选项
     *
     * @example
     * ```typescript
     * const { offset, finished, conversationList } = await nim.conversationService.getConversationListByOption(0, 100, {
     *   conversationTypes: [V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P]
     *   onlyUnread: true,
     * })
     * ```
     */
    getConversationListByOption(offset: number, limit: number, option: V2NIMConversationOption): Promise<V2NIMConversationResult>;
    /**
     * 根据会话 id 获取单条会话
     *
     * @param conversationId 会话 id
     *
     * @example
     * ```typescript
     * const data = await nim.conversationService.getConversation("TARGET_CONVERSATION_ID")
     * ```
     */
    getConversation(conversationId: string): Promise<V2NIMConversation>;
    /**
     * 根据会话 id 获取会话列表
     *
     * @param conversationIds 会话 id 列表
     *
     * @example
     * ```typescript
     * const datas = await nim.conversationService.getConversationListByIds(["TARGET_CONVERSATION_ID", "TARGET_CONVERSATION_ID2"]])
     * ```
     */
    getConversationListByIds(conversationIds: string[]): Promise<V2NIMConversation[]>;
    /**
     * 创建会话
     *
     * 注: 在操作成功且是有效的操作时, 会抛出事件 {@link V2NIMConversationListener.onConversationCreated | V2NIMConversationListener.onConversationCreated}
     *
     * @param conversationId 会话 id
     *
     * @example
     * ```typescript
     * const datas = await nim.conversationService.createConversation("CONVERSATION_ID")
     * ```
     */
    createConversation(conversationId: string): Promise<V2NIMConversation>;
    /**
     * 删除会话
     *
     * 注: 在操作成功且是有效的操作时, 会抛出事件 {@link V2NIMConversationListener.onConversationDeleted | V2NIMConversationListener.onConversationCreated}
     *
     * @param conversationId 会话 id
     * @param clearMessage 是否删除会话对应的历史消息. 默认为 false
     *
     * @example
     * ```typescript
     * await nim.conversationService.deleteConversation("CONVERSATION_ID", true)
     * ```
     */
    deleteConversation(conversationId: string, clearMessage?: boolean): Promise<void>;
    /**
     * 批量删除会话
     *
     * 注: 在操作成功且是有效的操作时, 会抛出事件 {@link V2NIMConversationListener.onConversationDeleted | V2NIMConversationListener.onConversationDeleted}
     *
     * @param conversationIds 会话 id 列表
     * @param clearMessage 是否删除会话对应的历史消息. 默认为 false
     * @returns 返回操作失败的列表，列表的对象包含会话 id 以及错误信息.
     *
     * @example
     * ```typescript
     * await nim.conversationService.deleteConversationListByIds(["CONVERSATION_ID1", "CONVERSATION_ID2"], true)
     * ```
     */
    deleteConversationListByIds(conversationIds: string[], clearMessage?: boolean): Promise<V2NIMConversationOperationResult[]>;
    /**
     * 置顶会话
     *
     * 注: 在操作成功且是有效的操作时, 则触发事件 {@link V2NIMConversationListener.onConversationChanged | V2NIMConversationListener.onConversationChanged}
     *
     * @param conversationId 会话 id
     * @param stickTop 是否置顶. true: 置顶, false: 取消置顶.
     *
     * @example
     * ```typescript
     * await nim.conversationService.stickTopConversation("CONVERSATION_ID", true)
     * ```
     */
    stickTopConversation(conversationId: string, stickTop: boolean): Promise<void>;
    /**
     * 更新会话
     *
     * 注: 在操作成功且是有效的操作时, 触发事件 {@link V2NIMConversationListener.onConversationChanged | V2NIMConversationListener.onConversationChanged}
     *
     * @param conversationId 会话 id
     * @param updateInfo 欲更新的信息
     *
     * @example
     * ```typescript
     * await nim.conversationService.updateConversation("CONVERSATION_ID", {
     *  serverExtension: "This is a new text"
     * })
     * ```
     */
    updateConversation(conversationId: string, updateInfo: V2NIMConversationUpdate): Promise<void>;
    /**
     * 更新会话的本地扩展字段
     *
     * 注: 在操作成功且是有效的操作时, 触发事件 {@link V2NIMConversationListener.onConversationChanged | V2NIMConversationListener.onConversationChanged}
     *
     * 注2: 字段只能存在内存里, 不能持久化存储. 登出或者重新初始化后 localExtension 都会再次成为空字符串.
     *
     * @param conversationId 会话 id
     * @param localExtension 本地扩展信息
     *
     * @example
     * ```typescript
     * await nim.conversationService.updateConversationLocalExtension("CONVERSATION_ID", 'newLocalExtension!'})
     * ```
     */
    updateConversationLocalExtension(conversationId: string, localExtension: string): Promise<void>;
    /**
     * 获取全部会话的总的未读数
     *
     * @example
     * ```typescript
     * const count = nim.conversationService.getTotalUnreadCount()
     * ```
     */
    getTotalUnreadCount(): number;
    /**
     * 根据 id 列表获取会话的未读数
     *
     * @param conversationIds 会话 id 列表
     *
     * @example
     * ```typescript
     * const counts = await nim.conversationService.getUnreadCountByIds(["CONVERSATION_ID1,CONVERSATION_ID2"])
     * ```
     */
    getUnreadCountByIds(conversationIds: string[]): Promise<number>;
    /**
     * 根据过滤参数获取相应的未读信息
     *
     * @param filter 过滤条件
     */
    getUnreadCountByFilter(filter: V2NIMConversationFilter): Promise<number>;
    /**
     * 清空所有会话总的未读数
     *
     * 注: 当该方法调用后，SDK 可能给开发者抛出以下的事件
     *
     * {@link V2NIMConversationListener.onConversationChanged | V2NIMConversationListener.onConversationChanged} <br/>
     * {@link V2NIMConversationListener.onTotalUnreadCountChanged | V2NIMConversationListener.onTotalUnreadCountChanged} <br/>
     * {@link V2NIMConversationListener.onUnreadCountChangedByFilter | V2NIMConversationListener.onUnreadCountChangedByFilter}
     */
    clearTotalUnreadCount(): Promise<void>;
    /**
     * 根据会话 id 列表清空相应会话的未读数
     *
     * 注: 当该方法调用后，SDK 可能给开发者抛出以下的事件
     *
     * {@link V2NIMConversationListener.onConversationChanged | V2NIMConversationListener.onConversationChanged} <br/>
     * {@link V2NIMConversationListener.onTotalUnreadCountChanged | V2NIMConversationListener.onTotalUnreadCountChanged} <br/>
     * {@link V2NIMConversationListener.onUnreadCountChangedByFilter | V2NIMConversationListener.onUnreadCountChangedByFilter}
     *
     * @param conversationIds 会话 id 列表
     * @returns 返回操作失败结果的列表
     */
    clearUnreadCountByIds(conversationIds: string[]): Promise<V2NIMConversationOperationResult[]>;
    /**
     * 清除对应指定分组下的会话的未读数
     *
     * 注: 当该方法调用后，SDK 可能给开发者抛出以下的事件
     *
     * {@link V2NIMConversationListener.onConversationChanged | V2NIMConversationListener.onConversationChanged} <br/>
     * {@link V2NIMConversationListener.onTotalUnreadCountChanged | V2NIMConversationListener.onTotalUnreadCountChanged} <br/>
     * {@link V2NIMConversationListener.onUnreadCountChangedByFilter | V2NIMConversationListener.onUnreadCountChangedByFilter}
     *
     * @param groupId 指定的会话分组 id
     */
    clearUnreadCountByGroupId(groupId: string): Promise<void>;
    /**
     * 清除对应指定类型下的会话的未读数
     *
     * 注: 当该方法调用后，SDK 可能给开发者抛出以下的事件
     *
     * {@link V2NIMConversationListener.onConversationChanged | V2NIMConversationListener.onConversationChanged} <br/>
     * {@link V2NIMConversationListener.onTotalUnreadCountChanged | V2NIMConversationListener.onTotalUnreadCountChanged} <br/>
     * {@link V2NIMConversationListener.onUnreadCountChangedByFilter | V2NIMConversationListener.onUnreadCountChangedByFilter}
     *
     * @param types 指定的会话类型列表
     */
    clearUnreadCountByTypes(types: V2NIMConversationType[]): Promise<void>;
    /**
     * 订阅指定过滤条件的会话未读数变化
     *
     * 注1: 当订阅该条件后，该 filter 下的未读数发生变化时, 触发 {@link V2NIMConversationListener.onUnreadCountChangedByFilter | V2NIMConversationListener.onUnreadCountChangedByFilter} 事件
     *
     * 注2: 同一种 filter 只能被订阅一次, 第二次的调用不会有任何效果
     *
     * @param filter 过滤条件
     */
    subscribeUnreadCountByFilter(filter: V2NIMConversationFilter): void;
    /**
     * 取消订阅指定过滤条件的会话未读变化
     *
     * @param filter 过滤条件
     */
    unsubscribeUnreadCountByFilter(filter: V2NIMConversationFilter): void;
    /**
     * 标记会话已读时间戳
     *
     * 注: 当该方法调用后，SDK 可能给多端账户抛出以下的事件
     *
     * {@link V2NIMConversationListener.onConversationReadTimeUpdated | V2NIMConversationListener.onConversationReadTimeUpdated} <br/>
     *
     */
    markConversationRead(conversationId: string): Promise<number>;
    /**
     * 获取会话已读时间戳。该时间包含多端已读时间戳
     */
    getConversationReadTime(conversationId: string): Promise<number>;
}
export interface V2NIMConversationFilter {
    /**
     * 会话类型列表
     *
     * 注: undefined, [] 空数组. 均表示这个条件不生效
     */
    conversationTypes?: V2NIMConversationType[];
    /**
     * 会话分组 Id
     */
    conversationGroupId?: string;
    /**
     * 是否过滤免打扰的会话类型. 默认 false
     */
    ignoreMuted?: boolean;
}
export interface V2NIMConversationUnreadCountChangedFilter extends V2NIMConversationFilter {
    /**
     * 辅助的 filter 对象比较函数. 比对传入的 filter 和本次提供的 filter 是否相等
     *
     * @param filter 要比较的 filter
     */
    equals: (filter: V2NIMConversationFilter) => boolean;
}
/**
 * 会话更新的入参
 */
export interface V2NIMConversationUpdate {
    /**
     * 更新服务端扩展字段
     */
    serverExtension?: string;
}
/**
 * V2NIMConversationService 模块监听事件定义
 */
export interface V2NIMConversationListener extends NIMEBaseListener {
    /**
     * 会话模块的数据同步开始
     */
    onSyncStarted: [
    ];
    /**
     * 会话模块的数据同步结束
     *
     * 注: 建议开发者若要使用会话模块的数据, 在收到这个事件后再去使用, 以保证数据的完整性.
     */
    onSyncFinished: [
    ];
    /**
     * 会话模块的数据同步失败
     */
    onSyncFailed: [
        error: V2NIMError
    ];
    /**
     * 会话被创建
     */
    onConversationCreated: [
        conversation: V2NIMConversation
    ];
    /**
     * 会话被删除
     */
    onConversationDeleted: [
        conversationIds: string[]
    ];
    /**
     * 会话有更新
     *
     * 注: 诸如置顶, 免打扰更新, 扩展字段更新, 名称头像更新, 未读数变更等操作都会触发这个事件
     */
    onConversationChanged: [
        conversationList: V2NIMConversation[]
    ];
    /**
     * 总未读数发生变化
     */
    onTotalUnreadCountChanged: [
        unreadCount: number
    ];
    /**
     * 指定过滤条件的未读数发生变化
     */
    onUnreadCountChangedByFilter: [
        filter: V2NIMConversationFilter,
        unreadCount: number
    ];
    /**
     * - 账号多端登录会话已读时间戳标记通知
     * - 账号A登录设备D1, D2,  D1会话已读时间戳标记，同步到D2成员
     */
    onConversationReadTimeUpdated: [
        conversationId: string,
        readTime: number
    ];
}
/**
 * 会话类型的枚举
 */
export declare enum V2NIMConversationType {
    /** 未知 */
    V2NIM_CONVERSATION_TYPE_UNKNOWN = 0,
    /** 单聊 */
    V2NIM_CONVERSATION_TYPE_P2P = 1,
    /** 群聊 */
    V2NIM_CONVERSATION_TYPE_TEAM = 2,
    /** 超大群 */
    V2NIM_CONVERSATION_TYPE_SUPER_TEAM = 3
}
export interface V2NIMConversationOption {
    /**
     * 查询的会话类型
     *
     * 注: undefined 或者 [] 空数组. 均表示这个条件不生效
     */
    conversationTypes?: V2NIMConversationType[];
    /**
     * 是否仅查询包含未读数的会话. 默认 false
     *
     * 注: false 不限制, 可查询所有的会话. true 只查询包含未读数的会话.
     */
    onlyUnread?: boolean;
    /**
     * 会话分组
     *
     * 注: undefined 表示条件不生效. 而 [] 空数组表示查询不存在分组的会话
     */
    conversationGroupIds?: string[];
}
/**
 * v2 会话结构
 */
export interface V2NIMConversation {
    /**
     * 会话 id
     */
    readonly conversationId: string;
    /**
     * 会话类型
     */
    readonly type: V2NIMConversationType;
    /**
     * 会话名称. 拼接字段
     */
    readonly name?: string;
    /**
     * 头像. 拼接字段
     */
    readonly avatar?: string;
    /**
     * 是否免打扰. 拼接字段
     */
    readonly mute?: boolean;
    /**
     * 是否置顶
     */
    readonly stickTop: boolean;
    /**
     * 会话分组
     */
    readonly groupIds?: string[];
    /**
     * 本地扩展
     */
    readonly localExtension?: string;
    /**
     * 服务端扩展信息
     */
    readonly serverExtension: string;
    /**
     * 会话中最新的消息
     */
    readonly lastMessage?: V2NIMLastMessage;
    /**
     * 撤回通知.
     *
     * 注: 当消息状态为撤回时, lastMessage 为空, 可以参考这个撤回的通知.
     */
    /**
     * 会话的未读消息计数
     */
    readonly unreadCount: number;
    /**
     * 排序时间戳
     */
    readonly sortOrder: number;
    /**
     * 会话创建时间戳
     */
    readonly createTime: number;
    /**
     * 更新时间戳
     */
    readonly updateTime: number;
}
export interface V2NIMConversationResult {
    /**
     * 下一页起点的偏移量
     */
    offset: number;
    /**
     * 数据是否已拉取完毕
     *
     * 注: finished 为 true 代表数据已经拉取完毕, offset 也将返回 0
     */
    finished: boolean;
    /**
     * 会话列表
     */
    conversationList: V2NIMConversation[];
}
export interface V2NIMConversationConfig extends NIMServiceConfig {
}
/**
 * 会话 ID 工具类
 *
 * @example
 * ```typescript
 * nim.conversationIdUtil
 * ```
 */
export interface V2NIMConversationIdUtil {
    /**
     * 构造点对点会话ID
     *
     * @param accountId 对方的账号 id
     * @returns 会话 id
     *
     * @example
     * ```typescript
     * const conversationId = nim.conversationIdUtil.p2pConversationId('ACCOUND_ID')
     *
     * // conversationId usage, for example
     * const conversation = await nim.conversationService.createConversation(conversationId)
     * ```
     */
    p2pConversationId(accountId: string): string;
    /**
     * 构造群会话ID
     *
     * @param teamId 群 id
     * @returns 会话 id
     *
     * @example
     * ```typescript
     * const conversationId = nim.conversationIdUtil.teamConversationId('TEAM_ID')
     *
     * // conversationId usage, for example
     * const conversation = await nim.conversationService.createConversation(conversationId)
     * ```
     */
    teamConversationId(teamId: string): string;
    /**
     * 构造超大群会话ID
     *
     * @param superTeamId 超大群 id
     * @returns 会话 id
     *
     * @example
     * ```typescript
     * const conversationId = nim.conversationIdUtil.superTeamConversationId('SUPER_TEAM_ID')
     *
     * // conversationId usage, for example
     * const conversation = await nim.conversationService.createConversation(conversationId)
     * ```
     */
    superTeamConversationId(superTeamId: string): string;
    /**
     * 解析会话类型
     *
     * @param conversationId 会话 id
     * @returns 会话类型
     *
     * @example
     * ```typescript
     * const conversationType = nim.conversationIdUtil.parseConversationType('CONVERSATION_ID')
     * ```
     */
    parseConversationType(conversationId: string): V2NIMConversationType;
    /**
     * 解析会话目标账号
     *
     * @param conversationId 会话 id
     * @returns 点对点会话返回对方账号 id; 群会话返回群 id; 超大群会话返回超大群 id
     *
     * @example
     * ```typescript
     * const targetId = nim.conversationIdUtil.parseConversationTargetId('CONVERSATION_ID')
     * ```
     */
    parseConversationTargetId(conversationId: string): string;
}
export interface V2NIMConversationOperationResult {
    /**
     * 会话 id
     */
    conversationId: string;
    /**
     * 错误信息
     */
    error: V2NIMError;
}
/**
 * 专供会话使用的最后一条消息的结构
 */
export interface V2NIMLastMessage {
    /**
     * 消息状态. 正常, 已撤回, 已回溯
     */
    lastMessageState: V2NIMLastMessageState;
    /**
     * 最后一条消息的摘要
     */
    messageRefer: V2NIMMessageRefer;
    /**
     * 消息类型
     *
     * 注: 当消息状态为正常时, 该字段存在
     */
    messageType?: V2NIMMessageType;
    /**
     * 消息子类型
     *
     * 注: 当消息状态为正常时, 该字段存在
     */
    subType?: number;
    /**
     * 消息发送状态. 发送成功，发送失败，发送中。
     *
     * 注: 只有消息的发送方的本端存在这个字段
     */
    sendingState?: V2NIMMessageSendingState;
    /**
     * 消息的文本内容
     *
     * 注: 当消息状态为已撤回时, 该字段的含义是撤回通知的附言, postscript.
     */
    text?: string;
    /**
     * 消息附属附件
     *
     * 注: 当消息状态为正常时, 该字段存在
     */
    attachment?: Partial<V2NIMMessageAttachment>;
    /**
     * 消息撤回者账号
     *
     * 注: 当消息状态为已撤回时，该字段存在
     */
    revokeAccountId?: string;
    /**
     * 消息撤回类型
     */
    revokeType?: V2NIMMessageRevokeType;
    /**
     * 消息服务端扩展
     */
    serverExtension?: string;
    /**
     * 第三方回调传入的自定义扩展字段
     */
    callbackExtension?: string;
    /**
     * 该消息的发送者名称
     *
     * 注1: 若最后一条消息被撤回, 则为撤回者相关名称.
     *
     * 注2: 该名称的规则优先级: 该好友的备注(若是好友关系) > 该群成员的昵称(若是群消息) > 该用户的昵称.
     *
     * 注3: 若当前账号就是发送者, 那么这个字段不存在.
     */
    senderName?: string;
}
export declare enum V2NIMLastMessageState {
    /** 正常状态 */
    V2NIM_MESSAGE_STATUS_DEFAULT = 0,
    /** 已撤回 */
    V2NIM_MESSAGE_STATUS_REVOKE = 1,
    /**
     * 被回溯
     *
     * 注: 当会话的最新消息被删除时, 需要回溯找到此时真正的最新消息
     */
    V2NIM_MESSAGE_STATUS_BACKFILL = 2
}
