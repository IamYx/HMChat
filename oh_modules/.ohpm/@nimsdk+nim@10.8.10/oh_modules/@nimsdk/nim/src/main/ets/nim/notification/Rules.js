export const sendCustomNotificationRule = {
    content: { type: 'string', allowEmpty: false },
    params: {
        type: 'object',
        required: false,
        rules: {
            notificationConfig: {
                type: 'object',
                required: false,
                rules: {
                    offlineEnabled: { type: 'boolean', required: false },
                    unreadEnabled: { type: 'boolean', required: false },
                    clientNotificationId: { type: 'string', required: false }
                }
            },
            pushConfig: {
                type: 'object',
                required: false,
                rules: {
                    pushEnabled: { type: 'boolean', required: false },
                    pushNickEnabled: { type: 'boolean', required: false },
                    pushContent: { type: 'string', required: false },
                    pushPayload: { type: 'string', required: false },
                    forcePush: { type: 'boolean', required: false },
                    forcePushContent: { type: 'string', required: false },
                    forcePushAccounts: {
                        type: 'array',
                        required: false,
                        itemType: 'string'
                    }
                }
            },
            antispamConfig: {
                type: 'object',
                required: false,
                rules: {
                    antispamEnabled: { type: 'boolean', required: false },
                    antispamCustomNotification: { type: 'string', required: false }
                }
            },
            routeConfig: {
                type: 'object',
                required: false,
                rules: {
                    routeEnabled: { type: 'boolean', required: false },
                    routeEnvironment: { type: 'string', required: false }
                }
            }
        }
    }
};
