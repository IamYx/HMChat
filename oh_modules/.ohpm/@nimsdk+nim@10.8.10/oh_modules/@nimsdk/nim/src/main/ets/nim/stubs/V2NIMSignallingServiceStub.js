import { V2NIMErrorCode, V2NIMErrorImpl, V2Service } from '@nimsdk/base';
const TAG = 'V2NIMSignallingServiceStub';
export class V2NIMSignallingServiceStub extends V2Service {
    constructor(d132, e132, f132) {
        super(e132, d132);
    }
    call(c132) {
        this.core.logger.error(TAG, `Method 'call' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'call' not implemented.`
            }
        });
    }
    callSetup(b132) {
        this.core.logger.error(TAG, `Method 'callSetup' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'callSetup' not implemented.`
            }
        });
    }
    createRoom(y131, z131, a132) {
        this.core.logger.error(TAG, `Method 'createRoom' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'createRoom' not implemented.`
            }
        });
    }
    delayRoom(x131) {
        this.core.logger.error(TAG, `Method 'delayRoom' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'delayRoom' not implemented.`
            }
        });
    }
    closeRoom(u131, v131, w131) {
        this.core.logger.error(TAG, `Method 'closeRoom' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'closeRoom' not implemented.`
            }
        });
    }
    joinRoom(t131) {
        this.core.logger.error(TAG, `Method 'joinRoom' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'joinRoom' not implemented.`
            }
        });
    }
    leaveRoom(q131, r131, s131) {
        this.core.logger.error(TAG, `Method 'leaveRoom' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'leaveRoom' not implemented.`
            }
        });
    }
    invite(p131) {
        this.core.logger.error(TAG, `Method 'invite' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'invite' not implemented.`
            }
        });
    }
    cancelInvite(o131) {
        this.core.logger.error(TAG, `Method 'cancelInvite' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'cancelInvite' not implemented.`
            }
        });
    }
    rejectInvite(n131) {
        this.core.logger.error(TAG, `Method 'rejectInvite' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'rejectInvite' not implemented.`
            }
        });
    }
    acceptInvite(m131) {
        this.core.logger.error(TAG, `Method 'acceptInvite' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'acceptInvite' not implemented.`
            }
        });
    }
    sendControl(j131, k131, l131) {
        this.core.logger.error(TAG, `Method 'sendControl' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'sendControl' not implemented.`
            }
        });
    }
    getRoomInfoByChannelName(i131) {
        this.core.logger.error(TAG, `Method 'getRoomInfoByChannelName' not implemented.`);
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_MISUSE,
            detail: {
                reason: `Method 'getRoomInfoByChannelName' not implemented.`
            }
        });
    }
    async onLoginStart(h131) {
        this.core.logger.info(TAG, `Method 'onLoginStart' not implemented.`);
    }
    async onLoginFinished(g131) {
        this.core.logger.info(TAG, `Method 'onLoginFinished' not implemented.`);
    }
    onLogout() {
        this.core.logger.info(TAG, `Method 'onLogout' not implemented.`);
    }
}
