export const queueOfferRule = {
    elementKey: { type: 'string', required: true, allowEmpty: false },
    elementValue: { type: 'string', required: true, allowEmpty: false },
    transient: { type: 'boolean', required: false },
    elementOwnerAccountId: { type: 'string', required: false, allowEmpty: false }
};
export const queueBatchUpdateRule = {
    elements: {
        type: 'array',
        min: 1,
        max: 100,
        rules: {
            key: {
                type: 'string',
                required: true,
                allowEmpty: false
            },
            value: {
                type: 'string',
                required: true,
                allowEmpty: false
            }
        },
        required: true
    },
    notificationEnabled: { type: 'boolean', required: false },
    notificationExtension: { type: 'string', required: false }
};
