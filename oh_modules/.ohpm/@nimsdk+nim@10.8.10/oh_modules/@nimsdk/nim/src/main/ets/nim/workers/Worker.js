import worker from '@ohos.worker';
import { cmdConfigConversation, cmdConfigConversationGroup, cmdConfigCRAntispam, cmdConfigCRHttp, cmdConfigCRInfo, cmdConfigCRLogin, cmdConfigCRMember, cmdConfigCRMessage, cmdConfigCRQueue, cmdConfigFriend, cmdConfigHttp, cmdConfigLocalConversation, cmdConfigLogin, cmdConfigMessage, cmdConfigMessageAntispam, cmdConfigMessageCollect, cmdConfigMessageComment, cmdConfigMessageDelete, cmdConfigMessageGet, cmdConfigMessagePin, cmdConfigMessageReceipt, cmdConfigMessageRevoke, cmdConfigMessageTranslate, cmdConfigNotification, cmdConfigPush, cmdConfigSetting, cmdConfigSignalling, cmdConfigSync, cmdConfigTeam, cmdConfigUser, cmdMapConversation, cmdMapConversationGroup, cmdMapCRAntispam, cmdMapCRHttp, cmdMapCRInfo, cmdMapCRLogin, cmdMapCRMember, cmdMapCRMessage, cmdMapCRQueue, cmdMapFriend, cmdMapHttp, cmdMapLocalConversation, cmdMapLogin, cmdMapMessage, cmdMapMessageAntispam, cmdMapMessageCollect, cmdMapMessageComment, cmdMapMessageDelete, cmdMapMessageGet, cmdMapMessagePin, cmdMapMessageReceipt, cmdMapMessageRevoke, cmdMapMessageTranslate, cmdMapMessageModify, cmdMapNotification, cmdMapPush, cmdMapSetting, cmdMapSignalling, cmdMapSync, cmdMapTeam, cmdMapUser, conflictCmdConfigLogin, conflictCmdMapLogin, cmdConfigMessageModify, cmdMapYSF, cmdConfigYSF, cmdMapPassthrough, cmdConfigPassthrough, cmdMapSubscription, cmdConfigSubscription, cmdMapAI, cmdConfigAI } from '@nimsdk/base';
import { notiCmdMap, parseCmd, registerParser } from '@nimsdk/base';
import { V2NIMErrorCode, V2NIMErrorImpl } from '@nimsdk/base';
import PacketDecoder from '../link/parser/decoder';
const workerPort = worker.workerPort;
let core = undefined;
registerParser(core, { cmdMap: cmdMapCRAntispam, cmdConfig: cmdConfigCRAntispam });
registerParser(core, { cmdMap: cmdMapCRHttp, cmdConfig: cmdConfigCRHttp });
registerParser(core, { cmdMap: cmdMapCRInfo, cmdConfig: cmdConfigCRInfo });
registerParser(core, { cmdMap: cmdMapCRLogin, cmdConfig: cmdConfigCRLogin });
registerParser(core, { cmdMap: cmdMapCRMember, cmdConfig: cmdConfigCRMember });
registerParser(core, { cmdMap: cmdMapCRMessage, cmdConfig: cmdConfigCRMessage });
registerParser(core, { cmdMap: cmdMapCRQueue, cmdConfig: cmdConfigCRQueue });
registerParser(core, { cmdMap: cmdMapLocalConversation, cmdConfig: cmdConfigLocalConversation });
registerParser(core, { cmdMap: cmdMapConversation, cmdConfig: cmdConfigConversation });
registerParser(core, { cmdMap: cmdMapConversationGroup, cmdConfig: cmdConfigConversationGroup });
registerParser(core, { cmdMap: cmdMapFriend, cmdConfig: cmdConfigFriend });
registerParser(core, { cmdMap: cmdMapLogin, cmdConfig: cmdConfigLogin });
registerParser(core, { cmdMap: conflictCmdMapLogin, cmdConfig: conflictCmdConfigLogin });
registerParser(core, { cmdMap: cmdMapMessageAntispam, cmdConfig: cmdConfigMessageAntispam });
registerParser(core, { cmdMap: cmdMapMessageCollect, cmdConfig: cmdConfigMessageCollect });
registerParser(core, { cmdMap: cmdMapMessageComment, cmdConfig: cmdConfigMessageComment });
registerParser(core, { cmdMap: cmdMapMessageDelete, cmdConfig: cmdConfigMessageDelete });
registerParser(core, { cmdMap: cmdMapMessageGet, cmdConfig: cmdConfigMessageGet });
registerParser(core, { cmdMap: cmdMapMessagePin, cmdConfig: cmdConfigMessagePin });
registerParser(core, { cmdMap: cmdMapMessageReceipt, cmdConfig: cmdConfigMessageReceipt });
registerParser(core, { cmdMap: cmdMapMessageRevoke, cmdConfig: cmdConfigMessageRevoke });
registerParser(core, { cmdMap: cmdMapMessageTranslate, cmdConfig: cmdConfigMessageTranslate });
registerParser(core, { cmdMap: cmdMapMessageModify, cmdConfig: cmdConfigMessageModify });
registerParser(core, { cmdMap: cmdMapMessage, cmdConfig: cmdConfigMessage });
registerParser(core, { cmdMap: cmdMapHttp, cmdConfig: cmdConfigHttp });
registerParser(core, { cmdMap: cmdMapPush, cmdConfig: cmdConfigPush });
registerParser(core, { cmdMap: cmdMapNotification, cmdConfig: cmdConfigNotification });
registerParser(core, { cmdMap: cmdMapSetting, cmdConfig: cmdConfigSetting });
registerParser(core, { cmdMap: cmdMapSignalling, cmdConfig: cmdConfigSignalling });
registerParser(core, { cmdMap: cmdMapSync, cmdConfig: cmdConfigSync });
registerParser(core, { cmdMap: cmdMapTeam, cmdConfig: cmdConfigTeam });
registerParser(core, { cmdMap: cmdMapUser, cmdConfig: cmdConfigUser });
registerParser(core, { cmdMap: cmdMapYSF, cmdConfig: cmdConfigYSF });
registerParser(core, { cmdMap: cmdMapPassthrough, cmdConfig: cmdConfigPassthrough });
registerParser(core, { cmdMap: cmdMapSubscription, cmdConfig: cmdConfigSubscription });
registerParser(core, { cmdMap: cmdMapAI, cmdConfig: cmdConfigAI });
workerPort.onmessage = (r152) => {
    try {
        if (typeof r152.data.id === 'string' && r152.data.payload instanceof ArrayBuffer) {
            let t152 = r152.data.id;
            let u152 = r152.data.payload;
            const v152 = new PacketDecoder(u152);
            let w152 = {
                sid: -1,
                cid: -1,
                ser: -1,
                packetLength: -1
            };
            let x152 = null;
            try {
                v152.unmarshalHeader();
                w152 = v152.getHeader();
                x152 = v152.getInnerHeader();
            }
            catch (k153) {
            }
            const y152 = x152 ? x152.sid : w152.sid;
            const z152 = x152 ? x152.cid : w152.cid;
            const a153 = `${y152}_${z152}`;
            const b153 = notiCmdMap[a153];
            if (b153 && b153.length > 0) {
                const c153 = b153[0].config;
                let d153;
                try {
                    d153 = v152.unmarshal(c153.response);
                }
                catch (h153) {
                    v152.reset();
                    const i153 = {
                        ...w152,
                        sid: y152,
                        cid: z152,
                        code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNPACK_ERROR
                    };
                    const j153 = parseCmd(i153, undefined);
                    workerPort.postMessage({ 'id': t152, 'payload': j153 });
                    return;
                }
                const e153 = parseCmd(d153, undefined);
                if (e153) {
                    for (const f153 of e153) {
                        if (f153.error instanceof V2NIMErrorImpl) {
                            f153.error = {
                                name: f153.error.name,
                                code: f153.error.code,
                                desc: f153.error.desc,
                                message: f153.error.message,
                                detail: f153.error.detail
                            };
                        }
                        if (f153.error?.code === 416) {
                            const g153 = v152.unpack.popLong();
                            f153.error.duration = g153;
                        }
                    }
                }
                workerPort.postMessage({ 'id': t152, 'payload': e153 });
            }
            else {
            }
            v152.reset();
        }
    }
    catch (s152) {
    }
};
workerPort.onmessageerror = (q152) => {
};
workerPort.onerror = (p152) => {
};
