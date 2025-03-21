import { isRegExp, without } from '@nimsdk/vendor';
import { V2NIMErrorCode, V2NIMErrorImpl, ValidateError, ValidateErrorV2 } from './error';
import File from '@system.file';
import { V2NIMLoginStatus } from '../sdk/V2NIMLoginService';
function replacer(p29, q29) {
    if (q29 instanceof RegExp) {
        return '__REGEXP ' + q29.toString();
    }
    else {
        return q29;
    }
}
export function validate(c29, d29 = {}, e29, f29 = true) {
    const g29 = {};
    Object.keys(c29).forEach((h29) => {
        const i29 = c29[h29].type;
        const j29 = e29 ? `In ${e29}, ` : '';
        if (typeof d29 === 'undefined' || d29 === null) {
            const o29 = `${j29}param is null or undefined`;
            throw f29 ? new ValidateErrorV2({
                detail: {
                    reason: o29,
                    data: { key: h29 },
                    rules: 'required'
                }
            })
                : new ValidateError(o29, { key: h29 }, 'required');
        }
        if (typeof d29[h29] === 'undefined') {
            if (c29[h29].required === false) {
                g29[h29] = d29[h29];
                return;
            }
            else {
                const n29 = `${j29}param '${h29}' is required`;
                throw f29 ? new ValidateErrorV2({
                    detail: {
                        reason: n29,
                        data: { key: h29 },
                        rules: 'required'
                    }
                })
                    : new ValidateError(n29, { key: h29 }, 'required');
            }
        }
        const k29 = validateStrategies[i29];
        if (k29 && !k29(d29, h29, c29[h29], f29)) {
            const l29 = `${j29}param '${h29}' unexpected`;
            const m29 = { key: h29, value: d29[h29] };
            throw f29 ? new ValidateErrorV2({
                detail: {
                    reason: l29,
                    data: m29,
                    rules: JSON.stringify(c29[h29], replacer)
                }
            })
                : new ValidateError(l29, m29, JSON.stringify(c29[h29], replacer));
        }
        else {
            g29[h29] = d29[h29];
        }
    });
    return g29;
}
const validateStrategies = {
    string: function (u28, v28, w28) {
        const { allowEmpty: x28, max: y28, min: z28, regExp: a29 } = w28;
        const b29 = u28[v28];
        if (typeof b29 !== 'string') {
            return false;
        }
        if (x28 === false && b29 === '') {
            return false;
        }
        if (typeof y28 === 'number' && b29.length > y28) {
            return false;
        }
        if (typeof z28 === 'number' && b29.length < z28) {
            return false;
        }
        if (isRegExp(a29) && !a29.test(b29)) {
            return false;
        }
        return true;
    },
    number: function (o28, p28, q28) {
        const { min: r28, max: s28 } = q28;
        const t28 = o28[p28];
        if (typeof t28 !== 'number') {
            return false;
        }
        if (typeof r28 === 'number' && t28 < r28) {
            return false;
        }
        if (typeof s28 === 'number' && t28 > s28) {
            return false;
        }
        return true;
    },
    boolean: function (l28, m28) {
        const n28 = l28[m28];
        return typeof n28 === 'boolean';
    },
    file: function (i28, j28) {
        const k28 = i28[j28];
        return k28 instanceof File;
    },
    enum: function (d28, e28, f28) {
        const { values: g28 } = f28;
        const h28 = d28[e28];
        if (g28) {
            return g28.indexOf(h28) > -1;
        }
        return true;
    },
    jsonstr: function (z27, a28) {
        try {
            const c28 = JSON.parse(z27[a28]);
            return typeof c28 === 'object' && c28 !== null;
        }
        catch (b28) {
            return false;
        }
    },
    stringObject: function (v27, w27) {
        try {
            const y27 = v27[w27];
            return typeof y27 == 'string' || y27 == null;
        }
        catch (x27) {
            return false;
        }
    },
    func: function (s27, t27) {
        const u27 = s27[t27];
        return typeof u27 === 'function';
    },
    array: function (f27, g27, h27, i27 = false) {
        const { itemType: j27, rules: k27, min: l27, max: m27, values: n27 } = h27;
        const o27 = f27[g27];
        if (!Array.isArray(o27)) {
            return false;
        }
        if (typeof m27 === 'number' && o27.length > m27) {
            return false;
        }
        if (typeof l27 === 'number' && o27.length < l27) {
            return false;
        }
        if (j27 && j27 !== 'enum' && !o27.every((r27) => typeof r27 === j27)) {
            return false;
        }
        if (j27 === 'enum' && n27 && without(o27, ...n27).length) {
            return false;
        }
        if (k27) {
            o27.forEach((p27, q27) => validate(k27, p27, `${g27}[${q27}]`, i27));
        }
        return true;
    },
    object: function (z26, a27, b27, c27 = false) {
        const { rules: d27 } = b27;
        const e27 = z26[a27];
        if (typeof e27 !== 'object' || e27 === null) {
            return false;
        }
        if (d27) {
            validate(d27, e27, a27, c27);
        }
        return true;
    }
};
export function validateConversationId(v26, w26) {
    if (!v26) {
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE
        });
    }
    const x26 = w26.split('|');
    x26.forEach(y26 => {
        validate({ sub: { type: 'string', allowEmpty: false } }, { sub: y26 }, '', true);
    });
    validate({ conversationId: { type: 'string', allowEmpty: false, regExp: new RegExp(`^${v26}\\|[1-3]\\|`) } }, { conversationId: w26 }, '', true);
}
export function verifyLoginStatus(t26) {
    const u26 = t26.loginService.getLoginStatus();
    if (u26 !== V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED) {
        throw new V2NIMErrorImpl({
            code: V2NIMErrorCode.V2NIM_ERROR_CODE_ILLEGAL_STATE,
            detail: {
                reason: 'Blocked due to not logged in'
            }
        });
    }
}
