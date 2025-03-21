import { ValueType } from '@kit.ArkData';
import { collections } from '@kit.ArkTS';
export declare class SPredicate {
    method: string;
    field?: string;
    value?: ValueType;
    valueArray?: collections.Array<ValueType>;
    fields?: collections.Array<string>;
    rowOffset?: number;
    devices?: collections.Array<string>;
    low?: ValueType;
    high?: ValueType;
    constructor(o50: string, p50?: string, q50?: ValueType, r50?: collections.Array<ValueType>, s50?: collections.Array<string>, t50?: number, u50?: collections.Array<string>, v50?: ValueType, w50?: ValueType);
}
export declare class SRdbPredicates {
    list: SPredicate[];
    tableName: string;
    constructor(m50: SPredicate[], n50: string);
}
