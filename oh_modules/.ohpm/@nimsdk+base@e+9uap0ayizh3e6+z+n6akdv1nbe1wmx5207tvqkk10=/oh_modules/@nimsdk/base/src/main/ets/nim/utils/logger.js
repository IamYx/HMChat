export default class Logger {
    constructor(w22) {
        this.core = w22;
    }
    async debug(r22, s22, ...t22) {
        try {
            r22 = r22 ? r22 : 'Debug';
            s22 = s22 ? s22 : 'logMessage';
            const v22 = 'Debug';
            this.core.loggerService.write(v22, r22, s22, t22);
        }
        catch (u22) {
            this.core.loggerService.write('Error', r22, 'debug', 'write error');
        }
    }
    async info(m22, n22, ...o22) {
        try {
            m22 = m22 ? m22 : 'Info';
            n22 = n22 ? n22 : 'logMessage';
            const q22 = 'Info';
            this.core.loggerService.write(q22, m22, n22, o22);
        }
        catch (p22) {
            this.core.loggerService.write('Error', m22, 'debug', 'write error');
        }
    }
    async warn(h22, i22, ...j22) {
        try {
            h22 = h22 ? h22 : 'Warn';
            i22 = i22 ? i22 : 'logMessage';
            const l22 = 'Warn';
            this.core.loggerService.write(l22, h22, i22, j22);
        }
        catch (k22) {
            this.core.loggerService.write('Error', h22, 'debug', 'write error');
        }
    }
    async error(c22, d22, ...e22) {
        try {
            c22 = c22 ? c22 : 'Error';
            d22 = d22 ? d22 : 'logMessage';
            const g22 = 'Error';
            this.core.loggerService.write(g22, c22, d22, e22);
        }
        catch (f22) {
            this.core.loggerService.write('Error', c22, 'debug', 'write error');
        }
    }
}
