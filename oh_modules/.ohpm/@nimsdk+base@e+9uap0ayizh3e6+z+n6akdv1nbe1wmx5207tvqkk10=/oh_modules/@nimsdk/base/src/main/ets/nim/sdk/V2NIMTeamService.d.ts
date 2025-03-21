import { NIMEBaseListener, NIMEBaseServiceInterface, V2NIMAntispamConfig, V2NIMError } from './types';
import { V2NIMSortOrder } from './V2NIMMessageService';
export interface V2NIMTeamService extends NIMEBaseServiceInterface<V2NIMTeamListener> {
    /**
     * 创建一个群组
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - 操作者端（群主）, SDK 抛出: {@link V2NIMTeamListener.onTeamCreated | V2NIMTeamListener.onTeamCreated}
     * - agreeMode 需要被邀请者同意
     *   - 被操作者端, SDK会抛出: {@link V2NIMTeamListener.onReceiveTeamJoinActionInfo | V2NIMTeamListener.onReceiveTeamJoinActionInfo}
     * - agreeMode 不需被邀请者同意
     *   - 被操作者端， SDK会抛出: {@link V2NIMTeamListener.onTeamJoined | V2NIMTeamListener.onTeamJoined}
     *   - 其他成员端， SDK会抛出: {@link V2NIMTeamListener.onTeamMemberJoined | V2NIMTeamListener.onTeamMemberJoined}
     *
     * @param createTeamParams 创建群组参数
     * @param inviteeAccountIds 群组创建时，同时邀请加入群的成员列表
     * @param postscript 群组创建时，邀请入群的附言
     * @param antispamConfig 反垃圾参数. 如果开启了安全通，默认采用安全通，该配置不需要配置.
     *                       如果有审核需求，且直接对接易盾，则需要传入该配置
     */
    createTeam(createTeamParams: V2NIMCreateTeamParams, inviteeAccountIds?: string[], postscript?: string, antispamConfig?: V2NIMAntispamConfig): Promise<V2NIMCreateTeamResult>;
    /**
     * 修改群组信息
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - 全员用户端，SDK会抛出: {@link V2NIMTeamListener.onTeamInfoUpdated | V2NIMTeamListener.onTeamInfoUpdated}
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param updateTeamInfoParams 更新群组信息参数
     * @param antispamConfig 反垃圾参数. 如果开启了安全通，默认采用安全通，该配置不需要配置.
     *                       如果有审核需求，且直接对接易盾，则需要传入该配置
     */
    updateTeamInfo(teamId: string, teamType: V2NIMTeamType, updateTeamInfoParams: V2NIMUpdateTeamInfoParams, antispamConfig?: V2NIMAntispamConfig): Promise<void>;
    /**
     * 退出群组
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - 操作者（自己本端），SDK会抛出: {@link V2NIMTeamListener.onTeamLeft | V2NIMTeamListener.onTeamLeft}
     * - 群内其它用户端， SDK会抛出: {@link V2NIMTeamListener.onTeamMemberLeft | V2NIMTeamListener.onTeamMemberLeft}
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     */
    leaveTeam(teamId: string, teamType: V2NIMTeamType): Promise<void>;
    /**
     * 获取群组信息
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     */
    getTeamInfo(teamId: string, teamType: V2NIMTeamType): Promise<V2NIMTeam>;
    /**
     * 获取当前已经加入的群组列表
     *
     * 注: 群组有效且自己在群中
     *
     * @param teamTypes 群类型列表. 若不传入这个字段, 代表这个过滤条件不生效, 则查询所有群组
     */
    getJoinedTeamList(teamTypes?: V2NIMTeamType[]): Promise<V2NIMTeam[]>;
    /**
     * 获取当前已经加入的群组数量
     *
     * 注: 群组有效且自己在群中
     *
     * @param teamTypes 群类型列表. 若不传入这个字段, 代表这个过滤条件不生效, 则查询所有群组
     */
    getJoinedTeamCount(teamTypes?: V2NIMTeamType[]): Promise<number>;
    /**
     * 根据群组ID获取群组信息
     *
     * 每次最多100个群组ID. 先查本地数据，本地缺失再查询云端
     *
     * @param teamIds 群组ID列表
     * @param teamType 群组类型
     */
    getTeamInfoByIds(teamIds: string[], teamType: V2NIMTeamType): Promise<V2NIMTeam[]>;
    /**
     * 解散群组
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - 全员, SDK会抛出: {@link V2NIMTeamListener.onTeamDismissed | V2NIMTeamListener.onTeamDismissed}
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     */
    dismissTeam(teamId: string, teamType: V2NIMTeamType): Promise<void>;
    /**
     * 邀请成员加入群
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - agreeMode 需要被邀请者同意
     *   - 被操作者端， SDK会抛出: {@link V2NIMTeamListener.onReceiveTeamJoinActionInfo | V2NIMTeamListener.onReceiveTeamJoinActionInfo}
     * - agreeMode 不需要被邀请者同意
     *   - 被操作者端， SDK会抛出: {@link V2NIMTeamListener.onTeamJoined | V2NIMTeamListener.onTeamJoined}
     *   - 其他成员端， SDK会抛出: {@link V2NIMTeamListener.onTeamMemberJoined | V2NIMTeamListener.onTeamMemberJoined}
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param inviteeAccountIds 邀请加入群的成员账号列表
     * @param postscript 邀请入群的附言
     * @returns 邀请失败的账号列表
     */
    inviteMember(teamId: string, teamType: V2NIMTeamType, inviteeAccountIds: string[], postscript?: string): Promise<string[]>;
    /**
     * 接受邀请入群
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - 操作者（既接受邀请用户）端， SDK会抛出: {@link V2NIMTeamListener.onTeamJoined | V2NIMTeamListener.onTeamJoined}
     * - 其他成员端， SDK会抛出: {@link V2NIMTeamListener.onTeamMemberJoined | V2NIMTeamListener.onTeamMemberJoined}
     *
     * @param invitationInfo 邀请入群的信息
     */
    acceptInvitation(invitationInfo: V2NIMTeamJoinActionInfo): Promise<V2NIMTeam>;
    /**
     * 拒绝邀请入群
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - 群主或管理员端， SDK会抛出: {@link V2NIMTeamListener.onReceiveTeamJoinActionInfo | V2NIMTeamListener.onReceiveTeamJoinActionInfo}‘
     *
     * @param invitationInfo 邀请入群的信息
     */
    rejectInvitation(invitationInfo: V2NIMTeamJoinActionInfo, postscript?: string): Promise<void>;
    /**
     * 踢出群组成员
     *
     * 注1: 只有群主和管理员有权限操作该接口
     *
     * 注2: 操作成功后, 触发事件的规则如下:
     * - 被操作者（既被踢用户），SDK会抛出: {@link V2NIMTeamListener.onTeamLeft | V2NIMTeamListener.onTeamLeft}
     * - 其他成员端，SDK会抛出: {@link V2NIMTeamListener.onTeamMemberKicked | V2NIMTeamListener.onTeamMemberKicked}
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param memberAccountIds 踢出群组的成员账号列表
     */
    kickMember(teamId: string, teamType: V2NIMTeamType, memberAccountIds: string[]): Promise<void>;
    /**
     * (用户)申请加入群组
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - joinMode 自由加入
     *   - 操作者端，SDK 会抛出: {@link V2NIMTeamListener.onTeamJoined | V2NIMTeamListener.onTeamJoined}
     *   - 其他成员端， SDK 会抛出: {@link V2NIMTeamListener.onTeamMemberJoined | V2NIMTeamListener.onTeamMemberJoined}
     * - joinMode 群主管理员同意
     *   - 群主或管理员端，SDK 会抛出 {@link V2NIMTeamListener.onReceiveTeamJoinActionInfo | V2NIMTeamListener.onReceiveTeamJoinActionInfo}
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param postscript 申请附言
     * @returns 对应的群信息
     */
    applyJoinTeam(teamId: string, teamType: V2NIMTeamType, postscript?: string): Promise<V2NIMTeam>;
    /**
     * (管理员)接受(用户的)入群申请
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - 被操作者（既被同意用户），SDK会抛出: {@link V2NIMTeamListener.onTeamJoined | V2NIMTeamListener.onTeamJoined}
     * - 其他成员， SDK会抛出: {@link V2NIMTeamListener.onTeamMemberJoined | V2NIMTeamListener.onTeamMemberJoined}
     *
     * @param applicationInfo 该申请的相关信息
     */
    acceptJoinApplication(applicationInfo: V2NIMTeamJoinActionInfo): Promise<void>;
    /**
     * (管理员)拒绝(用户的)入群申请
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - 被操作用户（既被拒绝用户）， SDK会抛出: {@link V2NIMTeamListener.onReceiveTeamJoinActionInfo | V2NIMTeamListener.onReceiveTeamJoinActionInfo}
     *
     * @param applicationInfo 该申请的相关信息
     */
    rejectJoinApplication(applicationInfo: V2NIMTeamJoinActionInfo, postscript?: string): Promise<void>;
    /**
     * 设置成员角色
     *
     * 注1: 本操作只有群主可操作, 且只能在普通成员与管理员直接角色切换, 如果成员设置角色与当前角色一致，默认请求成功
     *
     * 注2: 操作成功后, 触发事件的规则如下:
     * - 所有成员，SDK会抛出: V2NIMTeamListener.onTeamMemberInfoUpdated
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param memberAccountIds 待操作的群组的成员账号列表
     * @param memberRole 新的角色类型
     */
    updateTeamMemberRole(teamId: string, teamType: V2NIMTeamType, memberAccountIds: string[], memberRole: V2NIMTeamMemberRole): Promise<void>;
    /**
     * 移交群主
     *
     * 注1: 本操作只有群主可操作
     *
     * 注2: 操作成功后, 触发事件的规则如下:
     * - 所有成员，SDK会抛出: {@link V2NIMTeamListener.onTeamInfoUpdated | V2NIMTeamListener.onTeamInfoUpdated}‘
     * - 若入参 leave 为 true:
     *   - 操作者， SDK会抛出:onTeamLeft
     *   - 其它成员， SDK会抛出:onTeamMemberLeft
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param accountId 新群主的账号 ID
     * @param leave 转让群主后, 操作者是否同时退出该群. 默认为 false
     * @returns 该操作的时间戳
     */
    transferTeamOwner(teamId: string, teamType: V2NIMTeamType, accountId: string, leave?: boolean): Promise<void>;
    /**
     * 修改自己的群成员信息
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - 所有成员， SDK会抛出: {@link V2NIMTeamListener.onTeamMemberInfoUpdated | V2NIMTeamListener.onTeamMemberInfoUpdated}
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param memberInfoParams 被修改的字段
     */
    updateSelfTeamMemberInfo(teamId: string, teamType: V2NIMTeamType, memberInfoParams: V2NIMUpdateSelfMemberInfoParams): Promise<void>;
    /**
     * 修改群成员昵称
     *
     * 注: 只有群主和管理员拥有此权限可操作
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - 所有成员，SDK会抛出: {@link V2NIMTeamListener.onTeamMemberInfoUpdated | V2NIMTeamListener.onTeamMemberInfoUpdated}
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param accountId 新群主的账号 ID
     * @param nick 昵称
     */
    updateTeamMemberNick(teamId: string, teamType: V2NIMTeamType, accountId: string, nick: string): Promise<void>;
    /**
     * 设置群组禁言模式
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - 所有成员，SDK会抛出: {@link V2NIMTeamListener.onTeamInfoUpdated | V2NIMTeamListener.onTeamInfoUpdated}
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param chatBannedMode 禁言模式
     */
    setTeamChatBannedMode(teamId: string, teamType: V2NIMTeamType, chatBannedMode: V2NIMTeamChatBannedMode): Promise<void>;
    /**
     * 设置群组成员聊天禁言状态
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - 所有成员， SDK会抛出: {@link V2NIMTeamListener.onTeamMemberInfoUpdated | V2NIMTeamListener.onTeamMemberInfoUpdated}
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param accountId 被修改成员的账号
     * @param chatBanned 群组中聊天是否被禁言
     */
    setTeamMemberChatBannedStatus(teamId: string, teamType: V2NIMTeamType, accountId: string, chatBanned: boolean): Promise<void>;
    /**
     * 获取群成员列表
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param queryOption 查询条件
     * @returns 查询结果
     */
    getTeamMemberList(teamId: string, teamType: V2NIMTeamType, queryOption: V2NIMTeamMemberQueryOption): Promise<V2NIMTeamMemberListResult>;
    /**
     * 根据账号 ID 列表获取群组成员列表
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param accountIds 成员的账号 ID 列表
     * @returns 成员列表
     */
    getTeamMemberListByIds(teamId: string, teamType: V2NIMTeamType, accountIds: string[]): Promise<V2NIMTeamMember[]>;
    /**
     * 根据账号 ID 列表获取群组成员邀请人
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param accountIds 成员的账号 ID 列表
     * @returns 邀请人信息列表, key: accountId, value: invitorAccountId
     */
    getTeamMemberInvitor(teamId: string, teamType: V2NIMTeamType, accountIds: string[]): Promise<{
        [accountId: string]: string;
    }>;
    /**
     * 获取群加入相关信息
     *
     * @param option 查询参数
     */
    getTeamJoinActionInfoList(option: V2NIMTeamJoinActionInfoQueryOption): Promise<V2NIMTeamJoinActionInfoResult>;
    /**
     * 根据关键字搜索群信息
     *
     * @param keyword 关键字
     */
    searchTeamByKeyword(keyword: string): Promise<V2NIMTeam[]>;
    /**
     * 根据关键字搜索群成员
     *
     * @param searchOption 搜索选项
     */
    searchTeamMembers(searchOption: V2NIMTeamMemberSearchOption): Promise<V2NIMTeamMemberSearchResult>;
    /**
     * 清空所有群申请
     */
    clearAllTeamJoinActionInfo(): Promise<void>;
    /**
     * 删除群申请
     *
     * 注: 会删除相同群的, 且相同申请者的所有申请记录
     *
     * @param applicationInfo 群申请记录
     */
    deleteTeamJoinActionInfo(applicationInfo: V2NIMTeamJoinActionInfo): Promise<void>;
    /**
     * 邀请成员加入群 EX
     *
     * 注: 操作成功后, 触发事件的规则如下:
     * - agreeMode 需要被邀请者同意
     *   - 被操作者端， SDK会抛出: {@link V2NIMTeamListener.onReceiveTeamJoinActionInfo | V2NIMTeamListener.onReceiveTeamJoinActionInfo}
     * - agreeMode 不需要被邀请者同意
     *   - 被操作者端， SDK会抛出: {@link V2NIMTeamListener.onTeamJoined | V2NIMTeamListener.onTeamJoined}
     *   - 其他成员端， SDK会抛出: {@link V2NIMTeamListener.onTeamMemberJoined | V2NIMTeamListener.onTeamMemberJoined}
     *
     * @param teamId 群组id
     * @param teamType 群组类型
     * @param inviteeParams 邀请加入群的参数选项
     * @returns 邀请失败的账号列表
     */
    inviteMemberEx(teamId: string, teamType: V2NIMTeamType, inviteeParams: V2NIMTeamInviteParams): Promise<string[]>;
}
export interface V2NIMTeamMemberSearchOption {
    keyword: string;
    teamType: V2NIMTeamType;
    teamId?: string;
    nextToken: string;
    order?: V2NIMSortOrder;
    limit?: number;
}
export interface V2NIMTeamMemberSearchResult {
    memberList: V2NIMTeamMember[];
    nextToken: string;
    finished: boolean;
}
export interface V2NIMTeamMemberListResult {
    /**
     * 是否还有下一页
     */
    finished: boolean;
    /**
     * 下一页查询的偏移量.
     */
    nextToken: string;
    /**
     * 成员列表
     */
    memberList: V2NIMTeamMember[];
}
export declare enum V2NIMQueryDirection {
    /**
     * 按时间戳降序查询
     */
    V2NIM_QUERY_DIRECTION_DESC = 0,
    /**
     * 按时间戳升序查询
     */
    V2NIM_QUERY_DIRECTION_ASC = 1
}
export declare enum V2NIMTeamMemberRoleQueryType {
    /**
     * 所有成员
     */
    V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_ALL = 0,
    /**
     * 群组管理员(包括群主)
     */
    V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_MANAGER = 1,
    /**
     * 普通成员
     */
    V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_NORMAL = 2
}
export interface V2NIMTeamMemberQueryOption {
    /**
     * 成员角色列表, 作为过滤条件。必填
     *
     * 默认值 {@link V2NIMTeamMemberRoleQueryType.V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_ALL | V2NIMTeamMemberRoleQueryType.V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_ALL}
     */
    roleQueryType?: V2NIMTeamMemberRoleQueryType;
    /**
     * 是否只返回聊天禁言成员列表. 默认值 false
     */
    onlyChatBanned?: boolean;
    /**
     * 群成员查询方向，按入群时间 joinTime 排序
     *
     * 默认值 {@link V2NIMQueryDirection.V2NIM_QUERY_DIRECTION_DESC | V2NIMQueryDirection.V2NIM_QUERY_DIRECTION_DESC}
     */
    direction?: V2NIMQueryDirection;
    /**
     * 一页数量限制。默认 100
     */
    limit?: number;
    /**
     * 分页偏移量
     *
     * 注: 第一页允许传空字符串
     */
    nextToken?: string;
}
export interface V2NIMUpdateSelfMemberInfoParams {
    /**
     * 群昵称
     *
     * 注: 不能为空字符串 ""
     */
    teamNick?: string;
    /**
     * 群成员扩展字段
     */
    serverExtension?: string;
}
export interface V2NIMLeaveTeamResult {
    /**
     * 群组ID
     */
    teamId: string;
    /**
     * 群组类型
     */
    teamType: V2NIMTeamType;
}
/**
 * 修改群组信息参数
 */
export interface V2NIMUpdateTeamInfoParams {
    /**
     * 群组名称
     */
    name?: string;
    /**
     * 群组人数上限.
     *
     * 注: 只允许群主和管理员修改这个属性.
     */
    memberLimit?: number;
    /**
     * 群组介绍. 上限 255 个字符
     */
    intro?: string;
    /**
     * 群组公告. 上限 5000 个字符
     */
    announcement?: string;
    /**
     * 群组头像
     */
    avatar?: string;
    /**
     * 扩展字段
     */
    serverExtension?: string;
    /**
     * 申请入群模式. 即入群验证方式
     *
     * 注: 只允许群主和管理员修改这个属性.
     */
    joinMode?: V2NIMTeamJoinMode;
    /**
     * 被邀请人入群模式. 即被邀请人的同意方式
     *
     * 注: 只允许群主和管理员修改这个属性.
     */
    agreeMode?: V2NIMTeamAgreeMode;
    /**
     * 群组邀请模式. 即谁可以邀请他人入群
     *
     * 注: 只允许群主和管理员修改这个属性.
     */
    inviteMode?: V2NIMTeamInviteMode;
    /**
     * 群组资料修改模式. 即谁可以修改群组资料
     *
     * 注: 只允许群主和管理员修改这个属性.
     *
     * 注2: 此属性允许普通群成员能修改的参数有: name, avatar, announcement, intro
     */
    updateInfoMode?: V2NIMTeamUpdateInfoMode;
    /**
     * 群组扩展字段修改模式. 即谁可以修改群组扩展
     *
     * 注: 只允许群主和管理员修改这个属性.
     *
     * 注2: 此属性允许普通群成员能修改的参数有: serverExtension
     */
    updateExtensionMode?: V2NIMTeamUpdateExtensionMode;
}
/**
 * 创建群组返回结果
 */
export interface V2NIMCreateTeamResult {
    /**
     * 创建成功的群组对象
     */
    team: V2NIMTeam;
    /**
     * 创建群组时，邀请进入群组的失败成员列表
     */
    failedList: string[];
}
export interface V2NIMCreateTeamParams {
    /**
     * 群组名称
     */
    name: string;
    /**
     * 群组类型
     *
     * 注: 只能选择高级群或者超大群
     */
    teamType: V2NIMTeamType;
    /**
     * 群组人数上限. 默认 200
     */
    memberLimit?: number;
    /**
     * 群组介绍. 上限 255 个字符
     */
    intro?: string;
    /**
     * 群组公告. 上限 5000 个字符
     */
    announcement?: string;
    /**
     * 群组头像
     */
    avatar?: string;
    /**
     * 扩展字段
     */
    serverExtension?: string;
    /**
     * 申请入群模式. 即入群验证方式
     *
     * 默认值: {@link V2NIMTeamJoinMode.V2NIM_TEAM_JOIN_MODE_FREE | V2NIMTeamJoinMode.V2NIM_TEAM_JOIN_MODE_FREE}
     */
    joinMode?: V2NIMTeamJoinMode;
    /**
     * 被邀请人入群模式. 即被邀请人的同意方式
     *
     * 默认值: {@link V2NIMTeamAgreeMode.V2NIM_TEAM_AGREE_MODE_AUTH | V2NIMTeamAgreeMode.V2NIM_TEAM_AGREE_MODE_AUTH}
     */
    agreeMode?: V2NIMTeamAgreeMode;
    /**
     * 群组邀请模式. 即谁可以邀请他人入群
     *
     * 默认值: {@link V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_MANAGER | V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_MANAGER}
     */
    inviteMode?: V2NIMTeamInviteMode;
    /**
     * 群组资料修改模式. 即谁可以修改群组资料
     *
     * 默认值: {@link V2NIMTeamUpdateInfoMode.V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER | V2NIMTeamUpdateInfoMode.V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER}
     */
    updateInfoMode?: V2NIMTeamUpdateInfoMode;
    /**
     * 群组扩展字段修改模式. 即谁可以修改群组扩展
     *
     * 默认值: {@link V2NIMTeamUpdateExtensionMode.V2NIM_TEAM_UPDATE_EXTENSION_MODE_MANAGER | V2NIMTeamUpdateExtensionMode.V2NIM_TEAM_UPDATE_EXTENSION_MODE_MANAGER}
     */
    updateExtensionMode?: V2NIMTeamUpdateExtensionMode;
    /**
     * 群禁言状态
     *
     * 默认值: {@link V2NIMTeamChatBannedMode.V2NIM_TEAM_CHAT_BANNED_MODE_UNBAN | V2NIMTeamChatBannedMode.V2NIM_TEAM_CHAT_BANNED_MODE_UNBAN}
     */
    chatBannedMode?: V2NIMTeamChatBannedMode;
}
/**
 * 群组类型定义
 */
export declare enum V2NIMTeamType {
    /**
     * @deprecated
     * 讨论组
     *
     * 注: 讨论组功能不再维护, 出于兼容目的考虑, 给讨论组保留这个定义。
     */
    V2NIM_TEAM_TYPE_INVALID = 0,
    /**
     * 高级群
     */
    V2NIM_TEAM_TYPE_NORMAL = 1,
    /**
     * 超大群
     */
    V2NIM_TEAM_TYPE_SUPER = 2
}
/**
 * (用户)申请入群的模式定义
 */
export declare enum V2NIMTeamJoinMode {
    /**
     * 自由加入. 无须验证
     */
    V2NIM_TEAM_JOIN_MODE_FREE = 0,
    /**
     * 需申请. 群主或管理同意后加入
     */
    V2NIM_TEAM_JOIN_MODE_APPLY = 1,
    /**
     * 不接受申请. 私有群, 仅能通过邀请方式入群
     */
    V2NIM_TEAM_JOIN_MODE_INVITE = 2
}
/**
 * (管理员)邀请入群时是否需要被邀请人(用户)的同意模式定义
 */
export declare enum V2NIMTeamAgreeMode {
    /**
     * 需要被邀请方同意
     */
    V2NIM_TEAM_AGREE_MODE_AUTH = 0,
    /**
     * 不需要被邀请人同意
     */
    V2NIM_TEAM_AGREE_MODE_NO_AUTH = 1
}
/**
 * 群组邀请模式定义
 */
export declare enum V2NIMTeamInviteMode {
    /**
     * 群主，管理员可以邀请其他人入群
     */
    V2NIM_TEAM_INVITE_MODE_MANAGER = 0,
    /**
     * 所有人都可以邀请其他人入群
     */
    V2NIM_TEAM_INVITE_MODE_ALL = 1
}
/**
 * 群组资料修改模式
 */
export declare enum V2NIMTeamUpdateInfoMode {
    /**
     * 群主, 管理员可以修改群组资料
     */
    V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER = 0,
    /**
     * 所有人均可以修改群组资料
     */
    V2NIM_TEAM_UPDATE_INFO_MODE_ALL = 1
}
/**
 * 群组禁言模式类型定义
 */
export declare enum V2NIMTeamChatBannedMode {
    /**
     * 不禁言. 群组成员可以自由发言
     */
    V2NIM_TEAM_CHAT_BANNED_MODE_UNBAN = 0,
    /**
     * 普通成员禁言. 但不包括管理员, 群主.
     */
    V2NIM_TEAM_CHAT_BANNED_MODE_BANNED_NORMAL = 1,
    /**
     * 全员禁言，群组所有成员都被禁言.
     *
     * 注: 该状态只能 OpenApi 发起, 而 SDK 不允许主动设置这个状态
     */
    V2NIM_TEAM_CHAT_BANNED_MODE_BANNED_ALL = 3
}
/**
 * 群组扩展字段修改模式
 */
export declare enum V2NIMTeamUpdateExtensionMode {
    /**
     * 群主/管理员可以修改群组扩展字段
     */
    V2NIM_TEAM_UPDATE_EXTENSION_MODE_MANAGER = 0,
    /**
     * 所有人均可以修改群组扩展字段
     */
    V2NIM_TEAM_UPDATE_EXTENSION_MODE_ALL = 1
}
/**
 * 群组消息提醒模式
 */
export declare enum V2NIMTeamMessageNotifyMode {
    /**
     * 所有消息都提醒
     */
    V2NIM_TEAM_MESSAGE_NOTIFY_MODE_ALL = 0,
    /**
     * 只群主，管理员消息提醒
     */
    V2NIM_TEAM_MESSAGE_NOTIFY_MODE_MANAGER = 1,
    /**
     * 所有消息均不提醒
     */
    V2NIM_TEAM_MESSAGE_NOTIFY_MODE_CLOSE = 2
}
/**
 * 群组定义
 */
export interface V2NIMTeam {
    /**
     * 群组ID
     */
    readonly teamId: string;
    /**
     * 群组类型
     */
    readonly teamType: V2NIMTeamType;
    /**
     * 群组名称
     */
    readonly name: string;
    /**
     * 群组拥有者的账号 ID
     */
    readonly ownerAccountId: string;
    /**
     * 群组人数上限
     */
    readonly memberLimit: number;
    /**
     * 群组当前人数
     */
    readonly memberCount: number;
    /**
     * 群组创建时间
     */
    readonly createTime: number;
    /**
     * 群组创建时间
     */
    readonly updateTime: number;
    /**
     * 群组介绍. 上限 255 个字符
     */
    readonly intro: string;
    /**
     * 群组公告. 上限 5000 个字符
     */
    readonly announcement: string;
    /**
     * 头像
     */
    readonly avatar: string;
    /**
     * 扩展字段
     */
    readonly serverExtension?: string;
    /**
     * 客户自定义扩展
     *
     * 注: 这个字段仅由 openApi 发请求设置. 而 SDK 只是透传这个字段.
     */
    readonly customerExtension?: string;
    /**
     * 申请入群模式. 即入群验证方式
     */
    readonly joinMode: V2NIMTeamJoinMode;
    /**
     * 被邀请人入群模式. 即被邀请人的同意方式
     */
    readonly agreeMode: V2NIMTeamAgreeMode;
    /**
     * 群组邀请模式. 即谁可以邀请他人入群
     */
    readonly inviteMode: V2NIMTeamInviteMode;
    /**
     * 群组资料修改模式. 即谁可以修改群组资料
     */
    readonly updateInfoMode: V2NIMTeamUpdateInfoMode;
    /**
     * 群组扩展字段修改模式. 即谁可以修改群组扩展
     */
    readonly updateExtensionMode: V2NIMTeamUpdateExtensionMode;
    /**
     * 群禁言状态
     */
    readonly chatBannedMode: V2NIMTeamChatBannedMode;
    /**
     * 是否自己所在的有效的群.
     *
     * 注: 为 true 的条件是此群存在且本账号已加入此群
     */
    readonly isValidTeam: boolean;
    /**
     * 群消息提醒模式
     */
    readonly messageNotifyMode: V2NIMTeamMessageNotifyMode;
}
export interface V2NIMUpdatedTeamInfo {
    /**
     * 新修改群组名称
     */
    name?: string;
    /**
     * 群组人数上限
     */
    memberLimit?: number;
    /**
     * 群组介绍
     */
    intro?: string;
    /**
     * 群组公告
     */
    announcement?: string;
    /**
     * 群组头像
     */
    avatar?: string;
    /**
     * 服务端扩展字段
     */
    serverExtension?: string;
    /**
     * 申请入群模式， 入群验证方式
     */
    joinMode?: V2NIMTeamJoinMode;
    /**
     * 被邀请人入群模式， 被邀请人的同意方式
     */
    agreeMode?: V2NIMTeamAgreeMode;
    /**
     * 群组邀请模式， 谁可以邀请他人入群
     */
    inviteMode?: V2NIMTeamInviteMode;
    /**
     * 群组资料修改模式， 谁可以修改群组资料
     */
    updateInfoMode?: V2NIMTeamUpdateInfoMode;
    /**
     * 群组扩展字段修改模式， 谁可以修改群组扩展
     */
    updateExtensionMode?: V2NIMTeamUpdateExtensionMode;
    /**
     * 群组禁言状态
     */
    chatBannedMode?: V2NIMTeamChatBannedMode;
    /**
     * 客户自定义扩展， 由openApi设置
     * 仅服务器API可以设置，内容透传
     */
    customerExtension?: string;
}
/**
 * 群组成员角色类型定义
 */
export declare enum V2NIMTeamMemberRole {
    /**
     * 普通成员
     */
    V2NIM_TEAM_MEMBER_ROLE_NORMAL = 0,
    /**
     * 群组拥有者
     */
    V2NIM_TEAM_MEMBER_ROLE_OWNER = 1,
    /**
     * 群组管理员
     */
    V2NIM_TEAM_MEMBER_ROLE_MANAGER = 2
}
/**
 * 群组成员属性定义
 */
export interface V2NIMTeamMember {
    /**
     * 群组 ID
     */
    readonly teamId: string;
    /**
     * 群类型
     */
    readonly teamType: V2NIMTeamType;
    /**
     * 群组成员账号 ID
     */
    readonly accountId: string;
    /**
     * 群组成员类型
     */
    readonly memberRole: V2NIMTeamMemberRole;
    /**
     * 群组昵称
     */
    readonly teamNick?: string;
    /**
     * 扩展字段
     */
    readonly serverExtension?: string;
    /**
     * 入群时间
     */
    readonly joinTime: number;
    /**
     * 更新时间
     */
    readonly updateTime?: number;
    /**
     * 入群邀请人. 若主动入群该字段为空
     */
    readonly invitorAccountId?: string;
    /**
     * 是否在群中
     */
    readonly inTeam: boolean;
    /**
     * 聊天是否被禁言. 默认 false
     */
    readonly chatBanned?: boolean;
}
/**
 * 群组监听回调
 */
export interface V2NIMTeamListener extends NIMEBaseListener {
    /**
     * 群组信息同步开始回调
     */
    onSyncStarted: [
    ];
    /**
     * 群组信息同步结束回调
     */
    onSyncFinished: [
    ];
    /**
     * 群组信息数据同步失败
     */
    onSyncFailed: [
        error: V2NIMError
    ];
    /**
     * 群组创建回调
     *
     * 注: 包括多端同步和初始化同步都可能触发
     */
    onTeamCreated: [
        team: V2NIMTeam
    ];
    /**
     * 群组解散
     */
    onTeamDismissed: [
        team: V2NIMTeam
    ];
    /**
     * (自己)加入某群
     *
     * 注: 当自己被邀请后接受邀请， 或申请通过，或直接被拉入群组的事件通知
     */
    onTeamJoined: [
        team: V2NIMTeam
    ];
    /**
     * 退出群组
     *
     * 注: 当自己主动离开群组或被管理员踢出群组会收到该事件
     *
     * @param team 被离开的群组
     * @param isKicked 是否被踢出群组
     */
    onTeamLeft: [
        team: V2NIMTeam,
        isKicked: boolean
    ];
    /**
     * 群组信息更新
     */
    onTeamInfoUpdated: [
        team: V2NIMTeam
    ];
    /**
     * 群组成员加入
     *
     * 注: 非本账号的用户加入了这个群组后触发的
     *
     * @param teamMembers 加入的群组成员信息
     */
    onTeamMemberJoined: [
        teamMembers: V2NIMTeamMember[]
    ];
    /**
     * 群组成员被踢
     *
     * @param operateAccountId 操作者账号 ID
     * @param teamMembers 被踢的群组成员信息
     */
    onTeamMemberKicked: [
        operateAccountId: string,
        teamMembers: V2NIMTeamMember[]
    ];
    /**
     * 群组成员退出
     *
     * @param teamMembers 退出的群组成员信息
     */
    onTeamMemberLeft: [
        teamMembers: V2NIMTeamMember[]
    ];
    /**
     * 群组成员信息变更
     *
     * @param teamMembers 变更的群成员信息列表
     */
    onTeamMemberInfoUpdated: [
        teamMembers: V2NIMTeamMember[]
    ];
    /**
     * 群组申请动作
     *
     * 注: 区分四种类型: 管理员收到入群申请; 申请人收到入群申请被拒绝; 成员收到入群邀请; 管理员收到入群邀请被拒绝
     */
    onReceiveTeamJoinActionInfo: [
        joinActionInfo: V2NIMTeamJoinActionInfo
    ];
}
/**
 * 群操作类型
 */
export declare enum V2NIMTeamJoinActionType {
    /**
     * 申请入群
     */
    V2NIM_TEAM_JOIN_ACTION_TYPE_APPLICATION = 0,
    /**
     * 管理拒绝申请入群
     */
    V2NIM_TEAM_JOIN_ACTION_TYPE_REJECT_APPLICATION = 1,
    /**
     * 邀请入群
     */
    V2NIM_TEAM_JOIN_ACTION_TYPE_INVITATION = 2,
    /**
     * 成员拒绝邀请入群
     */
    V2NIM_TEAM_JOIN_ACTION_TYPE_REJECT_INVITATION = 3
}
/**
 * 群的消息通知
 */
export interface V2NIMTeamJoinActionInfo {
    /**
     * 群操作类型
     */
    actionType: V2NIMTeamJoinActionType;
    /**
     * 群组ID
     */
    teamId: string;
    /**
     * 群组类型
     */
    teamType: V2NIMTeamType;
    /**
     * 操作者的账号 ID
     */
    operatorAccountId: string;
    /**
     * 该操作的附言
     */
    postscript?: string;
    /**
     * 该操作发生时的时间戳
     */
    timestamp: number;
    /**
     * 操作状态
     */
    actionStatus: V2NIMTeamJoinActionStatus;
    /**
     * 邀请入群的扩展字段， 512个字符
     * 注：当前仅支持普通群
     */
    serverExtension?: string;
}
/**
 * 成员入群操作处理状态
 */
export declare enum V2NIMTeamJoinActionStatus {
    /**
     * 未处理
     */
    V2NIM_TEAM_JOIN_ACTION_STATUS_INIT = 0,
    /**
     * 已同意
     */
    V2NIM_TEAM_JOIN_ACTION_STATUS_AGREED = 1,
    /**
     * 已拒绝
     */
    V2NIM_TEAM_JOIN_ACTION_STATUS_REJECTED = 2,
    /**
     * 已过期
     */
    V2NIM_TEAM_JOIN_ACTION_STATUS_EXPIRED = 3
}
export declare enum V2NIMTeamNotificationType {
    teamApply = 0,
    teamApplyReject = 1,
    teamInvite = 2,
    teamInviteReject = 3,
    tlistUpdate = 4,
    superTeamApply = 15,
    superTeamApplyReject = 16,
    superTeamInvite = 17,
    superTeamInviteReject = 18
}
export interface V2NIMTeamJoinActionInfoQueryOption {
    /**
     * 过滤条件: 群操作类型。
     *
     * 注: 不传这个参数, 或者传递了空数组, 这个过滤条件不生效.
     */
    types?: V2NIMTeamJoinActionType[];
    /**
     * 过滤条件: 操作处理状态.
     *
     * 注: 不传这个参数, 或者传递了空数组, 这个过滤条件不生效.
     */
    status?: V2NIMTeamJoinActionStatus[];
    /**
     * 分页偏移量. 是一个时间戳
     */
    offset?: number;
    /**
     * 每次查询的数量. 默认 50
     */
    limit?: number;
}
export interface V2NIMTeamJoinActionInfoResult {
    /**
     * 群的消息通知的列表
     */
    infos: V2NIMTeamJoinActionInfo[];
    /**
     * 分页偏移量
     */
    offset: number;
    /**
     * 是否还有下一页
     */
    finished: boolean;
}
export interface V2NIMTeamInviteParams {
    /**
     * 被邀请加入群的成员账号列表。必填
     * 为 undefined，以及 size 为 0，返回参数错误
     */
    inviteeAccountIds: string[];
    /**
     * 邀请入群的附言。选填
     */
    postscript?: string;
    /**
     * 邀请入群的扩展字段，512个字符。选填
     * 注：当前仅支持普通群
     */
    serverExtension?: string;
}
