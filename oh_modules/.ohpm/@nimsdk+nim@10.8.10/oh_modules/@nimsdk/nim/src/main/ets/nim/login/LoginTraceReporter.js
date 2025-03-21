import { LoginTraceStep, ReportEventExtension } from '@nimsdk/base';
import { NetBoost } from '../boost/NetBoost';
import { ReporterEventFactory } from '../repoter/event/ReporterEventFactory';
export class LoginTraceReporter {
    constructor(t83) {
        this.core = t83;
    }
    loginTrace(l83, m83, n83) {
        switch (l83) {
            case LoginTraceStep.loginStart:
                {
                    this.startTime = Date.now();
                }
                break;
            case LoginTraceStep.linkStart:
                {
                    this.linkStartTime = Date.now();
                }
                break;
            case LoginTraceStep.linkSuccess:
                {
                    if (typeof this.linkStartTime !== 'undefined') {
                        this.target = n83;
                        this.createLinkExtensionEvent(this.linkStartTime, this.target, true, 'TCP', m83);
                        this.linkStartTime = undefined;
                    }
                }
                break;
            case LoginTraceStep.linkFailed:
                {
                    if (typeof this.linkStartTime !== 'undefined') {
                        this.target = n83;
                        this.reportLinkFailedEvent(this.linkStartTime, this.target, m83);
                        this.linkStartTime = undefined;
                    }
                }
                break;
            case LoginTraceStep.loginSucceed:
                {
                    if (typeof this.startTime !== 'undefined') {
                        const s83 = '26_2';
                        this.reportLoginEvent(this.startTime, s83, true, 'protocol', m83, 'manual_login');
                        this.startTime = undefined;
                    }
                }
                break;
            case LoginTraceStep.loginFailed:
                {
                    if (typeof this.startTime !== 'undefined') {
                        const r83 = '26_2';
                        this.reportLoginEvent(this.startTime, r83, false, 'protocol', m83, 'manual_login');
                        this.startTime = undefined;
                    }
                }
                break;
            case LoginTraceStep.loginTimeout:
                {
                    if (typeof this.startTime !== 'undefined') {
                        const q83 = '26_2';
                        this.reportLoginEvent(this.startTime, q83, false, 'protocol', m83, 'manual_login');
                        this.startTime = undefined;
                    }
                }
                break;
            case LoginTraceStep.autoLoginStart:
                {
                    this.startTime = Date.now();
                }
                break;
            case LoginTraceStep.autoLoginSucceed:
                {
                    if (typeof this.startTime !== 'undefined') {
                        const p83 = '26_2';
                        this.reportLoginEvent(this.startTime, p83, true, 'protocol', m83, 'auto_login');
                        this.startTime = undefined;
                    }
                }
                break;
            case LoginTraceStep.autoLoginFailed:
                {
                    if (typeof this.startTime !== 'undefined') {
                        const o83 = '26_2';
                        this.reportLoginEvent(this.startTime, o83, false, 'protocol', m83, 'auto_login');
                        this.startTime = undefined;
                    }
                }
                break;
            default:
                this.startTime = undefined;
                break;
        }
    }
    createLinkExtensionEvent(e83, f83, g83, h83, i83) {
        const j83 = g83 ? 200 : 0;
        const k83 = new ReportEventExtension(h83, f83, j83, this.descriptionSpliceNet(i83));
        k83.duration = Date.now() - e83;
        k83.succeed = g83;
        this.linkExtension = k83;
    }
    createLoginExtensionEvent(x82, y82, z82, a83, b83) {
        const c83 = z82 ? 200 : 0;
        const d83 = new ReportEventExtension(a83, y82, c83, this.descriptionSpliceNet(b83));
        d83.duration = Date.now() - x82;
        d83.succeed = z82;
        return d83;
    }
    reportLinkFailedEvent(q82, r82, s82, t82) {
        const u82 = {
            user_id: this.core.account,
            start_time: q82,
            target: r82,
            succeed: false,
            action: t82,
            duration: Date.now() - q82,
            operation_type: 'TCP',
            code: 0,
            description: this.descriptionSpliceNet(s82),
            mixlink: true,
        };
        const v82 = ReporterEventFactory.createEvent("login", u82);
        const w82 = new ReportEventExtension('TCP', r82, 0, this.descriptionSpliceNet(s82));
        w82.duration = Date.now() - q82;
        w82.succeed = false;
        if (w82.net_connect) {
            v82.extension?.push(w82);
            this.core.reporterService.addBizEvent(v82);
        }
    }
    reportLoginEvent(h82, i82, j82, k82, l82, m82) {
        const n82 = {
            user_id: this.core.account,
            start_time: h82,
            target: '26_2',
            succeed: j82,
            action: m82,
            duration: Date.now() - h82,
            operation_type: k82,
            code: j82 ? 200 : 0,
            description: this.descriptionSpliceNet(l82),
            mixlink: true,
        };
        const o82 = ReporterEventFactory.createEvent("login", n82);
        if (this.linkExtension && this.linkExtension.net_connect) {
            o82.extension?.push(this.linkExtension);
            const p82 = this.createLoginExtensionEvent(h82, i82, j82, k82, this.descriptionSpliceNet(l82));
            if (p82.net_connect) {
                o82.extension?.push(p82);
                this.core.reporterService.addBizEvent(o82);
            }
            this.linkExtension = undefined;
        }
    }
    descriptionSpliceNet(g82) {
        return g82 + `weakSignal:${NetBoost.getInstance().isWeakSignalState} `
            + ` isHandoverChanging:${NetBoost.getInstance().isHandoverChanging} ` + NetBoost.getInstance().recommendedAction;
    }
}
