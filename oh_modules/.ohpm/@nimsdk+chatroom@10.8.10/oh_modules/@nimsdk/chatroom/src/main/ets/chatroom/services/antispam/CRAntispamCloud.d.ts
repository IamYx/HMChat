import { NIMRequestResult } from '@nimsdk/base';
import { SyncAntispamInfo } from './CRAntispamModel';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
export declare class CRAntispamCloud {
    private core;
    vocabInfo: SyncAntispamInfo;
    constructor(z: V2NIMChatroomClient);
    /**
     * 下载反垃圾词库
     */
    syncLocalAntiSpamInfo(u: string): Promise<SyncAntispamInfo>;
    downloadAntispam(n: string): Promise<NIMRequestResult>;
    reset(): void;
}
