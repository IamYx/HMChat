import { V2NIMAntispamConfig } from '@nimsdk/base';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import CRInfoModel from './CRInfoModel';
import { V2NIMChatroomTagsUpdateParams, V2NIMChatroomUpdateParams } from '../../sdk/types';
import { V2NIMChatroomInfo } from '../../sdk/V2NIMChatroomClient';
import { V2NIMChatroomLocationConfig, V2NIMChatroomTagTempChatBannedParams } from '../../sdk/V2NIMChatroomService';
import CRInfoServiceInternal from '../../internal/CRInfoServiceInternal';
import CRBaseService from '../base/CRBaseService';
/**
 * v2 chatroom info
 */
export default class CRInfoServiceImpl extends CRBaseService implements CRInfoServiceInternal {
    model: CRInfoModel;
    constructor(l7: V2NIMChatroomClient);
    private setListener;
    reset(): void;
    /**
     * 获取聊天室信息 13_13
     */
    getChatroomInfo(): V2NIMChatroomInfo | null;
    /**
     * 更新聊天室信息 13_14
     */
    updateChatroomInfo(d7: V2NIMChatroomUpdateParams, e7?: V2NIMAntispamConfig): Promise<void>;
    /**
     * 更新空间坐标 13_33
     */
    updateChatroomLocationInfo(b7: V2NIMChatroomLocationConfig): Promise<void>;
    /**
     * 更新聊天室标签 13_34
     */
    updateChatroomTags(a7: V2NIMChatroomTagsUpdateParams): Promise<void>;
    setTempChatBannedByTag(z6: V2NIMChatroomTagTempChatBannedParams): Promise<void>;
    /**
     * 内部接口。更新聊天室信息
     */
    _updateChatroomInfo(x6: Partial<V2NIMChatroomInfo>): Promise<V2NIMChatroomInfo>;
    private getChatroomInfoAsync;
    setChatroomInfo(u6: V2NIMChatroomInfo): void;
}
