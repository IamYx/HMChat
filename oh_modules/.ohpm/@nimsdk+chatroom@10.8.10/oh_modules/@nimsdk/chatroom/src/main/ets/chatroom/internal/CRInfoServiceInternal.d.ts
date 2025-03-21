import { V2NIMAntispamConfig } from '@nimsdk/base';
import { V2NIMChatroomTagsUpdateParams, V2NIMChatroomUpdateParams } from '../sdk/types';
import { V2NIMChatroomInfo } from '../sdk/V2NIMChatroomClient';
import { V2NIMChatroomLocationConfig, V2NIMChatroomTagTempChatBannedParams } from '../sdk/V2NIMChatroomService';
/**
 * v2 chatroom info
 */
export default interface CRInfoServiceInternal {
    setChatroomInfo(chatroomInfo: V2NIMChatroomInfo): any;
    getChatroomInfo(): V2NIMChatroomInfo | null;
    updateChatroomInfo(updateParams: V2NIMChatroomUpdateParams, antispamConfig?: V2NIMAntispamConfig): Promise<void>;
    updateChatroomLocationInfo(locationConfig: V2NIMChatroomLocationConfig): Promise<void>;
    updateChatroomTags(updateTagParams: V2NIMChatroomTagsUpdateParams): Promise<void>;
    setTempChatBannedByTag(params: V2NIMChatroomTagTempChatBannedParams): Promise<void>;
}
