import { cmdConfigCRInfo, cmdMapCRInfo, registerParser, V2NIMErrorCode, V2NIMErrorImpl, validate } from '@nimsdk/base';
import { assign, get, pick } from '@nimsdk/vendor/Index';
import CRInfoModel from './CRInfoModel';
import { chatroomInfoRule, chatroomTagUpdateRule, locationRule, setTempChatBannedByTagRule } from './rules';
import { V2NIMChatroomMessageNotificationType } from '../../sdk/types';
import CRBaseService from '../base/CRBaseService';
import { SetTempChatBannedByTagRequest, UpdateChatroomInfoRequest, UpdateChatroomLocationParam, UpdateChatroomLocationRequest, UpdateChatroomTagsRequest } from './cloud/CRInfoRequest';
import { registerCRAspect } from './Aspect';
export default class CRInfoServiceImpl extends CRBaseService {
    constructor(l7) {
        super('infoService', l7);
        registerParser(l7, { cmdMap: cmdMapCRInfo, cmdConfig: cmdConfigCRInfo });
        this.model = new CRInfoModel();
        this.setListener();
        registerCRAspect(CRInfoServiceImpl);
    }
    setListener() {
        this.core.eventBus.on('V2NIMChatroomMessageService/onReceiveNotification', async (f7, g7) => {
            switch (f7.attachment.type) {
                case V2NIMChatroomMessageNotificationType.V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_ROOM_INFO_UPDATED: {
                    const h7 = g7.data.roomInfo?.extension;
                    const i7 = g7.data.roomInfo?.queueLevel;
                    const j7 = {
                        ...(g7.data.roomInfo || {}),
                        ...(h7 !== undefined ? { serverExtension: h7 } : {}),
                        ...(i7 !== undefined ? { queueLevelMode: i7 } : {})
                    };
                    delete j7.extension;
                    delete j7.queueLevel;
                    const k7 = await this._updateChatroomInfo(j7);
                    this.core.chatroomService.emit('onChatroomInfoUpdated', k7);
                    break;
                }
            }
        });
    }
    reset() {
        this.model.reset();
    }
    getChatroomInfo() {
        return this.model.getChatroomInfo();
    }
    async updateChatroomInfo(d7, e7) {
        validate(chatroomInfoRule, { updateParams: d7, antispamConfig: e7 }, '', true);
        if (!d7.announcement && !d7.liveUrl && !d7.roomName && !d7.serverExtension) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                detail: {
                    reason: 'updateParams.announcement, updateParams.liveUrl, updateParams.roomName, updateParams.serverExtension 至少有一个不为空'
                }
            });
        }
        await this.core.sendCmd('v2UpdateChatroomInfo', new UpdateChatroomInfoRequest(d7));
        this._updateChatroomInfo(pick(d7, ['announcement', 'liveUrl', 'roomName', 'serverExtension']));
    }
    async updateChatroomLocationInfo(b7) {
        validate(locationRule, b7, '', true);
        const c7 = new UpdateChatroomLocationParam(b7);
        await this.core.sendCmd('v2UpdateChatroomLocation', new UpdateChatroomLocationRequest(c7));
    }
    async updateChatroomTags(a7) {
        validate(chatroomTagUpdateRule, { updateTagParams: a7 }, '', true);
        if (!a7.tags && a7.notifyTargetTags === undefined) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                detail: {
                    reason: 'updateTagParams.tags, updateTagParams.notifyTargetTags 至少有一个不为空'
                }
            });
        }
        a7.notificationEnabled = a7.notificationEnabled === undefined ? true : a7.notificationEnabled;
        await this.core.sendCmd('v2UpdateChatroomTags', new UpdateChatroomTagsRequest(a7));
    }
    async setTempChatBannedByTag(z6) {
        validate(setTempChatBannedByTagRule, z6, '', true);
        await this.core.sendCmd('v2SetTempChatBannedByTag', new SetTempChatBannedByTagRequest(z6));
    }
    async _updateChatroomInfo(x6) {
        const y6 = this.model.getChatroomInfo();
        if (y6) {
            assign(y6, x6);
            this.model.setChatroomInfo(y6);
        }
        else {
            await this.getChatroomInfoAsync();
        }
        return this.model.getChatroomInfo();
    }
    async getChatroomInfoAsync() {
        const v6 = (await this.core.sendCmd('v2GetChatroomInfo'));
        const w6 = get(v6.content, "data");
        this.setChatroomInfo(w6);
    }
    setChatroomInfo(u6) {
        this.model.setChatroomInfo(u6);
    }
}
