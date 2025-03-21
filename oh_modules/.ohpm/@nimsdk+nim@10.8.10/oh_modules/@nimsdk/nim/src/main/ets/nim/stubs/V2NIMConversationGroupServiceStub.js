import { V2NIMErrorCode, V2NIMErrorImpl, V2Service } from '@nimsdk/base';
const TAG = 'V2NIMConversationGroupServiceStub';
export class V2NIMConversationGroupServiceStub extends V2Service {
    constructor(i119, j119, k119) {
        super(j119, i119);
    }
    v2ICreateConversationGroup(f119, g119, h119) {
        this.core.logger.error(TAG, `Method 'v2ICreateConversationGroup' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2ICreateConversationGroup' not implemented.`
            }
        });
    }
    v2IDeleteConversationGroup(e119) {
        this.core.logger.error(TAG, `Method 'v2IDeleteConversationGroup' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IDeleteConversationGroup' not implemented.`
            }
        });
    }
    v2IUpdateConversationGroup(b119, c119, d119) {
        this.core.logger.error(TAG, `Method 'v2IUpdateConversationGroup' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IUpdateConversationGroup' not implemented.`
            }
        });
    }
    v2IAddConversationsToGroup(z118, a119) {
        this.core.logger.error(TAG, `Method 'v2IAddConversationsToGroup' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IAddConversationsToGroup' not implemented.`
            }
        });
    }
    v2IRemoveConversationsFromGroup(x118, y118) {
        this.core.logger.error(TAG, `Method 'v2IRemoveConversationsFromGroup' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IRemoveConversationsFromGroup' not implemented.`
            }
        });
    }
    v2IGetConversationGroup(w118) {
        this.core.logger.error(TAG, `Method 'v2IGetConversationGroup' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetConversationGroup' not implemented.`
            }
        });
    }
    v2IGetConversationGroupList() {
        this.core.logger.error(TAG, `Method 'v2IGetConversationGroupList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetConversationGroupList' not implemented.`
            }
        });
    }
    v2IGetConversationGroupListByIds(v118) {
        this.core.logger.error(TAG, `Method 'v2IGetConversationGroupListByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetConversationGroupListByIds' not implemented.`
            }
        });
    }
    createConversationGroup(s118, t118, u118) {
        this.core.logger.error(TAG, `Method 'createConversationGroup' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'createConversationGroup' not implemented.`
            }
        });
    }
    deleteConversationGroup(r118) {
        this.core.logger.error(TAG, `Method 'deleteConversationGroup' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'deleteConversationGroup' not implemented.`
            }
        });
    }
    updateConversationGroup(o118, p118, q118) {
        this.core.logger.error(TAG, `Method 'updateConversationGroup' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'updateConversationGroup' not implemented.`
            }
        });
    }
    addConversationsToGroup(m118, n118) {
        this.core.logger.error(TAG, `Method 'addConversationsToGroup' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'addConversationsToGroup' not implemented.`
            }
        });
    }
    removeConversationsFromGroup(k118, l118) {
        this.core.logger.error(TAG, `Method 'removeConversationsFromGroup' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'removeConversationsFromGroup' not implemented.`
            }
        });
    }
    getConversationGroup(j118) {
        this.core.logger.error(TAG, `Method 'getConversationGroup' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getConversationGroup' not implemented.`
            }
        });
    }
    getConversationGroupList() {
        this.core.logger.error(TAG, `Method 'getConversationGroupList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getConversationGroupList' not implemented.`
            }
        });
    }
    getConversationGroupListByIds(i118) {
        this.core.logger.error(TAG, `Method 'getConversationGroupListByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getConversationGroupListByIds' not implemented.`
            }
        });
    }
    async onLoginStart(h118) {
        this.core.logger.info(TAG, `Method 'onLoginStart' not implemented.`);
    }
    async onLoginFinished(g118) {
        this.core.logger.info(TAG, `Method 'onLoginFinished' not implemented.`);
    }
    onLogout() {
        this.core.logger.info(TAG, `Method 'onLogout' not implemented.`);
    }
}
