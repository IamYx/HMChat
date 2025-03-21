import { NIMServiceConfig } from '@nimsdk/base';
export interface CloudStorageConfig extends NIMServiceConfig {
    /**
     * NOS上传地址（分片）
     */
    chunkUploadHost: string;
    /**
     * 分片上传最大 39 GB
     */
    chunkMaxSize: number;
    /**
     * 普通上传限制大小，100 Mb
     */
    commonMaxSize: number;
    /**
     * 发送文件消息中文件的url的通配符地址，例：'https://{host}/{object}'
     */
    uploadReplaceFormat: string;
    /**
     * 接收到文件消息的替换模版
     * 这个是用来接到消息后，要按一定模式替换掉文件链接的。给予一个安全下载链接。例：'https://{bucket}-nosdn.netease.im/{object}'
     */
    downloadUrl: string;
    /**
     * 收到哪些host地址，需要替换成downloadUrl，例：收到nos.netease.com/{bucket}/{obj}
     */
    downloadHostList: string[];
    /**
     * 服务器下发的域名存在，并且对象前缀匹配成功，那么强行替换为`${protocol}${serverCdnDomain}/${decodePath.slice(prefixIndex)}`
     */
    nosCdnEnable: boolean;
    /**
     * nos cdn domain，生成文件的链接用的。
     */
    cdn: {
        /**
         * 端测设置的默认域名
         */
        defaultCdnDomain: string;
        /**
         * 等服务器 6-26 设置的替换域名，如果是空字符串代表服务器放弃设置用默认的。
         */
        cdnDomain: string;
        bucket: string;
        objectNamePrefix: string;
    };
    /**
     * 是否需要开启融合存储整个策略。默认为 true
     *
     * 注: 为 false 则不会进行 lbs 灰度开关和策略获取，直接退化到老的 nos 上传逻辑。
     */
    isNeedToGetUploadPolicyFromServer: boolean;
}
export declare const defaultCloudStorageConfig: CloudStorageConfig;
