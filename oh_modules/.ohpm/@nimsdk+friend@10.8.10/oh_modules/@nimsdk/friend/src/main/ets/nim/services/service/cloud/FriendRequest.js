export class AddFriendRequest { constructor(j, k, l) { this.accountId = j; this.verifyType = k; this.postscript = l; } } export class DeleteFriendRequest { constructor(h, i) { this.accountId = h; this.params = i; } } export class IncFriendInfoRequest { constructor(g) { this.timetag = g; } } export class SetFriendInfoRequest { constructor(f) { this.tag = f; } } 