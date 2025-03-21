import CRLoginServiceImpl from './CRLoginServiceImpl';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import { NIMEStrAnyObj, V2NIMConnectStatus, V2NIMErrorImpl } from '@nimsdk/base';
import { V2NIMChatroomStatus } from '../../sdk/V2NIMChatroomService';
import { V2NIMLoginStatus } from '../../sdk/loginTypes';
export declare enum CRLoginLifeCycleEvent {
    Connect = 0,
    ConnectSucc = 1,
    ConnectFail = 2,
    ConnectionBroken = 3,
    LoginStart = 4,
    LoginSucc = 5,
    LoginFail = 6,
    Logout = 7,
    Kicked = 8,
    ReconnectFail = 9,
    Exited = 10,
    Waiting = 11
}
export default class CRLoginLifeCycle {
    core: V2NIMChatroomClient;
    loginService: CRLoginServiceImpl;
    chatroomStatus: V2NIMChatroomStatus;
    entered: boolean;
    constructor(w8: V2NIMChatroomClient);
    processEvent(s8: CRLoginLifeCycleEvent, t8?: V2NIMErrorImpl, u8?: NIMEStrAnyObj): void;
    getConnectStatus(): V2NIMConnectStatus;
    getLoginStatus(): V2NIMLoginStatus;
    setLoginStatus(o8: V2NIMLoginStatus, p8: V2NIMConnectStatus, q8?: V2NIMErrorImpl): Promise<void>;
    setChatroomStatus(m8: V2NIMChatroomStatus, n8?: V2NIMErrorImpl): void;
}
