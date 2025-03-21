import { NIM, NIMServiceConfig, NIMServiceName, V2NIMSignallingAcceptInviteParams, V2NIMSignallingCallParams, V2NIMSignallingCallResult, V2NIMSignallingCallSetupParams, V2NIMSignallingCallSetupResult, V2NIMSignallingCancelInviteParams, V2NIMSignallingChannelInfo, V2NIMSignallingChannelType, V2NIMSignallingInviteParams, V2NIMSignallingJoinParams, V2NIMSignallingJoinResult, V2NIMSignallingListener, V2NIMSignallingRejectInviteParams, V2NIMSignallingRoomInfo, V2NIMSignallingServiceInternal, V2Service } from '@nimsdk/base';
export declare class V2NIMSignallingServiceStub extends V2Service<V2NIMSignallingListener> implements V2NIMSignallingServiceInternal {
    constructor(d132: NIM, e132: NIMServiceName, f132: NIMServiceConfig);
    call(c132: V2NIMSignallingCallParams): Promise<V2NIMSignallingCallResult>;
    callSetup(b132: V2NIMSignallingCallSetupParams): Promise<V2NIMSignallingCallSetupResult>;
    createRoom(y131: V2NIMSignallingChannelType, z131?: string | undefined, a132?: string | undefined): Promise<V2NIMSignallingChannelInfo>;
    delayRoom(x131: string): Promise<V2NIMSignallingRoomInfo>;
    closeRoom(u131: string, v131?: boolean | undefined, w131?: string | undefined): Promise<void>;
    joinRoom(t131: V2NIMSignallingJoinParams): Promise<V2NIMSignallingJoinResult>;
    leaveRoom(q131: string, r131?: boolean | undefined, s131?: string | undefined): Promise<void>;
    invite(p131: V2NIMSignallingInviteParams): Promise<void>;
    cancelInvite(o131: V2NIMSignallingCancelInviteParams): Promise<void>;
    rejectInvite(n131: V2NIMSignallingRejectInviteParams): Promise<void>;
    acceptInvite(m131: V2NIMSignallingAcceptInviteParams): Promise<void>;
    sendControl(j131: string, k131?: string | undefined, l131?: string | undefined): Promise<void>;
    getRoomInfoByChannelName(i131: string): Promise<V2NIMSignallingRoomInfo>;
    onLoginStart(h131: string): Promise<void>;
    onLoginFinished(g131: string): Promise<void>;
    onLogout(): void;
}
