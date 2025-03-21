import common from '@ohos.app.ability.common'
import { NIMSdk, V2NIMNotificationServiceImpl, V2NIMSettingServiceImpl } from '@nimsdk/nim'
import { LogLevel, NIMInitializeOptions, NIMInterface, NIMServiceOptions, V2NIMProvidedServiceType } from '@nimsdk/base'
import { V2NIMTeamServiceImpl } from '@nimsdk/team';
import { V2NIMClientAntispamUtil, V2NIMMessageServiceImpl } from '@nimsdk/message';
// import { V2NIMConversationServiceImpl } from '@nimsdk/conversation';
// import { V2NIMConversationGroupServiceImpl } from '@nimsdk/conversationgroup';
import { V2NIMUserServiceImpl } from '@nimsdk/user';
import { V2NIMFriendServiceImpl } from '@nimsdk/friend';
import { V2NIMSignallingServiceImpl } from '@nimsdk/signalling';
import { V2NIMLocalConversationServiceImpl } from '@nimsdk/localconversation';

const USER_MODEL = 'userModel';

export class NimRepository {
  private _context: common.Context
  private _nim: NIMInterface | undefined

  public static getInstance(context: common.Context): NimRepository {
    if (!AppStorage.get<NimRepository>(USER_MODEL)) {
      AppStorage.setOrCreate(USER_MODEL, new NimRepository(context));
    }
    return AppStorage.get<NimRepository>(USER_MODEL) as NimRepository;
  }

  public get nim(): NIMInterface {
    if (!this._nim) {
      this.createDefaultNim(this._context)
    }

    return this._nim!
  }

  constructor(context: common.Context) {
    this._context = context
  }

  createDefaultNim(context: common.Context) {
    console.warn('------------- 创建NIM实例 --------------')

    // let initializeOptions: NIMInitializeOptions = {
    //   appkey: "fe416640c8e8a72734219e1847ad2547",
    //   debugLevel: "debug",
    //   // ...其他属性
    // };
    //
    // let serviceOptions: NIMServiceOptions = {
    //   loginServiceConfig: {
    //     lbsUrls: ['https://imtest.netease.im/lbs/webconf'],
    //     linkUrl: 'imtest-jd.netease.im:8091'
    //   }
    // }

    let initializeOptions: NIMInitializeOptions = {
      appkey: "4727023efa991d31d61b3b32e819bd5b",
      logLevel: LogLevel.Debug,
      // ...其他属性
    };

    let serviceOptions: NIMServiceOptions = {
      loginServiceConfig: {
        lbsUrls: ['https://lbs.netease.im/lbs/webconf.jsp'],
        linkUrl: 'weblink.netease.im:443'
      }
    }

    // this._nim = NIMSdk.newInstance(context, initializeOptions, serviceOptions)
    // console.log("nim from createDefaultNim: " + this._nim)
    this.initNim(initializeOptions, serviceOptions)
  }

  initNim(initializeOptions: NIMInitializeOptions, serviceOptions?: NIMServiceOptions) {
    NIMSdk.registerCustomServices(V2NIMProvidedServiceType.V2NIM_PROVIDED_SERVICE_TEAM, (core, serviceName, serviceConfig) => new V2NIMTeamServiceImpl(core, serviceName, serviceConfig))
    NIMSdk.registerCustomServices(V2NIMProvidedServiceType.V2NIM_PROVIDED_SERVICE_CLIENT_ANTISPAM_UTIL, (core, serviceName, serviceConfig) => new V2NIMClientAntispamUtil(core, serviceName, serviceConfig));
    // NIMSdk.registerCustomServices(V2NIMProvidedServiceType.V2NIM_PROVIDED_SERVICE_CONVERSATION, (core, serviceName, serviceConfig) => new V2NIMConversationServiceImpl(core, serviceName, serviceConfig));
    NIMSdk.registerCustomServices(V2NIMProvidedServiceType.V2NIM_PROVIDED_SERVICE_LOCAL_CONVERSATION, (core, serviceName, serviceConfig) => new V2NIMLocalConversationServiceImpl(core, serviceName, serviceConfig))
    // NIMSdk.registerCustomServices(V2NIMProvidedServiceType.V2NIM_PROVIDED_SERVICE_CONVERSATION_GROUP, (core, serviceName, serviceConfig) => new V2NIMConversationGroupServiceImpl(core, serviceName, serviceConfig));
    NIMSdk.registerCustomServices(V2NIMProvidedServiceType.V2NIM_PROVIDED_SERVICE_MESSAGE, (core, serviceName, serviceConfig) => new V2NIMMessageServiceImpl(core, serviceName, serviceConfig));
    NIMSdk.registerCustomServices(V2NIMProvidedServiceType.V2NIM_PROVIDED_SERVICE_USER, (core, serviceName, serviceConfig) => new V2NIMUserServiceImpl(core, serviceName, serviceConfig));
    NIMSdk.registerCustomServices(V2NIMProvidedServiceType.V2NIM_PROVIDED_SERVICE_FRIEND, (core, serviceName, serviceConfig) => new V2NIMFriendServiceImpl(core, serviceName, serviceConfig));
    NIMSdk.registerCustomServices(V2NIMProvidedServiceType.V2NIM_PROVIDED_SERVICE_SIGNALLING, (core, serviceName, serviceConfig) => new V2NIMSignallingServiceImpl(core, serviceName, serviceConfig))
    this._nim = NIMSdk.newInstance(this._context, initializeOptions, serviceOptions)
    console.log("nim from initNim: " + this._nim)
  }
}