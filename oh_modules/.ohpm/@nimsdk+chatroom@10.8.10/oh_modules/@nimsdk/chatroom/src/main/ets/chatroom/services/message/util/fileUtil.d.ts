import { UploadFileResult, V2NIMMessageAttachment, V2NIMMessageType } from '@nimsdk/base';
import V2NIMChatroomClient from '../../../V2NIMChatroomClient';
import CRMessageServiceImpl from '../CRMessageServiceImpl';
import { V2NIMChatroomMessage } from '../../../sdk/types';
export default class FileUtil {
    core: V2NIMChatroomClient;
    service: CRMessageServiceImpl;
    constructor(d34: V2NIMChatroomClient, e34: CRMessageServiceImpl);
    /**
     * 上传文件。文件上传过程中，触发 onProgress 回调
     */
    doSendFile(w33: Partial<V2NIMChatroomMessage>, x33?: (percentage: number) => void): Promise<void>;
    /**
     * 取消文件类附件上传。
     *
     * 取消上传流程：
     * - 1. 如果还未触发 onUploadStart 回调，则先记录 abort = true，然后在 onUploadStart 回调中处理
     * - 2. 如果已经触发了 onUploadStart 回调，则利用回调中的 task.abort 取消上传
     */
    cancelMessageAttachmentUpload(v33: V2NIMChatroomMessage): Promise<void>;
}
export declare function completeCRAttachment(p33: Partial<V2NIMChatroomMessage>, q33: UploadFileResult): void;
export declare function compatibleCRAttachmentRawWithV1(g33: V2NIMMessageAttachment, h33: V2NIMMessageType): string;
export declare function attachmentToRaw(e33: V2NIMMessageType, f33: Partial<V2NIMMessageAttachment>): string;
