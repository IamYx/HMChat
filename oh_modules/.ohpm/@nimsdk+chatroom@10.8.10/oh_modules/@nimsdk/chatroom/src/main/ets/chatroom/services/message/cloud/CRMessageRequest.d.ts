import { V2NIMMessageType } from '@nimsdk/base';
import { V2NIMChatroomMessage, V2NIMChatroomMessageListOption, V2NIMChatroomTagMessageOption } from '../../../sdk/types';
/**
 * Request params of protocol:
 * v2ChatroomSendMessage
 */
export declare class ChatroomSendMessageRequest {
    tag: V2NIMChatroomMessage;
    constructor(r26: V2NIMChatroomMessage);
}
/**
 * Request params of protocol:
 * v2ChatroomGetMessageList
 */
export declare class ChatroomGetMessageListRequest {
    beginTime: number;
    limit: number;
    reverse: boolean;
    messageTypes?: V2NIMMessageType[];
    constructor(q26: V2NIMChatroomMessageListOption);
}
/**
 * Request params of protocol:
 * v2ChatroomGetMessageListByTag
 */
export declare class ChatroomGetMessageListByTagRequest {
    tag: ChatroomGetMessageListByTagParam;
    constructor(p26: ChatroomGetMessageListByTagParam);
}
/**
 * Tag of ChatroomGetMessageListByTagRequest
 */
export declare class ChatroomGetMessageListByTagParam {
    tags: string;
    messageTypes?: V2NIMMessageType[];
    beginTime?: number;
    endTime?: number;
    limit?: number;
    reverse: number;
    constructor(o26: V2NIMChatroomTagMessageOption);
}
/**
 * Request params of protocol:
 * v2ChatroomMessageAck
 */
export declare class ChatroomMessageAckRequest {
    tag: ChatroomMessageAckRequestParam;
    constructor(n26: ChatroomMessageAckRequestParam);
}
/**
 * Tag of ChatroomMessageAckRequest
 */
export declare class ChatroomMessageAckRequestParam {
    messageClientId: string;
    roomId: string;
    constructor(l26: string, m26: string);
}
