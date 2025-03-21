import { guid, V2NIMStorageSceneConfig, V2NIMErrorImpl, } from '@nimsdk/base';
import fs from '@ohos.file.fs';
import Stack from "@ohos.util.Stack";
import zlib from '@ohos.zlib';
import { UploadLogUrlRequest, UploadLogUrlRequestInfo } from './cloud/CRUtilRequest';
async function writeData(u45, v45) {
    let w45 = fs.openSync(v45, fs.OpenMode.CREATE | fs
        .OpenMode.READ_WRITE | fs.OpenMode.APPEND);
    fs.writeSync(w45.fd, u45);
    fs.closeSync(w45);
}
const TAG = '[LoggerService]';
export class LoggerServiceImpl {
    constructor(t45) {
        this.loggerTaskStack = new Stack();
        this.logDir = '';
        t45.loggerService = this;
        this.core = t45;
        this.logDir = t45.context.cacheDir + '/nim_log';
        this.checkLoggerEffectivePeriod(this.logDir);
        this.core.eventBus.on('CRLoggerServiceImpl/onUploadLogFiles', () => {
            this.uploadZipLogFile();
        });
    }
    async write(e45, f45, g45, ...h45) {
        try {
            const j45 = new Date();
            const k45 = `${j45.getMonth() +
                1}-${j45.getDate()} ${j45.getHours()}:${j45.getMinutes()}:${j45.getSeconds()}:${j45.getMilliseconds()}`;
            const l45 = `[${k45}]: ${e45}: ${f45}: ${g45}: `;
            let m45 = h45.map((p45) => {
                if (p45 instanceof V2NIMErrorImpl) {
                    let s45 = `${p45.name}\n code: ${p45.code}\n message: "${p45.message}"\n detail: ${p45.detail ?
                        JSON.stringify(p45.detail) : ''}`;
                    if (p45?.detail?.rawError) {
                        s45 += `\n rawError: ${p45.detail.rawError.message}`;
                    }
                    return s45;
                }
                else if (p45 instanceof Error) {
                    return p45 && p45.message ? p45.message : p45;
                }
                else if (typeof p45 === 'object') {
                    return JSON.stringify(p45, (q45, r45) => {
                        if (Array.isArray(r45)) {
                            return r45.join(',');
                        }
                        return r45;
                    });
                }
                else {
                    return p45;
                }
            })
                .join(' ');
            m45 = m45.replace(/^"|"$/g, '');
            const n45 = `${l45 + m45}\n`;
            const o45 = this.getLogFilePath();
            console.log(n45);
            writeData(n45, o45);
        }
        catch (i45) {
            console.error(`write logger error :${i45}`);
        }
    }
    async checkLoggerEffectivePeriod(x44) {
        try {
            if (!fs.accessSync(this.logDir)) {
                fs.mkdirSync(this.logDir, true);
            }
            let z44 = await fs.listFile(x44, { recursion: false, listNum: 0 });
            if (z44.length >= LoggerServiceImpl.LoggerFileEffectivePeriod) {
                z44.sort((c45, d45) => c45.localeCompare(d45));
                let a45 = z44[0];
                let b45 = `${x44} + ${a45}`;
                await fs.unlink(b45);
            }
        }
        catch (y44) {
            console.warn(`fail checkLoggerEffectivePeriod:${y44}`);
        }
    }
    async uploadZipLogFile() {
        try {
            this.core.logger.info(TAG, 'uploadZipLogFile');
            let s44 = this.getOutputZipFilePath();
            const t44 = await fs.listFile(this.logDir, { recursion: false, listNum: 0 });
            const u44 = t44.map(w44 => this.logDir + '/' + w44);
            await zlib.compressFiles(u44, s44, {
                level: zlib.CompressLevel.COMPRESS_LEVEL_DEFAULT_COMPRESSION,
                memLevel: zlib.MemLevel.MEM_LEVEL_DEFAULT,
                strategy: zlib.CompressStrategy.COMPRESS_STRATEGY_DEFAULT_STRATEGY
            });
            const v44 = await this.core.storageService.uploadFileTask({
                taskId: guid(),
                uploadParams: {
                    filePath: s44,
                    sceneName: V2NIMStorageSceneConfig.DEFAULT_SYSTEM().sceneName,
                }
            });
            await this.uploadSendLog(v44.url);
            await fs.unlink(s44);
        }
        catch (r44) {
            this.core.logger.error(TAG, 'uploadZipLogFile', JSON.stringify(r44));
        }
    }
    async uploadSendLog(o44) {
        try {
            this.core.logger.info(TAG, 'uploadSendLog', o44);
            const q44 = new UploadLogUrlRequestInfo(0);
            await this.core.sendCmd('uploadLogUrl', new UploadLogUrlRequest(o44, q44));
        }
        catch (p44) {
            this.core.logger.error(TAG, 'uploadSendLog', JSON.stringify(p44));
        }
    }
    getOutputZipFilePath() {
        const m44 = this.formattedDate();
        const n44 = this.logDir + `/nim_${m44}.zip`;
        return n44;
    }
    getLogFilePath() {
        if (!fs.accessSync(this.logDir)) {
            fs.mkdirSync(this.logDir, true);
        }
        const k44 = this.formattedDate();
        const l44 = this.logDir + `/nimc_${k44}.txt`;
        return l44;
    }
    formattedDate() {
        const i44 = new Date();
        const j44 = Intl.DateTimeFormat("en-US", { year: "numeric", month: "numeric", day: "numeric" }).format(i44)
            .replace(/\//g, '_');
        return j44;
    }
}
LoggerServiceImpl.LoggerFileEffectivePeriod = 15;
