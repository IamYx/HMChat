export type NIMEStrAnyObj = {
    [key: string]: any;
};
export type NIMEStrNumObj = {
    [key: string]: number;
};
export type NIMEStrObj = {
    [key: string]: string;
};
export type NIMEAnyObj = any;
export declare enum NIMEEnumClientType {
    Android = 1,
    iOS = 2,
    PC = 4,
    WindowsPhone = 8,
    Web = 16,
    Server = 32,
    Mac = 64
}
export type NIMEClientType = keyof typeof NIMEEnumClientType;
export declare enum NIMLbsChosenProtocolFamily {
    /** 支持ipv4 */
    IPV4 = 0,
    /** 支持ipv6*/
    IPV6 = 1,
    /** 都支持，由服务端自行分配 */
    DUAL_STACK = 2
}
