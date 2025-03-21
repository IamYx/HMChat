import { NIMEBaseListener, NIMEBaseServiceInterface } from './types';
import { V2NIMUser } from './V2NIMUserService';
export interface V2NIMFriendService extends NIMEBaseServiceInterface<V2NIMFriendListener> {
    /**
     * 添加/申请好友
     * @param accountId 好友 ID
     * @param params 申请相关参数
     */
    addFriend(accountId: string, params: V2NIMFriendAddParams): Promise<void>;
    /**
     * 删除好友
     *
     * @param accountId 好友 ID
     * @param params 删除相关参数
     */
    deleteFriend(accountId: string, params: V2NIMFriendDeleteParams): Promise<void>;
    /**
     * 接受好友申请
     *
     * @param application 申请添加好友的相关信息
     */
    acceptAddApplication(application: V2NIMFriendAddApplication): Promise<void>;
    /**
     * 拒绝好友申请
     *
     * @param application 申请添加好友的相关信息
     * @param postscript 拒绝时的附言
     */
    rejectAddApplication(application: V2NIMFriendAddApplication, postscript?: string): Promise<void>;
    /**
     * 设置好友信息
     *
     * @param accountId 好友 ID
     * @param params  设置好友信息参数
     */
    setFriendInfo(accountId: string, params: V2NIMFriendSetParams): Promise<void>;
    /**
     * 获取好友列表
     */
    getFriendList(): Promise<V2NIMFriend[]>;
    /**
     * 根据账号 ID 获取好友信息
     *
     * @param accountIds 好友 ID 列表
     */
    getFriendByIds(accountIds: string[]): Promise<V2NIMFriend[]>;
    /**
     * 根据账号 ID 检查好友状态
     * @param accountIds 好友 ID列表
     */
    checkFriend(accountIds: string[]): Promise<V2NIMCheckFriendResult>;
    /**
     * 获取申请添加好友列表通知
     */
    getAddApplicationList(option: V2NIMFriendAddApplicationQueryOption): Promise<V2NIMFriendAddApplicationResult>;
    /**
     * 设置好友申请已读
     */
    setAddApplicationRead(): Promise<void>;
    /**
     * 获取未读的好友申请数量
     */
    getAddApplicationUnreadCount(): Promise<number>;
    /**
     * 根据关键词搜索好友
     * @param option 搜索好友的条件
     */
    searchFriendByOption(option: V2NIMFriendSearchOption): Promise<V2NIMFriend[]>;
    /**
     * 清空所有好友申请
     *
     */
    clearAllAddApplication(): Promise<void>;
    /**
     * 删除好友申请
     *
     * 注: 会删除相同申请者的所有申请记录
     *
     * @param applicationInfo 好友申请记录
     */
    deleteAddApplication(applicationInfo: V2NIMFriendAddApplication): Promise<void>;
}
export interface V2NIMFriend {
    /**
     * 好友 ID
     */
    readonly accountId: string;
    /**
     * 好友备注名
     */
    readonly alias?: string;
    /**
     * 服务器扩展字段
     */
    readonly serverExtension?: string;
    /**
     * 用户扩展字段
     */
    readonly customerExtension?: string;
    /**
     * 创建时间
     */
    readonly createTime?: number;
    /**
     * 更新时间
     */
    readonly updateTime?: number;
    /**
     * 好友来源。目前默认都是0
     */
    readonly source?: number;
    /**
     * 所关联的用户信息
     */
    readonly userProfile?: V2NIMUser;
}
export declare enum V2NIMFriendAddMode {
    /**
     * 直接加为好友
     */
    V2NIM_FRIEND_MODE_TYPE_ADD = 1,
    /**
     * 请求加为好友
     */
    V2NIM_FRIEND_MODE_TYPE_APPLY = 2
}
export interface V2NIMFriendAddParams {
    /**
     * 添加好友模式
     */
    addMode: V2NIMFriendAddMode;
    /**
     * 添加/申请好友时的附言
     */
    postscript: string;
}
/**
 * 申请添加好友的相关信息
 */
export interface V2NIMFriendAddApplication {
    /**
     * 申请者账户
     */
    applicantAccountId: string;
    /**
     * 被申请人账户
     */
    recipientAccountId: string;
    /**
     * 操作者账号
     */
    operatorAccountId: string;
    /**
     * 操作时添加的附言
     */
    postscript?: string;
    /**
     * 操作的状态
     */
    status: V2NIMFriendAddApplicationStatus;
    /**
     * 操作的时间
     */
    timestamp: number;
    /**
     * 是否已读
     */
    read: boolean;
}
/**
 * 对方拒绝你的添加好友申请信息
 */
export interface V2NIMFriendAddRejection {
    /**
     * 操作者 ID
     */
    operatorAccountId: string;
    /**
     * 拒绝时的附言
     */
    postscript?: string;
    /**
     * 操作的时间
     */
    timestamp: number;
}
/**
 * 好友添加操作的类型
 */
export declare enum V2NIMFriendAddApplicationType {
    /**
     * 自己收到了好友的添加申请
     */
    V2NIM_FRIEND_ADD_APPLICATION_TYPE_RECEIVED = 1,
    /**
     * 自己收到了对方拒绝我申请添加好友
     */
    V2NIM_FRIEND_ADD_APPLICATION_TYPE_REJECTED = 2
}
/**
 * 好友申请的处理状态
 */
export declare enum V2NIMFriendAddApplicationStatus {
    /**
     * 未处理
     */
    V2NIM_FRIEND_ADD_APPLICATION_STATUS_INIT = 0,
    /**
     * 已同意
     */
    V2NIM_FRIEND_ADD_APPLICATION_STATUS_AGREED = 1,
    /**
     * 已拒绝
     */
    V2NIM_FRIEND_ADD_APPLICATION_STATUS_REJECTED = 2,
    /**
     * 已过期
     */
    V2NIM_FRIEND_ADD_APPLICATION_STATUS_EXPIRED = 3,
    /**
     * 对方直接添加你为好友
     */
    V2NIM_FRIEND_ADD_APPLICATION_STATUS_DIRECT_ADD = 4
}
export declare enum V2NIMFriendDeletionType {
    /**
     * 自己删除好友
     */
    V2NIM_FRIEND_DELETION_TYPE_BY_SELF = 1,
    /**
     * 被好友删除
     */
    V2NIM_FRIEND_DELETION_TYPE_BY_PEER = 2
}
export interface V2NIMFriendDeleteParams {
    /**
     * 是否同步删除前设置的备注
     *
     * false：不同步删除备注
     * true: 同步删除备注
     */
    deleteAlias: boolean;
}
export interface V2NIMFriendSetParams {
    /**
     * 别名
     */
    alias?: string;
    /**
     * 扩展字段
     */
    serverExtension?: string;
}
/**
 * 申请添加好友相关信息查询参数
 */
export interface V2NIMFriendAddApplicationQueryOption {
    /**
     * 分页位置。首次查询传0，下一次传上一次返回的offset。查询结果不包含offset位置
     */
    offset?: number;
    /**
     * 查询数量, 默认50
     */
    limit?: number;
    /**
     * 要查询的状态列表
     * 如果列表为空，或者不传，表示查询所有状态
     */
    status: V2NIMFriendAddApplicationStatus[];
}
export interface V2NIMFriendAddApplicationResult {
    infos: V2NIMFriendAddApplication[];
    offset: number;
    finished: boolean;
}
export declare enum V2NIMFriendVerifyType {
    /**
     * 直接加为好友
     */
    V2NIM_FRIEND_VERIFY_TYPE_ADD = 1,
    /**
     * 请求加为好友
     */
    V2NIM_FRIEND_VERIFY_TYPE_APPLY = 2,
    /**
     * 同意添加好友
     */
    V2NIM_FRIEND_VERIFY_TYPE_ACCEPT = 3,
    /**
     * 拒绝添加好友
     */
    V2NIM_FRIEND_VERIFY_TYPE_REJECT = 4
}
/**
 * 消息模块的事件定义
 */
export interface V2NIMFriendListener extends NIMEBaseListener {
    /**
     * 已添加好友
     */
    onFriendAdded: [
        friend: V2NIMFriend
    ];
    /**
     * 已删除好友
     */
    onFriendDeleted: [
        accountId: string,
        deletionType: V2NIMFriendDeletionType
    ];
    /**
     * 收到好友申请
     */
    onFriendAddApplication: [
        application: V2NIMFriendAddApplication
    ];
    /**
     * 好友申请被拒绝的通知
     */
    onFriendAddRejected: [
        rejection: V2NIMFriendAddRejection
    ];
    /**
     * 好友信息更新
     */
    onFriendInfoChanged: [
        friend: V2NIMFriend
    ];
}
export interface V2NIMCheckFriendResult {
    [accountId: string]: boolean;
}
export interface V2NIMFriendSearchOption {
    /**
     * 查询的关键词，默认搜索好友备注。可以指定是否同时搜索用户账号
     */
    keyword: string;
    /**
     * 是否检索昵称。默认为 true
     */
    searchAlias?: boolean;
    /**
     * 是否同时搜索用户账号。默认值为 false
     */
    searchAccountId?: boolean;
}
