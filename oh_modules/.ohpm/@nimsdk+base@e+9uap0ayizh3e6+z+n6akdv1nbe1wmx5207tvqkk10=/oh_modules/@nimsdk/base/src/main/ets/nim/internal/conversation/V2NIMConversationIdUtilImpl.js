import { V2NIMConversationType } from '../../sdk/V2NIMConversationService';
export default class V2NIMConversationIdUtilImpl {
    constructor(w) {
        this.core = w;
    }
    p2pConversationId(v) {
        return `${this.core.account}|${V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P}|${v}`;
    }
    teamConversationId(u) {
        return `${this.core.account}|${V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM}|${u}`;
    }
    superTeamConversationId(t) {
        return `${this.core.account}|${V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM}|${t}`;
    }
    messageConversationId(q, r, s) {
        if (q === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P) {
            return r === this.core.account ? this.p2pConversationId(s) : this.p2pConversationId(r);
        }
        else if (q === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM) {
            return this.teamConversationId(s);
        }
        else {
            return this.superTeamConversationId(s);
        }
    }
    receiveId(l, m) {
        const n = this.parseConversationTargetId(l);
        const o = this.parseConversationType(l);
        let p;
        switch (o) {
            case V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P:
                {
                    if (m === n) {
                        p = this.core.account;
                    }
                    else {
                        p = n;
                    }
                }
                break;
            case V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM:
            case V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM:
                {
                    p = n;
                }
                break;
            default:
                p = n;
                break;
        }
        return p;
    }
    parseConversationType(i) {
        try {
            if (i && i.startsWith(`${this.core.account}|`)) {
                const k = i.replace(`${this.core.account}|`, '');
                return Number(k[0]);
            }
            else {
                this.core.logger.warn(`conversationId is not start with ${this.core.account}`);
                return V2NIMConversationType.V2NIM_CONVERSATION_TYPE_UNKNOWN;
            }
        }
        catch (j) {
            return V2NIMConversationType.V2NIM_CONVERSATION_TYPE_UNKNOWN;
        }
    }
    parseConversationTargetId(f) {
        try {
            if (f && f.startsWith(`${this.core.account}|`)) {
                const h = f.replace(`${this.core.account}|`, '');
                return h.slice(2);
            }
            else {
                this.core.logger.warn(`conversationId is not start with ${this.core.account}`);
                return '';
            }
        }
        catch (g) {
            return '';
        }
    }
    parseConversationMyAccountId(d) {
        const e = d.split('|');
        if (e.length != 3) {
            return '';
        }
        if (!d.startsWith(`${this.core.account}|`)) {
            this.core.logger.warn(`conversationId is not start with ${this.core.account}`);
            return '';
        }
        return e[0];
    }
}
