import { NetWorkingInStance } from '../../utils/NetWorking';
export class ReporterEvent {
}
export class ReporterResourceEvent extends ReporterEvent {
}
export class ReporterAPIEvent extends ReporterEvent {
}
export class ReportEventExtension {
    constructor(b9, c9, d9, e9, f9) {
        this.operation_type = b9;
        this.target = c9;
        this.code = d9;
        this.description = e9;
        this.context = f9;
        const g9 = NetWorkingInStance.getInstance().getNetInfoSync();
        this.net_connect = g9.isConnected;
        this.net_type = g9.netType;
    }
}
export class ReporterSyncEvent extends ReporterEvent {
}
export class ReporterSyncEventExtension {
    constructor(u8, v8, w8, x8, y8, z8) {
        this.sync_type = u8;
        this.times = v8;
        this.total = w8;
        this.sync_duration = x8;
        this.proc_duration = y8;
        this.description = z8;
        const a9 = NetWorkingInStance.getInstance().getNetInfoSync();
        this.net_connect = a9.isConnected;
        this.net_type = a9.netType;
    }
}
export const guid = (function () {
    const t8 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return function () {
        return t8() + t8() + t8() + t8() + t8() + t8() + t8() + t8();
    };
})();
