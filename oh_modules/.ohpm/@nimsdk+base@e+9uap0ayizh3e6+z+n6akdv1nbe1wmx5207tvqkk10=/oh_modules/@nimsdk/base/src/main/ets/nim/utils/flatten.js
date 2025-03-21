export function flattenObj(q16) {
    const r16 = {};
    if (typeof q16 !== 'object' || q16 === null || Array.isArray(q16)) {
        return q16;
    }
    for (const s16 in q16) {
        if (typeof q16[s16] === 'object' && q16[s16] !== null && !Array.isArray(q16[s16])) {
            const t16 = flattenObj(q16[s16]);
            for (const u16 in t16) {
                r16[s16 + '.' + u16] = t16[u16];
            }
        }
        else {
            r16[s16] = q16[s16];
        }
    }
    return r16;
}
export function unflattenObj(j16) {
    const k16 = {};
    for (const l16 in j16) {
        const m16 = l16.split('.');
        m16.reduce(function (n16, o16, p16) {
            return n16[o16] || (n16[o16] = isNaN(Number(m16[p16 + 1])) ? (m16.length - 1 == p16 ? j16[l16] : {}) : []);
        }, k16);
    }
    return k16;
}
