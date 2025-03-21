export class HttpExceptionInterceptor {
    constructor(q63) {
        this.core = q63;
    }
    async intercept(k63, l63) {
        const m63 = k63.request.url.href;
        const n63 = k63.request.method;
        const o63 = l63.handle(k63);
        o63.catch(p63 => {
            this.core.reporterService.addException({
                action: 1,
                code: p63.code,
                description: p63.message,
                operationType: n63 === "POST" ? 1 : 0,
                context: JSON.stringify(k63),
                target: m63
            });
        });
        return o63;
    }
}
