export class TeamMessageMuteModeRequest {
    constructor(z106) {
        this.teamMember = z106;
    }
}
export class TeamMessageMuteModeInfo {
    constructor(v106, w106, x106, y106) {
        this.teamId = v106;
        this.teamType = w106;
        this.accountId = x106;
        this.bits = y106;
    }
}
export class SetP2PMessageMuteModeRequest {
    constructor(t106, u106) {
        this.accountId = t106;
        this.muteMode = u106;
    }
}
export class SetAppBackgroundRequest {
    constructor(r106, s106) {
        this.isBackground = r106;
        this.badge = s106;
    }
}
export class PushMobileOnDesktopOnlineRequest {
    constructor(q106) {
        this.tag = q106;
    }
}
export class MobilePushTag {
    constructor(p106) {
        this.need = p106;
    }
}
export class SetDndConfigParam {
    constructor(j106, k106, l106, m106, n106, o106) {
        this.detail = j106;
        this.disturbing = k106;
        this.fromH = isNaN(l106) ? 0 : l106;
        this.fromM = isNaN(m106) ? 0 : m106;
        this.toH = isNaN(n106) ? 0 : n106;
        this.toM = isNaN(o106) ? 0 : o106;
    }
}
export class SetDndConfigRequest {
    constructor(i106) {
        this.tag = i106;
    }
}
