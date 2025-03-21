import connection from '@ohos.net.connection';
const TAG = '[HarmonyNetConnectionReceiver]';
export class HarmonyNetConnectionReceiver {
    constructor(n20) {
        this.networkStatusChangeCache = new Map();
        this.logger = n20;
    }
    onNetworkStatusChange(g20, h20) {
        let i20 = connection.createNetConnection({
            netCapabilities: {
                networkCap: [connection.NetCap.NET_CAPABILITY_INTERNET],
                bearerTypes: [
                    connection.NetBearType.BEARER_CELLULAR,
                    connection.NetBearType.BEARER_WIFI,
                    connection.NetBearType.BEARER_ETHERNET
                ]
            }
        });
        i20.register((m20) => {
            this.logger.info(TAG, 'netCon register', m20);
        });
        i20.on('netAvailable', (l20) => {
            this.logger.info(TAG, 'netChange net available true data', l20);
            h20({ 'isConnected': true });
        });
        i20.on('netLost', (k20) => {
            this.logger.info(TAG, 'netChange net available false data', k20);
            h20({ 'isConnected': false });
        });
        i20.on('netUnavailable', ((j20) => {
            this.logger.info(TAG, 'netChange net unavailable', j20);
            h20({ 'isConnected': false });
        }));
        this.networkStatusChangeCache.set(g20, i20);
    }
    offNetworkStatusChange(d20) {
        let e20 = this.networkStatusChangeCache.get(d20);
        if (e20) {
            e20.unregister((f20) => {
                this.logger.info(TAG, 'unregister', f20);
            });
            this.networkStatusChangeCache.delete(d20);
        }
    }
}
