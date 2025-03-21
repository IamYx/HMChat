import { getEnumValues, V2NIMMessageType, V2NIMQueryDirection } from '@nimsdk/base';
export const sendMessageRules = {
    message: {
        type: 'object',
        rules: {
            messageClientId: { type: 'string', allowEmpty: false },
            senderId: { type: 'string', allowEmpty: false },
            text: { type: 'string', required: false },
            attachment: {
                type: 'object',
                required: false,
                rules: {
                    file: { type: 'file', required: false }
                }
            }
        },
        required: true
    }
};
const messageConfigRule = {
    readReceiptEnabled: { type: 'boolean', required: false },
    lastMessageUpdateEnabled: { type: 'boolean', required: false },
    historyEnabled: { type: 'boolean', required: false },
    roamingEnabled: { type: 'boolean', required: false },
    onlineSyncEnabled: { type: 'boolean', required: false },
    offlineEnabled: { type: 'boolean', required: false },
    unreadEnabled: { type: 'boolean', required: false }
};
const routeConfigRule = {
    routeEnabled: { type: 'boolean', required: false },
    routeEnvironment: { type: 'string', required: false }
};
const antispamConfigRule = {
    antispamEnabled: { type: 'boolean', required: false },
    antispamBusinessId: { type: 'string', required: false },
    antispamCustomMessage: { type: 'string', required: false },
    antispamCheating: { type: 'string', required: false },
    antispamExtension: { type: 'string', required: false }
};
const locationInfoRule = {
    x: { type: 'number' },
    y: { type: 'number' },
    z: { type: 'number' }
};
export const sendParamsRules = {
    params: {
        type: 'object',
        required: false,
        rules: {
            messageConfig: {
                type: 'object',
                required: false,
                rules: messageConfigRule
            },
            routeConfig: {
                type: 'object',
                required: false,
                rules: routeConfigRule
            },
            antiSpamConfig: {
                type: 'object',
                required: false,
                rules: antispamConfigRule
            },
            receiverIds: { type: 'array', required: false },
            notifyTargetTags: { type: 'string', required: false },
            locationInfo: {
                type: 'object',
                required: false,
                rules: locationInfoRule
            }
        }
    }
};
export const fileMessageRule = {
    sceneName: {
        type: 'string',
        required: false
    },
    name: {
        type: 'string',
        required: false
    }
};
export const audioMessageRule = {
    ...fileMessageRule,
    duration: {
        type: 'number',
        required: false
    }
};
export const videoMessageRule = {
    ...audioMessageRule,
    width: {
        type: 'number',
        required: false
    },
    height: {
        type: 'number',
        required: false
    }
};
export const imageMessageRule = {
    ...fileMessageRule,
    width: {
        type: 'number',
        required: false
    },
    height: {
        type: 'number',
        required: false
    }
};
export const getMessageListRules = {
    option: {
        type: 'object',
        rules: {
            direction: { type: 'enum', values: getEnumValues(V2NIMQueryDirection), required: false },
            messageTypes: { type: 'array', required: false, itemType: 'enum', values: getEnumValues(V2NIMMessageType) },
            beginTime: { type: 'number', min: 0, required: false },
            limit: { type: 'number', min: 1, required: false }
        }
    }
};
export const getMessageListByTagRules = {
    messageOption: {
        type: 'object',
        rules: {
            tags: { type: 'array', min: 1, itemType: 'string' },
            direction: { type: 'enum', values: getEnumValues(V2NIMQueryDirection), required: false },
            messageTypes: { type: 'array', required: false, itemType: 'enum', values: getEnumValues(V2NIMMessageType) },
            beginTime: { type: 'number', min: 0, required: false },
            endTime: { type: 'number', min: 0, required: false },
            limit: { type: 'number', min: 1, required: false }
        },
        required: true
    }
};
