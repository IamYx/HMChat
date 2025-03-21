import { V2NIMLoginAuthType } from '../../sdk/loginTypes';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import { V2NIMChatroomEnterParams } from '../../sdk/V2NIMChatroomService';
export declare class CRLoginParams {
    core: V2NIMChatroomClient;
    roomId: string;
    token: string;
    loginExt: string;
    authType: V2NIMLoginAuthType;
    linkAddresses: string[];
    currLinkIdx: number;
    isAnonymous: boolean;
    enterParams?: V2NIMChatroomEnterParams;
    connectParams: {
        forceMode: boolean;
    };
    constructor(q9: V2NIMChatroomClient);
    checkIsSameLogin(h9: string, i9: string, j9: V2NIMChatroomEnterParams): boolean;
    getNextLink(): string;
    getCurrLink(): string;
    setParams(e9: string, f9: string, g9: V2NIMChatroomEnterParams): Promise<void>;
    updateDynamicParameters(b9: boolean): Promise<void>;
    updateLinkAddress(): Promise<void>;
    reset(): void;
    checkLoginTerminalCode(y8: number): boolean;
}
