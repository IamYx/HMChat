import { CloudStorageConfig } from '../config';
import { AccessTokenResult, NIM, NIMHttpServiceConfig, UploadFileOptions, UploadFileResult } from '@nimsdk/base';
import { FileState } from './FileState';
import { Queue } from '@kit.ArkTS';
import { NosTokenInfo } from './NosToken';
import { NosTokenCloud } from './NosTokenCloud';
export default class NOS {
    core: NIM;
    nosCdnHostTimer: number;
    nosErrorCount: number;
    config: CloudStorageConfig;
    fileState: FileState;
    tokenQueue: Queue<NosTokenInfo>;
    cloud: NosTokenCloud;
    constructor(g59: NIM, h59: NIMHttpServiceConfig);
    reset(): void;
    nosUpload(h58: UploadFileOptions): Promise<UploadFileResult>;
    getNosAccessToken(e58: string, f58?: string, g58?: string): Promise<AccessTokenResult>;
    deleteNosAccessToken(d58: string): Promise<void>;
    _getNosCdnHost(): Promise<void>;
    uploadFile(l57: string, m57: any, n57: UploadFileOptions): Promise<UploadFileResult>;
}
