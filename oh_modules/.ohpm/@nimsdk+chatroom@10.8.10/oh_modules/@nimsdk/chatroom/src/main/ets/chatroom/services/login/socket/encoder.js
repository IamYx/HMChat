import { Pack } from './pack/pack';
function isConvertibleToNumber(c20) {
    if (typeof c20 !== 'number') {
        if (typeof c20 === 'undefined' || c20 === null) {
            return false;
        }
        else {
            c20 = Number(c20);
        }
    }
    if (isNaN(c20)) {
        throw new Error('Number type conversion error');
    }
    return true;
}
function isUndefinedOrNull(b20) {
    return typeof b20 === 'undefined' || b20 === null;
}
export default class PacketEncoder {
    constructor(y19, z19, a20) {
        this.pack = new Pack();
        this.packetLength = 0;
        this.serviceId = 0;
        this.commandId = 0;
        this.serialId = 0;
        this.tag = 0;
        this.serviceId = y19;
        this.commandId = z19;
        this.serialId = a20;
    }
    marshalHeader() {
        this.pack.putVarInt(this.packetLength);
        this.pack.putByte(this.serviceId);
        this.pack.putByte(this.commandId);
        this.pack.putShort(this.serialId);
        this.pack.putByte(this.tag);
    }
    marshalProperty(t19) {
        const u19 = Object.keys(t19);
        const v19 = u19.filter((x19) => !isUndefinedOrNull(x19));
        this.pack.putVarInt(v19.length);
        v19.forEach((w19) => {
            this.pack.putVarInt(Number(w19));
            if (Array.isArray(t19[w19]) || Object.prototype.toString.call(t19[w19]) === '[object Object]') {
                this.pack.putString(JSON.stringify(t19[w19]));
            }
            else {
                this.pack.putString(String(t19[w19]));
            }
        });
    }
    marshalPropertyArray(q19) {
        const r19 = q19.length;
        this.pack.putVarInt(r19);
        q19.forEach((s19) => {
            this.marshalProperty(s19?.v);
        });
    }
    marshalStrArray(l19) {
        const m19 = l19.filter((p19) => !isUndefinedOrNull(p19));
        const n19 = m19.length;
        this.pack.putVarInt(n19);
        m19.forEach((o19) => {
            this.pack.putString(String(o19));
        });
    }
    marshalLongArray(g19) {
        const h19 = g19.filter((k19) => isConvertibleToNumber(k19));
        const i19 = h19.length;
        this.pack.putVarInt(i19);
        h19.forEach((j19) => {
            this.putLong(j19);
        });
    }
    marshalStrStrMap(b19) {
        const c19 = Object.keys(b19);
        const d19 = c19.filter((f19) => !isUndefinedOrNull(b19[f19]) && !isUndefinedOrNull(f19));
        this.pack.putVarInt(d19.length);
        d19.forEach((e19) => {
            this.pack.putString(String(e19));
            this.pack.putString(String(b19[e19]));
        });
    }
    marshalStrLongMap(w18) {
        const x18 = Object.keys(w18);
        const y18 = x18.filter((a19) => isConvertibleToNumber(w18[a19]) && !isUndefinedOrNull(a19));
        this.pack.putVarInt(y18.length);
        y18.forEach((z18) => {
            this.pack.putString(String(z18));
            this.putLong(w18[z18]);
        });
    }
    marshalLongLongMap(p18) {
        const q18 = Object.keys(p18);
        const r18 = q18.filter((u18) => {
            const v18 = Number(u18);
            return isConvertibleToNumber(v18) && isConvertibleToNumber(p18[v18]);
        });
        this.pack.putVarInt(r18.length);
        r18.forEach((s18) => {
            const t18 = Number(s18);
            this.putLong(t18);
            this.putLong(p18[t18]);
        });
    }
    marshalKVArray(m18) {
        const n18 = m18.length;
        this.pack.putVarInt(n18);
        m18.forEach((o18) => {
            this.marshalStrStrMap(o18);
        });
    }
    putLong(l18) {
        if (typeof l18 === 'string' && l18.length > 15) {
            this.pack.putStringAsLong(l18);
        }
        else {
            this.pack.putLong(Number(l18));
        }
    }
    marshal(f18, g18) {
        this.marshalHeader();
        if (g18) {
            g18.forEach((h18, i18) => {
                const j18 = h18.type;
                let k18 = f18[i18]?.v;
                if (isUndefinedOrNull(k18))
                    return;
                switch (j18) {
                    case 'PropertyArray':
                        this.marshalPropertyArray(k18);
                        break;
                    case 'Property':
                        this.marshalProperty(k18);
                        break;
                    case 'Byte':
                        if (!isConvertibleToNumber(k18))
                            return;
                        this.pack.putByte(Number(k18));
                        break;
                    case 'Int':
                        if (!isConvertibleToNumber(k18))
                            return;
                        this.pack.putInt(Number(k18));
                        break;
                    case 'Bool':
                        if (k18 === 'false') {
                            k18 = false;
                        }
                        else if (k18 === 'true') {
                            k18 = true;
                        }
                        this.pack.putBoolean(k18);
                        break;
                    case 'Long':
                        if (!isConvertibleToNumber(k18))
                            return;
                        this.putLong(k18);
                        break;
                    case 'LongArray':
                        this.marshalLongArray(k18);
                        break;
                    case 'String':
                        this.pack.putString(String(k18));
                        break;
                    case 'StrArray':
                        this.marshalStrArray(k18);
                        break;
                    case 'StrStrMap':
                        this.marshalStrStrMap(k18);
                        break;
                    case 'StrLongMap':
                        this.marshalStrLongMap(k18);
                        break;
                    case 'LongLongMap':
                        this.marshalLongLongMap(k18);
                        break;
                    case 'KVArray':
                        this.marshalKVArray(k18);
                        break;
                    default:
                        break;
                }
            });
        }
        return this.pack.getBuffer();
    }
    reset() {
        this.pack.reset();
    }
}
