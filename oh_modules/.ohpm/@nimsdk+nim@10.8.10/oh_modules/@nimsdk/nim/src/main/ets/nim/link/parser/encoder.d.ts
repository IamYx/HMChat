import { NIMEStrAnyObj } from '@nimsdk/base';
export default class PacketEncoder {
    private pack;
    private packetLength;
    private serviceId;
    private commandId;
    private serialId;
    private tag;
    constructor(k69: number, l69: number, m69: number);
    marshalHeader(): void;
    marshalProperty(f69: NIMEStrAnyObj): void;
    marshalPropertyArray(c69: NIMEStrAnyObj[]): void;
    marshalStrArray(x68: string[]): void;
    marshalLongArray(s68: number[]): void;
    marshalStrStrMap(n68: {
        [key: string]: string;
    }): void;
    marshalStrLongMap(i68: {
        [key: string]: number;
    }): void;
    marshalLongLongMap(b68: {
        [key: number]: number;
    }): void;
    marshalKVArray(y67: {
        [key: string]: string;
    }[]): void;
    private putLong;
    marshal(r67: any[], s67?: any[]): ArrayBuffer;
    reset(): void;
}
