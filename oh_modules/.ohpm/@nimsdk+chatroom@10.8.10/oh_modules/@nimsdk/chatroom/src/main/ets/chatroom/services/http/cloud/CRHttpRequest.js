export class CRGetNosTokenRequest {
    constructor(c4, d4) {
        this.count = c4;
        this.nosToken = d4;
    }
}
export class CRNosTokenParams {
    constructor(a4, b4) {
        this.tag = a4;
        this.expireSec = b4;
    }
}
export class CRGetOriginUrlRequest {
    constructor(z3) {
        this.nosSafeUrlTag = z3;
    }
}
export class CRNosSafeUrlTagParam {
    constructor(y3) {
        this.safeUrl = y3;
    }
}
