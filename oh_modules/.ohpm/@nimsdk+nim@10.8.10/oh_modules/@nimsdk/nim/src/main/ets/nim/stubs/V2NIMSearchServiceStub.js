import { V2NIMErrorCode, V2NIMErrorImpl, V2Service } from '@nimsdk/base';
const TAG = 'V2NIMSearchServiceStub';
export class V2NIMSearchServiceStub extends V2Service {
    constructor(y129, z129, a130) {
        super(z129, y129);
    }
    v2IIsEnable() {
        return false;
    }
    v2ISearch(x129) {
        this.core.logger.error(TAG, `Method 'search' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'search' not implemented, or the ABI of device is not 'arm64-v8a'`
            }
        });
    }
    async onLoginStart(w129) {
        this.core.logger.info(TAG, `Method 'onLoginStart' not implemented.`);
    }
    async onLoginFinished(v129) {
        this.core.logger.info(TAG, `Method 'onLoginFinished' not implemented.`);
    }
    onLogout() {
        this.core.logger.info(TAG, `Method 'onLogout' not implemented.`);
    }
}
