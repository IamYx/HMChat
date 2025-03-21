import { Unpack } from './pack/unpack';
export default class PacketDecoder {
    constructor(q67) {
        this.packetLength = 0;
        this.serviceId = 0;
        this.commandId = 0;
        this.serialId = 0;
        this.tag = 0;
        this.resCode = 200;
        this.innerHeader = null;
        this.msgId = 0;
        this.priority = 0;
        this.unpack = new Unpack(q67);
    }
    reset() {
        this.innerHeader = null;
        this.unpack.reset();
    }
    unmarshalHeader() {
        const p67 = this._unmarshalHeader();
        this.packetLength = p67.packetLength;
        this.serviceId = p67.serviceId;
        this.commandId = p67.commandId;
        this.serialId = p67.serialId;
        this.tag = p67.tag;
        this.resCode = p67.resCode;
        if (p67.serviceId === 4 && [1, 2, 10, 11].includes(p67.commandId)) {
            this.msgId = this.unmarshalLong();
            this.innerHeader = this._unmarshalHeader();
        }
        if (p67.serviceId === 26 && [2].includes(p67.commandId) ||
            p67.serviceId === 1 && [2].includes(p67.commandId) ||
            p67.serviceId === 6 && [23].includes(p67.commandId) ||
            [30, 31, 32].includes(p67.serviceId) && [1, 2].includes(p67.commandId) ||
            [7, 8, 21].includes(p67.serviceId) && [1, 2, 3, 101, 102].includes(p67.commandId) ||
            [34].includes(p67.serviceId) && [2, 7].includes(p67.commandId)) {
            this.priority = 1;
        }
        if (p67.serviceId === 27 && [1].includes(p67.commandId)) {
            this.priority = -1;
        }
    }
    _unmarshalHeader() {
        const j67 = this.unpack.popVarInt();
        const k67 = this.unpack.popByte();
        const l67 = this.unpack.popByte();
        const m67 = this.unpack.popShort();
        const n67 = this.unpack.popByte();
        let o67 = 200;
        if (this.hasRescode(n67)) {
            o67 = this.unpack.popShort();
        }
        return { packetLength: j67, serviceId: k67, commandId: l67, serialId: m67, tag: n67, resCode: o67 };
    }
    hasRescode(i67) {
        i67 = i67 || this.tag;
        return (i67 & PacketDecoder.RES_CODE) !== 0;
    }
    getHeader() {
        return {
            packetLength: this.packetLength,
            sid: this.serviceId,
            cid: this.commandId,
            ser: this.serialId,
            code: this.resCode,
            priority: this.priority
        };
    }
    getInnerHeader() {
        if (!this.innerHeader)
            return null;
        return {
            sid: this.innerHeader.serviceId,
            cid: this.innerHeader.commandId
        };
    }
    unmarshalProperty() {
        const d67 = this.unpack.popVarInt();
        const e67 = {};
        for (let f67 = 0; f67 < d67; f67++) {
            const g67 = this.unpack.popVarInt();
            const h67 = this.unpack.popString();
            e67[g67] = h67;
        }
        return e67;
    }
    unmarshalPropertyArray() {
        const a67 = this.unpack.popVarInt();
        const b67 = [];
        for (let c67 = 0; c67 < a67; c67++) {
            b67.push(this.unmarshalProperty());
        }
        return b67;
    }
    unmarshalLong() {
        return this.unpack.popLong();
    }
    unmarshalLongArray() {
        const x66 = this.unpack.popVarInt();
        const y66 = [];
        for (let z66 = 0; z66 < x66; z66++) {
            y66.push(this.unpack.popLong());
        }
        return y66;
    }
    unmarshalStrArray() {
        const u66 = this.unpack.popVarInt();
        const v66 = [];
        for (let w66 = 0; w66 < u66; w66++) {
            v66.push(this.unpack.popString());
        }
        return v66;
    }
    unmarshalStrLongMap() {
        const p66 = this.unpack.popVarInt();
        const q66 = {};
        for (let r66 = 0; r66 < p66; r66++) {
            const s66 = this.unpack.popString();
            const t66 = this.unpack.popLong();
            q66[s66] = t66;
        }
        return q66;
    }
    unmarshalStrStrMap() {
        const k66 = this.unpack.popVarInt();
        const l66 = {};
        for (let m66 = 0; m66 < k66; m66++) {
            const n66 = this.unpack.popString();
            const o66 = this.unpack.popString();
            l66[n66] = o66;
        }
        return l66;
    }
    unmarshalLongLongMap() {
        const f66 = this.unpack.popVarInt();
        const g66 = {};
        for (let h66 = 0; h66 < f66; h66++) {
            const i66 = this.unpack.popLong();
            const j66 = this.unpack.popLong();
            g66[i66] = j66;
        }
        return {
            m_map: g66
        };
    }
    unmarshalKVArray() {
        const c66 = this.unpack.popVarInt();
        const d66 = [];
        for (let e66 = 0; e66 < c66; e66++) {
            d66.push(this.unmarshalStrStrMap());
        }
        return d66;
    }
    unmarshal(y65) {
        const z65 = {
            ...this.getHeader(),
            r: []
        };
        if (this.innerHeader) {
            z65.r[0] = this.msgId;
            z65.r[1] = {
                body: [],
                headerPacket: this.getInnerHeader()
            };
        }
        if (![200, 406, 808, 810, 7101].includes(z65.code)) {
            return z65;
        }
        const a66 = [];
        if (y65) {
            y65.forEach((b66) => {
                if (this.unpack.checkBufferBoundaryAccess()) {
                    return;
                }
                switch (b66.type) {
                    case 'PropertyArray':
                        a66.push(this.unmarshalPropertyArray());
                        break;
                    case 'Property':
                        a66.push(this.unmarshalProperty());
                        break;
                    case 'Byte':
                        a66.push(this.unpack.popByte());
                        break;
                    case 'Int':
                        a66.push(this.unpack.popInt());
                        break;
                    case 'Bool':
                        a66.push(this.unpack.popBoolean());
                        break;
                    case 'Long':
                        a66.push(this.unmarshalLong());
                        break;
                    case 'LongArray':
                        a66.push(this.unmarshalLongArray());
                        break;
                    case 'String':
                        a66.push(this.unpack.popString());
                        break;
                    case 'StrArray':
                        a66.push(this.unmarshalStrArray());
                        break;
                    case 'StrStrMap':
                        a66.push(this.unmarshalStrStrMap());
                        break;
                    case 'StrLongMap':
                        a66.push(this.unmarshalStrLongMap());
                        break;
                    case 'LongLongMap':
                        a66.push(this.unmarshalLongLongMap());
                        break;
                    case 'KVArray':
                        a66.push(this.unmarshalKVArray());
                        break;
                    default:
                        break;
                }
            });
        }
        this.innerHeader ? (z65.r[1].body = a66) : (z65.r = a66);
        return z65;
    }
}
PacketDecoder.RES_CODE = 2;
