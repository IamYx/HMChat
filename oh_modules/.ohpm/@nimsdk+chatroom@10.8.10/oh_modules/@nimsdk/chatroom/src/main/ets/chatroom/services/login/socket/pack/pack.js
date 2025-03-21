import { encodeText, setBigUint64, setBigUint64ForNumberOverflow, varintToBytes } from './util';
export class Pack {
    constructor() {
        this.offset = 0;
        this.pageSize = 1024;
        this.capacity = 1024 * 1024;
        this.buffer = new Uint8Array(this.pageSize);
        this.view = new DataView(this.buffer.buffer);
    }
    reset() {
        this.offset = 0;
        this.buffer = null;
        this.view = null;
    }
    size() {
        return this.offset;
    }
    getBuffer() {
        const q21 = this.buffer.slice(0, this.offset);
        return q21.buffer;
    }
    ensureCapacity(m21) {
        const n21 = this.offset + m21;
        if (n21 > this.capacity) {
            throw new Error('PackException over limit');
        }
        if (n21 > this.buffer.byteLength) {
            const o21 = Math.ceil(n21 / this.pageSize) * this.pageSize;
            const p21 = new Uint8Array(o21);
            p21.set(this.buffer);
            this.buffer = p21;
            this.view = new DataView(this.buffer.buffer);
        }
    }
    putRaw(k21) {
        this.ensureCapacity(k21.length);
        try {
            this.buffer.set(k21, this.offset);
            this.offset += k21.length;
        }
        catch (l21) {
            throw new Error('PackException raw');
        }
    }
    putByte(i21) {
        this.ensureCapacity(1);
        try {
            this.view.setUint8(this.offset++, i21);
        }
        catch (j21) {
            throw new Error('PackException byte');
        }
    }
    putString(f21) {
        try {
            const h21 = encodeText(f21);
            this.putVarbin(h21);
        }
        catch (g21) {
            throw new Error('PackException string');
        }
    }
    putInt(d21) {
        this.ensureCapacity(4);
        try {
            this.view.setInt32(this.offset, d21, true);
            this.offset += 4;
        }
        catch (e21) {
            throw new Error('PackException int');
        }
    }
    putVarInt(b21) {
        const c21 = varintToBytes(b21);
        this.putRaw(c21);
    }
    putBoolean(z20) {
        this.ensureCapacity(1);
        try {
            this.view.setUint8(this.offset++, z20 ? 1 : 0);
        }
        catch (a21) {
            throw new Error('PackException boolean');
        }
    }
    putLong(w20) {
        this.ensureCapacity(8);
        try {
            const y20 = setBigUint64(w20, true);
            this.buffer.set(y20, this.offset);
            this.offset += 8;
        }
        catch (x20) {
            throw new Error('PackException long');
        }
    }
    putStringAsLong(t20) {
        this.ensureCapacity(8);
        try {
            const v20 = setBigUint64ForNumberOverflow(t20, true);
            this.buffer.set(v20, this.offset);
            this.offset += 8;
        }
        catch (u20) {
            throw new Error('PackException stringAsLong');
        }
    }
    putShort(r20) {
        this.ensureCapacity(2);
        try {
            this.view.setInt16(this.offset, r20, true);
            this.offset += 2;
        }
        catch (s20) {
            throw new Error('PackException short');
        }
    }
    putVarbin(o20) {
        if (!o20) {
            this.ensureCapacity(1);
            return this.putVarInt(0);
        }
        if (o20.byteLength > Math.pow(2, 31) - 2) {
            throw new Error('PackException varbin. too long');
        }
        const p20 = varintToBytes(o20.length);
        this.ensureCapacity(p20.length + o20.length);
        try {
            this.buffer.set(p20, this.offset);
            this.offset += p20.length;
            this.buffer.set(o20, this.offset);
            this.offset += o20.length;
        }
        catch (q20) {
            throw new Error('PackException varbin');
        }
    }
}
