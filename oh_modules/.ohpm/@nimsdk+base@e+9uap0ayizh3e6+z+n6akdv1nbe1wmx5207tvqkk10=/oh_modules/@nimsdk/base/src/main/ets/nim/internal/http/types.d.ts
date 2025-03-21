import fs from '@ohos.file.fs';
export interface UploadFileOptions {
    /**
     * File 对象。
     *
     */
    file: fs.File;
    /**
     * maxSize 限制文件大小。
     */
    maxSize?: number;
    /**
     * 存储场景，不传默认实例化配置，默认为"im"
     */
    nosScenes?: string;
    /**
     * 存储有效时间，不传则默认实例化配置
     *
     * 不得小于一天，单位秒
     */
    nosSurvivalTime?: number;
    /**
     * 上传进度
     */
    onUploadProgress?: (obj: UploadFileProgress) => void;
    /**
     * 文件类型
     */
    type?: 'image' | 'audio' | 'video' | 'file';
    /**
     * 文件md5
     */
    md5?: string;
    /**
     * 上传使用token
     */
    nosToken: any;
    /**
     * 上传启动回调
     */
    onUploadStart?: (task: {
        abort: () => void;
        [key: string]: any;
    }) => void;
}
export interface UploadFileProgress {
    /**
     * 总大小
     */
    total: number;
    /**
     * 已上传大小
     */
    loaded: number;
}
export interface UploadFileResult {
    name: string;
    url: string;
    ext: string;
    bucketName: string;
    ctx: string;
    objectName: string;
    token: string;
    type?: string;
    size: number;
    w?: number;
    h?: number;
    dur?: number;
    md5?: string;
}
export interface GetFileTokenOptions {
    /**
     * 类型 2表示带过期时间的全局token鉴权，3表示文件级别的url鉴权
     */
    type: 2 | 3;
    /**
     * 如果type=3,是url鉴权，需要传url数组
     */
    urls?: string[] | string;
}
export interface GetFileTokenResult {
    /**
     * 类型 2表示带过期时间的全局token鉴权，3表示文件级别的url鉴权
     */
    type: 2 | 3;
    /**
     * 如果是url鉴权，就返回url数组对应的tokens
     */
    tokens?: string[];
    /**
     * 基于过期时间鉴权的token
     */
    token?: string;
    /**
     * token的过期时间，单位s
     */
    ttl: number;
}
