/**
 * 网络监听事件的回调的回参
 */
export interface NIMNetworkStatusEvent {
    /**
     * 当前是否有网络连接
     */
    isConnected: boolean;
}
export interface NetConnectionReceiver {
    /**
     * 网络监听事件
     */
    onNetworkStatusChange(object: any, fn: (res: NIMNetworkStatusEvent) => void): void;
    /**
     * 取消网络监听
     */
    offNetworkStatusChange(object: any): void;
}
