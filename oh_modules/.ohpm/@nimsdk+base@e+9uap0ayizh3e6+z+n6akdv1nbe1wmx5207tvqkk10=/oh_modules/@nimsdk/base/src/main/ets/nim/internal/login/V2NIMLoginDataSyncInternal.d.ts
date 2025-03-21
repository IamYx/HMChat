import { V2NIMDataSyncState, V2NIMDataSyncType } from '../../sdk/V2SyncServiceInterface';
import { V2NIMErrorImpl } from '../../utils/error';
export interface V2NIMLoginDataSyncInternal {
    switchDataSync(type: V2NIMDataSyncType, state: V2NIMDataSyncState, error?: V2NIMErrorImpl): Promise<void>;
    reset(): any;
}
export interface V2NIMLoginDataSyncInfo {
    type: V2NIMDataSyncType;
    state: V2NIMDataSyncState;
    error?: V2NIMErrorImpl;
}
