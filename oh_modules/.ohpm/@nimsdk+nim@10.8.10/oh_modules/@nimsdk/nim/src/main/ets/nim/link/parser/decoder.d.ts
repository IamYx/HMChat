import { NIMEStrAnyObj } from '@nimsdk/base';
import { Unpack } from './pack/unpack';
export default class PacketDecoder {
    unpack: Unpack;
    private static RES_CODE;
    packetLength: number;
    serviceId: number;
    commandId: number;
    serialId: number;
    tag: number;
    resCode: number;
    innerHeader: any;
    msgId: number;
    priority: number;
    constructor(q67: ArrayBuffer);
    reset(): void;
    unmarshalHeader(): void;
    private _unmarshalHeader;
    hasRescode(i67: number): boolean;
    getHeader(): any;
    getInnerHeader(): any | null;
    unmarshalProperty(): NIMEStrAnyObj;
    unmarshalPropertyArray(): NIMEStrAnyObj[];
    unmarshalLong(): number;
    unmarshalLongArray(): number[];
    unmarshalStrArray(): string[];
    unmarshalStrLongMap(): NIMEStrAnyObj;
    unmarshalStrStrMap(): NIMEStrAnyObj;
    unmarshalLongLongMap(): NIMEStrAnyObj;
    unmarshalKVArray(): NIMEStrAnyObj[];
    unmarshal(y65?: any[]): any;
}
