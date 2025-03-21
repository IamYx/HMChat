import { decodeText, getBigUint64 } from './util';
export class Unpack {
    constructor(h22) {
        this.offset = 0;
        this.buffer = new Uint8Array(h22);
        this.view = new DataView(h22);
    }
    checkBufferBoundaryAccess() {
        return this.offset >= this.buffer.byteLength;
    }
    length() {
        return this.view?.byteLength || 0;
    }
    getBuffer() {
        return this.view.buffer;
    }
    popRaw(e22) {
        try {
            const g22 = this.buffer.slice(this.offset, this.offset + e22);
            this.offset += e22;
            return g22;
        }
        catch (f22) {
            throw new Error('UnpackException raw');
        }
    }
    popByte() {
        try {
            const d22 = this.view.getUint8(this.offset);
            this.offset += 1;
            return d22;
        }
        catch (c22) {
            throw new Error('UnpackException byte');
        }
    }
    popVarbin() {
        return this.popRaw(this.popVarInt());
    }
    popString() {
        try {
            const b22 = this.popVarbin();
            return decodeText(b22);
        }
        catch (a22) {
            throw new Error('UnpackException string');
        }
    }
    popInt() {
        try {
            const z21 = this.view.getUint32(this.offset, true);
            this.offset += 4;
            return z21;
        }
        catch (y21) {
            throw new Error('UnpackException int');
        }
    }
    popVarInt() {
        let v21 = 0;
        let w21 = 0;
        let x21 = 0;
        while (((x21 = this.popByte()) & 0x80) !== 0) {
            v21 |= (x21 & 0x7F) << w21;
            w21 += 7;
            if (w21 > 35) {
                throw new Error('Variable length quantity is too long');
            }
        }
        return v21 | (x21 << w21);
    }
    popLong() {
        try {
            const u21 = getBigUint64(this.buffer.slice(this.offset, this.offset + 8), true);
            this.offset += 8;
            return Number(u21);
        }
        catch (t21) {
            throw new Error('UnpackException long');
        }
    }
    popShort() {
        try {
            const s21 = this.view.getUint16(this.offset, true);
            this.offset += 2;
            return s21;
        }
        catch (r21) {
            throw new Error('UnpackException short');
        }
    }
    popBoolean() {
        return this.popByte() > 0;
    }
    toString() {
        return Array.from(new Uint8Array(this.buffer)).toString();
    }
    reset() {
        this.offset = 0;
        this.buffer = null;
        this.view = null;
    }
}
