import netHandover from "@hms.networkboost.handover";
import netQuality from "@hms.networkboost.netquality";
const TAG = '[NetBoost]';
const RTT_THRESHOLD_MS = 50;
export class NetBoost {
    constructor() {
        this.isWeakSignalState = false;
        this.isHandoverChanging = false;
        this.recommendedAction = '';
        this.onNetworkQosChange();
        this.onNetworkSceneChange();
        this.onHandoverChange();
    }
    static getInstance() {
        if (!NetBoost.instance) {
            NetBoost.instance = new NetBoost();
        }
        return NetBoost.instance;
    }
    onNetworkQosChange() {
        try {
            this.logger?.info(TAG, 'on receive netQosChange event');
            netQuality.on('netQosChange', (h38) => {
                if (h38.length > 0) {
                    h38.forEach((i38) => {
                        if (i38.rttMs > RTT_THRESHOLD_MS) {
                            this.logger?.warn(TAG, 'on receive netQosChange event:', i38);
                        }
                    });
                }
            });
        }
        catch (g38) {
            this.logger?.error(TAG, 'on receive netQosChange event failed', g38);
        }
    }
    onNetworkSceneChange() {
        try {
            this.logger?.info(TAG, 'on receive netSceneChange event');
            netQuality.on('netSceneChange', (e38) => {
                if (e38.length > 0) {
                    e38.forEach((f38) => {
                        this.logger?.warn(TAG, 'on receive netSceneChange event:', f38);
                        if (f38.scene == 'congestion' || f38.scene == 'weakSignal') {
                            this.isWeakSignalState = true;
                            this.logger?.warn(TAG, 'on netSceneChange weak signal state');
                        }
                        else {
                            this.isWeakSignalState = false;
                        }
                        this.recommendedAction = f38.recommendedAction;
                        if (f38.weakSignalPrediction) {
                            this.logger?.warn(TAG, 'on net weak signal state');
                        }
                    });
                }
            });
        }
        catch (d38) {
            this.logger?.info(TAG, 'on netSceneChange error:', d38);
        }
    }
    onHandoverChange() {
        try {
            netHandover.on('handoverChange', (c38) => {
                if (c38.handoverStart) {
                    this.logger?.info(TAG, 'handover start');
                    this.isHandoverChanging = true;
                }
                else if (c38.handoverComplete) {
                    this.logger?.info(TAG, 'handover complete');
                    this.isHandoverChanging = false;
                }
            });
        }
        catch (b38) {
            this.logger?.warn('onHandoverChange errCode: ' + b38.code + ', errMessage: ' + b38.message);
        }
    }
    reportQoe() {
        try {
            let y37 = 'default';
            let z37 = 'unknown';
            let a38 = {
                serviceType: y37,
                qoeType: z37
            };
            netQuality.reportQoe(a38);
        }
        catch (x37) {
            console.error('onHandoverChange errCode: ' + x37.code + ', errMessage: ' + x37.message);
        }
    }
    off() {
    }
}
