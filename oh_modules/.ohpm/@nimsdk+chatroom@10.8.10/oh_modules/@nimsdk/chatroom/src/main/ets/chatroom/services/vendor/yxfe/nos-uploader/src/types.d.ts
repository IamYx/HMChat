export interface IUploadInfo {
    bucketName: string;
    objectName: string;
    token: string;
    md5?: string;
    ctx?: string;
    payload?: any;
    type?: 'image' | 'audio' | 'video' | 'file';
}
export interface IFileInfo extends IUploadInfo {
    ctx: string;
    modifyAt: number;
    end: boolean;
}
