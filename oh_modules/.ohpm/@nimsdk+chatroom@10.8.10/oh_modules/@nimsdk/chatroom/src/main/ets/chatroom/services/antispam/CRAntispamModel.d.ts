import { NIMRequestResult } from '@nimsdk/base';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
export interface IThesaurus {
    match: number;
    name: string;
    /**
     * 匹配后的替换规则
     * 1 替换
     * 2 拒绝发送
     * 3 服务器处理（命中客户端反垃圾，交给服务器处理）,消息Property需要带上TalkMsgTag.clientAntiSpam
     */
    operate?: number;
    /**
     * 额，不知道原来咋定义的。里面和外面的字段重合了很多
     */
    keys: Array<AntispamResponseItem>;
}
export interface AllThesaurus {
    thesaurus: Array<IThesaurus>;
}
export interface SyncAntispamInfo {
    version: string;
    md5: string;
    url: string;
}
export interface AntispamResponseItem {
    key: string;
    operate: number;
    match: number;
}
export declare class CRAntispamModel {
    thesaurus: IThesaurus[];
    core: V2NIMChatroomClient;
    antispamKey: string;
    constructor(i2: V2NIMChatroomClient);
    getVersion(): Promise<string>;
    setVersion(a2: string): Promise<void>;
    loadLocalAntispam(): void;
    updateLocalAntispam(r1: string, s1: NIMRequestResult): Promise<void>;
    writeFile(n1: string | ArrayBuffer): Promise<void>;
    /**
     * md5 不同进行更新，如果相同不需要更新
     */
    checkMd5(i1: string, j1: (isUpdate: boolean) => void): void;
    getLocalAntispamPath(): string;
    decode(a1: ArrayBuffer): IThesaurus[];
    reset(): void;
}
