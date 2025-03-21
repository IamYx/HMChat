import { NIMLoginServiceConfig, V2NIMLoginClient, V2NIMLoginOption, V2NIMLoginService } from '../../sdk/V2NIMLoginService';
import { V2InternalService } from '../V2NIMInternalService';
import PromiseManager from '../../utils/promiseManager';
import { PickForRequired } from '../../utils';
import { V2NIMLoginLbsInternal } from './V2NIMLoginLbsInternal';
import { V2NIMLoginLifeCycleInternal } from './V2NIMLoginLifeCycleInternal';
import { V2NIMLoginAuthenticatorInternal } from './V2NIMLoginAuthenticatorInternal';
import { V2NIMLoginReconnectInternal } from './V2NIMLoginReconnectInternal';
import { V2NIMLoginDataSyncInternal } from './V2NIMLoginDataSyncInternal';
import { NIMEStrAnyObj } from '../types';
import { CmdForSend, Packet } from '../../parser';
import { NetConnectionReceiver } from './NetConnectionReceiver';
export interface SendCmdOptions {
    timeout?: number;
}
export declare enum DisconnectType {
    ACTIVE = 1,
    KICKED = 2,
    /**
     * 因网络变化，心跳超时，发包失败，login超时等调用 doDisconnect 的，会设置DisconnectType 为 OFFLINE
     *
     * 若登录保持阶段 转至 DisconnectType.OFFLINE，会触发 disconnect 事件，然后通知 willReconnect，并进行重连
     * 若手动登录期间 转至 DisconnectType.OFFLINE (表示 auth.isManualLoginAttempt = true, 亦即在用户手动 调用 connect 函数周期内), 此时不触发 willReconnect 和 disconnect 事件。
     *
     * 手动调用 connect 期间的 DisconnectType.OFFLINE 需要断开连接，并最终抛出异常给客户端。客户端捕获异常后，决定其应用接下来的行为
     */
    OFFLINE = 3
}
export declare enum LoginTraceStep {
    loginStart = 0,
    linkStart = 1,
    linkSuccess = 2,
    linkFailed = 3,
    loginSucceed = 4,
    loginFailed = 5,
    loginTimeout = 6,
    autoLoginStart = 7,
    autoLoginSucceed = 8,
    autoLoginFailed = 9
}
export default interface V2NIMLoginServiceInternal extends V2NIMLoginService, V2InternalService {
    reconnect: V2NIMLoginReconnectInternal;
    lbs: V2NIMLoginLbsInternal;
    authenticator: V2NIMLoginAuthenticatorInternal;
    dataSync: V2NIMLoginDataSyncInternal;
    lifeCycle: V2NIMLoginLifeCycleInternal;
    netConnectionReceiver: NetConnectionReceiver;
    originLoginPromise?: Promise<V2NIMLoginClient>;
    previousLoginManager: PromiseManager;
    doLoginStepsManager: PromiseManager;
    loginOption: PickForRequired<V2NIMLoginOption, 'retryCount' | 'forceMode' | 'authType' | 'syncLevel' | 'timeout'>;
    config: PickForRequired<NIMLoginServiceConfig, 'lbsUrls' | 'linkUrl'>;
    account: string;
    previousLoginAccount: string;
    token: string;
    checkIllegalState(): any;
    checkLoginTerminalCode(code: number): boolean;
    doLogin(isReconnect: boolean, isLoginResume: boolean): any;
    sendCmd(cmd: string, params?: NIMEStrAnyObj, options?: {
        timeout?: number;
    }): Promise<Packet | void | CmdForSend>;
    ping(): Promise<void>;
    doDisconnect(type: DisconnectType, description: string | NIMEStrAnyObj): void;
    loginTrace(step: LoginTraceStep, description?: string, target?: string): any;
}
