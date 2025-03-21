import { guid, IMKVManager, Logger, TimerManager, V2NIMErrorCode, V2NIMErrorImpl, V2NIMLoginAuthType, validate } from '@nimsdk/base';
import { EventEmitter, get } from '@nimsdk/vendor';
import { CRHttpServiceImpl } from './services/http/CRHttpServiceImpl';
import { LoggerServiceImpl } from './services/utils/LoggerService';
import CRLoginServiceImpl from './services/login/CRLoginServiceImpl';
import CRLocalAntispamUtil from './services/antispam/CRLocalAntispamUtil';
import CRStorageServiceImpl from './services/storage/CRStorageServiceImpl';
import CRQueueServiceImpl from './services/queue/CRQueueServiceImpl';
import CRServiceImpl from './services/service/ChatroomServiceImpl';
import { getInstanceRule } from './services/rules';
import { chatroomLoginRules } from './services/login/rules';
import CRInfoServiceImpl from './services/Info/CRInfoServiceImpl';
import CRMemberServiceImpl from './services/member/CRMemberServiceImpl';
import { V2NIMChatroomStatus } from '../chatroom/sdk/V2NIMChatroomService';
import TimeOrigin from './services/utils/timeOrigin';
import CRMessageCreatorImpl from './services/message/creator/CRMessageCreatorImpl';
import CRMessageServiceImpl from './services/message/CRMessageServiceImpl';
import { CRBinaryClientSocketImpl } from './services/login/socket/CRBinaryClientSocketImpl';
let currInstanceId = 1;
const instanceMap = {};
export default class V2NIMChatroomClient extends EventEmitter {
    get id() {
        return this._id;
    }
    getWorkerId() {
        return `Chatroom-${this.id}`;
    }
    static getInstanceList() {
        return Object.values(instanceMap);
    }
    static getInstance(f178) {
        validate({ instanceId: { type: 'number', allowEmpty: false } }, { instanceId: f178 }, '', true);
        return instanceMap[f178];
    }
    static newInstance(c178, d178) {
        validate(getInstanceRule, { initParams: d178 }, '', true);
        const e178 = new V2NIMChatroomClient(c178, d178);
        instanceMap[e178.instanceId] = e178;
        return e178;
    }
    static destroyInstance(a178) {
        const b178 = this.getInstance(a178);
        if (b178) {
            delete instanceMap[a178];
            return b178._exitAsync()
                .then(() => {
                b178._clear();
            })
                .catch(() => {
                b178._clear();
            });
        }
    }
    static destroyAll() {
        for (const z177 in instanceMap) {
            this.destroyInstance(Number(z177));
        }
    }
    constructor(x177, y177) {
        super();
        this.eventBus = new EventEmitter();
        this.options = {
            appkey: '',
            account: '',
            tags: [],
            debugLevel: 'debug',
            xhrConnectTimeout: 8000,
            socketConnectTimeout: 8000,
            isFixedDeviceId: false
        };
        this.config = {
            deviceId: '',
            clientSession: ''
        };
        this.context = x177;
        this._id = V2NIMChatroomClient.idCounter++;
        this.options.appkey = y177.appkey;
        this.options.customClientType = y177.customClientType;
        this.instanceId = currInstanceId;
        currInstanceId += 1;
        this.loggerService = new LoggerServiceImpl(this);
        this.logger = new Logger(this);
        this.timeOrigin = new TimeOrigin(this, {}, 'v2ChatroomGetServerTime');
        this.kvManager = new IMKVManager(this.context);
        this.timerManager = new TimerManager();
        this.httpService = new CRHttpServiceImpl(this);
        this.config.deviceId = guid();
        this.config.clientSession = guid();
        this.loginService = new CRLoginServiceImpl(this);
        this.clientSocket = new CRBinaryClientSocketImpl(this);
        this.queueService = new CRQueueServiceImpl(this);
        this.localAntispamUtil = new CRLocalAntispamUtil(this);
        this.chatroomService = new CRServiceImpl(this);
        this.infoService = new CRInfoServiceImpl(this);
        this.memberService = new CRMemberServiceImpl(this);
        this.messageCreator = new CRMessageCreatorImpl(this);
        this.messageService = new CRMessageServiceImpl(this);
        this.storageService = new CRStorageServiceImpl(this);
    }
    getInstanceId() {
        return this.instanceId;
    }
    async enter(t177, u177) {
        validate(chatroomLoginRules, { roomId: t177, enterParams: u177 }, '', true);
        if (!u177.accountId && !u177.anonymousMode) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                detail: {
                    reason: 'accountId is required'
                }
            });
        }
        const v177 = get(u177, 'loginOption.authType') || V2NIMLoginAuthType.V2NIM_LOGIN_AUTH_TYPE_DEFAULT;
        u177.loginOption = u177.loginOption || { authType: v177 };
        if (v177 === V2NIMLoginAuthType.V2NIM_LOGIN_AUTH_TYPE_DEFAULT) {
            if (!u177.anonymousMode && !u177.token) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                    detail: {
                        reason: 'token is required when authType == 0'
                    }
                });
            }
        }
        if (v177 === V2NIMLoginAuthType.V2NIM_LOGIN_AUTH_TYPE_DYNAMIC_TOKEN) {
            if (!u177.loginOption?.tokenProvider) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                    detail: {
                        reason: 'tokenProvider is required when authType == 1'
                    }
                });
            }
        }
        if (u177.linkProvider === null || u177.linkProvider === undefined) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                detail: {
                    reason: 'linkProvider is null or undefined'
                }
            });
        }
        const w177 = await this.loginService.login(this.options.appkey, t177, u177);
        this.infoService.setChatroomInfo(w177.chatroom);
        return w177;
    }
    exit() {
        this._exitAsync();
    }
    _clearModuleData() {
        const r177 = Object.values(this);
        r177.forEach((s177) => {
            if (s177 && typeof s177.reset === 'function')
                s177.reset();
        });
    }
    _removeAllModuleListeners() {
        const p177 = Object.values(this);
        p177.forEach((q177) => {
            if (q177 && typeof q177.removeAllListeners === 'function')
                q177.removeAllListeners();
        });
    }
    _clear() {
        this.removeAllListeners();
        this.eventBus.removeAllListeners();
        this.timerManager.destroy();
        this._clearModuleData();
        this._removeAllModuleListeners();
    }
    async _exitAsync() {
        this.loginService.reset();
        try {
            await this.loginService.logout();
            await this.storageService.cancelAllUpload();
            return;
        }
        catch (o177) {
            return Promise.resolve();
        }
    }
    sendCmd(l177, m177, n177) {
        return this.clientSocket.sendCmd(l177, m177, n177);
    }
    get account() {
        return this.options.account;
    }
    get tags() {
        return this.options.tags;
    }
    get status() {
        if (this.loginService.lifeCycle.chatroomStatus === V2NIMChatroomStatus.V2NIM_CHATROOM_STATUS_ENTERED) {
            return 'logined';
        }
        else {
            return '';
        }
    }
    getChatroomInfo() {
        return this.infoService.getChatroomInfo();
    }
}
V2NIMChatroomClient.idCounter = 0;
