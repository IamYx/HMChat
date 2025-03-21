import HashMap from "@ohos.util.HashMap";
import deviceInfo from "@ohos.deviceInfo";
import rcp from "@hms.collaboration.rcp";
import { IM_SDK_VERSION, V2Service } from '@nimsdk/base';
import { get } from '@nimsdk/vendor';
import { ABTestDB } from './ABTestDB';
const ABT_PROJECT_KEY = 'im_sdk_harmony_abtest';
const default_test_addr = 'https://abt-test.netease.im/v1/api/abt/client/getExperimentInfo';
const default_online_addr = 'https://abt-online.netease.im/v1/api/abt/client/getExperimentInfo';
const TAG = '[ABTestServiceImpl]';
export class ABTestServiceImpl extends V2Service {
    constructor(t32, u32, v32) {
        super(u32, t32);
        this.experimentCache = new HashMap();
        const w32 = `${this.core.options.appkey}/global`;
        this.db = new ABTestDB(t32, w32);
        this.db.createDB().then(async () => {
            await this.loadAllExperiment();
        });
    }
    async loadAllExperiment() {
        try {
            this.experimentCache = await this.db.loadAllExperiment();
        }
        catch (s32) {
            this.core.logger.warn(TAG, 'loadAllExperiment', s32);
        }
    }
    getExperimentForKey(p32) {
        try {
            const r32 = this.experimentCache.get(p32);
            return r32;
        }
        catch (q32) {
            this.core.logger.warn(TAG, 'getExperimentForKey', p32, q32);
            return undefined;
        }
    }
    async onLoginStart(n32) {
        try {
            this.fetchRemoteExperiments(n32);
        }
        catch (o32) {
            this.core.logger.error(TAG, 'onLoginStart', o32);
        }
    }
    async onLoginFinished(m32) {
    }
    async onLogout() {
    }
    async fetchRemoteExperiments(h32) {
        let i32 = null;
        try {
            i32 = rcp.createSession(this.sessionConfig());
            this.core.logger.info(TAG, 'fetchRemoteExperiments', h32);
            const j32 = await i32.post(default_online_addr, {
                'clientInfo': {
                    appKey: this.core.options.appkey,
                    deviceId: deviceInfo.ODID,
                    projectKey: ABT_PROJECT_KEY,
                    sdkVersion: IM_SDK_VERSION,
                    model: deviceInfo.productModel,
                    osVersion: deviceInfo.distributionOSVersion,
                    osType: 'HarmonyOS',
                    userId: h32
                }
            });
            if (j32.statusCode === 200 && j32 !== null) {
                const k32 = j32.toString() ?? '';
                this.core.logger.info(TAG, 'pullABTest result', k32);
                const l32 = get(JSON.parse(k32), 'data.abtInfo.experiments');
                await this.db.addExperiments(l32);
            }
        }
        finally {
            i32?.close();
        }
    }
    sessionConfig() {
        return {
            requestConfiguration: {
                transfer: {
                    autoRedirect: true,
                    timeout: {
                        connectMs: 5000,
                        transferMs: 10000
                    }
                },
                tracing: {
                    verbose: false
                }
            },
            baseAddress: 'https://abt-online.netease.im',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        };
    }
}
