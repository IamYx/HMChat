import { V2NIMErrorCode, V2NIMErrorImpl, V2Service } from '@nimsdk/base';
const TAG = 'V2NIMLocalConversationStub';
export class V2NIMLocalConversationServiceStub extends V2Service {
    constructor(p125, q125, r125) {
        super(q125, p125);
    }
    onMessagesModify(o125) {
        this.core.logger.error(TAG, `Method onMessagesModify not implemented.`);
        return;
    }
    v2ISyncMultiMarkSessionAckHandler(m125, n125) {
        this.core.logger.error(TAG, `Method 'v2ISyncMultiMarkSessionAckHandler(${n125})' not implemented.`);
        return;
    }
    v2ISyncMultiMarkSuperTeamSessionAckHandler(k125, l125) {
        this.core.logger.error(TAG, `Method 'v2ISyncMultiMarkSuperTeamSessionAckHandler(${l125})' not implemented.`);
        return;
    }
    v2ISyncStickTopSessionsHandler(i125, j125) {
        this.core.logger.error(TAG, `Method 'v2ISyncStickTopSessionsHandler(${j125})' not implemented.`);
        return;
    }
    getConversationReadTime(h125) {
        this.core.logger.error(TAG, `Method 'getConversationReadTime' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getConversationReadTime' not implemented.`
            }
        });
    }
    markConversationRead(g125) {
        this.core.logger.error(TAG, `Method 'markConversationRead' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'markConversationRead' not implemented.`
            }
        });
    }
    onMessagesCleared(f125) {
        this.core.logger.error(TAG, `Method 'onMessagesCleared' not implemented.`);
        return;
    }
    onMessageReceived(e125) {
        this.core.logger.warn(TAG, `Method 'onMessageReceived' not implemented.`);
        return;
    }
    onMessageSent(d125) {
        this.core.logger.error(TAG, `Method 'onMessageSent' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'onMessageSent' not implemented.`
            }
        });
    }
    onMessageInserted(c125) {
        this.core.logger.error(TAG, `Method 'onMessageInserted' not implemented.`);
        return;
    }
    onMessagesDeleted(b125) {
        this.core.logger.error(TAG, `Method 'onMessagesDeleted' not implemented.`);
        return;
    }
    onMessagesRevoked(a125) {
        this.core.logger.error(TAG, `Method 'onMessagesRevoked' not implemented.`);
        return;
    }
    onMessagesSynced(z124) {
        this.core.logger.error(TAG, `Method 'onMessagesSynced' not implemented.`);
        return;
    }
    onConversationSetMute(x124, y124) {
        this.core.logger.error(TAG, `Method 'onConversationSetMute' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'onConversationSetMute' not implemented.`
            }
        });
    }
    onMessagesFetched(w124) {
        this.core.logger.error(TAG, `Method 'onMessagesFetched' not implemented.`);
        return;
    }
    getConversationList(u124, v124) {
        this.core.logger.error(TAG, `Method 'getConversationList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getConversationList' not implemented.`
            }
        });
    }
    getConversationListByOption(r124, s124, t124) {
        this.core.logger.error(TAG, `Method 'getConversationListByOption' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getConversationListByOption' not implemented.`
            }
        });
    }
    getConversation(q124) {
        this.core.logger.error(TAG, `Method 'getConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getConversation' not implemented.`
            }
        });
    }
    getConversationListByIds(p124) {
        this.core.logger.error(TAG, `Method 'getConversationListByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getConversationListByIds' not implemented.`
            }
        });
    }
    createConversation(o124) {
        this.core.logger.error(TAG, `Method 'createConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'createConversation' not implemented.`
            }
        });
    }
    deleteConversation(m124, n124) {
        this.core.logger.error(TAG, `Method 'deleteConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'deleteConversation' not implemented.`
            }
        });
    }
    deleteConversationListByIds(k124, l124) {
        this.core.logger.error(TAG, `Method 'deleteConversationListByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'deleteConversationListByIds' not implemented.`
            }
        });
    }
    stickTopConversation(i124, j124) {
        this.core.logger.error(TAG, `Method 'stickTopConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'stickTopConversation' not implemented.`
            }
        });
    }
    updateConversation(g124, h124) {
        this.core.logger.error(TAG, `Method 'updateConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'updateConversation' not implemented.`
            }
        });
    }
    updateConversationLocalExtension(e124, f124) {
        this.core.logger.error(TAG, `Method 'updateConversationLocalExtension' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'updateConversationLocalExtension' not implemented.`
            }
        });
    }
    getTotalUnreadCount() {
        this.core.logger.error(TAG, `Method 'getTotalUnreadCount' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getTotalUnreadCount' not implemented.`
            }
        });
    }
    getUnreadCountByIds(d124) {
        this.core.logger.error(TAG, `Method 'getUnreadCountByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getUnreadCountByIds' not implemented.`
            }
        });
    }
    getUnreadCountByFilter(c124) {
        this.core.logger.error(TAG, `Method 'getUnreadCountByFilter' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getUnreadCountByFilter' not implemented.`
            }
        });
    }
    clearTotalUnreadCount() {
        this.core.logger.error(TAG, `Method 'clearTotalUnreadCount' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'clearTotalUnreadCount' not implemented.`
            }
        });
    }
    clearUnreadCountByIds(b124) {
        this.core.logger.error(TAG, `Method 'clearUnreadCountByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'clearUnreadCountByIds' not implemented.`
            }
        });
    }
    clearUnreadCountByTypes(a124) {
        this.core.logger.error(TAG, `Method 'clearUnreadCountByTypes' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'clearUnreadCountByTypes' not implemented.`
            }
        });
    }
    subscribeUnreadCountByFilter(z123) {
        this.core.logger.error(TAG, `Method 'subscribeUnreadCountByFilter' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'subscribeUnreadCountByFilter' not implemented.`
            }
        });
    }
    unsubscribeUnreadCountByFilter(y123) {
        this.core.logger.error(TAG, `Method 'unsubscribeUnreadCountByFilter' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'unsubscribeUnreadCountByFilter' not implemented.`
            }
        });
    }
    async onLoginStart(x123) {
        this.core.logger.info(TAG, `Method 'onLoginStart' not implemented.`);
    }
    async onLoginFinished(w123) {
        this.core.logger.info(TAG, `Method 'onLoginFinished' not implemented.`);
    }
    onLogout() {
        this.core.logger.info(TAG, `Method 'onLogout' not implemented.`);
    }
    v2IGetConversationList(u123, v123) {
        this.core.logger.error(TAG, `Method 'v2IGetConversationList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetConversationList' not implemented.`
            }
        });
    }
    v2IGetConversationListByOption(r123, s123, t123) {
        this.core.logger.error(TAG, `Method 'v2IGetConversationListByOption' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetConversationListByOption' not implemented.`
            }
        });
    }
    v2IGetConversation(q123) {
        this.core.logger.error(TAG, `Method 'v2IGetConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetConversation' not implemented.`
            }
        });
    }
    v2IGetConversationListByIds(p123) {
        this.core.logger.error(TAG, `Method 'v2IGetConversationListByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetConversationListByIds' not implemented.`
            }
        });
    }
    v2ICreateConversation(o123) {
        this.core.logger.error(TAG, `Method 'v2ICreateConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2ICreateConversation' not implemented.`
            }
        });
    }
    v2IDeleteConversation(m123, n123) {
        this.core.logger.error(TAG, `Method 'v2IDeleteConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IDeleteConversation' not implemented.`
            }
        });
    }
    v2IDeleteConversationListByIds(k123, l123) {
        this.core.logger.error(TAG, `Method 'v2IDeleteConversationListByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IDeleteConversationListByIds' not implemented.`
            }
        });
    }
    v2IStickTopConversation(i123, j123) {
        this.core.logger.error(TAG, `Method 'v2IStickTopConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IStickTopConversation' not implemented.`
            }
        });
    }
    v2IUpdateConversation(g123, h123) {
        this.core.logger.error(TAG, `Method 'v2IUpdateConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IUpdateConversation' not implemented.`
            }
        });
    }
    v2IUpdateConversationLocalExtension(e123, f123) {
        this.core.logger.error(TAG, `Method 'v2IUpdateConversationLocalExtension' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IUpdateConversationLocalExtension' not implemented.`
            }
        });
    }
    v2IGetTotalUnreadCount() {
        this.core.logger.error(TAG, `Method 'v2IGetTotalUnreadCount' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetTotalUnreadCount' not implemented.`
            }
        });
    }
    v2IGetUnreadCountByIds(d123) {
        this.core.logger.error(TAG, `Method 'v2IGetUnreadCountByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetUnreadCountByIds' not implemented.`
            }
        });
    }
    v2IGetUnreadCountByFilter(c123) {
        this.core.logger.error(TAG, `Method 'v2IGetUnreadCountByFilter' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetUnreadCountByFilter' not implemented.`
            }
        });
    }
    v2IClearTotalUnreadCount() {
        this.core.logger.error(TAG, `Method 'v2IClearTotalUnreadCount' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IClearTotalUnreadCount' not implemented.`
            }
        });
    }
    v2IClearUnreadCountByIds(b123) {
        this.core.logger.error(TAG, `Method 'v2IClearUnreadCountByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IClearUnreadCountByIds' not implemented.`
            }
        });
    }
    v2IClearUnreadCountByGroupId(a123) {
        this.core.logger.error(TAG, `Method 'v2IClearUnreadCountByGroupId' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IClearUnreadCountByGroupId' not implemented.`
            }
        });
    }
    v2IClearUnreadCountByTypes(z122) {
        this.core.logger.error(TAG, `Method 'v2IClearUnreadCountByTypes' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IClearUnreadCountByTypes' not implemented.`
            }
        });
    }
    v2ISubscribeUnreadCountByFilter(y122) {
        this.core.logger.error(TAG, `Method 'v2ISubscribeUnreadCountByFilter' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2ISubscribeUnreadCountByFilter' not implemented.`
            }
        });
    }
    v2IUnsubscribeUnreadCountByFilter(x122) {
        this.core.logger.error(TAG, `Method 'v2IUnsubscribeUnreadCountByFilter' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IUnsubscribeUnreadCountByFilter' not implemented.`
            }
        });
    }
    v2IMarkConversationRead(w122) {
        this.core.logger.error(TAG, `Method 'v2IMarkConversationRead' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IMarkConversationRead' not implemented.`
            }
        });
    }
    v2IGetConversationReadTime(v122) {
        this.core.logger.error(TAG, `Method 'v2IGetConversationReadTime' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetConversationReadTime' not implemented.`
            }
        });
    }
}
