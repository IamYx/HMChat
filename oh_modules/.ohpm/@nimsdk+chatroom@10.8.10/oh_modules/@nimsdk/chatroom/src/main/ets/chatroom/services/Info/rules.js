export const chatroomInfoRule = {
    updateParams: {
        type: 'object',
        allowEmpty: false,
        rules: {
            roomName: { type: 'string', required: false, allowEmpty: false },
            announcement: { type: 'string', required: false },
            liveUrl: { type: 'string', required: false },
            serverExtension: { type: 'string', required: false },
            notificationEnabled: { type: 'boolean', required: false },
            notificationExtension: { type: 'string', required: false }
        }
    },
    antispamConfig: {
        type: 'object',
        required: false,
        rules: {
            antispamBusinessId: { type: 'string', required: false }
        }
    }
};
export const locationRule = {
    locationInfo: {
        type: 'object',
        rules: {
            x: { type: 'number' },
            y: { type: 'number' },
            z: { type: 'number' }
        }
    },
    distance: { type: 'number' }
};
export const chatroomTagUpdateRule = {
    updateTagParams: {
        type: 'object',
        allowEmpty: false,
        rules: {
            tags: { type: 'array', required: false, itemType: 'string' },
            notifyTargetTags: { type: 'string', required: false },
            notificationEnabled: { type: 'boolean', required: false },
            notificationExtension: { type: 'string', required: false }
        }
    }
};
export const setTempChatBannedByTagRule = {
    targetTag: { type: 'string', required: true, allowEmpty: false },
    notifyTargetTags: { type: 'string', required: false },
    duration: { type: 'number', required: false },
    notificationEnabled: { type: 'boolean', required: false },
    notificationExtension: { type: 'string', required: false }
};
