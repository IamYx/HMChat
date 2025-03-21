import { V2NIMChatroomInfo } from '../../sdk/V2NIMChatroomClient';
export default class V2NIMChatroomInfoModel {
    private chatroomInfo;
    setChatroomInfo(t6: V2NIMChatroomInfo): void;
    getChatroomInfo(): V2NIMChatroomInfo | null;
    reset(): void;
}
