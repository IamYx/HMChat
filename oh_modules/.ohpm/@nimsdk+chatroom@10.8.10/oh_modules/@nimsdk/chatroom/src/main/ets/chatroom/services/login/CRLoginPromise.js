import { PromiseManager, TimerManager, V2NIMErrorCode, V2NIMErrorImpl } from '@nimsdk/base';
export class CRLoginPromise {
    constructor(v9) {
        this.core = v9;
        this.loginTimerManager = new TimerManager();
        this.previousLoginManager = new PromiseManager();
        this.doLoginStepsManager = new PromiseManager();
    }
    async originLoginAdd() {
        return await this.previousLoginManager.add(this.originLoginPromise);
    }
    async doLoginAdd(u9) {
        return await this.doLoginStepsManager.add(u9);
    }
    timerDestroy() {
        this.loginTimerManager.destroy();
    }
    previousClear() {
        this.previousLoginManager.clear();
    }
    doLoginClear() {
        this.doLoginStepsManager.clear();
    }
    resetPromise() {
        this.doLoginStepsManager.clear();
        this.previousLoginManager.clear();
        this.originLoginPromise = undefined;
    }
    clearAll() {
        this.doLoginStepsManager.clear();
        this.previousLoginManager.clear();
        this.loginTimerManager.destroy();
        this.originLoginPromise = undefined;
    }
    resetTimerManager(r9, s9) {
        this.loginTimerManager.destroy();
        this.loginTimerManager.addTimer(() => {
            const t9 = new V2NIMErrorImpl({
                code: V2NIMErrorCode.V2NIM_ERROR_CODE_TIMEOUT,
                detail: {
                    reason: 'Login API timeout'
                }
            });
            this.resetPromise();
            this.doLoginStepsManager.clear(t9);
            this.previousLoginManager.clear(t9);
            this.originLoginPromise = undefined;
            s9(t9);
        }, r9 ? r9 * 1000 : 60000, 1);
    }
}
