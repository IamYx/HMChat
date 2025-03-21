import { isUndefined } from '@nimsdk/vendor';
import { genCmdError, V2NIMErrorCode, V2NIMErrorImpl } from './utils/error';
import { unflattenObj } from './utils/flatten';
const TAG = '[Parser]';
export let cmdConfig = {};
export const notiCmdMap = {};
export function createCmd(x14, y14, z14, a15) {
    const b15 = cmdConfig[x14];
    z14.info(TAG, 'create cmd', x14, b15.sid, b15.cid);
    if (!b15) {
        z14.error(TAG, 'createCmd:: can not find cmd config', x14);
        return null;
    }
    const c15 = {
        SER: y14,
        SID: b15.sid,
        CID: b15.cid,
        Q: []
    };
    if (b15.params && a15) {
        b15.params.forEach(function (d15) {
            let e15 = a15[d15.name];
            if (e15 === undefined || e15 === null) {
                return;
            }
            let f15 = d15.type;
            const { reflectMapper: g15, select: h15 } = d15;
            switch (d15.type) {
                case 'PropertyArray':
                    f15 = 'ArrayMable';
                    e15 = e15.map((i15) => {
                        return {
                            t: 'Property',
                            v: g15 ? serialize(i15, g15, h15) : i15
                        };
                    });
                    break;
                case 'Property':
                    e15 = g15 ? serialize(e15, g15, h15) : e15;
                    break;
                case 'Bool':
                    e15 = e15 ? 'true' : 'false';
                    break;
                default:
                    break;
            }
            c15.Q.push({ t: f15, v: e15 });
        });
    }
    return {
        packet: c15,
        hasPacketResponse: typeof b15.hasPacketResponse === 'boolean' ? b15.hasPacketResponse : true,
        hasPacketTimer: typeof b15.hasPacketTimer === 'boolean' ? b15.hasPacketTimer : true
    };
}
export function parseCmd(m14, n14) {
    let o14 = undefined;
    try {
        o14 = m14;
    }
    catch (w14) {
        n14 ? n14.error(TAG, 'parseCmd', m14, w14)
            : console.error(TAG, 'parseCmd', m14, w14);
        return undefined;
    }
    let p14 = o14.sid + '_' + o14.cid;
    let q14 = o14.r;
    if (['4_1', '4_2', '4_10', '4_11'].includes(p14)) {
        const v14 = o14.r[1].headerPacket;
        p14 = `${v14.sid}_${v14.cid}`;
        o14.sid = v14.sid;
        o14.cid = v14.cid;
        q14 = o14.r[1].body;
    }
    const r14 = notiCmdMap[p14];
    const s14 = [];
    if (!r14) {
        n14.warn(TAG, 'parseCmd !configArray data', m14);
        return undefined;
    }
    for (const t14 of r14) {
        const u14 = parseEachCmd(o14, t14.config, t14.cmd, q14, n14);
        if (u14) {
            s14.push(u14);
        }
    }
    return s14;
}
function parseEachCmd(y13, z13, a14, b14, c14) {
    const d14 = {
        cmd: a14,
        raw: y13,
        error: null,
        service: z13?.service,
        content: {},
        __receiveTime: Date.now()
    };
    if (typeof y13.priority === 'number') {
        d14.priority = y13.priority;
    }
    if (!(a14 && z13)) {
        d14.notFound = true;
        return d14;
    }
    y13.code = toReadableCode(y13.code);
    const e14 = genCmdError(y13.code, a14);
    d14.error = e14;
    if (d14.error) {
        d14.error.detail.cmd = a14;
        if (z13?.ignoreErrCodes?.includes(y13.code)) {
            c14.warn(TAG, 'parseEachCmd ignore error', d14.error);
            d14.error.detail.ignore = true;
        }
        else {
            return d14;
        }
    }
    if (z13.response) {
        z13.response.forEach((f14, g14) => {
            const h14 = b14[g14];
            const i14 = f14.type;
            const j14 = f14.name;
            const k14 = f14.reflectMapper;
            if (isUndefined(h14)) {
                return undefined;
            }
            switch (i14) {
                case 'Property':
                    d14.content[j14] = k14 ? deserialize(h14, k14) : h14;
                    break;
                case 'PropertyArray':
                    d14.content[j14] = h14.map((l14) => {
                        return k14 ? deserialize(l14, k14) : l14;
                    });
                    break;
                case 'Int':
                case 'Long':
                case 'Byte':
                    d14.content[j14] = +h14;
                    break;
                case 'Bool':
                    d14.content[j14] = h14 === 'true' || h14 === true || h14 === 1 ? true : false;
                    break;
                case 'KVArray':
                default:
                    d14.content[j14] = h14;
                    break;
            }
        });
    }
    return d14;
}
export function toReadableCode(v13) {
    if (typeof v13 !== 'number') {
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_INTERNAL,
            detail: {
                reason: 'Read code failed',
                rawData: v13
            }
        });
    }
    if (v13 >= 0 && v13 < 1000) {
        return v13;
    }
    if (v13 >= 20000 && v13 <= 20099) {
        return v13;
    }
    let w13 = (v13 & 0x0000ffff) >> 9;
    if (w13 <= 38) {
        w13 = w13 - 1;
    }
    else {
        w13 = w13 - 2;
    }
    const x13 = v13 & 0x1ff;
    return 100000 + w13 * 1000 + x13;
}
export function serialize(o13, p13, q13) {
    const r13 = {};
    o13 = flattenObjByMapper(o13, p13);
    for (const s13 in p13) {
        const t13 = p13[s13];
        const u13 = typeof t13 === 'number' ? s13 : t13.access ? t13.access : s13;
        if (q13 && !q13.includes(s13)) {
            continue;
        }
        if (u13 in o13) {
            if (typeof t13 === 'number') {
                r13[t13] = o13[u13];
            }
            else if (typeof t13 === 'object') {
                if (t13.converter) {
                    r13[t13.id] = t13.converter(o13[u13], o13);
                }
                else {
                    r13[t13.id] = o13[u13];
                }
            }
        }
        else if (typeof t13 === 'object' && t13.def) {
            if (typeof t13.def === 'function') {
                r13[t13.id] = t13.def(o13);
            }
            else {
                r13[t13.id] = t13.def;
            }
        }
    }
    return r13;
}
export function deserialize(f13, g13) {
    let h13 = {};
    for (const l13 in f13) {
        const m13 = g13[l13];
        if (typeof m13 === 'string') {
            h13[m13] = f13[l13];
        }
        else if (typeof m13 === 'object' && 'prop' in m13) {
            const n13 = m13.access ? m13.access : m13.prop;
            if (m13.converter) {
                h13[n13] = m13.converter(f13[l13], f13);
            }
            else if (m13.type && m13.type === 'number') {
                h13[n13] = +f13[l13];
            }
            else if (m13.type && m13.type === 'boolean') {
                h13[n13] = f13[l13] === '0' || !f13[l13] ? false : true;
            }
            else {
                h13[n13] = f13[l13];
            }
        }
    }
    for (const i13 in g13) {
        const j13 = g13[i13];
        if (j13 && typeof j13.def !== 'undefined') {
            const k13 = j13.access ? j13.access : j13.prop;
            if (!(k13 in h13)) {
                if (typeof j13.def === 'function') {
                    h13[k13] = j13.def(f13);
                }
                else {
                    h13[k13] = j13.def;
                }
            }
        }
    }
    h13 = unflattenObj(h13);
    return h13;
}
export function registerParser(y12, z12) {
    cmdConfig = Object.assign(cmdConfig, z12.cmdConfig);
    for (const a13 in z12.cmdMap) {
        const b13 = z12.cmdMap[a13];
        const c13 = z12.cmdConfig[b13];
        if (c13) {
            if (Array.isArray(notiCmdMap[a13])) {
                let d13 = false;
                for (const e13 of notiCmdMap[a13]) {
                    if (e13.cmd === b13 && e13.config.service === c13.service) {
                        d13 = true;
                        break;
                    }
                }
                if (!d13) {
                    notiCmdMap[a13].push({
                        config: c13,
                        cmd: b13
                    });
                }
            }
            else {
                notiCmdMap[a13] = [
                    {
                        config: c13,
                        cmd: b13
                    }
                ];
            }
        }
    }
}
export function invertSerializeMap(v12) {
    const w12 = {};
    Object.keys(v12).forEach((x12) => {
        w12[x12] = invertSerializeItem(v12[x12]);
    });
    return w12;
}
export function invertSerializeItem(r12) {
    const s12 = {};
    for (const t12 in r12) {
        const u12 = r12[t12];
        if (typeof u12 === 'number') {
            s12[u12] = t12;
        }
        else if (typeof u12 === 'object') {
            s12[u12.id] = {
                prop: t12,
                type: u12.retType,
                access: u12.retAccess ? u12.retAccess : u12.access ? u12.access : t12,
                def: u12.retDef,
                converter: u12.retConverter
            };
        }
    }
    return s12;
}
export function boolToInt(q12) {
    return q12 ? 1 : 0;
}
export function objectToJSONString(p12) {
    if (!(p12 && typeof p12 === 'object')) {
        return;
    }
    try {
        return JSON.stringify(p12);
    }
    catch {
        return;
    }
}
export function stringToJSONObject(o12) {
    if (!(o12 && typeof o12 === 'string')) {
        return;
    }
    try {
        return JSON.parse(o12);
    }
    catch {
        return;
    }
}
function flattenObjByMapper(f12, g12) {
    const h12 = {};
    for (const i12 in g12) {
        const j12 = g12[i12];
        const k12 = typeof j12 === 'number' ? i12 : j12.access ? j12.access : i12;
        const l12 = k12.split('.');
        let m12 = f12;
        for (const n12 of l12) {
            if (m12[n12] === undefined || m12[n12] === null) {
                m12 = undefined;
                break;
            }
            m12 = m12[n12];
        }
        if (m12 !== undefined) {
            h12[k12] = m12;
        }
    }
    return h12;
}
