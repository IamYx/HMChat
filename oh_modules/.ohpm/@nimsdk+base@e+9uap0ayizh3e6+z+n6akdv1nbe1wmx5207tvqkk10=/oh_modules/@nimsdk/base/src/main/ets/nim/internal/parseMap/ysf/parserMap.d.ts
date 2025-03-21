/**
 * packet序列化配置文件
 * 包含四部分部分：
 * - cmdMap（命令映射表），
 * - cmdConfig（命令配置），
 * - serializeMap（序列化对象映射表），
 * - deserializeMap（反序列化对象映射表）
 * 该文件放在子模块文件夹下，文件名统一为parseMap
 */
import { CmdConfigMap, CmdMap } from '../../../parser';
import { NIMServiceName } from '../../../sdk/types';
export declare const serviceName: NIMServiceName;
export declare const cmdMap: CmdMap;
export declare const cmdConfig: CmdConfigMap;
