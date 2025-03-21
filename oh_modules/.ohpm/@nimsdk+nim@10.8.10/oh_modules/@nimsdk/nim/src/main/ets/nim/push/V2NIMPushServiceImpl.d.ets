import { NIMPushServiceConfig } from '@nimsdk/base';
import { NIM, NIMServiceName, V2NIMPushListener, V2NIMPushServiceInternal, V2Service } from '@nimsdk/base';
import { PushCloud } from './cloud/PushCloud';
import { PushModel } from './model/PushModel';
export declare class V2NIMPushServiceImpl extends V2Service<V2NIMPushListener> implements V2NIMPushServiceInternal {
    private _model?;
    private _cloud?;
    private config;
    constructor(d97: NIM, e97: NIMServiceName, f97: NIMPushServiceConfig);
    onLoginStart(b97: string): Promise<void>;
    onLoginFinished(z96: string): Promise<void>;
    onLogout(): void;
    afterLogin(): Promise<void>;
    afterSync(): void;
    clearNotification(): void;
    hasPushed(): void;
    enable(y96: boolean): Promise<void>;
    isEnable(): Promise<boolean>;
    private doRegisterPushToken;
    /**
     * 开启推送的流程
     *
     * 1. 检查 token 是否过期
     * 1.1 过期 -> 3
     * 1.2 没过期 -> 2
     *
     * 2. 在 db 拿 token
     * 2.1 db token 无效 -> 3
     * 2.2 db token 有效 -> 5
     *
     * 3. 向华为请求 token -> 4
     * 4. 存 token & 过期时间 -> 5
     * 5. 上报 token
     * @returns
     */
    private doEnablePushToken;
    /**
     * 关闭推送的流程
     * @returns
     */
    private doDisablePushToken;
    get model(): PushModel;
    get cloud(): PushCloud;
    private registerInnerService;
    private unRegisterInnerService;
}
