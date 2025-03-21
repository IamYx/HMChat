import { V2NIMErrorCode, V2NIMErrorImpl, V2NIMLoginStatus } from '@nimsdk/base';
import { V2NIMChatroomMessageNotificationType } from '../../sdk/types';
import CRBaseService from '../base/CRBaseService';
export default class CRServiceImpl extends CRBaseService {
    constructor(e39) {
        super('chatroomService', e39);
        this.setListener();
    }
    registerCustomAttachmentParser(d39) {
        this.core.messageService.registerCustomAttachmentParser(d39);
    }
    unregisterCustomAttachmentParser(c39) {
        this.core.messageService.unregisterCustomAttachmentParser(c39);
    }
    setListener() {
        this.core.eventBus.on('V2NIMChatroomMessageService/onReceiveNotification', async (p38, q38) => {
            const r38 = p38.attachment;
            const s38 = r38.type;
            switch (s38) {
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_ENTER: {
                    const a39 = p38.attachment.currentMember;
                    this.emit('onChatroomMemberEnter', a39);
                    const b39 = this.core.infoService.getChatroomInfo();
                    if (r38.operatorId !== this.core.account && b39) {
                        b39.onlineUserCount++;
                        this.core.infoService.setChatroomInfo(b39);
                    }
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_KICKED: {
                    if (Array.isArray(r38.targetIds)) {
                        for (let z38 = 0; z38 < r38.targetIds.length; z38++) {
                            this.emit('onChatroomMemberExit', r38.targetIds[z38]);
                        }
                    }
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_EXIT: {
                    this.emit('onChatroomMemberExit', r38.operatorId);
                    const y38 = this.core.infoService.getChatroomInfo();
                    if (r38.operatorId !== this.core.account && y38) {
                        y38.onlineUserCount--;
                        this.core.infoService.setChatroomInfo(y38);
                    }
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_BLOCK_REMOVED: {
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_CHAT_BANNED_ADDED: {
                    if (r38.targetIds && r38.targetIds.includes(this.core.account)) {
                        this.emit('onSelfChatBannedUpdated', true);
                    }
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_CHAT_BANNED_REMOVED: {
                    if (r38.targetIds && r38.targetIds.includes(this.core.account)) {
                        this.emit('onSelfChatBannedUpdated', false);
                    }
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_ROLE_UPDATE: {
                    this.emit('onChatroomMemberRoleUpdated', r38.previousRole, r38.currentMember);
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_TEMP_CHAT_BANNED_ADDED: {
                    if (p38.attachment.targetIds.includes(this.core.account)) {
                        const x38 = q38.data.muteDuration;
                        this.emit('onSelfTempChatBannedUpdated', true, x38);
                    }
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_ADDED: {
                    if (this.core.tags.includes(q38.data.targetTag)) {
                        const w38 = q38.data.muteDuration;
                        this.emit('onSelfTempChatBannedUpdated', true, w38);
                    }
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_TEMP_CHAT_BANNED_REMOVED: {
                    if (p38.attachment.targetIds.includes(this.core.account)) {
                        this.emit('onSelfTempChatBannedUpdated', false, 0);
                    }
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_REMOVED: {
                    this.emit('onSelfTempChatBannedUpdated', false, 0);
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_CHAT_BANNED: {
                    this.emit('onChatroomChatBannedUpdated', true);
                    const v38 = this.core.infoService.getChatroomInfo();
                    if (v38) {
                        v38.chatBanned = true;
                        this.core.infoService.setChatroomInfo(v38);
                    }
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_CHAT_BANNED_REMOVED: {
                    this.emit('onChatroomChatBannedUpdated', false);
                    const u38 = this.core.infoService.getChatroomInfo();
                    if (u38) {
                        u38.chatBanned = false;
                        this.core.infoService.setChatroomInfo(u38);
                    }
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAGS_UPDATE: {
                    this.core.options.tags = q38.data.tags || [];
                    this.emit('onChatroomTagsUpdated', q38.data.tags);
                    break;
                }
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_INFO_UPDATED: {
                    const t38 = p38.attachment.currentMember;
                    t38.memberLevel = t38.memberLevel || 0;
                    this.emit('onChatroomMemberInfoUpdated', t38);
                    break;
                }
            }
        });
    }
    async sendMessage(m38, n38, o38) {
        this.checkLoginStatus();
        return await this.core.messageService.sendMessage(m38, n38, o38);
    }
    async cancelMessageAttachmentUpload(l38) {
        this.checkLoginStatus();
        return await this.core.messageService.cancelMessageAttachmentUpload(l38);
    }
    async getMessageList(k38) {
        this.checkLoginStatus();
        return await this.core.messageService.getMessageList(k38);
    }
    async getMessageListByTag(j38) {
        this.checkLoginStatus();
        return await this.core.messageService.getMessageListByTag(j38);
    }
    async getMemberListByOption(i38) {
        this.checkLoginStatus();
        return await this.core.memberService.getMemberListByOption(i38);
    }
    async updateMemberRole(g38, h38) {
        this.checkLoginStatus();
        return await this.core.memberService.updateMemberRole(g38, h38);
    }
    async setMemberBlockedStatus(d38, e38, f38) {
        this.checkLoginStatus();
        return await this.core.memberService.setMemberBlockedStatus(d38, e38, f38);
    }
    async setMemberChatBannedStatus(a38, b38, c38) {
        this.checkLoginStatus();
        return await this.core.memberService.setMemberChatBannedStatus(a38, b38, c38);
    }
    async setMemberTempChatBanned(w37, x37, y37, z37) {
        this.checkLoginStatus();
        return await this.core.memberService.setMemberTempChatBanned(w37, x37, y37, z37);
    }
    async updateSelfMemberInfo(u37, v37) {
        this.checkLoginStatus();
        return await this.core.memberService.updateSelfMemberInfo(u37, v37);
    }
    async getMemberByIds(t37) {
        this.checkLoginStatus();
        return await this.core.memberService.getMemberByIds(t37);
    }
    async kickMember(r37, s37) {
        this.checkLoginStatus();
        return await this.core.memberService.kickMember(r37, s37);
    }
    async getMemberListByTag(q37) {
        this.checkLoginStatus();
        return await this.core.memberService.getMemberListByTag(q37);
    }
    async getMemberCountByTag(p37) {
        this.checkLoginStatus();
        return await this.core.memberService.getMemberCountByTag(p37);
    }
    getChatroomInfo() {
        return this.core.infoService.getChatroomInfo();
    }
    async updateChatroomInfo(n37, o37) {
        this.checkLoginStatus();
        return this.core.infoService.updateChatroomInfo(n37, o37);
    }
    async updateChatroomLocationInfo(m37) {
        this.checkLoginStatus();
        return this.core.infoService.updateChatroomLocationInfo(m37);
    }
    async updateChatroomTags(l37) {
        this.checkLoginStatus();
        return this.core.infoService.updateChatroomTags(l37);
    }
    async setTempChatBannedByTag(k37) {
        this.checkLoginStatus();
        return this.core.infoService.setTempChatBannedByTag(k37);
    }
    checkLoginStatus() {
        if (this.core.loginService.getLoginStatus() !== V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE
            });
        }
    }
}
