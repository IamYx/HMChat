import { BigNumber } from "@nimsdk/vendor";
const MaxUInt32 = Math.pow(2, 32);
export function setBigUint64(v23, w23 = false) {
    const x23 = new Uint8Array(8);
    const y23 = new DataView(x23.buffer);
    const z23 = Number(v23 > MaxUInt32 - 1 ? v23 / MaxUInt32 : 0);
    const a24 = Number(v23 & 0xffffffff);
    const [b24, c24] = w23 ? [4, 0] : [0, 4];
    y23.setUint32(b24, z23, w23);
    y23.setUint32(c24, a24, w23);
    return x23;
}
export function setBigUint64ForNumberOverflow(l23, m23 = false) {
    const n23 = new Uint8Array(8);
    const o23 = new DataView(n23.buffer);
    const p23 = BigNumber(l23).divide(MaxUInt32).number.reverse().join('');
    const q23 = BigNumber(l23).mod(MaxUInt32).number.reverse().join('');
    const r23 = Number(p23);
    const s23 = Number(q23);
    const [t23, u23] = m23 ? [4, 0] : [0, 4];
    o23.setUint32(t23, r23, m23);
    o23.setUint32(u23, s23, m23);
    return n23;
}
export function getBigUint64(e23, f23 = false) {
    const g23 = new DataView(e23.buffer);
    const [h23, i23] = f23 ? [4, 0] : [0, 4];
    const j23 = g23.getUint32(h23, f23);
    const k23 = g23.getUint32(i23, f23);
    return j23 > 0 ? j23 * MaxUInt32 + k23 : k23;
}
export function varintToBytes(z22) {
    const a23 = new Uint8Array(4);
    const b23 = new DataView(a23.buffer);
    let c23 = 0;
    do {
        let d23 = z22 & 0x7f;
        z22 >>>= 7;
        if (z22 > 0) {
            d23 |= 0x80;
        }
        b23.setUint8(c23++, d23);
    } while (z22 > 0);
    return a23.slice(0, c23);
}
export function textEncoder(s22) {
    const t22 = [];
    const u22 = s22.length;
    let v22 = 0;
    while (v22 < u22) {
        const w22 = s22.codePointAt(v22);
        let x22 = 0;
        let y22 = 0;
        if (w22 <= 0x0000007f) {
            x22 = 0;
            y22 = 0x00;
        }
        else if (w22 <= 0x000007ff) {
            x22 = 6;
            y22 = 0xc0;
        }
        else if (w22 <= 0x0000ffff) {
            x22 = 12;
            y22 = 0xe0;
        }
        else if (w22 <= 0x001fffff) {
            x22 = 18;
            y22 = 0xf0;
        }
        t22.push(y22 | (w22 >> x22));
        x22 -= 6;
        while (x22 >= 0) {
            t22.push(0x80 | ((w22 >> x22) & 0x3f));
            x22 -= 6;
        }
        v22 += w22 >= 0x10000 ? 2 : 1;
    }
    return t22;
}
export function encodeText(q22) {
    const r22 = textEncoder(q22);
    return new Uint8Array(r22);
}
export function textDecoder(j22) {
    let k22 = '';
    let l22 = 0;
    while (l22 < j22.length) {
        let m22 = j22[l22];
        let n22 = 0;
        let o22 = 0;
        if (m22 <= 0x7f) {
            n22 = 0;
            o22 = m22 & 0xff;
        }
        else if (m22 <= 0xdf) {
            n22 = 1;
            o22 = m22 & 0x1f;
        }
        else if (m22 <= 0xef) {
            n22 = 2;
            o22 = m22 & 0x0f;
        }
        else if (m22 <= 0xf4) {
            n22 = 3;
            o22 = m22 & 0x07;
        }
        if (j22.length - l22 - n22 > 0) {
            let p22 = 0;
            while (p22 < n22) {
                m22 = j22[l22 + p22 + 1];
                o22 = (o22 << 6) | (m22 & 0x3f);
                p22 += 1;
            }
        }
        else {
            o22 = 0xfffd;
            n22 = j22.length - l22;
        }
        k22 += String.fromCodePoint(o22);
        l22 += n22 + 1;
    }
    return k22;
}
export function decodeText(i22) {
    return textDecoder(i22);
}
