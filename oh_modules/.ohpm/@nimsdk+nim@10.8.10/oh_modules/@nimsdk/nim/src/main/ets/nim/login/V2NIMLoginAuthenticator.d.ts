import { NIM, NIMEStrAnyObj, V2NIMLoginAuthenticatorInternal, V2NIMLoginClient, V2NIMLoginClientChange, V2NIMLoginClientField, V2NIMLoginServiceInternal } from '@nimsdk/base/';
import common from '@ohos.app.ability.common';
/**
 * 登录鉴权的协议处理类
 */
export default class V2NIMLoginAuthenticator implements V2NIMLoginAuthenticatorInternal {
    context: common.Context;
    core: NIM;
    loginService: V2NIMLoginServiceInternal;
    lastLoginClientKey: string;
    loginClients: V2NIMLoginClient[];
    loginClientOfThisConnection: V2NIMLoginClient;
    constructor(r85: NIM);
    /**
     * 登录鉴权校验. 即发送登录包协议去服务器校验
     *
     * @param isAutoConnect 是否为自动登录
     * @returns 登录端信息
     */
    verifyAuthentication(d85: boolean, e85: string, f85: string): Promise<V2NIMLoginClientField>;
    /**
     * 刷新并获取登录包用的 token
     *
     * 注: 若传入了 tokenProvider, 需要执行它来刷新 token.
     *
     * tokenProvider 的 触发时机: 在连接完成且处在登录鉴权校验前，且鉴权模式 {@link V2NIMLoginOption.authType | authType} 非静态 token 模式时触发。
     *
     * @returns token
     */
    refreshLoginToken(y84: string): Promise<string>;
    /**
     * 刷新并获取登录包用的 thirdPartyExtension
     *
     * 注: 若传入了 loginExtensionProvider, 需要执行它来刷新 thirdPartyExtension.
     *
     * loginExtensionProvider 的 触发时机: 在连接完成且处在登录鉴权校验前
     *
     * @returns thirdPartyExtension
     */
    refreshThirdPartyExt(t84: string): Promise<string>;
    private processLoginFailed;
    /**
     * 多客户端登录情况的变更，可能由登录回包 26-3, 和多端登录包 26_10, 2_7, 24_8 引起。有一些策略需要关注:
     *
     * 1. 先登入的 clientId 直接通知上层，后登入的不同 consid 而相同 clientId 的设备不通知上层
     * 2. 登出的 consid 连接在内存抹除记录，判定此 consid 所属的 clientId 下没有别的连接设备，才通知上层。
     *
     * @param packet 多端登录回包
     * @returns
     */
    changeLoginClient(d84: V2NIMLoginClientChange, e84: NIMEStrAnyObj): void;
    /**
     * 检查是否为自动登录
     *
     * 设计文档: http://10.219.25.127:89/documentations/messaging/v2/v2_login.html#v2-%E7%99%BB%E9%99%86%E9%80%BB%E8%BE%91%E6%B5%81%E7%A8%8B%E5%9B%BE
     *
     * @param forceMode 是否为强制登录模式
     * @returns boolean 是否本次登录为自动登录
     */
    checkAutoLogin(w83: boolean, x83: string, y83: string): Promise<boolean>;
    /**
     * 校验 login 回包是否能用引起登录终止
     *
     * 根据 v2 api 设定，引起登录终止的协议码见: https://docs.popo.netease.com/lingxi/2dc3df08ecac408c9d549ccb89022621
     *
     * @param code 登录回包的错误码
     * @returns boolean
     */
    /**
     * 校验 login 回包是否能用引起登录终止
     *
     * 根据 v2 api 设定，引起登录终止的协议码见: https://docs.popo.netease.com/lingxi/2dc3df08ecac408c9d549ccb89022621
     *
     * @param code 登录回包的错误码
     * @returns boolean
     */
    checkLoginTerminalCode(u83: number): boolean;
    reset(): void;
    clearLastLoginClient(): void;
}
