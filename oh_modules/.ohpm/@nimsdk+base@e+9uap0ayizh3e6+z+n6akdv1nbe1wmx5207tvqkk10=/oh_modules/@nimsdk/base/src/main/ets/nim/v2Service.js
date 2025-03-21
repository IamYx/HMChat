import { EventEmitter, get } from '@nimsdk/vendor';
import { V2NIMErrorCode, V2NIMErrorImpl } from './utils/error';
import { V2NIMLoginStatus } from './sdk/V2NIMLoginService';
const TAG = '[V2Service]';
export default class V2Service extends EventEmitter {
    constructor(b30, c30) {
        super();
        this.name = b30;
        this.logger = c30.logger;
        this.core = c30;
    }
    emit(x29, ...y29) {
        try {
            this.logger.debug(this.name, 'emit event', x29);
            const a30 = super.emit(x29, ...y29);
            return a30;
        }
        catch (z29) {
            setTimeout(() => {
                this.logger.error(`${this.name}::emit throw error in setTimeout. event: ${x29.toString()}. Error`, z29);
                throw z29;
            }, 0);
            return false;
        }
    }
    process(r29) {
        const s29 = get(this, r29.cmd + 'Handler');
        if (typeof s29 === 'function') {
            if (r29.error) {
                this.logger.error(TAG, 'process', `${r29.cmd}::recvError`, r29.error);
                return Promise.reject(r29.error);
            }
            try {
                const w29 = s29.call(this, r29);
                return Promise.resolve(w29);
            }
            catch (v29) {
                return Promise.reject(v29);
            }
        }
        const t29 = r29.error;
        const u29 = get(r29, 'error.detail.ignore');
        if (t29 && !u29) {
            return Promise.reject(t29);
        }
        return Promise.resolve(r29);
    }
    checkLogin() {
        if (this.core.loginService.getLoginStatus() !== V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED) {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: {
                    reason: 'The client is not logged in.'
                }
            });
        }
    }
}
