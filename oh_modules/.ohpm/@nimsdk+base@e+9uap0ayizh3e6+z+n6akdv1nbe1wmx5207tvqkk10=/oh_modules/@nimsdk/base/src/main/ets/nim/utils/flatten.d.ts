import { NIMEStrAnyObj } from '../internal/types';
/**
 * 将对象扁平化
 *
 * 输入 { a: { b: 1, c: 2 }, d: 3 }
 * 输出 { 'a.b': 1, 'a.c': 2, d: 3 }
 */
export declare function flattenObj(q16: NIMEStrAnyObj): any;
/**
 * 还原嵌套对象
 *
 * 输入 { 'a.b': 1, 'a.c': 2, d: 3 }
 * 输出 { a: { b: 1, c: 2 }, d: 3 }
 */
export declare function unflattenObj(j16: NIMEStrAnyObj): any;
