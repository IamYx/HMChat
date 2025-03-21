export const NIMChatroomServiceNames = [
    'loginService',
    'localAntispamUtil',
    'storageService',
    'messageService',
    'messageCreator',
    'queueService',
    'infoService',
    'memberService',
    'chatroomService',
    'httpService',
];
export var V2NIMChatroomMemberRole;
(function (g) {
    g[g["V2NIM_CHATROOM_MEMBER_ROLE_NORMAL"] = 0] = "V2NIM_CHATROOM_MEMBER_ROLE_NORMAL";
    g[g["V2NIM_CHATROOM_MEMBER_ROLE_CREATOR"] = 1] = "V2NIM_CHATROOM_MEMBER_ROLE_CREATOR";
    g[g["V2NIM_CHATROOM_MEMBER_ROLE_MANAGER"] = 2] = "V2NIM_CHATROOM_MEMBER_ROLE_MANAGER";
    g[g["V2NIM_CHATROOM_MEMBER_ROLE_NORMAL_GUEST"] = 3] = "V2NIM_CHATROOM_MEMBER_ROLE_NORMAL_GUEST";
    g[g["V2NIM_CHATROOM_MEMBER_ROLE_ANONYMOUS_GUEST"] = 4] = "V2NIM_CHATROOM_MEMBER_ROLE_ANONYMOUS_GUEST";
    g[g["V2NIM_CHATROOM_MEMBER_ROLE_VIRTUAL"] = 5] = "V2NIM_CHATROOM_MEMBER_ROLE_VIRTUAL";
})(V2NIMChatroomMemberRole || (V2NIMChatroomMemberRole = {}));
export var V2NIMChatroomMessageNotificationType;
(function (f) {
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_ENTER"] = 0] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_ENTER";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_EXIT"] = 1] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_EXIT";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_BLOCK_ADDED"] = 2] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_BLOCK_ADDED";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_BLOCK_REMOVED"] = 3] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_BLOCK_REMOVED";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_CHAT_BANNED_ADDED"] = 4] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_CHAT_BANNED_ADDED";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_CHAT_BANNED_REMOVED"] = 5] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_CHAT_BANNED_REMOVED";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_ROOM_INFO_UPDATED"] = 6] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_ROOM_INFO_UPDATED";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_KICKED"] = 7] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_KICKED";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_TEMP_CHAT_BANNED_ADDED"] = 8] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_TEMP_CHAT_BANNED_ADDED";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_TEMP_CHAT_BANNED_REMOVED"] = 9] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_TEMP_CHAT_BANNED_REMOVED";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_INFO_UPDATED"] = 10] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_INFO_UPDATED";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_QUEUE_CHANGE"] = 11] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_QUEUE_CHANGE";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_CHAT_BANNED"] = 12] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_CHAT_BANNED";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_CHAT_BANNED_REMOVED"] = 13] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_CHAT_BANNED_REMOVED";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_ADDED"] = 14] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_ADDED";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_REMOVED"] = 15] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_REMOVED";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MESSAGE_REVOKE"] = 16] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MESSAGE_REVOKE";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAGS_UPDATE"] = 17] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAGS_UPDATE";
    f[f["V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_ROLE_UPDATE"] = 18] = "V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_ROLE_UPDATE";
})(V2NIMChatroomMessageNotificationType || (V2NIMChatroomMessageNotificationType = {}));
