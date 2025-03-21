import { encodeText, setBigUint64, setBigUint64ForNumberOverflow, varintToBytes } from '../util';
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
        const r70 = this.buffer.slice(0, this.offset);
        return r70.buffer;
    }
    ensureCapacity(n70) {
        const o70 = this.offset + n70;
        if (o70 > this.capacity) {
            throw new Error('PackException over limit');
        }
        if (o70 > this.buffer.byteLength) {
            const p70 = Math.ceil(o70 / this.pageSize) * this.pageSize;
            const q70 = new Uint8Array(p70);
            q70.set(this.buffer);
            this.buffer = q70;
            this.view = new DataView(this.buffer.buffer);
        }
    }
    putRaw(l70) {
        this.ensureCapacity(l70.length);
        try {
            this.buffer.set(l70, this.offset);
            this.offset += l70.length;
        }
        catch (m70) {
            throw new Error('PackException raw');
        }
    }
    putByte(j70) {
        this.ensureCapacity(1);
        try {
            this.view.setUint8(this.offset++, j70);
        }
        catch (k70) {
            throw new Error('PackException byte');
        }
    }
    putString(g70) {
        try {
            const i70 = encodeText(g70);
            this.putVarbin(i70);
        }
        catch (h70) {
            throw new Error('PackException string');
        }
    }
    putInt(e70) {
        this.ensureCapacity(4);
        try {
            this.view.setInt32(this.offset, e70, true);
            this.offset += 4;
        }
        catch (f70) {
            throw new Error('PackException int');
        }
    }
    putVarInt(c70) {
        const d70 = varintToBytes(c70);
        this.putRaw(d70);
    }
    putBoolean(a70) {
        this.ensureCapacity(1);
        try {
            this.view.setUint8(this.offset++, a70 ? 1 : 0);
        }
        catch (b70) {
            throw new Error('PackException boolean');
        }
    }
    putLong(x69) {
        this.ensureCapacity(8);
        try {
            const z69 = setBigUint64(x69, true);
            this.buffer.set(z69, this.offset);
            this.offset += 8;
        }
        catch (y69) {
            throw new Error('PackException long');
        }
    }
    putStringAsLong(u69) {
        this.ensureCapacity(8);
        try {
            const w69 = setBigUint64ForNumberOverflow(u69, true);
            this.buffer.set(w69, this.offset);
            this.offset += 8;
        }
        catch (v69) {
            throw new Error('PackException stringAsLong');
        }
    }
    putShort(s69) {
        this.ensureCapacity(2);
        try {
            this.view.setInt16(this.offset, s69, true);
            this.offset += 2;
        }
        catch (t69) {
            throw new Error('PackException short');
        }
    }
    putVarbin(p69) {
        if (!p69) {
            this.ensureCapacity(1);
            return this.putVarInt(0);
        }
        if (p69.byteLength > Math.pow(2, 31) - 2) {
            throw new Error('PackException varbin. too long');
        }
        const q69 = varintToBytes(p69.length);
        this.ensureCapacity(q69.length + p69.length);
        try {
            this.buffer.set(q69, this.offset);
            this.offset += q69.length;
            this.buffer.set(p69, this.offset);
            this.offset += p69.length;
        }
        catch (r69) {
            throw new Error('PackException varbin');
        }
    }
}
