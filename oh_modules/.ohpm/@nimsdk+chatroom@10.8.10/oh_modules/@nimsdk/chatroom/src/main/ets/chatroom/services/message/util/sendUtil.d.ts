import { V2NIMClientAntispamResult } from '@nimsdk/base';
import { V2NIMChatroomMessage, V2NIMSendChatroomMessageParams, V2NIMSendChatroomMessageResult } from '../../../sdk/types';
import V2NIMChatroomClient from '../../../V2NIMChatroomClient';
import CRMessageServiceImpl from '../CRMessageServiceImpl';
export default class SendUtil {
    core: V2NIMChatroomClient;
    service: CRMessageServiceImpl;
    msgs: {
        messageClientId: string;
        senderId: string;
    }[];
    maxIdCount: number;
    constructor(l35: V2NIMChatroomClient, m35: CRMessageServiceImpl);
    reset(): void;
    /**
     * 检验和预处理欲发送的消息
     */
    prepareMessage(f35: Partial<V2NIMChatroomMessage>, g35?: V2NIMSendChatroomMessageParams): {
        messageBeforeSend: V2NIMChatroomMessage;
        clientAntispamResult: V2NIMClientAntispamResult | void;
    };
    doSendMessage(t34: V2NIMChatroomMessage, u34: V2NIMClientAntispamResult | void, v34?: (percentage: number) => void): Promise<V2NIMSendChatroomMessageResult>;
    cacheMsg(s34: V2NIMChatroomMessage): void;
    /**
     * 查询这条消息是否能算作重发
     */
    checkIfResend(q34: Partial<V2NIMChatroomMessage>): boolean;
    /**
     * 从发送消息的参数中，构建一个消息体。
     */
    generateSendMessage(j34: {
        message: Partial<V2NIMChatroomMessage>;
        params: V2NIMSendChatroomMessageParams;
        resend: boolean;
        clientAntispamResult: V2NIMClientAntispamResult | undefined;
    }): V2NIMChatroomMessage;
    /**
     * 检查反垃圾命中情况
     */
    checkIfAntispam(f34: V2NIMSendChatroomMessageParams, g34: Partial<V2NIMChatroomMessage>): {
        clientAntispamResult: V2NIMClientAntispamResult;
        text: string;
    };
}
