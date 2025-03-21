import fs from '@ohos.file.fs';
import util from '@ohos.util';
import Hash from '@ohos.file.hash';
export class CRAntispamModel {
    constructor(i2) {
        this.thesaurus = [];
        this.antispamKey = 'NIM_Chatroom_Antispam_Key';
        this.core = i2;
        this.loadLocalAntispam();
    }
    async getVersion() {
        return new Promise(async (c2, d2) => {
            let e2 = await this.core.kvManager.getKVStore(this.core.account);
            e2.get(this.antispamKey).then((g2) => {
                console.info(`Succeeded in getting data.data=${g2}`);
                const h2 = g2;
                c2(h2);
            }).catch((f2) => {
                if (f2.code == 15100004) {
                    c2('0');
                }
                else {
                    d2(f2);
                    this.core.logger.error(`getVersion: ${f2}`);
                }
            });
        });
    }
    async setVersion(a2) {
        let b2 = await this.core.kvManager.getKVStore(this.core.account);
        await b2.put(this.antispamKey, a2);
    }
    loadLocalAntispam() {
        try {
            const u1 = this.getLocalAntispamPath();
            const v1 = fs.openSync(u1, fs.OpenMode.READ_WRITE);
            const w1 = fs.statSync(v1.fd).size;
            const x1 = new ArrayBuffer(w1 * 8);
            fs.read(v1.fd, x1, (y1, z1) => {
                if (!y1) {
                    this.thesaurus = this.decode(x1);
                }
                fs.closeSync(v1);
            });
        }
        catch (t1) {
            this.core.logger.warn(`loadLocalAntispam: ${t1}`);
        }
    }
    async updateLocalAntispam(r1, s1) {
        if (typeof s1.data !== 'string') {
            this.thesaurus = this.decode(s1.data);
        }
        else {
            this.thesaurus = JSON.parse(s1.data);
        }
        await this.writeFile(s1.data);
        await this.setVersion(r1);
    }
    async writeFile(n1) {
        try {
            const p1 = this.getLocalAntispamPath();
            const q1 = fs.openSync(p1, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            await fs.write(q1.fd, n1);
            await fs.close(q1);
        }
        catch (o1) {
            this.core.logger.error(`antispam writeFile failed ${o1}}`);
        }
    }
    checkMd5(i1, j1) {
        const k1 = this.getLocalAntispamPath();
        Hash.hash(k1, "md5").then((m1) => {
            this.core.logger.info(`antispam md5: ${i1} str : ${m1}`);
            if (i1 !== m1) {
                j1(true);
            }
            else {
                j1(false);
            }
        }).catch((l1) => {
            this.core.logger.error("calculate file hash failed" + l1.message + ", error code: " + l1.code);
            j1(true);
        });
    }
    getLocalAntispamPath() {
        const g1 = this.core.context.filesDir + '/nim_chatroom';
        if (!fs.accessSync(g1)) {
            fs.mkdirSync(g1);
        }
        let h1 = g1 + "/v2_antispam_cache.info";
        return h1;
    }
    decode(a1) {
        try {
            const c1 = new Uint8Array(a1);
            const d1 = util.TextDecoder.create('utf-8', {
                fatal: false,
                ignoreBOM: true
            });
            const e1 = d1.decodeWithStream(c1, {
                stream: false
            });
            const f1 = JSON.parse(e1);
            return f1.thesaurus;
        }
        catch (b1) {
            console.error('IThesaurus parse json error', b1);
            return [];
        }
    }
    reset() {
        this.thesaurus = undefined;
    }
}
