import { V2NIMQueryDirection } from '@nimsdk/base';
export class ChatroomSendMessageRequest {
    constructor(r26) {
        this.tag = r26;
    }
}
export class ChatroomGetMessageListRequest {
    constructor(q26) {
        this.beginTime = q26.beginTime ?? 0;
        this.limit = q26.limit ?? 100;
        this.reverse = q26.direction === V2NIMQueryDirection.V2NIM_QUERY_DIRECTION_ASC ? true : false;
        this.messageTypes = q26.messageTypes;
    }
}
export class ChatroomGetMessageListByTagRequest {
    constructor(p26) {
        this.tag = p26;
    }
}
export class ChatroomGetMessageListByTagParam {
    constructor(o26) {
        this.tags = JSON.stringify(o26.tags);
        this.messageTypes = o26.messageTypes;
        this.beginTime = o26.beginTime;
        this.endTime = o26.endTime;
        this.limit = o26.limit;
        this.reverse = o26.direction === V2NIMQueryDirection.V2NIM_QUERY_DIRECTION_ASC ? 0 : 1;
    }
}
export class ChatroomMessageAckRequest {
    constructor(n26) {
        this.tag = n26;
    }
}
export class ChatroomMessageAckRequestParam {
    constructor(l26, m26) {
        this.messageClientId = l26;
        this.roomId = m26;
    }
}
