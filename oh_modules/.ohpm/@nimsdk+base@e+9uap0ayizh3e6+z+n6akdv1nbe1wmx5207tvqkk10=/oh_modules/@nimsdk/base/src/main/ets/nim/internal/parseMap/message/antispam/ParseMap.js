import { invertSerializeItem } from '../../../../parser';
const serviceName = 'clientAntispamUtil';
export const cmdMap = {
    '6_17': 'LocalAntispamSync'
};
const clientAntiSpamTag = {
    version: 1,
    md5: 2,
    url: 3
};
export const cmdConfig = {
    LocalAntispamSync: {
        sid: 6,
        cid: 17,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: clientAntiSpamTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(clientAntiSpamTag) }]
    }
};
