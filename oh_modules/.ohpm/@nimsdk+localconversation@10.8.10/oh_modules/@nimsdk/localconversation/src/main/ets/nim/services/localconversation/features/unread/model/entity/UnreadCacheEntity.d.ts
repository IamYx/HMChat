export declare class UnreadCacheEntity { private _conversationId; private _unreadCount; private _timestamp; private _mute; constructor(l18: string, m18: number, timestamp: number, mute?: boolean); get conversationId(): string; get unreadCount(): number; get timestamp(): number; get mute(): boolean; equalsTo(k18: UnreadCacheEntity): boolean; } export declare class UnreadCacheSubUnreadCountEntity { private _conversationId; private _unreadCount; constructor(i18: string, j18: number); get conversationId(): string; get unreadCount(): number; } export declare class UnreadCacheSubReadTimeEntity { private _conversationId; private _timestamp; constructor(h18: string, timestamp: number); get conversationId(): string; get timestamp(): number; } 