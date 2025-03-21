import { invertSerializeItem } from '../../../parser';
import { messageTag, systemMsgTag } from '../../message/messageTags';
import { clearHistoryMessageTag, deleteMessageTag } from './delete/ParserMap';
export const serviceName = 'messageService';
export let cmdMap = {
    '30_1': 'v2SendP2pMessage',
    '31_2': 'v2SendTeamMessage',
    '32_2': 'v2SendSuperTeamMessage',
    '7_2': 'onMsg',
    '8_3': 'onMsg',
    '7_101': 'onMsg',
    '8_102': 'onMsg',
    '21_3': 'onMsg',
    '21_102': 'onMsg',
    '30_13': 'v2RevokeMessage',
    '32_17': 'v2RevokeSuperTeamMessage',
    '7_14': 'onRevokeMessage',
    '21_18': 'onRevokeMessage',
    '21_117': 'onRevokeMessage',
    '4_5': 'v2BatchMarkRead'
};
export const messageTagInverted = invertSerializeItem(messageTag);
export const cmdConfig = {
    v2SendP2pMessage: {
        sid: 30,
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
    onMsg: {
        sid: 7,
        cid: 2,
        service: serviceName,
        response: [{ type: 'Property', name: 'msg', reflectMapper: invertSerializeItem(messageTag) }]
    },
    v2SendTeamMessage: {
        sid: 31,
        cid: 2,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: messageTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(messageTag) }]
    },
    v2SendSuperTeamMessage: {
        sid: 32,
        cid: 2,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: messageTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(messageTag) }]
    },
    onRevokeMessage: {
        sid: 7,
        cid: 14,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(systemMsgTag) }]
    },
    v2BatchMarkRead: {
        sid: 4,
        cid: 5,
        service: serviceName,
        hasPacketResponse: false,
        params: [
            { type: 'Byte', name: 'sid' },
            { type: 'Byte', name: 'cid' },
            { type: 'LongArray', name: 'ids' }
        ]
    }
};
export const serializeTag = {
    messageTag: messageTag,
    systemMsgTag: systemMsgTag,
    deleteMessageTag: deleteMessageTag,
    clearHistoryMessageTag: clearHistoryMessageTag
};
