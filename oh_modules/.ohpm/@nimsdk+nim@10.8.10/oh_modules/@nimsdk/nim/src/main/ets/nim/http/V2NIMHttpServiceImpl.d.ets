import { AccessTokenResult, NIM, NIMEBaseListener, NIMRequestExtraParams, NIMRequestResult, NIMServiceConfig, NIMServiceName, UploadFileOptions, UploadFileResult, V2NIMHttpServiceInternal, V2Service } from '@nimsdk/base';
import http from '@ohos.net.http';
export declare class V2NIMHttpServiceImpl extends V2Service<NIMEBaseListener> implements V2NIMHttpServiceInternal {
    private nos;
    private httpSession;
    constructor(v65: NIM, w65: NIMServiceName, x65: NIMServiceConfig);
    onLoginStart(u65: string): Promise<void>;
    onLoginFinished(t65: string): Promise<void>;
    onLogout(): void;
    request(q65: string, r65?: http.HttpRequestOptions, s65?: NIMRequestExtraParams): Promise<NIMRequestResult>;
    getNosAccessToken(n65: string, o65?: string | undefined, p65?: string | undefined): Promise<AccessTokenResult>;
    deleteNosAccessToken(m65: string): Promise<void>;
    uploadFile(l65: UploadFileOptions): Promise<UploadFileResult>;
    getOriginUrl(i65: string): Promise<string>;
}
