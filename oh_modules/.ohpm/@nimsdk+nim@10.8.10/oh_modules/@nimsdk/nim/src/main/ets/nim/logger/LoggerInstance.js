import taskpool from "@ohos.taskpool";
import { NetWorkingInStance, V2NIMErrorImpl } from '@nimsdk/base';
import fs from '@ohos.file.fs';
async function writeLogger(u79, v79, w79, x79, y79, z79, a80, ...b80) {
    "use concurrent";
    try {
        const d80 = `[${a80}]: ${v79}: ${y79}: ${w79}: ${x79} `;
        const e80 = b80.flat(3);
        const f80 = e80.map((i80) => {
            if (i80 instanceof V2NIMErrorImpl || i80 instanceof Error) {
                return i80.toString();
            }
            else if (typeof i80 === 'object') {
                return JSON.stringify(i80);
            }
            else {
                return i80;
            }
        }).join(' ');
        const g80 = f80 ? `${d80 + ': ' + f80}\n` : `${d80}\n`;
        const h80 = fs.openSync(u79, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE | fs.OpenMode.APPEND);
        await fs.write(h80.fd, g80);
        fs.close(h80);
        if (z79) {
            if (v79 === "Debug") {
                console.debug(g80);
            }
            else if (v79 === "Info") {
                console.info(g80);
            }
            else if (v79 === "Error") {
                console.error(g80);
            }
            else if (v79 === "Warn") {
                console.warn(g80);
            }
        }
    }
    catch (c80) {
        console.error('write logger failed', JSON.stringify(c80));
    }
}
export class LoggerInstance {
    constructor() {
        this.sequenceRunner = new taskpool.SequenceRunner("com.netease.im");
    }
    static getInstance() {
        if (!LoggerInstance.instance) {
            LoggerInstance.instance = new LoggerInstance();
        }
        return LoggerInstance.instance;
    }
    async write(j79, k79, l79, m79, n79, o79, ...p79) {
        const q79 = NetWorkingInStance.getInstance().getNetInfoSync();
        const r79 = `${j79}_${q79.netType}_${q79.isConnected}`;
        const s79 = this.getDateStr();
        const t79 = new taskpool.Task(writeLogger, k79, m79, n79, o79, r79, l79, s79, p79);
        this.sequenceRunner.execute(t79);
    }
    getDateStr() {
        const f79 = new Date();
        const g79 = f79.getMilliseconds();
        const h79 = ("00" + g79).slice(-3);
        const i79 = `${f79.getMonth() +
            1}-${f79.getDate()} ${f79.getHours()}:${f79.getMinutes()}:${f79.getSeconds()}:${h79}`;
        return i79;
    }
}
