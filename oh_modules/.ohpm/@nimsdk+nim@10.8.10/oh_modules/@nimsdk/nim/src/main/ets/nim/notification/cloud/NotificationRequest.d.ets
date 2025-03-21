import { V2NIMNotificationAntispamConfig, V2NIMNotificationConfig, V2NIMNotificationPushConfig, V2NIMNotificationRouteConfig } from '@nimsdk/base';
/**
 * Request params of protocol:
 * v2UpdateSelfUserProfile
 */
export declare class SendCustomNotificationRequest {
    tag: SendCustomNotificationParam;
    constructor(i91: SendCustomNotificationParam);
}
/**
 * Params of SendCustomNotificationRequest
 */
export declare class SendCustomNotificationParam {
    notificationConfig: V2NIMNotificationConfig;
    pushConfig: V2NIMNotificationPushConfig;
    antispamConfig: V2NIMNotificationAntispamConfig;
    routeConfig: V2NIMNotificationRouteConfig;
    timestamp: number;
    type: number;
    receiverId: string;
    content: string;
    constructor(a91: V2NIMNotificationConfig, b91: V2NIMNotificationPushConfig, c91: V2NIMNotificationAntispamConfig, d91: V2NIMNotificationRouteConfig, e91: number, f91: number, g91: string, h91: string);
}
/**
 * Request params of protocol:
 * v2BatchMarkRead
 */
export declare class BatchMarkReadRequest {
    sid: number;
    cid: number;
    ids: string[];
    constructor(x90: number, y90: number, z90: string[]);
}
