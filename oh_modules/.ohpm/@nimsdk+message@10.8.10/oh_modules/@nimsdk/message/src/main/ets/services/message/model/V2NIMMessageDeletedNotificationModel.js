export class V2NIMMessageDeletedNotificationModel { constructor(n47, o47, p47) { this._messageRefer = n47; this.deleteTime = o47; this.serverExtension = p47; } get messageRefer() { return this._messageRefer.transform(); } } 