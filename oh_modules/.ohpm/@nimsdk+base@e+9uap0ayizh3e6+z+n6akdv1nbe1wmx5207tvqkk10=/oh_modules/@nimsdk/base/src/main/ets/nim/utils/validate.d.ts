import { NIMEStrAnyObj } from '../internal/types';
import { NIM } from '../NIM';
export interface Rule {
    type: 'string' | 'number' | 'array' | 'object' | 'enum' | 'boolean' | 'file' | 'func' | 'jsonstr' | 'stringObject';
    required?: boolean;
    values?: any[];
    min?: number;
    max?: number;
    itemType?: 'string' | 'number' | 'boolean' | 'enum' | 'V2NIMMessage';
    rules?: Rules;
    regExp?: RegExp;
    allowEmpty?: boolean;
}
export interface Rules {
    [key: string]: Rule;
}
/**
 * 校验函数，参照 parameter 库的调用方法
 *
 * @param  {object}     rules       规则
 * @param  {params}     params      待校验的对象
 * @param  {string}     callFuncName    调用函数名
 * @param  {string}     useV2ErrCode    抛出错误的错误码是否使用 v2 版本
 *
 * rules 的格式如下
 * {
 *   keyword: { type: 'string' },
 *   sessionLimit: { type: 'number', min: 0, required: false },
 *   msgLimit: { type: 'number', min: 0, required: false },
 *   order: { type: 'enum', values: ['ASC', 'DESC'], required: false },
 *   p2pList: { type: 'string', allowEmpty: false, required: false },
 *   teamList: { type: 'string', allowEmpty: false, required: false },
 *   senderList: { type: 'string', allowEmpty: false, required: false },
 *   msg: {
 *     type: 'object',
 *     rule: {
 *       keyword: { type: 'string' },
 *     }
 *   }
 * }
 * @return {object}    返回过滤后的参数
 */
export declare function validate(c29: Rules, d29?: NIMEStrAnyObj, e29?: string, f29?: boolean): NIMEStrAnyObj;
/**
 * 校验 conversationId 是否合法。
 *
 * 一是校验是否 按照 myAccount | conversationType | target 的格式构建
 * 二是校验 conversationType 是否合法
 */
export declare function validateConversationId(v26: string, w26: string): void;
export declare function verifyLoginStatus(t26: NIM): void;
