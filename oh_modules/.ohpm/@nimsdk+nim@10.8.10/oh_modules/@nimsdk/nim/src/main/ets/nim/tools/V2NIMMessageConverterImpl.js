import { deserialize, messageTag, messageTagInverted, serialize, V2NIMConversationType, V2NIMMessageSendingState, V2NIMMessageType, V2Service } from '@nimsdk/base';
const TAG = '[V2NIMMessageConverterImpl]';
export default class V2NIMMessageConverterImpl extends V2Service {
    constructor(i149, j149, k149) {
        super(j149, i149);
        i149.messageConverter = this;
    }
    messageSerialization(g149) {
        if (!g149) {
            return null;
        }
        if (typeof g149.createTime !== 'number' || g149.createTime < 0) {
            g149.createTime = 0;
        }
        if (typeof g149.conversationType !== 'number' || g149.conversationType > 3 || g149.conversationType < 0) {
            g149.conversationType = V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P;
        }
        const h149 = serialize(g149, messageTag);
        return JSON.stringify(h149);
    }
    messageDeserialization(c149) {
        if (!c149) {
            return null;
        }
        try {
            const e149 = JSON.parse(c149);
            const f149 = deserialize(e149, messageTagInverted);
            f149.sendingState = V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_UNKNOWN;
            if (f149.conversationType === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P &&
                (f149.senderId === this.core.account || f149.receiverId === this.core.account)) {
                f149.conversationId =
                    this.core.conversationIdUtil.p2pConversationId(f149.senderId === this.core.account ? f149.receiverId :
                        f149.senderId);
            }
            else if (f149.conversationType === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM) {
                f149.conversationId = this.core.conversationIdUtil.teamConversationId(f149.receiverId);
            }
            else if (f149.conversationType === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM) {
                f149.conversationId = this.core.conversationIdUtil.superTeamConversationId(f149.receiverId);
            }
            f149.senderId === this.core.account ? f149.isSelf = true :
                f149.isSelf = false;
            if (f149.threadReply) {
                f149.threadReply.conversationType = f149.conversationType;
                f149.threadReply = completeMessageRefer(this.core, f149.threadReply);
            }
            if (f149.threadRoot) {
                f149.threadRoot.conversationType = f149.conversationType;
                f149.threadRoot = completeMessageRefer(this.core, f149.threadRoot);
            }
            if (![
                V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P,
                V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM,
                V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM,
                V2NIMConversationType.V2NIM_CONVERSATION_TYPE_UNKNOWN
            ].includes(f149.conversationType)) {
                this.core.logger.error(TAG, 'invalid conversationType(enum)', f149.conversationType);
            }
            if (f149.senderId && typeof f149.senderId !== 'string') {
                this.core.logger.error(TAG, 'invalid senderId(string)', f149.senderId);
            }
            if (f149.receiverId && typeof f149.receiverId !== 'string') {
                this.core.logger.error(TAG, 'invalid receiverId(string)', f149.receiverId);
            }
            if ('createTime' in f149 && isNaN(f149.createTime)) {
                this.core.logger.error(TAG, 'invalid createTime(number)', f149.createTime);
            }
            if (![
                V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO,
                V2NIMMessageType.V2NIM_MESSAGE_TYPE_AVCHAT,
                V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL,
                V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM,
                V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE,
                V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE,
                V2NIMMessageType.V2NIM_MESSAGE_TYPE_INVALID,
                V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION,
                V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION,
                V2NIMMessageType.V2NIM_MESSAGE_TYPE_ROBOT,
                V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT,
                V2NIMMessageType.V2NIM_MESSAGE_TYPE_TIPS,
                V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO
            ].includes(f149.messageType)) {
                this.core.logger.error(TAG, 'invalid messageType(enum)', f149.messageType);
            }
            if ('subType' in f149 && isNaN(f149.subType)) {
                this.core.logger.error(TAG, 'subType(number', f149.subType);
            }
            if (f149.messageClientId && typeof f149.messageClientId !== 'string') {
                this.core.logger.error(TAG, 'messageClientId(string', f149.messageClientId);
            }
            if (f149.messageServerId && typeof f149.messageServerId !== 'string') {
                this.core.logger.error(TAG, 'messageServerId(string', f149.messageServerId);
            }
            if (f149.attachment && typeof f149.attachment !== 'object') {
                this.core.logger.error(TAG, 'attachment(object)', f149.attachment);
            }
            if (f149.text && typeof f149.text !== 'string') {
                this.core.logger.error(TAG, 'text(string)', f149.text);
            }
            if (f149.serverExtension && typeof f149.serverExtension !== 'string') {
                this.core.logger.error(TAG, 'serverExtension(string', f149.serverExtension);
            }
            if (f149.callbackExtension && typeof f149.callbackExtension !== 'string') {
                this.core.logger.error(TAG, 'callbackExtension(string)', f149.callbackExtension);
            }
            if (f149.pushConfig?.pushContent && typeof f149.pushConfig.pushContent !== 'string') {
                this.core.logger.error(TAG, 'pushContent(string)', f149.pushConfig.pushContent);
            }
            if (f149.pushConfig?.pushPayload && typeof f149.pushConfig.pushPayload !== 'string') {
                this.core.logger.error(TAG, 'pushPayload(string)', f149.pushConfig.pushPayload);
            }
            if (f149.pushConfig?.forcePushContent && typeof f149.pushConfig.forcePushContent !== 'string') {
                this.core.logger.error(TAG, 'forcePushContent(string)', f149.pushConfig.forcePushContent);
            }
            if (f149.pushConfig?.forcePushAccountIds && !Array.isArray(f149.pushConfig.forcePushAccountIds)) {
                this.core.logger.error(TAG, 'forcePushAccountIds(array)', f149.pushConfig.forcePushAccountIds);
            }
            if (f149.routeConfig?.routeEnvironment && typeof f149.routeConfig.routeEnvironment !== 'string') {
                this.core.logger.error(TAG, 'routeEnvironment(string)', f149.routeConfig.routeEnvironment);
            }
            if (f149.antispamConfig?.antispamBusinessId && typeof f149.antispamConfig.antispamBusinessId !== 'string') {
                this.core.logger.error(TAG, 'antispamBusinessId(string)', f149.antispamConfig.antispamBusinessId);
            }
            if (f149.antispamConfig?.antispamCustomMessage &&
                typeof f149.antispamConfig.antispamCustomMessage !== 'string') {
                this.core.logger.error(TAG, 'antispamCustomMessage(string)', f149.antispamConfig.antispamCustomMessage);
            }
            if (f149.antispamConfig?.antispamCheating && typeof f149.antispamConfig.antispamCheating !== 'string') {
                this.core.logger.error(TAG, 'antispamCheating(string)', f149.antispamConfig.antispamCheating);
            }
            if (f149.antispamConfig?.antispamExtension && typeof f149.antispamConfig.antispamExtension !== 'string') {
                this.core.logger.error(TAG, 'antispamExtension(string)', f149.antispamConfig.antispamExtension);
            }
            if (f149.robotConfig?.accountId && typeof f149.robotConfig.accountId !== 'string') {
                this.core.logger.error(TAG, 'accountId(string)', f149.robotConfig.accountId);
            }
            if (f149.robotConfig?.topic && typeof f149.robotConfig.topic !== 'string') {
                this.core.logger.error(TAG, 'topic(string)', f149.robotConfig.topic);
            }
            if (f149.robotConfig?.function && typeof f149.robotConfig.function !== 'string') {
                this.core.logger.error(TAG, 'function(string)', f149.robotConfig.function);
            }
            if (f149.robotConfig?.customContent && typeof f149.robotConfig.customContent !== 'string') {
                this.core.logger.error(TAG, 'customContent(string)', f149.robotConfig.customContent);
            }
            if (f149.threadRoot?.senderId && typeof f149.threadRoot.senderId !== 'string') {
                this.core.logger.error(TAG, 'senderId(string)', f149.threadRoot.senderId);
            }
            if (f149.threadRoot?.receiverId && typeof f149.threadRoot.receiverId !== 'string') {
                this.core.logger.error(TAG, 'receiverId(string)', f149.threadRoot.receiverId);
            }
            if (f149.threadRoot?.messageClientId && typeof f149.threadRoot.messageClientId !== 'string') {
                this.core.logger.error(TAG, 'messageClientId(string)', f149.threadRoot.messageClientId);
            }
            if (f149.threadRoot?.messageServerId && typeof f149.threadRoot.messageServerId !== 'string') {
                this.core.logger.error(TAG, 'messageServerId(string)', f149.threadRoot.messageServerId);
            }
            if (f149.threadRoot && 'createTime' in f149.threadRoot && isNaN(f149.threadRoot.createTime)) {
                this.core.logger.error(TAG, 'createTime(number)', f149.threadRoot.createTime);
            }
            if (f149.threadRoot &&
                ![
                    V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P,
                    V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM,
                    V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM,
                    V2NIMConversationType.V2NIM_CONVERSATION_TYPE_UNKNOWN
                ].includes(f149.threadRoot.conversationType)) {
                this.core.logger.error(TAG, 'conversationType(enum)', f149.threadRoot.conversationType);
            }
            if (f149.threadRoot?.conversationId && typeof f149.threadRoot.conversationId !== 'string') {
                this.core.logger.error(TAG, 'conversationId(string)', f149.threadRoot.conversationId);
            }
            if (f149.threadReply?.senderId && typeof f149.threadReply.senderId !== 'string') {
                this.core.logger.error(TAG, 'senderId(string)', f149.threadReply.senderId);
            }
            if (f149.threadReply?.receiverId && typeof f149.threadReply.receiverId !== 'string') {
                this.core.logger.error(TAG, 'receiverId(string)', f149.threadReply.receiverId);
            }
            if (f149.threadReply?.messageClientId && typeof f149.threadReply.messageClientId !== 'string') {
                this.core.logger.error(TAG, 'messageClientId(string)', f149.threadReply.messageClientId);
            }
            if (f149.threadReply?.messageServerId && typeof f149.threadReply.messageServerId !== 'string') {
                this.core.logger.error(TAG, 'messageServerId(string)', f149.threadReply.messageServerId);
            }
            if (f149.threadReply && 'createTime' in f149.threadReply && isNaN(f149.threadReply.createTime)) {
                this.core.logger.error(TAG, 'createTime(number)', f149.threadReply.createTime);
            }
            if (f149.threadReply &&
                ![
                    V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P,
                    V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM,
                    V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM,
                    V2NIMConversationType.V2NIM_CONVERSATION_TYPE_UNKNOWN
                ].includes(f149.threadReply.conversationType)) {
                this.core.logger.error(TAG, 'conversationType(enum)', f149.threadReply.conversationType);
            }
            if (f149.threadReply?.conversationId && typeof f149.threadReply.conversationId !== 'string') {
                this.core.logger.error(TAG, 'conversationId(string)', f149.threadReply.conversationId);
            }
            delete f149.__clientExt;
            delete f149.userUpdateTime;
            return f149;
        }
        catch (d149) {
            this.core.logger.error(TAG, 'message string', c149);
            return null;
        }
    }
}
export function completeMessageRefer(a149, b149) {
    return {
        ...b149,
        conversationId: a149.conversationIdUtil.messageConversationId(b149.conversationType, b149.senderId, b149.receiverId)
    };
}
