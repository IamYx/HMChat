import { get, set } from '@nimsdk/vendor';
export class SyncRequest {
    constructor(t140) {
        if (typeof get(t140, 'roamingMsgs') !== 'undefined') {
            set(t140, 'superTeamRoamingMsgs', get(t140, 'roamingMsgs'));
        }
        this.tag = t140;
    }
}
export class SyncTeamMembersRequest {
    constructor(s140) {
        this.times = s140;
    }
}
