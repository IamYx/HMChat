import { cmdConfigCRQueue, cmdMapCRQueue, registerParser, validate } from '@nimsdk/base';
import { get } from '@nimsdk/vendor/Index';
import { V2NIMChatroomMessageNotificationType } from '../../sdk/types';
import CRBaseService from '../base/CRBaseService';
import { registerCRAspect } from './Aspect';
import { queueBatchUpdateRule, queueOfferRule } from './rules';
export default class CRQueueServiceImpl extends CRBaseService {
    constructor(i37) {
        super('queueService', i37);
        registerParser(i37, {
            cmdMap: cmdMapCRQueue, cmdConfig: cmdConfigCRQueue
        });
        this.setListeners();
        registerCRAspect(CRQueueServiceImpl);
    }
    setListeners() {
        this.core.eventBus.on('V2NIMChatroomMessageService/onReceiveNotification', async (b37) => {
            switch (b37.attachment.type) {
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_QUEUE_CHANGE: {
                    try {
                        const d37 = JSON.parse(b37.attachment.raw);
                        const e37 = JSON.parse(d37.data.queueChange);
                        if (e37._e === 'OFFER') {
                            this.emit('onChatroomQueueOffered', {
                                key: e37.key, value: e37.content
                            });
                        }
                        else if (e37._e === 'POLL') {
                            this.emit('onChatroomQueuePolled', {
                                key: e37.key, value: e37.content
                            });
                        }
                        else if (e37._e === 'DROP') {
                            this.emit('onChatroomQueueDropped');
                        }
                        else if (e37._e === 'BATCH_UPDATE') {
                            const h37 = formatQueueElementsFromKVObject(e37.kvObject);
                            h37.length > 0 && this.emit('onChatroomQueueBatchUpdated', h37);
                        }
                        else if (e37._e === 'PARTCLEAR') {
                            const g37 = formatQueueElementsFromKVObject(e37.kvObject);
                            g37.length > 0 && this.emit('onChatroomQueuePartCleared', g37);
                        }
                        else if (e37._e === 'BATCH_OFFER') {
                            const f37 = formatQueueElementsFromElements(e37.elements);
                            f37.length > 0 && this.emit('onChatroomQueueBatchOffered', f37);
                        }
                    }
                    catch (c37) {
                        this.logger.error('V2NIMChatroomQueueServiceImpl json parse error', c37, ' raw = ', b37.attachment.raw);
                    }
                    break;
                }
            }
        });
    }
    async queueOffer(a37) {
        validate(queueOfferRule, a37, '', true);
        await this.core.sendCmd('v2ChatroomQueueOffer', a37);
    }
    async queuePoll(y36) {
        y36 = typeof y36 === 'string' ? y36 : '';
        const z36 = (await this.core.sendCmd('v2ChatroomQueuePoll', {
            elementKey: y36
        }));
        return {
            key: z36.content.elementKey,
            value: z36.content.elementValue
        };
    }
    async queueList() {
        const x36 = (await this.core.sendCmd('v2ChatroomQueueList'));
        return formatQueueElements(x36.content.datas);
    }
    async queuePeek() {
        const w36 = (await this.core.sendCmd('v2ChatroomQueuePeek'));
        return {
            key: w36.content.elementKey,
            value: w36.content.elementValue
        };
    }
    async queueDrop() {
        await this.core.sendCmd('v2ChatroomQueueDrop');
    }
    async queueInit(v36) {
        validate({
            size: {
                type: 'number', min: 0, max: 1000
            }
        }, {
            size: v36
        }, '', true);
        await this.core.sendCmd('v2ChatroomQueueInit', {
            size: v36
        });
    }
    async queueBatchUpdate(o36, p36 = true, q36) {
        validate(queueBatchUpdateRule, {
            elements: o36,
            notificationEnabled: p36,
            notificationExtension: q36
        }, '', true);
        const r36 = o36.reduce((t36, u36) => {
            t36[u36.key] = u36.value;
            return t36;
        }, {});
        const s36 = (await this.core.sendCmd('v2ChatroomQueueBatchUpdate', {
            keyValues: r36,
            notificationEnabled: p36,
            notificationExtension: q36
        }));
        return s36.content.datas;
    }
}
function makeMap(l36, m36) {
    const n36 = new Map();
    n36.set(l36, m36);
    return n36;
}
function stringEntryToMap(h36) {
    const i36 = Object.keys(h36);
    if (i36.length === 0 || typeof i36[0].length === 'undefined' || i36[0] === "") {
        return new Map();
    }
    else {
        const j36 = new Map();
        const k36 = i36[0];
        j36.set(k36, get(h36, k36));
        return j36;
    }
}
function stringEntryListToMapList(d36) {
    const e36 = [];
    for (const f36 of d36) {
        const g36 = Object.keys(f36);
        if (g36.length === 0 || typeof g36[0].length === 'undefined' || g36[0] === "") {
            continue;
        }
        else {
            e36.push(stringEntryToMap(f36));
        }
    }
    return e36;
}
export function formatQueueElementsFromKVObject(b36) {
    return Object.keys(b36).map((c36) => ({
        key: c36,
        value: b36[c36]
    }));
}
export function formatQueueElementsFromElements(z35) {
    if (!(z35 && z35.length > 0)) {
        return [];
    }
    return z35.map((a36) => ({
        key: a36.key,
        value: a36.value,
        accountId: a36.accid,
        nick: a36.nick
    }));
}
export function formatQueueElements(u35) {
    if (!(u35 && u35.length > 0)) {
        return [];
    }
    return u35.map((v35) => {
        const w35 = Object.keys(v35);
        const x35 = w35[0];
        const y35 = v35[x35];
        return {
            key: x35,
            value: y35
        };
    });
}
