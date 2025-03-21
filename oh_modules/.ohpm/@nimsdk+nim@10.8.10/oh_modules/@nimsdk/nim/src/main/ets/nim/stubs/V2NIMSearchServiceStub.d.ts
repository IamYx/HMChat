import { NIM, NIMServiceConfig, NIMServiceName, V2NIMMessageSearchExParams, V2NIMMessageSearchResult, V2NIMSearchListener, V2NIMSearchServiceInternal, V2Service } from '@nimsdk/base';
export declare class V2NIMSearchServiceStub extends V2Service<V2NIMSearchListener> implements V2NIMSearchServiceInternal {
    constructor(y129: NIM, z129: NIMServiceName, a130: NIMServiceConfig);
    v2IIsEnable(): boolean;
    v2ISearch(x129: V2NIMMessageSearchExParams): Promise<V2NIMMessageSearchResult>;
    onLoginStart(w129: string): Promise<void>;
    onLoginFinished(v129: string): Promise<void>;
    onLogout(): void;
}
