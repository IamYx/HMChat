import { SerializeItem } from '../../parser';
import { V2NIMConversationType } from '../../sdk/V2NIMConversationService';
import { V2NIMMessageAttachment, V2NIMMessageType } from '../../sdk/V2NIMMessageService';
export declare const systemMsgTag: SerializeItem;
export declare const messageRouteTag: SerializeItem;
export declare const threadReplyTag: SerializeItem;
export declare const threadRootTag: SerializeItem;
export declare const robotConfigTag: SerializeItem;
export declare const antispamConfigTag: SerializeItem;
export declare const messageConfigTag: SerializeItem;
/**
 * 消息发送的协议
 */
export declare const messageTag: SerializeItem;
export declare const messageTagInverted: import("../../parser").DeSerializeItem;
/**
 * 将输入参数 conversationType 转换成 7_1 协议 toType(0) 号字段的取值
 *
 * 这个函数在 sendMessage 的数据上报时也要用，所以这里把定义提取出来
 */
export declare function conversationTypeV2ToV1(y5: V2NIMConversationType): number;
/**
 * 将 v1 版本的 conversationType 转换为 v2 版本的 conversationType
 */
export declare function conversationTypeV1ToV2(w5: string): V2NIMConversationType;
/**
 * 将 attachment 转为 raw 字符串
 */
export declare function attachmentToRaw(u5: V2NIMMessageType, v5: Partial<V2NIMMessageAttachment>): string;
export declare function rawToAttachment(v4: string, w4: V2NIMMessageType): any;
export declare function emptyFunc(): void;
