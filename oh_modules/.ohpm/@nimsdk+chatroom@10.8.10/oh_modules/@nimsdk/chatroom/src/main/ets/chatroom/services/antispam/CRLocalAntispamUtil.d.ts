import { V2NIMAntispamService, V2NIMClientAntispamResult, V2NIMDisconnectReason } from '@nimsdk/base';
import { CRAntispamModel } from './CRAntispamModel';
import { CRAntispamCloud } from './CRAntispamCloud';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import CRBaseService from '../base/CRBaseService';
export default class CRLocalAntispamUtil extends CRBaseService implements V2NIMAntispamService {
    model: CRAntispamModel;
    cloud: CRAntispamCloud;
    constructor(l3: V2NIMChatroomClient);
    syncLocalAntispam(): Promise<void>;
    /**
     * 本地客户端反垃圾检测
     */
    checkTextAntispam(z2?: string, a3?: string): V2NIMClientAntispamResult;
    /**
     * 使用 thesaurus 中单个规则进行过滤
     */
    private filterContent;
    /**
     * 实际检测函数
     */
    matchContent(k2: string, l2: string, m2: number, n2: number, o2: string): V2NIMClientAntispamResult;
    reset(j2: V2NIMDisconnectReason): void;
}
