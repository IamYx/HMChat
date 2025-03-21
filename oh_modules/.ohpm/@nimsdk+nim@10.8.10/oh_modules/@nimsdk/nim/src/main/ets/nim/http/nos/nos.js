import { defaultCloudStorageConfig } from '../config';
import fs from '@ohos.file.fs';
import { NIMPreferenceSync, UploadError, V2NIMErrorCode, V2NIMErrorImpl } from '@nimsdk/base';
import { assign, get, pickBy } from '@nimsdk/vendor';
import deviceInfo from '@ohos.deviceInfo';
import connection from '@ohos.net.connection';
import { FileState } from './FileState';
import { NosUploader } from './NosUploader';
import Queue from "@ohos.util.Queue";
import { NosTokenCloud } from './NosTokenCloud';
const TAG = '[NOS]';
export default class NOS {
    constructor(g59, h59) {
        this.nosCdnHostTimer = 0;
        this.nosErrorCount = 0;
        this.core = g59;
        this.config = defaultCloudStorageConfig;
        this.tokenQueue = new Queue();
        this.cloud = new NosTokenCloud(g59);
        const i59 = "NIM_NOS_" + this.core.options.appkey;
        if (h59 && typeof h59.chunkUploadHost !== 'undefined') {
            this.config.chunkUploadHost = h59.chunkUploadHost;
        }
        if (h59 && typeof h59.uploadReplaceFormat !== 'undefined') {
            this.config.uploadReplaceFormat = h59.uploadReplaceFormat;
        }
        const j59 = new NIMPreferenceSync(g59.context, i59);
        this.fileState = new FileState(j59);
    }
    reset() {
        this.nosErrorCount = 0;
    }
    async nosUpload(h58) {
        this.core.logger.info(TAG, 'nosUpload', h58);
        let i58 = this.tokenQueue.pop();
        this.core.logger.info(TAG, 'nosUpload uploadTokenInfo in catch', i58);
        try {
            const d59 = Date.now();
            if (!i58 || parseInt(i58.expireTime) * 1000 <= d59) {
                const e59 = await this.cloud.getNosToke(h58);
                while (this.tokenQueue.length > 0) {
                    this.tokenQueue.pop();
                }
                e59.map(f59 => {
                    this.tokenQueue.add(f59);
                });
                i58 = this.tokenQueue.pop();
                this.core.logger.info(TAG, 'getNosToken', e59);
            }
        }
        catch (c59) {
            this.core.logger.error(TAG, 'nosUpload getNosToken error', c59);
            if (c59 instanceof V2NIMErrorImpl) {
                throw c59;
            }
            throw new UploadError({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED,
                detail: {
                    reason: 'getNosToken error',
                    rawError: c59,
                    curProvider: 1
                }
            });
        }
        const j58 = this.config.uploadReplaceFormat
            .replace('{host}', this.config.cdn.cdnDomain || this.config.cdn.defaultCdnDomain)
            .replace('{object}', decodeURIComponent(i58.objectName));
        let k58 = '';
        const l58 = k58 || j58;
        this.core.logger.info(TAG, 'nosUpload url', l58);
        let m58;
        try {
            const a59 = i58;
            this.core.logger.info(TAG, 'uploadFile:: uploadFile params', a59, this.config.chunkUploadHost, deviceInfo.osFullName);
            const b59 = this.config.chunkUploadHost;
            m58 = await this.uploadFile(b59, a59, assign({}, h58, {
                chunkUploadHost: this.config.chunkUploadHost,
                maxSize: h58.maxSize || this.config.chunkMaxSize
            }));
        }
        catch (x58) {
            this.core.logger.error(TAG, 'uploadFile::nos uploadFile error:', x58);
            if (x58.code === V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED || x58.code === 10499) {
                throw new UploadError({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED,
                    detail: {
                        reason: get(x58, 'message') || 'Request abort',
                        rawError: x58,
                        curProvider: 1
                    }
                });
            }
            if (x58.code === V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_OPEN_FAILED) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_OPEN_FAILED,
                    detail: {
                        reason: get(x58, 'message') || 'Read file failed',
                        rawError: x58,
                        curProvider: 1
                    }
                });
            }
            try {
                let z58 = connection.getDefaultNetSync();
                if (z58.netId == 0) {
                    throw new UploadError({
                        code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED,
                        detail: {
                            reason: 'No network',
                            rawError: new Error,
                            curProvider: 1
                        }
                    });
                }
            }
            catch (y58) {
                throw new UploadError({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED,
                    detail: {
                        reason: 'No network',
                        rawError: y58,
                        curProvider: 1
                    }
                });
            }
            throw new UploadError({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED,
                detail: {
                    reason: 'NOS attempts failed',
                    rawError: x58,
                    curProvider: 1
                }
            });
        }
        const n58 = m58?.type;
        const o58 = n58 && n58.indexOf('/') > -1 ? n58.slice(0, n58.indexOf('/')) : '';
        const p58 = {
            image: 'imageInfo',
            video: 'vinfo',
            audio: 'vinfo'
        };
        if (!p58[o58]) {
            return {
                url: l58,
                ...m58
            };
        }
        let q58;
        try {
            q58 = await this.core.httpService.request(`${j58}?${p58[o58]}`, {}, {
                exception_service: 3
            });
            this.core.logger.info(TAG, 'uploadFile, fileInfoResponse:', q58);
        }
        catch (w58) {
            this.core.logger.error(TAG, 'uploadFile:: fetch file info error', w58);
            return {
                url: l58,
                ...m58
            };
        }
        if (q58) {
            const { data: r58 } = q58;
            const s58 = p58[o58] === 'imageInfo' ? r58 : r58?.GetVideoInfo?.VideoInfo;
            const t58 = {
                url: l58,
                name: m58.name,
                size: m58.size,
                ext: m58.ext,
                w: s58.Width,
                h: s58.Height,
                orientation: s58.Orientation,
                dur: s58.Duration,
                audioCodec: s58.AudioCodec,
                videoCodec: s58.VideoCodec,
                container: s58.Container
            };
            return pickBy(t58, function (u58, v58) {
                return typeof v58 !== 'undefined';
            });
        }
        else {
            return {
                url: l58,
                ...m58
            };
        }
    }
    async getNosAccessToken(e58, f58, g58) {
        return await this.cloud.getNosAccessToken(e58, f58, g58);
    }
    async deleteNosAccessToken(d58) {
        await this.cloud.deleteNosAccessToken(d58);
    }
    async _getNosCdnHost() {
        let z57;
        try {
            z57 = (await this.core.sendCmd('getNosCdnHost'));
        }
        catch (c58) {
            this.core.logger.error('getNosCdnHost::error', c58);
            return;
        }
        if (!z57) {
            return;
        }
        const a58 = z57?.content?.nosConfigTag;
        const b58 = parseInt(a58?.expire);
        if (b58 === 0 || !a58.cdnDomain) {
            this.config.cdn.bucket = '';
            this.config.cdn.cdnDomain = '';
            this.config.cdn.objectNamePrefix = '';
        }
        else if (b58 === -1) {
            this.config.cdn.bucket = a58.bucket;
            this.config.cdn.cdnDomain = a58.cdnDomain;
            this.config.cdn.objectNamePrefix = a58.objectNamePrefix;
        }
        else {
            this.config.cdn.bucket = a58.bucket;
            this.config.cdn.cdnDomain = a58.cdnDomain;
            this.config.cdn.objectNamePrefix = a58.objectNamePrefix;
            this.nosCdnHostTimer = this.core.timerManager.addTimer(() => {
                this._getNosCdnHost();
            }, b58 * 1000);
        }
    }
    async uploadFile(l57, m57, n57) {
        if (!n57.file) {
            throw new Error('File not exist');
        }
        const o57 = n57.file;
        const p57 = fs.statSync(o57.path);
        if (n57.maxSize && p57.size > n57.maxSize) {
            throw new Error(`The file exceeds maxSize limit. maxSize: ${n57.maxSize}, get ${p57.size}`);
        }
        this.core.logger.info(TAG, 'uploadFile:: UploadFileOptions', n57);
        const q57 = (await new Promise((r57, s57) => {
            const t57 = NosUploader.createConfig({
                enableCache: false,
                retryCount: 0,
                directUploadAddr: l57,
                onError: (y57) => {
                    s57(y57);
                },
                onUploadProgress: n57.onUploadProgress || ((x57) => {
                }),
                onComplete: (w57) => {
                    r57(w57);
                }
            });
            this.core.logger.info(TAG, 'uploadFile:: uploaderConfig', t57);
            const u57 = NosUploader.createTask(o57, {
                bucketName: m57.bucket,
                objectName: decodeURIComponent(m57.objectName),
                token: m57.token,
                ...(n57.md5 ? {
                    md5: n57.md5
                } : {}),
                ...(n57.type ? {
                    type: n57.type
                } : {}),
            }, t57, this.fileState, this.core);
            try {
                n57.onUploadStart && n57.onUploadStart(u57);
            }
            catch (v57) {
                this.core.logger.error('Adapter uploadFile: options.onUploadStart error', v57 && v57.message);
                u57.abort();
                s57(v57);
            }
        }));
        q57.name = o57.name;
        q57.size = p57.size;
        q57.type = n57.type;
        q57.ext = q57.name.lastIndexOf('.') > -1 ?
            q57.name.slice(q57.name.lastIndexOf('.') + 1).toLowerCase() : '';
        return q57;
    }
}
