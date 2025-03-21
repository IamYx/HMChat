import { V2NIMErrorCode, V2NIMErrorImpl, V2Service } from '@nimsdk/base';
import HashMap from "@ohos.util.HashMap";
const TAG = 'V2NIMUserServiceStub';
export class V2NIMUserServiceStub extends V2Service {
    constructor(k137, l137, m137) {
        super(l137, k137);
    }
    v2IGetUserList(j137) {
        this.core.logger.error(TAG, `Method 'v2IGetUserList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetUserList' not implemented.`
            }
        });
    }
    v2IGetUserListFromCloud(i137) {
        this.core.logger.error(TAG, `Method 'v2IGetUserListFromCloud' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetUserListFromCloud' not implemented.`
            }
        });
    }
    v2IUpdateSelfUserProfile(h137) {
        this.core.logger.error(TAG, `Method 'v2IUpdateSelfUserProfile' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IUpdateSelfUserProfile' not implemented.`
            }
        });
    }
    v2IAddUserToBlockList(g137) {
        this.core.logger.error(TAG, `Method 'v2IAddUserToBlockList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IAddUserToBlockList' not implemented.`
            }
        });
    }
    v2IRemoveUserFromBlockList(f137) {
        this.core.logger.error(TAG, `Method 'v2IRemoveUserFromBlockList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IRemoveUserFromBlockList' not implemented.`
            }
        });
    }
    v2IGetBlockList() {
        this.core.logger.error(TAG, `Method 'v2IGetBlockList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2IGetBlockList' not implemented.`
            }
        });
    }
    v2ISearchUserByOption(e137) {
        this.core.logger.error(TAG, `Method 'v2ISearchUserByOption' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'v2ISearchUserByOption' not implemented.`
            }
        });
    }
    async v2IIsMute(d137) {
        this.core.logger.warn(TAG, `Method 'v2IIsMute' not implemented.`);
        return false;
    }
    async v2IIsMuteBatch(c137) {
        this.core.logger.warn(TAG, `Method 'v2IIsMute' not implemented.`);
        return new HashMap();
    }
    v2IRefreshUserInfo(a137, b137) {
        this.core.logger.warn(TAG, `Method 'v2IRefreshUserInfo' not implemented.`);
        return;
    }
    v2IRefreshUserInfoBatch(z136) {
        this.core.logger.warn(TAG, `Method 'v2IRefreshUserInfoBatch' not implemented.`);
        return;
    }
    v2ISyncSelfUserInfoHandler(x136, y136) {
        this.core.logger.warn(TAG, 'v2SyncSelfUserInfoHandler not implemented.', y136);
        return;
    }
    v2ISyncBlockAndMuteListHandler(v136, w136) {
        this.core.logger.warn(TAG, 'syncBlockAndMuteListHandler not implemented.', w136);
        return;
    }
    v2ISetUsersBySync(t136, u136) {
        this.core.logger.error(TAG, `Method 'setUsers' not implemented. on har`);
        return;
    }
    async v2IGetUsers(s136) {
        this.core.logger.error(TAG, `Method 'getUsers' not implemented. on har`);
        return [];
    }
    async v2IIsBlocked(r136) {
        this.core.logger.error(TAG, 'v2IIsBlocked not implemented.', r136);
        return false;
    }
    v2IGetMuteList() {
        this.core.logger.error(TAG, `Method 'getMuteList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `need add user har in your project`
            }
        });
    }
    v2ISetAccountMuteMode(p136, q136) {
        this.core.logger.error(TAG, `Method 'setAccountMuteMode' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND,
            detail: {
                reason: `need add user har in your project`
            }
        });
    }
    async v2IGetUser(o136) {
        this.core.logger.error(TAG, `'getUser' not implemented, no har`);
        return undefined;
    }
    async v2IGetLocalUser(n136) {
        this.core.logger.error(TAG, `'v2ILocalGetUser' not implemented, no har`);
        return undefined;
    }
    async v2IGetLocalUsers(m136) {
        this.core.logger.error(TAG, `'v2IGetLocalUsers' not implemented, no har`);
        return new HashMap();
    }
    getUserList(l136) {
        this.core.logger.error(TAG, `Method 'getUserList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getUserList' not implemented.`
            }
        });
    }
    getUserListFromCloud(k136) {
        this.core.logger.error(TAG, `Method 'getUserListFromCloud' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getUserListFromCloud' not implemented.`
            }
        });
    }
    updateSelfUserProfile(j136) {
        this.core.logger.error(TAG, `Method 'updateSelfUserProfile' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'updateSelfUserProfile' not implemented.`
            }
        });
    }
    addUserToBlockList(i136) {
        this.core.logger.error(TAG, `Method 'addUserToBlockList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'addUserToBlockList' not implemented.`
            }
        });
    }
    removeUserFromBlockList(h136) {
        this.core.logger.error(TAG, `Method 'removeUserFromBlockList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'removeUserFromBlockList' not implemented.`
            }
        });
    }
    getBlockList() {
        this.core.logger.error(TAG, `Method 'getBlockList' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getBlockList' not implemented.`
            }
        });
    }
    searchUserByOption(g136) {
        this.core.logger.error(TAG, `Method 'searchUserByOption' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'searchUserByOption' not implemented.`
            }
        });
    }
    async onLoginStart(f136) {
        this.core.logger.info(TAG, `Method 'onLoginStart' not implemented.`);
    }
    async onLoginFinished(e136) {
        this.core.logger.info(TAG, `Method 'onLoginFinished' not implemented.`);
    }
    onLogout() {
        this.core.logger.info(TAG, `Method 'onLogout' not implemented.`);
    }
}
