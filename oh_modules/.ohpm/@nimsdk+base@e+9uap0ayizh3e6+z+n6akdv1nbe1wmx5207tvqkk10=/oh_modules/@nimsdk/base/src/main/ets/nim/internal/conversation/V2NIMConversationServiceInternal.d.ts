import { V2NIMConversation, V2NIMConversationFilter, V2NIMConversationOperationResult, V2NIMConversationOption, V2NIMConversationResult, V2NIMConversationService, V2NIMConversationType, V2NIMConversationUpdate } from '../../sdk/V2NIMConversationService';
import { V2InternalService } from '../V2NIMInternalService';
import { V2NIMConversationModelInternal } from './services/V2NIMConversationModelInternal';
import { V2NIMConversationVersionCacheInternal } from './services/V2NIMConversationVersionCacheInternal';
import { NIMEStrAnyObj } from '../types';
import { V2NIMConversationField } from './definications';
export default interface V2NIMConversationServiceInternal extends V2NIMConversationService, V2InternalService {
    /**
     * 需要注意的是：V2NIMConversationServiceInternal 的内部接口调用仅开放给 conversation group 使用，其他调用方使用 emit3
     */
    get model(): V2NIMConversationModelInternal;
    get versionCache(): V2NIMConversationVersionCacheInternal;
    formatConversationField(data: NIMEStrAnyObj): Promise<V2NIMConversationField>;
    formatConversationFields(arr: NIMEStrAnyObj[]): Promise<V2NIMConversationField[]>;
    /**
     * Internal API calling use following functions.
     */
    v2IGetConversationList(offset: number, limit: number): Promise<V2NIMConversationResult>;
    v2IGetConversationListByOption(offset: number, limit: number, option: V2NIMConversationOption): Promise<V2NIMConversationResult>;
    v2IGetConversation(conversationId: string): Promise<V2NIMConversation>;
    v2IGetConversationListByIds(conversationIds: string[]): Promise<V2NIMConversation[]>;
    v2ICreateConversation(conversationId: string): Promise<V2NIMConversation>;
    v2IDeleteConversation(conversationId: string, clearMessage?: boolean): Promise<void>;
    v2IDeleteConversationListByIds(conversationIds: string[], clearMessage?: boolean): Promise<V2NIMConversationOperationResult[]>;
    v2IStickTopConversation(conversationId: string, stickTop: boolean): Promise<void>;
    v2IUpdateConversation(conversationId: string, updateInfo: V2NIMConversationUpdate): Promise<void>;
    v2IUpdateConversationLocalExtension(conversationId: string, localExtension: string): Promise<void>;
    v2IGetTotalUnreadCount(): number;
    v2IGetUnreadCountByIds(conversationIds: string[]): Promise<number>;
    v2IGetUnreadCountByFilter(filter: V2NIMConversationFilter): Promise<number>;
    v2IClearTotalUnreadCount(): Promise<void>;
    v2IClearUnreadCountByIds(conversationIds: string[]): Promise<V2NIMConversationOperationResult[]>;
    v2IClearUnreadCountByGroupId(groupId: string): Promise<void>;
    v2IClearUnreadCountByTypes(types: V2NIMConversationType[]): Promise<void>;
    v2ISubscribeUnreadCountByFilter(filter: V2NIMConversationFilter): void;
    v2IUnsubscribeUnreadCountByFilter(filter: V2NIMConversationFilter): void;
    v2IMarkConversationRead(conversationId: string): Promise<number>;
    v2IGetConversationReadTime(conversationId: string): Promise<number>;
}
