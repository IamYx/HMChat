import { V2NIMConversationType } from '../../sdk/V2NIMConversationService';
import { V2NIMTeamType } from '../../sdk/V2NIMTeamService';
import { V2InternalService } from '../V2NIMInternalService';
import { SyncKey } from './SyncOptions';
export default interface V2NIMSyncServiceInternal extends V2InternalService {
    setSyncConfig(level: number): any;
    updateSyncTimestamp(timeTag: number, key: SyncKey): Promise<void>;
    updateSyncTimestamp2(timeTag: number, key: SyncKey): Promise<void>;
    getRoamingMessageSyncTimestamp(): Promise<number>;
    getV2ConversationSyncTimestamp(): Promise<number>;
    /**
     * sync teamMember timestamp
     */
    getTeamMemberSyncTimestamp(teamId: string, teamType: V2NIMTeamType): number;
    setTeamMemberSyncTimestamp(teamId: string, teamType: V2NIMTeamType, timestamp: number): any;
    /**
     *  以下 2 个函数为获取 clear unread 时间戳
     */
    getConversationSyncClearAllUnreadTimestamp(): Promise<number>;
    getConversationSyncClearUnreadByTypeTimestamp(conversationType: V2NIMConversationType): Promise<number>;
    get isBasicSyncComplete(): boolean;
}
