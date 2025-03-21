import { ValueType } from '@kit.ArkData';
export declare class Predicate {
    method: string;
    field?: string;
    value?: ValueType | Array<ValueType>;
    fields?: string[];
    values?: ValueType[];
    rowOffset?: number;
    devices?: Array<string>;
    low?: ValueType;
    high?: ValueType;
}
export declare const enum RdbPredicatesMethods {
    inDevices = "inDevices",
    inAllDevices = "inAllDevices",
    equalTo = "equalTo",
    notEqualTo = "notEqualTo",
    beginWrap = "beginWrap",
    endWrap = "endWrap",
    or = "or",
    and = "and",
    contains = "contains",
    beginsWith = "beginsWith",
    endsWith = "endsWith",
    isNull = "isNull",
    isNotNull = "isNotNull",
    like = "like",
    glob = "glob",
    between = "between",
    notBetween = "notBetween",
    greaterThan = "greaterThan",
    lessThan = "lessThan",
    greaterThanOrEqualTo = "greaterThanOrEqualTo",
    lessThanOrEqualTo = "lessThanOrEqualTo",
    orderByAsc = "orderByAsc",
    orderByDesc = "orderByDesc",
    distinct = "distinct",
    limitAs = "limitAs",
    offsetAs = "offsetAs",
    groupBy = "groupBy",
    indexedBy = "indexedBy",
    in = "in",
    notIn = "notIn",
    notContains = "notContains",
    notLike = "notLike"
}
export declare class RdbPredicates {
    list: Predicate[];
    name: string;
    constructor(c4: string);
    inDevices(a4: Array<string>): RdbPredicates;
    inAllDevices(): RdbPredicates;
    equalTo(w3: string, x3: ValueType): RdbPredicates;
    notEqualTo(t3: string, u3: ValueType): RdbPredicates;
    beginWrap(): RdbPredicates;
    endWrap(): RdbPredicates;
    or(): RdbPredicates;
    and(): RdbPredicates;
    contains(m3: string, n3: string): RdbPredicates;
    beginsWith(j3: string, k3: string): RdbPredicates;
    endsWith(g3: string, h3: string): RdbPredicates;
    isNull(e3: string): RdbPredicates;
    isNotNull(c3: string): RdbPredicates;
    like(z2: string, a3: string): RdbPredicates;
    glob(w2: string, x2: string): RdbPredicates;
    between(s2: string, t2: ValueType, u2: ValueType): RdbPredicates;
    notBetween(o2: string, p2: ValueType, q2: ValueType): RdbPredicates;
    greaterThan(l2: string, m2: ValueType): RdbPredicates;
    lessThan(i2: string, j2: ValueType): RdbPredicates;
    greaterThanOrEqualTo(f2: string, g2: ValueType): RdbPredicates;
    lessThanOrEqualTo(c2: string, d2: ValueType): RdbPredicates;
    orderByAsc(a2: string): RdbPredicates;
    orderByDesc(y1: string): RdbPredicates;
    distinct(): RdbPredicates;
    limitAs(v1: number): RdbPredicates;
    offsetAs(t1: number): RdbPredicates;
    groupBy(r1: Array<string>): RdbPredicates;
    indexedBy(p1: string): RdbPredicates;
    in(m1: string, n1: Array<ValueType>): RdbPredicates;
    notIn(j1: string, k1: Array<ValueType>): RdbPredicates;
    notContains(g1: string, h1: string): RdbPredicates;
    notLike(d1: string, e1: string): RdbPredicates;
}
