import { NetConnectionReceiver, NIMNetworkStatusEvent } from '@nimsdk/base/src/main/ets/nim/internal/login/NetConnectionReceiver';
import { Logger } from '@nimsdk/base';
export declare class HarmonyNetConnectionReceiver implements NetConnectionReceiver {
    private logger;
    private networkStatusChangeCache;
    constructor(n20: Logger);
    onNetworkStatusChange(g20: object, h20: (res: NIMNetworkStatusEvent) => void): void;
    offNetworkStatusChange(d20: object): void;
}
