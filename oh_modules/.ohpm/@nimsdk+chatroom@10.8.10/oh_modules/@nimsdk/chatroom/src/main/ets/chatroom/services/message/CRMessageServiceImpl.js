import { cmdConfigCRMessage, cmdMapCRMessage, registerParser, V2NIMErrorCode, V2NIMErrorImpl, V2NIMMessageType, validate } from '@nimsdk/base';
import { get } from '@nimsdk/vendor/Index';
import { V2NIMChatroomMessageNotificationType } from '../../sdk/types';
import CRBaseService from '../base/CRBaseService';
import { registerCRAspect } from './Aspect';
import { ChatroomGetMessageListByTagParam, ChatroomGetMessageListByTagRequest, ChatroomGetMessageListRequest, ChatroomMessageAckRequest, ChatroomMessageAckRequestParam } from './cloud/CRMessageRequest';
import { formatMessage } from './format';
import { getMessageListByTagRules, getMessageListRules, sendMessageRules, sendParamsRules } from './rules';
import CDNUtil from './util/cdnUtil';
import FileUtil from './util/fileUtil';
import SendUtil from './util/sendUtil';
export default class CRMessageServiceImpl extends CRBaseService {
    constructor(v29) {
        super('messageService', v29);
        this.customAttachmentParsers = [];
        registerParser(v29, { cmdMap: cmdMapCRMessage, cmdConfig: cmdConfigCRMessage });
        this.fileUtil = new FileUtil(this.core, this);
        this.sendUtil = new SendUtil(this.core, this);
        this.cdnUtil = new CDNUtil(this.core, this);
        this.setListener();
        registerCRAspect(CRMessageServiceImpl);
    }
    getCustomAttachmentParsers() {
        return this.customAttachmentParsers;
    }
    registerCustomAttachmentParser(u29) {
        if (typeof u29 === 'function' && this.customAttachmentParsers.indexOf(u29) === -1) {
            this.customAttachmentParsers.unshift(u29);
        }
    }
    unregisterCustomAttachmentParser(s29) {
        const t29 = this.customAttachmentParsers.indexOf(s29);
        if (t29 > -1) {
            this.customAttachmentParsers.splice(t29, 1);
        }
    }
    reset(r29) {
        this.sendUtil.reset();
        this.cdnUtil.reset();
        this.core.localAntispamUtil.reset(r29);
    }
    setListener() {
        this.core.eventBus.on('V2NIMLoginService/loginLifeCycleLoginSucc', () => {
        });
        this.core.eventBus.on('V2NIMChatroomMessageService/onReceiveNotification', (n29, o29) => {
            const p29 = n29.attachment;
            const q29 = p29.type;
            if (q29 === V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MESSAGE_REVOKE) {
                this.core.chatroomService.emit('onMessageRevokedNotification', o29.data.msgId, o29.data.msgTime);
            }
        });
    }
    async getMessageList(j29) {
        validate(getMessageListRules, { option: j29 }, '', true);
        const k29 = (await this.core.clientSocket.sendCmd('v2ChatroomGetMessageList', new ChatroomGetMessageListRequest(j29)));
        const l29 = get(k29.content, "datas");
        l29.map((m29) => formatMessage(m29, this.core));
        return l29;
    }
    async getMessageListByTag(e29) {
        validate(getMessageListByTagRules, { messageOption: e29 }, '', true);
        if (typeof e29.beginTime === 'number' && typeof e29.endTime === 'number' && e29.beginTime > e29.endTime) {
            throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER, detail: { reason: 'beginTime must be less than endTime' } });
        }
        const f29 = new ChatroomGetMessageListByTagParam(e29);
        const g29 = (await this.core.clientSocket.sendCmd('v2ChatroomGetMessageListByTag', new ChatroomGetMessageListByTagRequest(f29)));
        const h29 = get(g29.content, "datas");
        h29.map((i29) => formatMessage(i29, this.core));
        return h29;
    }
    async sendMessage(y28, z28, a29) {
        validate(sendMessageRules, { message: y28 }, '', true);
        validate(sendParamsRules, { params: z28 }, '', true);
        if (y28.senderId !== this.core.account) {
            throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE, detail: { reason: 'message.senderId must be self' } });
        }
        if (this.core.getChatroomInfo() == null) {
            throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE, detail: { reason: 'sendMessage roomId is null' } });
        }
        else {
            y28.roomId = this.core.getChatroomInfo().roomId;
        }
        const { messageBeforeSend: b29, clientAntispamResult: c29 } = this.sendUtil.prepareMessage(y28, z28);
        const d29 = await this.sendUtil.doSendMessage(b29, c29, a29);
        return d29;
    }
    v2ChatroomMessageAck(v28, w28) {
        const x28 = new ChatroomMessageAckRequestParam(v28, w28);
        this.core.clientSocket.sendCmd('v2ChatroomMessageAck', new ChatroomMessageAckRequest(x28));
    }
    v2ChatroomOnMessageHandler(r28) {
        const s28 = get(r28.content, "data");
        const t28 = s28.attachment;
        const u28 = formatMessage(s28, this.core);
        if (this.sendUtil.checkIfResend(u28)) {
            return;
        }
        if (s28.messageType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION) {
            this.core.eventBus.emit('V2NIMChatroomMessageService/onReceiveNotification', u28, t28);
        }
        else {
            this.sendUtil.cacheMsg(u28);
        }
        this.core.chatroomService.emit('onReceiveMessages', [u28]);
    }
    v2ChatroomUpdateCDNInfoHandler(p28) {
        const q28 = get(p28.content, "chatroomCdnInfo");
        this.cdnUtil.setOptions(q28);
    }
    async cancelMessageAttachmentUpload(o28) {
        return await this.fileUtil.cancelMessageAttachmentUpload(o28);
    }
}
