import { NIM_DATABASE_NAME_MAIN, NIM_DATABASE_NAME_MESSAGE } from '@nimsdk/base/';
import { MainSyncTable } from './MainSyncTable';
import { MessageSyncTable } from './MessageSyncTable';
const TAG = '[SyncModel]';
export class V2NIMSyncModelImpl {
    constructor(p143) {
        this.core = p143;
        this.mainSyncTable =
            new MainSyncTable(p143.databaseService.getDatabase(p143, NIM_DATABASE_NAME_MAIN), p143);
        this.messageSyncTable =
            new MessageSyncTable(p143.databaseService.getDatabase(p143, NIM_DATABASE_NAME_MESSAGE), p143);
    }
    async getMainSyncTimestamp(m143) {
        try {
            const o143 = await this.mainSyncTable.queryBySyncKey(m143);
            if (o143) {
                this.core.logger.info(TAG, 'getMainSyncTimestamp', m143, o143);
                return o143;
            }
            else {
                return 0;
            }
        }
        catch (n143) {
            this.core.logger.error(TAG, 'getMainSyncTimestamp', m143, n143);
            return 0;
        }
    }
    async updateMainSyncTimestamp(i143, j143) {
        try {
            const l143 = await this.mainSyncTable.upsertBySyncKey(i143, j143);
            this.core.logger.info(TAG, 'updateMainSyncTimestamp', i143, j143, l143);
        }
        catch (k143) {
            this.core.logger.error(TAG, 'updateMainSyncTimestamp', i143, j143, k143);
        }
    }
    async updateV2ConversationSyncTimestamp(e143, f143) {
        try {
            const h143 = await this.mainSyncTable.upsertBySyncKey(e143, f143);
            this.core.logger.info(TAG, 'updateV2ConversationSyncTimestamp', e143, f143, h143);
        }
        catch (g143) {
            this.core.logger.info(TAG, 'updateV2ConversationSyncTimestamp', e143, f143, JSON.stringify(g143));
        }
    }
    async updateV1ConversationSyncTimestamp(a143, b143) {
        try {
            const d143 = await this.mainSyncTable.upsertBySyncKey(a143, b143);
            this.core.logger.info(TAG, 'updateV1ConversationSyncTimestamp', a143, b143, d143);
        }
        catch (c143) {
            this.core.logger.error(TAG, 'updateV1ConversationSyncTimestamp', a143, b143, c143);
        }
    }
    async updateTeamSyncTimestamp(w142, x142) {
        try {
            const z142 = await this.mainSyncTable.upsertBySyncKey(w142, x142);
            this.core.logger.info(TAG, 'updateTeamSyncTimestamp', w142, x142, z142);
        }
        catch (y142) {
            this.core.logger.error(TAG, 'updateTeamSyncTimestamp', w142, x142, y142);
        }
    }
    async getMessageSyncTimestamp(t142) {
        try {
            const v142 = await this.messageSyncTable.queryBySyncKey(t142);
            if (v142) {
                this.core.logger.info(TAG, 'getMessageSyncTimestamp', t142, v142);
            }
            return v142 ? v142 : 0;
        }
        catch (u142) {
            this.core.logger.warn(TAG, 'getMessageSyncTimestamp', u142);
            return 0;
        }
    }
    async updateMessageSyncTimestamp(p142, q142) {
        try {
            const s142 = await this.messageSyncTable.upsertBySyncKey(p142, q142);
            this.core.logger.info(TAG, 'updateMessageSyncTimestamp', p142, q142, s142);
        }
        catch (r142) {
            this.core.logger.error(TAG, 'updateMessageSyncTimestamp', p142, q142, r142);
        }
    }
    getTeamMemberSyncTimestamp(m142) {
        try {
            const o142 = 'team_member' + m142;
            return this.core.preferenceSync.get(o142, 0);
        }
        catch (n142) {
            this.core.logger.error(TAG, 'getTeamMemberSyncTimestamp team members', m142, n142);
            return 0;
        }
    }
    setTeamMemberSyncTimestamp(i142, j142) {
        try {
            const l142 = 'team_member' + i142;
            this.core.preferenceSync.put(l142, j142);
        }
        catch (k142) {
            this.core.logger.error(TAG, 'setTeamMemberSyncTimestamp team members', i142, k142);
        }
    }
    getSuperTeamMemberSyncTimestamp(f142) {
        try {
            const h142 = 'super_team_member' + f142;
            return this.core.preferenceSync.get(h142, 0);
        }
        catch (g142) {
            this.core.logger.error(TAG, 'getSuperTeamMemberSyncTimestamp super team members', f142, g142);
            return 0;
        }
    }
    setSuperTeamMemberSyncTimestamp(b142, c142) {
        try {
            const e142 = 'super_team_member' + b142;
            this.core.preferenceSync.put(e142, c142);
        }
        catch (d142) {
            this.core.logger.error(TAG, 'setSuperTeamMemberSyncTimestamp super team members', b142, d142);
        }
    }
}
