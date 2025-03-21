export class SendCustomNotificationRequest {
    constructor(i91) {
        this.tag = i91;
    }
}
export class SendCustomNotificationParam {
    constructor(a91, b91, c91, d91, e91, f91, g91, h91) {
        this.notificationConfig = a91;
        this.pushConfig = b91;
        this.antispamConfig = c91;
        this.routeConfig = d91;
        this.timestamp = e91;
        this.type = f91;
        this.receiverId = g91;
        this.content = h91;
    }
}
export class BatchMarkReadRequest {
    constructor(x90, y90, z90) {
        this.sid = x90;
        this.cid = y90;
        this.ids = z90;
    }
}
