import { NIMEBaseListener, NIMEBaseServiceInterface } from './types';
export interface V2NIMUserService extends NIMEBaseServiceInterface<V2NIMUserListener> {
    /**
     * 根据用户账号列表获取用户资料
     *
     * @param accountIds 用户 Id 列表。最大为 150 个
     */
    getUserList(accountIds: string[]): Promise<V2NIMUser[]>;
    /**
     * 根据用户账号列表获取用户资料-从云端获取
     *
     * 注: 其结果会更新本地数据, 建议在需要实时感知用户最新的信息的场景下使用
     *
     * @param accountIds 用户 Id 列表。最大为 150 个
     */
    getUserListFromCloud(accountIds: string[]): Promise<V2NIMUser[]>;
    /**
     * 更新自己的用户资料。调用该 API 后，会触发 onUserProfileChanged 事件
     *
     * @param updateParams 更新参数
     */
    updateSelfUserProfile(updateParams: V2NIMUserUpdateParams): Promise<void>;
    /**
     * 添加用户到黑名单中
     *
     * @param accountId 用户 Id
     */
    addUserToBlockList(accountId: string): Promise<void>;
    /**
     * 从黑名单中移除用户
     *
     * @param accountId 用户 Id
     */
    removeUserFromBlockList(accountId: string): Promise<void>;
    /**
     * 获取黑名单列表
     */
    getBlockList(): Promise<string[]>;
    /**
     * 根据关键词搜索用户信息
     *
     * @param option 搜索选项
     */
    searchUserByOption(option: V2NIMUserSearchOption): Promise<V2NIMUser[]>;
}
/**
 * 用户资料
 */
export interface V2NIMUser {
    /**
     * 账号 id
     */
    readonly accountId: string;
    /**
     * 用户昵称
     */
    readonly name: string;
    /**
     * 用户头像图片地址
     */
    readonly avatar?: string;
    /**
     * 用户签名
     */
    readonly sign?: string;
    /**
     * 用户邮箱
     */
    readonly email?: string;
    /**
     * 用户生日
     */
    readonly birthday?: string;
    /**
     * 用户手机号。
     *
     * 长度限制 32 字符，非中国大陆手机号码需要填写国家代码
     */
    readonly mobile?: string;
    /**
     * 性别
     */
    readonly gender?: number;
    /**
     * 扩展字段
     */
    readonly serverExtension?: string;
    /**
     * 创建时间
     */
    readonly createTime: number;
    /**
     * 更新时间
     */
    readonly updateTime?: number;
}
/**
 * 用户资料更新参数
 */
export interface V2NIMUserUpdateParams {
    /**
     * 用户昵称
     */
    name?: string;
    /**
     * 用户头像图片地址
     */
    avatar?: string;
    /**
     * 用户签名
     */
    sign?: string;
    /**
     * 用户邮箱
     */
    email?: string;
    /**
     * 用户生日
     */
    birthday?: string;
    /**
     * 用户手机号。
     *
     * 长度限制 32 字符，非中国大陆手机号码需要填写国家代码
     */
    mobile?: string;
    /**
     * 性别
     */
    gender?: number;
    /**
     * 扩展字段
     */
    serverExtension?: string;
}
/**
 * 用户信息搜索相关选项参数
 */
export interface V2NIMUserSearchOption {
    /**
     * 搜索关键词，默认搜索用户昵称，可以指定是否同时搜索用户账户，手机号
     */
    keyword: string;
    /**
     * 是否搜索用户昵称，默认为 true
     */
    searchName?: boolean;
    /**
     * 是否搜索用户账号，默认为 false
     */
    searchAccountId?: boolean;
    /**
     * 是否搜索手机号，默认为 false
     */
    searchMobile?: boolean;
}
/**
 * 消息模块的事件定义
 */
export interface V2NIMUserListener extends NIMEBaseListener {
    /**
     * 收到新消息
     */
    onUserProfileChanged: [
        users: V2NIMUser[]
    ];
    /**
     * 黑名单添加通知
     */
    onBlockListAdded: [
        user: V2NIMUser
    ];
    /**
     * 黑名单删除通知
     */
    onBlockListRemoved: [
        accountId: string
    ];
}
