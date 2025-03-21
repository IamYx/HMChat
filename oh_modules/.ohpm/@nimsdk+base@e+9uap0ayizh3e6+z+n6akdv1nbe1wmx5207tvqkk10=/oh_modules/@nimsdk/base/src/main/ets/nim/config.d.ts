import { NIMLbsChosenProtocolFamily } from "./internal/types";
export declare const LINK_DEFAULT_TEST = "imtest-jd.netease.im:8091";
export declare const LBS_DEFAULT_TEST: string[];
export declare const LINK_DEFAULT = "weblink05.netease.im:443";
export declare const LBS_DEFAULT: string[];
export declare const CHOSEN_PROTOCOL_FAMILY_DEFAULT = NIMLbsChosenProtocolFamily.IPV4;
export declare const TIMEOUT_REQUEST: number;
export interface ConnectOptions {
    /**
     * 连接地址。开发者不要传。
     */
    linkUrls?: string[];
    /**
     * 自动重连标识位，是否为自动重连的。开发者不要传
     */
    isAutoReconnect?: boolean;
}
