import http from '@ohos.net.http';
import { V2InternalService } from '../V2NIMInternalService';
import { CloudStorageServiceInterface } from './CloudStorageServiceInterface';
export interface V2NIMHttpServiceInternal extends V2InternalService, CloudStorageServiceInterface {
    request(url: string, options?: http.HttpRequestOptions, nimExtraParams?: NIMRequestExtraParams): Promise<NIMRequestResult>;
    getNosAccessToken(url: string, userAgent?: string, ext?: string): Promise<AccessTokenResult>;
    deleteNosAccessToken(token: string): Promise<void>;
}
export interface NIMRequestExtraParams {
    exception_service?: number;
}
export interface AccessTokenResult {
    token: string;
    url: string;
}
export interface NIMRequestResult {
    code: number;
    data: string | ArrayBuffer;
    headers: Object;
    [key: string]: any;
}
