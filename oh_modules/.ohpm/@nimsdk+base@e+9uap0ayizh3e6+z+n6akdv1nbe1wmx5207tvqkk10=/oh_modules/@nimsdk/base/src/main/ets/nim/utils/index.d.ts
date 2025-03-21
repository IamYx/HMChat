import { StrAnyObj } from '../sdk/types';
import { NIMEStrAnyObj } from '../internal/types';
/**
 * 生成一个 32 位的 [GUID](https://en.wikipedia.org/wiki/Globally_unique_identifier)/[UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)
 *
 * @memberOf util
 * @method guid
 *
 * @return {String}   guid/uuid
 */
export declare const guid: () => string;
/**
 * 获取 enum 类型的 key 值，用于入参校验
 *
 * enum ESysMsgFeature {
 *   default = 0,
 *   leave = 1,
 * }
 * getEnumKeys(ESysMsgFeature) ==> ['default', 'leave']
 */
export declare function getEnumKeys(i21: StrAnyObj): string[];
/**
 * 获取 enum 类型的 values 值，用于入参校验
 *
 * enum ESysMsgFeature {
 *   default = 0,
 *   leave = 1,
 * }
 * getEnumValues(ESysMsgFeature) ==> [0, 1]
 */
export declare function getEnumValues(f21: StrAnyObj): number[];
/**
 * 根据 Enum 的 value 获取 Enum 类型的 key
 *
 * enum ESysMsgFeature {
 *   default = 0,
 *   leave = 1,
 * }
 *
 * getEnumKeyByEnumValue(ESysMsgFeature, 0) ==> 'default'
 */
export declare function getEnumKeyByEnumValue<m122 extends {
    [index: string]: number | string;
}>(b21: m122, c21: number | string): keyof m122 | undefined;
/**
 * 内部合并默认参数和用户输入参数使用，如果用户未传入某个参数（即为undefined）则使用默认参数
 * 例：assignOthers({a:1,b:1},{b:undefined,c:1}) => {a:1,b:1,c:1}
 */
export declare function assignOptions<k122, l122>(x20: k122, y20: l122): k122 & l122;
/**
 * 选取一些作为必填，而其他的选项维持原定义
 *
 * 注: 常用于某些属性是可选的，但是 sdk 内部给某些键设置了默认值的情况.
 *
 * @example
 * ```ts
 * type Test = {
 *   a?: number
 *   b: string
 *   c?: boolean
 * }
 *
 * PickForRequired<Test, 'a' | 'b'>
 * {
 *   a: number
 *   b: string
 *   c?: boolean
 * }
 * ```
 */
export type PickForRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
/**
 * 选取一些作为必填，而其他的选项均为选填
 *
 * @example
 * ```ts
 * type Test = {
 *   a?: number
 *   b: string
 *   c?: boolean
 * }
 *
 * PickForRequired<Test, 'a'>
 * {
 *   a: number
 *   b?: string
 *   c?: boolean
 * }
 * ```
 */
export type PickForRequiredAndPartialTheRest<T, K extends keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>;
/**
 * 选取一些作为必填，而其他的选项都做了 Partial 处理
 *
 * 注: 对象选取某些属性覆盖的场景
 *
 * @example
 * ```ts
 * type Test = {
 *   a?: number
 *   b: string
 *   c?: boolean
 * }
 *
 * PickForRequired<Test, 'a' | 'b'>
 * {
 *   a: number
 *   b: string
 *   c?: boolean
 * }
 * ```
 */
export declare function emptyFuncWithPromise(): Promise<void>;
export declare function getFileExtension(v20: string): string;
/**
 * 查找符合条件的 index。 时间复杂度 O(n).
 *
 * 假设 keyName 是 "sortOrder", 返回的 index 符合这个规律: list[index - 1].sortOrder > sortOrder >= list[index].sortOrder
 *
 * 举个简化的例子: 列表的 sortOrder 值抽取出来是 [9 7 7 5 5 5 1]. 查找 6 的 index 应该得为三, 代表第三号元素是第一个小于 6 的元素
 *
 * 注: 这个算法最终放弃了旧的二分查找法 O(lgn)，只是因为调用它的函数主要耗时并非是查找引起的.
 *
 * @param list list 是一个已根据 sortOrder 降序排列的数组
 * @param keyName 需要查找的 key 的名称
 * @param targetValue 查找的 value
 * @returns 符合条件的 list 的下标 index
 */
export declare function findIndexWithinTargetValue(q20: NIMEStrAnyObj[], r20: string, s20: number): number;
