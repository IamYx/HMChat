const s41 = '[SendModel]'; export class SendModel { constructor(b67, c67) { this.core = b67; this.messageTable = c67; } async inlineSaveMessage(message) { return await this.messageTable.inlineSaveMessage(message); } async resetDeleteStatus(message) { return await this.messageTable.resetDeleteStatus(message); } async query(a67) { const message = await this.messageTable.query(a67); return message; } async updateSendingState(x66, y66, serverId, createTime, z66) { this.core.logger.debug(s41, `updateSendingState,
    message: ${x66},
    sendingState: ${y66},
    serverId: ${serverId},
    createTime: ${createTime},
    callbackExtension: ${z66}`); await this.messageTable.updateSendingState(x66, y66, serverId, createTime, z66); } async updateAttachment(v66, w66) { await this.messageTable.updateAttachment(v66, w66); } async updateDownloadAttachment(u66, filePath) { await this.messageTable.updateAttachmentFilePath(u66, filePath); } } 