import { NIM, NIMEStrAnyObj, NIMServiceConfig, NIMServiceName, V2NIMConversation, V2NIMConversationField, V2NIMConversationFilter, V2NIMConversationListener, V2NIMConversationModelInternal, V2NIMConversationOperationResult, V2NIMConversationOption, V2NIMConversationResult, V2NIMConversationServiceInternal, V2NIMConversationType, V2NIMConversationUnreadInternal, V2NIMConversationUpdate, V2NIMConversationVersionCacheInternal, V2Service } from '@nimsdk/base';
export declare class V2NIMConversationServiceStub extends V2Service<V2NIMConversationListener> implements V2NIMConversationServiceInternal {
    constructor(s121: NIM, t121: NIMServiceName, u121: NIMServiceConfig);
    v2IGetConversationList(q121: number, r121: number): Promise<V2NIMConversationResult>;
    v2IGetConversationListByOption(n121: number, o121: number, p121: V2NIMConversationOption): Promise<V2NIMConversationResult>;
    v2IGetConversation(m121: string): Promise<V2NIMConversation>;
    v2IGetConversationListByIds(l121: string[]): Promise<V2NIMConversation[]>;
    v2ICreateConversation(k121: string): Promise<V2NIMConversation>;
    v2IDeleteConversation(i121: string, j121?: boolean | undefined): Promise<void>;
    v2IDeleteConversationListByIds(g121: string[], h121?: boolean | undefined): Promise<V2NIMConversationOperationResult[]>;
    v2IStickTopConversation(e121: string, f121: boolean): Promise<void>;
    v2IUpdateConversation(c121: string, d121: V2NIMConversationUpdate): Promise<void>;
    v2IUpdateConversationLocalExtension(a121: string, b121: string): Promise<void>;
    v2IGetTotalUnreadCount(): number;
    v2IGetUnreadCountByIds(z120: string[]): Promise<number>;
    v2IGetUnreadCountByFilter(y120: V2NIMConversationFilter): Promise<number>;
    v2IClearTotalUnreadCount(): Promise<void>;
    v2IClearUnreadCountByIds(x120: string[]): Promise<V2NIMConversationOperationResult[]>;
    v2IClearUnreadCountByGroupId(w120: string): Promise<void>;
    v2IClearUnreadCountByTypes(v120: V2NIMConversationType[]): Promise<void>;
    v2ISubscribeUnreadCountByFilter(u120: V2NIMConversationFilter): void;
    v2IUnsubscribeUnreadCountByFilter(t120: V2NIMConversationFilter): void;
    v2IMarkConversationRead(s120: string): Promise<number>;
    v2IGetConversationReadTime(r120: string): Promise<number>;
    private setListener;
    markConversationRead(p120: string): Promise<number>;
    getConversationReadTime(o120: string): Promise<number>;
    get model(): V2NIMConversationModelInternal;
    get versionCache(): V2NIMConversationVersionCacheInternal;
    get unread(): V2NIMConversationUnreadInternal;
    formatConversationField(n120: NIMEStrAnyObj): Promise<V2NIMConversationField>;
    formatConversationFields(m120: NIMEStrAnyObj[]): Promise<V2NIMConversationField[]>;
    getConversationList(k120: number, l120: number): Promise<V2NIMConversationResult>;
    getConversationListByOption(h120: number, i120: number, j120: V2NIMConversationOption): Promise<V2NIMConversationResult>;
    getConversation(g120: string): Promise<V2NIMConversation>;
    getConversationListByIds(f120: string[]): Promise<V2NIMConversation[]>;
    createConversation(e120: string): Promise<V2NIMConversation>;
    deleteConversation(c120: string, d120?: boolean | undefined): Promise<void>;
    deleteConversationListByIds(a120: string[], b120?: boolean | undefined): Promise<V2NIMConversationOperationResult[]>;
    stickTopConversation(y119: string, z119: boolean): Promise<void>;
    updateConversation(w119: string, x119: V2NIMConversationUpdate): Promise<void>;
    updateConversationLocalExtension(u119: string, v119: string): Promise<void>;
    getTotalUnreadCount(): number;
    getUnreadCountByIds(t119: string[]): Promise<number>;
    getUnreadCountByFilter(s119: V2NIMConversationFilter): Promise<number>;
    clearTotalUnreadCount(): Promise<void>;
    clearUnreadCountByIds(r119: string[]): Promise<V2NIMConversationOperationResult[]>;
    clearUnreadCountByGroupId(q119: string): Promise<void>;
    clearUnreadCountByTypes(p119: V2NIMConversationType[]): Promise<void>;
    subscribeUnreadCountByFilter(o119: V2NIMConversationFilter): void;
    unsubscribeUnreadCountByFilter(n119: V2NIMConversationFilter): void;
    onLoginStart(m119: string): Promise<void>;
    onLoginFinished(l119: string): Promise<void>;
    onLogout(): void;
}
