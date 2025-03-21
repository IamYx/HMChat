import { NIM, V2NIMErrorCode, V2NIMErrorImpl } from '@nimsdk/base';
import { ABTestServiceImpl } from './abtest/ABTestServiceImpl';
import { V2NIMAIServiceImpl } from './ai/V2NIMAIServiceImpl';
import V2NIMClientAntispamUtil from './antispam/V2NIMClientAntispamUtil';
import { V2NIMDatabaseServiceImpl } from './database/V2NIMDatabaseServiceImpl';
import { FrequencyServiceImpl } from './frequency/FrequencyServiceImpl';
import { V2NIMHttpServiceImpl } from './http/V2NIMHttpServiceImpl';
import { LoggerServiceImpl } from './logger/LoggerServiceImpl';
import V2NIMLoginServiceImpl from './login/V2NIMLoginServiceImpl';
import V2NIMNotificationServiceImpl from './notification/V2NIMNotificationServiceImpl';
import V2NIMPassthroughServiceImpl from './passthrough/V2NIMPassthroughServiceImpl';
import { V2NIMPushServiceImpl } from './push/V2NIMPushServiceImpl';
import { ReporterServiceImpl } from './repoter/ReporterServiceImpl';
import V2NIMSettingServiceImpl from './setting/V2NIMSettingServiceImpl';
import V2NIMStorageServiceImpl from './storage/V2NIMStorageServiceImpl';
import V2NIMStorageUtilImpl from './storage/V2NIMStorageUtilImpl';
import { V2NIMConversationGroupServiceStub } from './stubs/V2NIMConversationGroupServiceStub';
import { V2NIMConversationServiceStub } from './stubs/V2NIMConversationServiceStub';
import { V2NIMFriendServiceStub } from './stubs/V2NIMFriendServiceStub';
import { V2NIMLocalConversationServiceStub } from './stubs/V2NIMLocalConversationServiceStub';
import { V2NIMMessageServiceStub } from './stubs/V2NIMMessageServiceStub';
import { V2NIMSearchServiceStub } from './stubs/V2NIMSearchServiceStub';
import { V2NIMSignallingServiceStub } from './stubs/V2NIMSignallingServiceStub';
import { V2NIMTeamServiceStub } from './stubs/V2NIMTeamServiceStub';
import { V2NIMUserServiceStub } from './stubs/V2NIMUserServiceStub';
import { YSFServiceStub } from './stubs/YSFServiceStub';
import V2NIMSubscriptionServiceImpl from './subscribe/V2NIMSubscriptionServiceImpl';
import V2NIMSyncServiceImpl from './sync/V2NIMSyncServiceImpl';
import V2NIMMessageAttachmentCreatorImpl from './tools/V2NIMMessageAttachmentCreatorImpl';
import V2NIMMessageConverterImpl from './tools/V2NIMMessageConverterImpl';
import V2NIMMessageCreatorImpl from './tools/V2NIMMessageCreatorImpl';
import deviceInfo from "@ohos.deviceInfo";
import { NetBoost } from './boost/NetBoost';
import { NTPTimer } from './ntp/NTPTimer';
export class NIMSdk {
    static registerCustomServices(serviceType, creator) {
        if (isValueInProvidedService(serviceType)) {
            NIM.registerService(serviceType, creator);
        }
    }
    static newInstance(context, initializeOptions, serviceOptions = {}) {
        NIMSdk.registerCoreServices();
        NIMSdk.checkRegisteredCustomServices();
        if (typeof NIM.isRegisteredService("teamService") === 'undefined') {
            NIM.registerService("teamService", (core, serviceName, serviceConfig) => new V2NIMTeamServiceStub(core, serviceName, serviceConfig));
        }
        if (typeof NIM.isRegisteredService("messageService") === 'undefined') {
            NIM.registerService("messageService", (core, serviceName, serviceConfig) => new V2NIMMessageServiceStub(core, serviceName, serviceConfig));
        }
        if (typeof NIM.isRegisteredService("signallingService") === 'undefined') {
            NIM.registerService("signallingService", (core, serviceName, serviceConfig) => new V2NIMSignallingServiceStub(core, serviceName, serviceConfig));
        }
        if (typeof NIM.isRegisteredService("userService") === 'undefined') {
            NIM.registerService("userService", (core, serviceName, serviceConfig) => new V2NIMUserServiceStub(core, serviceName, serviceConfig));
        }
        if (typeof NIM.isRegisteredService("friendService") === 'undefined') {
            NIM.registerService("friendService", (core, serviceName, serviceConfig) => new V2NIMFriendServiceStub(core, serviceName, serviceConfig));
        }
        if (typeof NIM.isRegisteredService("localConversationService") ===
            'undefined') {
            NIM.registerService("localConversationService", (core, serviceName, serviceConfig) => new V2NIMLocalConversationServiceStub(core, serviceName, serviceConfig));
        }
        if (typeof NIM.isRegisteredService("conversationService") === 'undefined') {
            NIM.registerService("conversationService", (core, serviceName, serviceConfig) => new V2NIMConversationServiceStub(core, serviceName, serviceConfig));
            NIM.registerService("conversationGroupService", (core, serviceName, serviceConfig) => new V2NIMConversationGroupServiceStub(core, serviceName, serviceConfig));
        }
        if (typeof NIM.isRegisteredService("searchService") === 'undefined'
            || deviceInfo.abiList !== 'arm64-v8a') {
            NIM.registerService("searchService", (core, serviceName, serviceConfig) => new V2NIMSearchServiceStub(core, serviceName, serviceConfig));
        }
        if (typeof NIM.isRegisteredService("ysfService") === 'undefined') {
            NIM.registerService("ysfService", (core, serviceName, serviceConfig) => new YSFServiceStub(core, serviceName, serviceConfig));
        }
        const instance = new NIM(context, initializeOptions, serviceOptions);
        NIMSdk.instances.set(instance.id, instance);
        NetBoost.getInstance().logger = instance.logger;
        return instance;
    }
    static getInstance(id) {
        return NIMSdk.instances.get(id) || undefined;
    }
    static destroyInstance(id) {
        const instance = NIMSdk.instances.get(id);
        if (instance) {
            instance.destroy();
            NIMSdk.instances.delete(id);
            return true;
        }
        return false;
    }
    static destroy() {
        NIMSdk.instances.forEach((value, key) => {
            if (value) {
                value.destroy();
                NIMSdk.instances.delete(value.id);
            }
        });
    }
    static checkRegisteredCustomServices() {
        if (typeof NIM.isRegisteredService("conversationService") !== 'undefined' &&
            typeof NIM.isRegisteredService("localConversationService") !== 'undefined') {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
                desc: `It is not allowed to use 'conversation' & 'localconversation' at the same time!`
            });
        }
    }
    static registerCoreServices() {
        NIM.registerService('databaseService', (core, serviceName, serviceConfig) => new V2NIMDatabaseServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('abtService', (core, serviceName, serviceConfig) => new ABTestServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('reporterService', (core, serviceName, serviceConfig) => new ReporterServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('frequencyService', (core, serviceName, serviceConfig) => new FrequencyServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('storageService', (core, serviceName, serviceConfig) => new V2NIMStorageServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('storageUtil', (core, serviceName, serviceConfig) => new V2NIMStorageUtilImpl(core, serviceName, serviceConfig));
        NIM.registerService('messageCreator', (core, serviceName, serviceConfig) => new V2NIMMessageCreatorImpl(core, serviceName, serviceConfig));
        NIM.registerService('attachmentCreator', (core, serviceName, serviceConfig) => new V2NIMMessageAttachmentCreatorImpl(core, serviceName, serviceConfig));
        NIM.registerService('messageConverter', (core, serviceName, serviceConfig) => new V2NIMMessageConverterImpl(core, serviceName, serviceConfig));
        NIM.registerService('httpService', (core, serviceName, serviceConfig) => new V2NIMHttpServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('loginService', (core, serviceName, serviceConfig) => new V2NIMLoginServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('syncService', (core, serviceName, serviceConfig) => new V2NIMSyncServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('pushService', (core, serviceName, serviceConfig) => new V2NIMPushServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('notificationService', (core, serviceName, serviceConfig) => new V2NIMNotificationServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('passthroughService', (core, serviceName, serviceConfig) => new V2NIMPassthroughServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('settingService', (core, serviceName, serviceConfig) => new V2NIMSettingServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('subscriptionService', (core, serviceName, serviceConfig) => new V2NIMSubscriptionServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('aiService', (core, serviceName, serviceConfig) => new V2NIMAIServiceImpl(core, serviceName, serviceConfig));
        NIM.registerService('clientAntispamUtil', (core, serviceName, serviceConfig) => new V2NIMClientAntispamUtil(core, serviceName, serviceConfig));
        NIM.registerService('ntp', (core, serviceName, serviceConfig) => new NTPTimer(core, serviceName, serviceConfig));
        NIM.registerLogger('loggerService', (core, logLevel, isOpenConsoleLog) => new LoggerServiceImpl(core, logLevel, isOpenConsoleLog));
    }
}
NIMSdk.instances = new Map();
function isValueInProvidedService(value) {
    const enumMap = new Map([
        ["conversationService", true],
        ["localConversationService", true],
        ["messageService", true],
        ["teamService", true],
        ["userService", true],
        ["friendService", true],
        ["signallingService", true],
        ["ysfService", true],
        ["searchService", true]
    ]);
    return enumMap.has(value);
}
