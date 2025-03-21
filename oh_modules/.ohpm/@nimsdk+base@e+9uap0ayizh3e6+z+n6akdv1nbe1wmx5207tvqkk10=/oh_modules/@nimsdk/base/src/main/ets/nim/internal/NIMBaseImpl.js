export class NIMBaseImpl {
    constructor() {
    }
    static initByParams(r6, ...s6) {
        const t6 = r6();
        t6.fromParams(...s6);
        return t6;
    }
    static initByCloud(o6, p6) {
        const q6 = o6();
        q6.fromCloud(p6);
        return q6;
    }
    static initByValueBucket(l6, m6) {
        const n6 = l6();
        n6.fromValueBucket(m6);
        return n6;
    }
}
