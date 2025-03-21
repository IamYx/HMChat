export const defaultCloudStorageConfig = {
    chunkUploadHost: 'https://wanproxy-web.127.net',
    chunkMaxSize: 41943040000,
    commonMaxSize: 104857600,
    uploadReplaceFormat: 'https://{host}/{object}',
    cdn: {
        defaultCdnDomain: 'nim.nosdn.127.net',
        cdnDomain: '',
        bucket: '',
        objectNamePrefix: ''
    },
    downloadUrl: 'https://{bucket}-nosdn.netease.im/{object}',
    downloadHostList: ['nos.netease.com'],
    nosCdnEnable: true,
    isNeedToGetUploadPolicyFromServer: true
};
