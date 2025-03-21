export const serviceName = 'settingService';
export let cmdMap = {
    '34_1': 'v2SetDeviceToken',
    '34_2': 'v2SetAppBackground',
    '34_13': 'v2SetDndConfig',
    '34_15': 'v2SetPushMobileOnDesktopOnline'
};
export const mobilePushTag = {
    need: {
        id: 1,
        converter: (d8) => {
            return d8 ? 2 : 1;
        }
    }
};
export const dndConfigTag = {
    detail: 1,
    disturbing: 2,
    fromH: 3,
    fromM: 4,
    toH: 5,
    toM: 6
};
export const cmdConfig = {
    v2SetDeviceToken: {
        sid: 34,
        cid: 1,
        service: serviceName,
        params: [
            { type: 'String', name: 'certificateName' },
            { type: 'String', name: 'pushDeviceToken' },
            { type: 'Int', name: 'pushkit' }
        ]
    },
    v2SetAppBackground: {
        sid: 34,
        cid: 2,
        service: serviceName,
        params: [
            { type: 'Bool', name: 'isBackground' },
            { type: 'Int', name: 'badge' }
        ]
    },
    v2SetDndConfig: {
        sid: 34,
        cid: 13,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: dndConfigTag }]
    },
    v2SetPushMobileOnDesktopOnline: {
        sid: 34,
        cid: 15,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: mobilePushTag }]
    }
};
export const serializeTag = {};
