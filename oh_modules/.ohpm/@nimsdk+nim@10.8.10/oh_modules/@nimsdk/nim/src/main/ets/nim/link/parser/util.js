import { BigNumber } from "@nimsdk/vendor";
const MaxUInt32 = Math.pow(2, 32);
export function setBigUint64(w72, x72 = false) {
    const y72 = new Uint8Array(8);
    const z72 = new DataView(y72.buffer);
    const a73 = Number(w72 > MaxUInt32 - 1 ? w72 / MaxUInt32 : 0);
    const b73 = Number(w72 & 0xffffffff);
    const [c73, d73] = x72 ? [4, 0] : [0, 4];
    z72.setUint32(c73, a73, x72);
    z72.setUint32(d73, b73, x72);
    return y72;
}
export function setBigUint64ForNumberOverflow(m72, n72 = false) {
    const o72 = new Uint8Array(8);
    const p72 = new DataView(o72.buffer);
    const q72 = BigNumber(m72).divide(MaxUInt32).number.reverse().join('');
    const r72 = BigNumber(m72).mod(MaxUInt32).number.reverse().join('');
    const s72 = Number(q72);
    const t72 = Number(r72);
    const [u72, v72] = n72 ? [4, 0] : [0, 4];
    p72.setUint32(u72, s72, n72);
    p72.setUint32(v72, t72, n72);
    return o72;
}
export function getBigUint64(f72, g72 = false) {
    const h72 = new DataView(f72.buffer);
    const [i72, j72] = g72 ? [4, 0] : [0, 4];
    const k72 = h72.getUint32(i72, g72);
    const l72 = h72.getUint32(j72, g72);
    return k72 > 0 ? k72 * MaxUInt32 + l72 : l72;
}
export function varintToBytes(a72) {
    const b72 = new Uint8Array(4);
    const c72 = new DataView(b72.buffer);
    let d72 = 0;
    do {
        let e72 = a72 & 0x7f;
        a72 >>>= 7;
        if (a72 > 0) {
            e72 |= 0x80;
        }
        c72.setUint8(d72++, e72);
    } while (a72 > 0);
    return b72.slice(0, d72);
}
export function textEncoder(t71) {
    const u71 = [];
    const v71 = t71.length;
    let w71 = 0;
    while (w71 < v71) {
        const x71 = t71.codePointAt(w71);
        let y71 = 0;
        let z71 = 0;
        if (x71 <= 0x0000007f) {
            y71 = 0;
            z71 = 0x00;
        }
        else if (x71 <= 0x000007ff) {
            y71 = 6;
            z71 = 0xc0;
        }
        else if (x71 <= 0x0000ffff) {
            y71 = 12;
            z71 = 0xe0;
        }
        else if (x71 <= 0x001fffff) {
            y71 = 18;
            z71 = 0xf0;
        }
        u71.push(z71 | (x71 >> y71));
        y71 -= 6;
        while (y71 >= 0) {
            u71.push(0x80 | ((x71 >> y71) & 0x3f));
            y71 -= 6;
        }
        w71 += x71 >= 0x10000 ? 2 : 1;
    }
    return u71;
}
export function encodeText(r71) {
    const s71 = textEncoder(r71);
    return new Uint8Array(s71);
}
export function textDecoder(k71) {
    let l71 = '';
    let m71 = 0;
    while (m71 < k71.length) {
        let n71 = k71[m71];
        let o71 = 0;
        let p71 = 0;
        if (n71 <= 0x7f) {
            o71 = 0;
            p71 = n71 & 0xff;
        }
        else if (n71 <= 0xdf) {
            o71 = 1;
            p71 = n71 & 0x1f;
        }
        else if (n71 <= 0xef) {
            o71 = 2;
            p71 = n71 & 0x0f;
        }
        else if (n71 <= 0xf4) {
            o71 = 3;
            p71 = n71 & 0x07;
        }
        if (k71.length - m71 - o71 > 0) {
            let q71 = 0;
            while (q71 < o71) {
                n71 = k71[m71 + q71 + 1];
                p71 = (p71 << 6) | (n71 & 0x3f);
                q71 += 1;
            }
        }
        else {
            p71 = 0xfffd;
            o71 = k71.length - m71;
        }
        l71 += String.fromCodePoint(p71);
        m71 += o71 + 1;
    }
    return l71;
}
export function decodeText(j71) {
    return textDecoder(j71);
}
