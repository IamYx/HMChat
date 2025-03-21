import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import CRLoginServiceImpl from './CRLoginServiceImpl';
/**
 * 重连逻辑处理类
 */
export default class CRLoginReconnect {
    core: V2NIMChatroomClient;
    loginService: CRLoginServiceImpl;
    retryCount: number;
    reconnectTimer: number;
    backoffIntervals: number[];
    reconnectInterval: number;
    constructor(d10: V2NIMChatroomClient);
    reset(): void;
    clearReconnectTimer(): void;
    /**
     * 重连准备
     *
     * @returns 是否会进行重连
     */
    attemptToReLogin(): boolean;
    doReLogin(): Promise<void>;
}
