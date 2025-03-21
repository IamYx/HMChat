export class GetNosTokenRequest {
    constructor(x55, y55) {
        this.count = x55;
        this.nosToken = y55;
    }
}
export class NosTokenParams {
    constructor(v55, w55) {
        this.tag = v55;
        this.expireSec = w55;
    }
}
export class GetOriginUrlRequest {
    constructor(u55) {
        this.nosSafeUrlTag = u55;
    }
}
export class NosSafeUrlTagParam {
    constructor(t55) {
        this.safeUrl = t55;
    }
}
export class GetNosAccessTokenTag {
    constructor(s55) {
        this.tag = s55;
    }
}
export class GetNosAccessTokenTagParam {
    constructor(p55, q55, r55) {
        this.url = p55;
        this.userAgent = this.userAgent;
        this.ext = r55;
    }
}
export class DeleteNosAccessTokenTag {
    constructor(o55) {
        this.tag = o55;
    }
}
export class DeleteNosAccessTokenTagParam {
    constructor(n55) {
        this.token = n55;
    }
}
