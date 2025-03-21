import { invertSerializeItem } from '../../../parser';
import { messageTag } from '../../message/messageTags';
import { sysMsgTag } from '../notification/parserMap';
export const serviceName = 'ysfService';
export const cmdMap = {
    '4_5': 'ysfBatchMarkRead',
    '101_1': 'ysfSendMessage',
    '101_2': 'ysfOnMsg',
    '101_3': 'ysfOnSysNotification',
    '101_7': 'ysfSendCustomNotification'
};
export const cmdConfig = {
    ysfBatchMarkRead: {
        sid: 4,
        cid: 5,
        service: serviceName,
        hasPacketResponse: false,
        params: [
            { type: 'Byte', name: 'sid' },
            { type: 'Byte', name: 'cid' },
            { type: 'LongArray', name: 'ids' }
        ]
    },
    ysfSendMessage: {
        sid: 101,
        cid: 1,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: messageTag
            }
        ],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(messageTag) }]
    },
    ysfOnMsg: {
        sid: 101,
        cid: 2,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(messageTag) }]
    },
    ysfOnSysNotification: {
        sid: 101,
        cid: 3,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(sysMsgTag) }]
    },
    ysfSendCustomNotification: {
        sid: 101,
        cid: 7,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: sysMsgTag }]
    }
};
