import { V2NIMErrorCode, V2NIMErrorImpl, V2NIMMessageAttachmentUploadState, V2NIMMessageSendingState, V2NIMMessageType, } from '@nimsdk/base';
import { V2NIMClientAntispamOperateType } from '@nimsdk/base';
import { formatMessage } from '../format';
import { ChatroomSendMessageRequest } from '../cloud/CRMessageRequest';
export default class SendUtil {
    constructor(l35, m35) {
        this.msgs = [];
        this.maxIdCount = 100;
        this.core = l35;
        this.service = m35;
    }
    reset() {
        this.msgs = [];
    }
    prepareMessage(f35, g35 = {}) {
        const h35 = this.checkIfResend(f35);
        const { clientAntispamResult: i35, text: j35 } = this.checkIfAntispam(g35, f35);
        f35.text = j35;
        const k35 = this.generateSendMessage({
            message: f35,
            params: g35,
            resend: h35,
            clientAntispamResult: i35
        });
        return { messageBeforeSend: k35, clientAntispamResult: i35 };
    }
    async doSendMessage(t34, u34, v34) {
        if (t34.attachment &&
            typeof t34.attachment === 'object' &&
            'uploadState' in t34.attachment &&
            !t34.attachment.url &&
            (t34.attachment.uploadState === V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN ||
                t34.attachment.uploadState === V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_FAILED)) {
            const d35 = this.core.storageService.hasStorageScene(t34.attachment.sceneName);
            if (d35 === false) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                    detail: { reason: `invalid param scene name not exist` }
                });
            }
            try {
                t34.attachmentUploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UPLOADING;
                t34.attachment.uploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UPLOADING;
                this.core.chatroomService.emit('onSendMessage', t34);
                await this.service.fileUtil.doSendFile(t34, v34);
                t34.attachmentUploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_SUCCESS;
                t34.attachment.uploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_SUCCESS;
                this.core.chatroomService.emit('onSendMessage', t34);
            }
            catch (e35) {
                t34.attachmentUploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_FAILED;
                t34.attachment.uploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_FAILED;
                t34.sendingState = V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_FAILED;
                this.core.chatroomService.emit('onSendMessage', t34);
                throw e35;
            }
        }
        else {
            this.core.chatroomService.emit('onSendMessage', t34);
        }
        this.cacheMsg(t34);
        let w34;
        try {
            w34 = (await this.core.clientSocket.sendCmd('v2ChatroomSendMessage', new ChatroomSendMessageRequest(t34)));
        }
        catch (c35) {
            t34.sendingState = V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_FAILED;
            this.core.chatroomService.emit('onSendMessage', t34);
            throw c35;
        }
        let x34;
        if (t34.attachment &&
            typeof t34.attachment === 'object' &&
            'path' in t34.attachment) {
            const { attachment: { path: a35, ...b35 } } = t34;
            x34 = {
                ...t34,
                ...w34.content.data,
                sendingState: V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED,
                attachment: {
                    path: a35,
                    ...b35
                }
            };
        }
        else {
            x34 = {
                ...t34,
                ...w34.content.data,
                sendingState: V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED
            };
        }
        const y34 = formatMessage(x34, this.core);
        const z34 = y34.antispamResult;
        if (z34) {
            y34.sendingState = V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_FAILED;
        }
        delete y34.antispamResult;
        this.core.chatroomService.emit('onSendMessage', y34);
        return {
            message: y34,
            ...(z34 ? { antispamResult: z34 } : {}),
            ...(u34 ? { clientAntispamResult: u34 } : {})
        };
    }
    cacheMsg(s34) {
        this.msgs.push({ messageClientId: s34.messageClientId, senderId: s34.senderId });
        if (this.msgs.length > this.maxIdCount)
            this.msgs.shift();
    }
    checkIfResend(q34) {
        return this.msgs.some((r34) => r34.messageClientId === q34.messageClientId);
    }
    generateSendMessage(j34) {
        const { message: k34, params: l34, resend: m34, clientAntispamResult: n34 } = j34;
        const o34 = {};
        if (k34.locationInfo || l34.locationInfo) {
            o34.x = (k34.locationInfo || l34.locationInfo)?.x || 0;
            o34.y = (k34.locationInfo || l34.locationInfo)?.y || 0;
            o34.z = (k34.locationInfo || l34.locationInfo)?.z || 0;
        }
        const p34 = {
            ...k34,
            ...l34,
            messageConfig: {
                ...k34.messageConfig,
                ...l34.messageConfig
            },
            routeConfig: {
                ...k34.routeConfig,
                ...l34.routeConfig
            },
            antispamConfig: {
                ...k34.antispamConfig,
                ...l34.antispamConfig
            },
            locationInfo: o34,
            resend: m34,
            sendingState: V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_SENDING,
            clientAntispamHit: n34 ? n34.operateType === V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_SERVER_SHIELD
                : false
        };
        if (p34.messageType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT ||
            p34.messageType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_TIPS) {
            p34.attachment = p34.text;
        }
        return p34;
    }
    checkIfAntispam(f34, g34) {
        let h34;
        let i34 = g34.text;
        if (f34.clientAntispamEnabled) {
            if (g34.messageType !== V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM && g34.text) {
                h34 = this.core.localAntispamUtil.checkTextAntispam(g34.text || '', f34.clientAntispamReplace);
                if (h34.operateType.valueOf() === V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_REPLACE) {
                    i34 = h34.replacedText;
                }
                else if (h34.operateType.valueOf() === V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_CLIENT_SHIELD) {
                    g34.sendingState = V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_FAILED;
                    this.core.chatroomService.emit('onSendMessage', g34);
                    throw new V2NIMErrorImpl({
                        code: V2NIMErrorCode.V2NIM_ERROR_CODE_CLIENT_ANTISPAM,
                        detail: { reason: 'sendMessage: text intercepted by client antispam' }
                    });
                }
            }
        }
        return { clientAntispamResult: h34, text: i34 };
    }
}
