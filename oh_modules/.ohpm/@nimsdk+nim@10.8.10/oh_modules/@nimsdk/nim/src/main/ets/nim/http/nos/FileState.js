import fs from '@ohos.file.fs';
export class FileState {
    constructor(x56) {
        this.storage = x56;
    }
    getFileKey(t56) {
        const u56 = fs.lstatSync(t56.path);
        const v56 = u56.size.toString();
        const w56 = u56.mtime.toString();
        return '_NosUploader_' + t56.name + v56.slice(v56.length - 5) + w56.slice(w56.length - 5);
    }
    getFileInfo(q56) {
        const r56 = this.storage.get(q56, '');
        if (!r56) {
            return null;
        }
        else {
            try {
                return JSON.parse(r56);
            }
            catch (s56) {
                return null;
            }
        }
    }
    initFile(l56, m56, n56) {
        this.clearExpiredInfo();
        const o56 = this.getFileKey(m56);
        const p56 = {
            ctx: (l56.ctx !== undefined) ? l56.ctx : '',
            bucketName: l56.bucketName,
            objectName: l56.objectName,
            token: l56.token,
            modifyAt: Date.now(),
            end: false,
            type: l56.type,
            md5: l56.md5,
        };
        if (l56.payload) {
            p56.payload = l56.payload;
        }
        if (n56) {
            this.storage.put(o56, JSON.stringify(p56));
        }
        return o56;
    }
    setUploadContext(h56, i56, j56) {
        const k56 = this.getFileInfo(h56);
        if (k56) {
            k56.ctx = i56;
            if (j56) {
                this.storage.put(h56, JSON.stringify(k56));
            }
        }
    }
    setComplete(e56, f56) {
        const g56 = this.getFileInfo(e56);
        if (g56) {
            g56.modifyAt = Date.now();
            g56.end = true;
            if (f56) {
                this.storage.put(e56, JSON.stringify(g56));
            }
        }
    }
    getUploadContext(c56) {
        const d56 = this.getFileInfo(c56);
        return d56 ? d56.ctx : '';
    }
    removeFileInfo(b56) {
        if (b56.indexOf('_NosUploader_') === 0) {
            this.storage.delete(b56);
        }
    }
    clearExpiredInfo() {
    }
}
