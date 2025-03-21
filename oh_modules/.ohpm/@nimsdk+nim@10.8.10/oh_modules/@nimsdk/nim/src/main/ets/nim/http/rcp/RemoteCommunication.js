import rcp from "@hms.collaboration.rcp";
import { IM_SDK_VERSION } from '@nimsdk/base';
import HashMap from "@ohos.util.HashMap";
import deviceInfo from '@ohos.deviceInfo';
import { HttpExceptionInterceptor } from './Intercept';
const TAG = '[RemoteCommunication]';
export class RemoteCommunication {
    constructor(a65) {
        this.core = a65;
        this.sessionHashMap = new HashMap();
    }
    async request(u64, v64) {
        const w64 = new rcp.Request(u64, "GET");
        const x64 = rcp.createSession(this.sessionConfig(v64));
        try {
            this.sessionHashMap.set(u64, x64);
            const z64 = await x64.fetch(w64);
            this.core.logger.info(TAG, "request", z64.timeInfo);
            return {
                code: z64.statusCode,
                data: z64.toString(),
                headers: z64?.headers,
            };
        }
        catch (y64) {
            this.core.logger.error(`Response err: Code is ${y64.code}, message is ${y64.message}`);
            throw y64;
        }
        finally {
            this.sessionHashMap.remove(u64);
            x64.close();
        }
    }
    async get(q64) {
        const r64 = rcp.createSession(this.sessionConfig());
        try {
            this.sessionHashMap.set(q64, r64);
            const t64 = await r64.get(q64);
            this.core.logger.info(`Response succeeded: ${t64}`);
            return t64;
        }
        catch (s64) {
            this.core.logger.error(`Response err: Code is ${s64.code}, message is ${s64.message}`);
        }
        finally {
            this.sessionHashMap.remove(q64);
            r64.close();
        }
    }
    async post(l64, m64) {
        const n64 = rcp.createSession(this.sessionConfig());
        try {
            this.sessionHashMap.set(l64, n64);
            const p64 = await n64.post(l64, m64);
            this.core.logger.info(`Response succeeded: ${p64}`);
            return p64;
        }
        catch (o64) {
            this.core.logger.error(`Response err: Code is ${o64.code}, message is ${o64.message}`);
        }
        finally {
            this.sessionHashMap.remove(l64);
            n64.close();
        }
    }
    async put(g64, h64) {
        const i64 = rcp.createSession(this.sessionConfig());
        try {
            this.sessionHashMap.set(g64, i64);
            const k64 = await i64.put(g64, h64);
            this.core.logger.info(`Response succeeded: ${k64}`);
            return k64;
        }
        catch (j64) {
            this.core.logger.error(`Response err: Code is ${j64.code}, message is ${j64.message}`);
        }
        finally {
            this.sessionHashMap.remove(g64);
            i64.close();
        }
    }
    async head(c64) {
        const d64 = rcp.createSession(this.sessionConfig());
        try {
            this.sessionHashMap.set(c64, d64);
            const f64 = await d64.head(c64);
            this.core.logger.info(`Response succeeded: ${f64}`);
            return f64;
        }
        catch (e64) {
            this.core.logger.error(`Response err: Code is ${e64.code}, message is ${e64.message}`);
        }
        finally {
            this.sessionHashMap.remove(c64);
            d64.close();
        }
    }
    async delete(y63) {
        const z63 = rcp.createSession(this.sessionConfig());
        try {
            this.sessionHashMap.set(y63, z63);
            const b64 = await z63.delete(y63);
            this.core.logger.info(`Response succeeded: ${b64}`);
            return b64;
        }
        catch (a64) {
            this.core.logger.error(`Response err: Code is ${a64.code}, message is ${a64.message}`);
        }
        finally {
            this.sessionHashMap.remove(y63);
            z63.close();
        }
    }
    cancel(w63) {
        const x63 = this.sessionHashMap.get(w63);
        x63.cancel();
        this.sessionHashMap.remove(w63);
    }
    cancelAll() {
        this.sessionHashMap.forEach((u63, v63) => {
            u63?.cancel();
        });
        this.sessionHashMap.clear();
    }
    close(s63) {
        const t63 = this.sessionHashMap.get(s63);
        t63.close();
        this.sessionHashMap.remove(s63);
    }
    sessionConfig(r63) {
        return {
            requestConfiguration: {
                transfer: {
                    autoRedirect: true,
                    timeout: {
                        connectMs: r63?.connectMs || 60000,
                        transferMs: r63?.transferMs || 60000,
                    },
                },
                tracing: {
                    verbose: false,
                },
            },
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "user-agent": `NIM/HOS/${deviceInfo.manufacture}/${deviceInfo.osFullName}/${IM_SDK_VERSION}/${this.core.options.appkey}`
            },
            interceptors: [new HttpExceptionInterceptor(this.core)]
        };
    }
}
