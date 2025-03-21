import { FrequencyServiceInternal, NIM, NIMEBaseListener, NIMServiceConfig, NIMServiceName, V2Service } from '@nimsdk/base';
export declare class FrequencyServiceImpl extends V2Service<NIMEBaseListener> implements FrequencyServiceInternal {
    private frequencyMap;
    constructor(h55: NIM, i55: NIMServiceName, j55: NIMServiceConfig);
    onLoginStart(g55: string): Promise<void>;
    onLoginFinished(f55: string): Promise<void>;
    onLogout(): void | Promise<void>;
    /**
     * 添加禁止指令
     * @param cmd 指令名称
     * @param durationSeconds 禁止持续时间（秒）
     */
    addForbidden(b55: string, c55: number): void;
    /**
     * 检查指令是否被禁止
     * @param cmd 待检查的指令名称
     * @returns 是否处于禁止期
     */
    isForbidden(y54: string): boolean;
    /** 验证指令有效性 */
    private isValidCommand;
    /** 验证持续时间有效性 */
    private isValidDuration;
}
