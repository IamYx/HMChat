import { TIMEOUT_REQUEST } from '@nimsdk/base';
import { get } from '@nimsdk/vendor';
import http from '@ohos.net.http';
import { CRLocalAntispamSyncParam, CRLocalAntispamSyncRequest } from './cloud/CRAntispamRequest';
export class CRAntispamCloud {
    constructor(z) {
        this.core = z;
        this.vocabInfo = {};
    }
    async syncLocalAntiSpamInfo(u) {
        try {
            const w = new CRLocalAntispamSyncParam(u);
            const x = (await this.core.sendCmd('LocalAntispamSync', new CRLocalAntispamSyncRequest(w)));
            const y = get(x, 'content.data');
            return y;
        }
        catch (v) {
            this.core.logger.warn('antispamUtil: download error', v);
            throw Error(`${v}`);
        }
    }
    downloadAntispam(n) {
        const o = {
            readTimeout: TIMEOUT_REQUEST,
            connectTimeout: TIMEOUT_REQUEST,
        };
        return new Promise((p, q) => {
            let r = http.createHttp();
            r.request(n, o, (s, t) => {
                if (!s) {
                    p({
                        code: t.responseCode,
                        data: t.result,
                        headers: t.header,
                    });
                }
                else {
                    q(s);
                }
                r.destroy();
            });
        });
    }
    reset() {
        this.vocabInfo = undefined;
    }
}
