import { V2NIMErrorCode, V2NIMErrorImpl } from '@nimsdk/base';
import { get } from '@nimsdk/vendor';
import { DeleteNosAccessTokenTag, DeleteNosAccessTokenTagParam, GetNosAccessTokenTag, GetNosAccessTokenTagParam, GetNosTokenRequest, NosTokenParams } from '../cloud/HttpRequest';
import { NosTokenInfo } from './NosToken';
const TAG = '[NosTokenCloud]';
export class NosTokenCloud {
    constructor(v60) {
        this.core = v60;
    }
    async getNosToke(h60) {
        try {
            const j60 = get(this.core, 'config.cdn.bucket');
            const k60 = new NosTokenParams(h60.nosScenes || j60 || 'nim_default_im', h60.nosSurvivalTime ?? 0);
            const l60 = await this.core.sendCmd('getNosToken', new GetNosTokenRequest(20, k60));
            const m60 = get(l60, 'content.nosToken');
            const n60 = m60.map(o60 => {
                const p60 = get(o60, 'bucket');
                const q60 = get(o60, 'expireTime');
                const r60 = get(o60, 'objectName');
                const s60 = get(o60, 'shortUrl');
                const t60 = get(o60, 'token');
                const u60 = new NosTokenInfo(p60, q60, r60, s60, t60);
                return u60;
            });
            this.core.logger.info(TAG, 'getNosToken', n60);
            return n60;
        }
        catch (i60) {
            this.core.logger.error(TAG, 'getNosToken', i60);
            if (i60 instanceof V2NIMErrorImpl || i60.name === 'V2NIMError') {
                throw i60;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: `getNosToken ${i60}`, rawError: i60
                    }
                });
            }
        }
    }
    async getNosAccessToken(y59, z59, a60) {
        try {
            this.core.logger.info(TAG, 'getNosAccessToken', y59);
            const c60 = new GetNosAccessTokenTagParam(y59, z59, a60);
            const d60 = new GetNosAccessTokenTag(c60);
            const e60 = await this.core.sendCmd('getNosAccessToken', d60);
            const f60 = get(e60, 'content.tag.token');
            const g60 = c60.url;
            return {
                token: f60,
                url: g60.indexOf('?') !== -1 ? g60 + '&token=' + f60 : g60 + '?token=' + f60
            };
        }
        catch (b60) {
            this.core.logger.error(TAG, 'getNosAccessToken', JSON.stringify(b60));
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                detail: {
                    reason: `getNosAccessToken ${b60}`, rawError: b60
                }
            });
        }
    }
    async deleteNosAccessToken(u59) {
        try {
            this.core.logger.info(TAG, 'deleteNosAccessToken', u59);
            const w59 = new DeleteNosAccessTokenTagParam(u59);
            const x59 = new DeleteNosAccessTokenTag(w59);
            await this.core.sendCmd('deleteNosAccessToken', x59);
        }
        catch (v59) {
            this.core.logger.error(TAG, 'deleteNosAccessToken', JSON.stringify(v59));
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                detail: {
                    reason: `deleteNosAccessToken ${v59}`, rawError: v59
                }
            });
        }
    }
}
