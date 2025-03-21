import http from '@ohos.net.http';
import { NIMEBaseListener, NIMRequestExtraParams, NIMRequestResult, UploadFileOptions, UploadFileResult } from '@nimsdk/base';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
import CRBaseService from '../base/CRBaseService';
export declare class CRHttpServiceImpl extends CRBaseService<NIMEBaseListener> {
    private nos;
    constructor(q4: V2NIMChatroomClient);
    request(i4: string, j4?: http.HttpRequestOptions, k4?: NIMRequestExtraParams): Promise<NIMRequestResult>;
    uploadFile(h4: UploadFileOptions): Promise<UploadFileResult>;
    getOriginUrl(e4: string): Promise<string>;
}
