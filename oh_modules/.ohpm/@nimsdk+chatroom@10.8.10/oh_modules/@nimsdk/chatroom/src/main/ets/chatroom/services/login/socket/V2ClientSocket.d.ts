import { CmdForSend, DisconnectType, NIMEStrAnyObj, Packet } from "@nimsdk/base";
export default interface V2ClientSocket {
    connect(linkUrl: string): Promise<void>;
    connect(linkUrl: string, isReconnect: boolean): Promise<void>;
    resetSocketConfig(): void;
    doDisconnect(type: DisconnectType, description: string | NIMEStrAnyObj): void;
    sendCmd(cmd: string, params?: NIMEStrAnyObj, options?: {
        timeout?: number;
    }): Promise<Packet | undefined | CmdForSend>;
    onMessage(packetArr: Array<Packet> | void): any;
    ping(): Promise<void>;
    testHeartBeat5Timeout(): Promise<boolean>;
}
