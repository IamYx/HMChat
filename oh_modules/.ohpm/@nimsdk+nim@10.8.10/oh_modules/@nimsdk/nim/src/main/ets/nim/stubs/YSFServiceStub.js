import { V2NIMErrorCode, V2NIMErrorImpl, V2Service } from "@nimsdk/base";
const TAG = 'YSFServiceStub';
export class YSFServiceStub extends V2Service {
    constructor(z137, a138, b138) {
        super(a138, z137);
    }
    sendMessage(v137, w137, x137, y137) {
        this.core.logger.error(TAG, `Method 'sendMessage' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'sendMessage' not implemented.`
            }
        });
    }
    cancelMessageAttachmentUpload(u137) {
        this.core.logger.error(TAG, `Method 'cancelMessageAttachmentUpload' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'cancelMessageAttachmentUpload' not implemented.`
            }
        });
    }
    sendCustomNotification(r137, s137, t137) {
        this.core.logger.error(TAG, `Method 'sendCustomNotification' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'sendCustomNotification' not implemented.`
            }
        });
    }
    v2IYSFSyncOfflineMsgsHandler(q137) {
        this.core.logger.error(TAG, `Method 'v2IYSFSyncOfflineMsgsHandler' not implemented.`);
        return;
    }
    v2IYSFSyncSysNotificationHandler(p137) {
        this.core.logger.error(TAG, `Method 'v2IYSFSyncSysNotificationHandler' not implemented.`);
        return;
    }
    async onLoginStart(o137) {
        this.core.logger.info(TAG, `Method 'onLoginStart' not implemented.`);
    }
    async onLoginFinished(n137) {
        this.core.logger.info(TAG, `Method 'onLoginFinished' not implemented.`);
    }
    onLogout() {
        this.core.logger.info(TAG, `Method 'onLogout' not implemented.`);
    }
}
