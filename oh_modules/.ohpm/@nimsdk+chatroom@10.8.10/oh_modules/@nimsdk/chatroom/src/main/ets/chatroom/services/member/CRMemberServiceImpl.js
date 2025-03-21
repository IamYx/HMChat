import { cmdConfigCRMember, cmdMapCRMember, registerParser, V2NIMErrorCode, V2NIMErrorImpl, validate } from '@nimsdk/base';
import CRBaseService from '../base/CRBaseService';
import { getMemberListByOptionRules, getMemberListByTagRules, setMemberBlockedStatusRules, setMemberChatBannedStatusRules, setMemberTempChatBannedRules, updateParamsRoleRules, updateSelfMemberInfoRules } from './rules';
import { ChatroomGetMemberByIdsRequest, ChatroomGetMemberCountByTagRequest, ChatroomGetMemberListByOptionRequest, ChatroomGetMemberListByTagRequest, ChatroomGetMemberListByTagRequestParam, ChatroomKickMemberRequest, ChatroomSetMemberBlockedStatusRequest, ChatroomSetMemberChatBannedStatusRequest, ChatroomSetMemberTempChatBannedRequest, ChatroomUpdateMemberRoleParam, ChatroomUpdateMemberRoleRequest, ChatroomUpdateSelfMemberInfoRequest } from './cloud/CRMemberRequest';
import { get } from '@nimsdk/vendor/Index';
import { registerCRAspect } from './Aspect';
export default class CRMemberServiceImpl extends CRBaseService {
    constructor(j26) {
        super('memberService', j26);
        registerParser(j26, { cmdMap: cmdMapCRMember, cmdConfig: cmdConfigCRMember });
        registerCRAspect(CRMemberServiceImpl);
    }
    async getMemberListByOption(d26) {
        validate(getMemberListByOptionRules, { option: d26 }, '', true);
        const e26 = (await this.core.clientSocket.sendCmd('v2ChatroomGetMemberListByOption', new ChatroomGetMemberListByOptionRequest(d26)));
        const f26 = !get(e26.content, "hasMore");
        const g26 = get(e26.content, "pageToken");
        const h26 = get(e26.content, "datas");
        const i26 = {
            finished: f26,
            pageToken: g26,
            memberList: h26
        };
        return i26;
    }
    async updateMemberRole(a26, b26) {
        validate(updateParamsRoleRules, { accountId: a26, updateParams: b26 }, '', true);
        const c26 = new ChatroomUpdateMemberRoleParam(b26, a26);
        await this.core.sendCmd('v2ChatroomUpdateMemberRole', new ChatroomUpdateMemberRoleRequest(c26));
    }
    async setMemberBlockedStatus(w25, x25, y25) {
        const z25 = new ChatroomSetMemberBlockedStatusRequest(w25, x25, y25);
        validate(setMemberBlockedStatusRules, z25, '', true);
        await this.core.sendCmd('v2ChatroomSetMemberBlockedStatus', z25);
    }
    async setMemberChatBannedStatus(s25, t25, u25) {
        const v25 = new ChatroomSetMemberChatBannedStatusRequest(s25, t25, u25);
        validate(setMemberChatBannedStatusRules, v25, '', true);
        await this.core.sendCmd('v2ChatroomSetMemberChatBannedStatus', v25);
    }
    async setMemberTempChatBanned(n25, o25, p25, q25) {
        const r25 = new ChatroomSetMemberTempChatBannedRequest(n25, o25, p25, q25);
        validate(setMemberTempChatBannedRules, r25, '', true);
        await this.core.sendCmd('v2ChatroomSetMemberTempChatBanned', r25);
    }
    async updateSelfMemberInfo(l25, m25) {
        validate(updateSelfMemberInfoRules, { updateParams: l25, antispamConfig: m25 }, '', true);
        if (typeof l25.roomAvatar === 'undefined' && typeof l25.roomNick === 'undefined' && typeof l25.serverExtension === 'undefined') {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                detail: { reason: 'updateSelfMemberInfo: nothing to update' }
            });
        }
        await this.core.clientSocket.sendCmd('v2ChatroomUpdateSelfMemberInfo', new ChatroomUpdateSelfMemberInfoRequest(l25, m25));
    }
    async getMemberByIds(j25) {
        validate({ accountIds: { type: 'array', itemType: 'string', min: 1 } }, { accountIds: j25 }, '', true);
        const k25 = (await this.core.clientSocket.sendCmd('v2ChatroomGetMemberByIds', new ChatroomGetMemberByIdsRequest(j25)));
        return get(k25.content, "datas");
    }
    async kickMember(h25, i25) {
        validate({ accountId: { type: 'string', allowEmpty: false } }, { accountId: h25 }, '', true);
        validate({ notificationExtension: { type: 'string', required: false } }, { notificationExtension: i25 }, '', true);
        await this.core.clientSocket.sendCmd('v2ChatroomKickMember', new ChatroomKickMemberRequest(h25, i25));
    }
    async getMemberListByTag(e25) {
        validate(getMemberListByTagRules, { option: e25 }, '', true);
        const f25 = new ChatroomGetMemberListByTagRequestParam(e25);
        const g25 = (await this.core.clientSocket.sendCmd('v2ChatroomGetMemberListByTag', new ChatroomGetMemberListByTagRequest(f25)));
        return {
            finished: !get(g25.content, "hasMore"),
            pageToken: get(g25.content, "pageToken"),
            memberList: get(g25.content, "datas")
        };
    }
    async getMemberCountByTag(c25) {
        validate({ tag: { type: 'string', allowEmpty: false } }, { tag: c25 }, '', true);
        const d25 = (await this.core.clientSocket.sendCmd('v2ChatroomGetMemberCountByTag', new ChatroomGetMemberCountByTagRequest(c25)));
        return get(d25.content, "data");
    }
    v2ChatroomOnMemberTagUpdatedHandler(a25) {
        if (!get(a25.content, "data.tag"))
            return;
        const b25 = JSON.parse(get(a25.content, "data.tag"));
        this.core.chatroomService.emit('onChatroomTagsUpdated', b25);
    }
}
