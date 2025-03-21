import { V2NIMLoginAuthType, V2NIMLoginClientType } from '@nimsdk/base/';
/**
 * Request params of protocol:
 * v2KickOffline
 */
export declare class KickOfflineRequest {
    clientIds: string[];
    constructor(z81: string[]);
}
export declare class GetChatroomLinkAddressRequest {
    roomId: number;
    type: number;
    constructor(x81: string, y81?: number);
}
/**
 * Request params of protocol:
 * v2Login
 */
export declare class LoginRequest {
    tag: LoginRequestParam;
    constructor(w81: LoginRequestParam);
}
/**
 * Param of LoginRequest
 */
export declare class LoginRequestParam {
    clientType: V2NIMLoginClientType;
    appKey: string;
    clientVersion: number;
    bundleId: string;
    protocolVersion: number;
    clientSession: string;
    os: string;
    deviceId: string;
    deviceModel: string;
    deviceInfo: string;
    manualLogin: number;
    vendor: string;
    customTag?: string;
    sdkHumanVersion: string;
    sdkType: number;
    userAgent: string;
    appAccount: string;
    customClientType?: number;
    authType?: V2NIMLoginAuthType;
    loginExt: string;
    loginToken: string;
}
/**
 * Param of LoginRequestParam.deviceInfo
 */
export declare class LoginRequestDeviceInfo {
    PRODUCT: string;
    DEVICE: string;
    MANUFACTURER: string;
    BRAND: string;
    MODEL: string;
}
