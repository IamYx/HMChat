import { registerParser, sysTypeToConversationType, typeMap, V2NIMConversationType, V2Service, validate, validateConversationId } from '@nimsdk/base';
import { assign, get, unset } from '@nimsdk/vendor';
import { registerAspect } from './Aspect';
import { BatchMarkReadRequest, SendCustomNotificationParam, SendCustomNotificationRequest } from './cloud/NotificationRequest';
import { cmdConfigNotification, cmdMapNotification } from '@nimsdk/base';
import { sendCustomNotificationRule } from './Rules';
const TAG = '[NotificationService]';
export default class V2NIMNotificationServiceImpl extends V2Service {
    constructor(b93, c93, d93) {
        super(c93, b93);
        registerParser(b93, { cmdMap: cmdMapNotification, cmdConfig: cmdConfigNotification });
        registerAspect(V2NIMNotificationServiceImpl, b93);
    }
    async onLoginStart(a93) {
    }
    async onLoginFinished(z92) {
    }
    onLogout() {
    }
    async sendCustomNotification(q92, r92, s92) {
        this.core.logger.info(TAG, 'call API sendCustomNotification', q92, r92, s92);
        validateConversationId(this.core.account, q92);
        validate(sendCustomNotificationRule, { content: r92, params: s92 }, '', true);
        const t92 = this.core.conversationIdUtil.parseConversationType(q92);
        const u92 = this.core.conversationIdUtil.parseConversationTargetId(q92);
        const v92 = Date.now();
        const w92 = t92 === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM ?
            'v2SendCustomNotificationWithSuperTeam' : 'v2SendCustomNotification';
        const x92 = new SendCustomNotificationParam(assign({
            unreadEnabled: true,
            offlineEnabled: true
        }, s92?.notificationConfig), assign({
            pushEnabled: true,
            pushNickEnabled: true
        }, s92?.pushConfig), assign({
            antispamEnabled: true
        }, s92?.antispamConfig), assign({
            routeEnabled: true
        }, s92?.routeConfig), v92, typeMap[t92], u92, r92);
        const y92 = new SendCustomNotificationRequest(x92);
        await this.core.sendCmd(w92, y92);
    }
    async markBroadcastMsgAck(n92) {
        const o92 = new BatchMarkReadRequest(7, 17, n92.map((p92) => p92.id));
        await this.core.sendCmd('v2BatchMarkRead', o92);
    }
    async v2ISyncOfflineSysMsgsHandler(g92) {
        this.core.logger.info('SyncService', 'v2ISyncOfflineSysMsgsHandler start');
        const h92 = get(g92.content, 'datas');
        await this.v2IMarkSysMsgAck(h92);
        let i92 = [];
        for (const l92 of h92) {
            this.logger.info(TAG, 'v2SyncOfflineSysMsgsHandler, notification item', l92);
            const m92 = await this.processSystemMessage(l92);
            if (m92) {
                i92.push(m92);
            }
        }
        i92 = i92.sort((j92, k92) => {
            return j92.timestamp - k92.timestamp;
        });
        if (i92) {
            this.emit('onReceiveCustomNotifications', i92);
        }
        this.core.logger.info('SyncService', 'v2ISyncOfflineSysMsgsHandler end');
    }
    async v2ISyncBroadcastMsgHandler(b92) {
        this.core.logger.info('SyncService', 'v2ISyncBroadcastMsgHandler start');
        const c92 = get(b92.content, 'datas');
        await this.markBroadcastMsgAck(c92);
        this.emit('onReceiveBroadcastNotifications', c92);
        let d92 = 0;
        c92.map((e92) => {
            const f92 = parseFloat(e92.id);
            if (f92 > d92) {
                d92 = f92;
            }
        });
        await this.core.syncService.updateSyncTimestamp2(d92, 'broadcastMsgs');
        this.core.logger.info('SyncService', 'v2ISyncBroadcastMsgHandler end');
    }
    async v2IMarkSysMsgAck(u91) {
        const v91 = [];
        const w91 = [];
        const x91 = [15, 16, 17, 18, 103];
        u91.forEach((a92) => {
            if (!a92.idServer) {
                return;
            }
            if (x91.includes(a92.type)) {
                w91.push(a92.idServer);
            }
            else {
                v91.push(a92.idServer);
            }
        });
        if (v91.length > 0) {
            const z91 = new BatchMarkReadRequest(7, 3, v91);
            await this.core.sendCmd('v2BatchMarkRead', z91);
        }
        if (w91.length > 0) {
            const y91 = new BatchMarkReadRequest(21, 19, w91);
            await this.core.sendCmd('v2BatchMarkRead', y91);
        }
    }
    onBroadcastMsgHandler(s91) {
        this.core.logger.info(TAG, 'call Handler onBroadcastMsgHandler');
        const t91 = get(s91.content, 'data');
        this.markBroadcastMsgAck([t91]);
        this.emit('onReceiveBroadcastNotifications', [t91]);
    }
    async onSysMsgHandler(o91) {
        this.core.logger.info(TAG, 'call Handler onSysMsgHandler');
        const p91 = o91.raw.r[0];
        const q91 = get(o91.content, 'data');
        if (!q91.idServer && p91) {
            q91.idServer = p91;
        }
        this.v2IMarkSysMsgAck([q91]);
        this.logger.info(TAG, 'processSystemMessage', q91, 'realIdServer: ', p91);
        const r91 = await this.processSystemMessage(q91);
        if (r91) {
            if (q91.idServer === '0' && r91.notificationConfig) {
                r91.notificationConfig.offlineEnabled = false;
            }
            this.emit('onReceiveCustomNotifications', [r91]);
        }
    }
    async processSystemMessage(j91) {
        const k91 = [0, 1, 2, 3, 4, 15, 16, 17, 18];
        const l91 = [5, 6];
        const m91 = j91.type;
        if (k91.includes(m91)) {
            await this.core.teamService.v2ITeamProcessSysNotification(j91);
            return undefined;
        }
        else if (l91.includes(m91)) {
            this.core.logger.info(TAG, 'friendNotiTypes', j91);
            this.core.eventBus.emit('V2NIMNotificationService/sysNotification', j91);
        }
        const n91 = assign({}, j91, {
            conversationType: get(sysTypeToConversationType, m91)
        });
        unset(n91, 'type');
        return n91;
    }
}
