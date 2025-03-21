import { V2NIMClientAntispamResult, V2NIMMessageAntispamConfig, V2NIMMessageAttachment, V2NIMMessageAttachmentUploadState, V2NIMMessageAudioAttachment, V2NIMMessageFileAttachment, V2NIMMessageImageAttachment, V2NIMMessageLocationAttachment, V2NIMMessageRouteConfig, V2NIMMessageSendingState, V2NIMMessageType, V2NIMMessageVideoAttachment } from '@nimsdk/base';
import { V2NIMQueryDirection } from '@nimsdk/base';
import { V2NIMChatroomQueueChangeType } from './V2NIMChatroomQueueService';
import { V2NIMChatroomEnterInfo, V2NIMLocationInfo } from './V2NIMChatroomService';
export declare const NIMChatroomServiceNames: string[];
export type NIMChatroomServiceName = typeof NIMChatroomServiceNames[number];
/**
 * V2NIMChatroomMember
 */
export type V2NIMChatroomMember = {
    /**
     * 聊天室ID
     */
    roomId: string;
    /**
     * 成员账号 ID
     */
    accountId: string;
    /**
     * 聊天室成员角色类型
     */
    memberRole: V2NIMChatroomMemberRole;
    /**
     * 成员等级
     *
     * 注: 0 表示未设置
     */
    memberLevel?: number;
    /**
     * 进入聊天室后显示的昵称
     */
    roomNick?: string;
    /**
     * 进入聊天室后显示的头像
     */
    roomAvatar?: string;
    /**
     * 成员扩展字段
     */
    serverExtension?: string;
    /**
     * 用户是否在线
     */
    isOnline: boolean;
    /**
     * 是否在黑名单列表中
     */
    blocked: boolean;
    /**
     * 是否禁言
     */
    chatBanned: boolean;
    /**
     * 是否临时禁言
     */
    tempChatBanned: boolean;
    /**
     * 临时禁言的时长. 单位: 秒
     */
    tempChatBannedDuration: number;
    /**
     * 登录标签
     */
    tags?: string;
    /**
     * 登录登出通知标签.
     */
    notifyTargetTags?: string;
    /**
     * 用户进入聊天室的时间点.
     */
    enterTime?: number;
    /**
     * 更新时间
     */
    updateTime: number;
    /**
     * 是否有效
     */
    valid: boolean;
    /**
     * 是多端登录信息，同一个账号可以登录多个终端，多个终端同时在线
     */
    multiEnterInfo: V2NIMChatroomEnterInfo[];
};
export type V2NIMChatroomMemberQueryOption = {
    /**
     * 成员类型
     */
    memberRoles?: V2NIMChatroomMemberRole[];
    /**
     * 是否只返回黑名单成员. 默认为 false
     */
    onlyBlocked?: boolean;
    /**
     * 是否只返回禁言用户. 默认为 false
     */
    onlyChatBanned?: boolean;
    /**
     * 是否只返回在线成员. 默认为 false
     */
    onlyOnline?: boolean;
    /**
     * 分页偏移量。默认为 "", 代表不限制
     */
    pageToken: string;
    /**
     * 分页一页查询数量. 默认为 100
     */
    limit: number;
};
/**
 * 聊天室成员角色类型
 */
export declare enum V2NIMChatroomMemberRole {
    /**
     * 普通成员
     */
    V2NIM_CHATROOM_MEMBER_ROLE_NORMAL = 0,
    /**
     * 创建者
     */
    V2NIM_CHATROOM_MEMBER_ROLE_CREATOR = 1,
    /**
     * 管理员
     */
    V2NIM_CHATROOM_MEMBER_ROLE_MANAGER = 2,
    /**
     * 普通游客
     */
    V2NIM_CHATROOM_MEMBER_ROLE_NORMAL_GUEST = 3,
    /**
     * 匿名游客
     */
    V2NIM_CHATROOM_MEMBER_ROLE_ANONYMOUS_GUEST = 4,
    /**
     * 虚构用户
     */
    V2NIM_CHATROOM_MEMBER_ROLE_VIRTUAL = 5
}
export type V2NIMChatroomMemberListResult = {
    /**
     * 下一次查询的偏移量
     */
    pageToken: string;
    /**
     * 数据是否拉取完毕
     */
    finished: boolean;
    /**
     * 成员列表
     */
    memberList: V2NIMChatroomMember[];
};
export type V2NIMChatroomMemberRoleUpdateParams = {
    /**
     * 设置的成员角色
     *
     * 可以将普通游客， 普通成员设置为管理员. 只能创建者操作
     * 可以将普通游客设置为普通成员. 管理员和创建者均可操作
     * 可以将普通成员设置为普通游客. 管理员和创建者均可操作
     * 可以将管理员设置为普通成员或普通游客. 只能创建者操作
     * 不能操作虚构用户与匿名游客, 设置会报错
     */
    memberRole: V2NIMChatroomMemberRole;
    /**
     * 设置用户等级
     */
    memberLevel?: number;
    /**
     * 本次操作生成的通知中的扩展字段
     */
    notificationExtension?: string;
};
export type V2NIMChatroomSelfMemberUpdateParams = {
    /**
     * 聊天室显示的昵称
     *
     * 注: 不传此参数表示不更新. 但是传了空串 "", 会返回参数错误
     */
    roomNick?: string;
    /**
     * 聊天室显示的头像
     *
     * 注: 不传此参数表示不更新
     */
    roomAvatar?: string;
    /**
     * 成员扩展字段
     */
    serverExtension?: string;
    /**
     * 是否需要通知. 默认为 true
     */
    notificationEnabled?: boolean;
    /**
     * 本次操作生成的通知中的扩展字段
     */
    notificationExtension?: string;
    /**
     * 是否更新信息持久化存储, 只针对固定成员身份生效. 默认为 false
     */
    persistence?: boolean;
};
export type V2NIMChatroomTagMemberOption = {
    /**
     * 查询的tag
     */
    tag: string;
    /**
     * 分页参数
     */
    pageToken?: string;
    /**
     * 每次查询条数. 默认100
     */
    limit?: number;
};
/**
 * Info
 */
export interface V2NIMChatroomUpdateParams {
    /**
     * 聊天室名称
     */
    roomName?: string;
    /**
     * 聊天室公告
     */
    announcement?: string;
    /**
     * 聊天室直播地址
     */
    liveUrl?: string;
    /**
     * 聊天室扩展字段
     */
    serverExtension?: string;
    /**
     * 是否需要通知
     */
    notificationEnabled?: boolean;
    /**
     * 本次操作生成的通知中的扩展字段
     */
    notificationExtension?: string;
}
export interface V2NIMChatroomTagsUpdateParams {
    /**
     * 标签，可以设置多个。如果传空，或者传入空数组，会删除原有标签
     */
    tags?: string[];
    /**
     * 消息的目标标签表达式
     */
    notifyTargetTags?: string;
    /**
     * 是否需要通知。默认值为 true
     */
    notificationEnabled?: boolean;
    /**
     * 本次操作生成的通知中的扩展字段
     */
    notificationExtension?: string;
}
export declare enum V2NIMChatroomMessageNotificationType {
    /**
     * 成员进入聊天室
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_ENTER = 0,
    /**
     * 成员退出聊天室
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_EXIT = 1,
    /**
     * 成员被加入黑名单
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_BLOCK_ADDED = 2,
    /**
     * 成员被移除黑名单
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_BLOCK_REMOVED = 3,
    /**
     * 成员被禁言
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_CHAT_BANNED_ADDED = 4,
    /**
     * 成员取消禁言
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_CHAT_BANNED_REMOVED = 5,
    /**
     * 聊天室信息更新
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_ROOM_INFO_UPDATED = 6,
    /**
     * 成员被踢
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_KICKED = 7,
    /**
     * 成员临时禁言
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_TEMP_CHAT_BANNED_ADDED = 8,
    /**
     * 成员解除临时禁言
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_TEMP_CHAT_BANNED_REMOVED = 9,
    /**
     * 成员信息更新（nick/avatar/extension）
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_INFO_UPDATED = 10,
    /**
     * 麦序队列有变更
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_QUEUE_CHANGE = 11,
    /**
     * 聊天室被禁言. 仅创建者和管理员可以发消息
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_CHAT_BANNED = 12,
    /**
     * 聊天室解除禁言
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_CHAT_BANNED_REMOVED = 13,
    /**
     * 聊天室新增标签禁言，包括的字段是muteDuration、targetTag、operator、opeNick字段
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_ADDED = 14,
    /**
     * 聊天室移除标签禁言，包括的字段是muteDuration、targetTag、operator、opeNick字段
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_REMOVED = 15,
    /**
     * 聊天室消息撤回，包括的字段是operator、target、msgTime、msgId、ext字段
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MESSAGE_REVOKE = 16,
    /**
     * 聊天室标签更新
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAGS_UPDATE = 17,
    /**
     * 聊天室成员角色更新
     */
    V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_ROLE_UPDATE = 18
}
export interface V2NIMChatroomNotificationAttachment extends V2NIMMessageAttachment {
    /**
     * 通知类型
     */
    type: V2NIMChatroomMessageNotificationType;
    /**
     * 被操作的成员账号列表
     */
    targetIds?: string[];
    /**
     * 被操作成员的昵称列表
     */
    targetNicks?: string;
    /**
     * 被操作的标签
     */
    targetTag?: string;
    /**
     * 操作者
     */
    operatorId?: string;
    /**
     * 操作者昵称
     */
    operatorNick?: string;
    /**
     * 扩展字段
     */
    notificationExtension?: string;
    /**
     * 更新后的标签
     */
    tags?: string[];
}
export interface V2NIMChatroomMessageRevokeNotificationAttachment extends V2NIMChatroomNotificationAttachment {
    /**
     * 撤回的消息 id
     */
    messageClientId?: string;
    /**
     * 撤回的消息的时间
     */
    messageTime?: string;
}
export interface V2NIMChatroomQueueNotificationAttachment extends V2NIMChatroomNotificationAttachment {
    /**
     * 队列变更的内容
     */
    keyValues?: {
        [key: string]: string;
    }[];
    /**
     * 队列更新类型
     */
    queueChangeType?: V2NIMChatroomQueueChangeType;
}
export interface V2NIMChatroomChatBannedNotificationAttachment extends V2NIMChatroomNotificationAttachment {
    /**
     * 成员是否被禁言
     */
    chatBanned?: boolean;
    /**
     * 成员是否被临时禁言
     */
    tempChatBanned?: boolean;
    /**
     * 临时禁言的时长
     */
    tempChatBannedDuration?: number;
}
export interface V2NIMChatroomMemberRoleUpdateAttachment extends V2NIMChatroomNotificationAttachment {
    /**
     * 之前的角色类型
     */
    previousRole: V2NIMChatroomMemberRole;
    /**
     * 当前的成员信息
     */
    currentMember: V2NIMChatroomMember;
}
export interface V2NIMChatroomMemberEnterNotificationAttachment extends V2NIMChatroomNotificationAttachment {
    /**
     * 成员是否被禁言
     */
    chatBanned?: boolean;
    /**
     * 成员是否被临时禁言
     */
    tempChatBanned?: boolean;
    /**
     * 临时禁言的时长
     */
    tempChatBannedDuration?: number;
}
export type V2NIMChatroomMessageConfig = {
    /**
     * 是否需要在服务端保存历史消息. 默认 true
     */
    historyEnabled?: boolean;
    /**
     * 是否是高优先级消息. 默认 false
     */
    highPriority?: boolean;
};
export interface V2NIMChatroomMessage {
    /**
     * 客户端消息ID。可以根据该字段确定消息是否重复
     */
    messageClientId: string;
    /**
     * 发送者的客户端类型
     */
    senderClientType: number;
    /**
     * 消息创建时间，由服务器返回。在发送成功之前，消息创建时间为发送者本地时间
     */
    createTime: number;
    /**
     * 消息发送者账号
     */
    senderId: string;
    /**
     * 聊天室 ID
     */
    roomId: string;
    /**
     * 消息发送者是否为自己
     */
    isSelf: boolean;
    /**
     * 附件上传状态。
     *
     */
    attachmentUploadState?: V2NIMMessageAttachmentUploadState;
    /**
     * 消息发送状态. 未知(初始状态), 发送成功，发送失败，发送中。
     *
     * Harmony 端只有以下几个状态：
     * - 初始状态，createXXXMessage 之后
     * - 发送成功，sendMessage 返回值
     */
    sendingState: V2NIMMessageSendingState;
    /**
     * 消息类型
     */
    messageType: V2NIMMessageType;
    /**
     * 消息子类型
     */
    subType?: number;
    /**
     * 消息内容
     */
    text?: string;
    /**
     * 消息附属附件
     *
     * 注1: 附件的父级定义是 V2NIMMessageAttachment, 其中包含了一个必定存在的 raw 属性
     *
     * 注2: 根据 {@link V2NIMChatroomMessage.messageType | V2NIMChatroomMessage.messageType} 的类型, 附件属性的定义类型也有区别: <br/>
     * 1. 文件消息: V2NIMMessageFileAttachment
     * 2. 图片消息: V2NIMMessageImageAttachment
     * 3. 语音消息: V2NIMMessageAudioAttachment
     * 4. 视频消息: V2NIMMessageVideoAttachment
     * 5. 位置消息: V2NIMMessageLocationAttachment
     * 6. 通知消息: V2NIMChatroomNotificationAttachment
     *   a. 撤回的消息通知: V2NIMChatroomMessageRevokeNotificationAttachment
     *   b. 队列的消息通知: V2NIMChatroomQueueNotificationAttachment
     *   c. 成员禁言的消息通知
     *   d. 成员进入聊天室的消息通知
     */
    attachment?: V2NIMMessageAttachment | Partial<V2NIMMessageFileAttachment> | Partial<V2NIMMessageImageAttachment> | Partial<V2NIMMessageAudioAttachment> | Partial<V2NIMMessageVideoAttachment> | Partial<V2NIMMessageLocationAttachment> | V2NIMChatroomNotificationAttachment | V2NIMChatroomMessageRevokeNotificationAttachment | V2NIMChatroomQueueNotificationAttachment | V2NIMChatroomChatBannedNotificationAttachment | V2NIMChatroomMemberEnterNotificationAttachment | V2NIMChatroomMemberRoleUpdateAttachment;
    /**
     * 消息服务端扩展
     */
    serverExtension?: string;
    /**
     * 第三方回调扩展字段
     */
    callbackExtension?: string;
    /**
     * 消息相关配置
     */
    messageConfig?: V2NIMChatroomMessageConfig;
    /**
     * 消息路由配置
     */
    routeConfig?: V2NIMMessageRouteConfig;
    /**
     * 反垃圾相关配置
     */
    antispamConfig?: V2NIMMessageAntispamConfig;
    /**
     * 消息的目标标签表达式， 标签表达式
     *
     */
    notifyTargetTags?: string;
    /**
     * 消息发送时的用户信息
     */
    userInfoConfig?: V2NIMUserInfoConfig;
    /**
     * 消息空间坐标信息配置
     */
    locationInfo?: V2NIMLocationInfo;
}
export type V2NIMUserInfoConfig = {
    /**
     * 消息发送者uinfo的最后更新时间
     */
    userInfoTimestamp?: number;
    /**
     * 发送方昵称
     */
    senderNick?: string;
    /**
     * 发送者头像
     */
    senderAvatar?: string;
    /**
     * 发送者扩展字段
     */
    senderExtension?: string;
};
export type V2NIMSendChatroomMessageParams = {
    /**
     * 消息相关配置
     */
    messageConfig?: V2NIMChatroomMessageConfig;
    /**
     * 路由抄送相关配置
     */
    routeConfig?: V2NIMMessageRouteConfig;
    /**
     * 反垃圾相关配置
     */
    antispamConfig?: V2NIMMessageAntispamConfig;
    /**
     * 是否启用本地反垃圾. 默认 false
     *
     * 注: 只针对文本消息生效
     */
    clientAntispamEnabled?: boolean;
    /**
     * 反垃圾命中后替换的文本
     */
    clientAntispamReplace?: string;
    /**
     * 定向消息接收者账号列表
     */
    receiverIds?: string[];
    /**
     * 消息的目标标签表达式， 标签表达式
     *
     */
    notifyTargetTags?: string;
    /**
     * 消息空间坐标信息配置
     */
    locationInfo?: V2NIMLocationInfo;
};
export type V2NIMSendChatroomMessageResult = {
    /**
     * 发送成功后的消息体
     */
    message: V2NIMChatroomMessage;
    /**
     * 云端反垃圾返回的结果
     */
    antispamResult?: string;
    /**
     * 本地反垃圾结果
     */
    clientAntispamResult?: V2NIMClientAntispamResult;
};
export type V2NIMChatroomMessageListOption = {
    /**
     * 消息查询方向.
     *
     * 注: 默认 V2NIM_QUERY_DIRECTION_DESC, 按时间从大到小的方向查询
     */
    direction?: V2NIMQueryDirection;
    /**
     * 消息类型
     *
     * 注: 不传或者空列表， 则表示查询所有消息类型
     */
    messageTypes?: V2NIMMessageType[];
    /**
     * 消息查询开始时间
     *
     * 注: 默认为 0, 代表不做限制
     */
    beginTime?: number;
    /**
     * 分页条数限制. 默认 100
     */
    limit?: number;
};
export type V2NIMChatroomTagMessageOption = {
    /**
     * 查询的tags. 必填且数组长度不能为 0
     */
    tags?: string[];
    /**
     * 根据消息类型查询会话
     */
    messageTypes?: V2NIMMessageType[];
    /**
     * 消息查询开始时间. 默认为 0 代表不限制, 且一定要小于等于 endTime
     */
    beginTime?: number;
    /**
     * 消息查询结束时间. 默认为 0 代表不限制
     */
    endTime?: number;
    /**
     * 每次查询条数，默认100
     */
    limit?: number;
    /**
     * 消息查询方向. 默认 V2NIM_QUERY_DIRECTION_DESC, 按时间从大到小的方向查询
     */
    direction?: V2NIMQueryDirection;
};
export type V2NIMChatroomCDNInfo = {
    /**
     * 是否开启 CDN 轮询.
     */
    enabled: boolean;
    /**
     * cdn的轮询地址，每个表示一个CDN的请求url，每个url是一个匹配串，如下：
     *
     * 如：https://chat-msg-activity.netease.im/abcdefg_#time，端侧需要将#time替换成当前时间戳，时间戳需要跟服务器时间戳对齐，防止本地时间不准的情况
     */
    cdnUrls: string[];
    /**
     * 服务器当前时间戳
     */
    timestamp: number;
    /**
     * 轮询间隔. 单位秒
     */
    pollingIntervalSeconds: number;
    /**
     * 加密类型. 0 表示不加密，1 表示 AES(AES/ECB/PKCS7Padding)
     */
    decryptType?: number;
    /**
     * 解密 key
     */
    decryptKey?: string;
    /**
     * 轮询请求的超时时间. 单位毫秒
     */
    pollingTimeoutMillis: number;
};
