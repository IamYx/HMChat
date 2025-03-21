import { invertSerializeItem } from '../../../../parser';
export const serviceName = 'messageService';
export let cmdMap = {
    '33_8': 'v2AddCollection',
    '33_9': 'v2RemoveCollections',
    '33_10': 'v2UpdateCollectionExtension',
    '33_11': 'v2GetCollectionListByOption'
};
export const collectionTag = {
    collectionId: 1,
    collectionType: {
        id: 2,
        retType: 'number'
    },
    collectionData: 3,
    serverExtension: 4,
    uniqueId: 5,
    createTime: {
        id: 6,
        retType: 'number'
    },
    updateTime: {
        id: 7,
        retType: 'number'
    }
};
export const collectionQueryTag = {
    beginTime: 1,
    endTime: 2,
    excludeId: 3,
    limit: 4,
    direction: 5,
    collectionType: 6
};
export const cmdConfig = {
    v2AddCollection: {
        sid: 33,
        cid: 8,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: collectionTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(collectionTag) }]
    },
    v2RemoveCollections: {
        sid: 33,
        cid: 9,
        service: serviceName,
        params: [{ type: 'PropertyArray', name: 'tag', reflectMapper: collectionTag, select: ['collectionId', 'createTime'] }],
        response: [{ type: 'Int', name: 'data' }]
    },
    v2UpdateCollectionExtension: {
        sid: 33,
        cid: 10,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: collectionTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(collectionTag) }]
    },
    v2GetCollectionListByOption: {
        sid: 33,
        cid: 11,
        service: serviceName,
        params: [{ type: 'Property', name: 'tag', reflectMapper: collectionQueryTag }],
        response: [
            { type: 'Long', name: 'total' },
            { type: 'PropertyArray', name: 'data', reflectMapper: invertSerializeItem(collectionTag) }
        ]
    }
};
