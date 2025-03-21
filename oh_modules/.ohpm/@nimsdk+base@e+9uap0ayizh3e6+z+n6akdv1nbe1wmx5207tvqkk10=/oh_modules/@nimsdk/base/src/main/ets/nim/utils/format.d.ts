import { StrAnyObj } from '../sdk/types';
import { V2NIMMessageAttachment, V2NIMMessageType } from '../sdk/V2NIMMessageService';
type RuleType = 'string' | 'number' | 'boolean' | 'enum' | 'object';
interface Rule {
    type: RuleType;
    rawKey?: string;
    /**
     * 如果 type 为 enum，那么 values 可以穿一个 enum 类型的对象进来
     */
    values?: any;
}
export interface FormatRules {
    [key: string]: Rule | FormatRules;
}
/**
 * 格式化反转对象函数。
 *
 * rules 的格式如下
 * {
 *   idClient: { type: 'string' },
 *   setting: {
 *     resendFlag: { type: 'boolean' }
 *   }
 * }
 * rawData 如 { idClient: 'jsudh12dkkd', resendFlag: 1, idServer: '887462392' }
 *
 * 得到 { idClient: 'jsudh12dkkd', setting: { resendFlag: true }, idServer: '887462392' }
 *
 */
export declare function format(m20: FormatRules, n20: StrAnyObj): StrAnyObj;
/**
 * 格式化对象函数，比如说把 1 或者 0 映射为 boolean 值
 */
export declare function doFormat(b20: FormatRules, c20: StrAnyObj): StrAnyObj;
export declare const formatStategies: {
    number: (data: StrAnyObj, keyName: string) => number | undefined;
    string: (data: StrAnyObj, keyName: string) => string | undefined;
    boolean: (data: StrAnyObj, keyName: string) => boolean | undefined;
    enum: (data: StrAnyObj, keyName: string, rule: Rule) => string | undefined;
    object: (data: StrAnyObj, keyName: string) => StrAnyObj | Array<any> | undefined | any;
};
/**
 * 格式化反转对象函数。
 *
 * rules 的格式如下
 * {
 *   idClient: { type: 'string' },
 *   setting: {
 *     resendFlag: { type: 'boolean' }
 *   }
 * }
 * rawData 如 { idClient: 'jsudh12dkkd', setting: { resendFlag: true }, idServer: '887462392' }
 *
 * 得到 { idClient: 'jsudh12dkkd', resendFlag: 1, idServer: '887462392' }
 *
 */
export declare function formatReverse(k19: FormatRules, l19: StrAnyObj): StrAnyObj;
export declare const formatReverseStategies: {
    number: (data: StrAnyObj, keyName: string) => number | undefined;
    string: (data: StrAnyObj, keyName: string) => string | undefined;
    boolean: (data: StrAnyObj, keyName: string) => number | undefined;
    enum: (data: StrAnyObj, keyName: string, rule: Rule) => string | undefined;
    object: (data: StrAnyObj, keyName: string) => string | undefined;
};
export declare function chatroomAttachmentToRaw(h18: V2NIMMessageType, i18: Partial<V2NIMMessageAttachment>): string;
export declare function chatroomRawToAttachment(i17: string, j17: V2NIMMessageType): any;
export {};
