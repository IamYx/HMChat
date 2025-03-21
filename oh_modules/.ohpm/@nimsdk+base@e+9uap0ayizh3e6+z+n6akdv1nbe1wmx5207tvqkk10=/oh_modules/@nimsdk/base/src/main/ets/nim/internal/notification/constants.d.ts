/**
 * 将自定义消息类型转换为 systemMessageType 中的类型
 */
import { V2NIMConversationType } from '../../sdk/V2NIMConversationService';
export declare const typeMap: {
    1: number;
    2: number;
    3: number;
};
/**
 * 将自定义消息类型转换为 systemMessageType 中的类型
 */
export declare const sysTypeToConversationType: {
    [key: number]: V2NIMConversationType;
};
