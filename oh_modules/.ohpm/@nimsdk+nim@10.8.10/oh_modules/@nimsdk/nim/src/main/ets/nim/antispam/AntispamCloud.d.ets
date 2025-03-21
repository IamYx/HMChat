import { NIM, NIMRequestResult } from '@nimsdk/base';
import { SyncAntispamInfo } from './AntispamModel';
export declare class AntispamCloud {
    private core;
    private vocabInfo;
    constructor(d35: NIM);
    /**
     * 下载反垃圾词库
     */
    syncLocalAntiSpamInfo(y34: string): Promise<SyncAntispamInfo>;
    downloadAntispam(r34: string): Promise<NIMRequestResult>;
}
