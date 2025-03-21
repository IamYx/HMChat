import { AbilityLifecycleCallback, UIAbility } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import V2NIMSettingServiceImpl from '../V2NIMSettingServiceImpl';
export declare class SettingAbilityLifecycleCallback extends AbilityLifecycleCallback {
    private settingService;
    constructor(n107: V2NIMSettingServiceImpl);
    /**
     * Send foreground status
     * @param ability
     */
    onAbilityForeground(m107: UIAbility): void;
    /**
     * Send background status
     * @param ability
     */
    onAbilityBackground(l107: UIAbility): void;
    /**
     * Ignore
     * @param ability
     */
    onAbilityCreate(k107: UIAbility): void;
    /**
     * Ignore
     * @param ability
     * @param windowStage
     */
    onWindowStageCreate(i107: UIAbility, j107: window.WindowStage): void;
    /**
     * Ignore
     * @param ability
     * @param windowStage
     */
    onWindowStageActive(g107: UIAbility, h107: window.WindowStage): void;
    /**
     * Ignore
     * @param ability
     * @param windowStage
     */
    onWindowStageInactive(e107: UIAbility, f107: window.WindowStage): void;
    /**
     * Ignore
     * @param ability
     * @param windowStage
     */
    onWindowStageDestroy(c107: UIAbility, d107: window.WindowStage): void;
    /**
     * Ignore
     * @param ability
     */
    onAbilityDestroy(b107: UIAbility): void;
    /**
     * Ignore
     * @param ability
     */
    onAbilityContinue(a107: UIAbility): void;
}
