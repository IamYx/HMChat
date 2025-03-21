import { V2NIMChatroomTagsUpdateParams, V2NIMChatroomUpdateParams } from '../../../sdk/types';
import { V2NIMChatroomLocationConfig, V2NIMChatroomTagTempChatBannedParams } from '../../../sdk/V2NIMChatroomService';
/**
 * Request params of protocol:
 * v2UpdateChatroomInfo
 */
export declare class UpdateChatroomInfoRequest {
    chatroom: V2NIMChatroomUpdateParams;
    notificationEnabled: boolean;
    notificationExtension: string;
    constructor(s6: V2NIMChatroomUpdateParams);
}
/**
 * Request params of protocol:
 * v2UpdateChatroomLocation
 */
export declare class UpdateChatroomLocationRequest {
    tag: UpdateChatroomLocationParam;
    constructor(r6: UpdateChatroomLocationParam);
}
/**
 * Tag of UpdateChatroomLocationRequest
 */
export declare class UpdateChatroomLocationParam {
    x?: number;
    y?: number;
    z?: number;
    distance?: number;
    constructor(q6: V2NIMChatroomLocationConfig);
}
/**
 * Request params of protocol:
 * v2UpdateChatroomTags
 */
export declare class UpdateChatroomTagsRequest {
    tag: V2NIMChatroomTagsUpdateParams;
    constructor(p6: V2NIMChatroomTagsUpdateParams);
}
/**
 * Request params of protocol:
 * v2SetTempChatBannedByTag
 */
export declare class SetTempChatBannedByTagRequest {
    tag: V2NIMChatroomTagTempChatBannedParams;
    constructor(o6: V2NIMChatroomTagTempChatBannedParams);
}
