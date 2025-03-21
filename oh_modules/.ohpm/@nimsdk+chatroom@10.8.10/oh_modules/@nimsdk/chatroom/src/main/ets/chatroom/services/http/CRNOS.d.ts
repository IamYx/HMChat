import { CloudStorageConfig } from './config';
import { UploadFileOptions, UploadFileResult } from '@nimsdk/base';
import { FileState } from '../vendor/yxfe/nos-uploader/src/fileState';
import V2NIMChatroomClient from '../../V2NIMChatroomClient';
export default class CRNOS {
    core: V2NIMChatroomClient;
    nosCdnHostTimer: number;
    nosErrorCount: number;
    config: CloudStorageConfig;
    fileState: FileState;
    constructor(i6: V2NIMChatroomClient);
    reset(): void;
    nosUpload(j5: UploadFileOptions): Promise<UploadFileResult>;
    _getNosCdnHost(): Promise<void>;
    uploadFile(r4: string, s4: any, t4: UploadFileOptions): Promise<UploadFileResult>;
}
