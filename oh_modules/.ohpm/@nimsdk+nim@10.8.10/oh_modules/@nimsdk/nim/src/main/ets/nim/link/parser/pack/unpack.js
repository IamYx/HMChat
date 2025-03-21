import { decodeText, getBigUint64 } from '../util';
export class Unpack {
    constructor(i71) {
        this.offset = 0;
        this.buffer = new Uint8Array(i71);
        this.view = new DataView(i71);
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
    popRaw(f71) {
        try {
            const h71 = this.buffer.slice(this.offset, this.offset + f71);
            this.offset += f71;
            return h71;
        }
        catch (g71) {
            throw new Error('UnpackException raw');
        }
    }
    popByte() {
        try {
            const e71 = this.view.getUint8(this.offset);
            this.offset += 1;
            return e71;
        }
        catch (d71) {
            throw new Error('UnpackException byte');
        }
    }
    popVarbin() {
        return this.popRaw(this.popVarInt());
    }
    popString() {
        try {
            const c71 = this.popVarbin();
            return decodeText(c71);
        }
        catch (b71) {
            throw new Error('UnpackException string');
        }
    }
    popInt() {
        try {
            const a71 = this.view.getUint32(this.offset, true);
            this.offset += 4;
            return a71;
        }
        catch (z70) {
            throw new Error('UnpackException int');
        }
    }
    popVarInt() {
        let w70 = 0;
        let x70 = 0;
        let y70 = 0;
        while (((y70 = this.popByte()) & 0x80) !== 0) {
            w70 |= (y70 & 0x7F) << x70;
            x70 += 7;
            if (x70 > 35) {
                throw new Error('Variable length quantity is too long');
            }
        }
        return w70 | (y70 << x70);
    }
    popLong() {
        try {
            const v70 = getBigUint64(this.buffer.slice(this.offset, this.offset + 8), true);
            this.offset += 8;
            return Number(v70);
        }
        catch (u70) {
            throw new Error('UnpackException long');
        }
    }
    popShort() {
        try {
            const t70 = this.view.getUint16(this.offset, true);
            this.offset += 2;
            return t70;
        }
        catch (s70) {
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
