export default class Logger {
    private core;
    constructor(w22: any);
    debug(r22?: string, s22?: string, ...t22: any[]): Promise<void>;
    info(m22?: string, n22?: string, ...o22: any[]): Promise<void>;
    warn(h22?: string, i22?: string, ...j22: any[]): Promise<void>;
    error(c22?: string, d22?: string, ...e22: any[]): Promise<void>;
}
