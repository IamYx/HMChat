import { V2NIMConversationGroup, V2NIMConversationGroupResult, V2NIMConversationGroupService } from '../../sdk/V2NIMConversationGroupService';
import { V2NIMConversationOperationResult } from '../../sdk/V2NIMConversationService';
import { V2InternalService } from '../V2NIMInternalService';
export default interface V2NIMConversationServiceInternal extends V2NIMConversationGroupService, V2InternalService {
    /**
     * Internal API calling use following functions.
     */
    v2ICreateConversationGroup(name: string, serverExtension?: string, conversationIds?: string[]): Promise<V2NIMConversationGroupResult>;
    v2IDeleteConversationGroup(groupId: string): Promise<void>;
    v2IUpdateConversationGroup(groupId: string, name?: string, serverExtension?: string): Promise<void>;
    v2IAddConversationsToGroup(groupId: string, conversationIds: string[]): Promise<V2NIMConversationOperationResult[]>;
    v2IRemoveConversationsFromGroup(groupId: string, conversationIds: string[]): Promise<V2NIMConversationOperationResult[]>;
    v2IGetConversationGroup(groupId: string): Promise<V2NIMConversationGroup>;
    v2IGetConversationGroupList(): Promise<V2NIMConversationGroup[]>;
    v2IGetConversationGroupListByIds(groupIds: string[]): Promise<V2NIMConversationGroup[]>;
}
