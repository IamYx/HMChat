import { V2NIMChatroomMember } from './types';
import { V2NIMChatroomEnterParams, V2NIMChatroomInitParams, V2NIMChatroomService, V2NIMChatroomStatus } from './V2NIMChatroomService';
import { V2NIMChatroomMessageCreator } from './V2NIMChatroomMessageCreator';
import { V2NIMChatroomStorageService } from './V2NIMChatroomStorageService';
import { ArgumentMap } from '@nimsdk/vendor/Index';
import { V2NIMError } from '@nimsdk/base';
import { common } from '@kit.AbilityKit';
import { V2NIMChatroomQueueService } from './V2NIMChatroomQueueService';
export declare class V2NIMChatroomClient {
    /**
     * 新建聊天室实例
     * @param initParams 初始化参数
     *
     */
    static newInstance(t178: common.Context, u178: V2NIMChatroomInitParams): V2NIMChatroomClient;
    /**
     * 根据实例 ID 销毁聊天室实例
     * @param instanceId 实例 ID
     */
    static destroyInstance(s178: number): void;
    /**
     * 根据实例 ID 获取聊天室实例
     * @param instanceId 实例 ID
     */
    static getInstance(r178: number): V2NIMChatroomClient;
    /**
     * 获取所有聊天室实例
     */
    static getInstanceList(): V2NIMChatroomClient[];
    /**
     * 销毁所有聊天室实例
     */
    static destroyAll(): void;
    /**
     * 聊天室服务对象 chatroomService
     *
     * 通过该对象使用聊天室各项服务
     */
    chatroomService: V2NIMChatroomService;
    /**
     * 存储服务对象 storageService
     *
     * 通过该对象使用聊天室存储服务
     */
    storageService: V2NIMChatroomStorageService;
    /**
     * 聊天室消息创建工具 messageCreator
     *
     * 通过该对象创建聊天室消息
     */
    messageCreator: V2NIMChatroomMessageCreator;
    /**
     * 聊天室队列服务对象 queueService
     *
     * 通过改对象管理聊天室队列
     */
    queueService: V2NIMChatroomQueueService;
    /**
     * 进入聊天室
     *
     * @param roomId 聊天室 ID
     * @param enterParams 进入聊天室参数
     */
    enter(p178: string, q178: V2NIMChatroomEnterParams): Promise<V2NIMChatroomEnterResult>;
    /**
     * 退出聊天室
     */
    exit(): void;
    /**
     * 查询聊天室基本信息
     */
    getChatroomInfo(): V2NIMChatroomInfo | null;
    /**
     *  获取实例ID
     *
     *  @return 聊天室实例ID
     */
    getInstanceId(): number;
    /**
     * 监听聊天室事件
     *
     * 在聊天室实例上监听的方法有: onChatroomStatus, onChatroomEntered, onChatroomExited, onChatroomKicked
     *
     * @example
     * chatroom.on('onChatroomStatus', (status, error) => {})
     * ```
     */
    on<l178 extends keyof V2NIMChatroomClientListener>(m178: l178, n178: (...args: ArgumentMap<V2NIMChatroomClientListener>[Extract<l178, keyof V2NIMChatroomClientListener>]) => void, o178?: any): this;
    /**
     * 解除聊天室事件监听
     *
     * 在聊天室实例上监听的方法有: onChatroomStatus, onChatroomEntered, onChatroomExited, onChatroomKicked
     */
    off<g178 extends keyof V2NIMChatroomClientListener>(h178: g178, i178?: ((...args: ArgumentMap<V2NIMChatroomClientListener>[Extract<g178, keyof V2NIMChatroomClientListener>]) => void) | undefined, j178?: any, k178?: boolean | undefined): this;
}
/**
 * 聊天室的事件
 */
export interface V2NIMChatroomClientListener {
    /**
     * @param status 聊天室连接状态
     * @param error  断开时的错误信息
     */
    onChatroomStatus: [
        status: V2NIMChatroomStatus,
        error?: V2NIMError
    ];
    /**
     * 连接成功，进入聊天室
     */
    onChatroomEntered: [
    ];
    /**
     * 从登录保持态，退出聊天室
     *
     * @param error 错误信息
     */
    onChatroomExited: [
        error?: V2NIMError
    ];
    /**
     * 被踢出聊天室
     *
     * @param kickedInfo 被踢出的详细信息
     */
    onChatroomKicked: [
        kickedInfo: V2NIMChatroomKickedInfo
    ];
}
export interface V2NIMChatroomEnterResult {
    /**
     * 聊天室信息
     */
    chatroom: V2NIMChatroomInfo;
    /**
     * 用户信息
     */
    selfMember: V2NIMChatroomMember;
}
export interface V2NIMChatroomInfo {
    /**
     * 聊天室 ID
     */
    roomId: string;
    /**
     * 聊天室名称
     */
    roomName: string;
    /**
     * 聊天室公告
     */
    announcement: string;
    /**
     * 视频直播拉流地址
     */
    liveUrl: string;
    /**
     * 聊天室是否有效
     */
    isValidRoom: boolean;
    /**
     * 聊天室扩展字段
     */
    serverExtension: string;
    /**
     * 聊天室队列操作权限模式
     */
    queueLevelMode: V2NIMChatroomQueueLevelMode;
    /**
     * 聊天室创建者 ID
     */
    creatorAccountId: string;
    /**
     * 聊天室创建时间
     */
    createTime: number;
    /**
     * 聊天室当前在线人数
     */
    onlineUserCount: number;
    /**
     * 聊天室禁言状态
     */
    chatBanned: boolean;
}
export declare enum V2NIMChatroomQueueLevelMode {
    /**
     * 任何人都可以操作队列
     */
    V2NIM_CHATROOM_QUEUE_LEVEL_MODE_ANY = 0,
    /**
     * 只有管理员可以操作队列
     */
    V2NIM_CHATROOM_QUEUE_LEVEL_MODE_MANAGER = 1
}
export interface V2NIMChatroomKickedInfo {
    /**
     * 被踢原因
     */
    kickedReason: V2NIMChatroomKickedReason;
    /**
     * 被踢扩展字段
     */
    serverExtension: string;
}
/**
 * 被踢出聊天室的原因
 */
export declare enum V2NIMChatroomKickedReason {
    /**
     * 未知原因
     */
    V2NIM_CHATROOM_KICKED_REASON_UNKNOWN = -1,
    /**
     * 聊天室解散
     */
    V2NIM_CHATROOM_KICKED_REASON_CHATROOM_INVALID = 1,
    /**
     * 被管理员移除
     */
    V2NIM_CHATROOM_KICKED_REASON_BY_MANAGER = 2,
    /**
     * 被多端踢出
     */
    V2NIM_CHATROOM_KICKED_REASON_BY_CONFLICT_LOGIN = 3,
    /**
     * 静默被踢。表示这个链接已经废弃了n
     */
    V2NIM_CHATROOM_KICKED_REASON_SILENTLY = 4,
    /**
     * 被加入黑名单
     */
    V2NIM_CHATROOM_KICKED_REASON_BE_BLOCKED = 5
}
