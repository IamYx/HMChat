import { NIMEStrAnyObj, Packet } from '@nimsdk/base';
import { NIM } from '@nimsdk/base/src/main/ets/nim/NIM';
import { SyncTeamMembersRequest } from './SyncRequest';
export declare class SyncCloud {
    core: NIM;
    constructor(r140: NIM);
    mainSync(p140: NIMEStrAnyObj): Promise<Packet>;
    syncTeamMembers(m140: SyncTeamMembersRequest): Promise<number>;
}
