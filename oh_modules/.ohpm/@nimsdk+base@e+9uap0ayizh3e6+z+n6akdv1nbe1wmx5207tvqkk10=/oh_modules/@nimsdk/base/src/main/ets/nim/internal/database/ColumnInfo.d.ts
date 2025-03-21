import { ColumnType } from "./const";
export declare class ColumnInfo {
    name: string;
    type: ColumnType;
    length?: number;
    nullable?: boolean;
    defaultValue?: number | string | boolean | Uint8Array;
    constructor(y: string, z: ColumnType, a1?: number, b1?: boolean);
    setDefault(x: number | string | boolean | Uint8Array): ColumnInfo;
}
