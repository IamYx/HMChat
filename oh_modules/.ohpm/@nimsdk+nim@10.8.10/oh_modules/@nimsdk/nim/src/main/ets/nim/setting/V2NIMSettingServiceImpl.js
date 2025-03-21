import { cmdConfigSetting, cmdMapSetting, registerParser, V2NIMConversationType, V2NIMErrorCode, V2NIMErrorImpl, V2NIMP2PMessageMuteMode, V2NIMTeamMessageMuteMode, V2NIMTeamType, V2Service, validate, checkStubServiceErrorCode } from '@nimsdk/base';
import { registerAspect } from './Aspect';
import { muteModeRules, setDndConfigRule, setP2PMessageMuteModeRule, teamIdRules, teamTypeRules } from './Rules';
import { SettingAbilityLifecycleCallback } from './setting/SettingAbilityLifecycleCallback';
import { SettingCloud } from './setting/SettingCloud';
import { SettingModel } from './setting/SettingModel';
import HashMap from "@ohos.util.HashMap";
const TAG = '[SettingService]';
export default class V2NIMSettingServiceImpl extends V2Service {
    constructor(d111, e111, f111) {
        super(e111, d111);
        this.lifecycleId = -1;
        this.isForeground = undefined;
        this.currentApplication = this.core.context.getApplicationContext();
        this.p2pMessageMuteModeChangeHandler = async (g111, h111) => {
            this.emit('onP2PMessageMuteModeChanged', g111, h111);
            this.core.userService.v2ISetAccountMuteMode(g111, h111);
            const i111 = this.core.conversationIdUtil.p2pConversationId(g111);
            const j111 = h111 === V2NIMP2PMessageMuteMode.V2NIM_P2P_MESSAGE_MUTE_MODE_ON;
            this.core.eventBus.emit('V2NIMConversationService/setMute', i111, j111);
            try {
                await this.core.localConversationService.onConversationSetMute(i111, j111);
            }
            catch (k111) {
                checkStubServiceErrorCode(k111);
            }
        };
        registerParser(d111, {
            cmdMap: cmdMapSetting, cmdConfig: cmdConfigSetting
        });
        this.setListener();
        registerAspect(V2NIMSettingServiceImpl, d111);
    }
    get cloud() {
        if (this._cloud) {
            return this._cloud;
        }
        else {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: {
                    reason: 'V2NIMSettingService cloud is unavailable'
                }
            });
        }
    }
    get model() {
        if (this._model) {
            return this._model;
        }
        else {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: {
                    reason: 'V2NIMSettingService model is unavailable'
                }
            });
        }
    }
    async onLoginStart(b111) {
        try {
            this.core.logger.info(TAG, 'onLoginStart', b111);
            this.registerInnerService(this.core);
            this.registerAbilityLifecycleCallbacks();
        }
        catch (c111) {
            this.core.logger.error(TAG, 'onLoginStart', c111);
        }
    }
    async onLoginFinished(a111) {
        this.core.logger.info(TAG, 'onLoginFinished', a111);
    }
    onLogout() {
        this.core.logger.info(TAG, 'onLogout');
        this.unRegisterInnerService();
        this.unregisterAbilityLifecycleCallbacks();
    }
    async getConversationMuteStatus(z110) {
        this.core.logger.info(TAG, 'call API getConversationMuteStatus', z110);
        return await this.v2IGetConversationMuteStatus(z110);
    }
    async setTeamMessageMuteMode(w110, x110, y110) {
        this.core.logger.info(TAG, 'call API setTeamMessageMuteMode', w110, x110, y110);
        return await this.v2ISetTeamMessageMuteMode(w110, x110, y110);
    }
    async getTeamMessageMuteMode(u110, v110) {
        this.core.logger.info(TAG, 'call API getTeamMessageMuteMode', u110, v110);
        return await this.v2IGetTeamMessageMuteMode(u110, v110);
    }
    async setP2PMessageMuteMode(s110, t110) {
        this.core.logger.info(TAG, 'call API setP2PMessageMuteMode', s110, t110);
        return await this.v2ISetP2PMessageMuteMode(s110, t110);
    }
    async getP2PMessageMuteMode(r110) {
        this.core.logger.info(TAG, 'call API getP2PMessageMuteMode', r110);
        return await this.v2IGetP2PMessageMuteMode(r110);
    }
    async getP2PMessageMuteList() {
        this.core.logger.info(TAG, 'call API getP2PMessageMuteList');
        return await this.v2IGetP2PMessageMuteList();
    }
    async setPushMobileOnDesktopOnline(q110) {
        this.core.logger.info(TAG, 'call API setPushMobileOnDesktopOnline', q110);
        return await this.v2ISetPushMobileOnDesktopOnline(q110);
    }
    async setDndConfig(p110) {
        this.core.logger.info(TAG, 'call API setDndConfig', p110);
        return await this.v2ISetDndConfig(p110);
    }
    async getDndConfig() {
        this.core.logger.info(TAG, 'call API getDndConfig');
        return await this.v2IGetDndConfig();
    }
    setListener() {
        this.core.eventBus.on('V2NIMSettingService/updateBits', (m110, n110, o110) => {
            this.emit('onTeamMessageMuteModeChanged', m110, n110, o110);
        });
        this.core.eventBus.on('V2NIMUserService/updateMuteList', this.p2pMessageMuteModeChangeHandler);
    }
    async v2IGetConversationMuteStatus(g110) {
        try {
            if (typeof g110 !== 'string') {
                return false;
            }
            const i110 = this.core.conversationIdUtil.parseConversationType(g110);
            const j110 = this.core.conversationIdUtil.parseConversationTargetId(g110);
            if (i110 === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM) {
                const l110 = await this.v2IGetTeamMessageMuteMode(j110, V2NIMTeamType.V2NIM_TEAM_TYPE_SUPER);
                return l110 !== V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF;
            }
            else if (i110 === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM) {
                const k110 = await this.v2IGetTeamMessageMuteMode(j110, V2NIMTeamType.V2NIM_TEAM_TYPE_NORMAL);
                return k110 !== V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF;
            }
            else if (i110 === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P) {
                return await this.core.userService.v2IIsMute(j110);
            }
            return false;
        }
        catch (h110) {
            this.core.logger.error(TAG, 'getConversationMuteStatus', h110);
            if (h110 instanceof V2NIMErrorImpl || h110.name === 'V2NIMError') {
                throw h110;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `getConversationMuteStatus ${JSON.stringify(h110)}`, rawError: h110
                    }
                });
            }
        }
    }
    async v2IGetConversationMuteStatusBatch(b110, c110) {
        switch (c110) {
            case V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P:
                const d110 = await this.core.userService.v2IIsMuteBatch(b110);
                return d110;
            case V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM:
                const e110 = await this.v2IGetTeamMessageMuteModeBatch(b110, V2NIMTeamType.V2NIM_TEAM_TYPE_NORMAL);
                return e110;
            case V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM:
                const f110 = await this.v2IGetTeamMessageMuteModeBatch(b110, V2NIMTeamType.V2NIM_TEAM_TYPE_SUPER);
                return f110;
            default:
                return new HashMap();
        }
    }
    async v2ISetTeamMessageMuteMode(x109, y109, z109) {
        try {
            validate(teamIdRules, {
                teamId: x109
            }, '', true);
            validate(teamTypeRules, {
                teamType: y109
            }, '', true);
            validate(muteModeRules, {
                muteMode: z109
            }, '', true);
            await this.cloud.setTeamMessageMuteMode(x109, y109, this.core.account, z109);
            await this.core.teamService.v2IUpdateTeamMemberBits(x109, y109, this.core.account, z109);
            this.emit('onTeamMessageMuteModeChanged', x109, y109, z109);
        }
        catch (a110) {
            this.core.logger.error(TAG, 'setTeamMessageMuteMode', a110);
            if (a110 instanceof V2NIMErrorImpl || a110.name === 'V2NIMError') {
                throw a110;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `setTeamMessageMuteMode ${JSON.stringify(a110)}`, rawError: a110
                    }
                });
            }
        }
    }
    async v2IGetTeamMessageMuteMode(u109, v109) {
        try {
            if (!(typeof u109 === 'string' && typeof v109 === 'number')) {
                return 0;
            }
            return await this.core.teamService.v2IGetTeamMessageMuteMode(u109, v109);
        }
        catch (w109) {
            this.core.logger.error(TAG, 'getTeamMessageMuteMode', w109);
            if (w109 instanceof V2NIMErrorImpl || w109.name === 'V2NIMError') {
                throw w109;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `getTeamMessageMuteMode ${JSON.stringify(w109)}`, rawError: w109
                    }
                });
            }
        }
    }
    async v2IGetTeamMessageMuteModeBatch(o109, p109) {
        const q109 = await this.core.teamService.v2IGetTeamMessageMuteModeBatch(o109, p109);
        const r109 = new HashMap();
        for (const s109 of q109.keys()) {
            const t109 = q109.get(s109);
            r109.set(s109, t109 !== V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF);
        }
        return r109;
    }
    async v2ISetP2PMessageMuteMode(l109, m109) {
        try {
            validate(setP2PMessageMuteModeRule, { accountId: l109, muteMode: m109 }, '', true);
            if (l109 === this.core.account) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER
                });
            }
            await this.cloud.setP2PMessageMuteMode(l109, m109);
            await this.p2pMessageMuteModeChangeHandler(l109, m109);
        }
        catch (n109) {
            this.core.logger.error(TAG, 'setP2PMessageMuteMode', n109);
            if (n109 instanceof V2NIMErrorImpl || n109.name === 'V2NIMError') {
                throw n109;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `setP2PMessageMuteMode ${JSON.stringify(n109)}`, rawError: n109
                    }
                });
            }
        }
    }
    async v2IGetP2PMessageMuteMode(j109) {
        try {
            validate({ accountId: { type: 'string', required: true, allowEmpty: false } }, { accountId: j109 }, '', true);
            return await this.core.userService.v2IIsMute(j109) ?
                V2NIMP2PMessageMuteMode.V2NIM_P2P_MESSAGE_MUTE_MODE_ON : V2NIMP2PMessageMuteMode.V2NIM_P2P_MESSAGE_MUTE_MODE_OFF;
        }
        catch (k109) {
            this.core.logger.error(TAG, 'getP2PMessageMuteMode', k109);
            if (k109 instanceof V2NIMErrorImpl || k109.name === 'V2NIMError') {
                throw k109;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `getP2PMessageMuteMode ${JSON.stringify(k109)}`, rawError: k109
                    }
                });
            }
        }
    }
    async v2IGetP2PMessageMuteList() {
        try {
            const i109 = await this.core.userService.v2IGetMuteList();
            return i109;
        }
        catch (h109) {
            this.core.logger.error(TAG, 'getP2PMessageMuteList', h109);
            if (h109 instanceof V2NIMErrorImpl || h109.name === 'V2NIMError') {
                throw h109;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `getP2PMessageMuteList ${JSON.stringify(h109)}`, rawError: h109
                    }
                });
            }
        }
    }
    async v2ISetPushMobileOnDesktopOnline(f109) {
        try {
            validate({ need: { type: 'boolean', required: false } }, { need: f109 }, '', true);
            return await this.cloud.setPushMobileOnDesktopOnline(f109);
        }
        catch (g109) {
            this.core.logger.error(TAG, 'setPushMobileOnDesktopOnline', g109);
            if (g109 instanceof V2NIMErrorImpl || g109.name === 'V2NIMError') {
                throw g109;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `setPushMobileOnDesktopOnline ${JSON.stringify(g109)}`, rawError: g109
                    }
                });
            }
        }
    }
    async v2ISetDndConfig(d109) {
        try {
            validate({ config: { type: 'object', required: true } }, { config: d109 }, '', true);
            validate(setDndConfigRule, d109, '', true);
            if (typeof d109.fromH !== 'undefined') {
                d109.fromH = isNaN(d109.fromH) ? 0 : d109.fromH;
            }
            if (typeof d109.toH !== 'undefined') {
                d109.toH = isNaN(d109.toH) ? 0 : d109.toH;
            }
            if (typeof d109.fromM !== 'undefined') {
                d109.fromM = isNaN(d109.fromM) ? 0 : d109.fromM;
            }
            if (typeof d109.toM !== 'undefined') {
                d109.toM = isNaN(d109.toM) ? 0 : d109.toM;
            }
            await this.cloud.setDndConfig(d109);
            await this.model.saveDndConfig(d109);
            return;
        }
        catch (e109) {
            this.core.logger.error(TAG, `setDndConfig`, e109);
            if (e109 instanceof V2NIMErrorImpl || e109.name === 'V2NIMError') {
                throw e109;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `setDndConfig ${e109}`, rawError: e109
                    }
                });
            }
        }
    }
    async v2IGetDndConfig() {
        try {
            return await this.model.queryDndConfig();
        }
        catch (c109) {
            this.core.logger.error(TAG, `getDndConfig`, c109);
            if (c109 instanceof V2NIMErrorImpl || c109.name === 'V2NIMError') {
                throw c109;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `getDndConfig ${c109}`, rawError: c109
                    }
                });
            }
        }
    }
    async setAppBackground(a109, b109) {
        this.core.logger.info(TAG, `setAppBackground, isBackground: ${a109} , badge: ${b109}`);
        validate({
            isBackground: {
                type: 'boolean'
            },
            badge: {
                type: 'number', required: false
            }
        }, {
            isBackground: a109,
            badge: b109
        }, '', true);
        await this.cloud.setAppBackground(a109, b109);
        this.core.logger.info(TAG, `api calling setAppBackground, success`);
        return;
    }
    registerInnerService(z108) {
        this._cloud = new SettingCloud(z108);
        this._model = new SettingModel(z108);
    }
    unRegisterInnerService() {
        this._cloud = undefined;
        this._model = undefined;
    }
    unregisterAbilityLifecycleCallbacks() {
        if (this.lifecycleId < 0) {
            return;
        }
        try {
            this.currentApplication.off('abilityLifecycle', this.lifecycleId, (x108, y108) => {
                if (x108) {
                    this.core.logger.error(TAG, `unregisterAbilityLifecycleCallback fail, err`, x108);
                }
                else {
                    this.core.logger.info(TAG, 'unregisterAbilityLifecycleCallback success, data', y108);
                }
            });
        }
        catch (w108) {
            this.core.logger.error(TAG, `error: ${w108.code}, ${w108.message}`);
        }
        this.lifecycleId = -1;
    }
    registerAbilityLifecycleCallbacks() {
        if (this.lifecycleId >= 0) {
            this.unregisterAbilityLifecycleCallbacks();
        }
        try {
            this.lifecycleId = this.currentApplication.on('abilityLifecycle', new SettingAbilityLifecycleCallback(this));
        }
        catch (v108) {
            this.core.logger.error(TAG, `error: ${v108.code}, ${v108.message}`);
        }
        this.core.logger.info(TAG, `registerAbilityLifecycleCallback lifecycleId: ${this.lifecycleId}`);
    }
    v2IGetIsForeground() {
        return this.isForeground;
    }
}
