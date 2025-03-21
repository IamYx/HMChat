import { Logger, LoginLifeCycleEvent, NIM, NIMEStrAnyObj, V2NIMConnectStatus, V2NIMErrorImpl, V2NIMLoginServiceInternal, V2NIMLoginStatus } from '@nimsdk/base/';
export default class V2NIMLoginLifeCycle {
    core: NIM;
    loginService: V2NIMLoginServiceInternal;
    logger: Logger;
    loginStatus: V2NIMLoginStatus;
    connectStatus: V2NIMConnectStatus;
    constructor(m87: NIM);
    processEvent(i87: LoginLifeCycleEvent, j87?: V2NIMErrorImpl, k87?: NIMEStrAnyObj): void;
    getConnectStatus(): V2NIMConnectStatus;
    getLoginStatus(): V2NIMLoginStatus;
    /**
     * 登录状态变更设置
     *
     * @param loginStatus 登录状态
     */
    private setLoginStatus;
    /**
     * 委托触发登录状态变更所引起的事件
     *
     * 登录状态的前后状态转移见：https://docs.popo.netease.com/lingxi/2dc3df08ecac408c9d549ccb89022621
     *
     * @param oldStatus 前状态
     * @param newStatus 后状态
     * @param err 出现错误的理由
     */
    /**
     * 连接状态变更设置
     *
     * @param connectStatus 连接状态
     * @param err 出现错误的理由，透传给委托函数
     */
    private setConnectStatus;
    /**
     * 委托触发连接状态变更所引起的事件
     *
     * 连接状态的前后状态转移见：https://docs.popo.netease.com/lingxi/2dc3df08ecac408c9d549ccb89022621
     *
     * @param oldStatus 前状态
     * @param newStatus 后状态
     * @param err 出现错误的理由
     */
    private delegateConnectEvent;
}
