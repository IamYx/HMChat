/**
 * 实现了一个名为 Unpack 的类
 * 用于将字节数组解包为各种数据类型。
 * 该类使用了 ByteBuffer 作为内部缓存。
 * 该类的构造函数有多个重载
 * 可以接受不同形式的字节数组输入。
 * Unpack 类还提供了一些方法，如 popRaw、popByte、popString 等等，用于从字节数组中读取原始数据、字节、字符串等等。
 * 此外，该类还提供了一些 popXXX 方法，用于读取特定类型的数据，如 popInt、popLong、popBoolean 等等。
 */
export declare class Unpack {
    private buffer;
    private view;
    private offset;
    constructor(h22: ArrayBuffer);
    checkBufferBoundaryAccess(): boolean;
    length(): number;
    getBuffer(): ArrayBuffer;
    /**
     * 取出指定 bytes 数的二进制数据
     * @param sz 字节数量
     * @returns 二进制数据
     */
    popRaw(e22: number): Uint8Array;
    /**
     * 取出一个 byte 的数据
     *
     * @returns 数字
     */
    popByte(): number;
    /**
     * 从 buffer 中读取一个不定长的数据
     */
    popVarbin(): Uint8Array;
    /**
     * 从 buffer 中读取一个变长的字符串
     */
    popString(): string;
    /**
     * 从 buffer 中读取一个 int 类型的数据
     */
    popInt(): number;
    /**
     * 从 buffer 中读取一个变长的数字
     *
     * 注: 值范围 4 byte 以内
     *
     * 设 buffer 为 [1]
     * do
     *   digit = 1
     *   value = 1 cause (00000001 & 01111111) * 1
     *   multiplier = 128
     * break, cause (00000001 & 10000000) === 0
     * return 1
     *
     * 设 buffer 为 [172, 2]
     * do
     *   digit = 172
     *   value = 44 cause 172 & 127 * 1
     *                    172: 10101100
     *                    127: 01111111
     *                     44: 00101100
     *   multiplier = 128
     * do, cause (10101100 & 10000000) != 0, 即有高位都不会为 0
     *   digit = 2
     *   value = 300 cause 44 + (00000010 & 01111111) * 128
     * break, cause (00000010 & 10000000) === 0
     * return 300
     * @returns
     */
    popVarInt(): number;
    popLong(): number;
    popShort(): number;
    popBoolean(): boolean;
    private toString;
    reset(): void;
}
