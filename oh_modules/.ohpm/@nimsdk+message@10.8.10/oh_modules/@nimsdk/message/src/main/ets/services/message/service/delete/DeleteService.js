import { checkStubServiceErrorCode, cmdConfigMessageDelete, cmdMapMessageDelete, registerParser, V2NIMClearHistoryMode, V2NIMConversationType, V2NIMErrorCode, V2NIMErrorImpl, validate, validateConversationId } from '@nimsdk/base'; import { get } from '@nimsdk/vendor/'; import { completeMessageRefer, formatClearHistoryNotification, formatClientHistoryNotifications, formatMessageRefer } from '../../utils/Format'; import { getConversationTargetId, getConversationType } from '../../utils/Tools'; import { clearHistoryMessageRule, deleteMessageRule, deleteMessagesRule } from '../Rules'; import { DeleteCloud } from './DeleteCloud'; import { DeleteModel } from './DeleteModel'; const s41 = '[DeleteService]'; export class DeleteService { constructor(m54, table) { this.core = m54; registerParser(m54, { cmdMap: cmdMapMessageDelete, cmdConfig: cmdConfigMessageDelete }); this.cloud = new DeleteCloud(m54); this.model = new DeleteModel(m54, table); } async deleteMessage(message, i54, j54) { try { this.core.logger.info(s41, 'deleteMessage', message, i54); validate(deleteMessageRule, message, '', true); let timestamp = Date.now(); if (j54 || (typeof j54 === 'undefined') || (typeof message.messageServerId === 'undefined') || (typeof message.messageServerId !== 'undefined' && message.messageServerId.length <= 1)) { j54 = true; } else { timestamp = await this.cloud.delete(message, i54); } await this.model.deleteMessage(message.messageClientId); const k54 = j54 ? Date.now() : timestamp; this.core.syncService.updateSyncTimestamp2(k54, 'deleteSelfMsgs'); const l54 = [this.createDeleteNotification(message, k54, i54)]; this.core.messageService.emit('onMessageDeletedNotifications', l54); this.core.eventBus.emit('V2NIMConversationService/deleteMessages', l54); await this.core.localConversationService.onMessagesDeleted(l54); } catch (e) { this.core.logger.error(s41, 'deleteMessage', message, i54, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `deleteMessage ${JSON.stringify(e)}`, rawError: e } }); } } } async deleteMessages(b54, c54, d54) { try { this.core.logger.info(s41, 'deleteMessages', b54, c54, d54); validate(deleteMessagesRule, { messages: b54 }, '', true); const e54 = b54[0].conversationId; if (!b54.every(message => message.conversationId === e54)) { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER, detail: { reason: `invalid parameter conversationId not same ` } }); } const f54 = b54.filter(message => message.messageServerId && message.messageServerId !== '0'); const g54 = b54.filter(message => !message.messageServerId || message.messageServerId === '0'); let h54 = []; let timestamp = Date.now(); if (d54) { for (const message of b54) { await this.model.deleteMessage(message.messageClientId); const notification = this.createDeleteNotification(message, timestamp, c54); h54.push(notification); } } else { if (g54.length > 0) { for (const message of g54) { await this.model.deleteMessage(message.messageClientId); const notification = this.createDeleteNotification(message, timestamp, c54); h54.push(notification); } } if (f54.length > 0) { timestamp = await this.cloud.deleteMessages(f54, c54); for (const message of f54) { await this.model.deleteMessage(message.messageClientId); const notification = this.createDeleteNotification(message, timestamp, c54); h54.push(notification); } } } this.core.syncService.updateSyncTimestamp2(timestamp, 'deleteSelfMsgs'); this.core.messageService.emit('onMessageDeletedNotifications', h54); this.core.eventBus.emit('V2NIMConversationService/deleteMessages', h54); await this.core.localConversationService.onMessagesDeleted(h54); } catch (e) { this.core.logger.error(s41, 'deleteMessages', b54, c54, d54, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `deleteMessages ${JSON.stringify(e)}`, rawError: e } }); } } } async clearHistoryMessage(option) { try { this.core.logger.info(s41, 'clearHistoryMessage', option); validate(clearHistoryMessageRule, option, '', true); validateConversationId(this.core.account, option.conversationId); const z53 = getConversationType(option.conversationId); const to = getConversationTargetId(option.conversationId); const param = { conversationId: option.conversationId, deleteRoam: option.clearMode === V2NIMClearHistoryMode.V2NIM_CLEAR_HISTORY_MODE_LOCAL ? undefined : option.deleteRoam, onlineSync: option.clearMode === V2NIMClearHistoryMode.V2NIM_CLEAR_HISTORY_MODE_LOCAL ? undefined : option.onlineSync, serverExtension: option.clearMode === V2NIMClearHistoryMode.V2NIM_CLEAR_HISTORY_MODE_LOCAL ? undefined : option.serverExtension, clearMode: option.clearMode ?? V2NIMClearHistoryMode.V2NIM_CLEAR_HISTORY_MODE_ALL, conversationType: z53, receiverId: z53 === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P ? to : undefined, teamId: (z53 === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM || z53 === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM) ? to : undefined }; let a54 = new Date().getTime(); switch (param.clearMode) { case V2NIMClearHistoryMode.V2NIM_CLEAR_HISTORY_MODE_ALL: a54 = await this.cloud.clearHistoryMessage(param); await this.model.deleteByConversationId(option.conversationId, 0, a54); break; case V2NIMClearHistoryMode.V2NIM_CLEAR_HISTORY_MODE_LOCAL: await this.model.invisibleByConversationId(option.conversationId, 0, a54); break; default: throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, desc: `Unexpected param.clearMode: ${param.clearMode} when calling API clear history message.` }); } const notification = { conversationId: param.conversationId, serverExtension: param.serverExtension, deleteTime: a54 }; await this.core.localConversationService.onMessagesCleared([notification]); this.core.messageService.emit('onClearHistoryNotifications', [notification]); } catch (e) { this.core.logger.error(s41, 'clearHistoryMessage', option, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `clearHistoryMessage ${JSON.stringify(e)}`, rawError: e } }); } } } async syncClearHistoryMessages(x53) { const y53 = formatClientHistoryNotifications(this.core, x53); this.core.logger.info(s41, 'syncClearHistoryMessages', y53); await this.emitClearHistoryMessage(y53); } async onClearHistoryMessage(v53) { const w53 = formatClearHistoryNotification(this.core, get(v53.content, 'data')); this.core.logger.info(s41, 'onClearHistoryMessage', w53); await this.emitClearHistoryMessage([w53]); } onDeleteMessage(t53) { const message = get(t53.content, 'data'); const u53 = { serverExtension: message.serverExtension, deleteTime: message.deleteTime, messageRefer: completeMessageRefer(this.core, message.messageRefer) }; this.core.logger.info(s41, 'onDeleteMessage', message); this.core.syncService.updateSyncTimestamp2(message.deleteTime, 'deleteSelfMsgs'); this.deleteMessagesHandler([u53]); } async onDeleteMessages(p53) { const q53 = get(p53.content, 'data').map((s53) => { return { serverExtension: s53.serverExtension, deleteTime: s53.deleteTime, messageRefer: completeMessageRefer(this.core, s53.messageRefer) }; }); this.core.logger.info(s41, 'onDeleteMessages', q53); if (q53.length > 0) { const r53 = q53[q53.length - 1].deleteTime; this.core.syncService.updateSyncTimestamp2(r53, 'deleteSelfMsgs'); } await this.deleteMessagesHandler(q53); } async onSyncDeleteMessages(k53) { const l53 = get(k53.content, 'datas'); let m53 = 0; const n53 = l53.map((o53) => { m53 = o53.deleteTime; return { serverExtension: o53.serverExtension, deleteTime: o53.deleteTime, messageRefer: completeMessageRefer(this.core, o53.messageRefer) }; }); this.core.logger.info(s41, 'onSyncDeleteMessages', n53); if (m53 > 0) { this.core.syncService.updateSyncTimestamp2(m53, 'deleteSelfMsgs'); } await this.deleteMessagesHandler(n53); this.core.messageService.emit('onMessageDeletedNotifications', n53); } deleteCheckParams(i53) { if (i53.length === 0) { return false; } const j53 = i53[0].conversationId; return i53.every(element => element.conversationId === j53); } async emitClearHistoryMessage(g53) { let h53 = 0; await Promise.allSettled(g53.map(async (data) => { if (data.deleteTime > h53) { h53 = data.deleteTime; } await this.model.deleteMessages(data.conversationId, data.deleteTime); })); await this.core.syncService.updateSyncTimestamp2(h53, 'sessionHistoryMsgsDelete'); try { await this.core.localConversationService.onMessagesCleared(g53); } catch (e) { checkStubServiceErrorCode(e); } this.core.messageService.emit('onClearHistoryNotifications', g53); } async deleteMessagesHandler(f53) { for (const notification of f53) { await this.model.deleteMessage(notification.messageRefer.messageClientId); } this.core.messageService.emit('onMessageDeletedNotifications', f53); this.core.eventBus.emit('V2NIMConversationService/deleteMessages', f53); try { await this.core.localConversationService.onMessagesDeleted(f53); } catch (e) { checkStubServiceErrorCode(e); } } createDeleteNotification(message, d53, e53) { return { messageRefer: formatMessageRefer(this.core, message), deleteTime: d53, serverExtension: e53 }; } } 