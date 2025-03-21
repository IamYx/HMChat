import KVStore from '@ohos.data.distributedKVStore';
import buffer from "@ohos.buffer";
export class IMKVManager {
    constructor(b22) {
        this.context = b22;
        this.kvManager = this.createKVManager();
    }
    createKVManager() {
        const a22 = {
            context: this.context,
            bundleName: 'com.netease.im'
        };
        return KVStore.createKVManager(a22);
    }
    async getKVStore(w21) {
        try {
            const y21 = {
                createIfMissing: true,
                encrypt: false,
                backup: false,
                kvStoreType: KVStore.KVStoreType.SINGLE_VERSION,
                securityLevel: KVStore.SecurityLevel.S2
            };
            if (!this.kvManager) {
                this.kvManager = this.createKVManager();
            }
            const z21 = formatStoreId(w21);
            this.currentStore = await this.kvManager.getKVStore(z21, y21);
            return this.currentStore;
        }
        catch (x21) {
            throw Error(x21);
        }
    }
    async put(t21, u21) {
        try {
            await this.currentStore?.put(t21, u21);
        }
        catch (v21) {
            throw Error(v21);
        }
    }
    async get(r21) {
        try {
            return await this.currentStore?.get(r21);
        }
        catch (s21) {
            return null;
        }
    }
    async delete(p21) {
        try {
            this.currentStore?.delete(p21);
        }
        catch (q21) {
            throw Error(q21);
        }
    }
    async putBatch(n21) {
        try {
            this.currentStore?.putBatch(n21);
        }
        catch (o21) {
            throw Error(o21);
        }
    }
}
function formatStoreId(l21) {
    const m21 = /[@.-]/.test(l21);
    if (m21) {
        return 'SPECIAL_' + buffer.from(l21).toString('hex');
    }
    else {
        return l21;
    }
}
