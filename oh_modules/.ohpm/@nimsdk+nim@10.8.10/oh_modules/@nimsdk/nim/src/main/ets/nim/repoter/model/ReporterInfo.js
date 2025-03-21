import { NetworkingInstance } from '../Networking';
export class ReportEventExtension {
    constructor(e101, f101, g101, h101, i101) {
        this.operation_type = e101;
        this.target = f101;
        this.code = g101;
        this.description = h101;
        this.context = i101;
        const j101 = NetworkingInstance.getInstance().getNetInfoSync();
        this.net_connect = j101.isConnected;
        this.net_type = j101.netType;
    }
}
export class ReporterInfo {
    constructor(b101, c101, d101) {
        this.tag = b101;
        this.action = c101;
        this.start_time = d101;
    }
}
