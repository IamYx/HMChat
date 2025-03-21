import { NIM, NIMServiceConfig, NIMServiceName, V2NIMConversationGroup, V2NIMConversationGroupListener, V2NIMConversationGroupResult, V2NIMConversationGroupServiceInternal, V2NIMConversationOperationResult, V2Service } from '@nimsdk/base';
export declare class V2NIMConversationGroupServiceStub extends V2Service<V2NIMConversationGroupListener> implements V2NIMConversationGroupServiceInternal {
    constructor(i119: NIM, j119: NIMServiceName, k119: NIMServiceConfig);
    v2ICreateConversationGroup(f119: string, g119?: string | undefined, h119?: string[] | undefined): Promise<V2NIMConversationGroupResult>;
    v2IDeleteConversationGroup(e119: string): Promise<void>;
    v2IUpdateConversationGroup(b119: string, c119?: string | undefined, d119?: string | undefined): Promise<void>;
    v2IAddConversationsToGroup(z118: string, a119: string[]): Promise<V2NIMConversationOperationResult[]>;
    v2IRemoveConversationsFromGroup(x118: string, y118: string[]): Promise<V2NIMConversationOperationResult[]>;
    v2IGetConversationGroup(w118: string): Promise<V2NIMConversationGroup>;
    v2IGetConversationGroupList(): Promise<V2NIMConversationGroup[]>;
    v2IGetConversationGroupListByIds(v118: string[]): Promise<V2NIMConversationGroup[]>;
    createConversationGroup(s118: string, t118?: string | undefined, u118?: string[] | undefined): Promise<V2NIMConversationGroupResult>;
    deleteConversationGroup(r118: string): Promise<void>;
    updateConversationGroup(o118: string, p118?: string | undefined, q118?: string | undefined): Promise<void>;
    addConversationsToGroup(m118: string, n118: string[]): Promise<V2NIMConversationOperationResult[]>;
    removeConversationsFromGroup(k118: string, l118: string[]): Promise<V2NIMConversationOperationResult[]>;
    getConversationGroup(j118: string): Promise<V2NIMConversationGroup>;
    getConversationGroupList(): Promise<V2NIMConversationGroup[]>;
    getConversationGroupListByIds(i118: string[]): Promise<V2NIMConversationGroup[]>;
    onLoginStart(h118: string): Promise<void>;
    onLoginFinished(g118: string): Promise<void>;
    onLogout(): void;
}
