import { V2NIMChatroomMember, V2NIMChatroomMemberListResult, V2NIMChatroomMemberQueryOption, V2NIMChatroomMemberRole, V2NIMChatroomMemberRoleUpdateParams, V2NIMChatroomMessage, V2NIMChatroomMessageListOption, V2NIMChatroomSelfMemberUpdateParams, V2NIMChatroomTagMemberOption, V2NIMChatroomTagMessageOption, V2NIMChatroomTagsUpdateParams, V2NIMChatroomUpdateParams, V2NIMSendChatroomMessageParams, V2NIMSendChatroomMessageResult } from './types';
import { V2NIMChatroomInfo } from './V2NIMChatroomClient';
import { V2NIMLoginAuthType } from './loginTypes';
import { NIMEBaseServiceInterface, V2NIMAntispamConfig, V2NIMMessageCustomAttachmentParser } from '@nimsdk/base';
export interface V2NIMChatroomService extends NIMEBaseServiceInterface<V2NIMChatroomListener> {
    /**
     * 更新聊天室信息
     */
    updateChatroomInfo(updateParams: V2NIMChatroomUpdateParams, antispamConfig?: V2NIMAntispamConfig): Promise<void>;
    /**
     * 更新聊天室位置信息
     */
    updateChatroomLocationInfo(locationConfig: V2NIMChatroomLocationConfig): Promise<void>;
    /**
     * 更新聊天室标签
     */
    updateChatroomTags(updateParams: V2NIMChatroomTagsUpdateParams): Promise<void>;
    /**
     * 发送消息接口
     *
     * 注: 消息通过 chatroomClient.messageCreator 创建, 参见 V2NIMChatroomMessageCreator
     */
    sendMessage(message: V2NIMChatroomMessage, params?: V2NIMSendChatroomMessageParams, progress?: (percentage: number) => void): Promise<V2NIMSendChatroomMessageResult>;
    /**
     * 注册自定义消息附件解析器，解析 {@link V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM | V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM} 类消息的的附件
     *
     * 注: 可以注册多个解析器, 后注册的优先级高，优先派发. 一旦某一个解析器返回了一个合法的 attachment 附件对象(即携带 raw 属性的一个对象)，则不继续派发给下一个解析器.
     *
     * @param parser 解析器
     */
    registerCustomAttachmentParser(parser: V2NIMMessageCustomAttachmentParser): void;
    /**
     * 反注册自定义消息附件解析器
     *
     * 注: 要传递 registerCustomAttachmentParser 所注册的, 引用页相同的那个 parser 解析器, 才能正确反注册.
     *
     * @param parser 解析器函数
     */
    unregisterCustomAttachmentParser(parser: V2NIMMessageCustomAttachmentParser): void;
    /**
     * 取消文件类消息的附件上传
     *
     * 注: 若成功取消, 则算为消息发送失败处理
     *
     * @param message 需要取消附件上传的消息体
     */
    cancelMessageAttachmentUpload(message: V2NIMChatroomMessage): Promise<void>;
    /**
     * 查询历史消息
     *
     * @param option 查询条件
     */
    getMessageList(option: V2NIMChatroomMessageListOption): Promise<V2NIMChatroomMessage[]>;
    /**
     * 分页获取聊天室成员列表
     * @param option 参数
     */
    getMemberListByOption(option: V2NIMChatroomMemberQueryOption): Promise<V2NIMChatroomMemberListResult>;
    /**
     * 根据标签查询消息列表
     *
     * @param messageOption 查询参数
     */
    getMessageListByTag(messageOption: V2NIMChatroomTagMessageOption): Promise<V2NIMChatroomMessage[]>;
    /**
     * 更新聊天室成员角色
     */
    updateMemberRole(accountId: string, updateParams: V2NIMChatroomMemberRoleUpdateParams): Promise<void>;
    /**
     * 设置聊天室成员黑名单状态
     *
     * 注: 必须为创建者或者管理员才能设置. 如果目标是管理员，则仅创建者可以设置
     *
     * @param accountId 被操作的账号 ID
     * @param blocked 黑名单状态
     * @param notificationExtension 本次操作生成的通知中的扩展字段
     */
    setMemberBlockedStatus(accountId: string, blocked: boolean, notificationExtension?: string): Promise<void>;
    /**
     * 设置聊天室成员禁言状态
     *
     * 注: 必须为创建者或者管理员才能设置. 如果目标是管理员，则仅创建者可以设置
     *
     * @param accountId 被操作的账号 ID
     * @param chatBanned 禁言状态
     * @param notificationExtension 本次操作生成的通知中的扩展字段
     */
    setMemberChatBannedStatus(accountId: string, chatBanned: boolean, notificationExtension?: string): Promise<void>;
    /**
     * 设置成员临时禁言状态
     *
     * @param accountId 被操作的账号 ID
     * @param tempChatBannedDuration 设置临时禁言时长, 单位: 秒. 最大设置为 30 天. 取消则设置为 0
     * @param notificationEnabled 是否需要通知
     * @param notificationExtension 本次操作生成的通知中的扩展字段
     */
    setMemberTempChatBanned(accountId: string, tempChatBannedDuration: number, notificationEnabled: boolean, notificationExtension?: string): Promise<void>;
    /**
     * 更新自己在聊天室的成员信息
     *
     * @param updateParams 更新参数
     * @param antispamConfig 反垃圾配置
     */
    updateSelfMemberInfo(updateParams: V2NIMChatroomSelfMemberUpdateParams, antispamConfig?: V2NIMAntispamConfig): Promise<void>;
    /**
     * 根据账号列表查询成员信息
     *
     * 注: 单次查询不能超过 200 个
     *
     * @param accountIds 账号 ID 列表
     */
    getMemberByIds(accountIds: string[]): Promise<V2NIMChatroomMember[]>;
    /**
     * 踢出聊天室成员
     * @param accountId 被踢人的账号 id
     * @param notificationExtension 本次操作生成的通知中的扩展字段
     */
    kickMember(accountId: string, notificationExtension?: string): Promise<void>;
    /**
     * 按聊天室标签临时禁言
     *
     * 注: 只有管理员或创建者可以操作
     * @param params 参数
     */
    setTempChatBannedByTag(params: V2NIMChatroomTagTempChatBannedParams): Promise<void>;
    /**
     * 根据 tag 查询群成员列表
     *
     * @param option 参数
     */
    getMemberListByTag(option: V2NIMChatroomTagMemberOption): Promise<V2NIMChatroomMemberListResult>;
    /**
     * 查询某个标签下的成员人数
     * @param tag 标签
     */
    getMemberCountByTag(tag: string): Promise<number>;
}
/**
 * V2NIMChatroomService 上面的事件
 */
export type V2NIMChatroomListener = {
    /**
     * 本端发送消息状态回调
     *
     * 开发者通过监听 sendingState, 以及 attachmentUploadState 状态，可以实现消息发送状态的监听
     */
    onSendMessage: [
        message: V2NIMChatroomMessage
    ];
    /**
     * 收到新消息
     */
    onReceiveMessages: [
        messages: V2NIMChatroomMessage[]
    ];
    /**
     * 消息撤回回调
     *
     * @param messageClientId 被撤回的消息的 ID
     * @param messageTime 被撤回的消息的时间
     */
    onMessageRevokedNotification: [
        messageClientId: string,
        messageTime: number
    ];
    /**
     * 聊天室成员进入
     *
     * @param member 加入聊天室的用户
     */
    onChatroomMemberEnter: [
        member: V2NIMChatroomMember
    ];
    /**
     * 聊天室成员离开
     *
     * @param member 退出聊天室的用户
     */
    onChatroomMemberExit: [
        accountId: string
    ];
    /**
     * 成员角色更新
     */
    onChatroomMemberRoleUpdated: [
        previousRole: V2NIMChatroomMemberRole,
        currentMember: V2NIMChatroomMember
    ];
    /**
     * 成员信息更新
     */
    onChatroomMemberInfoUpdated: [
        member: V2NIMChatroomMember
    ];
    /**
     * 自己禁言状态变更
     *
     * @param chatBanned 禁言状态
     */
    onSelfChatBannedUpdated: [
        chatBanned: boolean
    ];
    /**
     * 自己的临时禁言状态变更
     *
     * @param tempChatBanned 临时禁言状态
     * @param tempChatBannedDuration 临时禁言时长
     */
    onSelfTempChatBannedUpdated: [
        tempChatBanned: boolean,
        tempChatBannedDuration: number
    ];
    /**
     * 聊天室信息更新
     *
     * @param chatroomInfo 更新后的聊天室信息
     */
    onChatroomInfoUpdated: [
        chatroomInfo: V2NIMChatroomInfo
    ];
    /**
     * 聊天室整体禁言状态更新。服务器 API。操作者必须是管理员或者创建者
     *
     * @param chatBanned 禁言状态
     */
    onChatroomChatBannedUpdated: [
        chatBanned: boolean
    ];
    /**
     * 更新角色标签
     */
    onChatroomTagsUpdated: [
        tags: Array<string>
    ];
};
export declare enum V2NIMChatroomStatus {
    /** 聊天室断开连接 */
    V2NIM_CHATROOM_STATUS_DISCONNECTED = 0,
    /** 聊天室已连接 */
    V2NIM_CHATROOM_STATUS_WAITING = 1,
    /** 聊天室连接过程中 */
    V2NIM_CHATROOM_STATUS_CONNECTING = 2,
    /** 聊天室等待重连 */
    V2NIM_CHATROOM_STATUS_CONNECTED = 3,
    /** 聊天室进入中 */
    V2NIM_CHATROOM_STATUS_ENTERING = 4,
    /** 聊天室已进入 */
    V2NIM_CHATROOM_STATUS_ENTERED = 5,
    /** 聊天室已退出 */
    V2NIM_CHATROOM_STATUS_EXITED = 6
}
/**
 * 新建实例时，传入 appkey
 *
 */
export interface V2NIMChatroomInitParams {
    /**
     * 应用 appkey
     */
    appkey: string;
    /**
     * 自定义客户端类型
     */
    customClientType?: number;
}
export interface V2NIMChatroomEnterParams {
    /**
     * 是否匿名。默认为 false
     *
     * 匿名模式不能发消息、只能收消息
     */
    anonymousMode?: boolean;
    /**
     * 账号ID
     *
     * 如果是匿名模式，可以不填，内部生成账号。
     */
    accountId?: string;
    /**
     * 静态 token。可以不填。不填时从 tokenProvider 获取
     */
    token?: string;
    /**
     * 进入聊天室的显示昵称
     */
    roomNick?: string;
    /**
     * 进入聊天室的头像
     */
    roomAvatar?: string;
    /**
     * 进入方法超时时间。默认为 30，单位为秒
     *
     * 超过该时间如果没有进入成功，则返回失败
     */
    timeout?: number;
    /**
     * 聊天室登录相关信息
     */
    loginOption?: V2NIMChatroomLoginOption;
    /**
     * 获取聊天室 link 地址
     */
    linkProvider: (roomId: string, accountId: string) => Promise<Array<string>>;
    /**
     * 用户扩展字段
     */
    serverExtension?: string;
    /**
     * 通知扩展字段
     */
    notificationExtension?: string;
    /**
     * 聊天室进入的标签
     */
    tagConfig?: V2NIMChatroomTagConfig;
    /**
     * 聊天室进入的位置信息配置
     */
    locationConfig?: V2NIMChatroomLocationConfig;
    /**
     * 用户反垃圾检测
     */
    antispamConfig?: V2NIMAntispamConfig;
}
export interface V2NIMChatroomTagConfig {
    /**
     * 通知标签
     */
    notifyTargetTags: string;
    /**
     * 登录标签
     */
    tags: string[];
}
export interface V2NIMChatroomLocationConfig {
    /**
     * 空间坐标信息
     */
    locationInfo: V2NIMLocationInfo;
    /**
     * 订阅的消息的距离
     */
    distance: number;
}
export interface V2NIMLocationInfo {
    /**
     * 空间坐标X
     */
    x?: number;
    /**
     * 空间坐标Y
     */
    y?: number;
    /**
     * 空间坐标Z
     */
    z?: number;
}
export interface V2NIMChatroomLoginOption {
    /**
     * 认证模式
     */
    authType?: V2NIMLoginAuthType;
    /**
     * token 提供回调
     */
    tokenProvider?: (appkey: string, roomId: string, accountId: string) => Promise<string>;
    /**
     * 在部分场景下，客户可能需要传输一些业务相关数据，则可采用该回调传输业务相关数据
     */
    loginExtensionProvider?: (appkey: string, roomId: string, accountId: string) => Promise<string>;
}
export interface V2NIMChatroomEnterInfo {
    /**
     * 进入聊天室的昵称
     */
    roomNick: string;
    /**
     * 进入聊天室的头像
     */
    roomAvatar: string;
    /**
     * 进入时间
     */
    enterTime: number;
    /**
     * 进入的终端类型
     */
    clientType: number;
}
/**
 * 标签临时禁言参数
 */
export interface V2NIMChatroomTagTempChatBannedParams {
    /**
     * 禁言的 tag
     */
    targetTag: string;
    /**
     * 消息的目标标签表达式，标签表达式
     * https://doc.commsease.com/messaging/docs/TMxOTI0MDA?platform=android#%E6%A0%87%E7%AD%BE%E8%A1%A8%E8%BE%BE%E5%BC%8F
     */
    notifyTargetTags?: string;
    /**
     * 禁言时长。单位秒。0表示取消
     */
    duration?: number;
    /**
     * 是否需要通知
     */
    notificationEnabled?: boolean;
    /**
     * 本次操作生成的通知中的扩展字段
     */
    notificationExtension?: string;
}
export interface NIMEModuleParamCloudStorageConfig {
    /**
     * NOS上传地址（直传）
     * Address of NOS upload (direct transfer)
     */
    commonUploadHost?: string;
    /**
     * NOS上传地址（分片）
     * Address of NOS upload (chunked transfer)
     */
    chunkUploadHost?: string;
    /**
     * 发送文件消息中文件的url的通配符地址，例：'https://{host}/{object}'
     * Wildcard address of the file URL in the file message, for example: 'https://{host}/{object}'.
     */
    uploadReplaceFormat?: string;
    /**
     * 接收到文件消息的替换模版
     * 这个是用来接到消息后，要按一定模式替换掉文件链接的。给予一个安全下载链接。
     * 例：'https://{bucket}-nosdn.netease.im/{object}'
     * The template for the URL of the received file of a file message
     * If a file messages is received, the URL of a file is replaced with a specified patten for a secured download URL
     * Example: 'https://{bucket}-nosdn.netease.im/{object}'
     */
    downloadUrl?: string;
    /**
     * 收到哪些host地址，需要替换成downloadUrl，例：收到nos.netease.com/{bucket}/{obj}
     * received host addresses are replaced with downloadUrl, exmaple, nos.netease.com/{bucket}/{obj}
     */
    downloadHostList?: string[];
    /**
     * 服务器下发的域名存在，并且对象前缀匹配成功，那么强行替换为`${protocol}${serverCdnDomain}/${decodePath.slice(prefixIndex)}`
     * If the CDN domain name exists and matches the prefix of an object, replace with `${protocol}${serverCdnDomain}/${decodePath.slice(prefixIndex)}`
     */
    nosCdnEnable?: boolean;
    /**
     * NOS 上传专用的 cdn 配置
     * Dedicated CDN settings for NOS upload
     */
    cdn?: {
        /**
         * 默认的下载域名
         * Default download domain name
         */
        defaultCdnDomain?: string;
        /**
         * 下载域名
         * Download domain name
         */
        cdnDomain?: string;
        /**
         * 桶名, 一般 NOS 默认为 "nim"
         * Bucket name, in most case, "nim" is used
         */
        bucket?: string;
        /**
         * 路径前缀，一般不需要填写
         * Prefix of an object, not required
         */
        objectNamePrefix?: string;
    };
    /**
     * amazon aws s3 sdk
     *
     * 注：若传入 s3 sdk 后，本 SDK 根据融合存储策略配置，可能会 new 创建出它的实例并使用它的实例方法进行上传/存储。
     * Note: if S3 SDK is specified, an instance is created and used for upload and storage using the new operator based on the converged storage configuration.
     */
    s3?: any;
    /**
     * localStorage 缓存的云存储配置的键名的前缀。默认叫 NIMClient
     * The prefix of a key of the cloud storage configuration of the localStorage cache. The default prefix is NIMClient.
  
     * 注: 举个例子，根据默认配置，策略缓存的键叫 'NIMClient-AllGrayscaleConfig'。
     * For example, by default, the key of the caching policy is called 'NIMClient-AllGrayscaleConfig'.
     */
    storageKeyPrefix?: string;
    /**
     * 是否需要开启融合存储整个策略。默认为 true
     * whether the converged storage is enabled. The default value is true
     * 注: 为 false 则不会进行 lbs 灰度开关和策略获取，直接退化到老的 nos 上传逻辑。
     * Note: if false, does not get the option and policy of the lbs gray release and the old NOS upload logic is used.
     */
    isNeedToGetUploadPolicyFromServer?: boolean;
}
export { V2NIMChatroomMember };
