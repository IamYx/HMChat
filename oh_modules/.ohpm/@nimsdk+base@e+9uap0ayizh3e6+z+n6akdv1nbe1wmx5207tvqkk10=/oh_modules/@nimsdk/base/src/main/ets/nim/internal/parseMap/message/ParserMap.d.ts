import { CmdConfigMap, CmdMap } from '../../../parser';
import { NIMServiceName } from '../../../sdk/types';
export declare const serviceName: NIMServiceName;
export declare let cmdMap: CmdMap;
export declare const messageTagInverted: import("../../../parser").DeSerializeItem;
export declare const cmdConfig: CmdConfigMap;
export declare const serializeTag: {
    messageTag: import("../../../parser").SerializeItem;
    systemMsgTag: import("../../../parser").SerializeItem;
    deleteMessageTag: import("../../../parser").SerializeItem;
    clearHistoryMessageTag: import("../../../parser").SerializeItem;
};
