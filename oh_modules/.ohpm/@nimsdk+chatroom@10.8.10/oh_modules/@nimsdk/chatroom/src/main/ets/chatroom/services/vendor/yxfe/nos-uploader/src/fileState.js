import fs from '@ohos.file.fs';
export class FileState {
    constructor(b175) {
        this.storage = b175;
    }
    getFileKey(x174) {
        const y174 = fs.lstatSync(x174.path);
        const z174 = y174.size.toString();
        const a175 = y174.mtime.toString();
        return '_NosUploader_' + x174.name + z174.slice(z174.length - 5) + a175.slice(a175.length - 5);
    }
    getFileInfo(u174) {
        const v174 = this.storage.get(u174, '');
        if (!v174) {
            return null;
        }
        else {
            try {
                return JSON.parse(v174);
            }
            catch (w174) {
                return null;
            }
        }
    }
    initFile(p174, q174, r174) {
        this.clearExpiredInfo();
        const s174 = this.getFileKey(q174);
        const t174 = {
            ctx: (p174.ctx !== undefined) ? p174.ctx : '',
            bucketName: p174.bucketName,
            objectName: p174.objectName,
            token: p174.token,
            modifyAt: Date.now(),
            end: false,
            type: p174.type,
            md5: p174.md5,
        };
        if (p174.payload) {
            t174.payload = p174.payload;
        }
        if (r174) {
            this.storage.put(s174, JSON.stringify(t174));
        }
        return s174;
    }
    setUploadContext(l174, m174, n174) {
        const o174 = this.getFileInfo(l174);
        if (o174) {
            o174.ctx = m174;
            if (n174) {
                this.storage.put(l174, JSON.stringify(o174));
            }
        }
    }
    setComplete(i174, j174) {
        const k174 = this.getFileInfo(i174);
        if (k174) {
            k174.modifyAt = Date.now();
            k174.end = true;
            if (j174) {
                this.storage.put(i174, JSON.stringify(k174));
            }
        }
    }
    getUploadContext(g174) {
        const h174 = this.getFileInfo(g174);
        return h174 ? h174.ctx : '';
    }
    removeFileInfo(f174) {
        if (f174.indexOf('_NosUploader_') === 0) {
            this.storage.delete(f174);
        }
    }
    clearExpiredInfo() {
    }
}
