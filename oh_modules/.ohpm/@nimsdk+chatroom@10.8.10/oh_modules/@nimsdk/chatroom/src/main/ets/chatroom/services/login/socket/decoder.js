import { Unpack } from './pack/unpack';
export default class PacketDecoder {
    constructor(e18) {
        this.packetLength = 0;
        this.serviceId = 0;
        this.commandId = 0;
        this.serialId = 0;
        this.tag = 0;
        this.resCode = 200;
        this.innerHeader = null;
        this.msgId = 0;
        this.priority = 0;
        this.unpack = new Unpack(e18);
    }
    reset() {
        this.innerHeader = null;
        this.unpack.reset();
    }
    unmarshalHeader() {
        const d18 = this._unmarshalHeader();
        this.packetLength = d18.packetLength;
        this.serviceId = d18.serviceId;
        this.commandId = d18.commandId;
        this.serialId = d18.serialId;
        this.tag = d18.tag;
        this.resCode = d18.resCode;
        if (d18.serviceId === 4 && [1, 2, 10, 11].includes(d18.commandId)) {
            this.msgId = this.unmarshalLong();
            this.innerHeader = this._unmarshalHeader();
        }
        if (d18.serviceId === 26 && [2].includes(d18.commandId) ||
            d18.serviceId === 1 && [2].includes(d18.commandId) ||
            [30, 31, 32].includes(d18.serviceId) && [1, 2].includes(d18.commandId) ||
            [7, 8, 21].includes(d18.serviceId) && [1, 2, 3, 101, 102].includes(d18.commandId) ||
            [34].includes(d18.serviceId) && [7].includes(d18.commandId)) {
            this.priority = 1;
        }
        if (d18.serviceId === 27 && [1].includes(d18.commandId)) {
            this.priority = -1;
        }
    }
    _unmarshalHeader() {
        const x17 = this.unpack.popVarInt();
        const y17 = this.unpack.popByte();
        const z17 = this.unpack.popByte();
        const a18 = this.unpack.popShort();
        const b18 = this.unpack.popByte();
        let c18 = 200;
        if (this.hasRescode(b18)) {
            c18 = this.unpack.popShort();
        }
        return { packetLength: x17, serviceId: y17, commandId: z17, serialId: a18, tag: b18, resCode: c18 };
    }
    hasRescode(w17) {
        w17 = w17 || this.tag;
        return (w17 & PacketDecoder.RES_CODE) !== 0;
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
        const r17 = this.unpack.popVarInt();
        const s17 = {};
        for (let t17 = 0; t17 < r17; t17++) {
            const u17 = this.unpack.popVarInt();
            const v17 = this.unpack.popString();
            s17[u17] = v17;
        }
        return s17;
    }
    unmarshalPropertyArray() {
        const o17 = this.unpack.popVarInt();
        const p17 = [];
        for (let q17 = 0; q17 < o17; q17++) {
            p17.push(this.unmarshalProperty());
        }
        return p17;
    }
    unmarshalLong() {
        return this.unpack.popLong();
    }
    unmarshalLongArray() {
        const l17 = this.unpack.popVarInt();
        const m17 = [];
        for (let n17 = 0; n17 < l17; n17++) {
            m17.push(this.unpack.popLong());
        }
        return m17;
    }
    unmarshalStrArray() {
        const i17 = this.unpack.popVarInt();
        const j17 = [];
        for (let k17 = 0; k17 < i17; k17++) {
            j17.push(this.unpack.popString());
        }
        return j17;
    }
    unmarshalStrLongMap() {
        const d17 = this.unpack.popVarInt();
        const e17 = {};
        for (let f17 = 0; f17 < d17; f17++) {
            const g17 = this.unpack.popString();
            const h17 = this.unpack.popLong();
            e17[g17] = h17;
        }
        return e17;
    }
    unmarshalStrStrMap() {
        const y16 = this.unpack.popVarInt();
        const z16 = {};
        for (let a17 = 0; a17 < y16; a17++) {
            const b17 = this.unpack.popString();
            const c17 = this.unpack.popString();
            z16[b17] = c17;
        }
        return z16;
    }
    unmarshalLongLongMap() {
        const t16 = this.unpack.popVarInt();
        const u16 = {};
        for (let v16 = 0; v16 < t16; v16++) {
            const w16 = this.unpack.popLong();
            const x16 = this.unpack.popLong();
            u16[w16] = x16;
        }
        return {
            m_map: u16
        };
    }
    unmarshalKVArray() {
        const q16 = this.unpack.popVarInt();
        const r16 = [];
        for (let s16 = 0; s16 < q16; s16++) {
            r16.push(this.unmarshalStrStrMap());
        }
        return r16;
    }
    unmarshal(m16) {
        const n16 = {
            ...this.getHeader(),
            r: []
        };
        if (this.innerHeader) {
            n16.r[0] = this.msgId;
            n16.r[1] = {
                body: [],
                headerPacket: this.getInnerHeader()
            };
        }
        if (![200, 406, 808, 810, 7101].includes(n16.code)) {
            return n16;
        }
        const o16 = [];
        if (m16) {
            m16.forEach((p16) => {
                if (this.unpack.checkBufferBoundaryAccess()) {
                    return;
                }
                switch (p16.type) {
                    case 'PropertyArray':
                        o16.push(this.unmarshalPropertyArray());
                        break;
                    case 'Property':
                        o16.push(this.unmarshalProperty());
                        break;
                    case 'Byte':
                        o16.push(this.unpack.popByte());
                        break;
                    case 'Int':
                        o16.push(this.unpack.popInt());
                        break;
                    case 'Bool':
                        o16.push(this.unpack.popBoolean());
                        break;
                    case 'Long':
                        o16.push(this.unmarshalLong());
                        break;
                    case 'LongArray':
                        o16.push(this.unmarshalLongArray());
                        break;
                    case 'String':
                        o16.push(this.unpack.popString());
                        break;
                    case 'StrArray':
                        o16.push(this.unmarshalStrArray());
                        break;
                    case 'StrStrMap':
                        o16.push(this.unmarshalStrStrMap());
                        break;
                    case 'StrLongMap':
                        o16.push(this.unmarshalStrLongMap());
                        break;
                    case 'LongLongMap':
                        o16.push(this.unmarshalLongLongMap());
                        break;
                    case 'KVArray':
                        o16.push(this.unmarshalKVArray());
                        break;
                    default:
                        break;
                }
            });
        }
        this.innerHeader ? (n16.r[1].body = o16) : (n16.r = o16);
        return n16;
    }
}
PacketDecoder.RES_CODE = 2;
