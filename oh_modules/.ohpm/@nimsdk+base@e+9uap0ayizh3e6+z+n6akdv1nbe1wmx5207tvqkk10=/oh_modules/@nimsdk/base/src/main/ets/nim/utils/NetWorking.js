import connection from '@ohos.net.connection';
import radio from "@ohos.telephony.radio";
export class NetWorkingInStance {
    constructor() {
        this.netList = [];
        this._objects = new Map();
    }
    static getInstance() {
        if (!NetWorkingInStance.instance) {
            NetWorkingInStance.instance = new NetWorkingInStance();
        }
        return NetWorkingInStance.instance;
    }
    getNetCapabilitiesSync() {
        try {
            let y23 = connection.getDefaultNetSync();
            let z23 = connection.getNetCapabilitiesSync(y23);
            if (z23.bearerTypes.length > 0) {
                const a24 = z23.bearerTypes[0];
                if (a24 === connection.NetBearType.BEARER_WIFI) {
                    return 'WIFI';
                }
                else {
                    const b24 = this.getSignalType();
                    if (b24 == 1 || b24 == 2) {
                        return '2G';
                    }
                    else if (b24 == 3 || b24 == 4) {
                        return '3G';
                    }
                    else if (b24 == 5) {
                        return '4G';
                    }
                    else if (b24 == 6) {
                        return '5G';
                    }
                    else {
                        return 'unknown';
                    }
                }
            }
            return 'unknown';
        }
        catch (x23) {
            return 'unknown';
        }
    }
    getNetInfoSync() {
        try {
            const u23 = {
                netType: -1,
                isConnected: false
            };
            let v23 = connection.getDefaultNetSync();
            let w23 = connection.getNetCapabilitiesSync(v23);
            if (w23.bearerTypes.length > 0) {
                u23.netType = w23.bearerTypes[0];
            }
            u23.isConnected = this.judgeHasNet();
            return u23;
        }
        catch (t23) {
            return {
                isConnected: false,
                netType: -1
            };
        }
    }
    judgeHasNet() {
        try {
            let q23 = connection.getDefaultNetSync();
            if (!q23 || q23.netId === 0) {
                return false;
            }
            let r23 = connection.getNetCapabilitiesSync(q23);
            let s23 = r23.networkCap || [];
            if (s23.includes(connection.NetCap.NET_CAPABILITY_VALIDATED)) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (o23) {
            let p23 = o23;
            console.error('JudgeHasNet' + JSON.stringify(p23));
        }
        return false;
    }
    getSignalType() {
        let l23 = 0;
        if (canIUse('SystemCapability.Telephony.CoreService')) {
            const m23 = radio.getSignalInformationSync(l23);
            if (m23.length > 0) {
                let n23 = m23[0].signalType;
                return n23;
            }
        }
        return -1;
    }
    getAllNets(i23) {
        connection.getAllNets((j23, k23) => {
            if (k23) {
                this.netList = k23;
            }
        });
    }
    onNetworkStatusChange(b23, c23) {
        let d23 = connection.createNetConnection({
            netCapabilities: {
                networkCap: [connection.NetCap.NET_CAPABILITY_INTERNET],
                bearerTypes: [connection.NetBearType.BEARER_CELLULAR, connection.NetBearType.BEARER_WIFI,
                    connection.NetBearType.BEARER_ETHERNET]
            }
        });
        d23.register((h23) => {
        });
        d23.on('netAvailable', (g23) => {
            c23({ 'isConnected': true });
        });
        d23.on('netLost', (f23) => {
            c23({ 'isConnected': false });
        });
        d23.on('netUnavailable', ((e23) => {
            console.info('netCon netUnavailable: ' + JSON.stringify(e23));
            c23({ 'isConnected': false });
        }));
        this._objects.set(b23, d23);
    }
    offNetworkStatusChange(y22) {
        let z22 = this._objects.get(y22);
        if (z22) {
            z22.unregister((a23) => {
                console.info(JSON.stringify(a23));
            });
            this._objects.delete(y22);
        }
    }
}
