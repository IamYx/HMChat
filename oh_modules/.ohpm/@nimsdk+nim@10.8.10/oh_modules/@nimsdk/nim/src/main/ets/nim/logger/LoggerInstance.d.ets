import { taskpool } from '@kit.ArkTS';
import { LogLevel, NIMEStrAnyObj } from '@nimsdk/base';
export declare class LoggerInstance {
    private static instance;
    sequenceRunner: taskpool.SequenceRunner;
    private constructor();
    static getInstance(): LoggerInstance;
    write(j79: string, k79: string, l79: boolean, m79: LogLevel, n79: string, o79: string, ...p79: NIMEStrAnyObj[]): Promise<void>;
    /**
     * Format date time
     * @returns
     */
    private getDateStr;
}
