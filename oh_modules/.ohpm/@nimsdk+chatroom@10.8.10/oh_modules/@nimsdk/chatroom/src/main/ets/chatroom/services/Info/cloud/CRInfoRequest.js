export class UpdateChatroomInfoRequest {
    constructor(s6) {
        this.chatroom = s6;
        this.notificationEnabled = s6.notificationEnabled === undefined ? true : s6.notificationEnabled;
        this.notificationExtension = s6.notificationExtension || '';
    }
}
export class UpdateChatroomLocationRequest {
    constructor(r6) {
        this.tag = r6;
    }
}
export class UpdateChatroomLocationParam {
    constructor(q6) {
        this.x = q6.locationInfo?.x;
        this.y = q6.locationInfo?.y;
        this.z = q6.locationInfo?.z;
        this.distance = q6.distance;
    }
}
export class UpdateChatroomTagsRequest {
    constructor(p6) {
        this.tag = p6;
    }
}
export class SetTempChatBannedByTagRequest {
    constructor(o6) {
        o6.duration = o6.duration ?? 0;
        o6.notificationEnabled = o6.notificationEnabled ?? true;
        o6.notificationExtension = o6.notificationExtension ?? '';
        this.tag = o6;
    }
}
