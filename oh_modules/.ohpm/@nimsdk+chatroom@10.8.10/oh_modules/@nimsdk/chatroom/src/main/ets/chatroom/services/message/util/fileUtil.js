import { V2NIMErrorCode, V2NIMErrorImpl, V2NIMMessageAttachmentUploadState, V2NIMMessageSendingState, V2NIMMessageType, validate } from '@nimsdk/base';
import { cloneDeep, set, unset } from '@nimsdk/vendor/Index';
export default class FileUtil {
    constructor(d34, e34) {
        this.core = d34;
        this.service = e34;
    }
    async doSendFile(w33, x33) {
        const y33 = w33.attachment;
        const z33 = {
            taskId: w33.messageClientId,
            uploadParams: {
                filePath: y33?.path,
                sceneName: y33?.sceneName
            }
        };
        const a34 = {
            fileType: w33.messageType
        };
        try {
            const c34 = await this.core.storageService.uploadFileTask(z33, x33, a34);
            completeCRAttachment(w33, c34);
        }
        catch (b34) {
            if (w33.attachment) {
                ;
                w33.attachment.uploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_FAILED;
            }
            throw b34;
        }
    }
    async cancelMessageAttachmentUpload(v33) {
        validate({ messageClientId: { type: 'string', allowEmpty: false } }, v33, '', true);
        if (![
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO,
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE,
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE,
            V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO
        ].includes(v33.messageType)) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
                detail: { reason: `cancelMessageAttachmentUpload: messageType ${v33.messageType} incorrect` }
            });
        }
        if (v33.sendingState === V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_FAILED ||
            v33.sendingState === V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST,
                detail: { reason: `cancelMessageAttachmentUpload: message is already failed or succeeded` }
            });
        }
        await this.core.storageService.cancelUploadFileByTaskId(v33.messageClientId);
    }
}
export function completeCRAttachment(p33, q33) {
    const r33 = p33.attachment;
    r33.url = q33.url;
    r33.size = q33.size;
    r33.ext = q33.ext && q33.ext.indexOf('.') === -1 ? `.${q33.ext}` : q33.ext;
    r33.uploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_SUCCESS;
    p33.attachmentUploadState = V2NIMMessageAttachmentUploadState.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_SUCCESS;
    if (p33.messageType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE) {
        const u33 = r33;
        u33.height = u33.height > 0 ? u33.height : q33.h ?? 0;
        u33.width = u33.width > 0 ? u33.width : q33.w ?? 0;
    }
    else if (p33.messageType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO) {
        const t33 = r33;
        t33.height = t33.height > 0 ? t33.height : q33.h ?? 0;
        t33.width = t33.width > 0 ? t33.width : q33.w ?? 0;
        t33.duration = t33.duration > 0 ? t33.duration : q33.dur ?? 0;
    }
    else if (p33.messageType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO) {
        const s33 = r33;
        s33.duration = s33.duration > 0 ? s33.duration : q33.dur ?? 0;
    }
    p33.attachment = r33;
    p33.attachment.raw = attachmentToRaw(p33.messageType, r33);
}
export function compatibleCRAttachmentRawWithV1(g33, h33) {
    const i33 = cloneDeep(g33);
    if (h33 === V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION) {
        const o33 = i33;
        set(o33, "lat", o33.latitude);
        set(o33, "lng", o33.longitude);
        set(o33, "title", o33.address);
        unset(o33, "latitude");
        unset(o33, "longitude");
        unset(o33, "address");
    }
    else if (h33 === V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE) {
        const n33 = i33;
        set(n33, "h", n33.height);
        set(n33, "w", n33.width);
        set(n33, "ext", n33.ext?.startsWith(".") ? n33.ext.substring(1) : n33.ext);
        unset(n33, "height");
        unset(n33, "width");
    }
    else if (h33 === V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO) {
        const m33 = i33;
        set(m33, "h", m33.height);
        set(m33, "w", m33.width);
        set(m33, "ext", m33.ext?.startsWith(".") ? m33.ext.substring(1) : m33.ext);
        set(m33, "dur", m33.duration);
        unset(m33, "height");
        unset(m33, "width");
        unset(m33, "duration");
    }
    else if (h33 === V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO) {
        const l33 = i33;
        set(l33, "dur", l33.duration);
        set(l33, "ext", l33.ext?.startsWith(".") ? l33.ext.substring(1) : l33.ext);
        unset(l33, "duration");
    }
    return JSON.stringify(i33, (j33, k33) => {
        if (j33 === "raw") {
            return undefined;
        }
        return k33;
    });
}
export function attachmentToRaw(e33, f33) {
    if (!f33)
        return '';
    switch (e33) {
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM:
            return f33.raw || '';
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE:
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO:
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO:
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE:
            return mediaAttachmentToRaw(f33);
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION:
            return locationAttachmentToRaw(f33);
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL:
            return callAttachmentToRaw(f33);
        default:
            return JSON.stringify(f33);
    }
}
function mediaAttachmentToRaw(p32) {
    const { width: q32, height: r32, duration: s32, path: t32, file: u32, raw: v32, ctx: w32, payload: x32, bucketName: y32, objectName: z32, token: a33, ext: b33, ...c33 } = p32;
    const d33 = typeof b33 === 'string' && b33[0] === '.' ? b33.slice(1) : b33;
    return JSON.stringify({
        ...c33,
        ...(typeof b33 === 'undefined' ? {} : { ext: d33 }),
        ...(typeof q32 === 'undefined' ? {} : { w: q32 }),
        ...(typeof r32 === 'undefined' ? {} : { h: r32 }),
        ...(typeof s32 === 'undefined' ? {} : { dur: s32 })
    });
}
function locationAttachmentToRaw(o32) {
    return JSON.stringify({
        lat: o32.latitude,
        lng: o32.longitude,
        title: o32.address
    });
}
function callAttachmentToRaw(j32) {
    const { raw: k32, ...l32 } = j32;
    try {
        return JSON.stringify({
            ...l32,
            durations: j32.durations.map((n32) => {
                return {
                    accid: n32.accountId,
                    duration: n32.duration
                };
            })
        });
    }
    catch (m32) {
        return JSON.stringify(j32);
    }
}
