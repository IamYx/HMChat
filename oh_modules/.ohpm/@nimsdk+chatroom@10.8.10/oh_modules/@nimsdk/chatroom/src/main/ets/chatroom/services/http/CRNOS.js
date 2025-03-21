import NosUploader from '../vendor/yxfe/nos-uploader/src';
import { defaultCloudStorageConfig } from './config';
import fs from '@ohos.file.fs';
import { UploadError, V2NIMErrorCode, V2NIMErrorImpl, NIMPreferenceSync } from '@nimsdk/base';
import { assign, get, pickBy } from '@nimsdk/vendor';
import deviceInfo from '@ohos.deviceInfo';
import connection from '@ohos.net.connection';
import { FileState } from '../vendor/yxfe/nos-uploader/src/fileState';
import { CRNosTokenParams, CRGetNosTokenRequest } from './cloud/CRHttpRequest';
export default class CRNOS {
    constructor(i6) {
        this.nosCdnHostTimer = 0;
        this.nosErrorCount = 0;
        this.core = i6;
        this.config = defaultCloudStorageConfig;
        const j6 = "NIM_NOS_" + this.core.options.appkey;
        const k6 = new NIMPreferenceSync(i6.context, j6);
        this.fileState = new FileState(k6);
    }
    reset() {
        this.nosErrorCount = 0;
    }
    async nosUpload(j5) {
        const k5 = get(this.core, 'config.cdn.bucket');
        const l5 = {
            tag: j5.nosScenes || k5 || 'nim',
            expireSec: j5.nosSurvivalTime ?? 0
        };
        let m5;
        const n5 = new CRNosTokenParams(j5.nosScenes || k5 || 'nim_default_im', j5.nosSurvivalTime ?? 0);
        try {
            m5 = (await this.core.sendCmd('getNosToken', new CRGetNosTokenRequest(1, n5)));
        }
        catch (h6) {
            this.core.logger.error('uploadFile:: getNosToken error', h6);
            if (h6 instanceof V2NIMErrorImpl)
                throw h6;
            throw new UploadError({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED,
                detail: {
                    reason: 'getNosToken error',
                    rawError: h6,
                    curProvider: 1
                }
            });
        }
        const o5 = this.config.uploadReplaceFormat
            .replace('{host}', this.config.cdn.cdnDomain || this.config.cdn.defaultCdnDomain)
            .replace('{object}', decodeURIComponent(m5.content.nosToken[0].objectName));
        let p5 = '';
        const q5 = p5 || o5;
        let r5;
        try {
            const f6 = m5.content.nosToken[0];
            this.core.logger.debug('uploadFile:: uploadFile params', JSON.stringify({
                nosToken: f6,
                chunkUploadHost: this.config.chunkUploadHost,
                platform: deviceInfo.osFullName
            }));
            const g6 = this.config.chunkUploadHost;
            r5 = await this.uploadFile(g6, f6, assign({}, j5, {
                chunkUploadHost: this.config.chunkUploadHost,
                maxSize: j5.maxSize || this.config.chunkMaxSize
            }));
        }
        catch (c6) {
            this.core.logger.error('uploadFile::nos uploadFile error:', JSON.stringify(c6));
            if (c6.code === V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED || c6.errCode === 10499) {
                throw new UploadError({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED,
                    detail: {
                        reason: get(c6, 'message') || 'Request abort',
                        rawError: c6,
                        curProvider: 1
                    }
                });
            }
            if (c6.errCode === V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_OPEN_FAILED) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_OPEN_FAILED,
                    detail: {
                        reason: get(c6, 'message') || 'Read file failed',
                        rawError: c6,
                        curProvider: 1
                    }
                });
            }
            connection.getAllNets((d6, e6) => {
                console.log(JSON.stringify(d6));
                console.log(JSON.stringify(e6));
                if (d6 || !e6) {
                    throw new UploadError({
                        code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED,
                        detail: {
                            reason: 'No network',
                            rawError: d6,
                            curProvider: 1
                        }
                    });
                }
            });
            throw new UploadError({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED,
                detail: {
                    reason: 'NOS attempts failed',
                    rawError: c6,
                    curProvider: 1
                }
            });
        }
        const s5 = r5?.type;
        const t5 = s5 && s5.indexOf('/') > -1 ? s5.slice(0, s5.indexOf('/')) : '';
        const u5 = {
            image: 'imageInfo',
            video: 'vinfo',
            audio: 'vinfo'
        };
        if (!u5[t5]) {
            return {
                url: q5,
                ...r5
            };
        }
        let v5;
        try {
            v5 = await this.core.httpService.request(`${o5}?${u5[t5]}`, {}, {
                exception_service: 3
            });
        }
        catch (b6) {
            this.core.logger.error('uploadFile:: fetch file info error', b6);
            return {
                url: q5,
                ...r5
            };
        }
        if (v5) {
            const { data: w5 } = v5;
            const x5 = u5[t5] === 'imageInfo' ? w5 : w5?.GetVideoInfo?.VideoInfo;
            const y5 = {
                url: q5,
                name: r5.name,
                size: r5.size,
                ext: r5.ext,
                w: x5.Width,
                h: x5.Height,
                orientation: x5.Orientation,
                dur: x5.Duration,
                audioCodec: x5.AudioCodec,
                videoCodec: x5.VideoCodec,
                container: x5.Container
            };
            return pickBy(y5, function (z5, a6) {
                return typeof a6 !== 'undefined';
            });
        }
        else {
            return {
                url: q5,
                ...r5
            };
        }
    }
    async _getNosCdnHost() {
        let f5;
        try {
            f5 = (await this.core.sendCmd('getNosCdnHost'));
        }
        catch (i5) {
            this.core.logger.error('getNosCdnHost::error', i5);
            return;
        }
        if (!f5)
            return;
        const g5 = get(f5, "content.nosConfigTag");
        const h5 = parseInt(g5?.expire);
        if (h5 === 0 || !g5.cdnDomain) {
            this.config.cdn.bucket = '';
            this.config.cdn.cdnDomain = '';
            this.config.cdn.objectNamePrefix = '';
        }
        else if (h5 === -1) {
            this.config.cdn.bucket = g5.bucket;
            this.config.cdn.cdnDomain = g5.cdnDomain;
            this.config.cdn.objectNamePrefix = g5.objectNamePrefix;
        }
        else {
            this.config.cdn.bucket = g5.bucket;
            this.config.cdn.cdnDomain = g5.cdnDomain;
            this.config.cdn.objectNamePrefix = g5.objectNamePrefix;
            this.nosCdnHostTimer = this.core.timerManager.addTimer(() => {
                this._getNosCdnHost();
            }, h5 * 1000);
        }
    }
    async uploadFile(r4, s4, t4) {
        if (!t4.file) {
            throw new Error('File not exist');
        }
        const u4 = t4.file;
        const v4 = fs.statSync(u4.path);
        if (t4.maxSize && v4.size > t4.maxSize) {
            throw new Error(`The file exceeds maxSize limit. maxSize: ${t4.maxSize}, get ${v4.size}`);
        }
        this.core.logger.info('uploadFile:: UploadFileOptions', JSON.stringify(t4));
        const w4 = (await new Promise((x4, y4) => {
            const z4 = NosUploader.createConfig({
                enableCache: false,
                retryCount: 0,
                directUploadAddr: r4,
                onError: (e5) => {
                    y4(e5);
                },
                onUploadProgress: t4.onUploadProgress || ((d5) => { }),
                onComplete: (c5) => { x4(c5); }
            });
            this.core.logger.info('uploadFile:: uploaderConfig', JSON.stringify(z4));
            const a5 = NosUploader.createTask(u4, {
                bucketName: s4.bucket,
                objectName: decodeURIComponent(s4.objectName),
                token: s4.token,
                ...(t4.md5 ? { md5: t4.md5 } : {}),
                ...(t4.type ? { type: t4.type } : {}),
            }, z4, this.fileState);
            try {
                t4.onUploadStart && t4.onUploadStart(a5);
            }
            catch (b5) {
                console.error('Adapter uploadFile: options.onUploadStart error', b5 && b5.message);
                a5.abort();
                y4(b5);
            }
        }));
        w4.name = u4.name;
        w4.size = v4.size;
        w4.type = t4.type;
        w4.ext = w4.name.lastIndexOf('.') > -1 ? w4.name.slice(w4.name.lastIndexOf('.') + 1).toLowerCase() : '';
        return w4;
    }
}
