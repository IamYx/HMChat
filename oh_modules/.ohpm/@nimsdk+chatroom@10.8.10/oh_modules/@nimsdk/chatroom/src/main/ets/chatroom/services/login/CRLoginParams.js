import { V2NIMLoginAuthType } from '../../sdk/loginTypes';
import { guid, V2NIMErrorCode, V2NIMErrorImpl } from '@nimsdk/base';
import { validateLinkAddressArray } from './rules';
export class CRLoginParams {
    constructor(q9) {
        this.roomId = '';
        this.token = '';
        this.loginExt = '';
        this.authType = V2NIMLoginAuthType.V2NIM_LOGIN_AUTH_TYPE_DEFAULT;
        this.linkAddresses = [];
        this.currLinkIdx = -1;
        this.isAnonymous = false;
        this.connectParams = {
            forceMode: false
        };
        this.core = q9;
    }
    checkIsSameLogin(h9, i9, j9) {
        const k9 = j9.anonymousMode === undefined ? false : j9.anonymousMode;
        const l9 = j9.loginOption?.authType || V2NIMLoginAuthType.V2NIM_LOGIN_AUTH_TYPE_DEFAULT;
        const m9 = JSON.stringify(this.enterParams?.tagConfig?.tags || []);
        const n9 = JSON.stringify(j9.tagConfig?.tags || []);
        const o9 = JSON.stringify(this.enterParams?.locationConfig || {});
        const p9 = JSON.stringify(j9.locationConfig || {});
        if (this.core.options.appkey !== h9 ||
            this.roomId !== i9 ||
            this.authType !== l9 ||
            this.isAnonymous !== k9 ||
            this.core.options.account !== j9.accountId ||
            this.enterParams?.roomNick !== j9.roomNick ||
            this.enterParams?.roomAvatar !== j9.roomAvatar ||
            m9 !== n9 ||
            o9 !== p9) {
            return false;
        }
        return true;
    }
    getNextLink() {
        this.currLinkIdx = (this.currLinkIdx + 1) % this.linkAddresses.length;
        return this.linkAddresses[this.currLinkIdx];
    }
    getCurrLink() {
        return this.linkAddresses[this.currLinkIdx];
    }
    async setParams(e9, f9, g9) {
        this.reset();
        this.roomId = f9;
        this.enterParams = g9;
        this.core.options.appkey = e9;
        this.core.options.tags = g9.tagConfig?.tags || [];
        if (g9.token) {
            this.token = g9.token;
        }
        if (g9.anonymousMode && !g9.accountId) {
            this.core.options.account = `nimanon_${guid()}`;
        }
        else {
            this.core.options.account = g9.accountId;
        }
        this.isAnonymous = g9.anonymousMode === undefined ? false : g9.anonymousMode;
        if (this.isAnonymous && !g9.roomNick) {
            if (g9.roomNick === undefined) {
                g9.roomNick = this.core.options.account;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                    detail: { reason: `roomNick is required when anonymousMode is true` }
                });
            }
        }
        this.authType = g9.loginOption?.authType || V2NIMLoginAuthType.V2NIM_LOGIN_AUTH_TYPE_DEFAULT;
        await this.updateDynamicParameters(true);
    }
    async updateDynamicParameters(b9) {
        if (!this.enterParams)
            return;
        if (b9) {
            await this.updateLinkAddress();
        }
        if (this.authType !== V2NIMLoginAuthType.V2NIM_LOGIN_AUTH_TYPE_DEFAULT && this.enterParams?.loginOption?.tokenProvider) {
            try {
                this.token = await this.enterParams.loginOption.tokenProvider(this.core.options.appkey, this.roomId, this.core.options.account);
            }
            catch (d9) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                    detail: { reason: `tokenProvider error: ` + d9 }
                });
            }
            if (this.token === null || this.token === undefined) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CALLBACK_FAILED,
                    detail: { reason: `tokenProvider should not return null or undefined when authType === 1 or authType === 2` }
                });
            }
            else if (!this.token && this.authType === V2NIMLoginAuthType.V2NIM_LOGIN_AUTH_TYPE_DYNAMIC_TOKEN) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CALLBACK_FAILED,
                    detail: { reason: `tokenProvider should not return empty string when authType === 1` }
                });
            }
        }
        if (this.enterParams?.loginOption?.loginExtensionProvider) {
            try {
                this.loginExt = await this.enterParams.loginOption.loginExtensionProvider(this.core.options.appkey, this.roomId, this.core.options.account);
            }
            catch (c9) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                    detail: { reason: `loginExtensionProvider error: ` + c9 }
                });
            }
            if ((this.loginExt === null || this.loginExt === undefined) &&
                this.authType === V2NIMLoginAuthType.V2NIM_LOGIN_AUTH_TYPE_THIRD_PARTY) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CALLBACK_FAILED,
                    detail: { reason: `loginExtensionProvider should not return null or undefined when authType === 2` }
                });
            }
        }
    }
    async updateLinkAddress() {
        if (this.enterParams?.linkProvider) {
            try {
                this.linkAddresses = await this.enterParams.linkProvider(this.core.options.account, this.roomId);
                this.currLinkIdx = -1;
                validateLinkAddressArray(this.linkAddresses);
            }
            catch (a9) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INTERNAL,
                    detail: { reason: `linkProvider error: ` + a9 }
                });
            }
        }
    }
    reset() {
        this.roomId = '';
        this.token = '';
        this.loginExt = '';
    }
    checkLoginTerminalCode(y8) {
        const z8 = [
            V2NIMErrorCode.V2NIM_ERROR_CODE_IM_DISABLED,
            V2NIMErrorCode.V2NIM_ERROR_CODE_MULTI_LOGIN_FORBIDDEN,
            V2NIMErrorCode.V2NIM_ERROR_CODE_HANDSHAKE,
            V2NIMErrorCode.V2NIM_ERROR_CODE_NOT_FOUND,
            V2NIMErrorCode.V2NIM_ERROR_CODE_FORBIDDEN,
            V2NIMErrorCode.V2NIM_ERROR_CODE_PARAMETER_ERROR,
            V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED,
            V2NIMErrorCode.V2NIM_ERROR_CODE_TIMEOUT,
            V2NIMErrorCode.V2NIM_ERROR_CODE_SERVICE_ADDRESS_INVALID,
            V2NIMErrorCode.V2NIM_ERROR_CODE_APPKEY_NOT_EXIST,
            V2NIMErrorCode.V2NIM_ERROR_CODE_CHATROOM_DISABLED,
            V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_TOKEN,
            V2NIMErrorCode.V2NIM_ERROR_CODE_CHATROOM_NOT_EXIST,
            V2NIMErrorCode.V2NIM_ERROR_CODE_CHATROOM_CLOSED,
            V2NIMErrorCode.V2NIM_ERROR_CODE_ACCOUNT_NOT_EXIST,
            V2NIMErrorCode.V2NIM_ERROR_CODE_ACCOUNT_BANNED,
            V2NIMErrorCode.V2NIM_ERROR_CODE_ACCOUNT_IN_CHATROOM_BLOCK_LIST,
            V2NIMErrorCode.V2NIM_ERROR_CODE_ROBOT_NOT_ALLOWED,
            V2NIMErrorCode.V2NIM_ERROR_CODE_BUNDLEID_CHECK_FAILED,
            403,
            422,
            317,
            404,
            302,
            414,
            417,
            431
        ];
        return z8.includes(y8);
    }
}
