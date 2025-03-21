import { MainSyncKey, MessageSyncKey, NIM, TeamSyncKey, V1ConversationSyncKey, V2ConversationSyncKey } from '@nimsdk/base/';
import { MainSyncTable } from './MainSyncTable';
import { MessageSyncTable } from './MessageSyncTable';
export declare const enum DataSyncStep {
    MainSyncBegin = 11,
    MainSyncEnd = 12,
    TMSyncBegin = 21,
    TMSyncSuccess = 22,
    TMSyncFail = 23,
    STMSyncBegin = 31,
    STMSyncSuccess = 32,
    STMSyncFail = 33
}
export declare class V2NIMSyncModelImpl {
    core: NIM;
    mainSyncTable: MainSyncTable;
    messageSyncTable: MessageSyncTable;
    constructor(p143: NIM);
    getMainSyncTimestamp(m143: MainSyncKey | TeamSyncKey | V2ConversationSyncKey | V1ConversationSyncKey): Promise<number>;
    updateMainSyncTimestamp(i143: MainSyncKey, j143: number): Promise<void>;
    updateV2ConversationSyncTimestamp(e143: V2ConversationSyncKey, f143: number): Promise<void>;
    updateV1ConversationSyncTimestamp(a143: V1ConversationSyncKey, b143: number): Promise<void>;
    updateTeamSyncTimestamp(w142: TeamSyncKey, x142: number): Promise<void>;
    getMessageSyncTimestamp(t142: MessageSyncKey): Promise<number>;
    updateMessageSyncTimestamp(p142: MessageSyncKey, q142: number): Promise<void>;
    getTeamMemberSyncTimestamp(m142: string): number;
    setTeamMemberSyncTimestamp(i142: string, j142: number): void;
    getSuperTeamMemberSyncTimestamp(f142: string): number;
    setSuperTeamMemberSyncTimestamp(b142: string, c142: number): void;
}
