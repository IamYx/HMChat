import { V2NIMLoginAuthType, V2NIMLoginClientType } from '@nimsdk/base';
/**
 * Request params of protocol:
 * v2ChatroomLogin
 */
export declare class ChatroomLoginRequest {
    type: number;
    chatroomLogin: ChatroomLoginParam;
    chatroomIMLogin: ChatroomLoginIMParam;
    constructor(n7: number, o7: ChatroomLoginParam, p7: ChatroomLoginIMParam);
}
/**
 * Param of ChatroomLoginRequest
 */
export declare class ChatroomLoginParam {
    appkey: string;
    account: string;
    deviceId: string;
    chatroomId: string;
    appLogin: number;
    chatroomNick?: string;
    chatroomAvatar: string;
    serverExtension?: string;
    notificationExtension?: string;
    clientSession: string;
    isAnonymous: boolean;
    tags?: string[];
    notifyTargetTags?: string;
    authType: V2NIMLoginAuthType;
    loginExt: string;
    x?: number;
    y?: number;
    z?: number;
    distance?: number;
    antiSpamBusinessId?: string;
}
/**
 * Param of ChatroomLoginRequest
 */
export declare class ChatroomLoginIMParam {
    clientType: V2NIMLoginClientType;
    appkey: string;
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
    sdkHumanVersion: string;
    sdkType: number;
    userAgent: string;
    appAccount: string;
    customClientType?: number;
    authType: V2NIMLoginAuthType;
    loginExt: string;
    loginToken: string;
}
/**
 * Param of ChatroomLoginIMParam.deviceInfo
 */
export declare class CRLoginRequestDeviceInfo {
    PRODUCT: string;
    DEVICE: string;
    MANUFACTURER: string;
    BRAND: string;
    MODEL: string;
}
