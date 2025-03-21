import { V2Service, registerParser, cmdConfigPassthrough, cmdMapPassthrough, validate, V2NIMProxyRequestMethod, V2NIMErrorImpl, V2NIMErrorCode, } from "@nimsdk/base";
import { registerAspect } from "./Aspect";
import { HttpProxyParam, HttpProxyRequest } from "./cloud/PassthroughRequest";
import { httpProxyRule } from "./Rules";
import { get } from '@nimsdk/vendor';
const TAG = '[PassthroughService]';
export default class V2NIMPassthroughServiceImpl extends V2Service {
    constructor(u94, v94, w94) {
        super(v94, u94);
        registerParser(u94, {
            cmdMap: cmdMapPassthrough, cmdConfig: cmdConfigPassthrough
        });
        registerAspect(V2NIMPassthroughServiceImpl, u94);
    }
    async onLoginStart(t94) {
    }
    async onLoginFinished(s94) {
    }
    onLogout() {
    }
    async httpProxy(i94) {
        try {
            this.core.logger.info(TAG, 'call API httpProxy', i94);
            validate(httpProxyRule, {
                proxyRequest: i94
            }, '', true);
            let k94 = undefined;
            do {
                if (i94.path.length <= 0) {
                    k94 = 'path is empty';
                    break;
                }
                if (i94.method == V2NIMProxyRequestMethod.V2NIM_PROXY_REQUEST_METHOD_GET && i94.body) {
                    k94 = 'body is not empty when method is GET';
                    break;
                }
                if (i94.method == V2NIMProxyRequestMethod.V2NIM_PROXY_REQUEST_METHOD_POST && !i94.body) {
                    k94 = 'body is empty when method is POST';
                    break;
                }
                if (i94.method == V2NIMProxyRequestMethod.V2NIM_PROXY_REQUEST_METHOD_PUT && !i94.body) {
                    k94 = 'body is empty when method is PUT';
                    break;
                }
                let q94 = i94.header ?? "";
                if (q94.length > 0) {
                    try {
                        if (typeof JSON.parse(q94) != "object") {
                            k94 = "header is not json";
                            break;
                        }
                        if (Array.isArray(JSON.parse(q94))) {
                            k94 = "header is not json object";
                            break;
                        }
                    }
                    catch (r94) {
                        k94 = "header is not json";
                        break;
                    }
                }
            } while (false);
            if (k94) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                    detail: {
                        reason: k94
                    }
                });
            }
            const l94 = 'httpProxy';
            const m94 = new HttpProxyParam(i94);
            const n94 = new HttpProxyRequest(m94);
            const o94 = await this.core.sendCmd(l94, n94);
            const p94 = get(o94.content, 'data');
            return p94;
        }
        catch (j94) {
            this.core.logger.error(TAG, 'httpProxy', j94);
            if (j94 instanceof V2NIMErrorImpl || j94.name === 'V2NIMError') {
                throw j94;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `httpProxy ${JSON.stringify(j94)}`, rawError: j94
                    }
                });
            }
        }
    }
    async onSendMsgHandler(d94) {
        this.core.logger.info(TAG, 'call Handler onSendMsgHandler');
        let e94 = get(d94, 'content.info.body');
        let f94 = get(d94, 'content.info.fromAccid');
        let g94 = get(d94, 'content.info.time');
        let h94 = {
            'body': e94,
            'fromAccountId': f94,
            'time': g94,
        };
        this.emit('onProxyNotify', h94);
    }
}
