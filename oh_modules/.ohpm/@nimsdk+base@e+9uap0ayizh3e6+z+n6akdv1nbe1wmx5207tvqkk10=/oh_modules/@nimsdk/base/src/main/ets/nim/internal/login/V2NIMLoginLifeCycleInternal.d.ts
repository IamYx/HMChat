import { V2NIMDataSyncType } from '../../sdk/V2SyncServiceInterface';
import { V2NIMErrorImpl } from '../../utils/error';
import { NIMEStrAnyObj } from '../types';
export declare enum LoginLifeCycleEvent {
    Addressing = 0,
    Connecting = 1,
    ConnectSuccess = 2,
    ConnectFail = 3,
    ConnectionBroken = 4,
    LoginSuccess = 5,
    LoginFail = 6,
    Logout = 7,
    Kicked = 8,
    Exited = 9,
    Waiting = 10
}
export interface V2NIMLoginLifeCycleInternal {
    processEvent(eventName: LoginLifeCycleEvent, extra?: V2NIMErrorImpl | V2NIMDataSyncType | NIMEStrAnyObj | boolean): any;
    getConnectStatus(): any;
    getLoginStatus(): any;
}
