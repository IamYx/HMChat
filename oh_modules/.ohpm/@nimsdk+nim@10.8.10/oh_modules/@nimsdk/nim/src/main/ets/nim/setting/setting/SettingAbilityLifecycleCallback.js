import AbilityLifecycleCallback from "@ohos.app.ability.AbilityLifecycleCallback";
const TAG = 'SettingAbilityLifecycleCallback';
export class SettingAbilityLifecycleCallback extends AbilityLifecycleCallback {
    constructor(n107) {
        super();
        this.settingService = n107;
    }
    onAbilityForeground(m107) {
        this.settingService.logger.info(TAG, `onAbilityForeground`);
        this.settingService.isForeground = true;
        this.settingService.setAppBackground(false, 0);
    }
    onAbilityBackground(l107) {
        this.settingService.logger.info(TAG, `onAbilityBackground`);
        this.settingService.isForeground = false;
        this.settingService.setAppBackground(true);
    }
    onAbilityCreate(k107) {
        this.settingService.logger.info(TAG, `onAbilityCreate`);
    }
    onWindowStageCreate(i107, j107) {
        this.settingService.logger.info(TAG, `onWindowStageCreate`);
    }
    onWindowStageActive(g107, h107) {
        this.settingService.logger.info(TAG, `onWindowStageActive`);
    }
    onWindowStageInactive(e107, f107) {
        this.settingService.logger.info(TAG, `onWindowStageInactive`);
    }
    onWindowStageDestroy(c107, d107) {
        this.settingService.logger.info(TAG, `onWindowStageDestroy`);
    }
    onAbilityDestroy(b107) {
        this.settingService.logger.info(TAG, `onAbilityDestroy`);
    }
    onAbilityContinue(a107) {
        this.settingService.logger.info(TAG, `onAbilityContinue`);
    }
}
