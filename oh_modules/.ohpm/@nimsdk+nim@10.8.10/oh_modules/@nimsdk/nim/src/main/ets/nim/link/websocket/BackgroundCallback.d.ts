import { AbilityLifecycleCallback, UIAbility } from "@kit.AbilityKit";
import { V2ClientSocketImpl } from "./V2ClientSocketImpl";
export declare class BackgroundCallback extends AbilityLifecycleCallback {
    clientSocket: V2ClientSocketImpl;
    constructor(g73: V2ClientSocketImpl);
    /**
     * Send foreground status
     * @param ability
     */
    onAbilityForeground(f73: UIAbility): void;
    /**
     * Send background status
     * @param ability
     */
    onAbilityBackground(e73: UIAbility): void;
}
