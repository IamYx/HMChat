import { getFileExtension, guid, V2NIMMessageAttachmentUploadState, V2NIMMessageSendingState, V2NIMMessageType, validate, } from '@nimsdk/base';
import { get } from '@nimsdk/vendor';
import Hash from '@ohos.file.hash';
import fs from '@ohos.file.fs';
import hash from '@ohos.file.hash';
import CRBaseService from '../../base/CRBaseService';
import { audioMessageRule, fileMessageRule, imageMessageRule, videoMessageRule } from '../rules';
import { V2NIMLoginClientType } from '../../../sdk/loginTypes';
import { compatibleCRAttachmentRawWithV1 } from '../util/fileUtil';
export default class CRMessageCreatorImpl extends CRBaseService {
    constructor(n28) {
        super("messageCreator", n28);
        this.defaultNosSceneName = 'nim_default_im';
    }
    createCustomMessageWithAttachment(k28, l28) {
        validate({ raw: { type: 'string' } }, k28, 'attachment', true);
        validate({ subType: { type: 'number', min: 0, required: false } }, { subType: l28 }, '', true);
        const m28 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM);
        m28.attachment = k28;
        if (typeof l28 !== 'undefined' && l28 <= 0) {
            l28 = undefined;
        }
        m28.subType = l28;
        return m28;
    }
    createTextMessage(i28) {
        validate({ text: { type: 'string', allowEmpty: false } }, { text: i28 }, '', true);
        const j28 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT);
        j28.text = i28;
        return j28;
    }
    async createFileMessage(d28, e28, f28) {
        validate(fileMessageRule, { name: e28, sceneName: f28 }, '', true);
        const g28 = {
            path: d28,
            name: e28 || '',
            uploadState: V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN,
            sceneName: f28 || this.defaultNosSceneName,
            size: fs.statSync(d28).size,
            ext: getFileExtension(d28),
            md5: await hash.hash(d28, 'md5')
        };
        g28.raw = compatibleCRAttachmentRawWithV1(g28, V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE);
        const h28 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE);
        h28.attachment = g28;
        h28.attachmentUploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN;
        return h28;
    }
    async createImageMessage(w27, x27, y27, z27, a28) {
        validate(imageMessageRule, { name: x27, sceneName: y27, width: z27, height: a28 }, '', true);
        let b28 = {
            path: w27,
            name: x27 || '',
            uploadState: V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN,
            sceneName: y27 || this.defaultNosSceneName,
            width: z27 || 0,
            height: a28 || 0,
            size: fs.statSync(w27).size,
            ext: getFileExtension(w27),
            md5: await hash.hash(w27, 'md5')
        };
        b28.raw = compatibleCRAttachmentRawWithV1(b28, V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE);
        const c28 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE);
        c28.attachment = b28;
        c28.attachmentUploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN;
        return c28;
    }
    async createAudioMessage(q27, r27, s27, t27) {
        validate(audioMessageRule, { name: r27, sceneName: s27, duration: t27 }, '', true);
        const u27 = {
            path: q27,
            name: r27 || '',
            uploadState: V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN,
            sceneName: s27 || this.defaultNosSceneName,
            duration: t27 || 0,
            size: fs.statSync(q27).size,
            ext: getFileExtension(q27),
            md5: await hash.hash(q27, 'md5')
        };
        u27.raw = compatibleCRAttachmentRawWithV1(u27, V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO);
        const v27 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO);
        v27.attachment = u27;
        v27.attachmentUploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN;
        return v27;
    }
    async createVideoMessage(i27, j27, k27, l27, m27, n27) {
        validate(videoMessageRule, { name: j27, sceneName: k27, duration: l27, width: m27, height: n27 }, '', true);
        const o27 = {
            path: i27,
            name: j27 || '',
            uploadState: V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN,
            sceneName: k27 || this.defaultNosSceneName,
            duration: l27 || 0,
            width: m27 || 0,
            height: n27 || 0,
            size: fs.statSync(i27).size,
            ext: getFileExtension(i27),
            md5: await hash.hash(i27, 'md5')
        };
        o27.raw = compatibleCRAttachmentRawWithV1(o27, V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO);
        const p27 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO);
        p27.attachment = o27;
        p27.attachmentUploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN;
        return p27;
    }
    createLocationMessage(d27, e27, f27) {
        validate({
            latitude: { type: 'number', allowEmpty: false },
            longitude: { type: 'number', allowEmpty: false },
            address: { type: 'string', allowEmpty: false }
        }, { latitude: d27, longitude: e27, address: f27 }, '', true);
        const g27 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION);
        const h27 = {
            latitude: d27,
            longitude: e27,
            address: f27
        };
        h27.raw = compatibleCRAttachmentRawWithV1(h27, V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION);
        g27.attachment = h27;
        return g27;
    }
    createCustomMessage(a27) {
        validate({ rawAttachment: { type: 'string' } }, { rawAttachment: a27 }, '', true);
        const b27 = {
            raw: a27
        };
        const c27 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM);
        c27.attachment = b27;
        return c27;
    }
    createForwardMessage(x26) {
        const y26 = [
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_ROBOT,
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION,
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_AVCHAT,
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_TIPS,
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_INVALID
        ];
        if (y26.includes(x26.messageType)) {
            return null;
        }
        const z26 = this.createMessage(x26.messageType);
        z26.text = x26.text;
        z26.attachment = x26.attachment;
        z26.serverExtension = x26.serverExtension;
        z26.subType = x26.subType;
        if (x26.attachment && get(x26.attachment, "uploadState")) {
            z26.attachmentUploadState = get(x26.attachment, "uploadState");
        }
        return z26;
    }
    createTipsMessage(v26) {
        const w26 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_TIPS);
        w26.text = v26;
        return w26;
    }
    createMessage(u26) {
        return {
            messageClientId: guid(),
            senderClientType: V2NIMLoginClientType.V2NIM_LOGIN_CLIENT_TYPE_HARMONY_OS,
            createTime: Date.now(),
            senderId: this.core.account,
            isSelf: true,
            sendingState: V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_UNKNOWN,
            messageType: u26,
            messageConfig: this.defaultMessageConfig(),
            routeConfig: this.defaultRouteConfig(),
            antispamConfig: this.defaultAntispamConfig()
        };
    }
    defaultMessageConfig() {
        return {
            historyEnabled: true,
            highPriority: false
        };
    }
    defaultPushConfig() {
        return {
            pushEnabled: true,
            pushNickEnabled: true,
            forcePush: false,
        };
    }
    defaultRouteConfig() {
        return {
            routeEnabled: true,
        };
    }
    defaultAntispamConfig() {
        return {
            antispamEnabled: true,
        };
    }
    fileInfo(t26) {
        fs.statSync(t26);
    }
    async md5(s26) {
        return await Hash.hash(s26, 'md5');
    }
}
