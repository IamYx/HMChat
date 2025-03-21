import { NIMEBaseListener, NIMEBaseServiceInterface } from './types';
export interface V2NIMPassthroughService extends NIMEBaseServiceInterface<V2NIMPassthroughListener> {
    /**
     * http服务代理
     *
     * @param proxyRequest 代理的http请求
     */
    httpProxy(proxyRequest: V2NIMProxyRequest): Promise<V2NIMProxyResponse>;
}
export interface V2NIMPassthroughListener extends NIMEBaseListener {
    /**
     * 透传下行通知
     * @param proxyNotify 下行通知数据
     */
    onProxyNotify: [
        proxyNotify: V2NIMProxyNotify
    ];
}
export declare enum V2NIMProxyRequestMethod {
    /** GET请求 */
    V2NIM_PROXY_REQUEST_METHOD_GET = 1,
    /** POST请求 */
    V2NIM_PROXY_REQUEST_METHOD_POST = 2,
    /** PUT请求 */
    V2NIM_PROXY_REQUEST_METHOD_PUT = 3,
    /** DELETE请求 */
    V2NIM_PROXY_REQUEST_METHOD_DELETE = 4
}
export interface V2NIMProxyRequest {
    /** 映射一个upstream host， 不传使用默认配置 */
    zone?: string;
    /** url中除了host的path path不能为空， 为空返回参数错误 */
    path: string;
    /** 请求方式 GET请求， 如果body非空， 则返回参数错误 POST/PUT, 如果body为空，返回参数错误 */
    method?: V2NIMProxyRequestMethod;
    /** 请求头，必须要求json格式 非json格式返回参数错误 */
    header?: string;
    /** 请求体 */
    body?: string;
}
export interface V2NIMProxyResponse {
    /** 响应头 */
    header?: string;
    /** 响应体 */
    body?: string;
}
export interface V2NIMProxyNotify {
    /** 发送方账号 */
    fromAccountId?: string;
    /** 通知体 */
    body?: string;
    /** 发送时间， 毫秒 */
    time?: number;
}
