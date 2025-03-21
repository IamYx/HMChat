import { boolToInt, invertSerializeItem } from '../../../parser';
export const serviceName = 'signallingService';
export const cmdMap = {
    '18_1': 'signallingCreate',
    '18_2': 'signalingDelay',
    '18_3': 'signalingClose',
    '18_4': 'signalingJoin',
    '18_5': 'signalingLeave',
    '18_6': 'signalingInvite',
    '18_7': 'signalingCancelInvite',
    '18_8': 'signalingRejectInvite',
    '18_9': 'signalingAcceptInvite',
    '18_10': 'signalingSendCustomCommand',
    '15_11': 'signalingRecvEvent',
    '15_12': 'signalingMultiSyncEvent',
    '15_13': 'signalingSyncEvent',
    '15_14': 'signalingSyncChannels',
    '18_15': 'signalingGetRoomInfo',
    '18_16': 'signalingCallEx',
    '18_17': 'signalingJoinAndAccept'
};
export const createParamsTag = {
    type: 1,
    channelName: 2,
    ext: 7
};
export const createResponseTag = {
    type: 1,
    channelName: 2,
    channelId: 3,
    channelCreateTime: 4,
    channelExpireTime: 5,
    creator: 6,
    ext: 7,
    channelValid: {
        id: 8,
        retDef: true,
        retConverter(m8) {
            if (parseInt(m8) === 1)
                return false;
            return true;
        }
    },
    rtcTokenTtl: 26,
    rtcToken: 27,
    rtcJoinRoomResponse: 29,
    callStatus: {
        id: 30,
        retType: 'number'
    }
};
export const delayParamsTag = {
    channelId: 3
};
export const delayResponseTag = {
    type: 1,
    channelName: 2,
    channelId: 3,
    channelCreateTime: 4,
    channelExpireTime: 5,
    creator: 6,
    members: 18,
    ext: 7,
    channelValid: {
        id: 8,
        retDef: true,
        retConverter(l8) {
            if (parseInt(l8) === 1)
                return false;
            return true;
        }
    },
    rtcTokenTtl: 26,
    rtcToken: 27,
    rtcJoinRoomResponse: 29,
    callStatus: {
        id: 30,
        retType: 'number'
    }
};
export const closeParamsTag = {
    channelId: 3,
    isSave: {
        id: 21,
        converter: boolToInt
    },
    attachExt: 20
};
export const joinParamsTag = {
    channelId: 3,
    attachExt: 20,
    isSave: {
        id: 21,
        converter: boolToInt
    },
    uid: 23,
    rtcChannelName: 25,
    rtcTokenTtl: 26,
    rtcJoinRoomQueryParamMap: 28
};
export const joinResponseTag = {
    type: 1,
    channelName: 2,
    channelId: 3,
    channelCreateTime: 4,
    channelExpireTime: 5,
    creator: 6,
    ext: 7,
    channelValid: {
        id: 8,
        retDef: true,
        retConverter(k8) {
            if (parseInt(k8) === 1)
                return false;
            return true;
        }
    },
    members: 18,
    rtcTokenTtl: 26,
    rtcToken: 27,
    rtcJoinRoomResponse: 29,
    callStatus: {
        id: 30,
        retType: 'number'
    }
};
export const leaveParamsTag = {
    channelId: 3,
    attachExt: 20,
    isSave: {
        id: 21,
        converter: boolToInt
    }
};
export const inviteParamsTag = {
    channelId: 3,
    to: 11,
    requestId: 12,
    needPush: {
        id: 13,
        converter: boolToInt
    },
    pushTitle: 14,
    pushContent: 15,
    pushPayload: 16,
    needBadge: {
        id: 17,
        converter: boolToInt
    },
    attachExt: 20,
    isSave: {
        id: 21,
        converter: boolToInt
    }
};
export const cancelInviteParamsTag = {
    channelId: 3,
    to: 11,
    requestId: 12,
    attachExt: 20,
    isSave: {
        id: 21,
        converter: boolToInt
    }
};
export const rejectParamsTag = {
    channelId: 3,
    to: 11,
    requestId: 12,
    attachExt: 20,
    isSave: {
        id: 21,
        converter: boolToInt
    }
};
export const acceptParamsTag = {
    channelId: 3,
    to: 11,
    requestId: 12,
    attachExt: 20,
    isSave: {
        id: 21,
        converter: boolToInt
    }
};
export const ctrlParamsTag = {
    channelId: 3,
    to: 11,
    attachExt: 20
};
export const getChannelInfoParamsTag = {
    channelName: 2
};
export const getChannelInfoResponseTag = {
    type: 1,
    channelName: 2,
    channelId: 3,
    channelCreateTime: 4,
    channelExpireTime: 5,
    creator: 6,
    members: 18,
    ext: 7,
    channelValid: {
        id: 8,
        retDef: true,
        retConverter(j8) {
            if (parseInt(j8) === 1)
                return false;
            return true;
        }
    },
    rtcTokenTtl: 26,
    rtcToken: 27,
    rtcJoinRoomResponse: 29,
    callStatus: {
        id: 30,
        retType: 'number'
    }
};
export const callParamsTag = {
    type: 1,
    channelName: 2,
    ext: 7,
    to: 11,
    requestId: 12,
    needPush: {
        id: 13,
        converter: boolToInt
    },
    pushTitle: 14,
    pushContent: 15,
    pushPayload: 16,
    needBadge: {
        id: 17,
        converter: boolToInt
    },
    attachExt: 20,
    isSave: {
        id: 21,
        converter: boolToInt
    },
    uid: 23,
    rtcChannelName: 25,
    rtcTokenTtl: 26,
    rtcJoinRoomQueryParamMap: 28
};
export const callResponseTag = {
    type: 1,
    channelName: 2,
    channelId: 3,
    channelCreateTime: 4,
    channelExpireTime: 5,
    creator: 6,
    ext: 7,
    channelValid: {
        id: 8,
        retDef: true,
        retConverter(i8) {
            if (parseInt(i8) === 1)
                return false;
            return true;
        }
    },
    members: 18,
    rtcTokenTtl: 26,
    rtcToken: 27,
    rtcJoinRoomResponse: 29,
    callStatus: {
        id: 30,
        retType: 'number'
    }
};
export const joinAndAcceptParamsTag = {
    channelId: 3,
    attachExt: 20,
    isSave: {
        id: 21,
        converter: boolToInt
    },
    uid: 23,
    to: 11,
    requestId: 12,
    rtcChannelName: 25,
    rtcTokenTtl: 26,
    rtcJoinRoomQueryParamMap: 28
};
export const joinAndAcceptResponseTag = {
    type: 1,
    channelName: 2,
    channelId: 3,
    channelCreateTime: 4,
    channelExpireTime: 5,
    creator: 6,
    ext: 7,
    channelValid: {
        id: 8,
        retDef: true,
        retConverter(h8) {
            if (parseInt(h8) === 1)
                return false;
            return true;
        }
    },
    members: 18,
    rtcTokenTtl: 26,
    rtcToken: 27,
    rtcJoinRoomResponse: 29,
    callStatus: {
        id: 30,
        retType: 'number'
    }
};
const avSignalTag = {
    channelType: {
        id: 1,
        access: 'channelInfo.channelType',
        retType: 'number'
    },
    channelName: {
        id: 2,
        access: 'channelInfo.channelName'
    },
    channelId: {
        id: 3,
        access: 'channelInfo.channelId'
    },
    createTime: {
        id: 4,
        access: 'channelInfo.createTime',
        retType: 'number'
    },
    expireTime: {
        id: 5,
        access: 'channelInfo.expireTime',
        retType: 'number'
    },
    creatorAccountId: {
        id: 6,
        access: 'channelInfo.creatorAccountId'
    },
    channelExtension: {
        id: 7,
        access: 'channelInfo.channelExtension'
    },
    channelValid: {
        id: 8,
        retDef: true,
        retAccess: 'channelInfo.channelValid',
        retConverter(g8) {
            if (parseInt(g8) === 1)
                return false;
            return true;
        }
    },
    inviterAccountId: 10,
    inviteeAccountId: 11,
    requestId: 12,
    pushEnabled: {
        id: 13,
        retType: 'boolean',
        access: 'pushConfig.pushEnabled'
    },
    pushTitle: {
        id: 14,
        access: 'pushConfig.pushTitle'
    },
    pushContent: {
        id: 15,
        access: 'pushConfig.pushContent'
    },
    pushPayload: {
        id: 16,
        access: 'pushConfig.pushPayload'
    },
    unreadEnabled: {
        id: 17,
        retType: 'boolean'
    },
    members: 18,
    attach: {
        id: 19,
        retConverter: (e8) => {
            try {
                const f8 = JSON.parse(e8);
                return f8;
            }
            catch {
                return {
                    raw: e8
                };
            }
        }
    },
    serverExtension: 20,
    offlineEnabled: {
        id: 21,
        retType: 'boolean'
    },
    msgId: 22,
    selfUid: 23,
    time: 24,
    rtcChannelName: 25,
    rtcTokenTtl: 26,
    rtcToken: 27,
    rtcJoinRoomQueryParamMap: 28,
    rtcJoinRoomResponse: 29,
    callStatus: {
        id: 30,
        retType: 'number'
    }
};
export const cmdConfig = {
    signallingCreate: {
        sid: 18,
        cid: 1,
        service: 'signallingService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: createParamsTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(createResponseTag) }]
    },
    signalingDelay: {
        sid: 18,
        cid: 2,
        service: 'signallingService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: delayParamsTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(delayResponseTag) }]
    },
    signalingClose: {
        sid: 18,
        cid: 3,
        service: 'signallingService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: closeParamsTag }]
    },
    signalingJoin: {
        sid: 18,
        cid: 4,
        service: 'signallingService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: joinParamsTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(joinResponseTag) }]
    },
    signalingLeave: {
        sid: 18,
        cid: 5,
        service: 'signallingService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: leaveParamsTag }]
    },
    signalingInvite: {
        sid: 18,
        cid: 6,
        service: 'signallingService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: inviteParamsTag }]
    },
    signalingCancelInvite: {
        sid: 18,
        cid: 7,
        service: 'signallingService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: cancelInviteParamsTag }]
    },
    signalingRejectInvite: {
        sid: 18,
        cid: 8,
        service: 'signallingService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: rejectParamsTag }]
    },
    signalingAcceptInvite: {
        sid: 18,
        cid: 9,
        service: 'signallingService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: acceptParamsTag }]
    },
    signalingSendCustomCommand: {
        sid: 18,
        cid: 10,
        service: 'signallingService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: ctrlParamsTag }]
    },
    signalingRecvEvent: {
        sid: 15,
        cid: 11,
        service: 'signallingService',
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(avSignalTag) }]
    },
    signalingMultiSyncEvent: {
        sid: 15,
        cid: 12,
        service: 'signallingService',
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(avSignalTag) }]
    },
    signalingSyncEvent: {
        sid: 15,
        cid: 13,
        service: 'signallingService',
        response: [{ type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(avSignalTag) }]
    },
    signalingSyncChannels: {
        sid: 15,
        cid: 14,
        service: 'signallingService',
        response: [{ type: 'PropertyArray', name: 'datas', reflectMapper: invertSerializeItem(avSignalTag) }]
    },
    signalingGetRoomInfo: {
        sid: 18,
        cid: 15,
        service: 'signallingService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: getChannelInfoParamsTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(getChannelInfoResponseTag) }]
    },
    signalingCallEx: {
        sid: 18,
        cid: 16,
        service: 'signallingService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: callParamsTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(callResponseTag) }]
    },
    signalingJoinAndAccept: {
        sid: 18,
        cid: 17,
        service: 'signallingService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: joinAndAcceptParamsTag }],
        response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(joinAndAcceptResponseTag) }]
    },
    signalingBatchMarkRead: {
        sid: 4,
        cid: 5,
        hasPacketResponse: false,
        service: 'signallingService',
        params: [
            { type: 'Byte', name: 'sid' },
            { type: 'Byte', name: 'cid' },
            { type: 'LongArray', name: 'ids' }
        ]
    }
};
export const serializeTag = {};
