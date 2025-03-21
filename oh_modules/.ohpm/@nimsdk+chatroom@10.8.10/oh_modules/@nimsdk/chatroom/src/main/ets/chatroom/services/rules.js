export const getInstanceRule = {
    initParams: {
        type: 'object',
        rules: {
            appkey: { type: 'string', allowEmpty: false },
            customClientType: { type: 'number', required: false },
        }
    }
};
