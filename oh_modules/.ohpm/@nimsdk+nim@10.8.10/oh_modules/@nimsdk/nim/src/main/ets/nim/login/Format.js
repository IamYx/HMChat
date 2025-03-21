import { format } from '@nimsdk/base/';
import { pick, uniqBy } from '@nimsdk/vendor';
export function formatLoginInfo(e82) {
    const f82 = {
        type: { type: 'number' },
        port: { type: 'number' },
        customClientType: { type: 'number' },
        timetag: { type: 'number' },
        loginType: { type: 'number' },
        consid: { type: 'string' },
        hasTokenPreviously: { type: 'number' }
    };
    return format(f82, e82);
}
export function formatBeKickedTag(c82) {
    const d82 = format({
        reason: { type: 'number' },
        clientType: { type: 'number' },
        customClientType: { type: 'number' }
    }, c82);
    return d82;
}
export function getLoginClients(a82) {
    return uniqBy(a82, 'clientId').map((b82) => {
        return pick(b82, ['type', 'os', 'timestamp', 'customTag', 'customClientType', 'clientId', 'clientIP', 'loginType']);
    });
}
