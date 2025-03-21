import { V2NIMProxyRequestMethod } from '@nimsdk/base';
export const httpProxyRule = {
    proxyRequest: {
        type: 'object',
        required: true,
        rules: {
            zone: {
                type: 'string',
                required: false,
            },
            path: {
                type: 'string',
                required: true,
            },
            method: {
                type: 'number',
                required: false,
                min: V2NIMProxyRequestMethod.V2NIM_PROXY_REQUEST_METHOD_GET,
                max: V2NIMProxyRequestMethod.V2NIM_PROXY_REQUEST_METHOD_DELETE,
            },
            header: {
                type: 'string',
                required: false,
            },
            body: {
                type: 'string',
                required: false,
            },
        },
    },
};
