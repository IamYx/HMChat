import http from '@ohos.net.http';
import { deserialize, invertSerializeItem, PromiseManager, V2NIMErrorCode, V2NIMErrorImpl } from '@nimsdk/base';
import { get, uniqBy } from '@nimsdk/vendor/Index';
import { formatMessage } from '../format';
import { chatroomMsgTag } from '@nimsdk/base';
const defaultCDNConfig = {
    enabled: false,
    cdnUrls: [],
    timestamp: Date.now(),
    pollingIntervalSeconds: 5,
    pollingTimeoutMillis: 1000
};
const msgReverseTag = invertSerializeItem(chatroomMsgTag);
export default class CDNUtil {
    constructor(h32, i32) {
        this.config = defaultCDNConfig;
        this.lastSuccessTimestamp = 0;
        this.pollingTimer = 0;
        this.msgBufferInterval = 300;
        this.emitTimer = 0;
        this.core = h32;
        this.service = i32;
        this.promiseManager = new PromiseManager();
    }
    reset() {
        this.config = defaultCDNConfig;
        this.lastSuccessTimestamp = 0;
        this.pollingTimer && clearInterval(this.pollingTimer);
        this.pollingTimer = 0;
        this.emitTimer && clearInterval(this.emitTimer);
        this.emitTimer = 0;
    }
    setOptions(g32) {
        this.config = Object.assign({}, this.config, g32);
        this.core.logger.info('CDNUtil', '::setOptions', this.config);
        this.polling();
    }
    polling() {
        this.pollingTimer && clearInterval(this.pollingTimer);
        this.pollingTimer = 0;
        if (this.config.enabled) {
            this.pollingTimer = setInterval(this.fetchMsgs.bind(this), this.config.pollingIntervalSeconds * 1000);
        }
    }
    async fetchMsgs(y31 = 0) {
        const z31 = this.config.cdnUrls;
        if (!(z31 && z31.length > 0))
            return;
        let a32 = z31.shift();
        if (!a32)
            return;
        this.config.cdnUrls.push(a32);
        let b32 = this.core.timeOrigin.getNTPTime();
        b32 = b32 - (b32 % (this.config.pollingIntervalSeconds * 1000));
        if (this.lastSuccessTimestamp === b32)
            return;
        a32 = a32.replace('#time', `${b32}`);
        const c32 = this.config.pollingTimeoutMillis || (this.config.pollingIntervalSeconds * 1000) / 2;
        this.core.logger.info('CDNUtil::fetchMsgs start:', a32);
        let d32 = {};
        try {
            d32 = await this.promiseManager.add(this.core.httpService.request(a32, {
                method: http.RequestMethod.GET,
                expectDataType: http.HttpDataType.OBJECT,
                connectTimeout: c32
            }, {
                exception_service: 8
            }));
        }
        catch (e32) {
            this.core.logger.warn('CDNUtil::fetchMsgs failed:', e32);
            const f32 = e32;
            if (f32.code === V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED)
                return;
            if (y31 >= 3)
                return;
            if (f32.code === 404) {
                this.core.timeOrigin.setOriginTimetick();
            }
            return this.fetchMsgs(y31 + 1);
        }
        this.requestSuccess(d32, b32);
    }
    requestSuccess(q31, r31) {
        if (this.lastSuccessTimestamp > r31) {
            this.core.logger.warn('CDNUtil', 'fetchMsgs:ignore', this.lastSuccessTimestamp, r31);
            this.lastSuccessTimestamp = 0;
            return;
        }
        this.lastSuccessTimestamp = r31;
        const s31 = get(q31, 'data.data');
        if (!s31)
            return;
        if (q31.data.ptm)
            this.config.pollingTimeoutMillis = q31.data.ptm;
        if (q31.data.pis) {
            const x31 = this.config.pollingIntervalSeconds;
            this.config.pollingIntervalSeconds = q31.data.pis;
            if (q31.data.pis !== x31)
                this.polling();
        }
        const t31 = q31.data.e === true ? this.decryptAES(s31, this.config.decryptKey) : s31;
        let u31 = this.formatMessages(t31);
        u31 = uniqBy(u31, 'messageClientId');
        u31 = u31.filter((v31) => {
            const w31 = this.service.sendUtil.checkIfResend(v31);
            if (w31)
                return false;
            this.service.sendUtil.cacheMsg(v31);
            return true;
        });
        this.core.logger.info(`CDNUtil::fetchMsgs success at ${r31}, msg.length: ${u31.length}`);
        this.emitSmoothly(u31, q31.data.c * 1000);
    }
    decryptAES(m31, n31) {
        if (!(m31 && n31))
            return '[]';
        try {
            return '[]';
        }
        catch (o31) {
            const p31 = o31;
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_INTERNAL,
                detail: {
                    reason: 'Decrypt AES failed',
                    rawError: p31
                }
            });
        }
    }
    formatMessages(h31) {
        let i31 = [];
        try {
            i31 = JSON.parse(h31);
        }
        catch (k31) {
            const l31 = k31;
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_INTERNAL,
                detail: {
                    reason: 'JSON parse error',
                    rawData: h31,
                    rawError: l31
                }
            });
        }
        return i31.map((j31) => formatMessage(deserialize(j31, msgReverseTag), this.core));
    }
    emitSmoothly(c31, d31) {
        if (!(c31 && c31.length > 0))
            return;
        const e31 = Math.ceil(d31 / this.msgBufferInterval);
        const f31 = Math.ceil((c31.length * this.msgBufferInterval) / d31);
        this.core.logger.info(`CDNUtil::emitSmoothly total length: ${c31.length}, group length: ${f31}, times: ${e31}`);
        this.emitTimer && clearInterval(this.emitTimer);
        this.emitTimer = 0;
        this.emitTimer = setInterval(() => {
            const g31 = c31.splice(0, f31);
            if (g31.length === 0) {
                this.emitTimer && clearInterval(this.emitTimer);
                this.emitTimer = 0;
                return;
            }
            this.core.chatroomService.emit('onReceiveMessages', g31);
        }, this.msgBufferInterval);
    }
}
