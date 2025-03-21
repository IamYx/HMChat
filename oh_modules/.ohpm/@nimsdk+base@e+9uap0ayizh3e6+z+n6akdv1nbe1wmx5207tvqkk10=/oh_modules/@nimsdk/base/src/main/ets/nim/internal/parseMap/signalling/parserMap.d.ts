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
export declare const serviceName = "signallingService";
export declare const cmdMap: CmdMap;
export declare const createParamsTag: SerializeItem;
export declare const createResponseTag: SerializeItem;
export declare const delayParamsTag: SerializeItem;
export declare const delayResponseTag: SerializeItem;
export declare const closeParamsTag: SerializeItem;
export declare const joinParamsTag: SerializeItem;
export declare const joinResponseTag: SerializeItem;
export declare const leaveParamsTag: SerializeItem;
export declare const inviteParamsTag: SerializeItem;
export declare const cancelInviteParamsTag: SerializeItem;
export declare const rejectParamsTag: SerializeItem;
export declare const acceptParamsTag: SerializeItem;
export declare const ctrlParamsTag: SerializeItem;
export declare const getChannelInfoParamsTag: SerializeItem;
export declare const getChannelInfoResponseTag: SerializeItem;
export declare const callParamsTag: SerializeItem;
export declare const callResponseTag: SerializeItem;
export declare const joinAndAcceptParamsTag: SerializeItem;
export declare const joinAndAcceptResponseTag: SerializeItem;
export declare const cmdConfig: CmdConfigMap;
export declare const serializeTag: {};
