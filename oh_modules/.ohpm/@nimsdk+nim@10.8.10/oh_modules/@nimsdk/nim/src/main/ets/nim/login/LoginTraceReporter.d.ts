import { LoginTraceStep, NIM, ReportEventExtension } from '@nimsdk/base';
export declare class LoginTraceReporter {
    private core;
    private startTime?;
    private linkStartTime?;
    private target?;
    private linkExtension;
    constructor(t83: NIM);
    loginTrace(l83: LoginTraceStep, m83?: string, n83?: string): void;
    createLinkExtensionEvent(e83: number, f83: string, g83: boolean, h83: string, i83: string): void;
    createLoginExtensionEvent(x82: number, y82: string, z82: boolean, a83: string, b83: string): ReportEventExtension;
    reportLinkFailedEvent(q82: number, r82: string, s82: string, t82?: string): void;
    reportLoginEvent(h82: number, i82: string, j82: boolean, k82: string, l82: string, m82?: string): void;
    descriptionSpliceNet(g82: string): string;
}
