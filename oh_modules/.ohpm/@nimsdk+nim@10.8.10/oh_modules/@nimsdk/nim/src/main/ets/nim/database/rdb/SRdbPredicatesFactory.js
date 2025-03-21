import collections from "@arkts.collections";
import { SPredicate, SRdbPredicates } from './SRdbPredicates';
class SPredicateFactory {
    static make(o51) {
        const p51 = o51.method;
        const q51 = o51.field;
        let r51 = undefined;
        let s51 = undefined;
        let t51 = new collections.Array();
        if (o51.value instanceof Array) {
            o51.value.map(c52 => {
                t51.push(c52);
            });
            s51 = t51;
        }
        else {
            r51 = o51.value;
        }
        const u51 = new collections.Array();
        o51.fields?.map(b52 => {
            u51?.push(b52);
        });
        const v51 = new collections.Array();
        o51.devices?.map(a52 => {
            v51?.push(a52);
        });
        const w51 = o51.low;
        const x51 = o51.high;
        const y51 = o51.rowOffset;
        const z51 = new SPredicate(p51, q51, r51, s51, u51, y51, v51, w51, x51);
        return z51;
    }
}
export class SRdbPredicatesFactory {
    static make(i51) {
        const j51 = [];
        i51.list.map(m51 => {
            const n51 = SPredicateFactory.make(m51);
            j51.push(n51);
        });
        const k51 = i51.name;
        const l51 = new SRdbPredicates(j51, k51);
        return l51;
    }
    static transform(x50, y50) {
        x50.list.map(z50 => {
            if (z50.method === "inDevices") {
                const g51 = [];
                z50.devices?.map(h51 => {
                    g51.push(h51);
                });
                y50.inDevices(g51);
            }
            else if (z50.method === "inAllDevices") {
                y50.inAllDevices();
            }
            else if (z50.method === "equalTo") {
                y50.equalTo(z50.field, z50.value);
            }
            else if (z50.method === "notEqualTo") {
                y50.notEqualTo(z50.field, z50.value);
            }
            else if (z50.method === "beginWrap") {
                y50.beginWrap();
            }
            else if (z50.method === "endWrap") {
                y50.endWrap();
            }
            else if (z50.method === "or") {
                y50.or();
            }
            else if (z50.method === "and") {
                y50.and();
            }
            else if (z50.method === "contains") {
                y50.contains(z50.field, z50.value);
            }
            else if (z50.method === "beginsWith") {
                y50.beginsWith(z50.field, z50.value);
            }
            else if (z50.method === "endsWith") {
                y50.endsWith(z50.field, z50.value);
            }
            else if (z50.method === "isNull") {
                y50.isNull(z50.field);
            }
            else if (z50.method === "isNotNull") {
                y50.isNotNull(z50.field);
            }
            else if (z50.method === "like") {
                y50.like(z50.field, z50.value);
            }
            else if (z50.method === "glob") {
                y50.glob(z50.field, z50.value);
            }
            else if (z50.method === "between") {
                y50.between(z50.field, z50.low, z50.high);
            }
            else if (z50.method === "notBetween") {
                y50.notBetween(z50.field, z50.low, z50.high);
            }
            else if (z50.method === "greaterThan") {
                y50.greaterThan(z50.field, z50.value);
            }
            else if (z50.method === "lessThan") {
                y50.lessThan(z50.field, z50.value);
            }
            else if (z50.method === "greaterThanOrEqualTo") {
                y50.greaterThanOrEqualTo(z50.field, z50.value);
            }
            else if (z50.method === "lessThanOrEqualTo") {
                y50.lessThanOrEqualTo(z50.field, z50.value);
            }
            else if (z50.method === "orderByAsc") {
                y50.orderByAsc(z50.field);
            }
            else if (z50.method === "orderByDesc") {
                y50.orderByDesc(z50.field);
            }
            else if (z50.method === "distinct") {
                y50.distinct();
            }
            else if (z50.method === "limitAs") {
                y50.limitAs(z50.value);
            }
            else if (z50.method === "offsetAs") {
                y50.offsetAs(z50.rowOffset);
            }
            else if (z50.method === "groupBy") {
                const e51 = [];
                z50.fields?.map(f51 => {
                    e51.push(f51);
                });
                y50.groupBy(e51);
            }
            else if (z50.method === "indexedBy") {
                y50.indexedBy(z50.field);
            }
            else if (z50.method === "in") {
                const c51 = [];
                if (z50.valueArray instanceof collections.Array) {
                    z50.valueArray?.map(d51 => {
                        c51.push(d51);
                    });
                }
                y50.in(z50.field, c51);
            }
            else if (z50.method === "notIn") {
                const a51 = [];
                if (z50.valueArray instanceof collections.Array) {
                    z50.valueArray?.map(b51 => {
                        a51.push(b51);
                    });
                }
                y50.notIn(z50.field, a51);
            }
            else if (z50.method === "notContains") {
                y50.notContains(z50.field, z50.value);
            }
            else if (z50.method === "notLike") {
                y50.notLike(z50.field, z50.value);
            }
        });
    }
}
