import { invertSerializeItem } from '../../../../parser';
import { messageTag } from '../../../message/messageTags';
export const serviceName = 'messageService';
export let cmdMap = {
    '30_31': 'v2MessageP2pModify',
    '31_37': 'v2MessageTeamModify',
    '32_38': 'v2MessageSuperTeamModify'
};
export const cmdConfig = {
    v2MessageP2pModify: {
        sid: 30,
        cid: 31,
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
    v2MessageTeamModify: {
        sid: 31,
        cid: 37,
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
    v2MessageSuperTeamModify: {
        sid: 32,
        cid: 38,
        service: serviceName,
        params: [
            {
                type: 'Property',
                name: 'tag',
                reflectMapper: messageTag
            }
        ],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(messageTag) }]
    }
};
