import { NIM, NIMServiceConfig, NIMServiceName, V2NIMMessage, V2NIMMessageConverter, V2NIMMessageRefer, V2Service } from '@nimsdk/base';
export default class V2NIMMessageConverterImpl extends V2Service implements V2NIMMessageConverter {
    constructor(i149: NIM, j149: NIMServiceName, k149: NIMServiceConfig);
    messageSerialization(g149: V2NIMMessage): string | null;
    messageDeserialization(c149: string): V2NIMMessage | null;
}
export declare function completeMessageRefer(a149: NIM, b149: V2NIMMessageRefer): V2NIMMessageRefer;
