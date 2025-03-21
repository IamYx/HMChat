import { V2NIMErrorCode, V2NIMErrorImpl, V2Service } from '@nimsdk/base';
const TAG = 'V2NIMMessageServiceStub';
export class V2NIMMessageServiceStub extends V2Service {
    constructor(h129, i129, j129) {
        super(i129, h129);
    }
    v2ICreateMessageByResultValue(g129) {
        this.core.logger.error(TAG, `Method 'v2ICreateMessageByResultValue' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `project must be include message har, please add it. Cause by calling createMessageByResultSet`
            }
        });
    }
    searchLocalMessages(f129) {
        this.core.logger.error(TAG, `Method 'searchLocalMessages' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `project must be include message har, please add it`
            }
        });
    }
    createMessageByResultSet(e129) {
        this.core.logger.error(TAG, `Method 'createMessageByResultSet' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `project must be include message har, please add it. Cause by calling createMessageByResultSet`
            }
        });
    }
    registerCustomAttachmentParser(d129) {
        this.core.logger.warn(TAG, `Method 'registerCustomAttachmentParser' not implemented.`);
    }
    unregisterCustomAttachmentParser(c129) {
        this.core.logger.warn(TAG, `Method 'unregisterCustomAttachmentParser' not implemented.`);
    }
    async messageFilterShouldIgnore(b129) {
        this.core.logger.warn(TAG, `Method 'messageFilterShouldIgnore' not implemented.`);
        return false;
    }
    get messageFilter() {
        this.core.logger.warn(TAG, `Method 'messageFilter' not implemented.`);
        return undefined;
    }
    v2ISyncMessageOnModifiedHandler(a129) {
        this.core.logger.warn(TAG, `Method 'v2ISyncMessageOnModifiedHandler' not implemented.`);
        return;
    }
    v2ISyncMessageModifiedRoamHandler(z128) {
        this.core.logger.warn(TAG, `Method 'v2ISyncMessageModifiedRoamHandler' not implemented.`);
        return;
    }
    v2IUpdateAttachment(x128, y128) {
        this.core.logger.warn(TAG, `Method 'v2IUpdateAttachment' not implemented.`);
        return;
    }
    modifyMessage(v128, w128) {
        this.core.logger.error(TAG, `Method 'modifyMessage' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `project must be include message har, please add it`
            }
        });
    }
    v2ISyncSuperTeamRevokeMessageHandler(u128) {
        this.core.logger.error(TAG, `Method 'syncSuperTeamRevokeMessageHandler' not implemented. on har`);
        return;
    }
    v2ISyncClearHistoryMessageHandler(t128) {
        this.core.logger.error(TAG, `Method 'syncClearHistoryMessageHandler' not implemented. on har`);
        return;
    }
    v2ISyncOnDeleteMessagesHandler(s128) {
        this.core.logger.error(TAG, `Method 'syncOnDeleteMessagesHandler' not implemented. on har`);
        return;
    }
    v2ISyncRevokeMessageHandler(r128) {
        this.core.logger.error(TAG, `Method 'syncRevokeMessageHandler' not implemented. no har`);
        return;
    }
    v2ISyncP2PMessageReceiptsHandler(q128) {
        this.core.logger.error(TAG, `Method 'syncP2PMessageReceiptsHandler' not implemented. on har`);
        return;
    }
    v2ISyncRoamingMsgsHandler(p128) {
        this.core.logger.error(TAG, `Method 'syncRoamingMsgsHandler' not implemented. no har`);
        return;
    }
    v2ISyncOfflineMsgsHandler(o128) {
        this.core.logger.error(TAG, `Method 'syncOfflineMsgsHandler' not implemented.`);
        return;
    }
    v2IGetUnreadMessageList(m128, n128) {
        this.core.logger.error(TAG, `Method 'getUnreadMessageList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `project must be include message har, please add it`
            }
        });
    }
    v2IGetUnreadMessageCount(k128, l128) {
        this.core.logger.error(TAG, `Method 'v2IGetUnreadMessageCount' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `project must be include message har, please add it`
            }
        });
    }
    v2IProcessMessageAttachment(j128) {
        this.core.logger.error(TAG, `Method 'v2IProcessMessageAttachment' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `project must be include message har, please add it`
            }
        });
    }
    v2IGetLastMessageOfConversation(i128) {
        this.core.logger.error(TAG, `Method 'v2IGetLastMessageOfConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `project must be include message har, please add it`
            }
        });
    }
    v2IGetLastMessageOfLocalConversation(g128, h128) {
        this.core.logger.error(TAG, `Method 'v2IGetLastMessageOfLocalConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `project must be include message har, please add it`
            }
        });
    }
    v2IGetLastMessageFast(e128, f128) {
        this.core.logger.error(TAG, `Method 'v2IGetLastMessageOfLocalConversationFast' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `project must be include message har, please add it`
            }
        });
    }
    v2IDeleteLocalMessageByConversation(d128) {
        this.core.logger.error(TAG, `Method 'deleteLocalMessageByConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `project must be include message har, please add it`
            }
        });
    }
    markMessagesAck(c128) {
        this.core.logger.error(TAG, `Method 'markMessagesAck' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'markMessagesAck' not implemented.`
            }
        });
    }
    v2IFormatMessageRefer(b128) {
        this.core.logger.error(TAG, `Method 'formatMessageRefer' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `project must be include message har, please add it`
            }
        });
    }
    v2IFormatRevokeMessage(a128) {
        this.core.logger.error(TAG, `Method 'formatRevokeMessage' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `project must be include message har, please add it`
            }
        });
    }
    sendMessage(w127, x127, y127, z127) {
        this.core.logger.error(TAG, `Method 'sendMessage' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'sendMessage' not implemented.`
            }
        });
    }
    replyMessage(s127, t127, u127, v127) {
        this.core.logger.error(TAG, `Method 'replyMessage' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'replyMessage' not implemented.`
            }
        });
    }
    revokeMessage(q127, r127) {
        this.core.logger.error(TAG, `Method 'revokeMessage' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'revokeMessage' not implemented.`
            }
        });
    }
    getMessageList(p127) {
        this.core.logger.error(TAG, `Method 'getMessageList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getMessageList' not implemented.`
            }
        });
    }
    getMessageListByRefers(o127) {
        this.core.logger.error(TAG, `Method 'getMessageListByRefers' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getMessageListByRefers' not implemented.`
            }
        });
    }
    getMessageListByIds(n127) {
        this.core.logger.error(TAG, `Method 'getMessageListByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getMessageListByIds' not implemented.`
            }
        });
    }
    deleteMessage(k127, l127, m127) {
        this.core.logger.error(TAG, `Method 'deleteMessage' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'deleteMessage' not implemented.`
            }
        });
    }
    deleteMessages(h127, i127, j127) {
        this.core.logger.error(TAG, `Method 'deleteMessages' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'deleteMessages' not implemented.`
            }
        });
    }
    clearHistoryMessage(g127) {
        this.core.logger.error(TAG, `Method 'clearHistoryMessage' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'clearHistoryMessage' not implemented.`
            }
        });
    }
    updateMessageLocalExtension(e127, f127) {
        this.core.logger.error(TAG, `Method 'updateMessageLocalExtension' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'updateMessageLocalExtension' not implemented.`
            }
        });
    }
    insertMessageToLocal(a127, b127, c127, d127) {
        this.core.logger.error(TAG, `Method 'insertMessageToLocal' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'insertMessageToLocal' not implemented.`
            }
        });
    }
    pinMessage(y126, z126) {
        this.core.logger.error(TAG, `Method 'pinMessage' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'pinMessage' not implemented.`
            }
        });
    }
    unpinMessage(w126, x126) {
        this.core.logger.error(TAG, `Method 'unpinMessage' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'unpinMessage' not implemented.`
            }
        });
    }
    updatePinMessage(u126, v126) {
        this.core.logger.error(TAG, `Method 'updatePinMessage' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'updatePinMessage' not implemented.`
            }
        });
    }
    getPinnedMessageList(t126) {
        this.core.logger.error(TAG, `Method 'getPinnedMessageList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getPinnedMessageList' not implemented.`
            }
        });
    }
    addQuickComment(p126, q126, r126, s126) {
        this.core.logger.error(TAG, `Method 'addQuickComment' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'addQuickComment' not implemented.`
            }
        });
    }
    removeQuickComment(m126, n126, o126) {
        this.core.logger.error(TAG, `Method 'removeQuickComment' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'removeQuickComment' not implemented.`
            }
        });
    }
    getQuickCommentList(l126) {
        this.core.logger.error(TAG, `Method 'getQuickCommentList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getQuickCommentList' not implemented.`
            }
        });
    }
    addCollection(k126) {
        this.core.logger.error(TAG, `Method 'addCollection' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'addCollection' not implemented.`
            }
        });
    }
    removeCollections(j126) {
        this.core.logger.error(TAG, `Method 'removeCollections' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'removeCollections' not implemented.`
            }
        });
    }
    updateCollectionExtension(h126, i126) {
        this.core.logger.error(TAG, `Method 'updateCollectionExtension' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'updateCollectionExtension' not implemented.`
            }
        });
    }
    getCollectionListByOption(g126) {
        this.core.logger.error(TAG, `Method 'getCollectionListByOption' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getCollectionListByOption' not implemented.`
            }
        });
    }
    sendP2PMessageReceipt(f126) {
        this.core.logger.error(TAG, `Method 'sendP2PMessageReceipt' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'sendP2PMessageReceipt' not implemented.`
            }
        });
    }
    getP2PMessageReceipt(e126) {
        this.core.logger.error(TAG, `Method 'getP2PMessageReceipt' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getP2PMessageReceipt' not implemented.`
            }
        });
    }
    isPeerRead(d126) {
        this.core.logger.error(TAG, `Method 'isPeerRead' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'isPeerRead' not implemented.`
            }
        });
    }
    sendTeamMessageReceipts(c126) {
        this.core.logger.error(TAG, `Method 'sendTeamMessageReceipts' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'sendTeamMessageReceipts' not implemented.`
            }
        });
    }
    getTeamMessageReceipts(b126) {
        this.core.logger.error(TAG, `Method 'getTeamMessageReceipts' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getTeamMessageReceipts' not implemented.`
            }
        });
    }
    getTeamMessageReceiptDetail(z125, a126) {
        this.core.logger.error(TAG, `Method 'getTeamMessageReceiptDetail' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getTeamMessageReceiptDetail' not implemented.`
            }
        });
    }
    voiceToText(y125) {
        this.core.logger.error(TAG, `Method 'voiceToText' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'voiceToText' not implemented.`
            }
        });
    }
    cancelMessageAttachmentUpload(x125) {
        this.core.logger.error(TAG, `Method 'cancelMessageAttachmentUpload' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'cancelMessageAttachmentUpload' not implemented.`
            }
        });
    }
    searchCloudMessages(w125) {
        this.core.logger.error(TAG, `Method 'searchCloudMessages' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'searchCloudMessages' not implemented.`
            }
        });
    }
    getThreadMessageList(v125) {
        this.core.logger.error(TAG, `Method 'getThreadMessageList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getThreadMessageList' not implemented.`
            }
        });
    }
    getLocalThreadMessageList(u125) {
        this.core.logger.error(TAG, `Method 'getLocalThreadMessageList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getLocalThreadMessageList' not implemented.`
            }
        });
    }
    async onLoginStart(t125) {
        this.core.logger.info(TAG, `Method 'onLoginStart' not implemented.`);
    }
    async onLoginFinished(s125) {
        this.core.logger.info(TAG, `Method 'onLoginFinished' not implemented.`);
    }
    onLogout() {
        this.core.logger.info(TAG, `Method 'onLogout' not implemented.`);
    }
}
