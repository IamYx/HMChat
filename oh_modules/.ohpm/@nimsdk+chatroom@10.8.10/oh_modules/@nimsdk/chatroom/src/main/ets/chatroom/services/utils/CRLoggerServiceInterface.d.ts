export interface CRLoggerServiceInterface {
    write(level: string, label: string, message: string, ...args: any[]): Promise<void>;
}
