export default interface LoggerServiceInternal {
    write(level: string, label: string, message: string, ...args: any[]): Promise<void>;
    uploadSDKLogs(isActive: boolean): Promise<string>;
    getLogDirectory(): string;
    getLogFilePath(): string;
}
