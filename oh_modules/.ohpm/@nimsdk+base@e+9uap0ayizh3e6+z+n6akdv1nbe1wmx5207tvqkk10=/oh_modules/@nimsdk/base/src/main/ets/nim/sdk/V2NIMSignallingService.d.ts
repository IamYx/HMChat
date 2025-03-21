import { NIMEBaseListener, NIMEBaseServiceInterface } from './types';
/**
 * 直接呼叫请求参数
 */
export interface V2NIMSignallingCallParams {
    /**
     * 被呼叫者账号ID
     *  - 数为空，或者为空串， 返回参数错误
     */
    calleeAccountId: string;
    /**
     * 请求ID，可以用UUID实现
     *  - 主要为了便于业务实现请求响应绑定
     *  - 参数为空，或者为空串， 返回参数错误
     */
    requestId: string;
    /**
     * 频道类型，
     *  - 房间创建后跟频道类型绑定
     *  - 必须为枚举类型之一， 否则返回参数错误
     */
    channelType: V2NIMSignallingChannelType;
    /**
     * 频道名称， 建议使用与业务有相关场景的名称，便于页面显示
     */
    channelName?: string;
    /**
     * 频道相关扩展字段， 长度限制4096， 跟频道绑定
     *  - json格式
     */
    channelExtension?: string;
    /**
     * 服务器扩展字段， 长度限制4096
     *  - json格式
     */
    serverExtension?: string;
    /**
     * 信令相关配置
     */
    signallingConfig?: V2NIMSignallingConfig;
    /**
     * 推送相关配置
     */
    pushConfig?: V2NIMSignallingPushConfig;
    /**
     * 音视频相关参数配置
     */
    rtcConfig?: V2NIMSignallingRtcConfig;
}
/**
 * 信令频道类型
 */
export declare enum V2NIMSignallingChannelType {
    /**
     * 音频频道
     */
    V2NIM_SIGNALLING_CHANNEL_TYPE_AUDIO = 1,
    /**
     * 视频频道
     */
    V2NIM_SIGNALLING_CHANNEL_TYPE_VIDEO = 2,
    /**
     * 自定义频道
     */
    V2NIM_SIGNALLING_CHANNEL_TYPE_CUSTOM = 3
}
/**
 * 信令相关配置
 */
export interface V2NIMSignallingConfig {
    offlineEnabled?: boolean;
    unreadEnabled?: boolean;
    selfUid?: number;
}
/**
 * 消息推送相关配置
 */
export interface V2NIMSignallingPushConfig {
    /**
     * 是否需要推送
     *  - true 需要
     *  - false 不需要
     */
    pushEnabled?: boolean;
    /**
     * 推送标题
     *  - pushEnabled为true必填
     */
    pushTitle?: string;
    /**
     * 推送内容
     *  - pushEnabled为true必填
     */
    pushContent?: string;
    /**
     * 推送自定义字段
     *  - pushEnabled为true必填
     */
    pushPayload?: string;
}
/**
 * 音视频相关配置
 */
export interface V2NIMSignallingRtcConfig {
    /**
     * 云信音视频房间频道名称
     *  - 注意与信令房间频道名称不同
     */
    rtcChannelName?: string;
    /**
     * 音视频房间token过期时间
     */
    rtcTokenTtl?: number;
    /**
     * JSON格式字符串， 音视频SDK相关参数， IM信令仅透传相关参数
     */
    rtcParams?: string;
}
/**
 * 呼叫回包
 */
export interface V2NIMSignallingCallResult {
    /**
     * 频道房间相关信息
     */
    roomInfo: V2NIMSignallingRoomInfo;
    /**
     * 音视频房间相关信息
     */
    rtcInfo?: V2NIMSignallingRtcInfo;
    /**
     * 呼叫状态
     */
    callStatus?: number;
}
/**
 信令频道信息
 */
export interface V2NIMSignallingChannelInfo {
    /**
     * 信令频道名称， 如果请求时不传，则该字段为空
     */
    channelName?: string;
    /**
     * 信令频道ID， 唯一标识了该频道房间，后续主要以该字段作为请求标识
     */
    channelId: string;
    /**
     * 频道类型（通话类型）
     *  - 房间创建后跟频道类型绑定
     */
    channelType: V2NIMSignallingChannelType;
    /**
     * 频道是否有效. 自 10.8.0+ 支持
     */
    channelValid: boolean;
    /**
     * 频道相关扩展字段， 长度限制4096， 跟频道绑定, Json 格式
     */
    channelExtension?: string;
    /**
     * 频道房间创建时间
     */
    createTime: number;
    /**
     * 频道房间过期时间
     */
    expireTime: number;
    /**
     创建者账号ID
     */
    creatorAccountId: string;
}
/**
 * 音视频相关信息
 *  - 依赖于请求时是否传入了音视频房间频道信息（V2NIMSignallingRtcConfig.rtcChannelName）,
 *  如果传入了该参数， 则服务器会同时返回进入音视频房间的Token信息
 */
export interface V2NIMSignallingRtcInfo {
    /**
     * 进入音视频对应的Token
     */
    rtcToken?: string;
    /**
     * 音视频房间token过期时间
     */
    rtcTokenTtl?: number;
    /**
     * JSON格式字符串， 音视频SDK相关参数， IM信令仅透传相关参数
     */
    rtcParams?: string;
}
/**
 * 呼叫建立请求参数
 * 包括接收方进入频道房间相关信息，以及接受方需要的相关音视频房间信息
 */
export interface V2NIMSignallingCallSetupParams {
    /**
     * 信令频道ID， 唯一标识了该频道房间
     *  - 该字段为呼叫通知下发字段
     */
    channelId: string;
    /**
     * 接受的呼叫者账号ID
     *  - 参数为空，或者为空串， 返回参数错误
     */
    callerAccountId: string;
    /**
     * 请求ID，可以用UUID实现
     *  - 主要为了便于业务实现请求响应绑定
     *  - 参数为空，或者为空串， 返回参数错误
     */
    requestId: string;
    /**
     * 服务器扩展字段， 长度限制4096
     */
    serverExtension?: string;
    /**
     * 信令相关配置
     */
    signallingConfig?: V2NIMSignallingConfig;
    /**
     * 音视频相关参数配置
     */
    rtcConfig?: V2NIMSignallingRtcConfig;
}
/**
 * 接受呼叫请求回包
 */
export interface V2NIMSignallingCallSetupResult {
    /**
     * 频道房间相关信息
     */
    roomInfo: V2NIMSignallingRoomInfo;
    /**
     * 音视频房间相关信息
     */
    rtcInfo?: V2NIMSignallingRtcInfo;
    /**
     * 呼叫状态
     */
    callStatus?: number;
}
/**
 成员信息
 */
export interface V2NIMSignallingMember {
    /**
     * 成员账号ID
     */
    accountId: string;
    /**
     * 成员UID, 业务传入的参数， 一般映射的为音视频的房间id
     */
    uid: number;
    /**
     * 用户加入信令频道房间时间
     */
    joinTime: number;
    /**
     用户信令频道房间过期时间
     */
    expireTime: number;
    /**
     * 成员操作的设备ID
     */
    deviceId: string;
}
/**
 * 信令房间相关信息
 */
export interface V2NIMSignallingRoomInfo {
    /**
     * 频道房间相关信息
     */
    channelInfo: V2NIMSignallingChannelInfo;
    /**
     * 成员列表信息
     */
    members: V2NIMSignallingMember[];
}
export type V2NIMSignallingJoinResult = {
    /**
     * 频道房间相关信息
     */
    roomInfo: V2NIMSignallingRoomInfo;
    /**
     * 音视频房间相关信息
     */
    rtcInfo: V2NIMSignallingRtcInfo;
};
/**
 *  加入信令房间请求参数
 */
export interface V2NIMSignallingJoinParams {
    /**
     * 信令频道ID， 唯一标识了该频道房间
     *  - 该字段为呼叫通知下发字段
     */
    channelId: string;
    /**
     * 服务器扩展字段， 长度限制4096
     */
    serverExtension?: string;
    /**
     * 信令相关配置
     */
    signallingConfig?: V2NIMSignallingConfig;
    /**
     * 音视频相关参数配置
     */
    rtcConfig?: V2NIMSignallingRtcConfig;
}
/**
 *  邀请加入频道请求
 */
export interface V2NIMSignallingInviteParams {
    /**
     * 信令频道ID， 唯一标识了该频道房间
     */
    channelId: string;
    /**
     * 被邀请者账号ID
     */
    inviteeAccountId: string;
    /**
     * 请求ID，可以用UUID实现
     */
    requestId: string;
    /**
     * 服务器扩展字段， 长度限制4096
     */
    serverExtension?: string;
    /**
     * 信令相关配置
     */
    signallingConfig?: V2NIMSignallingConfig;
    /**
     * 推送相关配置
     */
    pushConfig?: V2NIMSignallingPushConfig;
}
/**
 *  取消之前的邀请成员加入信令房间请求参数
 */
export interface V2NIMSignallingCancelInviteParams {
    /**
     * 信令频道ID， 唯一标识了该频道房间
     */
    channelId: string;
    /**
     * 被邀请者账号ID
     */
    inviteeAccountId: string;
    /**
     * 请求ID，可以用UUID实现
     */
    requestId: string;
    /**
     * 服务器扩展字段， 长度限制4096
     */
    serverExtension?: string;
    /**
     是否存离线，true表示存离线，false表示不存离线
     */
    offlineEnabled?: boolean;
}
/**
 *  拒绝别人邀请加入信令房间请求参数
 */
export interface V2NIMSignallingRejectInviteParams {
    /**
     * 信令频道ID， 唯一标识了该频道房间
     */
    channelId: string;
    /**
     * 邀请者账号ID
     */
    inviterAccountId: string;
    /**
     * 请求ID，可以用UUID实现
     */
    requestId: string;
    /**
     * 服务器扩展字段， 长度限制4096
     */
    serverExtension?: string;
    /**
     * 是否存离线，true表示存离线，false表示不存离线
     */
    offlineEnabled?: boolean;
}
/**
 *  接受别人邀请加入信令房间请求参数
 */
export interface V2NIMSignallingAcceptInviteParams {
    /**
     * 信令频道ID， 唯一标识了该频道房间
     */
    channelId: string;
    /**
     * 邀请者账号ID
     */
    inviterAccountId: string;
    /**
     * 请求ID，可以用UUID实现
     */
    requestId: string;
    /**
     * 服务器扩展字段， 长度限制4096
     */
    serverExtension?: string;
    /**
     * 是否存离线，true表示存离线，false表示不存离线
     */
    offlineEnabled?: boolean;
}
/**
 * 信令事件
 */
export interface V2NIMSignallingEvent {
    /**
     * 信令频道事件类型
     */
    eventType: V2NIMSignallingEventType;
    /**
     * 信令频道房间相关信息
     */
    channelInfo: V2NIMSignallingChannelInfo;
    /**
     * 操作者ID
     */
    operatorAccountId: string;
    /**
     * 服务器扩展字段， 长度限制4096
     */
    serverExtension?: string;
    /**
     * 操作的时间点
     */
    time: number;
    /**
     * 被邀请者账号ID，以下场景包含该字段
     *  - 邀请加入信令频道房间
     *  - 取消邀请加入信令频道房间
     */
    inviteeAccountId?: string;
    /**
     * 邀请者账号ID，以下场景包含该字段
     *   - 对方拒绝邀请，
     *   - 对方接受邀请
     */
    inviterAccountId?: string;
    /**
     * 本次请求发起产生的请求ID,  以下场景包含该字段
     *  - 邀请加入信令房间
     *  - 拒绝邀请
     *  - 接受邀请
     *  - 取消邀请
     */
    requestId: string;
    /**
     * 推送相关配置， 以下场景包含该字段，可能为空，依赖于发起方
     *  - 邀请加入信令房间
     */
    pushConfig?: V2NIMSignallingPushConfig;
    /**
     * 是否需要计未读
     *  - true：需要
     *  - false：不需要
     */
    unreadEnabled?: boolean;
    /**
     * 成员信息
     *  - 加入房间事件包括该信息
     */
    member?: V2NIMSignallingMember;
}
/**
 *  信令频道事件类型
 */
export declare enum V2NIMSignallingEventType {
    /**
     *  未知
     */
    V2NIM_SIGNALLING_EVENT_TYPE_UNKNOWN = 0,
    /**
     *  关闭信令频道房间
     */
    V2NIM_SIGNALLING_EVENT_TYPE_CLOSE = 1,
    /**
     *  加入信令频道房间
     */
    V2NIM_SIGNALLING_EVENT_TYPE_JOIN = 2,
    /**
     *  邀请加入信令频道房间
     */
    V2NIM_SIGNALLING_EVENT_TYPE_INVITE = 3,
    /**
     *  取消邀请加入信令频道房间
     */
    V2NIM_SIGNALLING_EVENT_TYPE_CANCEL_INVITE = 4,
    /**
     *  拒绝邀请
     */
    V2NIM_SIGNALLING_EVENT_TYPE_REJECT = 5,
    /**
     *  接受邀请
     */
    V2NIM_SIGNALLING_EVENT_TYPE_ACCEPT = 6,
    /**
     *  离开信令频道房间
     */
    V2NIM_SIGNALLING_EVENT_TYPE_LEAVE = 7,
    /**
     *  自定义控制命令
     */
    V2NIM_SIGNALLING_EVENT_TYPE_CONTROL = 8
}
export interface V2NIMSignallingListener extends NIMEBaseListener {
    /**
     * 在线事件回调
     */
    onOnlineEvent: [
        event: V2NIMSignallingEvent
    ];
    /**
     * 离线事件回调
     */
    onOfflineEvent: [
        events: V2NIMSignallingEvent[]
    ];
    /**
     * 多端事件操作同步回调
     */
    onMultiClientEvent: [
        event: V2NIMSignallingEvent
    ];
    /**
     * 登录后，同步还在的信令频道房间列表
     */
    onSyncRoomInfoList: [
        roomInfoList: V2NIMSignallingRoomInfo[]
    ];
}
export interface V2NIMSignallingService extends NIMEBaseServiceInterface<V2NIMSignallingListener> {
    /**
     * 直接呼叫对方加入房间
     * 信令正常流程：
     * -  创建房间（createRoom），
     * -  自己加入房间（join）
     * -  邀请对方加入房间（invite）
     * 上述的房间是信令的房间，不是音视频的房间，因此需要三次向服务器交互才能建立相关流程
     * call接口同时实现了上诉三个接口的功能， 可以加速呼叫流程， 如果你需要精确控制每一步，则需要调用上述每一个接口
     * @param params 呼叫请求参数
     */
    call(params: V2NIMSignallingCallParams): Promise<V2NIMSignallingCallResult>;
    /**
     * 呼叫建立， 包括加入信令频道房间， 同时接受对方呼叫:组合接口（join+accept）
     * 如果需要详细处理每一步骤， 则可以单独调用join接口，之后再调用accept接口
     * @param params 接受呼叫参数
     */
    callSetup(params: V2NIMSignallingCallSetupParams): Promise<V2NIMSignallingCallSetupResult>;
    /**
     * 创建信令房间(频道与房间一一对应， 可以理解为同一个东西)
     * @param channelType 频道类型
     * @param channelName 频道名称， 建议使用与业务有相关场景的名称，便于页面显示
     * @param channelExtension 频道相关扩展字段， 长度限制4096， 跟频道绑定(Json 格式)
     */
    createRoom(channelType: V2NIMSignallingChannelType, channelName?: string, channelExtension?: string): Promise<V2NIMSignallingChannelInfo>;
    /**
     * 延迟房间有效期
     *  - 每一个房间都有过期时间， 如果时长不满足业务场景，则可以采用该接口续期
     *  - 同时延期创建者与房间
     *  - 创建者与房间内的人均可调用该接口
     * @param channelId 频道ID
     */
    delayRoom(channelId: string): Promise<V2NIMSignallingRoomInfo>;
    /**
     *  关闭信令房间接口
     * @param channelId 频道ID
     * @param offlineEnabled 是否需要存离线消息。
     *  - true：需要。
     *  - false：不需要
     *  - 如果存离线，则用户离线再上线会收到该通知
     * @param serverExtension 服务端扩展字段， 长度限制4096
     */
    closeRoom(channelId: string, offlineEnabled?: boolean, serverExtension?: string): Promise<void>;
    /**
     * 加入信令房间接口
     * 该接口调用后会触发加入通知给房间内所有人
     * 默认有效期为5分钟
     * @param params 加入信令房间相关参数
     */
    joinRoom(params: V2NIMSignallingJoinParams): Promise<V2NIMSignallingJoinResult>;
    /**
     * 离开信令房间接口, 该接口调用后会触发离开通知给房间内所有人
     * @param channelId 频道ID
     * @param offlineEnabled 是否需要存离线消息。
     *  - true：需要。
     *  - false：不需要
     *  - 如果存离线，则用户离线再上线会收到该通知
     * @param serverExtension 服务端扩展字段， 长度限制4096
     */
    leaveRoom(channelId: string, offlineEnabled?: boolean, serverExtension?: string): Promise<void>;
    /**
     * 邀请成员加入信令房间接口
     * 该接口调用后会触发邀请通知给对方， 发送方可以配置是否需要发送推送
     *  - 默认不推送
     *  - 如果不配置推送相关信息， 则服务器回填默认内容
     *  - 音频： xx邀请你进行语音通话
     *  - 视频：xx邀请你进行视频通话
     *  - 其它： xx邀请你进行音视频通话
     * 房间内的人均可以发送邀请
     * @param params 邀请成员加入信令房间接口参数
     */
    invite(params: V2NIMSignallingInviteParams): Promise<void>;
    /**
     * 取消之前的邀请成员加入信令房间接口
     *  - 该接口调用后会触发取消邀请通知给对方
     *  - 只能取消自己的邀请请求
     * @param params 取消之前的邀请成员加入信令房间接口参数
     */
    cancelInvite(params: V2NIMSignallingCancelInviteParams): Promise<void>;
    /**
     * 拒绝别人的邀请加入信令房间请求
     * @param params 拒绝邀请加入信令房间接口参数
     */
    rejectInvite(params: V2NIMSignallingRejectInviteParams): Promise<void>;
    /**
     * 接受别人的邀请加入信令房间请求
     *  - 该接口调用后会触发接受邀请通知给对方
     * @param params 接受邀请加入信令房间接口参数
     */
    acceptInvite(params: V2NIMSignallingAcceptInviteParams): Promise<void>;
    /**
     * 发送自定义控制指令，可以实现自定义相关的业务逻辑
     * 可以发送给指定用户， 如果不指定， 则发送给信令房间内的所有人
     * 该接口不做成员校验， 允许非频道房间内的成员调用， 但是接受者必须在频道房间内或者是创建者
     * 接口调用后会发送一个控制通知
     *  - 如果指定了接受者： 则通知发送给接受者
     *  - 如果未指定接受者：则发送给房间内的所有人
     *  - 通知仅发在线
     * @param channelId 频道ID
     * @param receiverAccountId 接受者ID， 如果该字段为空， 则表示发送给房间内的所有人
     * @param serverExtension 服务端扩展字段， 长度限制4096, 自定义控制数据,建议json格式
     */
    sendControl(channelId: string, receiverAccountId?: string, serverExtension?: string): Promise<void>;
    /**
     * 根据频道名称查询频道房间信息
     * @param channelName 频道名称
     */
    getRoomInfoByChannelName(channelName: string): Promise<V2NIMSignallingRoomInfo>;
}
