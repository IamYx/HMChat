/**
 * packet序列化配置文件
 * 包含四部分部分：
 * - cmdMap（命令映射表），
 * - cmdConfig（命令配置），
 * - serializeMap（序列化对象映射表），
 * - deserializeMap（反序列化对象映射表）
 * 该文件放在子模块文件夹下，文件名统一为parseMap
 */
import { CmdConfigMap, CmdMap, SerializeItem } from '../../../parser';
export declare const serviceName = "settingService";
export declare let cmdMap: CmdMap;
export declare const mobilePushTag: SerializeItem;
export declare const dndConfigTag: SerializeItem;
export declare const cmdConfig: CmdConfigMap;
export declare const serializeTag: {};
