import { rcp } from '@kit.RemoteCommunicationKit';
import { NIM, NIMRequestResult } from '@nimsdk/base';
export interface RPCTimeout {
    /**
     * Connection timeout. The default value is 60000, in ms.
     */
    connectMs?: number;
    /**
     * Transfer timeout. The default value is 60000, in ms.
     */
    transferMs?: number;
}
export declare class RemoteCommunication {
    core: NIM;
    private sessionHashMap;
    constructor(a65: NIM);
    request(u64: string, v64?: RPCTimeout): Promise<NIMRequestResult>;
    get(q64: string): Promise<rcp.Response>;
    post(l64: string, m64?: rcp.RequestContent): Promise<rcp.Response>;
    put(g64: string, h64?: rcp.RequestContent): Promise<rcp.Response>;
    head(c64: string): Promise<rcp.Response>;
    delete(y63: string): Promise<rcp.Response>;
    cancel(w63: string): void;
    cancelAll(): void;
    close(s63: string): void;
    sessionConfig(r63?: RPCTimeout): rcp.SessionConfiguration;
}
