import { isPlainObject } from '@nimsdk/vendor';
import { V2NIMMessageType } from '../sdk/V2NIMMessageService';
export function format(m20, n20) {
    if (!isPlainObject(n20)) {
        return {};
    }
    const o20 = JSON.parse(JSON.stringify(n20));
    const p20 = doFormat(m20, o20);
    return JSON.parse(JSON.stringify({
        ...o20,
        ...p20
    }));
}
export function doFormat(b20, c20) {
    if (!isPlainObject(c20)) {
        return {};
    }
    const d20 = {};
    const e20 = Object.keys(b20);
    e20.forEach((f20) => {
        const g20 = b20[f20].type;
        const h20 = typeof g20 === 'string' ? false : true;
        if (h20) {
            const l20 = doFormat(b20[f20], c20);
            if (Object.keys(l20).length > 0) {
                d20[f20] = l20;
            }
            return;
        }
        const i20 = b20[f20];
        const j20 = i20.rawKey || f20;
        const k20 = stategies[g20](c20, j20, i20);
        if (typeof k20 !== 'undefined') {
            c20[j20] = undefined;
            d20[f20] = k20;
        }
    });
    return d20;
}
const stategies = {
    number: function (z19, a20) {
        if (typeof z19[a20] !== 'undefined') {
            return +z19[a20];
        }
    },
    string: function (x19, y19) {
        if (typeof x19[y19] !== 'undefined') {
            return x19[y19];
        }
    },
    boolean: function (v19, w19) {
        if (+v19[w19] > 0) {
            return true;
        }
        else if (+v19[w19] === 0) {
            return false;
        }
    },
    enum: function (r19, s19, t19) {
        const u19 = t19.values;
        return u19[r19[s19]];
    },
    object: function (o19, p19) {
        if (typeof o19[p19] !== 'undefined') {
            try {
                return JSON.parse(o19[p19]);
            }
            catch (q19) {
                return {};
            }
        }
    }
};
export const formatStategies = stategies;
export function formatReverse(k19, l19) {
    if (!isPlainObject(l19)) {
        return {};
    }
    const m19 = JSON.parse(JSON.stringify(l19));
    const n19 = doFormatReverse(k19, m19);
    return JSON.parse(JSON.stringify({
        ...m19,
        ...n19
    }));
}
function doFormatReverse(w18, x18) {
    if (!isPlainObject(x18)) {
        return Object.keys(w18).reduce((h19, i19) => {
            const j19 = w18[i19].rawKey || i19;
            h19[j19] = undefined;
            return h19;
        }, {});
    }
    const y18 = {};
    const z18 = Object.keys(w18);
    z18.forEach((a19) => {
        const b19 = w18[a19].type;
        const c19 = typeof b19 === 'string' ? false : true;
        if (c19) {
            const g19 = doFormatReverse(w18[a19], x18[a19]);
            Object.assign(y18, g19);
            x18[a19] = undefined;
            return;
        }
        const d19 = w18[a19];
        const e19 = d19.rawKey || a19;
        const f19 = stategiesReverse[b19](x18, a19, d19);
        x18[e19] = undefined;
        y18[e19] = f19;
    });
    return y18;
}
const stategiesReverse = {
    number: function (u18, v18) {
        return u18[v18];
    },
    string: function (s18, t18) {
        return s18[t18];
    },
    boolean: function (q18, r18) {
        if (q18[r18] === true)
            return 1;
        else if (q18[r18] === false)
            return 0;
    },
    enum: function (m18, n18, o18) {
        const p18 = o18.values;
        return p18[m18[n18]];
    },
    object: function (j18, k18) {
        if (typeof j18[k18] !== 'undefined') {
            try {
                return JSON.stringify(j18[k18]);
            }
            catch (l18) {
                return '';
            }
        }
    }
};
export const formatReverseStategies = stategiesReverse;
export function chatroomAttachmentToRaw(h18, i18) {
    if (!i18)
        return '';
    switch (h18) {
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM:
            return i18.raw || '';
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE:
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO:
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO:
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE:
            return mediaAttachmentToRaw(i18);
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION:
            return locationAttachmentToRaw(i18);
        case V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL:
            return callAttachmentToRaw(i18);
        default:
            if (typeof i18 === 'string') {
                return i18;
            }
            if (typeof i18 === 'string') {
                return i18;
            }
            return JSON.stringify(i18);
    }
}
function mediaAttachmentToRaw(s17) {
    const { width: t17, height: u17, duration: v17, path: w17, file: x17, raw: y17, ctx: z17, payload: a18, bucketName: b18, objectName: c18, token: d18, ext: e18, ...f18 } = s17;
    const g18 = typeof e18 === 'string' && e18[0] === '.' ? e18.slice(1) : e18;
    return JSON.stringify({
        ...f18,
        ...(typeof e18 === 'undefined' ? {} : { ext: g18 }),
        ...(typeof t17 === 'undefined' ? {} : { w: t17 }),
        ...(typeof u17 === 'undefined' ? {} : { h: u17 }),
        ...(typeof v17 === 'undefined' ? {} : { dur: v17 })
    });
}
function locationAttachmentToRaw(r17) {
    return JSON.stringify({
        lat: r17.latitude,
        lng: r17.longitude,
        title: r17.address
    });
}
function callAttachmentToRaw(m17) {
    const { raw: n17, ...o17 } = m17;
    try {
        return JSON.stringify({
            ...o17,
            durations: m17.durations.map((q17) => {
                return {
                    accid: q17.accountId,
                    duration: q17.duration
                };
            })
        });
    }
    catch (p17) {
        return JSON.stringify(m17);
    }
}
export function chatroomRawToAttachment(i17, j17) {
    let k17;
    try {
        k17 = JSON.parse(i17);
        switch (j17) {
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM:
                return { raw: i17 };
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION:
                return locationRawToAttachment(i17, k17);
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO:
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO:
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE:
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE:
                return mediaRawToAttachment(i17, k17);
            case V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL:
                return callRawToAttachment(i17, k17);
            default:
                if (typeof k17 === 'object' && k17) {
                    return {
                        ...k17,
                        raw: i17
                    };
                }
                else {
                    return {
                        raw: i17
                    };
                }
        }
    }
    catch (l17) {
        if (typeof k17 === 'object' && k17) {
            return {
                ...k17,
                raw: i17
            };
        }
        else {
            return {
                raw: i17
            };
        }
    }
}
function locationRawToAttachment(g17, h17) {
    return {
        latitude: h17.lat,
        longitude: h17.lng,
        address: h17.title,
        raw: g17
    };
}
function mediaRawToAttachment(y16, z16) {
    const { w: a17, h: b17, dur: c17, ext: d17, ...e17 } = z16;
    const f17 = typeof d17 === 'string' && d17[0] !== '.' ? `.${d17}` : d17;
    return {
        ...e17,
        ...(typeof d17 === 'undefined' ? {} : { ext: f17 }),
        ...(typeof a17 === 'undefined' ? {} : { width: a17 }),
        ...(typeof b17 === 'undefined' ? {} : { height: b17 }),
        ...(typeof c17 === 'undefined' ? {} : { duration: c17 }),
        raw: y16
    };
}
function callRawToAttachment(v16, w16) {
    return {
        ...w16,
        durations: w16.durations.map((x16) => {
            return {
                accountId: x16.accid,
                duration: x16.duration
            };
        }),
        raw: v16
    };
}
