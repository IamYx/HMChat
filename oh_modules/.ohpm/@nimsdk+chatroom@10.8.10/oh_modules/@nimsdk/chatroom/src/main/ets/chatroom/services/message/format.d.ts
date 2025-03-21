import { NIMEStrAnyObj } from '@nimsdk/base';
import { V2NIMChatroomMessage, V2NIMChatroomNotificationAttachment } from '../../sdk/types';
import { V2NIMChatroomQueueChangeType, V2NIMChatroomQueueElement } from '../../sdk/V2NIMChatroomQueueService';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
export type V2NIMChatroomMessageField = V2NIMChatroomMessage & {
    resend?: boolean;
};
export declare function formatMessage(a31: V2NIMChatroomMessageField, b31: V2NIMChatroomClient): V2NIMChatroomMessageField;
export declare function formatCustomAttachment(s30: V2NIMChatroomClient, t30: V2NIMChatroomMessageField): V2NIMChatroomMessage;
/**
 * 格式化文件类型消息的 attachment 格式
 */
export declare function formatReceiveMessageAttachment(n30: V2NIMChatroomMessageField): V2NIMChatroomMessageField;
/**
 * 格式化消息的附件
 *
 * 服务器文档见：http://doc.hz.netease.com/display/MMC/NotifyEventId?move_to_popo=false
 *
 * @param attach 附件
 * @returns attachment
 */
export declare function formatMessageAttachment(f30: NIMEStrAnyObj, g30: string): V2NIMChatroomNotificationAttachment;
export declare function formatMultiEnterInfo(c30: string): any;
export declare function formatNotificationAttachmentForQueue(w29: string): {
    elements: V2NIMChatroomQueueElement[];
    queueChangeType: V2NIMChatroomQueueChangeType;
};
