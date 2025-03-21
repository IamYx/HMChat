import { NIM, NIMServiceConfig, NIMServiceName, Packet, V2NIMFriendAddApplication, V2NIMFriendAddApplicationQueryOption, V2NIMFriendAddParams, V2NIMFriendDeleteParams, V2NIMFriendListener, V2NIMFriendServiceInternal, V2NIMFriendSetParams, V2Service, V2NIMCheckFriendResult, V2NIMFriend, V2NIMFriendAddApplicationResult, V2NIMFriendSearchOption } from '@nimsdk/base';
import { HashMap } from '@kit.ArkTS';
export declare class V2NIMFriendServiceStub extends V2Service<V2NIMFriendListener> implements V2NIMFriendServiceInternal {
    constructor(s122: NIM, t122: NIMServiceName, u122: NIMServiceConfig);
    clearAllAddApplication(): Promise<void>;
    deleteAddApplication(r122: V2NIMFriendAddApplication): Promise<void>;
    clearApplicationList(): Promise<void>;
    v2ISyncFriendUserListHandler(p122: Packet, q122: boolean): Promise<void>;
    v2ISyncFriendListHandler(n122: Packet, o122: boolean): Promise<void>;
    v2IGetFriend(m122: string): Promise<V2NIMFriend | undefined>;
    v2IGetLocalFriendAlias(l122: string): Promise<string | undefined>;
    v2IGetLocalFriendAliasBatch(k122: string[]): Promise<HashMap<string, string | undefined>>;
    addFriend(i122: string, j122: V2NIMFriendAddParams): Promise<void>;
    deleteFriend(g122: string, h122: V2NIMFriendDeleteParams): Promise<void>;
    acceptAddApplication(f122: V2NIMFriendAddApplication): Promise<void>;
    rejectAddApplication(d122: V2NIMFriendAddApplication, e122?: string | undefined): Promise<void>;
    setFriendInfo(b122: string, c122: V2NIMFriendSetParams): Promise<void>;
    getFriendList(): Promise<V2NIMFriend[]>;
    getFriendByIds(a122: string[]): Promise<V2NIMFriend[]>;
    checkFriend(z121: string[]): Promise<V2NIMCheckFriendResult>;
    getAddApplicationList(y121: V2NIMFriendAddApplicationQueryOption): Promise<V2NIMFriendAddApplicationResult>;
    setAddApplicationRead(): Promise<void>;
    getAddApplicationUnreadCount(): Promise<number>;
    searchFriendByOption(x121: V2NIMFriendSearchOption): Promise<V2NIMFriend[]>;
    onLoginStart(w121: string): Promise<void>;
    onLoginFinished(v121: string): Promise<void>;
    onLogout(): void;
}
