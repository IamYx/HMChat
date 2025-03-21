import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import { common } from '@kit.AbilityKit';
import CRLoginServiceImpl from './CRLoginServiceImpl';
import { HashMap } from '@kit.ArkTS';
import { V2NIMChatroomEnterResult } from '../../sdk/V2NIMChatroomClient';
export default class CRLoginAuthenticator {
    context: common.Context;
    core: V2NIMChatroomClient;
    loginService: CRLoginServiceImpl;
    lastLoginClientKey: string;
    lastLoginClientMap: HashMap<string, string>;
    constructor(l8: V2NIMChatroomClient);
    /**
     * 登录鉴权校验. 即发送登录包协议去服务器校验
     *
     * @param isAutoConnect 是否为自动登录
     * @returns 登录端信息
     */
    verifyAuthentication(b8: boolean): Promise<V2NIMChatroomEnterResult>;
    reset(): void;
    checkAutoLogin(): boolean;
    private processLoginFailed;
    private createLoginTags;
    private createChatroomLoginTags;
}
