import { LoggerServiceInternal, LogLevel, NIM, NIMEStrAnyObj } from '@nimsdk/base';
export declare class LoggerServiceImpl implements LoggerServiceInternal {
    private static readonly LoggerFileEffectivePeriod;
    logDir: string;
    core: NIM;
    logLevel: LogLevel;
    isOpenConsoleLog: boolean;
    private currentLogPath;
    constructor(q81: NIM, r81?: LogLevel, s81?: boolean);
    write(i81: LogLevel, j81: string, k81: string, ...l81: NIMEStrAnyObj[]): Promise<void>;
    isWriteLog(h81: LogLevel): boolean;
    uploadSDKLogs(f81: boolean): Promise<string>;
    getLogDirectory(): string;
    getLogFilePath(): string;
    checkLoggerEffectivePeriod(y80: string): Promise<void>;
    uploadZipLogFile(r80: boolean): Promise<string>;
    private uploadSendLog;
    private getOutputZipFilePath;
    private formattedDate;
}
