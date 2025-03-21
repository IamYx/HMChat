import { NIMEStrAnyObj } from '@nimsdk/base';
/**
 * Request params of protocol:
 * v2NIMSync
 */
export declare class SyncRequest {
    tag: NIMEStrAnyObj;
    constructor(t140: NIMEStrAnyObj);
}
/**
 * Request params of protocol:
 * v2NIMSyncTeamMembers
 */
export declare class SyncTeamMembersRequest {
    times: NIMEStrAnyObj;
    constructor(s140: NIMEStrAnyObj);
}
