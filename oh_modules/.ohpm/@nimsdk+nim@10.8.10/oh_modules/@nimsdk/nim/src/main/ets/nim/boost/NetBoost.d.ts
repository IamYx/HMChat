import { Logger } from '@nimsdk/base';
export declare class NetBoost {
    logger?: Logger;
    isWeakSignalState: boolean;
    isHandoverChanging: boolean;
    recommendedAction: string;
    private static instance;
    private constructor();
    /**
     * 单例获取方法
     * @returns NetBoost实例
     */
    static getInstance(): NetBoost;
    private onNetworkQosChange;
    private onNetworkSceneChange;
    onHandoverChange(): void;
    reportQoe(): void;
    off(): void;
}
