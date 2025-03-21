import { NIMInitializeOptions, NIMInterface, NIMServiceOptions, V2NIMProvidedServiceType, V2ServiceCreator } from '@nimsdk/base';
import common from '@ohos.app.ability.common';
export declare class NIMSdk {
    private static instances;
    static registerCustomServices(serviceType: V2NIMProvidedServiceType, creator: V2ServiceCreator): void;
    static newInstance(context: common.Context, initializeOptions: NIMInitializeOptions, serviceOptions?: NIMServiceOptions): NIMInterface;
    static getInstance(id: number): NIMInterface | undefined;
    static destroyInstance(id: number): boolean;
    static destroy(): void;
    private static checkRegisteredCustomServices;
    /**
     * Standard services
     *
     * Basic abilities that must be included in NIMSDK
     */
    private static registerCoreServices;
}
