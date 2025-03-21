import { ABTestServiceInternal, ABTExperiment, NIM, NIMEBaseListener, NIMServiceConfig, NIMServiceName, V2Service } from '@nimsdk/base';
export declare class ABTestServiceImpl extends V2Service<NIMEBaseListener> implements ABTestServiceInternal {
    private experimentCache;
    private db;
    constructor(t32: NIM, u32: NIMServiceName, v32: NIMServiceConfig);
    loadAllExperiment(): Promise<void>;
    getExperimentForKey(p32: string): ABTExperiment | undefined;
    onLoginStart(n32: string): Promise<void>;
    onLoginFinished(m32: string): Promise<void>;
    onLogout(): Promise<void>;
    private fetchRemoteExperiments;
    private sessionConfig;
}
