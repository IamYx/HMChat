import { NIMEBaseServiceInterface } from '@nimsdk/base';
export interface V2NIMChatroomQueueService extends NIMEBaseServiceInterface<V2NIMChatroomQueueListener> {
    /**
     * 聊天室队列新增或更新元素
     * @param offerParams
     */
    queueOffer(offerParams: V2NIMChatroomQueueOfferParams): Promise<void>;
    /**
     * 取出头元素或者指定的元素
     */
    queuePoll(elementKey?: string): Promise<V2NIMChatroomQueueElement>;
    /**
     * 取出所有的元素
     */
    queueList(): Promise<V2NIMChatroomQueueElement[]>;
    /**
     * 查看对头元素, 不删除
     */
    queuePeek(): Promise<V2NIMChatroomQueueElement>;
    /**
     * 清空队列
     */
    queueDrop(): Promise<void>;
    /**
     * 初始化队列
     *
     * @param size 队列长度限制。长度限制为 0-1000
     */
    queueInit(size: number): Promise<void>;
    /**
     * 批量更新队列元素
     *
     * @param elements 批量要更新的元素
     * @param notificationEnabled 是否发送广播通知. 默认 true
     * @param notificationExtension 本操作的扩展字段.
     * @returns 不存在的元素 key 列表
     */
    queueBatchUpdate(elements: V2NIMChatroomQueueElement[], notificationEnabled?: boolean, notificationExtension?: string): Promise<string[]>;
}
export interface V2NIMChatroomQueueOfferParams {
    /**
     * 元素唯一 key
     */
    elementKey: string;
    /**
     * 元素内容
     */
    elementValue: string;
    /**
     * 元素是否瞬态。默认值为 false
     *
     * - true: 当前元素所属的成员退出或者掉线时，同步删除元素
     * - false: 当前元素所属的成员退出或者掉线时，不删除元素
     */
    transient?: boolean;
    /**
     * 元素所属账号
     */
    elementOwnerAccountId?: string;
}
/**
 * 消息模块的事件定义
 */
export type V2NIMChatroomQueueListener = {
    /**
     * 聊天室新增队列元素
     */
    onChatroomQueueOffered: [
        element: V2NIMChatroomQueueElement
    ];
    /**
     * 聊天室删除队列元素
     */
    onChatroomQueuePolled: [
        element: V2NIMChatroomQueueElement
    ];
    /**
     * 聊天室清空队列元素
     */
    onChatroomQueueDropped: [
    ];
    /**
     * 聊天室清理部分队列元素
     */
    onChatroomQueuePartCleared: [
        elements: V2NIMChatroomQueueElement[]
    ];
    /**
     * 聊天室批量更新元素
     */
    onChatroomQueueBatchUpdated: [
        elements: V2NIMChatroomQueueElement[]
    ];
    /**
     * 聊天室批量新增元素
     */
    onChatroomQueueBatchOffered: [
        elements: V2NIMChatroomQueueElement[]
    ];
};
export declare enum V2NIMChatroomQueueChangeType {
    /** 未知 */
    V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_UNKNOWN = 0,
    /** 新增队列元素 */
    V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_OFFER = 1,
    /** 删除队列元素 */
    V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_POLL = 2,
    /** 清空队列元素 */
    V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_DROP = 3,
    /** 部分清理元素 */
    V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_PARTCLEAR = 4,
    /** 批量更新元素 */
    V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_BATCH_UPDATE = 5,
    /** 批量新增元素 */
    V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_BATCH_OFFER = 6
}
export interface V2NIMChatroomQueueElement {
    /**
     * 队列元素 key
     *
     * 注: 中文不建议超过 64 个字符，英文不建议超过 128 个字符
     */
    key: string;
    /**
     * 队列元素 value
     *
     * 注: 中文不建议超过 64 个字符，英文不建议超过 128 个字符
     */
    value: string;
    /**
     * 该元素所属的账号
     */
    accountId?: string;
    /**
     * 该元素所属的账号的昵称
     */
    nick?: string;
}
