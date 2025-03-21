import { PickForRequired } from '../../../utils/index';
import { V2NIMConversationExtend } from '../definications';
export interface V2NIMConversationModelInternal {
    set(list: V2NIMConversationExtend[]): Promise<void>;
    clearAll(): Promise<void>;
    count(): number;
    getById(conversationId: string): V2NIMConversationExtend | undefined;
    getAll(): V2NIMConversationExtend[];
    upsert(conversation: PickForRequired<V2NIMConversationExtend, 'conversationId'>, isLocal?: boolean): Promise<boolean>;
    upsertBatch(conversations: PickForRequired<V2NIMConversationExtend, 'conversationId'>[]): Promise<boolean>;
    deleteById(conversationId: string): Promise<V2NIMConversationExtend | undefined>;
}
