import { boolToInt, invertSerializeItem } from '../../../parser';
export const serviceName = 'notificationService';
export let cmdMap = {
    '7_3': 'onSysMsg',
    '21_19': 'onSysMsg',
    '7_17': 'onBroadcastMsg',
    '30_7': 'v2SendCustomNotification',
    '32_16': 'v2SendCustomNotificationWithSuperTeam'
};
export const sysMsgTag = {
    timestamp: {
        id: 0,
        retType: 'number'
    },
    type: {
        id: 1,
        retType: 'number'
    },
    receiverId: 2,
    senderId: 3,
    postscript: 4,
    content: 5,
    idServer: 6,
    offlineEnabled: {
        id: 7,
        converter: boolToInt,
        retType: 'boolean',
        access: 'notificationConfig.offlineEnabled'
    },
    pushContent: {
        id: 8,
        access: 'pushConfig.pushContent'
    },
    pushPayload: {
        id: 9,
        access: 'pushConfig.pushPayload'
    },
    deletedIdClient: 10,
    deletedIdServer: 11,
    antispamEnabled: {
        id: 12,
        converter: boolToInt,
        retType: 'boolean',
        access: 'antispamConfig.antispamEnabled'
    },
    antispamCustomNotification: {
        id: 13,
        access: 'antispamConfig.antispamCustomNotification'
    },
    deletedMsgCreateTime: 14,
    deletedMsgFromNick: 15,
    opeAccount: 16,
    forcePushAccountIds: {
        id: 18,
        access: 'pushConfig.forcePushAccountIds',
        def: (c8) => {
            if (c8.type === 101 && c8['pushConfig.forcePush']) {
                return '#%@all@%#';
            }
        },
        converter: (a8, b8) => {
            if (b8['pushConfig.forcePush']) {
                return a8 ? JSON.stringify(a8) : '#%@all@%#';
            }
        }
    },
    forcePushContent: {
        id: 19,
        access: 'pushConfig.forcePushContent'
    },
    forcePush: {
        id: 20,
        converter: boolToInt,
        retType: 'boolean',
        access: 'pushConfig.forcePush'
    },
    routeEnvironment: {
        id: 21,
        access: 'routeConfig.routeEnvironment'
    },
    callbackExt: 22,
    clientNotificationId: {
        id: 23,
        access: 'notificationConfig.clientNotificationId'
    },
    conversationOnlineSyncNotify: 24,
    conversationOnlineSyncData: 25,
    routeEnabled: {
        id: 105,
        converter: boolToInt,
        retType: 'boolean',
        access: 'routeConfig.routeEnabled'
    },
    pushEnabled: {
        id: 107,
        converter: boolToInt,
        retType: 'boolean',
        access: 'pushConfig.pushEnabled'
    },
    unreadEnabled: {
        id: 109,
        converter: boolToInt,
        retType: 'boolean',
        access: 'notificationConfig.unreadEnabled'
    },
    pushNickEnabled: {
        id: 110,
        converter: boolToInt,
        retType: 'boolean',
        access: 'pushConfig.pushNickEnabled'
    }
};
export const broadcastMsgTag = {
    id: 1,
    senderId: 2,
    timestamp: {
        id: 4,
        retType: 'number'
    },
    content: 5
};
export const cmdConfig = {
    v2SendCustomNotification: {
        sid: 30,
        cid: 7,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: sysMsgTag }]
    },
    v2SendCustomNotificationWithSuperTeam: {
        sid: 32,
        cid: 16,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: sysMsgTag }]
    },
    onSysMsg: {
        sid: 7,
        cid: 3,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(sysMsgTag) }]
    },
    onBroadcastMsg: {
        sid: 7,
        cid: 17,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(broadcastMsgTag) }]
    }
};
export const serializeTag = {
    sysMsgTag: sysMsgTag,
    broadcastMsgTag: broadcastMsgTag
};
