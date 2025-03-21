export const uploadFileParamsRules = {
    taskId: {
        type: 'string', allowEmpty: false, required: true
    },
    uploadParams: {
        type: 'object',
        required: true,
        rules: {
            filePath: {
                type: 'string', allowEmpty: false, required: true
            },
        }
    }
};
export const downloadParamRules = {
    taskId: {
        type: 'string', allowEmpty: false, required: true
    },
    attachment: {
        type: 'object',
        required: true,
        rules: {
            url: {
                type: 'string', allowEmpty: false, required: true
            },
        }
    }
};
export const getThumbOrCoverUrl = {
    _attachment: {
        type: 'object',
        rules: {
            url: {
                type: 'string',
                allowEmpty: false
            }
        }
    },
    thumbSize: {
        type: 'object',
        required: false,
        rules: {
            width: {
                type: 'number',
                required: false,
                min: 0
            },
            height: {
                type: 'number',
                required: false,
                min: 0
            }
        }
    }
};
