/**
 * number 类型转为 8 Byte(64 位) long 所代表的二进制数组
 *
 * 注: 因为避免使用 bigint 类型, 故而无法 setBigUint64, 采用遍历算 bytes 的方式写入
 */
export declare function setBigUint64(w72: number, x72?: boolean): Uint8Array;
export declare function setBigUint64ForNumberOverflow(m72: string, n72?: boolean): Uint8Array;
/**
 * number 类型转为 8 位 long 所代表的二进制数组
 *
 * 注: 因为避免使用 bigint 类型, 故而无法 setBigUint64, 采用遍历算 bytes 的方式写入
 */
export declare function getBigUint64(f72: Uint8Array, g72?: boolean): number;
/**
 * 不定长数字转为字节数组。
 *
 * 注: 数字限制比 4 字节 int 还小一些. 2^28 - 1 = 268435455 以内
 *
 * 设 value 为 1
 * do
 *   digit = 1
 *   value = 0
 *   view.setUint8(0, 1)
 * break, and data is [1, 0, 0, 0]
 * return [1]
 *
 * 设 value 为 300, (300).toString(2) = '100101100'
 * do
 *   digit = 300 % 128 = 44, (300).toString(2) = '00101100'
 *   value = 2
 *   value > 0 ,then digit = 172,
 *     ps. (44).toString(2) = '00101100'
 *                   0x80 is  '10000000', 也就是说高位留下了 1.
 *                     按位或  '10101100', 这个数字正好是 172
 *        (172).toString(2) = '10101100',
 *   view.setUint8(0, 172)
 * do
 *   digit = 2
 *   value = 0
 *   view.setUint8(1, 2)
 * break, and data is [172, 2, 0, 0]
 * return [172, 2]
 */
export declare function varintToBytes(a72: number): Uint8Array;
export declare function textEncoder(t71: string): number[];
/**
 * 把字符串转 Uint8Array.
 *
 * 注: 因为 ie 不支持 TextEncoder 而做的兼容写法
 *
 * @param text 目标字符串
 * @returns 结果二进制数组
 */
export declare function encodeText(r71: string): Uint8Array;
export declare function textDecoder(k71: Uint8Array): string;
/**
 * 把 Uint8Array 字符串转字符串.
 *
 * 注: 因为 ie、小程序不支持 TextEncoder 而做的兼容写法
 *
 * @param text 目标字符串
 * @returns 结果二进制数组
 */
export declare function decodeText(j71: Uint8Array): string;
