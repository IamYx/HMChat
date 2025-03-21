import { NIMEStrAnyObj } from '@nimsdk/base';
export default class PacketEncoder {
    private pack;
    private packetLength;
    private serviceId;
    private commandId;
    private serialId;
    private tag;
    constructor(y19: number, z19: number, a20: number);
    marshalHeader(): void;
    marshalProperty(t19: NIMEStrAnyObj): void;
    marshalPropertyArray(q19: NIMEStrAnyObj[]): void;
    marshalStrArray(l19: string[]): void;
    marshalLongArray(g19: number[]): void;
    marshalStrStrMap(b19: {
        [key: string]: string;
    }): void;
    marshalStrLongMap(w18: {
        [key: string]: number;
    }): void;
    marshalLongLongMap(p18: {
        [key: number]: number;
    }): void;
    marshalKVArray(m18: {
        [key: string]: string;
    }[]): void;
    private putLong;
    marshal(f18: any[], g18?: any[]): ArrayBuffer;
    reset(): void;
}
