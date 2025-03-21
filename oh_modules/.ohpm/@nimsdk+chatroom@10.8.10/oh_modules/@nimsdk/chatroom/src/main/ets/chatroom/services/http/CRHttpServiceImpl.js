import http from '@ohos.net.http';
import { assign, get } from '@nimsdk/vendor';
import { cmdConfigCRHttp, cmdMapCRHttp, registerParser, TIMEOUT_REQUEST, } from '@nimsdk/base';
import CRNOS from './CRNOS';
import CRBaseService from '../base/CRBaseService';
import { CRGetOriginUrlRequest, CRNosSafeUrlTagParam } from './cloud/CRHttpRequest';
export class CRHttpServiceImpl extends CRBaseService {
    constructor(q4) {
        super('httpService', q4);
        this.nos = new CRNOS(q4);
        registerParser(q4, { cmdMap: cmdMapCRHttp, cmdConfig: cmdConfigCRHttp });
    }
    request(i4, j4, k4) {
        if (!j4) {
            if (this.core.options.xhrConnectTimeout) {
                j4 = {
                    readTimeout: this.core.options.xhrConnectTimeout,
                    connectTimeout: this.core.options.xhrConnectTimeout,
                };
            }
            else {
                j4 = {
                    readTimeout: TIMEOUT_REQUEST,
                    connectTimeout: TIMEOUT_REQUEST,
                };
            }
        }
        else {
            if (!j4.readTimeout) {
                if (this.core.options.xhrConnectTimeout) {
                    assign(j4, 'readTimeout', this.core.options.xhrConnectTimeout);
                }
                else {
                    assign(j4, 'readTimeout', TIMEOUT_REQUEST);
                }
            }
            if (!j4.connectTimeout) {
                if (this.core.options.xhrConnectTimeout) {
                    assign(j4, 'connectTimeout', this.core.options.xhrConnectTimeout);
                }
                else {
                    assign(j4, 'connectTimeout', TIMEOUT_REQUEST);
                }
            }
        }
        return new Promise((l4, m4) => {
            let n4 = http.createHttp();
            n4.request(i4, j4, (o4, p4) => {
                if (!o4) {
                    l4({
                        code: p4.responseCode,
                        data: p4.result,
                        headers: p4.header,
                    });
                }
                else {
                    m4(o4);
                }
                if (k4?.exception_service) {
                }
                n4.destroy();
            });
        });
    }
    uploadFile(h4) {
        return this.nos.nosUpload(h4);
    }
    async getOriginUrl(e4) {
        if (typeof e4 !== 'string' || !e4.includes('_im_url=1'))
            return e4;
        const f4 = new CRGetOriginUrlRequest(new CRNosSafeUrlTagParam(e4));
        const g4 = (await this.core.sendCmd('getOriginUrl', f4));
        return get(g4.content, "nosSafeUrlTag.originUrl");
    }
}
