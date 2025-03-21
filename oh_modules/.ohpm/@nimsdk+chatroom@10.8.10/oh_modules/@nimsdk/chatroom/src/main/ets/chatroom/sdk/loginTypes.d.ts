export type V2NIMReconnectDelayProvider = (delay: number) => number;
export type V2NIMLoginOption = {
    /**
     * API 登录的总超时时间。单位 ms, 默认 60000.
     *
     * 注: 这意味着这次调用 API 来发起登录，必须在默认 60000ms 内得到响应
     */
    timeout: number;
    /**
     * 强制登录模式, 默认为 false
     *
     * 注: 为 true 时, 登录阶段若达到账号的设备连接上限，则本端登录成功，挤掉其他设备登录端
     *
     * 注2: 为 false 时, 登录阶段若达到账号的设备连接上限，则本端登录响应 417 错误码而不是挤掉其他设备的。
     *
     * 注3: 在 sdk 进入断网自动重连的逻辑时, 本字段一直会被当作 false。
     */
    forceMode: boolean;
};
export type V2NIMTokenProvider = (accountId: string) => Promise<string> | string;
export type V2NIMLoginExtensionProvider = (accountId: string) => Promise<string> | string;
/**
 * 登录鉴权模式.
 */
export declare enum V2NIMLoginAuthType {
    /**
     * 静态 token. 默认方式
     */
    V2NIM_LOGIN_AUTH_TYPE_DEFAULT = 0,
    /**
     * 动态 token
     */
    V2NIM_LOGIN_AUTH_TYPE_DYNAMIC_TOKEN = 1,
    /**
     * 需要第三方回调鉴权
     */
    V2NIM_LOGIN_AUTH_TYPE_THIRD_PARTY = 2
}
export declare enum V2NIMLoginStatus {
    /**
     * 未登录
     */
    V2NIM_LOGIN_STATUS_LOGOUT = 0,
    /**
     * 已登录
     */
    V2NIM_LOGIN_STATUS_LOGINED = 1,
    /**
     * 登录中
     */
    V2NIM_LOGIN_STATUS_LOGINING = 2,
    /**
     * 处在退避间隔中
     *
     * 注: 这是一个中间状态, SDK 将会在这个状态下等待一段时间后再次尝试登录
     */
    V2NIM_LOGIN_STATUS_UNLOGIN = 3
}
/**
 * 登录的端的信息定义
 */
export type V2NIMLoginClient = {
    /**
     * 类型
     */
    type: V2NIMLoginClientType;
    /**
     * 操作系统
     */
    os: string;
    /**
     * 登录时间
     */
    timestamp: number;
    /**
     * 自定义信息，最大 32 个字符
     */
    customTag?: string;
    /**
     * 自定义登录端类型
     *
     * 注: 小程序, uniapp, 浏览器, h5 等更为细致的环境区分, 可以通过该字段区分, 开发者请自行做个映射
     */
    customClientType?: number;
    /**
     * 端 id
     */
    clientId: string;
};
export declare enum V2NIMLoginClientType {
    /**
     * 未知类型
     */
    V2NIM_LOGIN_CLIENT_TYPE_UNKNOWN = 0,
    /**
     * Android
     */
    V2NIM_LOGIN_CLIENT_TYPE_ANDROID = 1,
    /**
     * iOS
     */
    V2NIM_LOGIN_CLIENT_TYPE_IOS = 2,
    /**
     * PC
     */
    V2NIM_LOGIN_CLIENT_TYPE_PC = 4,
    /**
     * Windows phone
     */
    V2NIM_LOGIN_CLIENT_TYPE_WP = 8,
    /**
     * WEB
     */
    V2NIM_LOGIN_CLIENT_TYPE_WEB = 16,
    /**
     * REST API
     */
    V2NIM_LOGIN_CLIENT_TYPE_RESTFUL = 32,
    /**
     * macOS
     */
    V2NIM_LOGIN_CLIENT_TYPE_MAC_OS = 64,
    /**
     * HarmonyOS
     */
    V2NIM_LOGIN_CLIENT_TYPE_HARMONY_OS = 65
}
export declare enum V2NIMLoginClientChange {
    /**
     * 端列表刷新
     */
    V2NIM_LOGIN_CLIENT_CHANGE_LIST = 1,
    /**
     * 端登录
     */
    V2NIM_LOGIN_CLIENT_CHANGE_LOGIN = 2,
    /**
     * 端登出
     */
    V2NIM_LOGIN_CLIENT_CHANGE_LOGOUT = 3
}
export declare enum V2NIMConnectStatus {
    /**
     * 未连接
     */
    V2NIM_CONNECT_STATUS_DISCONNECTED = 0,
    /**
     * 已连接
     */
    V2NIM_CONNECT_STATUS_CONNECTED = 1,
    /**
     * 连接中
     */
    V2NIM_CONNECT_STATUS_CONNECTING = 2,
    /**
     * 等待重连中
     */
    V2NIM_CONNECT_STATUS_WAITING = 3
}
export type V2NIMWaitingToConnectEvent = {
    /**
     * 重试间隔
     */
    duration: number;
};
