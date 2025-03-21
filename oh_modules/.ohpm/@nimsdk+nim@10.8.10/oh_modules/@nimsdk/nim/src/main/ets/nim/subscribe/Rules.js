export const subscribeUserStatusRule = {
    accountIds: {
        type: 'array',
        required: true,
        itemType: 'string',
        min: 1,
        max: 100
    },
    duration: {
        type: 'number',
        required: false,
        min: 60,
        max: 2592000
    },
    immediateSync: {
        type: 'boolean',
        required: false
    }
};
export const unsubscribeUserStatusRule = {
    accountIds: {
        type: 'array',
        required: false,
        itemType: 'string',
        max: 100
    }
};
export const customUserStatusParams = {
    statusType: {
        type: 'number',
        required: true,
        min: 10000,
        max: 2147483647
    },
    duration: {
        type: 'number',
        required: false,
        min: 60,
        max: 604800
    },
    extension: {
        type: 'jsonstr',
        required: false
    },
    onlineOnly: {
        type: 'boolean',
        required: false
    },
    multiSync: {
        type: 'boolean',
        required: false
    }
};
