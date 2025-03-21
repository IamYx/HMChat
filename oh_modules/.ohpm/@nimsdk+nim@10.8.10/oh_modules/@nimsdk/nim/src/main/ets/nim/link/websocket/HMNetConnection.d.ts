import { Logger, NetConnectionReceiver, NIMNetworkStatusEvent } from '@nimsdk/base';
export declare class HMNetConnection implements NetConnectionReceiver {
    private logger;
    private networkStatusChangeCache;
    constructor(s73: Logger);
    onNetworkStatusChange(k73: object, l73: (res: NIMNetworkStatusEvent) => void): void;
    offNetworkStatusChange(h73: object): void;
}
