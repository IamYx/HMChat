import { PromiseManager, TimerManager, V2NIMErrorImpl } from '@nimsdk/base';
import { V2NIMChatroomEnterResult } from '../../sdk/V2NIMChatroomClient';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
export declare class CRLoginPromise {
    core: V2NIMChatroomClient;
    originLoginPromise?: Promise<V2NIMChatroomEnterResult>;
    previousLoginManager: PromiseManager;
    doLoginStepsManager: PromiseManager;
    loginTimerManager: TimerManager;
    constructor(v9: V2NIMChatroomClient);
    originLoginAdd(): Promise<V2NIMChatroomEnterResult>;
    doLoginAdd<g193>(u9: Promise<g193>): Promise<g193>;
    timerDestroy(): void;
    previousClear(): void;
    doLoginClear(): void;
    resetPromise(): void;
    clearAll(): void;
    resetTimerManager(r9: number, s9: (error: V2NIMErrorImpl) => void): void;
}
