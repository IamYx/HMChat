export declare class Pack {
    private buffer;
    private view;
    private offset;
    private pageSize;
    private capacity;
    constructor();
    reset(): void;
    size(): number;
    getBuffer(): ArrayBuffer;
    /**
     * 检查字节数组是否需要扩容
     *
     * @param byteLength 新增的字节长度
     */
    private ensureCapacity;
    /**
     * 将一个字节数组写入缓存
     * @param bytes 字节数组
     */
    putRaw(k21: Uint8Array): void;
    /**
     * 将一个 byte 写入缓存
     * @param bt 内容，限定一个 byte 能表达的范围内
     */
    putByte(i21: number): void;
    /**
     * 将一个字符串写入缓存
     * @param str 目标字符串
     */
    putString(f21: string): void;
    /**
     * 将一个整数(4字节)写入缓存
     * @param val 整数内容
     */
    putInt(d21: number): void;
    /**
     * 将一个不定位数的整数写入缓存
     *
     * 注: int 类型本应该是 4 byte, 但是常常并不需要那么多位来表达一个整数, 比方说 0～128 之间的数字，一个 byte 就足够了。
     *
     * @param val 整数内容
     */
    putVarInt(b21: number): void;
    /**
     * 将一个布尔值写入缓存
     *
     * @param val 布尔值
     */
    putBoolean(z20: boolean): void;
    /**
     * 将一个长整数(8字节)写入缓存
     *
     * 注: 如时间戳就是其他端定好是一个 long 类型的，但因为 js 没有 long 被定义为 number 类型. 操作时特意避开 bigint
     *
     * @param val 长整数内容
     */
    putLong(w20: number): void;
    putStringAsLong(t20: string): void;
    /**
     * 将一个 short(2字节) 写入缓存
     *
     * 注: 可能后面用不到这个
     *
     * @param val 数字内容
     */
    putShort(r20: number): void;
    /**
     * 将一个变长的字符串所形成的字节数组写入缓存
     *
     * 注: 按照业务需求 property 数据推入需要先推入长度
     */
    putVarbin(o20?: Uint8Array): void;
}
