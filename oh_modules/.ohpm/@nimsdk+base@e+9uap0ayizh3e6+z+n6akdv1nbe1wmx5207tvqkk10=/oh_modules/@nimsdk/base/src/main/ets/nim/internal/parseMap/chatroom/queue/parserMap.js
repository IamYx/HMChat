const serviceName = 'queueService';
export const cmdMap = {
    '36_20': 'v2ChatroomQueueOffer',
    '36_21': 'v2ChatroomQueuePoll',
    '36_22': 'v2ChatroomQueueList',
    '36_23': 'v2ChatroomQueuePeek',
    '36_24': 'v2ChatroomQueueDrop',
    '36_25': 'v2ChatroomQueueInit',
    '36_26': 'v2ChatroomQueueBatchUpdate'
};
export const cmdConfig = {
    v2ChatroomQueueOffer: {
        sid: 36,
        cid: 20,
        service: serviceName,
        params: [
            { type: 'String', name: 'elementKey' },
            { type: 'String', name: 'elementValue' },
            { type: 'Bool', name: 'transient' },
            { type: 'String', name: 'elementOwnerAccountId' }
        ]
    },
    v2ChatroomQueuePoll: {
        sid: 36,
        cid: 21,
        service: serviceName,
        params: [{ type: 'String', name: 'elementKey' }],
        response: [
            { type: 'String', name: 'elementKey' },
            { type: 'String', name: 'elementValue' }
        ]
    },
    v2ChatroomQueueList: {
        sid: 36,
        cid: 22,
        service: serviceName,
        params: [],
        response: [{ type: 'KVArray', name: 'datas' }]
    },
    v2ChatroomQueuePeek: {
        sid: 36,
        cid: 23,
        service: serviceName,
        params: [],
        response: [
            { type: 'String', name: 'elementKey' },
            { type: 'String', name: 'elementValue' }
        ]
    },
    v2ChatroomQueueDrop: {
        sid: 36,
        cid: 24,
        service: serviceName,
        params: []
    },
    v2ChatroomQueueInit: {
        sid: 36,
        cid: 25,
        service: serviceName,
        params: [{ type: 'Int', name: 'size' }]
    },
    v2ChatroomQueueBatchUpdate: {
        sid: 36,
        cid: 26,
        service: serviceName,
        params: [
            { type: 'StrStrMap', name: 'keyValues' },
            { type: 'Bool', name: 'notificationEnabled' },
            { type: 'String', name: 'notificationExtension' }
        ],
        response: [{ type: 'StrArray', name: 'datas' }]
    }
};
export const serializeTag = {};
