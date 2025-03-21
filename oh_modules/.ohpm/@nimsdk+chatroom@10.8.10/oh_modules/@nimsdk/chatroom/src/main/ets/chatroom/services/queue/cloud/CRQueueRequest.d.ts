import { NIMEStrObj } from '@nimsdk/base';
import { V2NIMChatroomQueueOfferParams } from '../../../sdk/V2NIMChatroomQueueService';
/**
 * Request params of protocol:
 * v2ChatroomQueueOffer
 */
export declare class QueueOfferRequest implements V2NIMChatroomQueueOfferParams {
    elementKey: string;
    elementValue: string;
    transient?: boolean;
    ownerAccountId?: string;
    constructor(t35: V2NIMChatroomQueueOfferParams);
}
/**
 * Request params of protocol:
 * v2ChatroomQueuePoll
 */
export declare class QueuePollRequest {
    elementKey?: string;
    constructor(s35?: string);
}
/**
 * Request params of protocol:
 * v2ChatroomQueueInit
 */
export declare class QueueInitRequest {
    size: number;
    constructor(r35: number);
}
/**
 * Request params of protocol:
 * v2ChatroomQueueBatchUpdate
 */
export declare class QueueBatchUpdateRequest {
    keyValues: NIMEStrObj;
    notificationEnabled: boolean;
    notificationExtension: string;
    constructor(o35: NIMEStrObj, p35: boolean, q35: string);
}
