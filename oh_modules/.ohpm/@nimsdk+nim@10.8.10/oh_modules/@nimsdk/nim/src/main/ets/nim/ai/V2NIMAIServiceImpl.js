import { cmdConfigAI, cmdMapAI, registerParser, V2NIMErrorCode, V2NIMErrorImpl, V2Service, validate } from '@nimsdk/base';
import { get } from '@nimsdk/vendor';
import { proxyAIModelCallRules } from './Rules';
const TAG = '[V2NIMAIServiceImpl]';
export class V2NIMAIServiceImpl extends V2Service {
    constructor(o34, p34, q34) {
        super(p34, o34);
        registerParser(o34, {
            cmdMap: cmdMapAI, cmdConfig: cmdConfigAI
        });
    }
    async onLoginStart(n34) {
    }
    async onLoginFinished(m34) {
    }
    onLogout() {
    }
    async getAIUserList() {
        this.core.logger.info(TAG, 'call API getAIUserList');
        return await this.v2IGetAIUserList();
    }
    async proxyAIModelCall(l34) {
        this.core.logger.info(TAG, 'call API proxyAIModelCall', l34);
        return await this.v2IProxyAIModelCall(l34);
    }
    async v2IGetAIUserList() {
        try {
            const j34 = (await this.core.sendCmd('v2AIGetUserList', {
                tag: {}
            }));
            const k34 = get(j34.content, 'datas');
            return k34;
        }
        catch (i34) {
            if (i34 instanceof V2NIMErrorImpl || i34.name === 'V2NIMError') {
                throw i34;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: 'getAIUserList: error: ' + `${JSON.stringify(i34)}`
                    }
                });
            }
        }
    }
    async v2IProxyAIModelCall(g34) {
        try {
            validate(proxyAIModelCallRules, g34, '', true);
            await this.core.sendCmd('v2AIProxyModelCall', { tag: g34 });
        }
        catch (h34) {
            if (h34 instanceof V2NIMErrorImpl || h34.name === 'V2NIMError') {
                throw h34;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: 'proxyAIModelCall: error: ' + `${JSON.stringify(h34)}`
                    }
                });
            }
        }
    }
    v2AIChatNotifyHandler(e34) {
        this.core.logger.info(TAG, 'call Handler v2AIChatNotifyHandler');
        const f34 = get(e34.content, 'data');
        if (f34 && f34.requestId) {
            this.emit('onProxyAIModelCall', {
                code: f34.code || 200,
                accountId: f34.accountId,
                requestId: f34.requestId,
                content: f34.content
            });
        }
        else {
            this.logger.warn(TAG, 'v2AIChatNotifyHandler: invalid data', f34);
        }
    }
}
