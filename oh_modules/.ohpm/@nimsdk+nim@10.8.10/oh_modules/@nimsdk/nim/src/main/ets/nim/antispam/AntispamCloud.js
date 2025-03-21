import { TIMEOUT_REQUEST } from '@nimsdk/base';
import { get } from '@nimsdk/vendor/';
import http from '@ohos.net.http';
import { LocalAntispamSyncParam, LocalAntispamSyncRequest } from './cloud/AntispamRequest';
export class AntispamCloud {
    constructor(d35) {
        this.core = d35;
        this.vocabInfo = {};
    }
    async syncLocalAntiSpamInfo(y34) {
        try {
            const a35 = new LocalAntispamSyncRequest(new LocalAntispamSyncParam(y34));
            const b35 = (await this.core.sendCmd('LocalAntispamSync', a35));
            const c35 = get(b35.content, 'data');
            return c35;
        }
        catch (z34) {
            this.core.logger.warn('V2NIMLocalAntispamUtil::downloadLocalAntiSpamVocabs error', z34);
            throw Error(`${z34}`);
        }
    }
    downloadAntispam(r34) {
        const s34 = {
            readTimeout: TIMEOUT_REQUEST,
            connectTimeout: TIMEOUT_REQUEST
        };
        return new Promise((t34, u34) => {
            let v34 = http.createHttp();
            v34.request(r34, s34, (w34, x34) => {
                if (!w34) {
                    t34({
                        code: x34.responseCode,
                        data: x34.result,
                        headers: x34.header
                    });
                }
                else {
                    u34(w34);
                }
                v34.destroy();
            });
        });
    }
}
