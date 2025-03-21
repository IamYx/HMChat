export class KickOfflineRequest {
    constructor(z81) {
        this.clientIds = z81;
    }
}
export class GetChatroomLinkAddressRequest {
    constructor(x81, y81 = 0) {
        this.roomId = parseInt(x81);
        this.type = y81;
    }
}
export class LoginRequest {
    constructor(w81) {
        this.tag = w81;
    }
}
export class LoginRequestParam {
}
export class LoginRequestDeviceInfo {
}
