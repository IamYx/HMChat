import { get } from '@nimsdk/vendor';
import { SyncRequest } from './SyncRequest';
const TAG = '[SyncCloud]';
export class SyncCloud {
    constructor(r140) {
        this.core = r140;
    }
    async mainSync(p140) {
        this.core.logger.info(TAG, `send v2 sync, request: ${JSON.stringify(p140)}`);
        const q140 = await this.core.sendCmd('v2NIMSync', new SyncRequest(p140));
        return q140;
    }
    async syncTeamMembers(m140) {
        const n140 = (await this.core.sendCmd('v2NIMSyncTeamMembers', m140));
        const o140 = get(n140.content, "timetag");
        return o140;
    }
}
