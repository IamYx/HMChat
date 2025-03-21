import { NIMEStrAnyObj } from '@nimsdk/base';
import CRQueueServiceInternal from '../../internal/CRQueueServiceInternal';
import { V2NIMChatroomQueueElement, V2NIMChatroomQueueListener, V2NIMChatroomQueueOfferParams } from '../../sdk/V2NIMChatroomQueueService';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import CRBaseService from '../base/CRBaseService';
export default class CRQueueServiceImpl extends CRBaseService<V2NIMChatroomQueueListener> implements CRQueueServiceInternal {
    constructor(i37: V2NIMChatroomClient);
    setListeners(): void;
    queueOffer(a37: V2NIMChatroomQueueOfferParams): Promise<void>;
    queuePoll(y36?: string): Promise<V2NIMChatroomQueueElement>;
    queueList(): Promise<V2NIMChatroomQueueElement[]>;
    queuePeek(): Promise<V2NIMChatroomQueueElement>;
    queueDrop(): Promise<void>;
    queueInit(v36: number): Promise<void>;
    queueBatchUpdate(o36: V2NIMChatroomQueueElement[], p36?: boolean, q36?: string): Promise<string[]>;
}
export declare function formatQueueElementsFromKVObject(b36: NIMEStrAnyObj): V2NIMChatroomQueueElement[];
export declare function formatQueueElementsFromElements(z35: NIMEStrAnyObj[]): V2NIMChatroomQueueElement[];
export declare function formatQueueElements(u35: NIMEStrAnyObj[]): V2NIMChatroomQueueElement[];
