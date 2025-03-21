import { NIM_DATABASE_NAMES, V2Service, NIM_DATABASE_NAME_MESSAGE } from '@nimsdk/base';
import deviceInfo from "@ohos.deviceInfo";
import { RdbStoreManagerImpl } from './rdb/RdbStoreManagerImpl';
import fs from "@ohos.file.fs";
const TAG = '[DatabaseService]';
export class V2NIMDatabaseServiceImpl extends V2Service {
    constructor(t54, u54, v54) {
        super(u54, t54);
        this.rdbStoreManagerMap = new Map();
        this.hasInitialized = false;
        this.notifyDatabaseOpen = false;
        this.databases = [];
        this.config = v54 || {};
        if (typeof this.config.appKey === 'undefined' || this.config.appKey.length === 0) {
            this.logger.info(TAG, `use initializeOptions appkey: ${this.core.options.appkey}`);
            this.config.appKey = this.core.options.appkey;
        }
        if (typeof this.config.encrypt === 'undefined') {
            this.config.encrypt = false;
        }
        if (typeof this.config.securityLevel === 'undefined' || this.config.securityLevel < 1 ||
            this.config.securityLevel > 4) {
            this.config.securityLevel = 1;
        }
        this.databases = NIM_DATABASE_NAMES;
    }
    async notifyDatabaseReady(s54) {
        if (this.notifyDatabaseOpen === true) {
            this.core.logger.info(TAG, 'notifyDatabaseOpen', this.notifyDatabaseOpen, this.hasInitialized);
            return;
        }
        this.core.logger.info(TAG, 'onLoginFinished onAccountReady', s54);
        this.notifyDatabaseOpen = true;
        this.core.loginService.emit('onAccountReady', s54);
    }
    async onLoginStart(r54) {
        this.core.logger.info(TAG, 'onLoginStart', r54, this.hasInitialized);
    }
    async onLoginFinished(q54) {
        this.core.logger.info(TAG, 'onLoginFinished', q54, this.hasInitialized, this.notifyDatabaseOpen);
    }
    async justBeforeOnLogin(p54) {
        this.core.logger.info(TAG, 'justBeforeOnLogin', p54, this.hasInitialized, this.notifyDatabaseOpen);
        await this.initDB(this.core, p54);
    }
    async onLogout() {
        this.core.logger.info(TAG, 'database onLogout start', this.hasInitialized, this.notifyDatabaseOpen);
        this.hasInitialized = false;
        this.notifyDatabaseOpen = false;
        for (const n54 of this.rdbStoreManagerMap.values()) {
            try {
                await n54.close();
            }
            catch (o54) {
                this.core.logger.error('DB', 'close db failed', o54);
            }
        }
        this.rdbStoreManagerMap.clear();
        this.core.logger.info(TAG, 'database onLogout end', this.hasInitialized, this.notifyDatabaseOpen);
    }
    getDatabase(k54, l54) {
        let m54 = this.rdbStoreManagerMap.get(l54);
        if (!m54) {
            this.logger.warn(TAG, 'database need create', l54);
            m54 = new RdbStoreManagerImpl(k54, l54);
            this.rdbStoreManagerMap.set(l54, m54);
        }
        return m54;
    }
    async initDB(d54, e54) {
        try {
            if (this.hasInitialized) {
                this.logger.info(TAG, `db is already initialized.`);
                return;
            }
            this.hasInitialized = true;
            let g54 = `${this.config.appKey}/${e54}`;
            this.logger.info(TAG, `db customDir: ${g54}`);
            if (this.config && this.databases) {
                this.databases.map(h54 => {
                    let i54 = this.getDatabase(d54, h54);
                    const j54 = this.acquireFtsPluginLibs(d54.context, h54);
                    i54.syncCreateDB(g54, this.config, j54, this.core.reporterService);
                });
            }
            await this.doSyncCrateDB();
        }
        catch (f54) {
            this.core.logger.error(TAG, 'init db failed', f54);
        }
    }
    async doSyncCrateDB() {
        const v53 = Array.from(this.rdbStoreManagerMap);
        for (let w53 = 0; w53 < v53.length; w53++) {
            let x53 = v53[w53][0];
            let y53 = v53[w53][1];
            let z53 = `${x53}.db`;
            try {
                const c54 = await y53.getDb(z53);
                this.core.logger.info(TAG, 'doSyncCrateDB', z53);
            }
            catch (a54) {
                const b54 = a54;
                this.core.logger.error(TAG, 'creat db error', a54);
            }
        }
    }
    async restore(q53, r53) {
        try {
            let t53 = `${this.config.appKey}/${this.core.account}`;
            let u53 = t53 + `/${r53}_backup.db`;
            if (await fileIo.access(u53)) {
                await q53.restore(u53);
                this.core.logger.info(TAG, 'restore succ', u53);
            }
        }
        catch (s53) {
            this.core.logger.error(TAG, 'restore failed', `Code:${s53.code}, message:${s53.message}`);
        }
    }
    async backup(m53, n53) {
        try {
            let p53 = `${n53}_backup.db`;
            await m53.backup(p53);
            this.core.logger.info(TAG, 'backup succ', p53);
        }
        catch (o53) {
            console.error(`Code:${o53.code}, message:${o53.message}`);
        }
    }
    acquireFtsPluginLibs(i53, j53) {
        const k53 = (j53 === NIM_DATABASE_NAME_MESSAGE) && this.core.searchService.v2IIsEnable();
        if (k53) {
            const l53 = deviceInfo.abiList;
            switch (l53) {
                case 'arm64-v8a':
                    return [i53.bundleCodeDir + "/libs/arm64/libsimple.so"];
                case 'armeabi-v7a':
                case 'x86_64':
                default:
                    break;
            }
        }
        return undefined;
    }
    getListFile() {
        let d53 = getContext(this);
        let e53 = d53.bundleCodeDir;
        let f53 = {
            recursion: false,
            listNum: 0,
            filter: {
                fileSizeOver: 0,
                lastModifiedAfter: new Date(0).getTime()
            }
        };
        let g53 = fs.listFileSync(e53 + "/libs/x86_64", f53);
        for (let h53 = 0; h53 < g53.length; h53++) {
            console.info(`The name of file: ${g53[h53]}`);
        }
    }
}
