import util from "@ohos.util";
import hash from "@ohos.file.hash";
import cryptoFramework from "@ohos.security.cryptoFramework";
import { guid, IM_SDK_VERSION, V2NIMErrorCode, V2NIMErrorImpl, V2NIMMessageType, V2NIMStorageSceneConfig, V2Service, validate } from '@nimsdk/base';
import deviceInfo from '@ohos.deviceInfo';
import fs from '@ohos.file.fs';
import request from '@ohos.request';
import { ResourceTraceReporter, ResourceTraceStep } from '../http/nos/ResourceTraceReporter';
import { registerAspect } from './Aspect';
import { uploadFileParamsRules } from './rules';
const TAG = '[StorageService]';
export default class V2NIMStorageServiceImpl extends V2Service {
    constructor(a117, b117, c117) {
        super(b117, a117);
        this.sceneMap = new Map([['nim_default_profile_icon', V2NIMStorageSceneConfig.DEFAULT_PROFILE()],
            ['nim_default_im', V2NIMStorageSceneConfig.DEFAULT_IM()],
            ['nim_system_nos_scene', V2NIMStorageSceneConfig.DEFAULT_SYSTEM()],
            ['nim_security', V2NIMStorageSceneConfig.SECURITY_LINK()],]);
        this.uploadingCatch = new Map();
        this.downloadTaskCatch = new Map();
        this.core = a117;
        this.config = c117;
        registerAspect(V2NIMStorageServiceImpl, a117);
    }
    async onLoginStart(z116) {
    }
    async onLoginFinished(y116) {
    }
    async onLogout() {
        this.core.logger.info(TAG, 'onLogout');
        try {
            for (const x116 of this.uploadingCatch.keys()) {
                await this._cancelUploadFile(x116);
            }
        }
        catch (w116) {
            this.core.logger.error(TAG, 'onLogout cancel task fatal:', w116);
        }
    }
    addCustomStorageScene(u116, v116) {
        this.core.logger.info(TAG, 'call API addCustomStorageScene', u116, v116);
        return this.v2IAddCustomStorageScene(u116, v116);
    }
    getStorageSceneList() {
        this.core.logger.info(TAG, 'call API getStorageSceneList');
        return this.v2IGetStorageSceneList();
    }
    createUploadFileTask(t116) {
        this.core.logger.info(TAG, 'call API createUploadFileTask', t116);
        return this.v2ICreateUploadFileTask(t116);
    }
    async uploadFile(r116, s116) {
        this.core.logger.info(TAG, 'call API uploadFile', r116);
        return await this.v2IUploadFile(r116, s116);
    }
    async cancelUploadFile(q116) {
        this.core.logger.info(TAG, 'call API cancelUploadFile', q116);
        return await this.v2ICancelUploadFile(q116);
    }
    async downloadFile(n116, o116, p116) {
        this.core.logger.info(TAG, 'call API downloadFile', n116, o116);
        return await this.v2IDownloadFile(n116, o116, p116);
    }
    async cancelDownloadFile(m116) {
        this.core.logger.info(TAG, 'call API cancelDownloadFile', m116);
        return await this.v2ICancelDownloadFile(m116);
    }
    async shortUrlToLong(l116) {
        this.core.logger.info(TAG, 'call API shortUrlToLong', l116);
        return await this.v2IShortUrlToLong(l116);
    }
    getSdkLogPath() {
        this.core.logger.info(TAG, 'call API getSdkLogPath');
        return this.v2IGetSdkLogPath();
    }
    getSdkLogDirPath() {
        this.core.logger.info(TAG, 'call API getSdkLogDirPath');
        return this.v2IGetSdkLogDirPath();
    }
    async uploadSDKLogs() {
        this.core.logger.info(TAG, 'call API uploadSDKLogs');
        return await this.v2IUploadSDKLogs();
    }
    async downloadAttachment(j116, k116) {
        this.core.logger.info(TAG, 'call API downloadAttachment', j116);
        return await this.v2IDownloadAttachment(j116, k116);
    }
    async getImageThumbUrl(h116, i116) {
        this.core.logger.info(TAG, 'call API getImageThumbUrl', h116, i116);
        return await this.v2IGetImageThumbUrl(h116, i116);
    }
    async getVideoCoverUrl(f116, g116) {
        this.core.logger.info(TAG, 'call API getVideoCoverUrl', f116, g116);
        return await this.v2IGetVideoCoverUrl(f116, g116);
    }
    v2IAddCustomStorageScene(c116, d116) {
        let e116 = {};
        if ((typeof c116 === 'string' && c116.length > 0) &&
            (typeof d116 === 'number' && d116 >= 0)) {
            e116 = {
                sceneName: c116,
                expireTime: d116
            };
            this.sceneMap.set(c116, e116);
        }
        return e116;
    }
    v2IGetStorageSceneList() {
        const z115 = [];
        let a116 = this.sceneMap.values();
        for (let b116 of a116) {
            z115.push(b116);
        }
        return z115;
    }
    async v2IDownloadFile(u115, v115, w115) {
        try {
            this.checkLogin();
            validate({
                url: {
                    type: 'string', allowEmpty: false
                }
            }, {
                url: u115
            }, '', true);
            validate({
                filePath: {
                    type: 'string', allowEmpty: false
                }
            }, {
                filePath: v115
            }, '', true);
            let y115 = fs.accessSync(v115);
            if (y115) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_RESOURCE_ALREADY_EXIST,
                    detail: {
                        reason: 'downloadFile: filepath already exist'
                    }
                });
            }
            return await this._downloadFile(u115, v115, w115);
        }
        catch (x115) {
            if (x115 instanceof V2NIMErrorImpl || x115.name === 'V2NIMError') {
                throw x115;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_DOWNLOAD_FAILED,
                    detail: {
                        reason: 'downloadFile: error: ' + `${JSON.stringify(x115)}`
                    }
                });
            }
        }
    }
    async v2IDownloadAttachment(l115, m115) {
        const n115 = l115.attachment;
        try {
            this.checkLogin();
            if (typeof n115 === 'undefined' || typeof n115.url === 'undefined' || n115.url.length === 0) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                    detail: {
                        reason: 'downloadAttachment: url not exist'
                    }
                });
            }
            if (typeof l115.type === 'undefined') {
                l115.type = 0;
            }
            if (l115.type > 2 || l115.type < 0) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                    detail: {
                        reason: 'downloadParam: type not exist'
                    }
                });
            }
            const p115 = this.getSavePath(l115);
            const q115 = fs.accessSync(p115);
            if (q115) {
                this.core.logger.info(TAG, 'downloadAttachment: filePath is existed');
                if (typeof l115.messageClientId !== 'undefined' &&
                    l115.messageClientId.length > 0 &&
                    l115.type === 0) {
                    await this.core.messageService.v2IUpdateAttachment(l115.messageClientId, p115);
                }
                return p115;
            }
            this.core.logger.info(TAG, 'downloadAttachment: filePath', p115);
            let r115 = n115.url;
            if (l115.type === 1) {
                const t115 = await this.core.storageUtil.getImageThumbUrl(n115, l115.thumbSize);
                r115 = t115.url;
            }
            else if (l115.type === 2) {
                const s115 = await this.core.storageUtil.getVideoCoverUrl(n115, l115.thumbSize);
                r115 = s115.url;
            }
            return await this._downloadFile(r115, p115, m115, l115.type, l115.messageClientId);
        }
        catch (o115) {
            if (o115 instanceof V2NIMErrorImpl || o115.name === 'V2NIMError') {
                throw o115;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_DOWNLOAD_FAILED,
                    detail: {
                        reason: 'downloadAttachment: error: ' + `${JSON.stringify(o115)}`
                    }
                });
            }
        }
    }
    async v2ICancelDownloadFile(g115) {
        validate({
            url: {
                type: 'string', allowEmpty: false
            }
        }, {
            url: g115
        }, '', true);
        try {
            const i115 = this.downloadTaskCatch.get(g115);
            if (i115) {
                i115.delete().then((k115) => {
                    this.downloadTaskCatch.delete(g115);
                    this.core.logger.info(TAG, 'succeeded in removing the download task.', k115);
                }).catch((j115) => {
                    this.core.logger.error(TAG, 'failed to remove the download task', j115);
                });
            }
            else {
                this.core.logger.error(TAG, 'cancelDownloadFile task is nil');
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST,
                    detail: {
                        reason: 'cancel resource not exist'
                    }
                });
            }
        }
        catch (h115) {
            this.core.logger.error(TAG, 'cancelDownloadFile', h115);
            if (h115 instanceof V2NIMErrorImpl || h115.name === 'V2NIMError') {
                throw h115;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED,
                    detail: {
                        reason: 'cancelDownloadFile: error: ' + `${JSON.stringify(h115)}`
                    }
                });
            }
        }
    }
    async v2IShortUrlToLong(e115) {
        const f115 = await this.core.httpService.getOriginUrl(e115);
        this.core.logger.info(TAG, 'shortUrlToLong ret', f115);
        return f115;
    }
    async v2IGetImageThumbUrl(c115, d115) {
        return this.core.storageUtil.getImageThumbUrl(c115, d115);
    }
    async v2IGetVideoCoverUrl(a115, b115) {
        return this.core.storageUtil.getVideoCoverUrl(a115, b115);
    }
    v2ICreateUploadFileTask(y114) {
        if (y114 === null || typeof y114.filePath === 'undefined' || y114.filePath === "") {
            return null;
        }
        let z114 = {};
        z114.taskId = guid();
        z114.uploadParams = y114;
        if (y114.sceneName.trim().length > 0) {
            this.v2IAddCustomStorageScene(y114.sceneName, 0);
        }
        else {
            z114.uploadParams.sceneName = V2NIMStorageSceneConfig.DEFAULT_IM().sceneName;
        }
        return {
            taskId: guid(),
            uploadParams: y114
        };
    }
    async v2IUploadFile(v114, w114) {
        this.checkLogin();
        validate(uploadFileParamsRules, v114, 'fileTask', true);
        const x114 = await this.v2IUploadFileTask(v114, w114);
        return x114.url;
    }
    async v2ICancelUploadFile(u114) {
        await this._cancelUploadFile(u114.taskId);
    }
    v2IGetSdkLogPath() {
        try {
            const t114 = this.core.loggerService.getLogFilePath();
            this.core.logger.info(TAG, 'sdkLogPath', t114);
            return t114;
        }
        catch (s114) {
            if (s114 instanceof V2NIMErrorImpl || s114.name === 'V2NIMError') {
                throw s114;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: 'get sdkLogPath: error: ' + `${JSON.stringify(s114)}`
                    }
                });
            }
        }
    }
    v2IGetSdkLogDirPath() {
        try {
            const r114 = this.core.loggerService.getLogDirectory();
            this.core.logger.info(TAG, 'sdkLogDirPath', r114);
            return r114;
        }
        catch (q114) {
            if (q114 instanceof V2NIMErrorImpl || q114.name === 'V2NIMError') {
                throw q114;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: 'get sdkLogDirPath: error: ' + `${JSON.stringify(q114)}`
                    }
                });
            }
        }
    }
    async v2IUploadSDKLogs() {
        try {
            return await this.core.loggerService.uploadSDKLogs(true);
        }
        catch (p114) {
            if (p114 instanceof V2NIMErrorImpl || p114.name === 'V2NIMError') {
                throw p114;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED,
                    detail: {
                        reason: 'uploadSDKLogs: error: ' + `${JSON.stringify(p114)}`
                    }
                });
            }
        }
    }
    v2IHasStorageScene(n114) {
        const o114 = this.sceneMap.get(n114);
        return o114 !== undefined;
    }
    async v2IUploadFileTask(z113, a114, b114) {
        let c114 = {};
        try {
            this.core.logger.info(TAG, 'uploadFileTask', z113);
            validate({
                taskId: {
                    type: 'string', allowEmpty: false
                }
            }, z113, 'fileTask', true);
            if (this.uploadingCatch.get(z113.taskId)) {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_RESOURCE_ALREADY_EXIST, detail: {
                        reason: 'V2NIMStorageService.uploadFile: repeat upload'
                    }
                });
            }
            const f114 = {};
            try {
                c114 = fs.openSync(z113.uploadParams.filePath);
                f114.file = c114;
                if (b114?.fileType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE) {
                    f114.type = 'image';
                }
                else if (b114?.fileType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO) {
                    f114.type = 'audio';
                }
                else if (b114?.fileType === V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO) {
                    f114.type = 'video';
                }
                else {
                    f114.type = 'file';
                }
            }
            catch (m114) {
                operateOpenFileError(m114);
            }
            f114.md5 = await hash.hash(z113.uploadParams.filePath, 'md5');
            const g114 = this.getStorageScene(z113.uploadParams.sceneName);
            f114.nosScenes = g114.sceneName;
            f114.nosSurvivalTime = g114.expireTime;
            f114.onUploadProgress = (k114) => {
                if (a114) {
                    let l114 = 0;
                    if (k114.total != 0) {
                        l114 = k114.loaded / k114.total;
                    }
                    a114(l114);
                }
            };
            const h114 = this.uploadingCatch.get(z113.taskId);
            f114.onUploadStart = (j114) => {
                if (h114?.abort) {
                    j114.abort();
                    if (c114.fd > 0) {
                        fs.closeSync(c114);
                    }
                    this.uploadingCatch.delete(z113.taskId);
                    return;
                }
                else {
                    this.uploadingCatch.set(z113.taskId, {
                        abort: false,
                        task: j114
                    });
                }
            };
            this.uploadingCatch.set(z113.taskId, {
                abort: false,
                task: f114
            });
            const i114 = await this.core.httpService.uploadFile(f114);
            if (c114.fd > 0) {
                fs.closeSync(c114);
            }
            this.uploadingCatch.delete(z113.taskId);
            return i114;
        }
        catch (d114) {
            this.core.logger.info(TAG, ' upload cancel', d114);
            const e114 = this.uploadingCatch.get(z113.taskId);
            this.uploadingCatch.delete(z113.taskId);
            if (c114.fd > 0) {
                fs.closeSync(c114);
            }
            if (e114?.task.uploadState === 'abort') {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED,
                    detail: {
                        reason: 'V2NIMStorageService : upload cancel' + `${JSON.stringify(d114)}`
                    }
                });
            }
            else {
                if (d114 instanceof V2NIMErrorImpl || d114.name === 'V2NIMError') {
                    throw d114;
                }
                this.core.logger.error(TAG, 'uploadFileTask', d114);
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
                    detail: {
                        reason: 'V2NIMStorageService : upload failed' + `${JSON.stringify(d114)}`
                    }
                });
            }
        }
    }
    async _cancelUploadFile(w113) {
        const x113 = this.uploadingCatch.get(w113);
        if (x113?.task) {
            try {
                await x113.task.abort();
                this.uploadingCatch.delete(w113);
            }
            catch (y113) {
                this.uploadingCatch.delete(w113);
                this.core.logger.error(TAG, 'cancelMessageAttachmentUpload::abort error.', y113);
            }
        }
        else if (x113) {
            x113.abort = true;
        }
        else {
            throw new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST, detail: {
                    reason: 'V2NIMStorageService.cancelUploadFile: task not exist'
                }
            });
        }
    }
    async _downloadFile(d113, e113, f113, g113, h113) {
        try {
            const j113 = new ResourceTraceReporter(1, this.core);
            let k113 = d113;
            if (this.config.downloadHost) {
                const u113 = this.config.downloadHost.replace(/^(http|https):\/\//, '');
                const v113 = /:\/\/([^\/]+)/;
                k113 = k113.replace(v113, `://${u113}`);
            }
            this.core.logger.info(TAG, 'downloadFile replace url', k113);
            let l113;
            if (isAccessUrl(k113)) {
                l113 = await this.core.httpService.getNosAccessToken(k113);
                this.core.logger.info(TAG, 'getNosAccessToken result', l113);
                if (l113.url) {
                    k113 = l113.url;
                }
            }
            const m113 = {
                url: k113,
                header: {
                    "user-agent": `NIM/HOS/${deviceInfo.manufacture}/${deviceInfo.osFullName}/${IM_SDK_VERSION}/${this.core.options.appkey}`
                },
                enableMetered: true,
                enableRoaming: true,
                filePath: e113,
            };
            const n113 = await request.downloadFile(this.core.context, m113);
            this.downloadTaskCatch.set(d113, n113);
            j113.updateReporterTrace(ResourceTraceStep.start, {
                startTime: Date.now()
            });
            return new Promise((o113, p113) => {
                n113.on('progress', (r113, s113) => {
                    this.core.logger.info(TAG, 'download receivedSize', r113, 'totalSize:' + s113);
                    j113.updateReporterTrace(ResourceTraceStep.uploading, {
                        total: s113, transferred: r113
                    });
                    if (f113) {
                        const t113 = calculateProgress(r113, s113);
                        f113(t113);
                    }
                });
                n113.on('complete', async () => {
                    this.core.logger.info(TAG, 'Download task completed', k113);
                    j113.updateReporterTrace(ResourceTraceStep.success, {
                        url: k113
                    });
                    this.downloadTaskCatch.delete(d113);
                    if (typeof l113 !== 'undefined' && l113.token !== undefined && l113.token.length > 0) {
                        await this.core.httpService.deleteNosAccessToken(l113.token);
                    }
                    if (typeof h113 !== 'undefined' &&
                        h113.length > 0 &&
                        g113 === 0) {
                        await this.core.messageService.v2IUpdateAttachment(h113, e113);
                    }
                    o113(e113);
                });
                n113.on('remove', async () => {
                    this.downloadTaskCatch.delete(d113);
                    this.core.logger.warn(TAG, 'Download task cancel completed', k113);
                    j113.updateReporterTrace(ResourceTraceStep.abort, {
                        url: k113,
                        description: 'Download task cancel completed'
                    });
                    if (typeof l113.token == 'string' && l113.token.length > 0) {
                        await this.core.httpService.deleteNosAccessToken(l113.token);
                    }
                    p113(new V2NIMErrorImpl({
                        code: V2NIMErrorCode.V2NIM_ERROR_CODE_CANCELLED,
                        detail: {
                            reason: 'operation cancelled'
                        }
                    }));
                });
                n113.on('fail', async (q113) => {
                    this.downloadTaskCatch.delete(d113);
                    this.core.logger.error(TAG, 'download task failed', k113, e113);
                    j113.updateReporterTrace(ResourceTraceStep.failed, {
                        url: k113, description: 'downloadFile: error: ' + `${q113}`
                    });
                    if (typeof l113.token == 'string' && l113.token.length > 0) {
                        await this.core.httpService.deleteNosAccessToken(l113.token);
                    }
                    p113(new V2NIMErrorImpl({
                        code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_DOWNLOAD_FAILED,
                        detail: {
                            reason: 'downloadFile: error: ' + `${q113}`
                        }
                    }));
                });
            });
        }
        catch (i113) {
            this.downloadTaskCatch.delete(d113 ?? '');
            if (i113 instanceof V2NIMErrorImpl || i113.name === 'V2NIMError') {
                throw i113;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_DOWNLOAD_FAILED,
                    detail: {
                        reason: 'downloadFile: error: ' + `${JSON.stringify(i113)}`
                    }
                });
            }
        }
    }
    getStorageScene(c113) {
        return this.sceneMap.get(c113) || V2NIMStorageSceneConfig.DEFAULT_IM();
    }
    getSavePath(q112) {
        const r112 = q112.attachment;
        if (typeof q112.saveAs === 'string' && q112.saveAs.length > 0) {
            return q112.saveAs;
        }
        if (typeof r112.path === 'string' && r112.path.length > 0) {
            if (q112.type === 0) {
                return r112.path;
            }
            else {
                const x112 = r112.path.lastIndexOf('/');
                const y112 = r112.path.substring(0, x112);
                const z112 = r112.path.substring(x112 + 1);
                const a113 = z112.lastIndexOf('.');
                const b113 = z112.substring(0, a113);
                return y112 + `/thumb_${b113}` + '.png';
            }
        }
        const s112 = this.core.context.cacheDir + '/nim/';
        if (!fs.accessSync(s112)) {
            fs.mkdirSync(s112, true);
        }
        let t112;
        let u112;
        if (typeof r112.md5 === 'string' && r112.md5.length > 0) {
            t112 = r112.md5;
        }
        else {
            t112 = md5(r112.url ?? 'default');
        }
        if (q112.type === 1 ||
            q112.type === 2) {
            const w112 = s112 + 'thumb/';
            if (!fs.accessSync(w112)) {
                fs.mkdirSync(w112, true);
            }
            u112 = w112 + `thumb_${t112}` + '.png';
        }
        else {
            const v112 = s112 + 'source/';
            if (!fs.accessSync(v112)) {
                fs.mkdirSync(v112, true);
            }
            u112 = v112 + t112 + r112.ext ?? '';
        }
        return u112;
    }
}
function md5(o112) {
    const p112 = cryptoFramework.createMd('MD5');
    p112.updateSync({ 'data': stringToUint8Array(o112) });
    return uint8ArrayToHex((p112.digestSync()).data);
}
function stringToUint8Array(l112) {
    let m112 = [];
    for (let n112 = 0; n112 < l112.length; n112++) {
        m112.push(l112.charCodeAt(n112));
    }
    return new Uint8Array(m112);
}
function uint8ArrayToHex(j112) {
    return Array.from(j112).map(k112 => k112.toString(16).padStart(2, '0')).join('');
}
function decodeToString(e112) {
    let f112 = {
        fatal: false,
        ignoreBOM: true
    };
    let g112 = {
        stream: false
    };
    let h112 = util.TextDecoder.create('utf-8', f112);
    let i112 = h112.decodeToString(e112, g112);
    console.info("retStr = " + i112);
    return i112;
}
function isAccessUrl(w111) {
    try {
        const y111 = getLastPathSegment(w111);
        const z111 = new util.Base64Helper();
        const a112 = z111.decodeSync(y111);
        const b112 = decodeToString(a112);
        const c112 = V2NIMStorageSceneConfig.SECURITY_LINK();
        const d112 = b112.includes(c112.sceneName);
        return d112;
    }
    catch (x111) {
        return false;
    }
}
function getLastPathSegment(s111) {
    const t111 = s111.split('?')[0];
    const u111 = t111.split('/').filter(v111 => v111 !== '');
    return u111.length > 0 ? u111[u111.length - 1] : '';
}
function calculateProgress(p111, q111) {
    const r111 = (p111 / q111) * 100;
    if (r111 < 0) {
        return 0;
    }
    else if (r111 > 100) {
        return 100;
    }
    else {
        return r111;
    }
}
function operateOpenFileError(n111) {
    const o111 = n111;
    if (o111.code === 13900001 || o111.code === 13900004 || o111.code === 13900006 || o111.code === 13900008 ||
        o111.code === 13900014 || o111.code === 13900022 || o111.code === 13900023 || o111.code === 13900027 ||
        o111.code === 13900034) {
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_OPEN_FAILED,
            detail: {
                reason: 'V2NIMStorageService : upload cancel, file open failed' + `${o111}`
            }
        });
    }
    else if (o111.code === 13900002 || o111.code === 13900017 || o111.code === 13900018 || o111.code === 13900019 ||
        o111.code === 13900020 || o111.code === 13900030 || o111.code === 13900033 || o111.code === 13900042) {
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_NOT_FOUND,
            detail: {
                reason: 'V2NIMStorageService : upload cancel, file not found' + `${o111}`
            }
        });
    }
    else {
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN,
            detail: {
                reason: 'V2NIMStorageService : upload cancel unknown error' + `${o111}`
            }
        });
    }
}
