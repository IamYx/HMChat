/**
 * packet序列化配置文件
 * 包含四部分部分：
 * - cmdMap（命令映射表），
 * - cmdConfig（命令配置），
 * - serializeMap（序列化对象映射表），
 * - deserializeMap（反序列化对象映射表）
 * 该文件放在子模块文件夹下，文件名统一为parseMap
 */
import { CmdConfigMap, CmdMap, SerializeItem } from '../../../parser';
export declare let cmdMap: CmdMap;
export declare const conflictCmdMap: CmdMap;
export declare const serializeTag: {
    loginReqTag: {
        uid: number;
        userState: number;
        clientType: number;
        os: number;
        mac: number;
        clientVersion: number;
        channel: number;
        manualLogin: number;
        protocolVersion: number;
        pushTokenName: number;
        pushToken: number;
        deviceId: number;
        simCarrierCode: number;
        simCountryCode: number;
        networkCode: number;
        appKey: number;
        appAccount: number;
        bundleId: number;
        clientSession: number;
        deviceModel: number;
        androidid: number;
        imei: number;
        idfv: number;
        openuuid: number;
        deviceInfo: number;
        vendor: number;
        bssid: number;
        onlineStats: number;
        customTag: number;
        customClientType: number;
        sdkHumanVersion: number;
        sdkType: number;
        userAgent: number;
        eid: number;
        consid: number;
        clientIp: number;
        loginTime: number;
        customPushContentType: number;
        authType: number;
        loginExt: number;
        oldLastDeviceIdMd5: number;
        /**
         * 1000 ~ 开始为LoginProTag特有的属性
         */
        loginToken: number;
    };
    mixAuthRepTag: {
        clientId: number;
        consid: number;
        clientIP: number;
        port: number;
        type: number;
        customClientType: number;
        timetag: number;
        customTag: number;
        os: number;
        pushType: number;
        hasTokenPreviously: number;
        loginType: number;
    };
    nimAuthRepTag: {
        type: number;
        os: number;
        mac: number;
        clientId: number;
        account: number;
        deviceInfo: number;
        customTag: number;
        customClientType: number;
        consid: number;
        clientIP: number;
        port: number;
        timetag: number;
        pushType: number;
        hasTokenPreviously: number;
    };
    qchatAuthRepTag: {
        clientId: number;
        consid: number;
        ip: number;
        port: number;
        type: number;
        customClientType: number;
        timetag: number;
        os: number;
        pushType: number;
        hasTokenPreviously: number;
    };
};
export declare const uploadTaskTag: SerializeItem;
export declare const cmdConfig: CmdConfigMap;
export declare const conflictCmdConfig: CmdConfigMap;
