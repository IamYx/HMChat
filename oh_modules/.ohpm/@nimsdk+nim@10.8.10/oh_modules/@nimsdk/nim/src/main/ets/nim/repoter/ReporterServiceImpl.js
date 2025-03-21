import Queue from "@ohos.util.Queue";
import http from "@ohos.net.http";
import rcp from "@hms.collaboration.rcp";
import { guid, IM_ELITE_SDK_VERSION_HUMAN, IM_SDK_VERSION, TimerManager, V2Service } from '@nimsdk/base';
import { assign } from '@nimsdk/vendor';
import deviceInfo from '@ohos.deviceInfo';
import { AspectService } from './AspectService';
import { ExceptionService } from './exception/ExceptionService';
import { FaultLogger } from './FaultLogger';
import { formatObject } from './Format';
import { ReporterDB } from './model/ReporterDB';
import { ReporterEventCommonInfo } from './model/ReporterEventCommonInfo';
import { NetworkingInstance } from './Networking';
const TAG = '[ReporterServiceImpl]';
const REPORTER_STRATEGY_DISPATCHER = 'https://statistic.live.126.net/dispatcher/req?';
const REPORTER_ADDRESS_DEFAULT = 'https://statistic.live.126.net';
const REPORTER_ENDPOINT_DEFAULT = 'https://statistic.live.126.net/statics/report/common/form';
const MILLISECOND_UNIT = 1000;
const ABTEST_EXPERIMENT_KEY = 'data_repoter_switch';
const ABTEST_API_EXPERIMENT_KEY = 'data_repoter_api_switch';
const ABTEST_DB_EXPERIMENT_KEY = 'data_repoter_db_switch';
export class ReporterServiceImpl extends V2Service {
    constructor(b106, c106, d106) {
        super(c106, b106);
        this.defaultExceptionUploadSize = 10;
        this.isConnected = true;
        this.timerManager = new TimerManager();
        this.apiTraceQueue = new Queue();
        this.bizTraceQueue = new Queue();
        this.active_id = guid();
        this.config = {
            context: b106.context,
            appkey: b106.options.appkey,
            sdkVer: IM_SDK_VERSION,
            env: 'online'
        };
        NetworkingInstance.getInstance().onNetworkStatusChange(this, (f106) => {
            this.isConnected = f106.isConnected;
        });
        const e106 = `${this.core.options.appkey}/global`;
        this.rdb = new ReporterDB(this.core, e106);
        this.rdb?.createDB().then(() => {
            this.faultLoggerCollect = new FaultLogger(b106);
            this.faultLoggerCollect.loadFaultLogger();
        });
        this.exceptionService = new ExceptionService(b106);
        this.aspect = new AspectService(b106);
    }
    addDatabaseAspect(y105, z105) {
        try {
            this.aspect.addDatabaseAspect(y105, z105);
        }
        catch (a106) {
            this.core.logger.info(TAG, 'addDatabaseAspect', a106);
        }
    }
    addAspect(v105, w105) {
        try {
            this.aspect.addAspect(v105, w105);
        }
        catch (x105) {
            this.core.logger.info(TAG, 'addAspect', x105);
        }
    }
    addException(r105) {
        try {
            const t105 = this.exceptionService.createEvent(r105);
            this.addExceptionEvent(t105);
            if (r105.action != 6) {
                const u105 = assign({}, t105);
                this.core.logger.info(TAG, 'addException', u105);
            }
        }
        catch (s105) {
            this.core.logger.info(TAG, 'addException', s105);
        }
    }
    addAPIEvent(p105) {
        try {
            if ((p105.tag === "nim_api_trace" && this.getExperimentForKey(ABTEST_API_EXPERIMENT_KEY)) ||
                (p105.tag === "nim_sdk_database_trace" && this.getExperimentForKey(ABTEST_DB_EXPERIMENT_KEY))) {
                p105.active_id = this.active_id;
                this.apiTraceQueue.add(p105);
            }
        }
        catch (q105) {
            this.core.logger.error(TAG, 'addAPIEvent', q105);
        }
    }
    addBizEvent(n105) {
        try {
            n105.user_id = n105.user_id ?? this.uid;
            this.bizTraceQueue.add(n105);
        }
        catch (o105) {
            this.core.logger.error(TAG, 'addBizEvent', o105);
        }
    }
    async onLoginStart(j105) {
        try {
            this.uid = j105;
            const l105 = await this.requestStrategy();
            if (l105 !== null) {
                const m105 = this.core.abtService.getExperimentForKey(ABTEST_EXPERIMENT_KEY);
                if (m105 !== undefined && m105.schemeKey === 'open_flow') {
                    this.timerManager.addTimer(this.startReporterLoop.bind(this, l105), l105.minInterval * MILLISECOND_UNIT, -1);
                }
            }
        }
        catch (k105) {
            this.core.logger.error(TAG, 'onLoginStart', k105);
        }
    }
    async onLoginFinished(i105) {
    }
    onLogout() {
        try {
            this.stopReporterLoop();
        }
        catch (h105) {
            this.core.logger.error(TAG, 'onLogout', h105);
        }
    }
    async addExceptionEvent(e105) {
        e105.user_id = this.core.account;
        if (e105.extension && e105.extension.length > 0) {
            const f105 = [];
            e105.extension.map(g105 => {
                if (!g105.net_connect && (g105.operation_type === 0 ||
                    g105.operation_type === 1 ||
                    g105.operation_type === 2 ||
                    g105.operation_type === 7)) {
                }
                else {
                    f105.push(g105);
                }
            });
            e105.extension = f105;
        }
        if (e105.tag === "exceptions" && e105.extension?.length === 0) {
            return;
        }
        this.rdb?.addItem(e105);
    }
    sessionConfig() {
        const d105 = {
            requestConfiguration: {
                transfer: {
                    autoRedirect: true,
                    timeout: {
                        connectMs: 5000,
                        transferMs: 10000
                    }
                },
                tracing: {
                    verbose: true
                }
            },
            baseAddress: REPORTER_ADDRESS_DEFAULT,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'sdktype': 'IM'
            }
        };
        return d105;
    }
    handleEvents(z104, a105) {
        z104.forEach(b105 => {
            const c105 = a105.get(b105.tag) || [];
            c105.push(b105);
            a105.set(b105.tag, c105);
        });
    }
    stopReporterLoop() {
        this.timerManager.destroy();
    }
    async uploadEvents(q104, r104) {
        q104 = REPORTER_ENDPOINT_DEFAULT;
        const s104 = this.sessionConfig();
        const t104 = rcp.createSession(s104);
        try {
            const v104 = NetworkingInstance.getInstance().getNetCapabilitiesSync();
            const w104 = this.config?.context.applicationInfo.descriptionResource.bundleName;
            const x104 = new ReporterEventCommonInfo(this.config.appkey, this.config.sdkVer, w104, this.config?.env, v104, this.uid);
            const y104 = {
                'common': x104,
                'event': formatObject(r104)
            };
            await t104.post(q104, JSON.stringify(y104));
        }
        catch (u104) {
            this.core.logger.error('upload', `err: err code is ${u104.code}, err message is ${u104.message}`);
        }
        finally {
            t104.close();
        }
    }
    async requestStrategy() {
        const f104 = deviceInfo.ODID;
        const g104 = 'HarmonyOS';
        const h104 = IM_ELITE_SDK_VERSION_HUMAN;
        const i104 = this.core.options.appkey;
        const j104 = REPORTER_STRATEGY_DISPATCHER
            + `deviceId=${f104}` + '&'
            + `sdktype=IM` + '&'
            + `sdkVer=${h104}` + '&'
            + `platform=${g104}` + '&'
            + `appkey=${i104}`;
        let k104 = http.createHttp();
        let l104 = {
            method: http.RequestMethod.GET,
            expectDataType: http.HttpDataType.STRING,
            usingCache: true,
            priority: 1,
            readTimeout: 60000,
            connectTimeout: 60000,
            usingProtocol: http.HttpProtocol.HTTP1_1,
            usingProxy: false,
        };
        const m104 = await k104.request(j104, l104);
        if (m104.responseCode == 200) {
            const n104 = m104.result;
            try {
                const p104 = JSON.parse(n104);
                return p104.data;
            }
            catch (o104) {
                this.core.logger.error(TAG, 'requestStrategy', o104);
                return null;
            }
        }
        return null;
    }
    async startReporterLoop(u103) {
        if (this.isConnected === false) {
            return;
        }
        try {
            const w103 = await this.rdb?.getItem(this.defaultExceptionUploadSize) || [];
            const x103 = new Map();
            this.handleEvents(w103, x103);
            if (w103.length < u103.maxSize && this.apiTraceQueue) {
                const y103 = u103.maxSize - w103.length;
                const z103 = [];
                for (let d104 = 0; d104 < y103; d104++) {
                    const e104 = this.bizTraceQueue.pop();
                    if (e104 === undefined) {
                        break;
                    }
                    z103.push(e104);
                }
                const a104 = y103 - z103.length;
                for (let b104 = 0; b104 < a104; b104++) {
                    const c104 = this.apiTraceQueue.pop();
                    if (c104 === undefined) {
                        break;
                    }
                    z103.push(c104);
                }
                this.handleEvents(z103, x103);
            }
            if (x103.size > 0) {
                await this.uploadEvents(u103.endpoint, x103);
            }
            if (w103.length > 0) {
                this.rdb?.deleteItems(w103);
            }
        }
        catch (v103) {
        }
    }
    getExperimentForKey(s103) {
        const t103 = this.core.abtService.getExperimentForKey(s103);
        if (t103 !== undefined && t103.schemeKey === 'open_flow') {
            return true;
        }
        return false;
    }
}
