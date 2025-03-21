import { V2NIMConversationField } from '../definications';
export interface V2NIMConversationVersionCacheInternal {
    compareAndDeleteGroupInModel(version: number, groupId: string): any;
    compareAndUpdateModel(fields: V2NIMConversationField[]): any;
}
