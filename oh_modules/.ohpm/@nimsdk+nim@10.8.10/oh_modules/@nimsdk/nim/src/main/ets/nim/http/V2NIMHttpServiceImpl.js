import { cmdConfigHttp, cmdMapHttp, registerParser, TIMEOUT_REQUEST, V2Service } from '@nimsdk/base';
import { assign, get } from '@nimsdk/vendor';
import { GetOriginUrlRequest, NosSafeUrlTagParam } from './cloud/HttpRequest';
import NOS from './nos/nos';
import { RemoteCommunication } from './rcp/RemoteCommunication';
const TAG = '[HttpService]';
export class V2NIMHttpServiceImpl extends V2Service {
    constructor(v65, w65, x65) {
        super(w65, v65);
        this.nos = new NOS(v65, x65);
        registerParser(v65, { cmdMap: cmdMapHttp, cmdConfig: cmdConfigHttp });
        this.httpSession = new RemoteCommunication(v65);
    }
    async onLoginStart(u65) {
    }
    async onLoginFinished(t65) {
    }
    onLogout() {
    }
    request(q65, r65, s65) {
        this.core.logger.info(TAG, 'request', q65, r65, s65);
        if (!r65) {
            if (this.core.options.xhrConnectTimeout) {
                r65 = {
                    readTimeout: this.core.options.xhrConnectTimeout,
                    connectTimeout: this.core.options.xhrConnectTimeout,
                };
            }
            else {
                r65 = {
                    readTimeout: TIMEOUT_REQUEST,
                    connectTimeout: TIMEOUT_REQUEST,
                };
            }
        }
        else {
            if (!r65.readTimeout) {
                if (this.core.options.xhrConnectTimeout) {
                    assign(r65, 'readTimeout', this.core.options.xhrConnectTimeout);
                }
                else {
                    assign(r65, 'readTimeout', TIMEOUT_REQUEST);
                }
            }
            if (!r65.connectTimeout) {
                if (this.core.options.xhrConnectTimeout) {
                    assign(r65, 'connectTimeout', this.core.options.xhrConnectTimeout);
                }
                else {
                    assign(r65, 'connectTimeout', TIMEOUT_REQUEST);
                }
            }
        }
        return this.httpSession.request(q65, {
            connectMs: r65.connectTimeout,
            transferMs: r65.readTimeout
        });
    }
    async getNosAccessToken(n65, o65, p65) {
        return await this.nos.getNosAccessToken(n65, o65, p65);
    }
    async deleteNosAccessToken(m65) {
        await this.nos.deleteNosAccessToken(m65);
    }
    uploadFile(l65) {
        return this.nos.nosUpload(l65);
    }
    async getOriginUrl(i65) {
        if (typeof i65 !== 'string' || !i65.includes('_im_url=1'))
            return i65;
        const j65 = new GetOriginUrlRequest(new NosSafeUrlTagParam(i65));
        const k65 = (await this.core.sendCmd('getOriginUrl', j65));
        return get(k65.content, "nosSafeUrlTag.originUrl");
    }
}
