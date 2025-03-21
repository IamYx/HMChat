export const pushServiceName = 'V2NIMPushService';
export let cmdMap = {
    '3_1': 'updatePushToken',
    '26_6': 'v2UpdatePushToken'
};
export const serializeTag = {
    updatePushTokenProperty: {
        customPushContentType: 1
    },
    v2UpdatePushTokenProperty: {
        pushTokenName: 1,
        pushToken: 2,
        customPushContentType: 5
    }
};
export const cmdConfig = {
    updatePushToken: {
        sid: 3,
        cid: 1,
        service: pushServiceName,
        params: [
            { type: 'String', name: 'tokenName' },
            { type: 'String', name: 'token' },
            { type: 'Int', name: 'pushkit' },
            { type: 'Property', name: 'updatePushTokenProperty', reflectMapper: serializeTag.updatePushTokenProperty }
        ],
        response: []
    },
    v2UpdatePushToken: {
        sid: 26,
        cid: 6,
        service: pushServiceName,
        params: [
            { type: 'Property', name: 'property', reflectMapper: serializeTag.v2UpdatePushTokenProperty }
        ],
        response: []
    }
};
