import { NIM, NIMRequestResult } from '@nimsdk/base';
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
    keys: AntispamResponseItem[];
}
export interface AllThesaurus {
    thesaurus: IThesaurus[];
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
export declare class AntispamModel {
    thesaurus: IThesaurus[];
    private core;
    private antispamKey;
    constructor(m36: NIM);
    getVersion(): Promise<string>;
    setVersion(e36: string): Promise<void>;
    loadLocalAntispam(): Promise<void>;
    updateLocalAntispam(v35: string, w35: NIMRequestResult): Promise<void>;
    private writeFile;
    /**
     * md5 不同进行更新，如果相同不需要更新
     */
    checkMd5(m35: string, n35: (isUpdate: boolean) => void): void;
    private getLocalAntispamPath;
    private decode;
}
