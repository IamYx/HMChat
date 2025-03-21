export class Predicate {
}
export class RdbPredicates {
    constructor(c4) {
        this.list = [];
        this.name = c4;
    }
    inDevices(a4) {
        const b4 = new Predicate();
        b4.method = "inDevices";
        b4.devices = a4;
        this.list.push(b4);
        return this;
    }
    inAllDevices() {
        const z3 = new Predicate();
        z3.method = "inAllDevices";
        this.list.push(z3);
        return this;
    }
    equalTo(w3, x3) {
        const y3 = new Predicate();
        y3.method = "equalTo";
        y3.field = w3;
        y3.value = x3;
        this.list.push(y3);
        return this;
    }
    notEqualTo(t3, u3) {
        const v3 = new Predicate();
        v3.method = "notEqualTo";
        v3.field = t3;
        v3.value = u3;
        this.list.push(v3);
        return this;
    }
    beginWrap() {
        const s3 = new Predicate();
        s3.method = "beginWrap";
        this.list.push(s3);
        return this;
    }
    endWrap() {
        const r3 = new Predicate();
        r3.method = "endWrap";
        this.list.push(r3);
        return this;
    }
    or() {
        const q3 = new Predicate();
        q3.method = "or";
        this.list.push(q3);
        return this;
    }
    and() {
        const p3 = new Predicate();
        p3.method = "and";
        this.list.push(p3);
        return this;
    }
    contains(m3, n3) {
        const o3 = new Predicate();
        o3.method = "contains";
        o3.field = m3;
        o3.value = n3;
        this.list.push(o3);
        return this;
    }
    beginsWith(j3, k3) {
        const l3 = new Predicate();
        l3.method = "beginsWith";
        l3.field = j3;
        l3.value = k3;
        this.list.push(l3);
        return this;
    }
    endsWith(g3, h3) {
        const i3 = new Predicate();
        i3.method = "endsWith";
        i3.field = g3;
        i3.value = h3;
        this.list.push(i3);
        return this;
    }
    isNull(e3) {
        const f3 = new Predicate();
        f3.method = "isNull";
        f3.field = e3;
        this.list.push(f3);
        return this;
    }
    isNotNull(c3) {
        const d3 = new Predicate();
        d3.method = "isNotNull";
        d3.field = c3;
        this.list.push(d3);
        return this;
    }
    like(z2, a3) {
        const b3 = new Predicate();
        b3.method = "like";
        b3.field = z2;
        b3.value = a3;
        this.list.push(b3);
        return this;
    }
    glob(w2, x2) {
        const y2 = new Predicate();
        y2.method = "glob";
        y2.field = w2;
        y2.value = x2;
        this.list.push(y2);
        return this;
    }
    between(s2, t2, u2) {
        const v2 = new Predicate();
        v2.method = "between";
        v2.field = s2;
        v2.low = t2;
        v2.high = u2;
        this.list.push(v2);
        return this;
    }
    notBetween(o2, p2, q2) {
        const r2 = new Predicate();
        r2.method = "notBetween";
        r2.field = o2;
        r2.low = p2;
        r2.high = q2;
        this.list.push(r2);
        return this;
    }
    greaterThan(l2, m2) {
        const n2 = new Predicate();
        n2.method = "greaterThan";
        n2.field = l2;
        n2.value = m2;
        this.list.push(n2);
        return this;
    }
    lessThan(i2, j2) {
        const k2 = new Predicate();
        k2.method = "lessThan";
        k2.field = i2;
        k2.value = j2;
        this.list.push(k2);
        return this;
    }
    greaterThanOrEqualTo(f2, g2) {
        const h2 = new Predicate();
        h2.method = "greaterThanOrEqualTo";
        h2.field = f2;
        h2.value = g2;
        this.list.push(h2);
        return this;
    }
    lessThanOrEqualTo(c2, d2) {
        const e2 = new Predicate();
        e2.method = "lessThanOrEqualTo";
        e2.field = c2;
        e2.value = d2;
        this.list.push(e2);
        return this;
    }
    orderByAsc(a2) {
        const b2 = new Predicate();
        b2.method = "orderByAsc";
        b2.field = a2;
        this.list.push(b2);
        return this;
    }
    orderByDesc(y1) {
        const z1 = new Predicate();
        z1.method = "orderByDesc";
        z1.field = y1;
        this.list.push(z1);
        return this;
    }
    distinct() {
        const x1 = new Predicate();
        x1.method = "distinct";
        this.list.push(x1);
        return this;
    }
    limitAs(v1) {
        const w1 = new Predicate();
        w1.method = "limitAs";
        w1.value = v1;
        this.list.push(w1);
        return this;
    }
    offsetAs(t1) {
        const u1 = new Predicate();
        u1.method = "offsetAs";
        u1.rowOffset = t1;
        this.list.push(u1);
        return this;
    }
    groupBy(r1) {
        const s1 = new Predicate();
        s1.method = "groupBy";
        s1.fields = r1;
        this.list.push(s1);
        return this;
    }
    indexedBy(p1) {
        const q1 = new Predicate();
        q1.method = "indexedBy";
        q1.field = p1;
        this.list.push(q1);
        return this;
    }
    in(m1, n1) {
        const o1 = new Predicate();
        o1.method = "in";
        o1.field = m1;
        o1.value = n1;
        this.list.push(o1);
        return this;
    }
    notIn(j1, k1) {
        const l1 = new Predicate();
        l1.method = "notIn";
        l1.field = j1;
        l1.value = k1;
        this.list.push(l1);
        return this;
    }
    notContains(g1, h1) {
        const i1 = new Predicate();
        i1.method = "notContains";
        i1.field = g1;
        i1.value = h1;
        this.list.push(i1);
        return this;
    }
    notLike(d1, e1) {
        const f1 = new Predicate();
        f1.method = "notLike";
        f1.field = d1;
        f1.value = e1;
        this.list.push(f1);
        return this;
    }
}
