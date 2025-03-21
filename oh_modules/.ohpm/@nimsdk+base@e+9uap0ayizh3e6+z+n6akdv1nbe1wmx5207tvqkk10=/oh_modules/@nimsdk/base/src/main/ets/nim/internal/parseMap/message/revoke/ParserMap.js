import { systemMsgTag } from '../../../message/messageTags';
export const serviceName = 'messageService';
export let cmdMap = {
    '30_13': 'v2RevokeMessage',
    '32_17': 'v2RevokeSuperTeamMessage'
};
export const cmdConfig = {
    v2RevokeMessage: {
        sid: 30,
        cid: 13,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: systemMsgTag }]
    },
    v2RevokeSuperTeamMessage: {
        sid: 32,
        cid: 17,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: systemMsgTag }]
    }
};
