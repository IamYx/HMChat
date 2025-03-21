import { V2NIMErrorCode, V2NIMErrorImpl, V2Service } from '@nimsdk/base';
const TAG = '[V2NIMConversationServiceStub]';
export class V2NIMConversationServiceStub extends V2Service {
    constructor(s121, t121, u121) {
        super(t121, s121);
        this.setListener();
    }
    v2IGetConversationList(q121, r121) {
        this.core.logger.error(TAG, `Method 'v2IGetConversationList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetConversationList' not implemented.`
            }
        });
    }
    v2IGetConversationListByOption(n121, o121, p121) {
        this.core.logger.error(TAG, `Method 'v2IGetConversationListByOption' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetConversationListByOption' not implemented.`
            }
        });
    }
    v2IGetConversation(m121) {
        this.core.logger.error(TAG, `Method 'v2IGetConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetConversation' not implemented.`
            }
        });
    }
    v2IGetConversationListByIds(l121) {
        this.core.logger.error(TAG, `Method 'v2IGetConversationListByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetConversationListByIds' not implemented.`
            }
        });
    }
    v2ICreateConversation(k121) {
        this.core.logger.error(TAG, `Method 'v2ICreateConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2ICreateConversation' not implemented.`
            }
        });
    }
    v2IDeleteConversation(i121, j121) {
        this.core.logger.error(TAG, `Method 'v2IDeleteConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IDeleteConversation' not implemented.`
            }
        });
    }
    v2IDeleteConversationListByIds(g121, h121) {
        this.core.logger.error(TAG, `Method 'v2IDeleteConversationListByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IDeleteConversationListByIds' not implemented.`
            }
        });
    }
    v2IStickTopConversation(e121, f121) {
        this.core.logger.error(TAG, `Method 'v2IStickTopConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IStickTopConversation' not implemented.`
            }
        });
    }
    v2IUpdateConversation(c121, d121) {
        this.core.logger.error(TAG, `Method 'v2IUpdateConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IUpdateConversation' not implemented.`
            }
        });
    }
    v2IUpdateConversationLocalExtension(a121, b121) {
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
    v2IGetUnreadCountByIds(z120) {
        this.core.logger.error(TAG, `Method 'v2IGetUnreadCountByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetUnreadCountByIds' not implemented.`
            }
        });
    }
    v2IGetUnreadCountByFilter(y120) {
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
    v2IClearUnreadCountByIds(x120) {
        this.core.logger.error(TAG, `Method 'v2IClearUnreadCountByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IClearUnreadCountByIds' not implemented.`
            }
        });
    }
    v2IClearUnreadCountByGroupId(w120) {
        this.core.logger.error(TAG, `Method 'v2IClearUnreadCountByGroupId' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IClearUnreadCountByGroupId' not implemented.`
            }
        });
    }
    v2IClearUnreadCountByTypes(v120) {
        this.core.logger.error(TAG, `Method 'v2IClearUnreadCountByTypes' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IClearUnreadCountByTypes' not implemented.`
            }
        });
    }
    v2ISubscribeUnreadCountByFilter(u120) {
        this.core.logger.error(TAG, `Method 'v2ISubscribeUnreadCountByFilter' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2ISubscribeUnreadCountByFilter' not implemented.`
            }
        });
    }
    v2IUnsubscribeUnreadCountByFilter(t120) {
        this.core.logger.error(TAG, `Method 'v2IUnsubscribeUnreadCountByFilter' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IUnsubscribeUnreadCountByFilter' not implemented.`
            }
        });
    }
    v2IMarkConversationRead(s120) {
        this.core.logger.error(TAG, `Method 'v2IMarkConversationRead' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IMarkConversationRead' not implemented.`
            }
        });
    }
    v2IGetConversationReadTime(r120) {
        this.core.logger.error(TAG, `Method 'v2IGetConversationReadTime' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetConversationReadTime' not implemented.`
            }
        });
    }
    setListener() {
        this.core.eventBus.on('V2NIMConversationService/syncMainDataPreSuccess', () => {
            this.core.eventBus.emit('V2NIMSyncService/syncConvDone');
        });
        this.core.eventBus.on('V2NIMConversationService/syncMainDataPreFail', (q120) => {
        });
    }
    markConversationRead(p120) {
        this.core.logger.error(TAG, `Method 'model' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'model' not implemented.`
            }
        });
    }
    getConversationReadTime(o120) {
        this.core.logger.error(TAG, `Method 'model' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'model' not implemented.`
            }
        });
    }
    get model() {
        this.core.logger.error(TAG, `Method 'model' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'model' not implemented.`
            }
        });
    }
    get versionCache() {
        this.core.logger.error(TAG, `Method 'versionCache' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'versionCache' not implemented.`
            }
        });
    }
    get unread() {
        this.core.logger.error(TAG, `Method 'unread' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'unread' not implemented.`
            }
        });
    }
    formatConversationField(n120) {
        this.core.logger.error(TAG, `Method 'formatConversationField' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'formatConversationField' not implemented.`
            }
        });
    }
    formatConversationFields(m120) {
        this.core.logger.error(TAG, `Method 'formatConversationFields' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'formatConversationFields' not implemented.`
            }
        });
    }
    getConversationList(k120, l120) {
        this.core.logger.error(TAG, `Method 'getConversationList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getConversationList' not implemented.`
            }
        });
    }
    getConversationListByOption(h120, i120, j120) {
        this.core.logger.error(TAG, `Method 'getConversationListByOption' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getConversationListByOption' not implemented.`
            }
        });
    }
    getConversation(g120) {
        this.core.logger.error(TAG, `Method 'getConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getConversation' not implemented.`
            }
        });
    }
    getConversationListByIds(f120) {
        this.core.logger.error(TAG, `Method 'getConversationListByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getConversationListByIds' not implemented.`
            }
        });
    }
    createConversation(e120) {
        this.core.logger.error(TAG, `Method 'createConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'createConversation' not implemented.`
            }
        });
    }
    deleteConversation(c120, d120) {
        this.core.logger.error(TAG, `Method 'deleteConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'deleteConversation' not implemented.`
            }
        });
    }
    deleteConversationListByIds(a120, b120) {
        this.core.logger.error(TAG, `Method 'deleteConversationListByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'deleteConversationListByIds' not implemented.`
            }
        });
    }
    stickTopConversation(y119, z119) {
        this.core.logger.error(TAG, `Method 'stickTopConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'stickTopConversation' not implemented.`
            }
        });
    }
    updateConversation(w119, x119) {
        this.core.logger.error(TAG, `Method 'updateConversation' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'updateConversation' not implemented.`
            }
        });
    }
    updateConversationLocalExtension(u119, v119) {
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
    getUnreadCountByIds(t119) {
        this.core.logger.error(TAG, `Method 'getUnreadCountByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getUnreadCountByIds' not implemented.`
            }
        });
    }
    getUnreadCountByFilter(s119) {
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
    clearUnreadCountByIds(r119) {
        this.core.logger.error(TAG, `Method 'clearUnreadCountByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'clearUnreadCountByIds' not implemented.`
            }
        });
    }
    clearUnreadCountByGroupId(q119) {
        this.core.logger.error(TAG, `Method 'clearUnreadCountByGroupId' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'clearUnreadCountByGroupId' not implemented.`
            }
        });
    }
    clearUnreadCountByTypes(p119) {
        this.core.logger.error(TAG, `Method 'clearUnreadCountByTypes' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'clearUnreadCountByTypes' not implemented.`
            }
        });
    }
    subscribeUnreadCountByFilter(o119) {
        this.core.logger.error(TAG, `Method 'subscribeUnreadCountByFilter' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'subscribeUnreadCountByFilter' not implemented.`
            }
        });
    }
    unsubscribeUnreadCountByFilter(n119) {
        this.core.logger.error(TAG, `Method 'unsubscribeUnreadCountByFilter' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'unsubscribeUnreadCountByFilter' not implemented.`
            }
        });
    }
    async onLoginStart(m119) {
        this.core.logger.info(TAG, `Method 'onLoginStart' not implemented.`);
    }
    async onLoginFinished(l119) {
        this.core.logger.info(TAG, `Method 'onLoginFinished' not implemented.`);
    }
    onLogout() {
        this.core.logger.info(TAG, `Method 'onLogout' not implemented.`);
    }
}
