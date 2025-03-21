import { V2NIMMessageType } from '@nimsdk/base';
import { stringToJSONObject } from '@nimsdk/base';
import { get, pickBy, unset } from '@nimsdk/vendor/Index';
import { V2NIMChatroomMessageNotificationType } from '../../sdk/types';
import { V2NIMChatroomQueueChangeType } from '../../sdk/V2NIMChatroomQueueService';
import { formatQueueElementsFromElements, formatQueueElementsFromKVObject } from '../queue/CRQueueServiceImpl';
export function formatMessage(a31, b31) {
    a31.isSelf = a31.senderId === b31.account;
    delete a31.resend;
    if (a31.messageType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT || a31.messageType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_TIPS) {
        a31.text = a31.text || a31.attachment;
        delete a31.attachment;
    }
    if (a31.messageType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION) {
        a31.attachment = formatMessageAttachment(a31.attachment, a31.roomId);
    }
    else if (a31.messageType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM) {
        a31 = formatCustomAttachment(b31, a31);
    }
    formatReceiveMessageAttachment(a31);
    return a31;
}
export function formatCustomAttachment(s30, t30) {
    if (typeof t30.attachment?.raw === 'string' && s30.messageService?.getCustomAttachmentParsers()?.length > 0) {
        const u30 = t30.subType || 0;
        const v30 = s30.messageService.getCustomAttachmentParsers();
        const w30 = t30.attachment.raw;
        v30.some((x30) => {
            try {
                const z30 = x30(u30, w30);
                if (isPlainObject(z30)) {
                    z30.raw = w30;
                    t30.attachment = z30;
                    return true;
                }
            }
            catch (y30) {
                s30.logger.warn(`customAttachmentParser: subType ${u30}, raw: ${w30}. parse error with ${y30}`);
                return false;
            }
        });
    }
    return t30;
}
function isPlainObject(r30) {
    return r30 != null && typeof r30 == 'object' && Object.getPrototypeOf(r30) == Object.prototype;
}
export function formatReceiveMessageAttachment(n30) {
    const o30 = [
        V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO,
        V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO,
        V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE,
        V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE
    ];
    if (o30.includes(n30.messageType) && n30.attachment) {
        const q30 = n30.attachment;
        if (q30.ext && !q30.ext.startsWith(".")) {
            q30.ext = `.${q30.ext}`;
        }
        if (typeof get(q30, "w") !== 'undefined') {
            n30.attachment.width = get(q30, "w");
            unset(q30, "w");
        }
        if (typeof get(q30, "h") !== 'undefined') {
            n30.attachment.height = get(q30, "h");
            unset(q30, "h");
        }
        if (typeof get(q30, "dur") !== 'undefined') {
            n30.attachment.duration = get(q30, "dur");
            unset(q30, "dur");
        }
    }
    else if (n30.messageType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION) {
        const p30 = n30.attachment;
        if (typeof get(p30, "lat") !== 'undefined') {
            n30.attachment.latitude = get(p30, "lat");
            unset(p30, "lat");
        }
        if (typeof get(p30, "lng") !== 'undefined') {
            n30.attachment.longitude = get(p30, "lng");
            unset(p30, "lng");
        }
        if (typeof get(p30, "title") !== 'undefined') {
            n30.attachment.address = get(p30, "title");
            unset(p30, "title");
        }
    }
    return n30;
}
export function formatMessageAttachment(f30, g30) {
    let h30 = {
        type: typeof map[f30.id] === 'number' ? map[f30.id] : f30.id,
        targetIds: f30.data?.target,
        targetNicks: f30.data?.tarNick,
        targetTag: f30.data?.targetTag,
        operatorId: f30.data?.operator,
        operatorNick: f30.data?.opeNick,
        notificationExtension: f30.data?.ext,
        tags: f30.data?.tags,
        messageClientId: f30.data?.msgId,
        messageTime: f30.data?.msgTime,
        chatBanned: typeof f30.data?.muted !== 'undefined' ? Boolean(f30.data?.muted) : undefined,
        tempChatBanned: typeof f30.data?.tempMuted !== 'undefined' ? Boolean(f30.data?.tempMuted) : undefined,
        previousRole: f30.data?.previousRole,
        tempChatBannedDuration: typeof f30.data?.muteTtl === 'number' ? f30.data.muteTtl : f30.data?.muteDuration
    };
    h30 = pickBy(h30, (m30) => m30 !== undefined);
    if (h30.type === V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_ADDED) {
        h30.tempChatBanned = true;
    }
    else if (h30.type === V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_REMOVED) {
        h30.tempChatBanned = false;
    }
    if (f30.data?.member) {
        const k30 = f30.data.member;
        h30.currentMember = pickBy({
            roomId: g30,
            accountId: k30.accountId,
            memberRole: k30.memberRole,
            memberLevel: k30.memberLevel,
            roomNick: k30.nick,
            roomAvatar: k30.avatar,
            serverExtension: k30.ext,
            isOnline: !!k30.onlineStat,
            blocked: !!k30.blockList,
            chatBanned: !!k30.chatBanned,
            tempChatBanned: !!k30.tempChatBanned,
            tempChatBannedDuration: typeof k30.muteTtl === 'number' ? k30.muteTtl : k30.muteDuration,
            tags: stringToJSONObject(k30.tags),
            notifyTargetTags: k30.notifyTargetTags,
            enterTime: k30.enterTime,
            updateTime: k30.updateTime,
            valid: k30.valid === undefined ? true : !!k30.valid,
            multiEnterInfo: formatMultiEnterInfo(k30.onlineList)
        }, (l30) => l30 !== undefined);
    }
    if (f30.data?.queueChange) {
        const { elements: i30, queueChangeType: j30 } = formatNotificationAttachmentForQueue(f30.data.queueChange);
        h30.elements = i30;
        if (j30 > 0)
            h30.queueChangeType = j30;
    }
    h30.raw = f30.raw;
    return h30;
}
export function formatMultiEnterInfo(c30) {
    if (!(c30 && typeof c30 === 'string'))
        return;
    try {
        const d30 = JSON.parse(c30);
        return d30.map((e30) => ({
            roomNick: e30.room_nick,
            roomAvatar: e30.room_avatar,
            enterTime: e30.enter_time,
            clientType: e30.client_type
        }));
    }
    catch {
        return;
    }
}
const map = {
    301: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_ENTER,
    302: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_EXIT,
    303: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_BLOCK_ADDED,
    304: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_BLOCK_REMOVED,
    305: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_CHAT_BANNED_ADDED,
    306: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_CHAT_BANNED_REMOVED,
    312: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_ROOM_INFO_UPDATED,
    313: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_KICKED,
    314: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_TEMP_CHAT_BANNED_ADDED,
    315: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_TEMP_CHAT_BANNED_REMOVED,
    316: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_INFO_UPDATED,
    317: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_QUEUE_CHANGE,
    320: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_QUEUE_CHANGE,
    324: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_QUEUE_CHANGE,
    318: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_CHAT_BANNED,
    319: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_CHAT_BANNED_REMOVED,
    321: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_ADDED,
    322: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_REMOVED,
    323: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MESSAGE_REVOKE,
    325: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAGS_UPDATE,
    326: V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_ROLE_UPDATE
};
export function formatNotificationAttachmentForQueue(w29) {
    try {
        const y29 = JSON.parse(w29);
        if (y29._e === 'OFFER') {
            return {
                elements: [{ key: y29.key, value: y29.content }],
                queueChangeType: V2NIMChatroomQueueChangeType.V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_OFFER
            };
        }
        else if (y29._e === 'POLL') {
            return {
                elements: [{ key: y29.key, value: y29.content }],
                queueChangeType: V2NIMChatroomQueueChangeType.V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_POLL
            };
        }
        else if (y29._e === 'DROP') {
            return {
                elements: [],
                queueChangeType: V2NIMChatroomQueueChangeType.V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_DROP
            };
        }
        else if (y29._e === 'BATCH_UPDATE') {
            const b30 = formatQueueElementsFromKVObject(y29.kvObject);
            return {
                elements: b30,
                queueChangeType: V2NIMChatroomQueueChangeType.V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_BATCH_UPDATE
            };
        }
        else if (y29._e === 'PARTCLEAR') {
            const a30 = formatQueueElementsFromKVObject(y29.kvObject);
            return {
                elements: a30,
                queueChangeType: V2NIMChatroomQueueChangeType.V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_PARTCLEAR
            };
        }
        else if (y29._e === 'BATCH_OFFER') {
            const z29 = formatQueueElementsFromElements(y29.elements);
            return {
                elements: z29,
                queueChangeType: V2NIMChatroomQueueChangeType.V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_BATCH_OFFER
            };
        }
    }
    catch (x29) {
    }
    return { elements: [], queueChangeType: V2NIMChatroomQueueChangeType.V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_UNKNOWN };
}
