/**
 * 聊天室服务设计文档: https://docs.popo.netease.com/team/pc/nim/pageDetail/e3450f955c164e72b9472c47063f8efa
 * 聊天室相关数据结构: https://docs.popo.netease.com/team/pc/nim/pageDetail/661e8e21fcb844f683ebcc72c023295c
 */
import { V2NIMDisconnectReason, V2NIMMessageCustomAttachmentParser } from '@nimsdk/base';
import CRMessageServiceInternal from '../../internal/CRMessageServiceInternal';
import { V2NIMChatroomMessage, V2NIMChatroomMessageListOption, V2NIMChatroomTagMessageOption, V2NIMSendChatroomMessageParams, V2NIMSendChatroomMessageResult } from '../../sdk/types';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import CRBaseService from '../base/CRBaseService';
import CDNUtil from './util/cdnUtil';
import FileUtil from './util/fileUtil';
import SendUtil from './util/sendUtil';
export default class CRMessageServiceImpl extends CRBaseService implements CRMessageServiceInternal {
    fileUtil: FileUtil;
    sendUtil: SendUtil;
    cdnUtil: CDNUtil;
    customAttachmentParsers: V2NIMMessageCustomAttachmentParser[];
    constructor(v29: V2NIMChatroomClient);
    getCustomAttachmentParsers(): V2NIMMessageCustomAttachmentParser[];
    registerCustomAttachmentParser(u29: V2NIMMessageCustomAttachmentParser): void;
    unregisterCustomAttachmentParser(s29: V2NIMMessageCustomAttachmentParser): void;
    reset(r29: V2NIMDisconnectReason): void;
    private setListener;
    getMessageList(j29: V2NIMChatroomMessageListOption): Promise<V2NIMChatroomMessage[]>;
    getMessageListByTag(e29: V2NIMChatroomTagMessageOption): Promise<V2NIMChatroomMessage[]>;
    sendMessage(y28: V2NIMChatroomMessage, z28?: V2NIMSendChatroomMessageParams, a29?: (percentage: number) => void): Promise<V2NIMSendChatroomMessageResult>;
    private v2ChatroomMessageAck;
    private v2ChatroomOnMessageHandler;
    private v2ChatroomUpdateCDNInfoHandler;
    cancelMessageAttachmentUpload(o28: V2NIMChatroomMessage): Promise<void>;
}
