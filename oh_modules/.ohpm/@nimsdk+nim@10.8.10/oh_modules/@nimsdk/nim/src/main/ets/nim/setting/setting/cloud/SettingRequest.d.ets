import { V2NIMTeamType } from '@nimsdk/base';
/**
 * Request params of protocol:
 * v2TeamUpdateSelfMemberInfo
 * v2SuperTeamUpdateSelfMemberInfo
 */
export declare class TeamMessageMuteModeRequest {
    teamMember: TeamMessageMuteModeInfo;
    constructor(z106: TeamMessageMuteModeInfo);
}
export declare class TeamMessageMuteModeInfo {
    teamId: string;
    teamType: V2NIMTeamType;
    accountId: string;
    bits?: number;
    constructor(v106: string, w106: V2NIMTeamType, x106: string, y106: number);
}
/**
 * Request params of protocol:
 * v2SetP2PMessageMuteMode
 */
export declare class SetP2PMessageMuteModeRequest {
    accountId: string;
    muteMode: boolean;
    constructor(t106: string, u106: boolean);
}
/**
 * Request params of protocol:
 * v2SetAppBackground
 */
export declare class SetAppBackgroundRequest {
    isBackground: boolean;
    badge: number;
    constructor(r106: boolean, s106: number);
}
/**
 * Request params of protocol:
 * v2SetPushMobileOnDesktopOnline
 */
export declare class PushMobileOnDesktopOnlineRequest {
    tag: MobilePushTag;
    constructor(q106: MobilePushTag);
}
/**
 * Inner param of PushMobileOnDesktopOnlineRequest
 */
export declare class MobilePushTag {
    need: boolean;
    constructor(p106: boolean);
}
/**
 * Request params of protocol:
 * v2SetDndConfig
 */
export declare class SetDndConfigParam {
    detail: number;
    disturbing: number;
    fromH: number;
    fromM: number;
    toH: number;
    toM: number;
    constructor(j106: number, k106: number, l106: number, m106: number, n106: number, o106: number);
}
export declare class SetDndConfigRequest {
    tag: SetDndConfigParam;
    constructor(i106: SetDndConfigParam);
}
