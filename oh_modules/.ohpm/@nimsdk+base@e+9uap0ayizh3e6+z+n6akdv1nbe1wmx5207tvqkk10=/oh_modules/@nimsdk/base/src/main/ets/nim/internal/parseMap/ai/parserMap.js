import { camelCase } from '@nimsdk/vendor';
import { boolToInt, invertSerializeItem, objectToJSONString, stringToJSONObject } from '../../../parser';
const serviceName = 'aiService';
export const cmdMap = {
    '4_26': 'v2AIChatNotify',
    '29_35': 'v2AIProxyModelCall',
    '29_36': 'v2AIGetUserList'
};
const aiAgentChatReqTag = {
    accountId: 1,
    messages: {
        id: 2,
        converter: objectToJSONString,
        retConverter: stringToJSONObject
    },
    requestId: 3,
    content: {
        id: 4,
        converter: objectToJSONString,
        retConverter: stringToJSONObject
    },
    promptVariables: 5,
    modelConfigParams: {
        id: 6,
        converter: objectToJSONString,
        retConverter: stringToJSONObject
    },
    antispamBusinessId: 7,
    antispamEnabled: {
        id: 8,
        converter: boolToInt
    }
};
const aiAccountTag = {
    accountId: 1,
    name: 3,
    avatar: 4,
    sign: 5,
    gender: {
        id: 6,
        retType: 'number'
    },
    email: 7,
    birthday: 8,
    mobile: 9,
    serverExtension: 10,
    modelType: {
        id: 11,
        retType: 'number'
    },
    modelConfig: {
        id: 12,
        retConverter: (v6) => {
            v6 = stringToJSONObject(v6);
            if (!v6) {
                return;
            }
            const w6 = Object.keys(v6);
            const x6 = w6.reduce((z6, a7) => {
                const b7 = camelCase(a7);
                z6[b7] = v6[a7];
                return z6;
            }, {});
            if (typeof x6.promptKeys === 'string') {
                try {
                    x6.promptKeys = JSON.parse(x6.promptKeys);
                }
                catch (y6) {
                }
            }
            return x6;
        }
    },
    yunxinConfig: {
        id: 13,
        retConverter: (u6) => {
            u6 = stringToJSONObject(u6);
            if (u6)
                return u6;
        }
    },
    valid: {
        id: 14,
        retType: 'boolean'
    },
    createTime: {
        id: 15,
        retType: 'number'
    },
    updateTime: {
        id: 16,
        retType: 'number'
    }
};
const pageQueryTag = {
    hasMore: {
        id: 16,
        retType: 'boolean'
    },
    nextToken: 2
};
const aiAgentChatRespTag = {
    code: {
        id: 1,
        retType: 'number'
    },
    accountId: 2,
    requestId: 3,
    content: {
        id: 4,
        retConverter: stringToJSONObject
    }
};
export const cmdConfig = {
    v2AIChatNotify: {
        sid: 4,
        cid: 26,
        service: serviceName,
        response: [
            {
                type: 'Property',
                name: 'data',
                reflectMapper: invertSerializeItem(aiAgentChatRespTag)
            }
        ]
    },
    v2AIProxyModelCall: {
        sid: 29,
        cid: 35,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: aiAgentChatReqTag
            }
        ]
    },
    v2AIGetUserList: {
        sid: 29,
        cid: 36,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: {
                    pageToken: 1,
                    limit: 2
                }
            }
        ],
        response: [
            { type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(aiAccountTag) },
            { type: 'Property', name: 'queryTag', reflectMapper: invertSerializeItem(pageQueryTag) }
        ]
    }
};
