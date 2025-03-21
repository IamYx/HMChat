import { DisconnectType, V2NIMConnectStatus, V2NIMErrorCode, V2NIMErrorImpl } from '@nimsdk/base';
import { V2NIMChatroomStatus } from '../../sdk/V2NIMChatroomService';
import { V2NIMLoginStatus } from '../../sdk/loginTypes';
const TAG = '[CRLoginLifeCycle]';
export var CRLoginLifeCycleEvent;
(function (x8) {
    x8[x8["Connect"] = 0] = "Connect";
    x8[x8["ConnectSucc"] = 1] = "ConnectSucc";
    x8[x8["ConnectFail"] = 2] = "ConnectFail";
    x8[x8["ConnectionBroken"] = 3] = "ConnectionBroken";
    x8[x8["LoginStart"] = 4] = "LoginStart";
    x8[x8["LoginSucc"] = 5] = "LoginSucc";
    x8[x8["LoginFail"] = 6] = "LoginFail";
    x8[x8["Logout"] = 7] = "Logout";
    x8[x8["Kicked"] = 8] = "Kicked";
    x8[x8["ReconnectFail"] = 9] = "ReconnectFail";
    x8[x8["Exited"] = 10] = "Exited";
    x8[x8["Waiting"] = 11] = "Waiting";
})(CRLoginLifeCycleEvent || (CRLoginLifeCycleEvent = {}));
export default class CRLoginLifeCycle {
    constructor(w8) {
        this.chatroomStatus = V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_EXITED;
        this.entered = false;
        this.core = w8;
        this.loginService = w8.loginService;
    }
    processEvent(s8, t8, u8) {
        const v8 = this.getConnectStatus();
        switch (s8) {
            case CRLoginLifeCycleEvent.Connect:
                this.core.logger.info(TAG, 'connecting');
                this.setChatroomStatus(V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_CONNECTING);
                break;
            case CRLoginLifeCycleEvent.ConnectSucc:
                this.core.logger.info(TAG, 'connectSucc');
                this.setChatroomStatus(V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_CONNECTED);
                break;
            case CRLoginLifeCycleEvent.ConnectFail:
                this.core.logger.info(TAG, 'connectFail');
                this.setChatroomStatus(V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_DISCONNECTED, t8);
                break;
            case CRLoginLifeCycleEvent.ConnectionBroken:
                this.core.logger.info(TAG, 'connectionBroken', t8);
                this.setChatroomStatus(V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_DISCONNECTED, t8);
                break;
            case CRLoginLifeCycleEvent.LoginStart:
                this.core.logger.info(TAG, 'loginStart');
                this.setChatroomStatus(V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_ENTERING);
                break;
            case CRLoginLifeCycleEvent.LoginSucc:
                this.core.logger.info(TAG, 'loginSucc');
                this.setChatroomStatus(V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_ENTERED);
                this.core.eventBus.emit('V2NIMLoginService/loginLifeCycleLoginSucc', u8);
                break;
            case CRLoginLifeCycleEvent.LoginFail:
                this.core.logger.info(TAG, 'loginFail', t8);
                this.setChatroomStatus(V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_DISCONNECTED, t8);
                break;
            case CRLoginLifeCycleEvent.Logout:
                this.core.logger.info(TAG, 'logout');
                this.setChatroomStatus(V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_EXITED);
                this.core.eventBus.emit('V2NIMLoginService/loginLifeCycleLogout');
                break;
            case CRLoginLifeCycleEvent.Kicked:
                this.core.logger.info(TAG, 'kicked');
                this.setChatroomStatus(V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_EXITED, t8);
                this.core.eventBus.emit('V2NIMLoginService/loginLifeCycleKicked');
                break;
            case CRLoginLifeCycleEvent.ReconnectFail:
                this.core.logger.info(TAG, 'reconnectFail');
                this.setChatroomStatus(V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_EXITED, t8);
                this.core.eventBus.emit('V2NIMLoginService/loginLifeCycleLogout');
                break;
            case CRLoginLifeCycleEvent.Exited:
                this.core.logger.info(TAG, 'exited');
                if (this.chatroomStatus === V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_EXITED)
                    return;
                this.setChatroomStatus(this.entered ? V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_EXITED : V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_DISCONNECTED, t8);
                break;
            case CRLoginLifeCycleEvent.Waiting:
                this.core.logger.info(TAG, 'waiting');
                this.setChatroomStatus(V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_WAITING);
                if (v8 !== V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTING) {
                    this.loginService.reconnect.attemptToReLogin();
                }
                break;
            default:
                break;
        }
    }
    getConnectStatus() {
        switch (this.chatroomStatus) {
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_EXITED:
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_DISCONNECTED:
                return V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED;
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_ENTERED:
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_ENTERING:
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_CONNECTED:
                return V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED;
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_CONNECTING:
                return V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTING;
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_WAITING:
                return V2NIMConnectStatus.V2NIM_CONNECT_STATUS_WAITING;
        }
    }
    getLoginStatus() {
        switch (this.chatroomStatus) {
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_WAITING:
                return V2NIMLoginStatus.V2NIM_LOGIN_STATUS_UNLOGIN;
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_EXITED:
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_DISCONNECTED:
                return V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGOUT;
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_CONNECTED:
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_CONNECTING:
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_ENTERING:
                return V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINING;
            case V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_ENTERED:
                return V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED;
        }
    }
    async setLoginStatus(o8, p8, q8) {
        switch (o8) {
            case V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED:
                try {
                    await this.core.clientSocket.sendCmd('v2ChatroomLogout', undefined, { timeout: 1000 });
                    this.core.clientSocket.doDisconnect(DisconnectType.ACTIVE, 'UserActiveDisconnect');
                    this.processEvent(CRLoginLifeCycleEvent.Logout, q8);
                }
                catch (r8) {
                    this.core.logger.error('Instance::disconnect sendCmd:logout error', r8);
                    this.core.clientSocket.doDisconnect(DisconnectType.ACTIVE, 'UserActiveDisconnect');
                    this.processEvent(CRLoginLifeCycleEvent.Logout, q8);
                }
                break;
            case V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINING:
                this.core.clientSocket.doDisconnect(DisconnectType.ACTIVE, 'UserActiveDisconnect');
                this.processEvent(CRLoginLifeCycleEvent.Logout, q8);
                break;
            case V2NIMLoginStatus.V2NIM_LOGIN_STATUS_UNLOGIN:
                this.core.clientSocket.doDisconnect(DisconnectType.ACTIVE, 'UserActiveDisconnect');
                this.core._clearModuleData();
                this.processEvent(CRLoginLifeCycleEvent.Logout, q8);
                break;
            case V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGOUT:
                this.core._clearModuleData();
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                    detail: { reason: `Illegal logout. connectStatus ${p8}` }
                });
            default:
                this.core._clearModuleData();
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                    detail: { reason: `Illegal logout. loginStatus ${o8}. connectStatus ${p8}` }
                });
        }
    }
    setChatroomStatus(m8, n8) {
        if (m8 === V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_ENTERED) {
            this.entered = true;
        }
        if (this.chatroomStatus === m8)
            return;
        this.chatroomStatus = m8;
        if (m8 === V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_EXITED) {
            this.core._clearModuleData();
        }
        this.core.logger.info(TAG, 'onChatroomStatus', m8);
        this.core.emit('onChatroomStatus', m8, n8);
        if (m8 === V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_EXITED && this.entered) {
            this.entered = false;
            this.core.logger.info(TAG, 'onChatroomExited', JSON.stringify(n8));
            this.core.emit('onChatroomExited', n8);
        }
    }
}
