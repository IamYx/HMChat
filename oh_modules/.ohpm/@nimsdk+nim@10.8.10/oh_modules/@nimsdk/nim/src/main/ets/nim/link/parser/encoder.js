import { Pack } from './pack/pack';
function isConvertibleToNumber(o69) {
    if (typeof o69 !== 'number') {
        if (typeof o69 === 'undefined' || o69 === null) {
            return false;
        }
        else {
            o69 = Number(o69);
        }
    }
    if (isNaN(o69)) {
        throw new Error('Number type conversion error');
    }
    return true;
}
function isUndefinedOrNull(n69) {
    return typeof n69 === 'undefined' || n69 === null;
}
export default class PacketEncoder {
    constructor(k69, l69, m69) {
        this.pack = new Pack();
        this.packetLength = 0;
        this.serviceId = 0;
        this.commandId = 0;
        this.serialId = 0;
        this.tag = 0;
        this.serviceId = k69;
        this.commandId = l69;
        this.serialId = m69;
    }
    marshalHeader() {
        this.pack.putVarInt(this.packetLength);
        this.pack.putByte(this.serviceId);
        this.pack.putByte(this.commandId);
        this.pack.putShort(this.serialId);
        this.pack.putByte(this.tag);
    }
    marshalProperty(f69) {
        const g69 = Object.keys(f69);
        const h69 = g69.filter((j69) => !isUndefinedOrNull(j69));
        this.pack.putVarInt(h69.length);
        h69.forEach((i69) => {
            this.pack.putVarInt(Number(i69));
            if (Array.isArray(f69[i69]) || Object.prototype.toString.call(f69[i69]) === '[object Object]') {
                this.pack.putString(JSON.stringify(f69[i69]));
            }
            else {
                this.pack.putString(String(f69[i69]));
            }
        });
    }
    marshalPropertyArray(c69) {
        const d69 = c69.length;
        this.pack.putVarInt(d69);
        c69.forEach((e69) => {
            this.marshalProperty(e69?.v);
        });
    }
    marshalStrArray(x68) {
        const y68 = x68.filter((b69) => !isUndefinedOrNull(b69));
        const z68 = y68.length;
        this.pack.putVarInt(z68);
        y68.forEach((a69) => {
            this.pack.putString(String(a69));
        });
    }
    marshalLongArray(s68) {
        const t68 = s68.filter((w68) => isConvertibleToNumber(w68));
        const u68 = t68.length;
        this.pack.putVarInt(u68);
        t68.forEach((v68) => {
            this.putLong(v68);
        });
    }
    marshalStrStrMap(n68) {
        const o68 = Object.keys(n68);
        const p68 = o68.filter((r68) => !isUndefinedOrNull(n68[r68]) && !isUndefinedOrNull(r68));
        this.pack.putVarInt(p68.length);
        p68.forEach((q68) => {
            this.pack.putString(String(q68));
            this.pack.putString(String(n68[q68]));
        });
    }
    marshalStrLongMap(i68) {
        const j68 = Object.keys(i68);
        const k68 = j68.filter((m68) => isConvertibleToNumber(i68[m68]) && !isUndefinedOrNull(m68));
        this.pack.putVarInt(k68.length);
        k68.forEach((l68) => {
            this.pack.putString(String(l68));
            this.putLong(i68[l68]);
        });
    }
    marshalLongLongMap(b68) {
        const c68 = Object.keys(b68);
        const d68 = c68.filter((g68) => {
            const h68 = Number(g68);
            return isConvertibleToNumber(h68) && isConvertibleToNumber(b68[h68]);
        });
        this.pack.putVarInt(d68.length);
        d68.forEach((e68) => {
            const f68 = Number(e68);
            this.putLong(f68);
            this.putLong(b68[f68]);
        });
    }
    marshalKVArray(y67) {
        const z67 = y67.length;
        this.pack.putVarInt(z67);
        y67.forEach((a68) => {
            this.marshalStrStrMap(a68);
        });
    }
    putLong(x67) {
        if (typeof x67 === 'string' && x67.length > 15) {
            this.pack.putStringAsLong(x67);
        }
        else {
            this.pack.putLong(Number(x67));
        }
    }
    marshal(r67, s67) {
        this.marshalHeader();
        if (s67) {
            s67.forEach((t67, u67) => {
                const v67 = t67.type;
                let w67 = r67[u67]?.v;
                if (isUndefinedOrNull(w67))
                    return;
                switch (v67) {
                    case 'PropertyArray':
                        this.marshalPropertyArray(w67);
                        break;
                    case 'Property':
                        this.marshalProperty(w67);
                        break;
                    case 'Byte':
                        if (!isConvertibleToNumber(w67))
                            return;
                        this.pack.putByte(Number(w67));
                        break;
                    case 'Int':
                        if (!isConvertibleToNumber(w67))
                            return;
                        this.pack.putInt(Number(w67));
                        break;
                    case 'Bool':
                        if (w67 === 'false') {
                            w67 = false;
                        }
                        else if (w67 === 'true') {
                            w67 = true;
                        }
                        this.pack.putBoolean(w67);
                        break;
                    case 'Long':
                        if (!isConvertibleToNumber(w67))
                            return;
                        this.putLong(w67);
                        break;
                    case 'LongArray':
                        this.marshalLongArray(w67);
                        break;
                    case 'String':
                        this.pack.putString(String(w67));
                        break;
                    case 'StrArray':
                        this.marshalStrArray(w67);
                        break;
                    case 'StrStrMap':
                        this.marshalStrStrMap(w67);
                        break;
                    case 'StrLongMap':
                        this.marshalStrLongMap(w67);
                        break;
                    case 'LongLongMap':
                        this.marshalLongLongMap(w67);
                        break;
                    case 'KVArray':
                        this.marshalKVArray(w67);
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
