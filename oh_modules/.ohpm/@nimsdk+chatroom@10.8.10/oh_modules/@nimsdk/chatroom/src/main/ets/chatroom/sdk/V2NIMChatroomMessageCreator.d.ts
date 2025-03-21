/**
 * V2NIMChatroomMessageCreator
 *
 * 工具类，用于构造聊天室消息
 */
import { V2NIMMessageCustomAttachment } from '@nimsdk/base';
import { V2NIMChatroomMessage } from './types';
export interface V2NIMChatroomMessageCreator {
    /**
     * 构造文本消息
     *
     * @param text 文本内容. 不允许为空字符串
     *
     * @example
     * ```
     * const message = this.chatroomClient.messageCreator.createTextMessage('hello world')
     * ```
     */
    createTextMessage(text: string): V2NIMChatroomMessage;
    /**
     * 构造图片消息
     *
     * @param imagePath 图片路径.
     * @param name 文件显示名称
     * @param sceneName 场景名
     * @param width 图片宽度.
     * @param height 图片高度.
     */
    createImageMessage(imagePath: string, name?: string, sceneName?: string, width?: number, height?: number): Promise<V2NIMChatroomMessage>;
    /**
     * 构造语音消息
     *
     * @param audioPath 语音文件路径
     * @param name 文件显示名称
     * @param sceneName 场景名
     * @param duration 音频时长
     */
    createAudioMessage(audioPath: string, name?: string, sceneName?: string, duration?: number): Promise<V2NIMChatroomMessage>;
    /**
     * 构造视频消息
     *
     * @param videoPath 视频文件路径
     * @param name 文件显示名称
     * @param sceneName 场景名
     * @param duration 音频时长
     * @param width 视频宽度
     * @param height 视频高度
     */
    createVideoMessage(videoPath: string, name?: string, sceneName?: string, duration?: number, width?: number, height?: number): Promise<V2NIMChatroomMessage>;
    /**
     * 构造文件消息
     *
     * @param filePath 文件路径
     * @param name 文件显示名称
     * @param sceneName 场景名
     */
    createFileMessage(filePath: string, name?: string, sceneName?: string): Promise<V2NIMChatroomMessage>;
    /**
     * 构造地理位置消息
     *
     * @param latitude 纬度
     * @param longitude 经度
     * @param address 详细位置信息
     */
    createLocationMessage(latitude: number, longitude: number, address: string): V2NIMChatroomMessage;
    /**
     * 构造自定义消息消息
     *
     * @param rawAttachment 自定义的附件内容
     */
    createCustomMessage(rawAttachment: string): V2NIMChatroomMessage;
    /**
     * 构造转发消息，消息内容与原消息一样
     *
     * @param message 需要转发的消息体
     */
    createForwardMessage(message: V2NIMChatroomMessage): V2NIMChatroomMessage | null;
    /**
     * 构造提示消息
     *
     * @param text 提示文本
     */
    createTipsMessage(text: string): V2NIMChatroomMessage;
    /**
     * 构造自定义消息消息. v10.5.0+ 支持
     *
     * @param attachment 自定义附件. 切记一定要有 raw 属性, 且是其他属性的序列化字符串. 示例 { raw: '{"test":123}', test: 123 }
     * @param subType 消息的子类型, 传入的值大于等于0
     */
    createCustomMessageWithAttachment(attachment: V2NIMMessageCustomAttachment, subType?: number): V2NIMChatroomMessage;
}
