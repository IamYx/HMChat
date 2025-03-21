import { ColumnType } from "./const";
export class ColumnInfo {
    constructor(y, z, a1, b1) {
        this.name = y;
        this.type = z;
        this.length = a1;
        this.nullable = b1;
    }
    setDefault(x) {
        switch (this.type) {
            case ColumnType.INTEGER:
                if (typeof x !== 'number') {
                    throw new Error(`Default value type (${typeof x}) does not match column type (integer)`);
                }
                break;
            case ColumnType.TEXT:
                if (typeof x !== 'string') {
                    throw new Error(`Default value type (${typeof x}) does not match column type (text)`);
                }
                break;
            case ColumnType.BOOLEAN:
                if (typeof x !== 'boolean') {
                    throw new Error(`Default value type (${typeof x}) does not match column type (boolean)`);
                }
                break;
            case ColumnType.BLOB:
                throw new Error(`Default value of BLOB does not supported to be set`);
                if (!(x instanceof Uint8Array)) {
                    throw new Error(`Default value type (${typeof x}) does not match column type (blob)`);
                }
                break;
            default:
                throw new Error('Unhandled column type');
        }
        this.defaultValue = x;
        return this;
    }
}
