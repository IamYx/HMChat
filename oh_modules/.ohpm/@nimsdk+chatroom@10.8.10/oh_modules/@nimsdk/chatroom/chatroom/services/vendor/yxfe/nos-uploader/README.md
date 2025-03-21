`web`端`nos`上传工具

## 特性
1. 和nos官方上传sdk相比，不依赖于jquery与md5
2. 支持暂停上传
3. 支持放弃上传
4. 支持直接获取之前上传结果

每次上传时，`NosUploader`会使用`localStorage`为该文件生成一个`key`，然后使用该`key`保存上传的`bucket, object, token, ctx`，以及是否完成，还有用户额外和文件绑定的`payload`信息。每次上传文件前，用户可以调用`NosUploader.getFileUploadInformation`获取文件之前的上传信息，然后选择性的使用之前上传的结果，或者继续使用之前的桶上传。

文件的`key`由文件名，文件上次修改时间，以及文件大小决定。不同文件`key`可能会冲突，但是这只是理论上的可能性。

## 使用示例

```js
import NosUploader from 'nos-uploader'

const config = NosUploader.createConfig(({
    onError: function (err) {
        console.error('onError', err)
    },
    // 废弃，请使用 onUploadProgress 替代
    onProgress: function (progress) {
        console.log('progress', (progress * 100).toFixed(2) + '%')
    },
    onUploadProgress: function(progressEvent) {
        console.log('upload progress', progressEvent.total, progressEvent.loaded, progressEvent.percentage)
    },
    onComplete: function(param) {
        console.log('complete', param)
    }
}))

/**
 * 查询文件之前的上传情况
 */
const info = NosUploader.getFileUploadInformation(file)
let task

if (!info) {
    /**
     * 未查询到该文件
     */
    fetch('xxxx')
    .then(({bucket, obj, token}) => {
        /**
         * 获取nos上传凭证
         */
        task = NosUploader.createTask(
            file, 
            {
                bucketName: bucket,
                objectName: obj,
                token: token
            }, 
            config
        )
    })
} else if (info.complete) {
    /**
     * 文件已上传，直接使用之前上传的地址
     */
    config.onComplete({
        bucketName: info.uploadInfo.bucketName,
        objectName: info.uploadInfo.objectName,
        token: info.uploadInfo.token
    })
} else {
    /**
     * 断点续传
     */
    task = NosUploader.createTask(file, info.uploadInfo, config)
}
```

## API

### NosUploader.createConfig
生成配置对象

```js
const config = NosUploader.createConfig(opts: Partial<{
    //直传地址，默认为'https://wanproxy-web.127.net'
    directUploadAddr: string
    //每个请求重试次数，默认为2次
    retryCount: number
    //默认4MB
    trunkSize: number
    //默认50s
    trunkUploadTimeout: number
    //默认10s
    getOffsetTimeout: number
    onError: Function
    // 废弃，请使用 onUploadProgress 替代
    onProgress: Function
    onUploadProgress: Function
    onComplete: Function
}>)
```

### NosUploader.createTask
生成一次上传任务

```js
const task = NosUploader.createTask(
    file: File,
    param: {
        /**
         * 如果是上传到新的object中，ctx可以不加，或者设置为''
         * payload会随着
         */
        bucketName: string
        objectName: string
        token: string
        ctx: string
        payload?: any
    }, 
    config: Config
)
```

#### task.pause
暂停上传

#### task.resume
恢复上传

#### task.abort
放弃上传。调用此函数会在`localStorage`中删除上传记录


### NosUploader.getFileUploadInformation
返回文件之前上传的记录。根据这些信息，用户可以直接使用之前的上传结果，或者断点续传

```js
getFileUploadInformation: (file: File): null | {
    uploadInfo: {
        bucketName: string
        objectName: string
        token: string
        ctx: string
        payload?: any
    },
    complete: boolean
}
```

### NosUploader.setMaxFileCache
设置最多缓存多少个文件记录。默认为100

```js
setMaxFileCache(count: number)
```

### NosUploader.setExpireTime
设置缓存过期时间。单位为ms

```js
setExpireTime(time: number)
```
