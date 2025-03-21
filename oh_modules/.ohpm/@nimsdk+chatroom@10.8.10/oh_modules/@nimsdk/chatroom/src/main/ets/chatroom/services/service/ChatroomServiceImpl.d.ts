import { V2NIMAntispamConfig, V2NIMMessageCustomAttachmentParser } from '@nimsdk/base';
import { V2NIMChatroomMemberListResult, V2NIMChatroomMemberQueryOption, V2NIMChatroomMemberRoleUpdateParams, V2NIMChatroomMessage, V2NIMChatroomMessageListOption, V2NIMChatroomSelfMemberUpdateParams, V2NIMChatroomTagMemberOption, V2NIMChatroomTagMessageOption, V2NIMChatroomTagsUpdateParams, V2NIMChatroomUpdateParams, V2NIMSendChatroomMessageParams, V2NIMSendChatroomMessageResult } from '../../sdk/types';
import { V2NIMChatroomInfo } from '../../sdk/V2NIMChatroomClient';
import { V2NIMChatroomListener, V2NIMChatroomLocationConfig, V2NIMChatroomMember, V2NIMChatroomService, V2NIMChatroomTagTempChatBannedParams } from '../../sdk/V2NIMChatroomService';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import CRBaseService from '../base/CRBaseService';
export default class CRServiceImpl extends CRBaseService<V2NIMChatroomListener> implements V2NIMChatroomService {
    constructor(e39: V2NIMChatroomClient);
    registerCustomAttachmentParser(d39: V2NIMMessageCustomAttachmentParser): void;
    unregisterCustomAttachmentParser(c39: V2NIMMessageCustomAttachmentParser): void;
    private setListener;
    /** ---------- message service start ----------- */
    sendMessage(m38: V2NIMChatroomMessage, n38?: V2NIMSendChatroomMessageParams, o38?: (percentage: number) => void): Promise<V2NIMSendChatroomMessageResult>;
    cancelMessageAttachmentUpload(l38: V2NIMChatroomMessage): Promise<void>;
    getMessageList(k38: V2NIMChatroomMessageListOption): Promise<V2NIMChatroomMessage[]>;
    getMessageListByTag(j38: V2NIMChatroomTagMessageOption): Promise<V2NIMChatroomMessage[]>;
    /** ---------- message service end ----------- */
    /** ---------- member service start ----------- */
    getMemberListByOption(i38: V2NIMChatroomMemberQueryOption): Promise<V2NIMChatroomMemberListResult>;
    updateMemberRole(g38: string, h38: V2NIMChatroomMemberRoleUpdateParams): Promise<void>;
    setMemberBlockedStatus(d38: string, e38: boolean, f38?: string | undefined): Promise<void>;
    setMemberChatBannedStatus(a38: string, b38: boolean, c38?: string | undefined): Promise<void>;
    setMemberTempChatBanned(w37: string, x37: number, y37: boolean, z37?: string | undefined): Promise<void>;
    updateSelfMemberInfo(u37: V2NIMChatroomSelfMemberUpdateParams, v37?: V2NIMAntispamConfig | undefined): Promise<void>;
    getMemberByIds(t37: string[]): Promise<V2NIMChatroomMember[]>;
    kickMember(r37: string, s37?: string): Promise<void>;
    getMemberListByTag(q37: V2NIMChatroomTagMemberOption): Promise<V2NIMChatroomMemberListResult>;
    getMemberCountByTag(p37: string): Promise<number>;
    /** ---------- member service end ----------- */
    /** ---------- info service start ----------- */
    getChatroomInfo(): V2NIMChatroomInfo | null;
    updateChatroomInfo(n37: V2NIMChatroomUpdateParams, o37?: V2NIMAntispamConfig): Promise<void>;
    updateChatroomLocationInfo(m37: V2NIMChatroomLocationConfig): Promise<void>;
    updateChatroomTags(l37: V2NIMChatroomTagsUpdateParams): Promise<void>;
    setTempChatBannedByTag(k37: V2NIMChatroomTagTempChatBannedParams): Promise<void>;
    /** ---------- info service end ----------- */
    private checkLoginStatus;
}
