import { LoginLifeCycleEvent, V2NIMConnectStatus, V2NIMLoginStatus } from '@nimsdk/base/';
const TAG = '[LoginLifeCycle]';
export default class V2NIMLoginLifeCycle {
    constructor(m87) {
        this.loginStatus = V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGOUT;
        this.connectStatus = V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED;
        this.core = m87;
        this.loginService = m87.loginService;
        this.logger = m87.logger;
    }
    processEvent(i87, j87, k87) {
        const l87 = this.getConnectStatus();
        switch (i87) {
            case LoginLifeCycleEvent.Addressing:
                this.logger.info(TAG, 'addressing', l87, i87);
                this.setLoginStatus(V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINING);
                this.setConnectStatus(V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTING);
                break;
            case LoginLifeCycleEvent.Connecting:
                this.logger.info(TAG, 'connecting', l87, i87);
                this.setLoginStatus(V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINING);
                this.setConnectStatus(V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTING);
                break;
            case LoginLifeCycleEvent.ConnectSuccess:
                this.logger.info(TAG, `connect success`, l87, i87);
                this.setLoginStatus(V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINING);
                this.setConnectStatus(V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED);
                break;
            case LoginLifeCycleEvent.ConnectFail:
                this.logger.error(TAG, `connect fail`, l87, i87, j87);
                this.setLoginStatus(V2NIMLoginStatus.V2NIM_LOGIN_STATUS_UNLOGIN);
                this.setConnectStatus(V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED, j87);
                break;
            case LoginLifeCycleEvent.ConnectionBroken:
                this.logger.info(TAG, 'connectionBroken', l87, i87, j87);
                this.setLoginStatus(V2NIMLoginStatus.V2NIM_LOGIN_STATUS_UNLOGIN);
                this.setConnectStatus(V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED, j87);
                this.core.eventBus.emit('V2NIMLoginService/loginLifeCycleDisconnected', j87);
                break;
            case LoginLifeCycleEvent.LoginSuccess:
                this.logger.info(TAG, 'login success, verify authentication success', l87, i87);
                this.setLoginStatus(V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED);
                this.core.eventBus.emit('V2NIMLoginService/loginLifeCycleLoginSucc', k87);
                break;
            case LoginLifeCycleEvent.LoginFail:
                this.logger.error(TAG, 'login fail due to verify authentication failed:', l87, i87, j87);
                if (!j87) {
                    return;
                }
                this.setLoginStatus(this.loginService.authenticator.checkLoginTerminalCode(j87.code) ? V2NIMLoginStatus
                    .V2NIM_LOGIN_STATUS_LOGOUT : V2NIMLoginStatus.V2NIM_LOGIN_STATUS_UNLOGIN);
                this.setConnectStatus(V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED, j87);
                this.loginService.emit('onLoginFailed', j87);
                break;
            case LoginLifeCycleEvent.Logout:
                this.logger.warn(TAG, 'logout', l87, i87);
                this.setLoginStatus(V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGOUT);
                this.setConnectStatus(V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED);
                this.core.eventBus.emit('V2NIMLoginService/loginLifeCycleLogout');
                break;
            case LoginLifeCycleEvent.Kicked:
                this.logger.warn(TAG, 'kicked', k87);
                this.setLoginStatus(V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGOUT);
                this.setConnectStatus(V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED, j87);
                this.core.eventBus.emit('V2NIMLoginService/loginLifeCycleKicked');
                break;
            case LoginLifeCycleEvent.Exited:
                this.logger.warn(TAG, 'exited', l87, i87, k87);
                this.setLoginStatus(V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGOUT);
                this.setConnectStatus(V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED, j87);
                break;
            case LoginLifeCycleEvent.Waiting:
                this.logger.warn(TAG, 'waiting to reconnect', l87, i87);
                this.setLoginStatus(V2NIMLoginStatus.V2NIM_LOGIN_STATUS_UNLOGIN);
                this.setConnectStatus(V2NIMConnectStatus.V2NIM_CONNECT_STATUS_WAITING);
                if (l87 !== V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTING) {
                    this.logger.info(TAG, 'waiting to reconnect', l87, i87);
                    this.loginService.reconnect.attempt2ReLogin();
                }
                break;
            default:
                break;
        }
    }
    getConnectStatus() {
        return this.connectStatus;
    }
    getLoginStatus() {
        return this.loginStatus;
    }
    setLoginStatus(h87) {
        if (h87 === this.loginStatus) {
            this.logger.info(TAG, `status is same: ${V2NIMLoginStatus[h87]}`);
            return;
        }
        this.loginStatus = h87;
        this.logger.info(TAG, `emit event "onLoginStatus", means ${V2NIMLoginStatus[h87]}`);
        this.loginService.emit('onLoginStatus', h87);
    }
    setConnectStatus(e87, f87) {
        if (e87 === this.connectStatus) {
            this.logger.info(TAG, `set "onConnectStatus" same ${V2NIMConnectStatus[e87]}`);
            return;
        }
        const g87 = this.connectStatus;
        this.connectStatus = e87;
        this.logger.info(TAG, `emit event "onConnectStatus", means ${V2NIMConnectStatus[e87]}`);
        this.loginService.emit('onConnectStatus', e87);
        this.delegateConnectEvent(g87, e87, f87);
    }
    delegateConnectEvent(b87, c87, d87) {
        if (b87 === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED &&
            c87 === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED) {
            d87 && this.loginService.emit('onDisconnected', d87);
        }
        if (b87 === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTING &&
            c87 === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED) {
            d87 && this.loginService.emit('onConnectFailed', d87);
        }
    }
}
