import connection from '@ohos.net.connection';
import radio from "@ohos.telephony.radio";
export class NetworkingInstance {
    constructor() {
        this.netList = [];
        this._objects = new Map();
    }
    static getInstance() {
        if (!NetworkingInstance.instance) {
            NetworkingInstance.instance = new NetworkingInstance();
        }
        return NetworkingInstance.instance;
    }
    getNetCapabilitiesSync() {
        try {
            let o103 = connection.getDefaultNetSync();
            let p103 = connection.getNetCapabilitiesSync(o103);
            if (p103.bearerTypes.length > 0) {
                const q103 = p103.bearerTypes[0];
                if (q103 === connection.NetBearType.BEARER_WIFI) {
                    return 'WIFI';
                }
                else {
                    const r103 = this.getSignalType();
                    if (r103 == 1 || r103 == 2) {
                        return '2G';
                    }
                    else if (r103 == 3 || r103 == 4) {
                        return '3G';
                    }
                    else if (r103 == 5) {
                        return '4G';
                    }
                    else if (r103 == 6) {
                        return '5G';
                    }
                    else {
                        return 'unknown';
                    }
                }
            }
            return 'unknown';
        }
        catch (n103) {
            return 'unknown';
        }
    }
    getNetInfoSync() {
        try {
            const k103 = {
                netType: -1,
                isConnected: false
            };
            let l103 = connection.getDefaultNetSync();
            let m103 = connection.getNetCapabilitiesSync(l103);
            if (m103.bearerTypes.length > 0) {
                k103.netType = m103.bearerTypes[0];
            }
            return k103;
        }
        catch (j103) {
            return {
                isConnected: false,
                netType: -1
            };
        }
    }
    judgeHasNet() {
        try {
            let g103 = connection.getDefaultNetSync();
            if (!g103 || g103.netId === 0) {
                return false;
            }
            let h103 = connection.getNetCapabilitiesSync(g103);
            let i103 = h103.networkCap || [];
            if (i103.includes(connection.NetCap.NET_CAPABILITY_VALIDATED)) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e103) {
            let f103 = e103;
            console.error("JudgeHasNet" + JSON.stringify(f103));
        }
        return false;
    }
    getSignalType() {
        let b103 = 0;
        if (canIUse("SystemCapability.Telephony.CoreService")) {
            const c103 = radio.getSignalInformationSync(b103);
            if (c103.length > 0) {
                let d103 = c103[0].signalType;
                return d103;
            }
        }
        return -1;
    }
    getAllNets(y102) {
        connection.getAllNets((z102, a103) => {
            if (a103) {
                this.netList = a103;
            }
        });
    }
    onNetworkStatusChange(r102, s102) {
        let t102 = connection.createNetConnection({
            netCapabilities: {
                networkCap: [connection.NetCap.NET_CAPABILITY_INTERNET],
                bearerTypes: [connection.NetBearType.BEARER_CELLULAR, connection.NetBearType.BEARER_WIFI,
                    connection.NetBearType.BEARER_ETHERNET]
            }
        });
        t102.register((x102) => {
        });
        t102.on('netAvailable', (w102) => {
            s102({ 'isConnected': true });
        });
        t102.on('netLost', (v102) => {
            s102({ 'isConnected': false });
        });
        t102.on('netUnavailable', ((u102) => {
            s102({ 'isConnected': false });
        }));
        this._objects.set(r102, t102);
    }
    offNetworkStatusChange(o102) {
        let p102 = this._objects.get(o102);
        if (p102) {
            p102.unregister((q102) => {
                console.info(JSON.stringify(q102));
            });
            this._objects.delete(o102);
        }
    }
}
