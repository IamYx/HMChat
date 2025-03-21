import { assignWith, isUndefined } from '@nimsdk/vendor';
export const guid = (function () {
    const k21 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return function () {
        return k21() + k21() + k21() + k21() + k21() + k21() + k21() + k21();
    };
})();
export function getEnumKeys(i21) {
    return Object.keys(i21).filter((j21) => !(+j21 >= 0));
}
export function getEnumValues(f21) {
    return Object.keys(f21)
        .filter((h21) => +h21 >= 0)
        .map((g21) => parseInt(g21));
}
export function getEnumKeyByEnumValue(b21, c21) {
    const d21 = Object.keys(b21).filter((e21) => b21[e21] == c21);
    return d21.length > 0 ? d21[0] : undefined;
}
export function assignOptions(x20, y20) {
    return assignWith({}, x20, y20, function (z20, a21) {
        return isUndefined(a21) ? z20 : a21;
    });
}
export function emptyFuncWithPromise() {
    return Promise.resolve();
}
export function getFileExtension(v20) {
    const w20 = v20.lastIndexOf('.');
    return w20 > -1 ? v20.slice(w20) : '';
}
export function findIndexWithinTargetValue(q20, r20, s20) {
    if (q20.length === 0) {
        return 0;
    }
    if (q20[0][r20] <= s20) {
        return 0;
    }
    if (q20[q20.length - 1][r20] > s20) {
        return q20.length;
    }
    return q20.findIndex((t20, u20) => {
        if (q20[u20 - 1] && q20[u20 - 1][r20] > s20 && s20 >= t20[r20]) {
            return true;
        }
    });
}
