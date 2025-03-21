import { V2NIMErrorCode, V2NIMErrorImpl, V2Service } from '@nimsdk/base';
import HashMap from "@ohos.util.HashMap";
const TAG = 'V2NIMFriendServiceStub';
export class V2NIMFriendServiceStub extends V2Service {
    constructor(s122, t122, u122) {
        super(t122, s122);
    }
    clearAllAddApplication() {
        this.core.logger.warn(TAG, 'clearAllAddApplication not implemented.');
        return;
    }
    deleteAddApplication(r122) {
        this.core.logger.warn(TAG, 'deleteAddApplication not implemented.');
        return;
    }
    clearApplicationList() {
        this.core.logger.warn(TAG, 'clearApplicationList not implemented.');
        return;
    }
    v2ISyncFriendUserListHandler(p122, q122) {
        this.core.logger.warn(TAG, 'v2SyncFriendUserListHandler not implemented.', q122);
        return;
    }
    v2ISyncFriendListHandler(n122, o122) {
        this.core.logger.warn(TAG, 'syncMultiMarkSessionAckHandler not implemented.', o122);
        return;
    }
    v2IGetFriend(m122) {
        this.core.logger.warn(TAG, `Method 'getFriend' not implemented.`, m122);
        return undefined;
    }
    v2IGetLocalFriendAlias(l122) {
        this.core.logger.warn(TAG, `Method 'v2IGetLocalFriendAlias' not implemented.`, l122);
        return undefined;
    }
    async v2IGetLocalFriendAliasBatch(k122) {
        this.core.logger.warn(TAG, `Method 'v2IGetLocalFriendAliasBatch' not implemented.`, k122);
        return new HashMap();
    }
    addFriend(i122, j122) {
        this.core.logger.error(TAG, `Method 'addFriend' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'addFriend' not implemented.`
            }
        });
    }
    deleteFriend(g122, h122) {
        this.core.logger.error(TAG, `Method 'deleteFriend' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'deleteFriend' not implemented.`
            }
        });
    }
    acceptAddApplication(f122) {
        this.core.logger.error(TAG, `Method 'acceptAddApplication' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'acceptAddApplication' not implemented.`
            }
        });
    }
    rejectAddApplication(d122, e122) {
        this.core.logger.error(TAG, `Method 'rejectAddApplication' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'rejectAddApplication' not implemented.`
            }
        });
    }
    setFriendInfo(b122, c122) {
        this.core.logger.error(TAG, `Method 'setFriendInfo' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'setFriendInfo' not implemented.`
            }
        });
    }
    getFriendList() {
        this.core.logger.error(TAG, `Method 'getFriendList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getFriendList' not implemented.`
            }
        });
    }
    getFriendByIds(a122) {
        this.core.logger.error(TAG, `Method 'getFriendByIds' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getFriendByIds' not implemented.`
            }
        });
    }
    checkFriend(z121) {
        this.core.logger.error(TAG, `Method 'checkFriend' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'checkFriend' not implemented.`
            }
        });
    }
    getAddApplicationList(y121) {
        this.core.logger.error(TAG, `Method 'getAddApplicationList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getAddApplicationList' not implemented.`
            }
        });
    }
    setAddApplicationRead() {
        this.core.logger.error(TAG, `Method 'setAddApplicationRead' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'setAddApplicationRead' not implemented.`
            }
        });
    }
    getAddApplicationUnreadCount() {
        this.core.logger.error(TAG, `Method 'getAddApplicationUnreadCount' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getAddApplicationUnreadCount' not implemented.`
            }
        });
    }
    searchFriendByOption(x121) {
        this.core.logger.error(TAG, `Method 'searchFriendByOption' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'searchFriendByOption' not implemented.`
            }
        });
    }
    async onLoginStart(w121) {
        this.core.logger.info(TAG, `Method 'onLoginStart' not implemented.`);
    }
    async onLoginFinished(v121) {
        this.core.logger.info(TAG, `Method 'onLoginFinished' not implemented.`);
    }
    onLogout() {
        this.core.logger.info(TAG, `Method 'onLogout' not implemented.`);
    }
}
