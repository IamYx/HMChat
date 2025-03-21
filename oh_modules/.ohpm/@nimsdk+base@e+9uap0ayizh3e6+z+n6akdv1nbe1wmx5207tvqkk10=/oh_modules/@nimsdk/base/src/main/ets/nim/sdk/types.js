export const NIMServiceNames = [
    'loginService',
    'databaseService',
    'syncService',
    'notificationService',
    'messageService',
    'conversationService',
    'localConversationService',
    'conversationGroupService',
    'clientAntispamUtil',
    'teamService',
    'userService',
    'friendService',
    'settingService',
    'pushService',
    'httpService',
    'storageService',
    'storageUtil',
    'signallingService',
    'ysfService',
    'abtService',
    'reporterService',
    'subscriptionService',
    'frequencyService',
    'passthroughService',
    'aiService',
    'searchService',
    'messageCreator',
    'attachmentCreator',
    'messageConverter',
    'ntp'
];
export var V2NIMDisconnectReason;
(function (V2NIMDisconnectReason) {
    V2NIMDisconnectReason["Destroy"] = "destroy";
    V2NIMDisconnectReason["Logout"] = "logout";
})(V2NIMDisconnectReason || (V2NIMDisconnectReason = {}));
export var V2NIMProtocolFamily;
(function (V2NIMProtocolFamily) {
    V2NIMProtocolFamily[V2NIMProtocolFamily["IPV4"] = 0] = "IPV4";
    V2NIMProtocolFamily[V2NIMProtocolFamily["IPV6"] = 1] = "IPV6";
    V2NIMProtocolFamily[V2NIMProtocolFamily["DUAL_STACK"] = 2] = "DUAL_STACK";
})(V2NIMProtocolFamily || (V2NIMProtocolFamily = {}));
