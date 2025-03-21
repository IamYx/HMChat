import { invertSerializeItem } from '../../../parser';
export const serviceName = 'passthroughService';
export let cmdMap = {
    '22_1': 'httpProxy',
    '22_2': 'onSendMsg'
};
export const PassThroughProxyTag = {
    zone: 1,
    path: 2,
    method: 3,
    header: 4,
    body: 5
};
export const PassThroughMsgTag = {
    fromAccid: 1,
    body: 2,
    time: 3
};
export const cmdConfig = {
    httpProxy: {
        sid: 22,
        cid: 1,
        service: serviceName,
        params: [
            { type: 'Property', name: 'tag', reflectMapper: PassThroughProxyTag }
        ],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(PassThroughProxyTag) }]
    },
    onSendMsg: {
        sid: 22,
        cid: 2,
        service: serviceName,
        hasPacketTimer: false,
        response: [
            { type: 'Property', name: 'info', reflectMapper: invertSerializeItem(PassThroughMsgTag) }
        ]
    }
};
export const serializeTag = {
    PassThroughProxyTag: PassThroughProxyTag,
    PassThroughMsgTag: PassThroughMsgTag
};
