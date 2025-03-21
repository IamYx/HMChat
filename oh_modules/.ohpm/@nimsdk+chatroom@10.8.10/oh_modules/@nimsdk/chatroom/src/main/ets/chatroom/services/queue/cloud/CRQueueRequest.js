export class QueueOfferRequest {
    constructor(t35) {
        this.elementKey = t35.elementKey;
        this.elementValue = t35.elementValue;
        this.transient = t35.transient;
        this.ownerAccountId = t35.elementOwnerAccountId;
    }
}
export class QueuePollRequest {
    constructor(s35) {
        this.elementKey = s35;
    }
}
export class QueueInitRequest {
    constructor(r35) {
        this.size = r35;
    }
}
export class QueueBatchUpdateRequest {
    constructor(o35, p35, q35) {
        this.keyValues = o35;
        this.notificationEnabled = p35;
        this.notificationExtension = q35;
    }
}
