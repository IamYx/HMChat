import { guid, IM_SDK_VERSION, V2NIMErrorCode, V2NIMErrorImpl, V2NIMMessageType, V2NIMStorageSceneConfig, validate } from '@nimsdk/base';
import fs from '@ohos.file.fs';
import CRBaseService from '../base/CRBaseService';
import { getThumbOrCoverUrl, uploadFileParamsRules } from './rules';
import { registerCRAspect } from './aspect';
import cryptoFramework from "@ohos.security.cryptoFramework";
import deviceInfo from "@ohos.deviceInfo";
import request from "@ohos.request";
const TAG = '[CRStorageServiceImpl]';
export default class CRStorageServiceImpl extends CRBaseService {
    constructor(t43) {
        super('storageService', t43);
        this.sceneMap = new Map([
            ['nim_default_profile_icon', V2NIMStorageSceneConfig.DEFAULT_PROFILE()],
            ['nim_default_im', V2NIMStorageSceneConfig.DEFAULT_IM()],
            ['nim_system_nos_scene', V2NIMStorageSceneConfig.DEFAULT_SYSTEM()],
            ['nim_security', V2NIMStorageSceneConfig.SECURITY_LINK()],
        ]);
        this.uploadingCatch = new Map();
        this.downloadTaskCatch = new Map();
        this.core = t43;
        registerCRAspect(CRStorageServiceImpl);
    }
    addCustomStorageScene(q43, r43) {
        validate({
            sceneName: {
                type: 'string', allowEmpty: false
            },
            expireTime: {
                type: 'number', min: 0
            }
        }, {
            sceneName: q43,
            expireTime: r43
        }, '', true);
        let s43 = {
            sceneName: q43,
            expireTime: r43
        };
        this.sceneMap.set(q43, s43);
        return s43;
    }
    getStorageSceneList() {
        return Array.from(this.sceneMap.values());
    }
    getStorageScene(p43) {
        return this.sceneMap.get(p43) || V2NIMStorageSceneConfig.DEFAULT_IM();
    }
    hasStorageScene(n43) {
        const o43 = this.sceneMap.get(n43);
        return o43 !== undefined;
    }
    createUploadFileTask(l43) {
        if (typeof l43.filePath === 'undefined' || l43.filePath === "") {
            return null;
        }
        let m43 = {};
        m43.taskId = guid();
        m43.uploadParams = l43;
        if (l43.sceneName.trim().length > 0) {
            this.addCustomStorageScene(l43.sceneName, 0);
        }
        else {
            m43.uploadParams.sceneName = V2NIMStorageSceneConfig.DEFAULT_IM().sceneName;
        }
        return {
            taskId: guid(),
            uploadParams: l43
        };
    }
    async uploadFile(i43, j43) {
        validate(uploadFileParamsRules, i43, 'fileTask', true);
        const k43 = await this.uploadFileTask(i43, j43);
        return k43.url;
    }
    async cancelAllUpload() {
        try {
            this.core.logger.info(TAG + `cancelAllUpload `);
            this.uploadingCatch.forEach((g43, h43) => {
                this.cancelUploadFileByTaskId(h43);
            });
        }
        catch (f43) {
            this.core.logger.error(TAG + `cancelAllUpload failed ${f43}`);
        }
    }
    async cancelUploadFile(e43) {
        await this.cancelUploadFileByTaskId(e43.taskId);
    }
    async cancelUploadFileByTaskId(b43) {
        const c43 = this.uploadingCatch.get(b43);
        if (c43?.task) {
            try {
                await c43.task.abort();
                this.uploadingCatch.delete(b43);
            }
            catch (d43) {
                this.uploadingCatch.delete(b43);
                this.core.logger.error('cancelMessageAttachmentUpload::abort error.', d43);
            }
        }
        else if (c43) {
            c43.abort = true;
        }
        else {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST,
                detail: {
                    reason: 'V2NIMStorageService.cancelUploadFile: task not exist'
                }
            });
        }
    }
    async uploadFileTask(n42, o42, p42) {
        try {
            this.core.logger.info(TAG + `uploadFileTask ${n42}`);
            validate({
                taskId: {
                    type: 'string', allowEmpty: false
                }
            }, n42, 'fileTask', true);
            if (typeof this.uploadingCatch.get(n42.taskId) !== 'undefined') {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_RESOURCE_ALREADY_EXIST,
                    detail: {
                        reason: 'V2NIMStorageService.uploadFile: repeat upload'
                    }
                });
            }
            const s42 = {};
            try {
                const a43 = fs.openSync(n42.uploadParams.filePath);
                s42.file = a43;
            }
            catch (z42) {
                operateOpenFileError(z42);
            }
            const t42 = this.getStorageScene(n42.uploadParams.sceneName);
            s42.nosScenes = t42.sceneName;
            s42.nosSurvivalTime = t42.expireTime;
            if (p42?.fileType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE) {
                s42.type = 'image';
            }
            else if (p42?.fileType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO) {
                s42.type = 'audio';
            }
            else if (p42?.fileType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO) {
                s42.type = 'video';
            }
            else {
                s42.type = 'file';
            }
            s42.onUploadProgress = (x42) => {
                if (o42) {
                    let y42 = 0;
                    if (x42.total != 0) {
                        y42 = x42.loaded / x42.total;
                    }
                    o42(y42);
                }
            };
            const u42 = this.uploadingCatch.get(n42.taskId);
            s42.onUploadStart = (w42) => {
                if (u42?.abort) {
                    w42.abort();
                    this.uploadingCatch.delete(n42.taskId);
                    return;
                }
                else {
                    this.uploadingCatch.set(n42.taskId, {
                        abort: false,
                        task: w42
                    });
                }
            };
            this.uploadingCatch.set(n42.taskId, {
                abort: false,
                task: s42
            });
            const v42 = await this.core.httpService.uploadFile(s42);
            this.uploadingCatch.delete(n42.taskId);
            return v42;
        }
        catch (q42) {
            const r42 = this.uploadingCatch.get(n42.taskId);
            this.uploadingCatch.delete(n42.taskId);
            if (r42?.task.uploadState === 'abort') {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED,
                    detail: {
                        reason: 'CRStorageServiceImpl: upload cancel' + `${q42}`
                    }
                });
            }
            else {
                if (q42 instanceof V2NIMErrorImpl || q42.name === 'V2NIMError') {
                    throw q42;
                }
                this.core.logger.error(TAG + `uploadFileTask ${q42}`);
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: 'CRStorageServiceImpl: upload failed' + `${q42}`
                    }
                });
            }
        }
    }
    async downloadFile(v41, w41, x41) {
        try {
            this.core.logger.info(TAG, 'downloadFile', v41, w41);
            validate({ url: { type: 'string', allowEmpty: false } }, { url: v41 }, '', true);
            validate({
                filePath: {
                    type: 'string', allowEmpty: false
                }
            }, {
                filePath: w41
            }, '', true);
            let z41 = fs.accessSync(w41);
            if (z41) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_RESOURCE_ALREADY_EXIST,
                    detail: {
                        reason: 'downloadFile: filepath already exist'
                    }
                });
            }
            let a42 = v41;
            this.core.logger.info(TAG, 'downloadFile replace url', a42);
            const b42 = {
                url: a42,
                header: {
                    "user-agent": `NIM/HOS/${deviceInfo.manufacture}/${deviceInfo.osFullName}/${IM_SDK_VERSION}/${this.core.options.appkey}`
                },
                enableMetered: true,
                enableRoaming: true,
                filePath: w41,
            };
            const c42 = await request.downloadFile(this.core.context, b42);
            this.downloadTaskCatch.set(v41, c42);
            return new Promise((d42, e42) => {
                let f42 = (k42, l42) => {
                    this.core.logger.info(TAG, 'download receivedSize', k42, 'totalSize:' + l42);
                    if (x41) {
                        const m42 = calculateProgress(k42, l42);
                        x41(m42);
                    }
                };
                c42.on('progress', f42);
                let g42 = () => {
                    this.core.logger.info(TAG, 'Download task completed', v41);
                    this.downloadTaskCatch.delete(v41);
                    d42(w41);
                };
                c42.on('complete', g42);
                let h42 = () => {
                    this.downloadTaskCatch.delete(v41);
                    this.core.logger.warn(TAG, 'Download task cancel completed', v41);
                    e42(new V2NIMErrorImpl({
                        code: V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED,
                        detail: {
                            reason: 'operation cancelled'
                        }
                    }));
                };
                c42.on('remove', h42);
                let i42 = (j42) => {
                    this.downloadTaskCatch.delete(v41);
                    this.core.logger.error(TAG, 'download task failed', v41, w41);
                    e42(new V2NIMErrorImpl({
                        code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_DOWNLOAD_FAILED,
                        detail: {
                            reason: 'downloadFile: error: ' + `${j42}`
                        }
                    }));
                };
                c42.on('fail', i42);
            });
        }
        catch (y41) {
            this.downloadTaskCatch.delete(v41);
            if (y41 instanceof V2NIMErrorImpl || y41.name === 'V2NIMError') {
                throw y41;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_DOWNLOAD_FAILED,
                    detail: {
                        reason: 'downloadFile: error: ' + `${JSON.stringify(y41)}`
                    }
                });
            }
        }
    }
    async downloadAttachment(a41, b41) {
        const c41 = a41.attachment;
        try {
            this.core.logger.info(TAG, 'downloadAttachment', a41);
            if (typeof c41 === 'undefined' || typeof c41.url === 'undefined' || c41.url.length === 0) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                    detail: {
                        reason: 'downloadAttachment: url not exist'
                    }
                });
            }
            if (typeof a41.type === 'undefined') {
                a41.type = 0;
            }
            if (a41.type > 2 || a41.type < 0) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                    detail: {
                        reason: 'downloadParam: type not exist'
                    }
                });
            }
            const e41 = this.getSavePath(a41);
            const f41 = fs.accessSync(e41);
            if (f41) {
                this.core.logger.info(TAG, 'downloadAttachment: filePath is existed');
                return e41;
            }
            let g41 = c41.url;
            if (a41.type === 1) {
                const u41 = await this.getImageThumbUrl(c41, a41.thumbSize);
                g41 = u41.url;
            }
            else if (a41.type === 2) {
                const t41 = await this.getVideoCoverUrl(c41, a41.thumbSize);
                g41 = t41.url;
            }
            this.core.logger.info(TAG, 'downloadFile replace url', g41);
            const h41 = {
                url: g41,
                header: {
                    "user-agent": `NIM/HOS/${deviceInfo.manufacture}/${deviceInfo.osFullName}/${IM_SDK_VERSION}/${this.core.options.appkey}`
                },
                enableMetered: true,
                enableRoaming: true,
                filePath: e41,
            };
            const i41 = await request.downloadFile(this.core.context, h41);
            this.downloadTaskCatch.set(g41, i41);
            return new Promise((j41, k41) => {
                let l41 = (q41, r41) => {
                    this.core.logger.info(TAG, 'download receivedSize', q41, 'totalSize:' + r41);
                    if (b41) {
                        const s41 = calculateProgress(q41, r41);
                        b41(s41);
                    }
                };
                i41.on('progress', l41);
                let m41 = async () => {
                    this.core.logger.info(TAG, 'Download task completed', g41);
                    this.downloadTaskCatch.delete(g41);
                    if (typeof a41.messageClientId !== 'undefined' && a41.messageClientId.length > 0) {
                    }
                    j41(e41);
                };
                i41.on('complete', m41);
                let n41 = () => {
                    this.downloadTaskCatch.delete(g41);
                    this.core.logger.warn(TAG, 'Download task cancel completed', g41);
                    k41(new V2NIMErrorImpl({
                        code: V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED,
                        detail: {
                            reason: 'operation cancelled'
                        }
                    }));
                };
                i41.on('remove', n41);
                let o41 = (p41) => {
                    this.downloadTaskCatch.delete(g41);
                    this.core.logger.error(TAG, 'download task failed', g41, e41);
                    k41(new V2NIMErrorImpl({
                        code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_DOWNLOAD_FAILED,
                        detail: {
                            reason: 'downloadFile: error: ' + `${p41}`
                        }
                    }));
                };
                i41.on('fail', o41);
            });
        }
        catch (d41) {
            this.downloadTaskCatch.delete(c41?.url ?? '');
            if (d41 instanceof V2NIMErrorImpl || d41.name === 'V2NIMError') {
                throw d41;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_DOWNLOAD_FAILED,
                    detail: {
                        reason: 'downloadFile: error: ' + `${JSON.stringify(d41)}`
                    }
                });
            }
        }
    }
    async getImageThumbUrl(u40, v40) {
        const w40 = u40;
        validate(getThumbOrCoverUrl, {
            _attachment: w40,
            thumbSize: v40
        }, '', true);
        const x40 = {
            height: 0
        };
        x40.width = v40?.width ?? 0;
        x40.height = v40?.height ?? 0;
        if (x40.width === 0 && x40.height === 0) {
            x40.width = 150;
        }
        let y40 = w40.url;
        try {
            y40 = await this.shortUrlToLong(w40.url);
        }
        catch (z40) {
            this.core.logger.warn('shortUrlToLong error:', z40);
        }
        return {
            url: this.makeThumbUrl(y40, x40.width, x40.height)
        };
    }
    async getVideoCoverUrl(o40, p40) {
        const q40 = o40;
        validate(getThumbOrCoverUrl, { _attachment: q40, thumbSize: p40 }, '', true);
        const r40 = {
            height: 0
        };
        r40.width = p40?.width ?? 0;
        r40.height = p40?.height ?? 0;
        if (r40.width === 0 && r40.height === 0) {
            r40.width = 150;
        }
        let s40 = q40.url;
        try {
            s40 = await this.shortUrlToLong(q40.url);
        }
        catch (t40) {
            this.core.logger.warn('shortUrlToLong error:', t40);
        }
        return {
            url: this.makeVideoCoverUrl(s40, r40.width, r40.height)
        };
    }
    makeThumbUrl(k40, l40, m40) {
        const n40 = new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/);
        if (!n40.test(k40)) {
            this.logger.error('illegal file url:' + k40);
            return k40;
        }
        if (k40.includes('?')) {
            return k40 + `&imageView&thumbnail=${l40}x${m40}`;
        }
        else {
            return k40 + `?imageView&thumbnail=${l40}x${m40}`;
        }
    }
    makeVideoCoverUrl(g40, h40, i40) {
        const j40 = new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/);
        if (!j40.test(g40)) {
            this.logger.error('illegal file url:' + g40);
            return g40;
        }
        if (g40.includes('?')) {
            return g40 + `&vframe&offset=0&resize=${h40}x${i40}&type=png`;
        }
        else {
            return g40 + `?vframe&offset=0&resize=${h40}x${i40}&type=png`;
        }
    }
    async shortUrlToLong(e40) {
        this.core.logger.info(TAG, 'shortUrlToLong', e40);
        const f40 = await this.core.httpService.getOriginUrl(e40);
        this.core.logger.info(TAG, 'shortUrlToLong ret', f40);
        return f40;
    }
    getSavePath(s39) {
        const t39 = s39.attachment;
        if (typeof s39.saveAs === 'string' && s39.saveAs.length > 0) {
            return s39.saveAs;
        }
        if (typeof t39.path === 'string' && t39.path.length > 0) {
            if (s39.type === 0) {
                return t39.path;
            }
            else {
                const z39 = t39.path.lastIndexOf('/');
                const a40 = t39.path.substring(0, z39);
                const b40 = t39.path.substring(z39 + 1);
                const c40 = b40.lastIndexOf('.');
                const d40 = b40.substring(0, c40);
                return a40 + `/thumb_${d40}` + '.png';
            }
        }
        const u39 = this.core.context.cacheDir + '/nim_chatroom/';
        if (!fs.accessSync(u39)) {
            fs.mkdirSync(u39, true);
        }
        let v39;
        let w39;
        if (typeof t39.md5 === 'string' && t39.md5.length > 0) {
            v39 = t39.md5;
        }
        else {
            v39 = md5(t39.url ?? 'default');
        }
        if (s39.type === 1 ||
            s39.type === 2) {
            const y39 = u39 + 'thumb/';
            if (!fs.accessSync(y39)) {
                fs.mkdirSync(y39, true);
            }
            w39 = y39 + `thumb_${v39}` + '.png';
        }
        else {
            const x39 = u39 + 'source/';
            if (!fs.accessSync(x39)) {
                fs.mkdirSync(x39, true);
            }
            w39 = x39 + v39 + t39.ext ?? '';
        }
        return w39;
    }
}
function operateOpenFileError(q39) {
    const r39 = q39;
    if (r39.code === 13900001
        || r39.code === 13900004
        || r39.code === 13900006
        || r39.code === 13900008
        || r39.code === 13900014
        || r39.code === 13900022
        || r39.code === 13900023
        || r39.code === 13900027
        || r39.code === 13900034) {
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_OPEN_FAILED,
            detail: {
                reason: 'V2NIMStorageService: upload cancel, file open failed' + `${r39}`
            }
        });
    }
    else if (r39.code === 13900002
        || r39.code === 13900017
        || r39.code === 13900018
        || r39.code === 13900019
        || r39.code === 13900020
        || r39.code === 13900030
        || r39.code === 13900033
        || r39.code === 13900042) {
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_NOT_FOUND,
            detail: {
                reason: 'CRStorageServiceImpl: upload cancel, file not found' + `${r39}`
            }
        });
    }
    else {
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
            detail: {
                reason: 'CRStorageServiceImpl: upload cancel unknown error' + `${r39}`
            }
        });
    }
}
function md5(o39) {
    const p39 = cryptoFramework.createMd('MD5');
    p39.updateSync({ 'data': stringToUint8Array(o39) });
    return uint8ArrayToHex((p39.digestSync()).data);
}
function stringToUint8Array(l39) {
    let m39 = [];
    for (let n39 = 0; n39 < l39.length; n39++) {
        m39.push(l39.charCodeAt(n39));
    }
    return new Uint8Array(m39);
}
function uint8ArrayToHex(j39) {
    return Array.from(j39).map(k39 => k39.toString(16).padStart(2, '0')).join('');
}
function calculateProgress(g39, h39) {
    const i39 = (g39 / h39) * 100;
    if (i39 < 0) {
        return 0;
    }
    else if (i39 > 100) {
        return 100;
    }
    else {
        return i39;
    }
}
