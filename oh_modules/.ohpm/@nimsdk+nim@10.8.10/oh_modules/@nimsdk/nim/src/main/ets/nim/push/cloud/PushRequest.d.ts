/**
 * Request params of protocol:
 * v2UpdatePushToken
 */
export declare class UpdatePushTokenRequest {
    property: UpdatePushTokenParams;
    constructor(k95: UpdatePushTokenParams);
}
/**
 * Params of 'UpdatePushTokenRequest'
 */
export declare class UpdatePushTokenParams {
    pushTokenName: string;
    pushToken: string;
    customPushContentType: string;
    constructor(h95: string, i95: string, j95: string);
}
