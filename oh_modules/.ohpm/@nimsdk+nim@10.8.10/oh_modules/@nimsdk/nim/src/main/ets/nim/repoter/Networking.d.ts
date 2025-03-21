import connection from '@ohos.net.connection';
import { AsyncCallback } from '@ohos.base';
/**
 * 网络监听事件的回调的回参
 */
export interface NetworkStatusEvent {
    /**
     * 当前是否有网络连接
     */
    isConnected: boolean;
}
export interface NetworkInfo {
    netType: number;
    isConnected: boolean;
}
export declare class NetworkingInstance {
    private static instance;
    netList: connection.NetHandle[];
    private _objects;
    private constructor();
    static getInstance(): NetworkingInstance;
    getNetCapabilitiesSync(): string;
    getNetInfoSync(): NetworkInfo;
    judgeHasNet(): boolean;
    getSignalType(): number;
    getAllNets(y102: AsyncCallback<Array<connection.NetHandle>>): void;
    onNetworkStatusChange(r102: object, s102: (res: NetworkStatusEvent) => void): void;
    offNetworkStatusChange(o102: object): void;
}
