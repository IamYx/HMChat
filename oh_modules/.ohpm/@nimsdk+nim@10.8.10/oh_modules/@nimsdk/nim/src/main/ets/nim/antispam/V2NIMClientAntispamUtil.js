import { cmdConfigMessageAntispam, cmdMapMessageAntispam, registerParser, V2NIMClientAntispamOperateType, V2Service } from '@nimsdk/base';
import { AntispamCloud } from './AntispamCloud';
import { AntispamModel } from './AntispamModel';
const TAG = '[V2NIMClientAntispamUtil]';
export default class V2NIMClientAntispamUtil extends V2Service {
    constructor(u37, v37, w37 = {}) {
        super(v37, u37);
        u37.clientAntispamUtil = this;
        registerParser(u37, {
            cmdMap: cmdMapMessageAntispam, cmdConfig: cmdConfigMessageAntispam
        });
        this.model = new AntispamModel(u37);
        this.cloud = new AntispamCloud(u37);
        this.model.loadLocalAntispam();
    }
    async onLoginStart(t37) {
    }
    async onLoginFinished(r37) {
        try {
            this.syncLocalAntispam();
        }
        catch (s37) {
            this.core.logger.error(TAG, 'onLoginFinished', s37);
        }
    }
    onLogout() {
    }
    async syncLocalAntispam() {
        try {
            await this.model.getVersion().then((n37) => {
                this.cloud.syncLocalAntiSpamInfo(n37).then(async (o37) => {
                    this.model.checkMd5(o37.md5, (p37) => {
                        if (o37.url?.length > 0 && p37) {
                            this.cloud.downloadAntispam(o37.url).then((q37) => {
                                this.model.updateLocalAntispam(o37.version, q37);
                            });
                        }
                    });
                });
            }).catch((m37) => {
                this.core.logger.error(TAG, 'syncLocalAntispam', m37);
            });
        }
        catch (l37) {
            this.core.logger.error(TAG, 'syncLocalAntispam', l37);
        }
    }
    checkTextAntispam(f37 = '', g37 = '') {
        this.core.logger.info(TAG, 'call API checkTextAntispam', f37, g37);
        if (this.model.thesaurus.length === 0) {
            if (typeof this.core.loginService !== 'undefined' &&
                this.core.loginService.getLoginUser().length > 0) {
                this.syncLocalAntispam();
            }
            return {
                operateType: V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_NONE,
                replacedText: f37
            };
        }
        let h37 = f37;
        const i37 = this.model.thesaurus;
        if (i37.length > 0) {
            for (const j37 of i37) {
                const k37 = this.filterContent(h37, j37, g37);
                h37 = k37.replacedText;
                if (k37.operateType === V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_CLIENT_SHIELD ||
                    k37.operateType === V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_SERVER_SHIELD) {
                    return k37;
                }
            }
        }
        return {
            operateType: h37 === f37
                ? V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_NONE
                : V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_REPLACE,
            replacedText: h37
        };
    }
    filterContent(y36, z36, a37) {
        for (const b37 of z36.keys) {
            const c37 = b37.match || z36.match;
            const d37 = (b37.operate || z36.operate);
            let e37 = this.matchContent(y36, b37.key, c37, d37, a37);
            if (!e37) {
                continue;
            }
            y36 = e37.replacedText;
            if (e37.operateType === V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_CLIENT_SHIELD ||
                e37.operateType === V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_SERVER_SHIELD) {
                return e37;
            }
        }
        return {
            operateType: V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_REPLACE,
            replacedText: y36
        };
    }
    matchContent(p36, q36, r36, s36, t36) {
        let u36 = false;
        let v36 = '';
        if (r36 === 1) {
            if (p36.includes(q36)) {
                u36 = true;
                v36 = q36;
            }
        }
        else if (r36 === 2) {
            try {
                const x36 = new RegExp(q36, 'g');
                if (x36.test(p36)) {
                    u36 = true;
                    v36 = q36;
                }
            }
            catch (w36) {
            }
        }
        if (u36 && v36 !== '') {
            switch (s36) {
                case 1:
                    return {
                        operateType: V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_REPLACE,
                        replacedText: p36.replace(v36, t36)
                    };
                case 2:
                    return {
                        operateType: V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_CLIENT_SHIELD,
                        replacedText: p36
                    };
                case 3:
                    return {
                        operateType: V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_SERVER_SHIELD,
                        replacedText: p36
                    };
            }
        }
        return {
            operateType: V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_NONE,
            replacedText: p36
        };
    }
}
