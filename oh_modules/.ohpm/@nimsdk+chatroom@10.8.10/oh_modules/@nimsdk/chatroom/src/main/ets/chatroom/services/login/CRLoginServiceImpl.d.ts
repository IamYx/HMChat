import { V2NIMConnectStatus } from '@nimsdk/base';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import CRLoginAuthenticator from './CRLoginAuthenticator';
import CRLoginLifeCycle from './CRLoginLifeCycle';
import CRLoginReconnect from './CRLoginReconnect';
import CRBaseService from '../base/CRBaseService';
import { V2NIMChatroomEnterResult } from '../../sdk/V2NIMChatroomClient';
import { V2NIMChatroomEnterParams } from '../../sdk/V2NIMChatroomService';
import { V2NIMLoginStatus } from '../../sdk/loginTypes';
import { CRLoginParams } from './CRLoginParams';
import { CRLoginPromise } from './CRLoginPromise';
import { HarmonyNetConnectionReceiverCR } from '../utils/HarmonyNetworkCR';
export default class CRLoginServiceImpl extends CRBaseService {
    reconnect: CRLoginReconnect;
    authenticator: CRLoginAuthenticator;
    lifeCycle: CRLoginLifeCycle;
    loginPromise: CRLoginPromise;
    netConnectionReceiver: HarmonyNetConnectionReceiverCR;
    prevLoginResult?: V2NIMChatroomEnterResult;
    loginParams: CRLoginParams;
    constructor(n11: V2NIMChatroomClient);
    login(h11: string, i11: string, j11: V2NIMChatroomEnterParams): Promise<V2NIMChatroomEnterResult>;
    resetTimerManager(f11?: number): void;
    get clientSocket(): import("./socket/CRBinaryClientSocketImpl").CRBinaryClientSocketImpl;
    reset(): void;
    ping(): Promise<void>;
    /**
     * 封装函数, 尝试多次 doLogin 登录操作.
     *
     * @param originLoginPromise 上一次的 login 动作的 promise.
     * 如果是 smoothForLogining "平滑登录" 需要, 则传入这个参数来 “接管” 上一次 login 的进展.
     * @param originLoginPromise
     * @returns
     * @returns Promise<V2NIMChatroomEnterResult>
     */
    multiTryDoLogin(z10?: Promise<V2NIMChatroomEnterResult>): Promise<V2NIMChatroomEnterResult>;
    doLogin(w10: boolean): Promise<V2NIMChatroomEnterResult>;
    /**
     * 平滑登录处理
     *
     */
    smoothLogin(t10: string, u10: string, v10: V2NIMChatroomEnterParams): Promise<V2NIMChatroomEnterResult | null>;
    smoothForLogined(p10: string, q10: string, r10: V2NIMChatroomEnterParams): Promise<V2NIMChatroomEnterResult>;
    /**
     * 平滑登录logining
     *
     */
    smoothForLogining(l10: string, m10: string, n10: V2NIMChatroomEnterParams): Promise<V2NIMChatroomEnterResult>;
    /**
     * 校验是否为相同的登录
     *
     * if 分支说明:
     * 1. account 和 鉴权模式相同下
     *   a. 若为静态登录. 判定 token 是否也相同再返回
     *   b. 若为动态的或者第三方的登录. 满足 1 条件足够，所以直接返回 true.
     * 2. account 和 鉴权模式只要有一个不同，认为不是相同登录，返回 false
     */
    logout(): Promise<void>;
    getConnectStatus(): V2NIMConnectStatus;
    getLoginStatus(): V2NIMLoginStatus;
    getRoomId(): string;
    private v2LoginHandler;
    private v2ChatroomBeKickedHandler;
    private sdkLogUploadHandler;
}
