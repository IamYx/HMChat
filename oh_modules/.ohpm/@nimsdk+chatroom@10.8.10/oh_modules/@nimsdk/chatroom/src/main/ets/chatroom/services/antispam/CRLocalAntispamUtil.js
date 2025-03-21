import { registerParser, V2NIMClientAntispamOperateType, V2NIMDisconnectReason, } from '@nimsdk/base';
import { cmdConfigCRAntispam, cmdMapCRAntispam } from '@nimsdk/base';
import { CRAntispamModel } from './CRAntispamModel';
import { CRAntispamCloud } from './CRAntispamCloud';
import CRBaseService from '../base/CRBaseService';
export default class CRLocalAntispamUtil extends CRBaseService {
    constructor(l3) {
        super("localAntispamUtil", l3);
        l3.localAntispamUtil = this;
        registerParser(l3, { cmdMap: cmdMapCRAntispam, cmdConfig: cmdConfigCRAntispam });
        this.model = new CRAntispamModel(l3);
        this.cloud = new CRAntispamCloud(l3);
        this.model.loadLocalAntispam();
    }
    async syncLocalAntispam() {
        try {
            await this.model.getVersion().then((h3) => {
                this.cloud.syncLocalAntiSpamInfo(h3).then(async (i3) => {
                    this.model.checkMd5(i3.md5, (j3) => {
                        if (i3.url?.length > 0 && j3) {
                            this.cloud.downloadAntispam(i3.url).then((k3) => {
                                this.model.updateLocalAntispam(i3.version, k3);
                            });
                        }
                    });
                });
            }).catch((g3) => {
                this.core.logger.error('syncLocalAntispam :' + `${g3}`);
            });
        }
        catch (f3) {
            this.core.logger.error('syncLocalAntispam :' + `${f3}`);
        }
    }
    checkTextAntispam(z2 = '', a3 = '**') {
        if (this.model.thesaurus.length === 0) {
            this.syncLocalAntispam();
            return {
                operateType: V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_NONE,
                replacedText: z2
            };
        }
        let b3 = z2;
        const c3 = this.model.thesaurus;
        if (c3.length > 0) {
            for (const d3 of c3) {
                const e3 = this.filterContent(b3, d3, a3);
                b3 = e3.replacedText;
                if (e3.operateType === V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_CLIENT_SHIELD ||
                    e3.operateType === V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_SERVER_SHIELD) {
                    return e3;
                }
            }
        }
        return {
            operateType: b3 === z2
                ? V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_NONE
                : V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_REPLACE,
            replacedText: b3
        };
    }
    filterContent(s2, t2, u2) {
        for (const v2 of t2.keys) {
            const w2 = v2.match || t2.match;
            const x2 = (v2.operate || t2.operate);
            let y2;
            y2 = this.matchContent(s2, v2.key, w2, x2, u2);
            if (!y2)
                continue;
            s2 = y2.replacedText;
            if (y2.operateType === V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_CLIENT_SHIELD ||
                y2.operateType === V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_SERVER_SHIELD) {
                return y2;
            }
        }
        return {
            operateType: V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_REPLACE,
            replacedText: s2
        };
    }
    matchContent(k2, l2, m2, n2, o2) {
        let p2 = false;
        let q2 = '';
        if (m2 === 1) {
            if (k2.includes(l2)) {
                p2 = true;
                q2 = l2;
            }
        }
        else if (m2 === 2) {
            const r2 = new RegExp(l2, 'g');
            if (r2.test(k2)) {
                p2 = true;
                q2 = l2;
            }
        }
        if (p2 && q2 !== '') {
            switch (n2) {
                case 1:
                    return {
                        operateType: V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_REPLACE,
                        replacedText: k2.replace(q2, o2)
                    };
                case 2:
                    return {
                        operateType: V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_CLIENT_SHIELD,
                        replacedText: k2
                    };
                case 3:
                    return {
                        operateType: V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_SERVER_SHIELD,
                        replacedText: k2
                    };
            }
        }
        return {
            operateType: V2NIMClientAntispamOperateType.V2NIM_CLIENT_ANTISPAM_OPERATE_NONE,
            replacedText: k2
        };
    }
    reset(j2) {
        if (j2 === V2NIMDisconnectReason.Destroy) {
            this.model.reset();
            this.cloud.reset();
        }
    }
}
