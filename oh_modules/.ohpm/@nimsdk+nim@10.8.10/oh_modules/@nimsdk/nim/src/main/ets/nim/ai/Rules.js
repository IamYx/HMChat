const aiConfigParamsBase = {
    accountId: {
        type: 'string',
        allowEmpty: false
    },
    content: {
        type: 'object',
        required: false,
        rules: {
            msg: {
                type: 'string',
                allowEmpty: false
            },
            type: {
                type: 'number',
                allowEmpty: false
            }
        }
    },
    messages: {
        type: 'array',
        required: false,
        rules: {
            msg: {
                type: 'string',
                allowEmpty: false
            },
            type: {
                type: 'number'
            },
            role: {
                type: 'enum',
                values: [
                    "assistant",
                    "user",
                    "system"
                ]
            }
        }
    },
    promptVariables: {
        type: 'jsonstr',
        required: false
    },
    modelConfigParams: {
        type: 'object',
        required: false,
        rules: {
            prompt: {
                type: 'string',
                required: false
            },
            maxTokens: {
                type: 'number',
                required: false
            },
            topP: {
                type: 'number',
                required: false
            },
            temperature: {
                type: 'number',
                required: false
            }
        }
    }
};
export const proxyAIModelCallRules = {
    requestId: {
        type: 'string',
        allowEmpty: false
    },
    ...aiConfigParamsBase
};
