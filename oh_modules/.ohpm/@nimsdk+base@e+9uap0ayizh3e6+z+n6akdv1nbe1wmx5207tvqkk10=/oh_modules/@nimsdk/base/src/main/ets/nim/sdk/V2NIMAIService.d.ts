import { NIMEBaseListener, NIMEBaseServiceInterface } from './types';
import { V2NIMUser } from './V2NIMUserService';
/**
 * AI 数字人服务
 *
 */
export interface V2NIMAIService extends NIMEBaseServiceInterface<V2NIMAIListener> {
    /**
     * 数字人拉取接口
     *
     * 注: 返回全量的本 Appkey 相关的数字人用户
     *
     * @returns 数字人用户列表
     */
    getAIUserList(): Promise<V2NIMAIUser[]>;
    /**
     * AI 数字人请求代理接口
     *
     * @param params 接口入参
     */
    proxyAIModelCall(params: V2NIMProxyAIModelCallParams): Promise<void>;
}
export interface V2NIMAIUser extends V2NIMUser {
    /**
     * 大模型的类型
     */
    modelType: V2NIMAIModelType;
    /**
     * 模型相关配置信息
     */
    modelConfig?: V2NIMAIModelConfig;
}
export interface V2NIMAIModelConfig {
    /**
     * 具体大模型版本模型名称
     */
    model: string;
    /**
     * 提示词
     */
    prompt: string;
    /**
     * 提示词相关的变量
     */
    promptKeys?: string[];
    /**
     * 模型最大tokens数量
     */
    maxTokens?: number;
    /**
     * 核采样方法的概率阈值
     */
    topP?: string;
    /**
     * 随机性和多样性的程度值
     */
    temperature?: string;
}
export declare const enum V2NIMAIModelType {
    /**
     * 未知
     */
    V2NIM_AI_MODEL_TYPE_UNKNOW = 0,
    /**
     * 通义千问大模型
     */
    V2NIM_AI_MODEL_TYPE_QWEN = 1,
    /**
     * 微软Azure
     */
    V2NIM_AI_MODEL_TYPE_AZURE = 2,
    /**
     * 私有本地大模型
     */
    V2NIM_AI_MODEL_TYPE_PRIVATE = 3
}
export interface V2NIMProxyAIModelCallParams {
    /**
     * 机器人账号ID
     */
    accountId: string;
    /**
     * 请求id
     *
     * 注: 需要用请求 id 将整个串联应答流程, 建议采用 uuid 算法避免重复
     */
    requestId: string;
    /**
     * 请求大模型的内容
     */
    content: V2NIMAIModelCallContent;
    /**
     * 请求调用上下文内容
     */
    messages?: V2NIMAIModelCallMessage[];
    /**
     * 提示词变量占位符替换. JSON 序列化的字符串, 用于填充 prompt 中的变量
     *
     * 注: 如果 V2NIMAIUser 中的 modelConfig.promptKeys 存在且数组长度不为 0 ，则必填.
     */
    promptVariables?: string;
    /**
     * 请求接口模型相关参数配置， 如果参数不为空，则默认覆盖控制相关配置
     */
    modelConfigParams?: V2NIMAIModelConfigParams;
    /**
     * 反垃圾配置
     */
    antispamConfig?: V2NIMProxyAICallAntispamConfig;
}
export interface V2NIMProxyAICallAntispamConfig {
    /**
     * 指定消息是否需要经过安全通。默认为 true
     *
     * 对于已开通安全通的用户有效，默认消息都会走安全通，如果对单条消息设置 enable 为 false，则此消息不会走安全通
     */
    antispamEnabled?: boolean;
    /**
     * 指定易盾业务id
     */
    antispamBusinessId?: string;
}
/**
 * AI 大模型配置
 */
export interface V2NIMAIModelConfigParams {
    /**
     * 提示词
     */
    prompt?: string;
    /**
     * 模型最大tokens数量
     */
    maxTokens?: number;
    /**
     * 核采样方法的概率阈值
     */
    topP?: string;
    /**
     * 随机性和多样性的程度值
     */
    temperature?: string;
}
export interface V2NIMAIModelCallMessage {
    /**
     * 上下文内容的角色.
     *
     * 注: 请开发者自行判定自己发的消息选 user, 若是机器人发的消息是选 assistant
     */
    role: V2NIMAIModelRoleType;
    /**
     * 请求/响应的文本内容
     */
    msg: string;
    /**
     * 类型, 暂时只有 0, 代表文本
     */
    type: number;
}
export declare const enum V2NIMAIModelRoleType {
    /**
     * 系统
     */
    V2NIM_AI_MODEL_ROLE_TYPE_SYSTEM = "system",
    /**
     * 用户
     */
    V2NIM_AI_MODEL_ROLE_TYPE_USER = "user",
    /**
     * 助手
     */
    V2NIM_AI_MODEL_ROLE_TYPE_ASSISTANT = "assistant"
}
export interface V2NIMAIModelCallContent {
    /**
     * 请求/响应的文本内容
     */
    msg: string;
    /**
     * 类型, 暂时只有 0, 代表文本
     */
    type: number;
}
/**
 * AI 透传接口的响应的回调的结构体
 */
export interface V2NIMAIModelCallResult {
    /**
     * 本次响应的状态, 200 为成功, 其他的都是失败
     */
    code: number;
    /**
     * 机器人账号 ID
     */
    accountId: string;
    /**
     * 请求 ID
     */
    requestId: string;
    /**
     * 响应的内容
     */
    content: V2NIMAIModelCallContent;
}
/**
 * AI 数字人服务的监听事件
 *
 * 注: 使用 dist/esm 产物时时，需要动态引入 V2NIMAIService 后使用
 *
 */
export interface V2NIMAIListener extends NIMEBaseListener {
    /**
     * AI 透传接口的响应的回调
     *
     * 注: 接口 proxyAIModelCall 调用完毕后, 接下来服务器响应以通知的形式下发, 端测需要触发回调提供
     *
     * @param response 本次响应的结构体
     */
    onProxyAIModelCall: [
        response: V2NIMAIModelCallResult
    ];
}
