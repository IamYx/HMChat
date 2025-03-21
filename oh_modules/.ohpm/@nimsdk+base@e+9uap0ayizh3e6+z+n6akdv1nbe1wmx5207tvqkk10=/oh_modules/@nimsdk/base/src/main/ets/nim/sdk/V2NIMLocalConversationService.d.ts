import { NIMEBaseListener, NIMEBaseServiceInterface, V2NIMError } from './types';
import { V2NIMConversationType, V2NIMLastMessage } from './V2NIMConversationService';
import { NIMServiceConfig } from './V2NIMInterface';
export interface V2NIMLocalConversationService extends NIMEBaseServiceInterface<V2NIMLocalConversationListener> {
    /**
     * 获取本地会话列表
     *
     * @param offset 分页偏移量. 首页应传 0, 其他页数据使用返回的 offset
     * @param limit 分页拉取数量，不建议超过 100
     *
     * @example
     * ```typescript
     * const { offset, finished, conversationList } = await nim.localConversationService.getConversationList(0, 100)
     * ```
     */
    getConversationList(offset: number, limit: number): Promise<V2NIMLocalConversationResult>;
    /**
     * 获取本地会话列表. 可以指定筛选条件，按会话类型，未读等
     *
     * @param offset 会话标记. 首页应传 0, 其他页数据使用返回的 offset
     * @param limit 分页拉取数量, 不建议超过100
     * @param option 查询选项
     *
     * @example
     * ```typescript
     * const { offset, finished, conversationList } = await nim.localConversationService.getConversationListByOption(0, 100, {
     *   conversationTypes: [V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P]
     *   onlyUnread: true,
     * })
     * ```
     */
    getConversationListByOption(offset: number, limit: number, option: V2NIMLocalConversationOption): Promise<V2NIMLocalConversationResult>;
    /**
     * 根据会话 id 获取单条本地会话
     *
     * @param conversationId 会话 id
     *
     * @example
     * ```typescript
     * const data = await nim.localConversationService.getConversation("TARGET_CONVERSATION_ID")
     * ```
     */
    getConversation(conversationId: string): Promise<V2NIMLocalConversation>;
    /**
     * 根据会话 id 获取被你会话列表
     *
     * @param conversationIds 会话 id 列表
     *
     * @example
     * ```typescript
     * const datas = await nim.localConversationService.getConversationListByIds(["TARGET_CONVERSATION_ID", "TARGET_CONVERSATION_ID2"]])
     * ```
     */
    getConversationListByIds(conversationIds: string[]): Promise<V2NIMLocalConversation[]>;
    /**
     * 创建本地会话
     *
     * 注: 在操作成功且是有效的操作时, 会抛出事件 {@link V2NIMLocalConversationListener.onConversationCreated | V2NIMLocalConversationListener.onConversationCreated}
     *
     * @param conversationId 会话 id
     *
     * @example
     * ```typescript
     * const datas = await nim.localConversationService.createConversation("CONVERSATION_ID")
     * ```
     */
    createConversation(conversationId: string): Promise<V2NIMLocalConversation>;
    /**
     * 删除本地会话
     *
     * 注: 在操作成功且是有效的操作时, 会抛出事件 {@link V2NIMLocalConversationListener.onConversationDeleted | V2NIMLocalConversationListener.onConversationCreated}
     *
     * @param conversationId 会话 id
     * @param clearMessage 是否删除会话对应的历史消息. 默认为 false
     *
     * @example
     * ```typescript
     * await nim.localConversationService.deleteConversation("CONVERSATION_ID", true)
     * ```
     */
    deleteConversation(conversationId: string, clearMessage?: boolean): Promise<void>;
    /**
     * 批量删除本地会话
     *
     * 注: 在操作成功且是有效的操作时, 会抛出事件 {@link V2NIMLocalConversationListener.onConversationDeleted | V2NIMLocalConversationListener.onConversationDeleted}
     *
     * @param conversationIds 会话 id 列表
     * @param clearMessage 是否删除会话对应的历史消息. 默认为 false
     * @returns 返回操作失败的列表，列表的对象包含会话 id 以及错误信息.
     *
     * @example
     * ```typescript
     * await nim.localConversationService.deleteConversationListByIds(["CONVERSATION_ID1", "CONVERSATION_ID2"], true)
     * ```
     */
    deleteConversationListByIds(conversationIds: string[], clearMessage?: boolean): Promise<V2NIMLocalConversationOperationResult[]>;
    /**
     * 置顶本地会话
     *
     * 注: 在操作成功且是有效的操作时, 则触发事件 {@link V2NIMLocalConversationListener.onConversationChanged | V2NIMLocalConversationListener.onConversationChanged}
     *
     * @param conversationId 会话 id
     * @param stickTop 是否置顶. true: 置顶, false: 取消置顶.
     *
     * @example
     * ```typescript
     * await nim.localConversationService.stickTopConversation("CONVERSATION_ID", true)
     * ```
     */
    stickTopConversation(conversationId: string, stickTop: boolean): Promise<void>;
    /**
     * 更新本地会话
     *
     * 注: 在操作成功且是有效的操作时, 触发事件 {@link V2NIMLocalConversationListener.onConversationChanged | V2NIMLocalConversationListener.onConversationChanged}
     *
     * @param conversationId 会话 id
     * @param updateInfo 欲更新的信息
     *
     * @example
     * ```typescript
     * await nim.localConversationService.updateConversation("CONVERSATION_ID", {
     *  serverExtension: "This is a new text"
     * })
     * ```
     */
    /**
     * 更新本地会话的本地扩展字段
     *
     * 注: 在操作成功且是有效的操作时, 触发事件 {@link V2NIMLocalConversationListener.onConversationChanged | V2NIMLocalConversationListener.onConversationChanged}
     *
     * 注2: 字段只能存在内存里, 不能持久化存储. 登出或者重新初始化后 localExtension 都会再次成为空字符串.
     *
     * @param conversationId 会话 id
     * @param localExtension 本地扩展信息
     *
     * @example
     * ```typescript
     * await nim.localConversationService.updateConversationLocalExtension("CONVERSATION_ID", 'newLocalExtension!'})
     * ```
     */
    updateConversationLocalExtension(conversationId: string, localExtension: string): Promise<void>;
    /**
     * 获取全部本地会话的总的未读数
     *
     * @example
     * ```typescript
     * const count = nim.localConversationService.getTotalUnreadCount()
     * ```
     */
    getTotalUnreadCount(): number;
    /**
     * 根据 id 列表获取本地会话的未读数
     *
     * @param conversationIds 会话 id 列表
     *
     * @example
     * ```typescript
     * const counts = await nim.localConversationService.getUnreadCountByIds(["CONVERSATION_ID1,CONVERSATION_ID2"])
     * ```
     */
    getUnreadCountByIds(conversationIds: string[]): Promise<number>;
    /**
     * 根据过滤参数获取相应的未读信息
     *
     * @param filter 过滤条件
     */
    getUnreadCountByFilter(filter: V2NIMLocalConversationFilter): Promise<number>;
    /**
     * 清空所有本地会话总的未读数
     *
     * 注: 当该方法调用后，SDK 可能给开发者抛出以下的事件
     *
     * {@link V2NIMLocalConversationListener.onConversationChanged | V2NIMLocalConversationListener.onConversationChanged} <br/>
     * {@link V2NIMLocalConversationListener.onTotalUnreadCountChanged | V2NIMLocalConversationListener.onTotalUnreadCountChanged} <br/>
     * {@link V2NIMLocalConversationListener.onUnreadCountChangedByFilter | V2NIMLocalConversationListener.onUnreadCountChangedByFilter}
     */
    clearTotalUnreadCount(): Promise<void>;
    /**
     * 根据会话 id 列表清空相应本地会话的未读数
     *
     * 注: 当该方法调用后，SDK 可能给开发者抛出以下的事件
     *
     * {@link V2NIMLocalConversationListener.onConversationChanged | V2NIMLocalConversationListener.onConversationChanged} <br/>
     * {@link V2NIMLocalConversationListener.onTotalUnreadCountChanged | V2NIMLocalConversationListener.onTotalUnreadCountChanged} <br/>
     * {@link V2NIMLocalConversationListener.onUnreadCountChangedByFilter | V2NIMLocalConversationListener.onUnreadCountChangedByFilter}
     *
     * @param conversationIds 会话 id 列表
     * @returns 返回操作失败结果的列表
     */
    clearUnreadCountByIds(conversationIds: string[]): Promise<V2NIMLocalConversationOperationResult[]>;
    /**
     * 清除对应指定类型下的会话的未读数
     *
     * 注: 当该方法调用后，SDK 可能给开发者抛出以下的事件
     *
     * {@link V2NIMLocalConversationListener.onConversationChanged | V2NIMLocalConversationListener.onConversationChanged} <br/>
     * {@link V2NIMLocalConversationListener.onTotalUnreadCountChanged | V2NIMLocalConversationListener.onTotalUnreadCountChanged} <br/>
     * {@link V2NIMLocalConversationListener.onUnreadCountChangedByFilter | V2NIMLocalConversationListener.onUnreadCountChangedByFilter}
     *
     * @param types 指定的会话类型列表
     */
    clearUnreadCountByTypes(types: V2NIMConversationType[]): Promise<void>;
    /**
     * 订阅指定过滤条件的会话未读数变化
     *
     * 注1: 当订阅该条件后，该 filter 下的未读数发生变化时, 触发 {@link V2NIMLocalConversationListener.onUnreadCountChangedByFilter | V2NIMLocalConversationListener.onUnreadCountChangedByFilter} 事件
     *
     * 注2: 同一种 filter 只能被订阅一次, 第二次的调用不会有任何效果
     *
     * @param filter 过滤条件
     */
    subscribeUnreadCountByFilter(filter: V2NIMLocalConversationFilter): void;
    /**
     * 取消订阅指定过滤条件的会话未读变化
     *
     * @param filter 过滤条件
     */
    unsubscribeUnreadCountByFilter(filter: V2NIMLocalConversationFilter): void;
    /**
     * 获取会话已读时间戳
     *
     * 注：当前只支持P2P, 高级群，超大群
     */
    getConversationReadTime(conversationId: string): Promise<number>;
    /**
     * 标记会话已读时间戳
     * 注：当前只支持P2P，高级群， 超大群
     */
    markConversationRead(conversationId: string): Promise<number>;
}
export interface V2NIMLocalConversationFilter {
    /**
     * 会话类型列表
     *
     * 注: undefined, [] 空数组. 均表示这个条件不生效
     */
    conversationTypes?: V2NIMConversationType[];
    /**
     * 是否过滤免打扰的会话类型. 默认 false
     */
    ignoreMuted?: boolean;
}
export interface V2NIMLocalConversationUnreadCountChangedFilter extends V2NIMLocalConversationFilter {
    /**
     * 辅助的 filter 对象比较函数. 比对传入的 filter 和本次提供的 filter 是否相等
     *
     * @param filter 要比较的 filter
     */
    equals: (filter: V2NIMLocalConversationFilter) => boolean;
}
/**
 * 会话更新的入参
 */
export interface V2NIMLocalConversationUpdate {
}
/**
 * V2NIMLocalConversationService 模块监听事件定义
 */
export interface V2NIMLocalConversationListener extends NIMEBaseListener {
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
        conversation: V2NIMLocalConversation
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
     * 注: 诸如置顶, 免打扰更新, 扩展字段更新, 名称头像更新, 未读数变更，lastMessage 变更等操作都会触发这个事件
     */
    onConversationChanged: [
        conversationList: V2NIMLocalConversation[]
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
        filter: V2NIMLocalConversationFilter,
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
export interface V2NIMLocalConversationOption {
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
}
/**
 * v2 本地本地会话结构
 */
export interface V2NIMLocalConversation {
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
     * 本地扩展
     */
    readonly localExtension?: string;
    /**
     * 会话中最新的消息
     */
    readonly lastMessage?: V2NIMLastMessage;
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
export interface V2NIMLocalConversationResult {
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
    conversationList: V2NIMLocalConversation[];
}
export interface V2NIMLocalConversationConfig extends NIMServiceConfig {
}
export interface V2NIMLocalConversationOperationResult {
    /**
     * 会话 id
     */
    conversationId: string;
    /**
     * 错误信息
     */
    error: V2NIMError;
}
