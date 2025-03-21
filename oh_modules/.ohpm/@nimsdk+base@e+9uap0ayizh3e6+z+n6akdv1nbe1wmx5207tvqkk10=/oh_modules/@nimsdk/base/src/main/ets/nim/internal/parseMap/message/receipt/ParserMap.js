import { invertSerializeItem } from '../../../../parser';
import { messageTag } from '../../../message/messageTags';
export const serviceName = 'messageService';
export const teamMsgReceiptTag = {
    receiverId: 0,
    messageServerId: 1,
    readCount: {
        id: 100,
        retType: 'number'
    },
    unreadCount: {
        id: 101,
        retType: 'number'
    },
    messageClientId: 102,
    latestReadAccount: 103
};
export let cmdMap = {
    '30_11': 'v2SendP2PMessageReceipt',
    '31_28': 'v2SendTeamMessageReceipts',
    '7_12': 'onP2PMessageReceipts',
    '8_31': 'onTeamMessageReceipts',
    '31_29': 'v2GetTeamMessageReceipts',
    '31_30': 'v2GetTeamMessageReceiptDetail'
};
export const cmdConfig = {
    v2SendP2PMessageReceipt: {
        sid: 30,
        cid: 11,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: messageTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(messageTag) }]
    },
    v2SendTeamMessageReceipts: {
        sid: 31,
        cid: 28,
        service: serviceName,
        params: [{ type: 'PropertyArray', name: 'tag', reflectMapper: teamMsgReceiptTag }],
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(teamMsgReceiptTag) }]
    },
    onP2PMessageReceipts: {
        sid: 7,
        cid: 12,
        service: serviceName,
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(messageTag) }]
    },
    onTeamMessageReceipts: {
        sid: 8,
        cid: 31,
        service: serviceName,
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(teamMsgReceiptTag) }]
    },
    v2GetTeamMessageReceipts: {
        sid: 31,
        cid: 29,
        service: serviceName,
        params: [
            {
                type: 'PropertyArray',
                name: 'tag',
                reflectMapper: teamMsgReceiptTag
            }
        ],
        response: [{ type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(teamMsgReceiptTag) }]
    },
    v2GetTeamMessageReceiptDetail: {
        sid: 31,
        cid: 30,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: teamMsgReceiptTag,
                select: ['receiverId', 'messageServerId']
            }
        ],
        response: [
            { type: 'Property', name: 'data', reflectMapper: invertSerializeItem(teamMsgReceiptTag) },
            {
                type: 'StrArray',
                name: 'readAccountList'
            },
            {
                type: 'StrArray',
                name: 'unreadAccountList'
            }
        ]
    }
};
