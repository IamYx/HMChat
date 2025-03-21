import { NIMEStrAnyObj } from '@nimsdk/base';
import { taskpool, Stack } from '@kit.ArkTS';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import { CRLoggerServiceInterface } from './CRLoggerServiceInterface';
export declare class LoggerServiceImpl implements CRLoggerServiceInterface {
    loggerTaskStack: Stack<taskpool.Task>;
    private static readonly LoggerFileEffectivePeriod;
    logDir: string;
    core: V2NIMChatroomClient;
    constructor(t45: V2NIMChatroomClient);
    write(e45: string, f45: string, g45: string, ...h45: NIMEStrAnyObj[]): Promise<void>;
    checkLoggerEffectivePeriod(x44: string): Promise<void>;
    uploadZipLogFile(): Promise<void>;
    private uploadSendLog;
    private getOutputZipFilePath;
    private getLogFilePath;
    private formattedDate;
}
