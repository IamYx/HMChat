import { NIMEBaseListener, NIMEBaseServiceInterface } from './types';
import { NIMServiceConfig } from './V2NIMInterface';
/**
 * V2NIMSearchService 模块接口定义
 *
 * 注: v10.5.0 版本开始支持
 */
export interface V2NIMSearchService extends NIMEBaseServiceInterface<V2NIMSearchListener> {
}
/**
 * V2NIMSearchListener 模块监听事件定义
 * 目前 SearchService 没有需要监听的模块
 */
export interface V2NIMSearchListener extends NIMEBaseListener {
}
/**
 * V2NIMFtsListener 模块初始化配置项定义
 * 目前 SearchService 没有需要配置的选项
 */
export interface NIMSearchServiceConfig extends NIMServiceConfig {
}
