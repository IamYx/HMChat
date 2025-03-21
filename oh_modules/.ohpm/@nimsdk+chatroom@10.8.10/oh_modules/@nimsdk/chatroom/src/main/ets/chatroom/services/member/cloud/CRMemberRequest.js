export class ChatroomGetMemberListByOptionRequest {
    constructor(z24) {
        this.tag = z24;
    }
}
export class ChatroomUpdateMemberRoleRequest {
    constructor(y24) {
        this.tag = y24;
    }
}
export class ChatroomUpdateMemberRoleParam {
    constructor(w24, x24) {
        this.memberRole = w24.memberRole;
        this.memberLevel = w24.memberLevel;
        this.notificationExtension = w24.notificationExtension ?? '';
        this.accountId = x24;
    }
}
export class ChatroomSetMemberBlockedStatusRequest {
    constructor(t24, u24, v24) {
        this.accountId = t24;
        this.blocked = u24;
        this.notificationExtension = v24 ?? '';
    }
}
export class ChatroomSetMemberChatBannedStatusRequest {
    constructor(q24, r24, s24) {
        this.accountId = q24;
        this.chatBanned = r24;
        this.notificationExtension = s24 ?? '';
    }
}
export class ChatroomSetMemberTempChatBannedRequest {
    constructor(m24, n24, o24, p24) {
        this.accountId = m24;
        this.tempChatBannedDuration = n24;
        this.notificationEnabled = o24;
        this.notificationExtension = p24 ?? '';
    }
}
export class ChatroomUpdateSelfMemberInfoRequest {
    constructor(k24, l24) {
        this.tag = k24;
        this.notificationEnabled = typeof k24.notificationEnabled === 'boolean' ? k24.notificationEnabled : true;
        this.notificationExtension = k24.notificationExtension || '';
        this.persistence = typeof k24.persistence === 'boolean' ? k24.persistence : false;
        this.antispamConfig = l24;
    }
}
export class ChatroomGetMemberByIdsRequest {
    constructor(j24) {
        this.accountIds = j24;
    }
}
export class ChatroomKickMemberRequest {
    constructor(h24, i24) {
        this.accountId = h24;
        this.notificationExtension = i24;
    }
}
export class ChatroomGetMemberListByTagRequest {
    constructor(g24) {
        this.tag = g24;
    }
}
export class ChatroomGetMemberListByTagRequestParam {
    constructor(f24) {
        this.tag = f24.tag;
        this.pageToken = f24.pageToken;
        this.limit = f24.limit ?? 100;
    }
}
export class ChatroomGetMemberCountByTagRequest {
    constructor(e24) {
        this.tag = e24;
    }
}
