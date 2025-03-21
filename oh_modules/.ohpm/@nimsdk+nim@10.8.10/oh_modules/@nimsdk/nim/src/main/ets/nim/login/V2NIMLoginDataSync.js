import { V2NIMDataSyncLevel, V2NIMDataSyncState, V2NIMDataSyncType } from '@nimsdk/base/';
const TAG = '[V2NIMLoginDataSync]';
export default class V2NIMLoginDataSync {
    constructor(a86) {
        this.core = a86;
        this.loginService = a86.loginService;
        this.datas = [];
    }
    async switchDataSync(t85, u85, v85) {
        try {
            const x85 = this.datas.filter((z85) => z85.type === t85);
            const y85 = x85.length > 0 ? x85[0] : null;
            if (!y85) {
                this.datas.push({
                    type: t85,
                    state: u85,
                    error: v85
                });
            }
            else {
                y85.state = u85;
                y85.error = v85;
            }
            this.core.logger.info(TAG, 'switchDataSync', t85, u85);
            this.core.eventBus.emit('V2NIMLocalConversationService/onDataSync', t85, u85, v85);
            this.loginService.emit('onDataSync', t85, u85, v85);
            this.core.logger.info(TAG, 'switchDataSync', t85, u85);
        }
        catch (w85) {
            this.core.eventBus.emit('V2NIMLocalConversationService/onDataSync', t85, u85, v85);
            this.loginService.emit('onDataSync', t85, u85, v85);
            this.core.logger.error(TAG, 'switchDataSync', t85, u85, w85);
        }
    }
    setup(s85 = 0) {
        this.core.syncService.setSyncConfig(s85);
        if (s85 === V2NIMDataSyncLevel.V2NIM_DATA_SYNC_TYPE_LEVEL_FULL) {
            this.datas.push({
                type: V2NIMDataSyncType.V2NIM_DATA_SYNC_TYPE_MAIN,
                state: V2NIMDataSyncState.V2NIM_DATA_SYNC_STATE_WAITING
            });
        }
        else if (s85 === V2NIMDataSyncLevel.V2NIM_DATA_SYNC_TYPE_LEVEL_BASIC) {
            this.datas.push({
                type: V2NIMDataSyncType.V2NIM_DATA_SYNC_TYPE_MAIN,
                state: V2NIMDataSyncState.V2NIM_DATA_SYNC_STATE_WAITING
            });
        }
    }
    reset() {
        this.datas = [];
    }
}
