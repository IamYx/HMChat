import { guid } from "@nimsdk/base";
import { get } from '@nimsdk/vendor';
export class SubscribeUserStatusTag {
    constructor(e139, f139, g139) {
        this.eventType = e139;
        this.duration = f139;
        this.immediateSync = g139;
    }
}
export class SubscribeUserStatusRequest {
    constructor(c139, d139) {
        this.tag = c139;
        this.accountIds = d139;
    }
}
export class UnsubscribeUserStatusTag {
    constructor(b139) {
        this.eventType = b139;
    }
}
export class UnsubscribeUserStatusRequest {
    constructor(z138, a139) {
        this.tag = z138;
        this.accountIds = a139;
    }
}
export class PublishCustomUserStatusRequest {
    constructor(y138) {
        this.tag = y138;
    }
}
export class PublishCustomUserStatusRequestTag {
    constructor(t138, u138, v138, w138, x138) {
        this.uniqueId = guid();
        this.eventType = 1;
        this.statusType = t138;
        this.duration = u138 || 60;
        this.extension = v138;
        this.onlineOnly = w138 === undefined ? true : w138;
        this.multiSync = x138 === undefined ? false : x138;
    }
}
export class SubscriptionCloud {
    constructor(s138) {
        this.core = s138;
    }
    async subscribeUserStatus(p138) {
        const q138 = (await this.core.sendCmd('v2SubscribeUserStatus', p138));
        const r138 = get(q138.content, 'failedList');
        return r138;
    }
    async unsubscribeUserStatus(m138) {
        if (typeof m138.accountIds !== 'undefined' && m138.accountIds?.length > 0) {
            const n138 = await this.core.sendCmd('v2UnsubscribeUserStatus', m138);
            const o138 = get(n138.content, 'failedList');
            return o138;
        }
        else {
            await this.core.sendCmd('v2UnsubscribeAllUserStatus', m138);
            return [];
        }
    }
    async publishCustomUserStatus(j138) {
        const k138 = await this.core.sendCmd('v2PublishEvent', j138);
        const l138 = get(k138.content, 'data');
        return l138;
    }
    async queryUserStatusSubscriptions(c138) {
        let d138 = [];
        if (c138.length > 0) {
            for (let g138 = 0; g138 < c138.length; g138 += 100) {
                const h138 = (await this.core.sendCmd('v2QuerySubscribeEvent', {
                    tag: { eventType: 1 },
                    accountIds: c138.slice(g138, g138 + 100)
                }));
                d138 = d138.concat(h138.content.data.map((i138) => {
                    return {
                        accountId: i138.accountId,
                        subscribeTime: i138.subscribeTime,
                        duration: i138.duration
                    };
                }));
            }
        }
        else {
            const e138 = (await this.core.sendCmd('v2QueryAllSubscribeEvent', {
                tag: {
                    eventType: 1
                }
            }));
            d138 = d138.concat(e138.content.data.map((f138) => {
                return {
                    accountId: f138.accountId,
                    subscribeTime: f138.subscribeTime,
                    duration: f138.duration
                };
            }));
        }
        return d138;
    }
}
