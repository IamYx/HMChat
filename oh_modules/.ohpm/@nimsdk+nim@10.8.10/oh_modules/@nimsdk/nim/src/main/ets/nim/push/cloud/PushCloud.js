import { V2NIMErrorImpl, V2NIMErrorMap } from '@nimsdk/base';
import { get } from '@nimsdk/vendor';
import { UpdatePushTokenParams, UpdatePushTokenRequest } from './PushRequest';
const TAG = "[PushCloud]";
export class PushCloud {
    constructor(g95) {
        this.core = g95;
    }
    async doSendPushToken(z94, a95, b95) {
        try {
            const d95 = new UpdatePushTokenRequest(new UpdatePushTokenParams(z94, a95, b95));
            const e95 = await this.core.sendCmd('v2UpdatePushToken', d95);
            let f95 = get(e95, "raw.code");
            this.core.logger.info(TAG, '[SID 26 , CID 6] done, code: ', f95);
            if (f95 != 200)
                throw new V2NIMErrorImpl({
                    code: f95,
                });
        }
        catch (c95) {
            if (c95 instanceof V2NIMErrorImpl || c95.name === 'V2NIMError') {
                throw c95;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorMap.V2NIM_ERROR_CODE_REGISTER_PUSH_SDK_FAILED.code,
                    desc: V2NIMErrorMap.V2NIM_ERROR_CODE_REGISTER_PUSH_SDK_FAILED.message,
                    detail: {
                        reason: 'Push, doSendPushToken catch error: ' + c95.code + ' ' + c95.message,
                        rawError: c95
                    }
                });
            }
        }
    }
}
