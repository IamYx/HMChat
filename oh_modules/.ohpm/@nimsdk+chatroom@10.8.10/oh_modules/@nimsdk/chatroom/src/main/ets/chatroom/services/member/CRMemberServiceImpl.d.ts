import { V2NIMAntispamConfig } from '@nimsdk/base';
import CRBaseService from '../base/CRBaseService';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import { V2NIMChatroomMember, V2NIMChatroomMemberListResult, V2NIMChatroomMemberQueryOption, V2NIMChatroomMemberRoleUpdateParams, V2NIMChatroomSelfMemberUpdateParams, V2NIMChatroomTagMemberOption } from '../../sdk/types';
import CRMemberServiceInternal from '../../internal/CRMemberServiceInternal';
/**
 * 聊天室服务设计文档: https://docs.popo.netease.com/team/pc/nim/pageDetail/e3450f955c164e72b9472c47063f8efa
 * 聊天室相关数据结构: https://docs.popo.netease.com/team/pc/nim/pageDetail/661e8e21fcb844f683ebcc72c023295c
 */
export default class CRMemberServiceImpl extends CRBaseService implements CRMemberServiceInternal {
    constructor(j26: V2NIMChatroomClient);
    getMemberListByOption(d26: V2NIMChatroomMemberQueryOption): Promise<V2NIMChatroomMemberListResult>;
    updateMemberRole(a26: string, b26: V2NIMChatroomMemberRoleUpdateParams): Promise<void>;
    setMemberBlockedStatus(w25: string, x25: boolean, y25?: string): Promise<void>;
    setMemberChatBannedStatus(s25: string, t25: boolean, u25?: string): Promise<void>;
    setMemberTempChatBanned(n25: string, o25: number, p25: boolean, q25?: string): Promise<void>;
    updateSelfMemberInfo(l25: V2NIMChatroomSelfMemberUpdateParams, m25?: V2NIMAntispamConfig): Promise<void>;
    getMemberByIds(j25: string[]): Promise<V2NIMChatroomMember[]>;
    kickMember(h25: string, i25?: string): Promise<void>;
    getMemberListByTag(e25: V2NIMChatroomTagMemberOption): Promise<V2NIMChatroomMemberListResult>;
    getMemberCountByTag(c25: string): Promise<number>;
    private v2ChatroomOnMemberTagUpdatedHandler;
}
