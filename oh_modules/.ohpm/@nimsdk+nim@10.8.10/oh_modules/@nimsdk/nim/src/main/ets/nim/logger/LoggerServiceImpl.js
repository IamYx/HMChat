import { guid, V2NIMErrorCode, V2NIMErrorImpl, V2NIMStorageSceneConfig } from '@nimsdk/base';
import fs from '@ohos.file.fs';
import zlib from '@ohos.zlib';
import { UploadLogUrlParams, UploadLogUrlRequest } from './cloud/LoggerRequest';
import { LoggerInstance } from './LoggerInstance';
const TAG = '[LoggerServiceImpl]';
export class LoggerServiceImpl {
    constructor(q81, r81, s81) {
        this.logDir = '';
        q81.loggerService = this;
        this.core = q81;
        this.logDir = q81.context.cacheDir + '/nim_log';
        this.checkLoggerEffectivePeriod(this.logDir);
        const t81 = this.formattedDate();
        this.currentLogPath = this.logDir + `/nim_${t81}.txt`;
        this.core.eventBus.on('LoggerServiceImpl/onUploadLogFiles', () => {
            this.uploadZipLogFile(false);
        });
        this.logLevel = r81 ?? "Debug";
        this.isOpenConsoleLog = s81 ?? false;
    }
    async write(i81, j81, k81, ...l81) {
        if (this.isWriteLog(i81)) {
            let m81 = 'F';
            const n81 = this.core?.settingService?.v2IGetIsForeground();
            if (typeof n81 !== 'undefined') {
                m81 = n81 ? 'F' : 'B';
            }
            const o81 = this.currentLogPath;
            const p81 = this.isOpenConsoleLog;
            LoggerInstance.getInstance().write(m81, o81, p81, i81, j81, k81, l81);
        }
    }
    isWriteLog(h81) {
        switch (this.logLevel) {
            case "Debug":
                return true;
            case "Info":
                return h81 !== "Debug";
            case "Warn":
                return h81 !== "Debug" && h81 !== "Info";
            case "Error":
                return h81 === "Error";
            default:
                return true;
        }
    }
    async uploadSDKLogs(f81) {
        try {
            this.core.logger.info(TAG, 'uploadSDKLogs', f81);
            return await this.uploadZipLogFile(f81);
        }
        catch (g81) {
            this.core.logger.error(TAG, 'uploadSDKLogs', f81, g81);
            if (g81 instanceof V2NIMErrorImpl || g81.name === 'V2NIMError') {
                throw g81;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED,
                    detail: {
                        reason: 'upload log file: error: ' + `${JSON.stringify(g81)}`
                    }
                });
            }
        }
    }
    getLogDirectory() {
        return this.logDir;
    }
    getLogFilePath() {
        return this.currentLogPath;
    }
    async checkLoggerEffectivePeriod(y80) {
        try {
            if (!fs.accessSync(this.logDir)) {
                fs.mkdirSync(this.logDir, true);
            }
            let a81 = await fs.listFile(y80, { recursion: false, listNum: 0 });
            if (a81.length >= LoggerServiceImpl.LoggerFileEffectivePeriod) {
                a81.sort((d81, e81) => d81.localeCompare(e81));
                let b81 = a81[0];
                let c81 = `${y80} + ${b81}`;
                await fs.unlink(c81);
            }
        }
        catch (z80) {
            this.write("Error", 'checkLoggerEffectivePeriod', `fail:${JSON.stringify(z80)}, filename ${y80}`);
        }
    }
    async uploadZipLogFile(r80) {
        let s80 = this.getOutputZipFilePath();
        try {
            this.core.logger.info(TAG, 'uploadZipLogFile', r80);
            const u80 = await fs.listFile(this.logDir, { recursion: false, listNum: 0 });
            const v80 = u80.map(x80 => this.logDir + '/' + x80);
            await zlib.compressFiles(v80, s80, {
                level: zlib.CompressLevel.COMPRESS_LEVEL_DEFAULT_COMPRESSION,
                memLevel: zlib.MemLevel.MEM_LEVEL_MAX,
                strategy: zlib.CompressStrategy.COMPRESS_STRATEGY_HUFFMAN_ONLY
            });
            const w80 = await this.core.storageService.v2IUploadFileTask({
                taskId: guid(),
                uploadParams: {
                    filePath: s80,
                    sceneName: V2NIMStorageSceneConfig.DEFAULT_SYSTEM().sceneName,
                }
            });
            await this.uploadSendLog(w80.url, r80);
            await fs.unlink(s80);
            this.core.logger.info(TAG, 'uploadZipLogFile succeed');
            return w80.url;
        }
        catch (t80) {
            await fs.unlink(s80);
            this.core.logger.error(TAG, 'uploadZipLogFile', r80, t80);
            if (t80 instanceof V2NIMErrorImpl || t80.name === 'V2NIMError') {
                throw t80;
            }
            else {
                throw new V2NIMErrorImpl({
                    code: V2NIMErrorCode.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED,
                    detail: {
                        reason: 'upload log file: error: ' + `${JSON.stringify(t80)}`
                    }
                });
            }
        }
    }
    async uploadSendLog(m80, n80) {
        try {
            this.core.logger.info(TAG, 'uploadSendLog', m80, n80);
            const p80 = n80 ? 1 : 0;
            const q80 = new UploadLogUrlRequest(m80, new UploadLogUrlParams(p80));
            await this.core.sendCmd('uploadLogUrl', q80);
        }
        catch (o80) {
            this.core.logger.error(TAG, 'uploadSendLog', m80, n80, o80);
        }
    }
    getOutputZipFilePath() {
        const l80 = this.logDir + `/nim_log.zip`;
        if (fs.accessSync(l80)) {
            fs.unlinkSync(l80);
        }
        return l80;
    }
    formattedDate() {
        const j80 = new Date();
        const k80 = Intl.DateTimeFormat("en-US", { year: "numeric", month: "numeric", day: "numeric" }).format(j80)
            .replace(/\//g, '_');
        return k80;
    }
}
LoggerServiceImpl.LoggerFileEffectivePeriod = 15;
