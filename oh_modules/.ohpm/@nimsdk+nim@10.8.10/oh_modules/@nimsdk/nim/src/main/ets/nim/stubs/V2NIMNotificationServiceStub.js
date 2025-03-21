import { V2NIMErrorCode, V2NIMErrorImpl, V2Service } from '@nimsdk/base';
const TAG = 'V2NIMNotificationServiceStub';
export class V2NIMNotificationServiceStub extends V2Service {
    constructor(s129, t129, u129) {
        super(t129, s129);
    }
    v2ISyncOfflineSysMsgsHandler(r129) {
        this.core.logger.error(TAG, `Method 'v2SyncOfflineSysMsgsHandler' not implemented. no har`);
        return;
    }
    v2ISyncBroadcastMsgHandler(q129) {
        this.core.logger.error(TAG, `Method 'syncBroadcastMsgHandler' not implemented.`);
        return;
    }
    v2IMarkSysMsgAck(p129) {
        this.core.logger.error(TAG, `Method 'markSysMsgAck' not implemented. on har`);
        return;
    }
    sendCustomNotification(m129, n129, o129) {
        this.core.logger.error(TAG, `Method 'sendCustomNotification' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'sendCustomNotification' not implemented.`
            }
        });
    }
    async onLoginStart(l129) {
        this.core.logger.info(TAG, `Method 'onLoginStart' not implemented.`);
    }
    async onLoginFinished(k129) {
        this.core.logger.info(TAG, `Method 'onLoginFinished' not implemented.`);
    }
    onLogout() {
        this.core.logger.info(TAG, `Method 'onLogout' not implemented.`);
    }
}
