import { checkStubServiceErrorCode, NIM_DATABASE_NAME_MAIN, V2NIMErrorCode, V2NIMErrorImpl, V2NIMTeamJoinActionStatus, V2NIMTeamMemberRole, V2NIMTeamMessageMuteMode, V2NIMTeamType, V2NIMTeamJoinMode, V2NIMTeamAgreeMode, V2NIMTeamInviteMode, V2NIMTeamUpdateInfoMode, V2NIMTeamUpdateExtensionMode, V2NIMTeamChatBannedMode, V2NIMTeamMessageNotifyMode } from '@nimsdk/base'; import { get } from '@nimsdk/vendor'; import { formatTeamNotificationAttachData } from '../format'; import { V2NIMTeamMemberImpl } from '../member/V2NIMTeamMemberImpl'; import { TeamConst } from '../team/TeamConst'; import { V2NIMTeamImpl } from '../team/V2NIMTeamImpl'; import TeamNotificationModel, { convert } from './TeamNotificationModel'; import { TeamNotificationEvent, TeamNotificationProcessor } from './TeamNotificationProcessor'; const l3 = '[TeamNotificationService]'; export class TeamNotificationService { constructor(n20, o20, service) { this.core = n20; this.service = service; this.notificationProcessor = new TeamNotificationProcessor(this.core.logger); } get notificationModel() { if (this._notificationModel) { return this._notificationModel; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE, detail: { reason: `V2NIMTeamService.notificationService model is unavailable` } }); } } async onLogin() { this.registerInnerService(this.core); await this.notificationModel.createTeamMemberTable(); } onLogout() { this.unRegisterInnerService(); } async acceptJoinApplication(applicationInfo) { try { this.core.logger.info(l3, 'acceptJoinApplication', applicationInfo); await this.service.sendAcceptJoinApplication(applicationInfo); await this.updateTeamActionStatus(applicationInfo, V2NIMTeamJoinActionStatus.V2NIM_TEAM_JOIN_ACTION_STATUS_AGREED); return; } catch (e) { this.core.logger.error(l3, 'acceptJoinApplication', applicationInfo, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { if (this.checkIfExpired(e.code)) { await this.updateTeamActionStatus(applicationInfo, V2NIMTeamJoinActionStatus.V2NIM_TEAM_JOIN_ACTION_STATUS_EXPIRED); } throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `acceptJoinApplication ${JSON.stringify(e)}`, rawError: e } }); } } } async rejectJoinApplication(applicationInfo, m20) { try { this.core.logger.info(l3, 'rejectJoinApplication', applicationInfo, m20); await this.service.sendRejectJoinApplication(applicationInfo, m20); await this.updateTeamActionStatus(applicationInfo, V2NIMTeamJoinActionStatus.V2NIM_TEAM_JOIN_ACTION_STATUS_REJECTED); return; } catch (e) { this.core.logger.error(l3, 'rejectJoinApplication', applicationInfo, m20, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { if (this.checkIfExpired(e.code)) { this.updateTeamActionStatus(applicationInfo, V2NIMTeamJoinActionStatus.V2NIM_TEAM_JOIN_ACTION_STATUS_EXPIRED); } throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `rejectJoinApplication ${JSON.stringify(e)}`, rawError: e } }); } } } async getTeamJoinActionInfoList(option) { try { this.core.logger.info(l3, 'getTeamJoinActionInfoList', option); return await this.notificationModel.getByOption(option); } catch (e) { this.core.logger.error(l3, 'getTeamJoinActionInfoList', option, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `getTeamJoinActionInfoList ${JSON.stringify(e)}`, rawError: e } }); } } } async clearAllTeamJoinActionInfo() { try { this.core.logger.info(l3, 'clearAllTeamJoinActionInfo'); return await this.notificationModel.clearAllTeamJoinActionInfo(); } catch (e) { this.core.logger.error(l3, 'clearAllTeamJoinActionInfo', e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `clearAllTeamJoinActionInfo ${JSON.stringify(e)}`, rawError: e } }); } } } async deleteTeamJoinActionInfo(j20, k20, l20, actionType, timestamp) { try { this.core.logger.info(l3, 'deleteTeamJoinActionInfo', j20, k20, l20, actionType, timestamp); return await this.notificationModel.deleteTeamJoinActionInfo(j20, k20, l20, actionType, timestamp); } catch (e) { this.core.logger.error(l3, 'deleteTeamJoinActionInfo', e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `deleteTeamJoinActionInfo ${JSON.stringify(e)}`, rawError: e } }); } } } enqueueProcessNotification(msg) { let i20 = 'unknown notification'; try { i20 = get(msg.attachment, 'id').toString(); } catch (e) { i20 = 'invalid notifyTag'; } this.notificationProcessor.enqueueEvent(new TeamNotificationEvent('TeamNotification', i20, () => this.processNotification(msg))); } async processNotification(msg) { try { this.core.logger.info(l3, 'processNotification', msg); const u19 = JSON.parse(msg.attachment?.raw || ''); const v19 = msg.senderId; const w19 = msg.receiverId; const notificationType = get(u19, 'id'); const data = get(u19, 'data'); const x19 = notificationType > 400 ? V2NIMTeamType.V2NIM_TEAM_TYPE_SUPER : V2NIMTeamType.V2NIM_TEAM_TYPE_NORMAL; const y19 = formatTeamNotificationAttachData(data, x19); const z19 = get(y19, 'id'); const a20 = get(y19, 'ids'); const b20 = get(y19, 'tinfo'); const c20 = b20 ? V2NIMTeamImpl.parseFromCloud(b20) : undefined; const d20 = get(y19, 'mute'); this.core.logger.info(l3, 'processNotification, notificationType:', notificationType, data); switch (notificationType) { case 401: case 0: if (!c20 || !a20) { this.core.logger.error(l3, `recv team notification TEAM_INVITATION/SUPER_TEAM_INVITATION but team:${c20} or affectAccountIds:${a20} is undefined.`); return; } if (a20.includes(this.core.account)) { await this.onTeamJoined(c20, v19); } const others = a20.filter((h20) => { return h20 !== this.core.account; }); await this.onTeamMembersJoined(c20, others, v19); break; case 411: case 9: if (!c20) { this.core.logger.error(l3, `recv team notification TEAM_INVITE_ACCEPT/SUPER_TEAM_INVITE_ACCEPT but team is undefined.`); return; } v19 === this.core.account ? await this.onTeamJoined(c20, z19) : await this.onTeamMemberJoined(c20, v19, z19); break; case 410: case 5: if (!c20 || !z19) { this.core.logger.error(l3, `recv team notification TEAM_APPLY_ACCEPT/SUPER_TEAM_APPLY_ACCEPT but team:${c20} or affectAccountId:${z19} is undefined.`); return; } if (z19 === this.core.account) { await this.onTeamJoined(c20); } else { await this.onTeamMemberJoined(c20, z19); } break; case 407: case 7: if (!a20) { this.core.logger.error(l3, `recv team notification TEAM_ADD_MANAGER/SUPER_TEAM_ADD_MANAGER but affectAccountIds is undefined.`); return; } await this.service.updateLocalTeamMember(w19, x19, a20, { memberRole: V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER }); break; case 408: case 8: if (!a20) { this.core.logger.error(l3, `recv team notification TEAM_REMOVE_MANAGER/SUPER_TEAM_REMOVE_MANAGER but affectAccountIds is undefined.`); return; } await this.service.updateLocalTeamMember(w19, x19, a20, { memberRole: V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_NORMAL }); break; case 402: case 1: if (!c20 || !a20) { this.core.logger.error(l3, `recv team notification TEAM_INVITATION/SUPER_TEAM_INVITATION but team:${c20} or affectAccountIds:${a20} is undefined.`); return; } await this.onTeamInfoUpdated(c20); for (const g20 of a20) { g20 === this.core.account ? await this.onTeamLeft(w19, x19, true) : await this.onTeamMemberKicked(v19, c20.teamId, c20.teamType, g20); } break; case 403: case 2: const e20 = await this.service.v2IGetLocalTeamById(w19, x19); if (c20) { await this.onTeamInfoUpdated(c20); } else if (e20 && v19 === this.core.account) { e20.isValidTeam = false; await this.onTeamInfoUpdated(e20); } v19 === this.core.account ? await this.onTeamLeft(w19, x19, false) : await this.onTeamMemberLeft(w19, x19, v19); break; case 405: case 4: await this.onTeamDismissed(w19, x19); break; case 404: case 3: if (!c20) { this.core.logger.error(l3, `recv team notification TEAM_UPDATED/SUPER_TEAM_UPDATE but team is undefined.`); return; } await this.onTeamInfoUpdated(c20); break; case 406: case 6: if (!c20) { this.core.logger.error(l3, `recv team notification TEAM_TRANSFER_OWNER/SUPER_TEAM_TRANSFER_OWNER but team is undefined.`); return; } await this.onTeamInfoUpdated(c20); await this.service.updateLocalTeamMember(w19, x19, [v19, c20.ownerAccountId], [{ memberRole: V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_NORMAL }, { memberRole: V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_OWNER }]); break; case 409: case 10: if (!c20) { this.core.logger.error(l3, `recv team notification TEAM_MEMBER_MUTE/SUPER_TEAM_MEMBER_MUTE but team:${c20} is undefined.`); return; } let f20 = []; if (z19) { f20 = [z19]; } else if (a20) { f20 = a20; } else { this.core.logger.error(l3, `recv team notification TEAM_MEMBER_MUTE/SUPER_TEAM_MEMBER_MUTE but affectAccountId and affectAccountIds is undefined.`); return; } if (c20 && (z19 || a20)) { await this.service.updateLocalTeam(c20); await this.service.updateLocalTeamMember(w19, x19, f20, { chatBanned: d20 !== V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF }); } break; } } catch (e) { this.core.logger.error(l3, 'processNotification', msg, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `acceptInvitation ${JSON.stringify(e)}`, rawError: e } }); } } } async onTeamMemberInfoUpdated(s19) { try { this.core.logger.info(l3, 'onTeamMemberInfoUpdated', s19); await Promise.all(s19.map(async (member) => { if (member.accountId === this.core.account) { if (this.core.settingService?.name) { const t19 = member.teamType === V2NIMTeamType.V2NIM_TEAM_TYPE_NORMAL ? this.core.conversationIdUtil.teamConversationId(member.teamId) : this.core.conversationIdUtil.superTeamConversationId(member.teamId); const mute = await this.core.settingService.v2IGetConversationMuteStatus(t19); this.core.eventBus.emit('V2NIMConversationService/setMute', t19, mute); try { await this.core.localConversationService.onConversationSetMute(t19, mute); } catch (e) { checkStubServiceErrorCode(e); } } } })); this.service.emit('onTeamMemberInfoUpdated', s19); } catch (e) { this.core.logger.error(l3, 'onTeamMemberInfoUpdated', s19, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `acceptInvitation ${JSON.stringify(e)}`, rawError: e } }); } } } async processSysNotification(notification) { await this.notificationModel.save(notification); const r19 = convert(notification); this.core.logger.info(l3, 'processSysNotification', notification, r19); this.service.emit('onReceiveTeamJoinActionInfo', r19); } async updateTeamActionStatus(notification, q19) { await this.notificationModel.update(notification, q19); } async acceptInvitation(o19) { try { this.core.logger.info(l3, 'acceptInvitation', o19); const p19 = await this.service.sendAcceptInvitation(o19); await this.updateTeamActionStatus(o19, V2NIMTeamJoinActionStatus.V2NIM_TEAM_JOIN_ACTION_STATUS_AGREED); return p19; } catch (e) { this.core.logger.error(l3, 'acceptInvitation', o19, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { if (this.checkIfExpired(e.code)) { await this.updateTeamActionStatus(o19, V2NIMTeamJoinActionStatus.V2NIM_TEAM_JOIN_ACTION_STATUS_EXPIRED); } throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `acceptInvitation ${JSON.stringify(e)}`, rawError: e } }); } } } async rejectInvitation(m19, n19) { try { this.core.logger.info(l3, 'rejectInvitation', m19, n19); await this.service.sendRejectInvitation(m19, n19); await this.updateTeamActionStatus(m19, V2NIMTeamJoinActionStatus.V2NIM_TEAM_JOIN_ACTION_STATUS_REJECTED); return; } catch (e) { this.core.logger.error(l3, 'rejectInvitation', m19, n19, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { if (this.checkIfExpired(e.code)) { await this.updateTeamActionStatus(m19, V2NIMTeamJoinActionStatus.V2NIM_TEAM_JOIN_ACTION_STATUS_EXPIRED); } throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `rejectInvitation ${JSON.stringify(e)}`, rawError: e } }); } } } registerInnerService(k19) { let l19 = k19.databaseService.getDatabase(k19, NIM_DATABASE_NAME_MAIN); this._notificationModel = new TeamNotificationModel(l19, k19); } unRegisterInnerService() { this._notificationModel = undefined; } async onTeamJoined(g19, h19) { try { this.core.logger.info(l3, 'onTeamJoined', g19); await this.service.upsertLocalTeam(g19); this.service.emit('onTeamJoined', g19); const member = await this.service.v2IGetLocalTeamMemberById(g19.teamId, g19.teamType, this.core.account); const i19 = g19.updateTime || g19.createTime; const j19 = V2NIMTeamMemberImpl.buildFromParams(g19.teamId, g19.teamType, this.core.account, V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_NORMAL, undefined, member?.serverExtension, i19, i19, h19, true, false, undefined); this.service.upsertLocalTeamMember(j19, false); if (h19) { await this.service.getTeamMemberListByIdsFromCloud(g19.teamId, g19.teamType, [h19]); } } catch (e) { this.core.logger.error(l3, 'onTeamJoined', g19, e); } } async onTeamLeft(c19, d19, e19) { try { this.core.logger.info(l3, 'onTeamLeft', c19, d19, e19); let f19 = await this.service.v2IGetLocalTeamById(c19, d19); if (f19) { f19.isValidTeam = false; await this.service.updateLocalTeam(f19); } else { f19 = this.generateInvalidTeam(c19, d19); } await this.service.updateLocalTeamMember(c19, d19, [this.core.account], { inTeam: false, bits: V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF }); this.service.emit('onTeamLeft', f19, e19); } catch (e) { this.core.logger.error(l3, 'onTeamLeft', c19, d19, e19, e); } } async onTeamDismissed(z18, a19) { try { this.core.logger.info(l3, 'onTeamDismissed', z18, a19); let b19 = await this.service.v2IGetLocalTeamById(z18, a19); if (b19) { b19.isValidTeam = false; await this.service.updateLocalTeam(b19); } else { b19 = this.generateInvalidTeam(z18, a19); } await this.service.updateLocalTeamMember(z18, a19, [this.core.account], { inTeam: false }); this.service.emit('onTeamDismissed', b19); } catch (e) { this.core.logger.error(l3, 'onTeamDismissed', z18, a19, e); } } async onTeamInfoUpdated(x18) { try { this.core.logger.info(l3, 'onTeamInfoUpdated', x18); await this.service.updateLocalTeam(x18); const y18 = await this.service.v2IGetLocalTeamById(x18.teamId, x18.teamType); this.service.emit('onTeamInfoUpdated', y18 ?? x18); } catch (e) { this.core.logger.error(l3, 'onTeamInfoUpdated', JSON.stringify(x18), e); } } async onTeamMemberJoined(s18, accountId, t18) { try { this.core.logger.info(l3, 'onTeamMemberJoined', s18, accountId, t18); await this.service.updateLocalTeam(s18); const u18 = await this.service.v2IGetLocalTeamById(s18.teamId, s18.teamType); this.service.emit('onTeamInfoUpdated', u18 ?? s18); const v18 = s18.updateTime || s18.createTime; const w18 = V2NIMTeamMemberImpl.buildFromParams(s18.teamId, s18.teamType, accountId, V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_NORMAL, undefined, undefined, v18, v18, t18, true, false, undefined); this.service.upsertLocalTeamMember(w18, true); } catch (e) { this.core.logger.error(l3, 'onTeamMemberJoined', s18, accountId, t18, e); } } async onTeamMembersJoined(m18, n18, o18) { try { this.core.logger.info(l3, 'onTeamMembersJoined', m18, n18, o18); const p18 = m18.updateTime || m18.createTime; const q18 = n18.map((accountId) => { return V2NIMTeamMemberImpl.buildFromParams(m18.teamId, m18.teamType, accountId, V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_NORMAL, undefined, undefined, p18, p18, o18, true, false, undefined); }); if (q18.length === 0) { return; } await this.service.updateLocalTeam(m18); const r18 = await this.service.v2IGetLocalTeamById(m18.teamId, m18.teamType); await this.service.upsertLocalTeamMembers(q18, true); this.service.emit('onTeamInfoUpdated', r18 ?? m18); } catch (e) { this.core.logger.error(l3, 'onTeamMembersJoined', m18, n18, e); } } async onTeamMemberLeft(j18, k18, accountId) { try { this.core.logger.info(l3, 'onTeamMemberLeft', j18, k18, accountId); let l18 = await this.service.deleteLocalTeamMemberByAccount(j18, k18, accountId); if (l18) { l18.inTeam = false; } else { l18 = V2NIMTeamMemberImpl.buildFromParams(j18, k18, accountId, V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_NORMAL, undefined, undefined, 0, 0, undefined, false, false, undefined); } this.service.emit('onTeamMemberLeft', [l18]); } catch (e) { this.core.logger.error(l3, 'onTeamMemberLeft', j18, k18, accountId, e); } } async onTeamMemberKicked(f18, g18, h18, accountId) { try { this.core.logger.info(l3, 'onTeamMemberKicked', f18, g18, h18, accountId); let i18 = await this.service.deleteLocalTeamMemberByAccount(g18, h18, accountId); if (i18) { i18.inTeam = false; } else { i18 = V2NIMTeamMemberImpl.buildFromParams(g18, h18, accountId, V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_NORMAL, undefined, undefined, 0, 0, undefined, false, false, undefined); } i18.inTeam = false; this.service.emit('onTeamMemberKicked', f18, [i18]); } catch (e) { this.core.logger.error(l3, 'onTeamMemberKicked', f18, g18, h18, accountId, e); } } checkIfExpired(code) { if (!code) { return false; } if (code === 509) { return true; } if (code >= 500 && code <= 599) { return false; } if (code >= 190000) { return false; } return true; } generateInvalidTeam(d18, e18) { return V2NIMTeamImpl.buildFromParams(d18, e18, '', '', 200, 0, 0, 0, '', '', '', undefined, undefined, V2NIMTeamJoinMode.V2NIM_TEAM_JOIN_MODE_FREE, V2NIMTeamAgreeMode.V2NIM_TEAM_AGREE_MODE_AUTH, V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_MANAGER, V2NIMTeamUpdateInfoMode.V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER, V2NIMTeamUpdateExtensionMode.V2NIM_TEAM_UPDATE_EXTENSION_MODE_MANAGER, V2NIMTeamChatBannedMode.V2NIM_TEAM_CHAT_BANNED_MODE_UNBAN, true, V2NIMTeamMessageNotifyMode.V2NIM_TEAM_MESSAGE_NOTIFY_MODE_ALL, TeamConst.DEF_MEMBER_UPTIME); } } 