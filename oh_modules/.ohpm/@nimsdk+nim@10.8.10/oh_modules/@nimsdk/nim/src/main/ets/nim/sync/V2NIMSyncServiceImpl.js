import { cmdConfigSync, cmdMapSync, MainSyncKeys, MessageSyncKeys, registerParser, TeamSyncKeys, V1ConversationSyncKeys, V2ConversationSyncKeys, V2NIMConversationType, V2NIMDataSyncState, V2NIMDataSyncType, V2NIMErrorCode, V2NIMErrorImpl, V2NIMTeamType, V2Service } from '@nimsdk/base/';
import { get } from '@nimsdk/vendor/Index';
import { SyncCloud } from './cloud/SyncCloud';
import { SyncTeamMembersRequest } from './cloud/SyncRequest';
import { V2NIMSyncModelImpl } from './model/V2NIMSyncModelImpl';
import { SyncEvent, SyncEventProcessor } from './SyncEventProcessor';
import { SyncTraceReporter } from './SyncTraceReporter';
const TAG = '[SyncService]';
export default class V2NIMSyncServiceImpl extends V2Service {
    constructor(q148, r148, s148) {
        super(r148, q148);
        this.basicSyncComplete = false;
        this.syncLevel = 1;
        this.syncStart = 0;
        this.syncConfig = s148;
        registerParser(q148, {
            cmdMap: cmdMapSync, cmdConfig: cmdConfigSync
        });
        this.syncEventProcessorPre = new SyncEventProcessor(q148.logger, 'Pre');
        this.syncEventProcessor = new SyncEventProcessor(q148.logger, 'Basic');
        this.setListener();
    }
    get syncModel() {
        if (this._syncModel) {
            return this._syncModel;
        }
        else {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: {
                    reason: `sync model is unavailable`
                }
            });
        }
    }
    get cloud() {
        if (this._cloud) {
            return this._cloud;
        }
        else {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: {
                    reason: `sync cloud is unavailable`
                }
            });
        }
    }
    get isBasicSyncComplete() {
        return this.basicSyncComplete;
    }
    getTeamMemberSyncTimestamp(o148, p148) {
        switch (p148) {
            case V2NIMTeamType.V2NIM_TEAM_TYPE_NORMAL:
                return this.syncModel.getTeamMemberSyncTimestamp(o148);
            case V2NIMTeamType.V2NIM_TEAM_TYPE_SUPER:
                return this.syncModel.getSuperTeamMemberSyncTimestamp(o148);
            default:
                return -1;
        }
    }
    setTeamMemberSyncTimestamp(l148, m148, n148) {
        switch (m148) {
            case V2NIMTeamType.V2NIM_TEAM_TYPE_NORMAL:
                this.syncModel.setTeamMemberSyncTimestamp(l148, n148);
                break;
            case V2NIMTeamType.V2NIM_TEAM_TYPE_SUPER:
                this.syncModel.setSuperTeamMemberSyncTimestamp(l148, n148);
                break;
            default:
                return;
        }
    }
    setSyncConfig(k148) {
        this.syncLevel = k148;
    }
    async onLoginStart(i148) {
        try {
            this.core.logger.info(TAG, 'onLoginStart', i148);
            this.registerInnerService(this.core);
        }
        catch (j148) {
            this.core.logger.error(TAG, 'onLoginStart', j148);
        }
    }
    async onLoginFinished(g148) {
        try {
            this.core.logger.info(TAG, 'onLoginFinished', g148);
            this.syncData();
        }
        catch (h148) {
            this.core.logger.error(TAG, 'onLoginFinished', h148);
        }
    }
    onLogout() {
        this.core.logger.info(TAG, 'onLogout');
        this.unRegisterInnerService();
    }
    setListener() {
        this.core.eventBus.on('V2NIMSyncService/syncConvDone', () => {
            this.syncMainDataBasic();
        });
    }
    async updateSyncTimestamp2(e148, f148) {
        await this.updateSyncTimestamp(e148, f148);
    }
    async updateSyncTimestamp(x147, y147) {
        this.logger.info(TAG, 'updateSyncTimestamp', x147, y147);
        if (MessageSyncKeys.includes(y147)) {
            const d148 = (await this.syncModel?.getMessageSyncTimestamp(y147)) ?? 0;
            if (y147 == 'roamingMsgs' && !this.basicSyncComplete) {
                return;
            }
            if (x147 > d148) {
                this.core.logger.info(TAG, 'updateSyncTimestamp msg key', y147, x147);
                this.syncModel?.updateMessageSyncTimestamp(y147, x147);
            }
        }
        else if (MainSyncKeys.includes(y147)) {
            const c148 = (await this.syncModel?.getMainSyncTimestamp(y147)) ?? 0;
            if (x147 > c148) {
                this.core.logger.info(TAG, 'updateSyncTimestamp main key', y147, x147);
                this.syncModel?.updateMainSyncTimestamp(y147, x147);
            }
        }
        else if (V2ConversationSyncKeys.includes(y147)) {
            const b148 = (await this.syncModel?.getMainSyncTimestamp(y147)) ?? 0;
            if (x147 > b148) {
                this.core.logger.info(TAG, 'updateSyncTimestamp v2conv key', y147, x147);
                this.syncModel?.updateV2ConversationSyncTimestamp(y147, x147);
            }
        }
        else if (V1ConversationSyncKeys.includes(y147)) {
            const a148 = (await this.syncModel?.getMainSyncTimestamp(y147)) ?? 0;
            if (x147 > a148) {
                this.core.logger.info(TAG, 'updateSyncTimestamp v1conv key', y147, x147);
                this.syncModel?.updateV1ConversationSyncTimestamp(y147, x147);
            }
        }
        else if (TeamSyncKeys.includes(y147)) {
            const z147 = (await this.syncModel?.getMainSyncTimestamp(y147)) ?? 0;
            if (x147 > z147) {
                this.core.logger.info(TAG, 'updateSyncTimestamp team key', y147, x147);
                this.syncModel?.updateTeamSyncTimestamp(y147, x147);
            }
        }
        else {
            this.core.logger.warn(TAG, 'updateSyncTimestamp key error:', y147, x147);
        }
    }
    async getRoamingMessageSyncTimestamp() {
        return (await this.syncModel?.getMessageSyncTimestamp('roamingMsgs')) ?? 0;
    }
    async getV2ConversationSyncTimestamp() {
        return (await this.syncModel?.getMainSyncTimestamp('conversation')) ?? 0;
    }
    async getConversationSyncClearAllUnreadTimestamp() {
        return (await this.syncModel?.getMainSyncTimestamp('clearAllUnread')) ?? 0;
    }
    async getConversationSyncClearUnreadByTypeTimestamp(w147) {
        switch (w147) {
            case V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P:
                return (await this.syncModel?.getMainSyncTimestamp('clearP2PUnread')) ?? 0;
            case V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM:
                return (await this.syncModel?.getMainSyncTimestamp('clearTeamUnread')) ?? 0;
            case V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM:
                return (await this.syncModel?.getMainSyncTimestamp('clearSuperTeamUnread')) ?? 0;
            default:
                return 0;
        }
    }
    async getConversationSyncClearTeamUnreadTimestamp() {
        return (await this.syncModel?.getMainSyncTimestamp('clearTeamUnread')) ?? 0;
    }
    async getConversationSyncClearSuperTeamUnreadTimestamp() {
        return (await this.syncModel?.getMainSyncTimestamp('clearSuperTeamUnread')) ?? 0;
    }
    async afterPreSyncComplete() {
        this.core.logger.info(TAG, 'pre sync complete');
        this.core.eventBus.emit('V2NIMTeamService/onSyncFinished');
        this.core.eventBus.emit('V2NIMConversationService/syncMainDataPreSuccess');
        return;
    }
    async afterBasicSyncComplete(s147) {
        try {
            const v147 = get(s147.content, "timetag");
            await this.updateSyncTimestamp2(v147, 'roamingMsgs');
            this.syncTrace?.addSyncTrace(true, 'syncMainData afterBasicSyncComplete complete');
            this.core.logger.info(TAG, 'syncMainData afterBasicSyncComplete complete duration', Date.now() - this.syncStart);
            this.change(12);
            this.basicSyncComplete = true;
        }
        catch (t147) {
            this.syncTrace?.addSyncTrace(false, `syncMainData afterBasicSyncComplete failed ${JSON.stringify(t147)}`);
            this.core.logger.error(TAG, `syncMainData afterBasicSyncComplete catch error`, t147);
            let u147;
            if (t147 instanceof V2NIMErrorImpl || t147.name === 'V2NIMError') {
                u147 = t147;
            }
            else {
                u147 = new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `syncMainData afterBasicSyncComplete ${JSON.stringify(t147)}`, rawError: t147
                    }
                });
            }
            this.change(12, u147);
            this.basicSyncComplete = true;
        }
    }
    async syncData() {
        const r147 = get(this.core, 'loginService.authenticator.loginClientOfThisConnection.loginType');
        this.logger.info(TAG, 'syncData', r147);
        if (r147 === 1) {
            await this.syncMainData();
            if (this.syncLevel !== 1) {
            }
        }
        else if (r147 === 2) {
            await this.doQchatSync();
        }
        else if (r147 === 3) {
            await this.syncMainData();
            if (this.syncLevel !== 1) {
            }
            await this.doQchatSync();
        }
        else {
            this.logger.error(TAG, 'syncData unknown type');
            return;
        }
        this.logger.info(TAG, 'syncData end');
    }
    async syncMainData() {
        this.core.logger.info(TAG, 'syncMainData start');
        this.syncTrace = new SyncTraceReporter(this.core);
        this.basicSyncComplete = false;
        this.syncStart = Date.now();
        this.change(11);
        await this.syncMainDataPre();
    }
    async syncMainDataBasic() {
        try {
            const p147 = await this.generateBasicSyncStamps();
            this.core.logger.info(TAG, 'syncMainDataBasic timestamps', p147);
            const q147 = await this.cloud.mainSync(p147);
            this.syncEventProcessor.enqueueEvent(new SyncEvent('syncMainData', '27_1', () => this.afterBasicSyncComplete(q147)));
        }
        catch (n147) {
            this.syncTrace?.addSyncTrace(false, `syncMainData failed ${JSON.stringify(n147)}`);
            this.core.logger.error(TAG, `syncMainDataBasic catch error`, n147);
            let o147;
            if (n147 instanceof V2NIMErrorImpl || n147.name === 'V2NIMError') {
                o147 = n147;
            }
            else {
                o147 = new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `syncMainDataBasic ${JSON.stringify(n147)}`, rawError: n147
                    }
                });
            }
            this.change(12, o147);
            this.basicSyncComplete = true;
        }
    }
    preSyncKey(m147) {
        if (m147 === 'friends' || m147 === 'friendUsers') {
            return true;
        }
        else {
            return false;
        }
    }
    async generatePreSyncStamps() {
        const h147 = {};
        if (this.syncConfig.enableTeam) {
            for (let k147 = 0; k147 < TeamSyncKeys.length; k147++) {
                const l147 = TeamSyncKeys[k147];
                h147[l147] = await this.syncModel?.getMainSyncTimestamp(l147);
            }
        }
        else {
        }
        if (this.syncConfig.enableMain) {
            for (let i147 = 0; i147 < MainSyncKeys.length; i147++) {
                const j147 = MainSyncKeys[i147];
                if (this.preSyncKey(j147)) {
                    h147[j147] = await this.syncModel?.getMainSyncTimestamp(j147);
                }
            }
        }
        else {
        }
        return h147;
    }
    async generateBasicSyncStamps() {
        const a147 = {};
        if (this.syncConfig.enableMain) {
            for (let f147 = 0; f147 < MainSyncKeys.length; f147++) {
                const g147 = MainSyncKeys[f147];
                if (!this.preSyncKey(g147)) {
                    a147[g147] = await this.syncModel?.getMainSyncTimestamp(g147);
                }
            }
        }
        if (this.syncConfig.enableMessage) {
            for (let d147 = 0; d147 < MessageSyncKeys.length; d147++) {
                const e147 = MessageSyncKeys[d147];
                a147[e147] = await this.syncModel?.getMessageSyncTimestamp(e147);
            }
        }
        if (this.syncConfig.enableV1Conversation) {
            for (let b147 = 0; b147 < V1ConversationSyncKeys.length; b147++) {
                const c147 = V1ConversationSyncKeys[b147];
                a147[c147] = await this.syncModel?.getMainSyncTimestamp(c147);
            }
        }
        return a147;
    }
    async syncMainDataPre() {
        try {
            const y146 = await this.generatePreSyncStamps();
            if (Object.keys(y146).length === 0) {
                this.core.logger.info(TAG, 'no need to syncMainDataPre');
                this.core.eventBus.emit('V2NIMConversationService/syncMainDataPreSuccess');
                return;
            }
            this.core.eventBus.emit('V2NIMTeamService/onSyncStarted');
            const z146 = await this.cloud.mainSync(y146);
            this.syncEventProcessorPre.enqueueEvent(new SyncEvent('syncMainDataPre', '27_1', () => this.afterPreSyncComplete()));
        }
        catch (w146) {
            let x146 = w146;
            if (w146 instanceof V2NIMErrorImpl || w146.name === 'V2NIMError') {
                x146 = w146;
            }
            else {
                x146 = new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `syncMainDataPre ${JSON.stringify(w146)}`, rawError: w146
                    }
                });
            }
            this.core.eventBus.emit('V2NIMTeamService/onSyncFailed', x146);
            this.core.eventBus.emit('V2NIMConversationService/syncMainDataPreFail', x146);
            this.change(12, x146);
            this.core.logger.error(TAG, 'syncMainDataPre', x146);
            throw x146;
        }
    }
    async syncTeamMembers() {
        try {
            this.core.logger.info('sync:: team member sync start');
            this.change(21);
            const o146 = [];
            const p146 = await this.core.teamService.v2ITeamQueryMemberUpdateTimeMap(V2NIMTeamType.V2NIM_TEAM_TYPE_NORMAL);
            for (const t146 of p146.keys()) {
                const u146 = p146.get(t146);
                const v146 = this.getTeamMemberSyncTimestamp(t146, V2NIMTeamType.V2NIM_TEAM_TYPE_NORMAL);
                if (u146 <= 0 || v146 <= 0 || v146 < u146) {
                    o146.push(t146);
                }
            }
            const q146 = 500;
            if (o146.length <= q146) {
                await this.chunkSyncTeamMembers(o146, `sync all: ${o146.length}`);
            }
            else {
                for (let r146 = 0; r146 < o146.length; r146 += q146) {
                    const s146 = o146.slice(r146, r146 + q146);
                    await this.chunkSyncTeamMembers(s146, `chunk sync: ${s146.length}`);
                }
            }
            this.change(22);
        }
        catch (m146) {
            this.logger.error(TAG, 'team member sync  error', m146);
            let n146;
            if (m146 instanceof V2NIMErrorImpl || m146.name === 'V2NIMError') {
                n146 = m146;
            }
            else {
                n146 = new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `sync team members ${JSON.stringify(m146)}`, rawError: m146
                    }
                });
            }
            if (m146.code === V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND) {
                this.change(22);
                return;
            }
            else {
                this.change(23, n146);
                throw n146;
            }
        }
    }
    async syncSuperTeamMembers() {
        try {
            this.core.logger.info(TAG, 'super team member sync start');
            this.change(31);
            const e146 = [];
            const f146 = await this.core.teamService.v2ITeamQueryMemberUpdateTimeMap(V2NIMTeamType.V2NIM_TEAM_TYPE_SUPER);
            for (const j146 of f146.keys()) {
                const k146 = f146.get(j146);
                const l146 = this.getTeamMemberSyncTimestamp(j146, V2NIMTeamType.V2NIM_TEAM_TYPE_SUPER);
                if (k146 <= 0 || l146 <= 0 || l146 < k146) {
                    e146.push(j146);
                }
            }
            const g146 = 500;
            if (e146.length <= g146) {
                await this.chunkSyncSuperTeamMembers(e146, `sync all super: ${e146.length}`);
            }
            else {
                for (let h146 = 0; h146 < e146.length; h146 += g146) {
                    const i146 = e146.slice(h146, h146 + g146);
                    await this.chunkSyncSuperTeamMembers(i146, `chunk sync super: ${i146.length}`);
                }
            }
            this.change(32);
        }
        catch (c146) {
            this.logger.error(TAG, 'super team member sync  error', c146);
            let d146;
            if (c146 instanceof V2NIMErrorImpl || c146.name === 'V2NIMError') {
                d146 = c146;
            }
            else {
                d146 = new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `super team member sync ${JSON.stringify(c146)}`, rawError: c146
                    }
                });
            }
            if (c146.code === V2NIMErrorCode.V2NIM_ERROR_CODE_PLUGIN_NO_FOUND) {
                this.change(22);
                return;
            }
            else {
                this.change(33, d146);
                throw d146;
            }
        }
    }
    async chunkSyncTeamMembers(x145, y145) {
        const z145 = new SyncTeamMembersRequest(this.makeLongLongMap(x145, V2NIMTeamType.V2NIM_TEAM_TYPE_NORMAL));
        const a146 = (await this.core.sendCmd('v2NIMSyncTeamMembers', z145));
        const b146 = get(a146.content, "timetag");
        this.core.logger.info(TAG, 'team member sync: ', b146, y145);
    }
    async chunkSyncSuperTeamMembers(s145, t145) {
        const u145 = new SyncTeamMembersRequest(this.makeLongLongMap(s145, V2NIMTeamType.V2NIM_TEAM_TYPE_SUPER));
        const v145 = (await this.core.sendCmd('v2NIMSyncSuperTeamMembers', u145));
        const w145 = get(v145.content, "timetag");
        this.core.logger.info(TAG, 'super team member sync: ', w145, t145);
    }
    async doQchatSync() {
    }
    update(p145, q145, r145) {
        this.core.loginService.dataSync.switchDataSync(p145, q145, r145);
    }
    change(n145, o145) {
        switch (n145) {
            case 11: {
                this.update(V2NIMDataSyncType.V2NIM_DATA_SYNC_TYPE_MAIN, V2NIMDataSyncState.V2NIM_DATA_SYNC_STATE_SYNCING);
                break;
            }
            case 12: {
                this.update(V2NIMDataSyncType.V2NIM_DATA_SYNC_TYPE_MAIN, V2NIMDataSyncState.V2NIM_DATA_SYNC_STATE_COMPLETED, o145);
                break;
            }
        }
    }
    makeLongLongMap(i145, j145) {
        const k145 = {};
        for (const l145 of i145) {
            const m145 = this.getTeamMemberSyncTimestamp(l145, j145);
            k145[l145] = m145 ?? 0;
        }
        this.logger.info(TAG, 'makeLongLongMap', JSON.stringify(k145));
        return k145;
    }
    registerInnerService(h145) {
        this._syncModel = new V2NIMSyncModelImpl(h145);
        this._cloud = new SyncCloud(h145);
    }
    unRegisterInnerService() {
        this._syncModel = undefined;
        this._cloud = undefined;
    }
    async v2TeamSyncHandler(g145) {
        this.syncEventProcessorPre.enqueueEvent(new SyncEvent('v2TeamSyncHandler', '8_109', () => this.core.teamService.v2ISyncTeamSyncHandler(g145)));
    }
    async v2SuperTeamSyncHandler(f145) {
        this.syncEventProcessorPre.enqueueEvent(new SyncEvent('v2SuperTeamSyncHandler', '21_109', () => this.core.teamService.v2ISyncSuperTeamSyncHandler(f145)));
    }
    async v2TeamMembersOfSelfInSyncHandler(e145) {
        this.syncEventProcessorPre.enqueueEvent(new SyncEvent('v2TeamMembersOfSelfInSyncHandler', '8_126', () => this.core.teamService.v2ISyncTeamMembersOfSelfInSyncHandler(e145)));
    }
    async v2SuperTeamMembersOfSelfInSyncHandler(d145) {
        this.syncEventProcessorPre.enqueueEvent(new SyncEvent('v2SuperTeamMembersOfSelfInSyncHandler', '21_111', () => this.core.teamService.v2ISyncSuperTeamMembersOfSelfInSyncHandler(d145)));
    }
    async v2SyncFriendListHandler(c145) {
        this.syncEventProcessorPre.enqueueEvent(new SyncEvent('v2SyncFriendListHandler', '12_5', () => this.core.friendService.v2ISyncFriendListHandler(c145, true)));
    }
    async v2SyncFriendUserListHandler(b145) {
        this.syncEventProcessorPre.enqueueEvent(new SyncEvent('v2SyncFriendUserListHandler', '12_6', () => this.core.friendService.v2ISyncFriendUserListHandler(b145, true)));
    }
    async syncMultiMarkSessionAckHandler(a145) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, 'syncMultiMarkSessionAckHandler after basicSyncComplete', a145);
            await this.core.localConversationService.v2ISyncMultiMarkSessionAckHandler(a145, false);
        }
        else {
            this.syncEventProcessor.enqueueEvent(new SyncEvent('syncMultiMarkSessionAckHandler', '4_14', () => this.core.localConversationService.v2ISyncMultiMarkSessionAckHandler(a145, true)));
        }
    }
    async syncMultiMarkSuperTeamSessionAckHandler(z144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, 'syncMultiMarkSuperTeamSessionAckHandler after basicSyncComplete', z144);
            await this.core.localConversationService.v2ISyncMultiMarkSuperTeamSessionAckHandler(z144, false);
        }
        else {
            this.syncEventProcessor.enqueueEvent(new SyncEvent('syncMultiMarkSuperTeamSessionAckHandler', '4_20', () => this.core.localConversationService.v2ISyncMultiMarkSuperTeamSessionAckHandler(z144, true)));
        }
    }
    async nimSyncStickTopSessionsHandler(y144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, 'nimSyncStickTopSessionsHandler after basicSyncComplete', y144);
            await this.core.localConversationService.v2ISyncStickTopSessionsHandler(y144, false);
        }
        else {
            this.syncEventProcessor.enqueueEvent(new SyncEvent('nimSyncStickTopSessionsHandler', '4_23', () => this.core.localConversationService.v2ISyncStickTopSessionsHandler(y144, true)));
        }
    }
    async syncBlockAndMuteListHandler(x144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `syncBlockAndMuteListHandler after basicSyncComplete`, x144);
            await this.core.userService.v2ISyncBlockAndMuteListHandler(x144, false);
        }
        else {
            this.syncEventProcessor.enqueueEvent(new SyncEvent('syncBlockAndMuteListHandler', '3_8', () => this.core.userService.v2ISyncBlockAndMuteListHandler(x144, true)));
        }
    }
    async v2SyncSelfUserInfoHandler(w144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `v2SyncSelfUserInfoHandler after basicSyncComplete`, w144);
            await this.core.userService.v2ISyncSelfUserInfoHandler(w144, false);
        }
        else {
            this.syncEventProcessor.enqueueEvent(new SyncEvent('v2SyncSelfUserInfoHandler', '3_109', () => this.core.userService.v2ISyncSelfUserInfoHandler(w144, true)));
        }
    }
    async syncOfflineMsgsHandler(v144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `syncOfflineMsgsHandler after basicSyncComplete`, v144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('syncOfflineMsgsHandler', '4_4', () => this.core.messageService.v2ISyncOfflineMsgsHandler(v144)));
    }
    async syncRoamingMsgsHandler(u144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `syncRoamingMsgsHandler after basicSyncComplete`, u144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('syncRoamingMsgsHandler', '4_9', () => this.core.messageService.v2ISyncRoamingMsgsHandler(u144)));
    }
    async syncSuperTeamRoamingMsgsHandler(t144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `syncSuperTeamRoamingMsgsHandler after basicSyncComplete`, t144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('syncSuperTeamRoamingMsgsHandler', '4_17', () => this.core.messageService.v2ISyncRoamingMsgsHandler(t144)));
    }
    async syncP2PMessageReceiptsHandler(s144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `syncP2PMessageReceiptsHandler after basicSyncComplete`, s144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('syncP2PMessageReceiptsHandler', '4_12', () => this.core.messageService.v2ISyncP2PMessageReceiptsHandler(s144)));
    }
    async syncRevokeMessageHandler(r144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `syncRevokeMessageHandler after basicSyncComplete`, r144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('syncRevokeMessageHandler', '7_15', () => this.core.messageService.v2ISyncRevokeMessageHandler(r144)));
    }
    async syncBroadcastMsgHandler(q144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `syncBroadcastMsgHandler after basicSyncComplete`, q144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('syncBroadcastMsgHandler', '4_16', () => this.core.notificationService.v2ISyncBroadcastMsgHandler(q144)));
    }
    async syncOnDeleteMessagesHandler(p144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `onSyncDeleteMessages after basicSyncComplete`, p144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('syncOnDeleteMessagesHandler', '4_21', () => this.core.messageService.v2ISyncOnDeleteMessagesHandler(p144)));
    }
    async syncClearHistoryMessageHandler(o144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `syncClearHistoryMessageHandler after basicSyncComplete`, o144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('syncClearHistoryMessageHandler', '4_24', () => this.core.messageService.v2ISyncClearHistoryMessageHandler(o144)));
    }
    async syncSuperTeamRevokeMessageHandler(n144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `syncSuperTeamRevokeMessageHandler after basicSyncComplete`, n144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('syncSuperTeamRevokeMessageHandler', '4_19', () => this.core.messageService.v2ISyncSuperTeamRevokeMessageHandler(n144)));
    }
    async v2SyncOfflineSysMsgsHandler(m144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `v2SyncOfflineSysMsgsHandler after basicSyncComplete`, m144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('v2SyncOfflineSysMsgsHandler', '4_6_18', () => this.core.notificationService.v2ISyncOfflineSysMsgsHandler(m144)));
    }
    v2MessageOnModifiedHandler(l144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `v2MessageOnModifiedHandler after basicSyncComplete`, l144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('v2MessageOnModifiedHandler', '7_33', () => this.core.messageService.v2ISyncMessageOnModifiedHandler(l144)));
    }
    v2MessageSyncModifiedHandler(k144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `v2MessageSyncModifiedHandler after basicSyncComplete`, k144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('v2MessageSyncModifiedHandler', '4_27_28', () => this.core.messageService.v2ISyncMessageModifiedRoamHandler(k144)));
    }
    async ysfSyncOfflineMsgsHandler(j144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `ysfSyncOfflineMsgsHandler after basicSyncComplete`, j144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('ysfSyncOfflineMsgsHandler', '4_100', () => this.core.ysfService.v2IYSFSyncOfflineMsgsHandler(j144)));
    }
    async ysfSyncSysNotificationHandler(i144) {
        if (this.basicSyncComplete) {
            this.logger.warn(TAG, `ysfSyncSysNotificationHandler after basicSyncComplete`, i144);
        }
        this.syncEventProcessor.enqueueEvent(new SyncEvent('ysfSyncSysNotificationHandler', '4_101', () => this.core.ysfService.v2IYSFSyncSysNotificationHandler(i144)));
    }
}
