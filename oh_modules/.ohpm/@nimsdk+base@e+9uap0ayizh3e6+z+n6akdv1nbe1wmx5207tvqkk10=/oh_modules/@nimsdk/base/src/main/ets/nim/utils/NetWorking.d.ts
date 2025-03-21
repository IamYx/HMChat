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
export declare class NetWorkingInStance {
    private static instance;
    netList: connection.NetHandle[];
    private _objects;
    private constructor();
    static getInstance(): NetWorkingInStance;
    getNetCapabilitiesSync(): string;
    getNetInfoSync(): NetworkInfo;
    private judgeHasNet;
    private getSignalType;
    getAllNets(i23: AsyncCallback<Array<connection.NetHandle>>): void;
    onNetworkStatusChange(b23: object, c23: (res: NetworkStatusEvent) => void): void;
    offNetworkStatusChange(y22: object): void;
}
