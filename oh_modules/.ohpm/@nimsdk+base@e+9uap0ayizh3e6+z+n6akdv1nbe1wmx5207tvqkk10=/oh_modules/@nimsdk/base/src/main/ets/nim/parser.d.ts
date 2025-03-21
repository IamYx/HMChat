import { NIMServiceName } from './sdk/types';
import { NIMEStrAnyObj } from './internal/types';
import { V2NIMErrorImpl } from './utils/error';
import Logger from './utils/logger';
export declare let cmdConfig: CmdConfigMap;
/**
 * 记录下行协议的解析规则
 */
export declare const notiCmdMap: NotiCmdMap;
export interface CmdForSend {
    SID: number;
    CID: number;
    SER: number;
    Q: NIMEStrAnyObj[];
}
type CmdName = keyof typeof cmdConfig;
export interface CreateCmdResult {
    packet: CmdForSend;
    hasPacketResponse: boolean;
    hasPacketTimer: boolean;
}
export interface Cmd {
    ser: number;
    sid: number;
    cid: number;
    r: any[];
    code: number;
}
export type ChatroomServiceName = 'chatroom' | 'chatroomAuth' | 'chatroomMsg' | 'chatroomMember' | 'chatroomQueue' | 'cloudStorage';
export type QChatServerName = 'qchatAuth' | 'qchatServer' | 'qchatChannel' | 'qchatMsg' | 'qchatRole' | 'cloudStorage' | 'qchatMedia';
export type ServiceName = ChatroomServiceName | QChatServerName | NIMServiceName;
/**
 * 生成待发送的Cmd内容
 */
export declare function createCmd(x14: CmdName, y14: number, z14: Logger, a15?: NIMEStrAnyObj): CreateCmdResult | null;
export interface Packet {
    cmd: string;
    service: ServiceName;
    error: V2NIMErrorImpl | null;
    raw: Cmd;
    content: NIMEStrAnyObj;
    priority?: number;
    notFound?: boolean;
    params?: NIMEStrAnyObj;
    __receiveTime?: number;
}
/**
 * 解析&格式化收到的Cmd
 */
export declare function parseCmd(m14: any, n14: Logger): Array<Packet> | undefined;
/**
 * v2 版本解析 code
 *
 * 设计文档见: https://docs.popo.netease.com/lingxi/643e53a36f614484a5946fcbe5775db7
 *
 * @param transportCode 服务器传输的 v2 code
 * @returns v2 code
 */
export declare function toReadableCode(v13: number): number;
/**
 * 将输入对象转换为 IM 协议中的数据。
 *
 * 输入对象示例：
 * {account: 'ab', appLogin: 1}
 *
 * mapper示例：
 * account: 0, appLogin: 1
 *
 * 输出数据示例:
 * 0: 'abc', 1: 1
 */
export declare function serialize(o13: NIMEStrAnyObj, p13: SerializeItem, q13?: Array<string>): NIMEStrAnyObj;
export declare function deserialize(f13: NIMEStrAnyObj, g13: DeSerializeItem): NIMEStrAnyObj;
/**
 * ########################################################################
 * ########################################################################
 *
 * registerParser 控制了上行协议的生成，以及下行协议的解析两个过程。
 *
 * 1. 注册下行协议的解析规则。下行注册需要 cmdMap + cmdConfig 配合。比如说，v2接收消息的注册为：
 * // cmdMap
 * {
 *   '7_2': 'onMsg', // 通知收到消息
 *   '8_3': 'onMsg'  // 群消息通知
 * }
 *
 * 这一段是指收到 7_2, 8_3 的通知消息时，需要调用 cmdConfig.onMsg 的配置来解析协议内容
 *
 * // cmdConfig
 *  onMsg: {
 *    // 这里 sid、cid其实是多余的。
 *    sid: 7,
 *    cid: 2,
 *    service: 'V2NIMMessageService',
 *    response: [{ type: 'Property', name: 'msg', reflectMapper: invertSerializeItem(messageTag) }]
 *  }
 *
 * 根据 response，将协议内容转换为对象。然后通过 nim.V2NIMMessageService 寻找handler。handler 名称为 'onMsg' + 'Handler'，即最终调用 nim.V2NIMMessageService.onMsgHandler(packet)
 *
 * 2. 注册上行协议的解析规则。上行仅使用 cmdParser.cmdConfig:
 *
 * v2SendP2pMessage: {
 *    sid: 7,
 *    cid: 1,
 *    service: serviceName,
 *    params: [
 *      {
 *        type: 'Property',
 *        name: 'tag',
 *        reflectMapper: msgSerializeTag.msg
 *      }
 *    ],
 *    response: [{ type: 'Property', name: 'data', reflectMapper: invertSerializeItem(messageTag) }]
 *  }
 *
 * 调用 core.sendCmd('v2SendP2pMessage') 时，会根据上述 params 配置，将参数转为协议格式，然后发送 7_1 给服务器。服务器返回回包后，通过 response 配置，将回包内容转为对象，返回给调用者。
 *
 *
 *
 * ########################################################################
 * ########################################################################
 *
 * 2023年8月份开始，IM 团队开发 IM V2 版本。V2 开发设计时，要求和 V1 可以融合混用。其中要求之一是下行通知需要同时触发 V1 和 V2 的回调。
 *
 * 在 V1 中，注册 cmdMap 时，多个下行协议对应一至多个回调。比如 7_2, 8_3 对应一个下行回调 onMsg。改为融合混用后，一个下行通知需要对应两个回调，一个是 V1 Service 注册的回调，一个是 V2 Service 注册的回调。
 *
 * 处于这个原因，cmdMap 的设计变成了这样:
 * [key: string]: Array<string>
 */
export declare function registerParser(y12: any, z12: CmdParser): void;
export declare function invertSerializeMap(v12: SerializeMap): {
    [key in keyof SerializeMap]: DeSerializeItem;
};
export declare function invertSerializeItem(r12: SerializeItem): DeSerializeItem;
/**
 * 协议数字标识到协议名称的映射关系
 */
export interface CmdMap {
    [key: string]: string;
}
/**
 * v1，v2 下行会注册两次，所以一个 key 会对应两个结果。（也有可能只有一个结果）
 *
 * 格式如下:
 *
 * 7_2: [
 *  {
 *     config: {
 *        response: xxx,
 *        service: 'msg'
 *     },
 *     cmd: 'onMsg'
 *  },
 *  {
 *     config: {
 *        response: xxx,
 *        service: 'V2NIMMessageService'
 *     },
 *     cmd: 'onMsg'
 *  }
 * ]
 *
 * 上面的格式，会触发 nim.msg.onMsgHandler 以及 nim.V2NIMMessageService.onMsgHandler
 */
export type NotiCmdMap = {
    [key: string]: {
        cmd: string;
        config: CmdConfigEntry;
    }[];
};
/**
 * SerializeItem 是 IM 协议的定义格式。
 *
 * 在 V1 时，协议的定义一般为:
 *
 * {
 *   scene: 0,
 *   to: 1,
 *   from: 2,
 *   fromClientType: 4,
 *   fromDeviceId: 5,
 *   fromNick: 6
 * }
 *
 * 上述定义比较简单易懂，但是实际使用时，从函数的入参，到转换为上述定义的格式，需要对参数进行转换。这个转换过程在 v1 的编码中，占用了大量的代码。除了入参转换外，回包的解析到最后变成函数的返回值也有相似的问题。
 *
 * 在 v2 中，我们引入了一些额外的变量，来简化这个过程。详情参考下面
 */
export interface SerializeItem {
    [key: string]: number | {
        id: number;
        /**
         * 如果入参未提供对应参数，而需要有一个默认值，可以使用 def 来指定。def 也可以是一个函数。是函数时的规则和 converter 一样
         */
        def?: any;
        /**
         * 如果提供了 retDef，会为返回值生成一个默认值
         */
        retDef?: any;
        /**
         * 返回值的类型。将下行协议下发的 string 改成 number，或者 boolean
         */
        retType?: 'number' | 'string' | 'boolean';
        /**
         * 如果入参取自于嵌套参数，比如 sendMessage 时，将 pushEnabled放到 pushConfig.pushEnabled 中，那么可以使用 access 来指定取值的路径。
         * pushEnabled: {
         *   id: 107,
         *   access: 'pushConfig.pushEnabled'
         * }
         */
        access?: string;
        /**
         * 回包如果要构建嵌套参数，默认会根据 access 来构建。如果需要和入参的结构不同，则可以指定 retAccess
         *
         * 比如设置
         * pushEnabled: {
         *   id: 107,
         *   access: 'pushConfig.pushEnabled',
         *   type: 'boolean'
         * }
         *
         * 那么返回的 res.content.data 结构如下:
         * {
         *   pushConfig: {
         *     pushEnabled: true
         *   }
         * }
         *
         * 如果设置了 retAccess: 'params.pushConfig.pushEnabled'，则返回的结构如下:
         * {
         *   params: {
         *      pushConfig: {
         *          pushEnabled: true
         *      }
         *   }
         * }
         */
        retAccess?: string;
        /**
         * 如果入参和协议的内容不一致，可以用 converter 函数转换。比如 conversationType 在 v2 中定义为 1，2，3。在 v1 中为 0, 1, 5。所以我们 conversationType 是这样定义的：
         * conversationType: {
         *   id: 0,
         *   converter: (value: V2NIMConversationType) => {
         *      if (value === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P) {
         *        return 0
         *      } else if (value === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM) {
         *        return 1
         *      } else if (value === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM) {
         *        return 5
         *      }
         *    }
         * }
         *
         * 如果转换时需要结合整体参数一起判断，则可以这样写:
         * forcePushAccountIds: {
         *   id: 18,
         *   (value: string[], params) => {
         *      if (params.conversationType === V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM && params['pushConfig.forcePush']) {
         *        return value ? JSON.stringify(value) : '#%@all@%#'
         *      }
         *    }
         *  }
         */
        converter?: (value: any, params: NIMEStrAnyObj) => any;
        /**
         * 返回值的转换方法。作用与 converter 相反，它将服务器协议的返回内容转换成 SDK 需要的内容，并最终暴露给用户
         */
        retConverter?: (value: any, params: NIMEStrAnyObj) => any;
    };
}
export interface DeSerializeItem {
    [key: string]: string | {
        prop: string;
        type?: 'number' | 'string' | 'boolean';
        access?: string;
        def?: any;
        converter?: (value: any, params: any) => any;
    };
}
/**
 * 序列化Cmd参数
 */
export interface SerializeMap {
    [key: string]: SerializeItem;
}
/**
 * 反序列Cmd响应内容
 */
export interface DeserializeMap {
    [key: string]: {
        [key1: number]: string;
    };
}
/**
 * Cmd配置项（名称、参数、响应）
 */
export interface CmdConfigMap {
    [key: string]: CmdConfigEntry;
}
interface CmdConfigEntry {
    sid: number;
    cid: number;
    service: ServiceName;
    /**
     * 协议入参结构
     */
    params?: CmdParams[];
    /**
     * 协议回包结构
     */
    response?: CmdResponse[];
    /**
     * 是否“设置包的超时定时器”，默认设置为 true
     * 注：像是 sync，qchatSync，回包时间会很长，不要设置定时器等包超时，则应当为 false
     */
    hasPacketTimer?: boolean;
    /**
     * 是否“响应回包”，默认设置为 true
     * 注：像是 batchMarkRead，不需要等待服务器的回包，内存里也不需要留驻它的包信息，则需要被设置为 false
     */
    hasPacketResponse?: boolean;
    /**
     * 可以忽略的错误码，比如说 7017 重复操作，或者批量操作部分失败这种，不想当做 error 处理的意思。
     */
    ignoreErrCodes?: number[];
}
type CmdTypes = 'Property' | 'PropertyArray' | 'Byte' | 'Int' | 'Bool' | 'Long' | 'LongArray' | 'String' | 'StrArray' | 'StrStrMap' | 'StrLongMap' | 'LongLongMap' | 'KVArray' | 'ArrayMable';
export interface CmdParams {
    type: CmdTypes;
    /**
     * 协议解析后，赋值给这个 name 属性，packet.content[name]
     */
    name: string;
    /**
     * 自定义映射的结构体
     */
    reflectMapper?: SerializeItem;
    /**
     * 对于 Property, PropertyArray，是否只选择部分的协议字段
     *
     * 比如说 23_3 增加快捷评论，传入消息体后，实际上传给服务器的只有 conversationType, senderId, receivderId, createTime, clientId, serverId
     */
    select?: Array<string>;
}
interface CmdResponse {
    type: CmdTypes;
    /**
     * 协议解析后，赋值给这个 name 属性，packet.content[name]
     */
    name: string;
    /**
     * 自定义映射的结构体
     */
    reflectMapper?: DeSerializeItem;
}
export interface CmdParser {
    cmdMap: CmdMap;
    cmdConfig: CmdConfigMap;
}
export declare function boolToInt(q12: boolean): number;
export declare function objectToJSONString(p12: NIMEStrAnyObj): string | void;
export declare function stringToJSONObject(o12: string): NIMEStrAnyObj | void;
export {};
