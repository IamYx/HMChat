export default class TimerManager {
    private timerList;
    private id;
    private timer;
    private timeout;
    /**
     * 新增定时器
     * @param loop 循环次数 -1时无限循环，为1将在一次循环后移除这个定时器
     * @param interval 时间间隔
     * @param callback 执行的函数
     */
    addTimer(o26: any, p26?: number, q26?: number): number;
    checkTimer(l26?: number): void;
    nowTime(): void;
    clearTime(): void;
    deleteTimer(g26: number): void;
    removeFinished(): void;
    destroy(): void;
}
