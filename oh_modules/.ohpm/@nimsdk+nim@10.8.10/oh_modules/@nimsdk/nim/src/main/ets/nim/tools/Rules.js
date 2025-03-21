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
