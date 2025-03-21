import { V2NIMAntispamConfig } from '@nimsdk/base';
import { V2NIMChatroomMemberQueryOption, V2NIMChatroomMemberRole, V2NIMChatroomMemberRoleUpdateParams, V2NIMChatroomSelfMemberUpdateParams, V2NIMChatroomTagMemberOption } from '../../../sdk/types';
/**
 * Request params of protocol:
 * v2ChatroomGetMemberListByOption
 */
export declare class ChatroomGetMemberListByOptionRequest {
    tag: V2NIMChatroomMemberQueryOption;
    constructor(z24: V2NIMChatroomMemberQueryOption);
}
/**
 * Request params of protocol:
 * v2ChatroomUpdateMemberRole
 */
export declare class ChatroomUpdateMemberRoleRequest {
    tag: ChatroomUpdateMemberRoleParam;
    constructor(y24: ChatroomUpdateMemberRoleParam);
}
/**
 * Tag of ChatroomUpdateMemberRoleRequest
 */
export declare class ChatroomUpdateMemberRoleParam {
    memberRole: V2NIMChatroomMemberRole;
    memberLevel?: number;
    notificationExtension: string;
    accountId: string;
    constructor(w24: V2NIMChatroomMemberRoleUpdateParams, x24: string);
}
/**
 * Request params of protocol:
 * v2ChatroomSetMemberBlockedStatus
 */
export declare class ChatroomSetMemberBlockedStatusRequest {
    accountId: string;
    blocked: boolean;
    notificationExtension: string;
    constructor(t24: string, u24: boolean, v24?: string);
}
/**
 * Request params of protocol:
 * v2ChatroomSetMemberChatBannedStatus
 */
export declare class ChatroomSetMemberChatBannedStatusRequest {
    accountId: string;
    chatBanned: boolean;
    notificationExtension: string;
    constructor(q24: string, r24: boolean, s24?: string);
}
/**
 * Request params of protocol:
 * v2ChatroomSetMemberTempChatBanned
 */
export declare class ChatroomSetMemberTempChatBannedRequest {
    accountId: string;
    tempChatBannedDuration: number;
    notificationEnabled: boolean;
    notificationExtension: string;
    constructor(m24: string, n24: number, o24: boolean, p24?: string);
}
/**
 * Request params of protocol:
 * v2ChatroomUpdateSelfMemberInfo
 */
export declare class ChatroomUpdateSelfMemberInfoRequest {
    tag: V2NIMChatroomSelfMemberUpdateParams;
    notificationEnabled: boolean;
    notificationExtension: string;
    persistence: boolean;
    antispamConfig?: V2NIMAntispamConfig;
    constructor(k24: V2NIMChatroomSelfMemberUpdateParams, l24?: V2NIMAntispamConfig);
}
/**
 * Request params of protocol:
 * v2ChatroomGetMemberByIds
 */
export declare class ChatroomGetMemberByIdsRequest {
    accountIds: string[];
    constructor(j24: string[]);
}
/**
 * Request params of protocol:
 * v2ChatroomKickMember
 */
export declare class ChatroomKickMemberRequest {
    accountId: string;
    notificationExtension?: string;
    constructor(h24: string, i24?: string);
}
/**
 * Request params of protocol:
 * v2ChatroomGetMemberListByTag
 */
export declare class ChatroomGetMemberListByTagRequest {
    tag: ChatroomGetMemberListByTagRequestParam;
    constructor(g24: ChatroomGetMemberListByTagRequestParam);
}
/**
 * Tag of ChatroomGetMemberListByTagRequest
 */
export declare class ChatroomGetMemberListByTagRequestParam {
    tag: string;
    pageToken?: string;
    limit?: number;
    constructor(f24: V2NIMChatroomTagMemberOption);
}
/**
 * Request params of protocol:
 * v2ChatroomGetMemberCountByTag
 */
export declare class ChatroomGetMemberCountByTagRequest {
    tag: string;
    constructor(e24: string);
}
