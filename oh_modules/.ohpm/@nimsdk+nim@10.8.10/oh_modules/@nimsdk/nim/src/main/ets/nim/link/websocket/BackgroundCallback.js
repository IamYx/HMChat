import AbilityLifecycleCallback from "@ohos.app.ability.AbilityLifecycleCallback";
const TAG = 'BackgroundCallback';
export class BackgroundCallback extends AbilityLifecycleCallback {
    constructor(g73) {
        super();
        this.clientSocket = g73;
    }
    onAbilityForeground(f73) {
        console.info(TAG, 'onAbilityBackground');
        this.clientSocket.onAbilityForeground();
    }
    onAbilityBackground(e73) {
        console.info(TAG, 'onAbilityBackground');
    }
}
