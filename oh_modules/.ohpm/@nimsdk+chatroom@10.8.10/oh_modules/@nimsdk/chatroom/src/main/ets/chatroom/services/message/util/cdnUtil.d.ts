import { PromiseManager } from '@nimsdk/base';
import { V2NIMChatroomCDNInfo } from '../../../sdk/types';
import V2NIMChatroomClient from '../../../V2NIMChatroomClient';
import CRMessageServiceImpl from '../CRMessageServiceImpl';
/**
 * CDN 聊天室弹幕设计工具类
 *
 * 设计文档: https://docs.popo.netease.com/team/pc/nim/pageDetail/b43b07543cb94e55a157513a6b4719b7?xyz=1701764652621#XMGy-1701931633381
 */
export default class CDNUtil {
    core: V2NIMChatroomClient;
    service: CRMessageServiceImpl;
    promiseManager: PromiseManager;
    config: V2NIMChatroomCDNInfo;
    lastSuccessTimestamp: number;
    pollingTimer: number;
    msgBufferInterval: number;
    emitTimer: number;
    constructor(h32: V2NIMChatroomClient, i32: CRMessageServiceImpl);
    reset(): void;
    setOptions(g32: V2NIMChatroomCDNInfo): void;
    private polling;
    private fetchMsgs;
    private requestSuccess;
    private decryptAES;
    private formatMessages;
    private emitSmoothly;
}
