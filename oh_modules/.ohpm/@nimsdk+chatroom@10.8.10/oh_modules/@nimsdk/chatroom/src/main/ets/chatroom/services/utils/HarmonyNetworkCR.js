import connection from '@ohos.net.connection';
const TAG = '[HarmonyNetConnectionReceiverCR]';
export class HarmonyNetConnectionReceiverCR {
    constructor(h44) {
        this.networkStatusChangeCache = new Map();
        this.logger = h44;
    }
    onNetworkStatusChange(a44, b44) {
        let c44 = connection.createNetConnection({
            netCapabilities: {
                networkCap: [connection.NetCap.NET_CAPABILITY_INTERNET],
                bearerTypes: [
                    connection.NetBearType.BEARER_CELLULAR,
                    connection.NetBearType.BEARER_WIFI,
                    connection.NetBearType.BEARER_ETHERNET
                ]
            }
        });
        c44.register((g44) => {
            this.logger.info(TAG, 'netCon register: ' + JSON.stringify(g44));
        });
        c44.on('netAvailable', (f44) => {
            this.logger.info(TAG, 'netChange net available true data', JSON.stringify(f44));
            b44({ 'isConnected': true });
        });
        c44.on('netLost', (e44) => {
            this.logger.info(TAG, 'netChange net available false data', JSON.stringify(e44));
            b44({ 'isConnected': false });
        });
        c44.on('netUnavailable', ((d44) => {
            this.logger.info(TAG, 'netChange net unavailable', JSON.stringify(d44));
            b44({ 'isConnected': false });
        }));
        this.networkStatusChangeCache.set(a44, c44);
    }
    offNetworkStatusChange(x43) {
        let y43 = this.networkStatusChangeCache.get(x43);
        if (y43) {
            y43.unregister((z43) => {
                this.logger.info(JSON.stringify(z43));
            });
            this.networkStatusChangeCache.delete(x43);
        }
    }
}
