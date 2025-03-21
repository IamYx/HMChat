import { invertSerializeMap } from '../../../parser';
export const serviceName = 'localConversationService';
export let cmdMap = {
    '7_16': 'markSessionAck',
    '7_25': 'markMultSessionsAck',
    '7_116': 'syncMarkSessionAck',
    '21_25': 'markSuperTeamSessionAck',
    '21_32': 'markMultSuperTeamSessionsAck',
    '21_125': 'syncMarkSuperTeamSessionAck',
    '33_12': 'nimAddStickTopSession',
    '33_13': 'nimDeleteStickTopSession',
    '23_112': 'nimMultiSyncAddStickTopSession',
    '23_113': 'nimMultiSyncDeleteStickTopSession'
};
export const serializeTag = {
    sessionAckTag: {
        scene: 1,
        to: 2,
        timetag: 3
    },
    stickTopSessionTag: {
        id: 1,
        ext: 2,
        createTime: {
            id: 3,
            retType: 'number'
        },
        updateTime: {
            id: 4,
            retType: 'number'
        }
    }
};
const deserializeTag = invertSerializeMap(serializeTag);
export const cmdConfig = {
    markSessionAck: {
        sid: 7,
        cid: 16,
        service: serviceName,
        params: [
            { type: 'Byte', name: 'scene' },
            { type: 'String', name: 'to' },
            { type: 'Long', name: 'timetag' }
        ]
    },
    markMultSessionsAck: {
        sid: 7,
        cid: 25,
        service: serviceName,
        ignoreErrCodes: [700],
        params: [{ type: 'PropertyArray', name: 'datas', reflectMapper: serializeTag.sessionAckTag }]
    },
    syncMarkSessionAck: {
        sid: 7,
        cid: 116,
        service: serviceName,
        response: [
            { type: 'Byte', name: 'scene' },
            { type: 'String', name: 'to' },
            { type: 'Long', name: 'timetag' }
        ]
    },
    markSuperTeamSessionAck: {
        sid: 21,
        cid: 25,
        service: serviceName,
        params: [
            { type: 'Long', name: 'to' },
            { type: 'Long', name: 'timetag' }
        ]
    },
    markMultSuperTeamSessionsAck: {
        sid: 21,
        cid: 32,
        service: serviceName,
        ignoreErrCodes: [700],
        params: [{ type: 'PropertyArray', name: 'datas', reflectMapper: serializeTag.sessionAckTag }]
    },
    syncMarkSuperTeamSessionAck: {
        sid: 21,
        cid: 125,
        service: serviceName,
        response: [
            { type: 'Long', name: 'to' },
            { type: 'Long', name: 'timetag' }
        ]
    },
    nimAddStickTopSession: {
        sid: 33,
        cid: 12,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: serializeTag.stickTopSessionTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: deserializeTag.stickTopSessionTag }]
    },
    nimDeleteStickTopSession: {
        sid: 33,
        cid: 13,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: serializeTag.stickTopSessionTag }],
        response: [{ type: 'Long', name: 'timetag' }]
    },
    nimMultiSyncAddStickTopSession: {
        sid: 23,
        cid: 112,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: deserializeTag.stickTopSessionTag }]
    },
    nimMultiSyncDeleteStickTopSession: {
        sid: 23,
        cid: 113,
        service: serviceName,
        response: [
            { type: 'Long', name: 'timetag' },
            { type: 'Property', name: 'data', reflectMapper: deserializeTag.stickTopSessionTag }
        ]
    }
};
