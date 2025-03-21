import { guid, V2NIMMessageAttachmentUploadState, V2NIMMessageSendingState, V2NIMMessageType, V2Service, validate } from '@nimsdk/base';
import { get } from '@nimsdk/vendor/';
import fs from '@ohos.file.fs';
import hash from '@ohos.file.hash';
import { compatibleAttachmentRawWithV1 } from '../utils/Format';
import { audioMessageRule, fileMessageRule, imageMessageRule, videoMessageRule } from './Rules';
export default class V2NIMMessageCreatorImpl extends V2Service {
    constructor(o151, p151, q151) {
        super(p151, o151);
        this.defaultNosSceneName = 'nim_default_im';
        o151.messageCreator = this;
    }
    createCustomMessageWithAttachment(l151, m151) {
        validate({ raw: { type: 'string' } }, l151, 'attachment', true);
        validate({ subType: { type: 'number', min: 0, required: false } }, { subType: m151 }, '', true);
        const n151 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM);
        n151.attachment = l151;
        if (typeof m151 !== 'undefined' && m151 <= 0) {
            m151 = undefined;
        }
        n151.subType = m151;
        return n151;
    }
    createTextMessage(j151) {
        validate({
            text: {
                type: 'string', allowEmpty: false
            }
        }, {
            text: j151
        }, '', true);
        const k151 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT);
        k151.text = j151;
        return k151;
    }
    async createFileMessage(e151, f151, g151) {
        validate(fileMessageRule, {
            name: f151,
            sceneName: g151
        }, '', true);
        const h151 = {
            path: e151,
            name: f151 || '',
            uploadState: V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN,
            sceneName: g151 || this.defaultNosSceneName,
            size: fs.statSync(e151).size,
            ext: getFileExtension(e151),
            md5: await hash.hash(e151, 'md5')
        };
        h151.raw = compatibleAttachmentRawWithV1(h151, V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE);
        const i151 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE);
        i151.attachment = h151;
        i151.attachmentUploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN;
        return i151;
    }
    async createImageMessage(x150, y150, z150, a151, b151) {
        validate(imageMessageRule, {
            name: y150,
            sceneName: z150,
            width: a151,
            height: b151
        }, '', true);
        const c151 = {
            path: x150,
            name: y150 || '',
            uploadState: V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN,
            sceneName: z150 || this.defaultNosSceneName,
            width: a151 || 0,
            height: b151 || 0,
            size: fs.statSync(x150).size,
            ext: getFileExtension(x150),
            md5: await hash.hash(x150, 'md5')
        };
        c151.raw = compatibleAttachmentRawWithV1(c151, V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE);
        const d151 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE);
        d151.attachment = c151;
        d151.attachmentUploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN;
        return d151;
    }
    async createAudioMessage(r150, s150, t150, u150) {
        validate(audioMessageRule, {
            name: s150,
            sceneName: t150,
            duration: u150
        }, '', true);
        const v150 = {
            path: r150,
            name: s150 || '',
            uploadState: V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN,
            sceneName: t150 || this.defaultNosSceneName,
            duration: u150 || 0,
            size: fs.statSync(r150).size,
            ext: getFileExtension(r150),
            md5: await hash.hash(r150, 'md5')
        };
        v150.raw = compatibleAttachmentRawWithV1(v150, V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO);
        const w150 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO);
        w150.attachment = v150;
        w150.attachmentUploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN;
        return w150;
    }
    async createVideoMessage(j150, k150, l150, m150, n150, o150) {
        validate(videoMessageRule, {
            name: k150,
            sceneName: l150,
            duration: m150,
            width: n150,
            height: o150
        }, '', true);
        const p150 = {
            path: j150,
            name: k150 || '',
            uploadState: V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN,
            sceneName: l150 || this.defaultNosSceneName,
            duration: m150 || 0,
            width: n150 || 0,
            height: o150 || 0,
            size: fs.statSync(j150).size,
            ext: getFileExtension(j150),
            md5: await hash.hash(j150, 'md5')
        };
        p150.raw = compatibleAttachmentRawWithV1(p150, V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO);
        const q150 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO);
        q150.attachment = p150;
        q150.attachmentUploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN;
        return q150;
    }
    createLocationMessage(e150, f150, g150) {
        validate({
            latitude: {
                type: 'number', allowEmpty: false
            },
            longitude: {
                type: 'number', allowEmpty: false
            },
            address: {
                type: 'string', allowEmpty: false
            }
        }, {
            latitude: e150,
            longitude: f150,
            address: g150
        }, '', true);
        const h150 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION);
        const i150 = {
            latitude: e150,
            longitude: f150,
            address: g150
        };
        i150.raw = compatibleAttachmentRawWithV1(i150, V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION);
        h150.attachment = i150;
        return h150;
    }
    createCustomMessage(a150, b150) {
        validate({
            text: {
                type: 'string', allowEmpty: false
            }
        }, {
            text: a150
        }, '', true);
        validate({
            rawAttachment: {
                type: 'string'
            }
        }, {
            rawAttachment: b150
        }, '', true);
        const c150 = {
            raw: b150
        };
        const d150 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM);
        d150.text = a150;
        d150.attachment = c150;
        return d150;
    }
    createCallMessage(t149, u149, v149, w149, x149) {
        validate({
            type: {
                type: 'number', allowEmpty: false
            }
        }, {
            type: t149
        }, '', true);
        validate({
            channelId: {
                type: 'string', allowEmpty: false
            }
        }, {
            channelId: u149
        }, '', true);
        validate({
            status: {
                type: 'number', allowEmpty: false
            }
        }, {
            status: v149
        }, '', true);
        validate({
            durations: {
                type: 'array', allowEmpty: false
            }
        }, {
            durations: w149
        }, '', true);
        const y149 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL);
        const z149 = {
            type: t149,
            channelId: u149,
            status: v149,
            durations: w149
        };
        z149.raw = compatibleAttachmentRawWithV1(z149, V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL);
        y149.attachment = z149;
        y149.text = x149;
        return y149;
    }
    createForwardMessage(q149) {
        const r149 = [
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_ROBOT,
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION,
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_AVCHAT,
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_TIPS,
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_INVALID
        ];
        if (r149.includes(q149.messageType)) {
            return null;
        }
        const s149 = this.createMessage(q149.messageType);
        s149.text = q149.text ?? undefined;
        s149.attachment = q149.attachment;
        s149.serverExtension = q149.serverExtension;
        s149.localExtension = q149.localExtension;
        s149.subType = q149.subType;
        if (q149.attachment && typeof get(q149.attachment, 'uploadState') !== 'undefined') {
            s149.attachmentUploadState = get(q149.attachment, 'uploadState');
        }
        return s149;
    }
    createTipsMessage(o149) {
        const p149 = this.createMessage(V2NIMMessageType.V2NIM_MESSAGE_TYPE_TIPS);
        p149.text = o149;
        return p149;
    }
    createMessage(n149) {
        return {
            messageClientId: guid(),
            messageType: n149,
            createTime: Date.now(),
            sendingState: V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_UNKNOWN,
            isSelf: true,
            messageConfig: this.defaultMessageConfig(),
            pushConfig: this.defaultPushConfig(),
            routeConfig: this.defaultRouteConfig(),
            antispamConfig: this.defaultAntispamConfig()
        };
    }
    defaultMessageConfig() {
        return {
            unreadEnabled: true,
            roamingEnabled: true,
            readReceiptEnabled: false,
            historyEnabled: true,
            onlineSyncEnabled: true,
            offlineEnabled: true,
            lastMessageUpdateEnabled: true
        };
    }
    defaultPushConfig() {
        return {
            pushEnabled: true,
            pushNickEnabled: true,
            forcePush: false
        };
    }
    defaultRouteConfig() {
        return {
            routeEnabled: true
        };
    }
    defaultAntispamConfig() {
        return {
            antispamEnabled: true
        };
    }
}
export function getFileExtension(l149) {
    const m149 = l149.lastIndexOf('.');
    return m149 > -1 ? l149.slice(m149) : '';
}
