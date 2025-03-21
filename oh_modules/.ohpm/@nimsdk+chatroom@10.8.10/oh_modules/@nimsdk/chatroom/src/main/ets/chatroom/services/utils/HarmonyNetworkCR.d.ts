import { Logger } from '@nimsdk/base';
import { NetConnectionReceiver, NIMNetworkStatusEvent } from '@nimsdk/base/src/main/ets/nim/internal/login/NetConnectionReceiver';
export declare class HarmonyNetConnectionReceiverCR implements NetConnectionReceiver {
    private logger;
    private networkStatusChangeCache;
    constructor(h44: Logger);
    onNetworkStatusChange(a44: object, b44: (res: NIMNetworkStatusEvent) => void): void;
    offNetworkStatusChange(x43: object): void;
}
