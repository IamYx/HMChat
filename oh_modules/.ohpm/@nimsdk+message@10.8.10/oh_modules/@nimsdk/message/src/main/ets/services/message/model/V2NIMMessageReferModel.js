export class V2NIMMessageReferModel { constructor(k49, l49, m49, n49, createTime, o49, p49) { this.senderId = k49; this.receiverId = l49; this.messageClientId = m49; this.messageServerId = n49; this.createTime = createTime; this.conversationType = o49; this.conversationId = p49; } transform() { const j49 = {}; j49.senderId = this.senderId; j49.receiverId = this.receiverId; j49.messageClientId = this.messageClientId; j49.messageServerId = this.messageServerId; j49.createTime = this.createTime; j49.conversationType = this.conversationType; j49.conversationId = this.conversationId; return j49; } } 