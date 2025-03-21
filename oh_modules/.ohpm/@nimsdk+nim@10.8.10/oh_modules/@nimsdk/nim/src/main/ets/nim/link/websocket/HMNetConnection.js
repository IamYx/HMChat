import connection from '@ohos.net.connection';
const TAG = '[NetConnection]';
export class HMNetConnection {
    constructor(s73) {
        this.networkStatusChangeCache = new Map();
        this.logger = s73;
    }
    onNetworkStatusChange(k73, l73) {
        let m73 = connection.createNetConnection({
            netCapabilities: {
                networkCap: [connection.NetCap.NET_CAPABILITY_INTERNET],
                bearerTypes: [
                    connection.NetBearType.BEARER_CELLULAR,
                    connection.NetBearType.BEARER_WIFI,
                    connection.NetBearType.BEARER_ETHERNET
                ]
            }
        });
        m73.register((r73) => {
            this.logger.info(TAG, 'netCon register', r73);
        });
        m73.on('netAvailable', (q73) => {
            this.logger.info(TAG, 'netChange net available true data', q73);
            l73({ 'isConnected': true });
        });
        m73.on('netLost', (p73) => {
            this.logger.info(TAG, 'netChange net available false data', p73);
            l73({ 'isConnected': false });
        });
        m73.on('netUnavailable', ((o73) => {
            this.logger.info(TAG, 'netChange net unavailable', o73);
            l73({ 'isConnected': false });
        }));
        m73.on('netBlockStatusChange', (n73) => {
            this.logger.warn(TAG, "netBlockStatusChange ", JSON.stringify(n73));
        });
        this.networkStatusChangeCache.set(k73, m73);
    }
    offNetworkStatusChange(h73) {
        let i73 = this.networkStatusChangeCache.get(h73);
        if (i73) {
            i73.unregister((j73) => {
                this.logger.info(TAG, 'unregister', j73);
            });
            this.networkStatusChangeCache.delete(h73);
        }
    }
}
