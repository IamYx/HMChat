import backgroundTaskManager from "@ohos.resourceschedule.backgroundTaskManager";
const TAG = '[SuspendBackgroundTask]';
export class SuspendBackgroundTask {
    constructor() {
    }
    requestSuspendDelay() {
        try {
            let n152 = 'data storage request suspend delay';
            let o152 = backgroundTaskManager.requestSuspendDelay(n152, () => {
                if (this.taskId) {
                    backgroundTaskManager.cancelSuspendDelay(this.taskId);
                }
            });
            this.taskId = o152.requestId;
            this.delayTime = o152.actualDelayTime;
        }
        catch (m152) {
        }
    }
    cancelSuspendDelay() {
        try {
            if (this.taskId) {
                backgroundTaskManager.cancelSuspendDelay(this.taskId);
            }
        }
        catch (l152) {
        }
    }
}
