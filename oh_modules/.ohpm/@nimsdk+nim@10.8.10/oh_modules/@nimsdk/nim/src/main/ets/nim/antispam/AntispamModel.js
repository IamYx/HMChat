import fs from '@ohos.file.fs';
import Hash from '@ohos.file.hash';
import util from '@ohos.util';
const TAG = '[AntispamModel]';
export class AntispamModel {
    constructor(m36) {
        this.thesaurus = [];
        this.antispamKey = 'NIM_Antispam_Key';
        this.core = m36;
    }
    async getVersion() {
        return new Promise(async (g36, h36) => {
            let i36 = await this.core.kvManager.getKVStore(this.core.account);
            i36.get(this.antispamKey).then((k36) => {
                console.info(`Succeeded in getting data.data=${k36}`);
                const l36 = k36;
                g36(l36);
            }).catch((j36) => {
                if (j36.code == 15100004) {
                    g36('0');
                }
                else {
                    h36(j36);
                    this.core.logger.error(`getVersion: ${j36}`);
                }
            });
        });
    }
    async setVersion(e36) {
        let f36 = await this.core.kvManager.getKVStore(this.core.account);
        await f36.put(this.antispamKey, e36);
    }
    async loadLocalAntispam() {
        try {
            const y35 = this.getLocalAntispamPath();
            const z35 = fs.openSync(y35, fs.OpenMode.READ_WRITE);
            const a36 = fs.statSync(z35.fd).size;
            const b36 = new ArrayBuffer(a36 * 8);
            fs.read(z35.fd, b36, (c36, d36) => {
                if (!c36) {
                    this.thesaurus = this.decode(b36);
                }
                fs.closeSync(z35);
            });
        }
        catch (x35) {
            this.core.logger.warn('AntispamModel', 'loadLocalAntispam', x35);
        }
    }
    async updateLocalAntispam(v35, w35) {
        if (typeof w35.data !== 'string') {
            this.thesaurus = this.decode(w35.data);
        }
        else {
            this.thesaurus = JSON.parse(w35.data);
        }
        await this.writeFile(w35.data);
        await this.setVersion(v35);
    }
    async writeFile(r35) {
        try {
            const t35 = this.getLocalAntispamPath();
            const u35 = fs.openSync(t35, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            await fs.write(u35.fd, r35);
            await fs.close(u35);
        }
        catch (s35) {
            this.core.logger.error(TAG, `antispam writeFile failed`, s35);
        }
    }
    checkMd5(m35, n35) {
        const o35 = this.getLocalAntispamPath();
        Hash.hash(o35, 'md5').then((q35) => {
            this.core.logger.info(`antispam md5: ${m35} str : ${q35}`);
            if (m35 !== q35) {
                n35(true);
            }
            else {
                n35(false);
            }
        }).catch((p35) => {
            this.core.logger.warn('calculate file hash failed' + p35.message + ', error code: ' + p35.code);
            n35(true);
        });
    }
    getLocalAntispamPath() {
        const k35 = this.core.context.cacheDir + '/nim_sdk';
        if (!fs.accessSync(k35)) {
            fs.mkdirSync(k35);
        }
        const l35 = k35 + `/v2_antispam_cache.info`;
        return l35;
    }
    decode(e35) {
        try {
            const g35 = new Uint8Array(e35);
            const h35 = util.TextDecoder.create('utf-8', {
                fatal: false,
                ignoreBOM: true
            });
            const i35 = h35.decodeWithStream(g35, {
                stream: false
            });
            const j35 = JSON.parse(i35);
            return j35.thesaurus;
        }
        catch (f35) {
            console.error('IThesaurus parse json error', f35);
            return [];
        }
    }
}
