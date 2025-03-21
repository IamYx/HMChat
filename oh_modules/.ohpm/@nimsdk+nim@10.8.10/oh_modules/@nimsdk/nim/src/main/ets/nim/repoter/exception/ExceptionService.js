import connection from "@ohos.net.connection";
import { ReporterEventFactory } from "../event/ReporterEventFactory";
export class ExceptionService {
    constructor(e100) {
        this.core = e100;
    }
    createEvent(c100) {
        if (c100.description) {
            c100.description = c100.description + this.getConnectionProperties();
        }
        else {
            c100.description = this.getConnectionProperties();
        }
        const d100 = ReporterEventFactory.createEvent("exceptions", c100);
        return d100;
    }
    getConnectionProperties() {
        try {
            const z99 = connection.getDefaultNetSync();
            const a100 = connection.getConnectionPropertiesSync(z99);
            const b100 = ' interface_name:' + a100.interfaceName
                + ' domains:' + a100.domains
                + ' link_addresses:' + JSON.stringify(a100.linkAddresses)
                + ' routes' + JSON.stringify(a100.routes)
                + ' dns:' + JSON.stringify(a100.dnses)
                + ' MTU:' + a100.mtu + '\n';
            return b100;
        }
        catch (y99) {
            return 'get connection properties failed';
        }
    }
}
