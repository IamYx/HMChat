import { AccessTokenResult, NIM, UploadFileOptions } from '@nimsdk/base';
import { NosTokenInfo } from './NosToken';
export declare class NosTokenCloud {
    private core;
    constructor(v60: NIM);
    getNosToke(h60: UploadFileOptions): Promise<NosTokenInfo[]>;
    getNosAccessToken(y59: string, z59?: string, a60?: string): Promise<AccessTokenResult>;
    deleteNosAccessToken(u59: string): Promise<void>;
}
