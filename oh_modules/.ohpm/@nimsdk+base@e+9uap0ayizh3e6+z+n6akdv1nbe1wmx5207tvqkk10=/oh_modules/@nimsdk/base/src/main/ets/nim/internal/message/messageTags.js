import { get } from '@nimsdk/vendor';
import { boolToInt, objectToJSONString, stringToJSONObject, invertSerializeItem } from '../../parser';
import { V2NIMConversationType } from '../../sdk/V2NIMConversationService';
import { V2NIMMessageType } from '../../sdk/V2NIMMessageService';
export const systemMsgTag = {
    createTime: {
        id: 0,
        retType: 'number'
    },
    sysMsgType: {
        id: 1,
        retType: 'number'
    },
    receiverId: 2,
    senderId: 3,
    postscript: 4,
    attach: 5,
    pushContent: 8,
    pushPayload: 9,
    messageClientId: 10,
    messageServerId: 11,
    deleteMsgCreatetime: {
        id: 14,
        retType: 'number'
    },
    opeAccount: 16,
    env: 21,
    callbackExtension: 22
};
export const messageRouteTag = {
    routeEnvironment: {
        id: 43,
        access: 'routeEnvironment'
    },
    routeEnabled: {
        id: 105,
        access: 'routeEnabled',
        converter: boolToInt,
        retType: 'boolean'
    }
};
export const threadReplyTag = {
    threadReplySenderId: {
        id: 29,
        access: 'senderId'
    },
    threadReplyReceiverId: {
        id: 30,
        access: 'receiverId'
    },
    threadReplyTime: {
        id: 31,
        access: 'createTime',
        retType: 'number'
    },
    threadReplyServerId: {
        id: 32,
        access: 'messageServerId'
    },
    threadReplyClientId: {
        id: 33,
        access: 'messageClientId'
    }
};
export const threadRootTag = {
    threadRootSenderId: {
        id: 34,
        access: 'senderId'
    },
    threadRootReceiverId: {
        id: 35,
        access: 'receiverId'
    },
    threadRootTime: {
        id: 36,
        access: 'createTime',
        retType: 'number'
    },
    threadRootClientId: {
        id: 37,
        access: 'messageClientId'
    },
    threadRootServerId: {
        id: 38,
        access: 'messageServerId'
    }
};
export const robotConfigTag = {
    function: {
        id: 47,
        access: 'function'
    },
    topic: {
        id: 48,
        access: 'topic'
    },
    customContent: {
        id: 49,
        access: 'customContent'
    },
    accountId: {
        id: 50,
        access: 'accountId'
    }
};
export const antispamConfigTag = {
    antispamBusinessId: {
        id: 23,
        access: 'antispamBusinessId'
    }
};
export const messageConfigTag = {
    needAck: {
        id: 26,
        access: 'readReceiptEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    conversationUpdateEnabled: {
        id: 28,
        access: 'conversationUpdateEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    historyEnabled: {
        id: 100,
        access: 'historyEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    roamingEnabled: {
        id: 101,
        access: 'roamingEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    onlineSyncEnabled: {
        id: 102,
        access: 'onlineSyncEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    offlineEnabled: {
        id: 108,
        access: 'offlineEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    unreadEnabled: {
        id: 109,
        access: 'unreadEnabled',
        converter: boolToInt,
        retType: 'boolean'
    }
};
export const messageTag = {
    conversationType: {
        id: 0,
        converter: conversationTypeV2ToV1,
        retConverter: conversationTypeV1ToV2
    },
    receiverId: 1,
    senderId: 2,
    fromClientType: 4,
    fromDeviceId: 5,
    fromNick: 6,
    createTime: {
        id: 7,
        retType: 'number'
    },
    messageType: {
        id: 8,
        retType: 'number'
    },
    text: 9,
    attachment: {
        id: 10,
        converter: (j6, k6) => {
            return attachmentToRaw(k6.messageType, j6);
        },
        retConverter: (g6, h6) => {
            const i6 = Number(h6['8']);
            return rawToAttachment(g6, i6);
        }
    },
    messageClientId: 11,
    messageServerId: 12,
    resend: {
        id: 13,
        converter: boolToInt,
        retType: 'boolean'
    },
    userUpdateTime: {
        id: 14,
        retType: 'number'
    },
    serverExtension: 15,
    pushPayload: {
        id: 16,
        access: 'pushConfig.pushPayload'
    },
    pushContent: {
        id: 17,
        access: 'pushConfig.pushContent'
    },
    forcePushAccountIds: {
        id: 18,
        access: 'pushConfig.forcePushAccountIds',
        def: (f6) => {
            if (typeof f6['pushConfig.forcePushAccountIds'] === 'undefined') {
                return '#%@all@%#';
            }
        },
        converter: (d6, e6) => {
            if (e6['pushConfig.forcePushAccountIds'] || typeof e6['pushConfig.forcePushAccountIds'] === 'undefined') {
                if (d6.length === 0) {
                    return '#%@all@%#';
                }
                try {
                    return JSON.stringify(d6);
                }
                catch {
                    return '#%@all@%#';
                }
            }
        },
        retConverter(c6) {
            if (c6 === '#%@all@%#') {
                return undefined;
            }
            else if (c6) {
                try {
                    return JSON.parse(c6);
                }
                catch {
                    return [];
                }
            }
        }
    },
    forcePushContent: {
        id: 19,
        access: 'pushConfig.forcePushContent'
    },
    forcePush: {
        id: 20,
        access: 'pushConfig.forcePush',
        converter: boolToInt,
        retType: 'boolean'
    },
    antispamCustomMessageEnabled: {
        id: 21,
        def: (b6) => {
            return get(b6, 'antispamConfig.antispamCustomMessage') ? 1 : 0;
        },
        retConverter: () => undefined
    },
    antispamCustomMessage: {
        id: 22,
        access: 'antispamConfig.antispamCustomMessage'
    },
    antispamBusinessId: {
        id: 23,
        access: 'antispamConfig.antispamBusinessId'
    },
    clientAntispamHit: {
        id: 24,
        access: 'clientAntispamHit',
        converter: boolToInt,
        retType: 'boolean'
    },
    antispamEnabled: {
        id: 25,
        access: 'antispamConfig.antispamEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    needAck: {
        id: 26,
        access: 'messageConfig.readReceiptEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    lastMessageUpdateEnabled: {
        id: 28,
        access: 'messageConfig.lastMessageUpdateEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    threadReplySenderId: {
        id: 29,
        access: 'threadReply.senderId'
    },
    threadReplyReceiverId: {
        id: 30,
        access: 'threadReply.receiverId'
    },
    threadReplyTime: {
        id: 31,
        access: 'threadReply.createTime',
        retType: 'number'
    },
    threadReplyServerId: {
        id: 32,
        access: 'threadReply.messageServerId'
    },
    threadReplyClientId: {
        id: 33,
        access: 'threadReply.messageClientId'
    },
    threadRootSenderId: {
        id: 34,
        access: 'threadRoot.senderId'
    },
    threadRootReceiverId: {
        id: 35,
        access: 'threadRoot.receiverId'
    },
    threadRootTime: {
        id: 36,
        access: 'threadRoot.createTime',
        retType: 'number'
    },
    threadRootServerId: {
        id: 37,
        access: 'threadRoot.messageServerId'
    },
    threadRootClientId: {
        id: 38,
        access: 'threadRoot.messageClientId'
    },
    callbackExtension: 40,
    subType: {
        id: 41,
        retType: 'number'
    },
    antispamCheating: {
        id: 42,
        access: 'antispamConfig.antispamCheating'
    },
    routeEnvironment: {
        id: 43,
        access: 'routeConfig.routeEnvironment'
    },
    antispamExtension: {
        id: 44,
        access: 'antispamConfig.antispamExtension'
    },
    antispamResult: 45,
    __clientExt: {
        id: 46,
        converter: objectToJSONString,
        retConverter: stringToJSONObject
    },
    robotFunction: {
        id: 47,
        access: 'robotConfig.function'
    },
    robotTopic: {
        id: 48,
        access: 'robotConfig.topic'
    },
    robotCustomContent: {
        id: 49,
        access: 'robotConfig.customContent'
    },
    robotAccount: {
        id: 50,
        access: 'robotConfig.accountId'
    },
    _conversationOnlineSyncNotify: {
        id: 51
    },
    _conversationOnlineSyncData: {
        id: 52
    },
    aiAgentMsgDirection: {
        id: 55,
        access: 'aiConfig.aiStatus',
        retAccess: 'aiConfig.aiStatus',
        retType: 'number'
    },
    aiAgentAccount: {
        id: 56,
        access: 'aiConfig.accountId',
        retAccess: 'aiConfig.accountId'
    },
    aiAgentContent: {
        id: 57,
        access: 'aiConfigParams.content',
        converter: objectToJSONString,
        retConverter: emptyFunc
    },
    aiAgentMessages: {
        id: 58,
        access: 'aiConfigParams.messages',
        converter: objectToJSONString,
        retConverter: emptyFunc
    },
    aiAgentPromptVariables: {
        id: 59,
        access: 'aiConfigParams.promptVariables',
        retConverter: emptyFunc
    },
    aiAgentModelConfigParams: {
        id: 60,
        access: 'aiConfigParams.modelConfigParams',
        converter: objectToJSONString,
        retConverter: emptyFunc
    },
    errorCode: {
        id: 61,
        access: 'messageStatus.errorCode',
        retType: 'number'
    },
    modifyTime: {
        id: 62,
        retType: 'number'
    },
    modifyAccountId: 63,
    historyEnabled: {
        id: 100,
        access: 'messageConfig.historyEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    roamingEnabled: {
        id: 101,
        access: 'messageConfig.roamingEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    onlineSyncEnabled: {
        id: 102,
        access: 'messageConfig.onlineSyncEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    routeEnabled: {
        id: 105,
        access: 'routeConfig.routeEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    pushEnable: {
        id: 107,
        access: 'pushConfig.pushEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    offlineEnabled: {
        id: 108,
        access: 'messageConfig.offlineEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    unreadEnabled: {
        id: 109,
        access: 'messageConfig.unreadEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    pushNickEnabled: {
        id: 110,
        access: 'pushConfig.pushNickEnabled',
        converter: boolToInt,
        retType: 'boolean'
    },
    msgAckSnapshot: {
        id: 112,
        retType: 'number'
    },
    receiverIds: {
        id: 154,
        access: 'targetConfig.receiverIds',
        converter: objectToJSONString,
        retConverter: () => undefined
    },
    inclusive: {
        id: 155,
        access: 'targetConfig.inclusive',
        converter: (a6) => {
            return a6 ? 1 : 2;
        },
        retConverter: () => undefined
    },
    newMemberVisible: {
        id: 156,
        access: 'targetConfig.newMemberVisible',
        converter: (z5) => {
            return z5 ? 1 : 2;
        },
        retConverter: () => undefined
    }
};
export const messageTagInverted = invertSerializeItem(messageTag);
export function conversationTypeV2ToV1(y5) {
    if (y5 === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P) {
        return 0;
    }
    else if (y5 === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM) {
        return 1;
    }
    else if (y5 === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM) {
        return 5;
    }
}
export function conversationTypeV1ToV2(w5) {
    const x5 = parseInt(w5);
    if (x5 === 0) {
        return V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P;
    }
    else if (x5 === 1) {
        return V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM;
    }
    else if (x5 === 5) {
        return V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM;
    }
    else {
        return V2NIMConversationType.V2NIM_CONVERSATION_TYPE_UNKNOWN;
    }
}
export function attachmentToRaw(u5, v5) {
    if (!v5) {
        return '';
    }
    switch (u5) {
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM:
            return v5.raw || '';
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE:
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO:
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO:
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE:
            return mediaAttachmentToRaw(v5);
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION:
            return locationAttachmentToRaw(v5);
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL:
            return callAttachmentToRaw(v5);
        default:
            return v5.raw || JSON.stringify(v5);
    }
}
function mediaAttachmentToRaw(f5) {
    const { width: g5, height: h5, duration: i5, path: j5, file: k5, raw: l5, ctx: m5, payload: n5, bucketName: o5, objectName: p5, token: q5, ext: r5, ...s5 } = f5;
    const t5 = typeof r5 === 'string' && r5[0] === '.' ? r5.slice(1) : r5;
    return JSON.stringify({
        ...s5,
        ...(typeof r5 === 'undefined' ? {} : { ext: t5 }),
        ...(typeof g5 === 'undefined' ? {} : { w: g5 }),
        ...(typeof h5 === 'undefined' ? {} : { h: h5 }),
        ...(typeof i5 === 'undefined' ? {} : { dur: i5 })
    });
}
function locationAttachmentToRaw(e5) {
    return JSON.stringify({
        lat: e5.latitude,
        lng: e5.longitude,
        title: e5.address
    });
}
function callAttachmentToRaw(z4) {
    const { raw: a5, ...b5 } = z4;
    try {
        return JSON.stringify({
            ...b5,
            durations: z4.durations.map((d5) => {
                return {
                    accid: d5.accountId,
                    duration: d5.duration
                };
            })
        });
    }
    catch (c5) {
        return JSON.stringify(z4);
    }
}
export function rawToAttachment(v4, w4) {
    let x4;
    try {
        x4 = JSON.parse(v4);
        switch (w4) {
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM:
                return { raw: v4 };
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION:
                return locationRawToAttachment(v4, x4);
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO:
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO:
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE:
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE:
                return mediaRawToAttachment(v4, x4);
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL:
                return callRawToAttachment(v4, x4);
            default:
                if (typeof x4 === 'object' && x4) {
                    return {
                        ...x4,
                        raw: v4
                    };
                }
                else {
                    return {
                        raw: v4
                    };
                }
        }
    }
    catch (y4) {
        if (typeof x4 === 'object' && x4) {
            return {
                ...x4,
                raw: v4
            };
        }
        else {
            return {
                raw: v4
            };
        }
    }
}
function locationRawToAttachment(t4, u4) {
    return {
        latitude: u4.lat,
        longitude: u4.lng,
        address: u4.title,
        raw: t4
    };
}
function mediaRawToAttachment(l4, m4) {
    const { w: n4, h: o4, dur: p4, ext: q4, ...r4 } = m4;
    const s4 = typeof q4 === 'string' && q4[0] !== '.' ? `.${q4}` : q4;
    return {
        ...r4,
        ...(typeof q4 === 'undefined' ? {} : { ext: s4 }),
        ...(typeof n4 === 'undefined' ? {} : { width: n4 }),
        ...(typeof o4 === 'undefined' ? {} : { height: o4 }),
        ...(typeof p4 === 'undefined' ? {} : { duration: p4 }),
        raw: l4
    };
}
function callRawToAttachment(i4, j4) {
    return {
        ...j4,
        durations: j4.durations.map((k4) => {
            return {
                accountId: k4.accid,
                duration: k4.duration
            };
        }),
        raw: i4
    };
}
export function emptyFunc() {
    return;
}
