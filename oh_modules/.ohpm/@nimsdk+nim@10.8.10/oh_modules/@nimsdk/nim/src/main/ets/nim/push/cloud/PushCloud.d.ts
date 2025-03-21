import { NIM } from '@nimsdk/base';
export declare class PushCloud {
    core: NIM;
    constructor(g95: NIM);
    doSendPushToken(z94: string, a95: string, b95: string): Promise<void>;
}
