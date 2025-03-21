import { V2NIMLoginClient, V2NIMLoginClientChange } from '../../sdk/V2NIMLoginService';
import { NIMEStrAnyObj } from '../types';
export interface V2NIMLoginAuthenticatorInternal {
    verifyAuthentication(isAutoConnect: boolean, deviceId: string, clientSession: string): Promise<V2NIMLoginClientField>;
    refreshLoginToken(accountId: string): Promise<string>;
    refreshThirdPartyExt(accountId: string): Promise<string>;
    changeLoginClient(state: V2NIMLoginClientChange, datas: NIMEStrAnyObj): void;
    checkAutoLogin(forceMode: boolean, deviceId: string, accountId: string): Promise<boolean>;
    checkLoginTerminalCode(code: number): boolean;
    reset(): any;
    clearLastLoginClient(): any;
}
export interface V2NIMLoginClientField extends V2NIMLoginClient {
    /**
     * 登录 ip. 各端统一要求隐藏这个字段
     */
    /**
     * 登录端口. 各端统一要求隐藏这个字段
     */
    /**
     * 长连接会话的 id. 各端统一要求隐藏这个字段
     */
    consid?: string;
    /**
     * 1 表示之前有推送【仅自己有这个字段】
     */
    hasTokenPreviously?: number;
}
export interface V2NIMLoginLifeCycleLoginSuccExtra {
    accountId: string;
    isReconnect: boolean;
    loginResult: V2NIMLoginClientField;
}
