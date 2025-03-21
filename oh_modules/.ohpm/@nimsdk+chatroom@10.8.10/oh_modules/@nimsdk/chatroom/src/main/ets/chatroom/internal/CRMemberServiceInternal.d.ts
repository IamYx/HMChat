import { V2NIMAntispamConfig } from '@nimsdk/base';
import { V2NIMChatroomMember, V2NIMChatroomMemberListResult, V2NIMChatroomMemberQueryOption, V2NIMChatroomMemberRoleUpdateParams, V2NIMChatroomSelfMemberUpdateParams, V2NIMChatroomTagMemberOption } from '../sdk/types';
export default interface CRMemberServiceInternal {
    getMemberListByOption(option: V2NIMChatroomMemberQueryOption): Promise<V2NIMChatroomMemberListResult>;
    updateMemberRole(accountId: string, updateParams: V2NIMChatroomMemberRoleUpdateParams): Promise<void>;
    setMemberBlockedStatus(accountId: string, blocked: boolean, notificationExtension?: string): Promise<void>;
    setMemberChatBannedStatus(accountId: string, chatBanned: boolean, notificationExtension?: string): Promise<void>;
    setMemberTempChatBanned(accountId: string, tempChatBannedDuration: number, notificationEnabled: boolean, notificationExtension?: string): Promise<void>;
    updateSelfMemberInfo(updateParams: V2NIMChatroomSelfMemberUpdateParams, antispamConfig?: V2NIMAntispamConfig): Promise<void>;
    getMemberByIds(accountIds: string[]): Promise<V2NIMChatroomMember[]>;
    kickMember(accountId: string, notificationExtension?: string): Promise<void>;
    getMemberListByTag(option: V2NIMChatroomTagMemberOption): Promise<V2NIMChatroomMemberListResult>;
    getMemberCountByTag(tag: string): Promise<number>;
}
