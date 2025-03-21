import dataRdb from '@ohos.data.relationalStore';
import { NIM, NIMEStrAnyObj, NIMServiceConfig, NIMServiceName, Packet, V2NIMAddCollectionParams, V2NIMClearHistoryMessageOption, V2NIMCollection, V2NIMCollectionOption, V2NIMMessage, V2NIMMessageCustomAttachmentParser, V2NIMMessageFilter, V2NIMMessageListener, V2NIMMessageListOption, V2NIMMessagePin, V2NIMMessageQuickComment, V2NIMMessageQuickCommentPushConfig, V2NIMMessageRefer, V2NIMMessageRevokeNotification, V2NIMMessageRevokeParams, V2NIMMessageSearchExParams, V2NIMMessageSearchParams, V2NIMMessageSearchResult, V2NIMMessageServiceInternal, V2NIMModifyMessageParams, V2NIMModifyMessageResult, V2NIMP2PMessageReadReceipt, V2NIMSendMessageParams, V2NIMSendMessageResult, V2NIMTeamMessageReadReceipt, V2NIMTeamMessageReadReceiptDetail, V2NIMThreadMessageListOption, V2NIMThreadMessageListResult, V2NIMVoiceToTextParams, V2Service } from '@nimsdk/base';
export declare class V2NIMMessageServiceStub extends V2Service<V2NIMMessageListener> implements V2NIMMessageServiceInternal {
    constructor(h129: NIM, i129: NIMServiceName, j129: NIMServiceConfig);
    v2ICreateMessageByResultValue(g129: dataRdb.ValuesBucket): V2NIMMessage | undefined;
    searchLocalMessages(f129: V2NIMMessageSearchExParams): Promise<V2NIMMessageSearchResult>;
    createMessageByResultSet(e129: dataRdb.ResultSet): V2NIMMessage | undefined;
    registerCustomAttachmentParser(d129: V2NIMMessageCustomAttachmentParser): void;
    unregisterCustomAttachmentParser(c129: V2NIMMessageCustomAttachmentParser): void;
    messageFilterShouldIgnore(b129: V2NIMMessage): Promise<boolean>;
    get messageFilter(): V2NIMMessageFilter | undefined;
    v2ISyncMessageOnModifiedHandler(a129: Packet): Promise<void>;
    v2ISyncMessageModifiedRoamHandler(z128: Packet): Promise<void>;
    v2IUpdateAttachment(x128: string, y128: string): Promise<void>;
    modifyMessage(v128: V2NIMMessage, w128: V2NIMModifyMessageParams): Promise<V2NIMModifyMessageResult>;
    v2ISyncSuperTeamRevokeMessageHandler(u128: Packet): Promise<void>;
    v2ISyncClearHistoryMessageHandler(t128: Packet): Promise<void>;
    v2ISyncOnDeleteMessagesHandler(s128: Packet): Promise<void>;
    v2ISyncRevokeMessageHandler(r128: Packet): Promise<void>;
    v2ISyncP2PMessageReceiptsHandler(q128: Packet): Promise<void>;
    v2ISyncRoamingMsgsHandler(p128: Packet): Promise<void>;
    v2ISyncOfflineMsgsHandler(o128: Packet): Promise<void>;
    v2IGetUnreadMessageList(m128: string, n128: number): Promise<V2NIMMessage[]>;
    v2IGetUnreadMessageCount(k128: string, l128: number): Promise<number>;
    v2IProcessMessageAttachment(j128: V2NIMMessage): V2NIMMessage;
    v2IGetLastMessageOfConversation(i128: string): Promise<V2NIMMessage | undefined>;
    v2IGetLastMessageOfLocalConversation(g128: string, h128: boolean): Promise<V2NIMMessage | undefined>;
    v2IGetLastMessageFast(e128: string, f128: boolean): Promise<V2NIMMessage | undefined>;
    v2IDeleteLocalMessageByConversation(d128: string): Promise<void>;
    markMessagesAck(c128: V2NIMMessage[]): void;
    v2IFormatMessageRefer(b128: V2NIMMessage | V2NIMMessageRefer): V2NIMMessageRefer;
    v2IFormatRevokeMessage(a128: NIMEStrAnyObj): V2NIMMessageRevokeNotification;
    sendMessage(w127: V2NIMMessage, x127: string, y127?: V2NIMSendMessageParams | undefined, z127?: ((percentage: number) => void) | undefined): Promise<V2NIMSendMessageResult>;
    replyMessage(s127: V2NIMMessage, t127: V2NIMMessage, u127?: V2NIMSendMessageParams | undefined, v127?: ((percentage: number) => void) | undefined): Promise<V2NIMSendMessageResult>;
    revokeMessage(q127: V2NIMMessage, r127?: V2NIMMessageRevokeParams | undefined): Promise<void>;
    getMessageList(p127: V2NIMMessageListOption): Promise<V2NIMMessage[]>;
    getMessageListByRefers(o127: V2NIMMessageRefer[]): Promise<V2NIMMessage[]>;
    getMessageListByIds(n127: string[]): Promise<V2NIMMessage[]>;
    deleteMessage(k127: V2NIMMessage, l127?: string | undefined, m127?: boolean | undefined): Promise<void>;
    deleteMessages(h127: V2NIMMessage[], i127?: string | undefined, j127?: boolean | undefined): Promise<void>;
    clearHistoryMessage(g127: V2NIMClearHistoryMessageOption): Promise<void>;
    updateMessageLocalExtension(e127: V2NIMMessage, f127: string): Promise<V2NIMMessage>;
    insertMessageToLocal(a127: V2NIMMessage, b127: string, c127?: string | undefined, d127?: number | undefined): Promise<V2NIMMessage>;
    pinMessage(y126: V2NIMMessage, z126?: string | undefined): Promise<void>;
    unpinMessage(w126: V2NIMMessageRefer, x126?: string | undefined): Promise<void>;
    updatePinMessage(u126: V2NIMMessage, v126?: string | undefined): Promise<void>;
    getPinnedMessageList(t126: string): Promise<V2NIMMessagePin[]>;
    addQuickComment(p126: V2NIMMessage, q126: number, r126?: string | undefined, s126?: V2NIMMessageQuickCommentPushConfig | undefined): Promise<void>;
    removeQuickComment(m126: V2NIMMessageRefer, n126: number, o126?: string | undefined): Promise<void>;
    getQuickCommentList(l126: V2NIMMessage[]): Promise<{
        [messageClientId: string]: V2NIMMessageQuickComment[];
    }>;
    addCollection(k126: V2NIMAddCollectionParams): Promise<V2NIMCollection>;
    removeCollections(j126: V2NIMCollection[]): Promise<number>;
    updateCollectionExtension(h126: V2NIMCollection, i126?: string | undefined): Promise<V2NIMCollection>;
    getCollectionListByOption(g126: V2NIMCollectionOption): Promise<V2NIMCollection[]>;
    sendP2PMessageReceipt(f126: V2NIMMessage): Promise<void>;
    getP2PMessageReceipt(e126: string): Promise<V2NIMP2PMessageReadReceipt>;
    isPeerRead(d126: V2NIMMessage): boolean;
    sendTeamMessageReceipts(c126: V2NIMMessage[]): Promise<void>;
    getTeamMessageReceipts(b126: V2NIMMessage[]): Promise<V2NIMTeamMessageReadReceipt[]>;
    getTeamMessageReceiptDetail(z125: V2NIMMessage, a126?: string[] | undefined): Promise<V2NIMTeamMessageReadReceiptDetail>;
    voiceToText(y125: V2NIMVoiceToTextParams): Promise<string>;
    cancelMessageAttachmentUpload(x125: V2NIMMessage): Promise<void>;
    searchCloudMessages(w125: V2NIMMessageSearchParams): Promise<V2NIMMessage[]>;
    getThreadMessageList(v125: V2NIMThreadMessageListOption): Promise<V2NIMThreadMessageListResult>;
    getLocalThreadMessageList(u125: V2NIMMessageRefer): Promise<V2NIMThreadMessageListResult>;
    onLoginStart(t125: string): Promise<void>;
    onLoginFinished(s125: string): Promise<void>;
    onLogout(): void;
}
