import { ExceptionData, NIM, ReporterEvent } from "@nimsdk/base";
export declare class ExceptionService {
    private core;
    constructor(e100: NIM);
    createEvent(c100: ExceptionData): ReporterEvent;
    private getConnectionProperties;
}
