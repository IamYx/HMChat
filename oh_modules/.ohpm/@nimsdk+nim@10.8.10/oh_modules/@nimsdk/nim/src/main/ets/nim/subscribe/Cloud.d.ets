import { NIM, V2NIMCustomUserStatusPublishResult, V2NIMUserStatusSubscribeResult } from "@nimsdk/base";
export declare class SubscribeUserStatusTag {
    eventType: number;
    duration: number;
    immediateSync: boolean;
    constructor(e139: number, f139: number, g139: boolean);
}
export declare class SubscribeUserStatusRequest {
    tag: SubscribeUserStatusTag;
    accountIds: string[];
    constructor(c139: SubscribeUserStatusTag, d139: string[]);
}
export declare class UnsubscribeUserStatusTag {
    eventType: number;
    constructor(b139: number);
}
export declare class UnsubscribeUserStatusRequest {
    tag: UnsubscribeUserStatusTag;
    accountIds?: string[];
    constructor(z138: UnsubscribeUserStatusTag, a139?: string[]);
}
export declare class PublishCustomUserStatusRequest {
    tag: PublishCustomUserStatusRequestTag;
    constructor(y138: PublishCustomUserStatusRequestTag);
}
export declare class PublishCustomUserStatusRequestTag {
    statusType: number;
    duration?: number;
    extension?: string;
    onlineOnly?: boolean;
    multiSync?: boolean;
    uniqueId: string;
    eventType: number;
    constructor(t138: number, u138?: number, v138?: string, w138?: boolean, x138?: boolean);
}
export declare class SubscriptionCloud {
    core: NIM;
    constructor(s138: NIM);
    subscribeUserStatus(p138: SubscribeUserStatusRequest): Promise<string[]>;
    unsubscribeUserStatus(m138: UnsubscribeUserStatusRequest): Promise<string[]>;
    publishCustomUserStatus(j138: PublishCustomUserStatusRequest): Promise<V2NIMCustomUserStatusPublishResult>;
    queryUserStatusSubscriptions(c138: string[]): Promise<V2NIMUserStatusSubscribeResult[]>;
}
