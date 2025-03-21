import NosUploader from '../src/index';
const requestBucketInfo = (e48, f48) => {
    return fetch(e48.url, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
            AppKey: e48.appkey,
            Nonce: e48.Nonce,
            CurTime: e48.curTime.toString(),
            CheckSum: e48.checksum
        },
        body: JSON.stringify(f48)
    })
        .then((h48) => {
        if (h48.ok) {
            return h48.json();
        }
        else {
            return Promise.reject(h48);
        }
    })
        .then(g48 => {
        if (g48.code !== 200) {
            return Promise.reject(g48);
        }
        else {
            return {
                bucketName: g48.ret.bucket,
                objectName: g48.ret.object,
                token: g48.ret.xNosToken
            };
        }
    });
};
function getUploadInfo(c48, d48) {
    return requestBucketInfo({
        url: `https://vcloud.163.com/app/vod/upload/init`,
        ...c48
    }, {
        originFileName: d48
    });
}
function getAuthParams() {
    const x47 = 'xxxx';
    const y47 = Math.round(Date.now() / 1000);
    const z47 = 'caee83f25bef456b13b4e9f54c8da4c8';
    const a48 = 'b53lsz6996fn';
    const b48 = sha1(a48 + x47 + y47);
    return {
        Nonce: x47,
        curTime: y47,
        appkey: z47,
        checksum: b48
    };
}
function fileChange() {
    const v47 = document.getElementById('resultUrl');
    v47.href = '';
    v47.innerText = '';
    const w47 = document.getElementById('progress');
    w47.innerText = '';
}
function fileUpload() {
    const k47 = document.getElementById('file');
    const l47 = document.getElementById('progress');
    const m47 = k47.files[0];
    const n47 = getAuthParams();
    return getUploadInfo(n47, m47.name)
        .then((o47) => {
        const p47 = NosUploader.createConfig(({
            enableCache: true,
            onError: function (u47) {
                console.error('onError', u47.message, u47);
            },
            onUploadProgress: function (t47) {
                l47.innerText = t47.percentageText;
                console.log('upload progress', t47.percentageText, t47);
            },
            onComplete: function (s47) {
                console.log('onComplete', s47);
                l47.innerText = '上传完成';
                queryUploadFileUrl(s47, n47);
            }
        }));
        NosUploader.setMaxFileCache(5);
        const q47 = NosUploader.getFileUploadInformation(m47);
        let r47;
        if (!q47) {
            r47 = NosUploader.createTask(m47, {
                bucketName: o47.bucketName,
                objectName: o47.objectName,
                token: o47.token,
                payload: new Date().toTimeString(),
            }, p47);
        }
        else if (q47.complete) {
            p47.onComplete({
                bucketName: q47.uploadInfo.bucketName,
                objectName: q47.uploadInfo.objectName,
                token: q47.uploadInfo.token
            });
        }
        else {
            r47 = NosUploader.createTask(m47, q47.uploadInfo, p47);
        }
        window.task = r47;
    });
}
function makeRequest(g47, h47) {
    return fetch(g47.url, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
            AppKey: g47.appkey,
            Nonce: g47.Nonce,
            CurTime: g47.curTime.toString(),
            CheckSum: g47.checksum
        },
        body: JSON.stringify(h47)
    })
        .then((j47) => {
        if (j47.ok) {
            return j47.json();
        }
        else {
            return Promise.reject(j47);
        }
    })
        .then(i47 => {
        if (i47.code !== 200) {
            return Promise.reject(i47);
        }
        else {
            return i47;
        }
    });
}
function queryUploadFileUrl(d47, e47) {
    return queryMediaId(d47, e47)
        .then(f47 => {
        return queryMediaUrl(f47, e47);
    });
}
function queryMediaId(z46, a47) {
    const { objectName: b47 } = z46;
    return makeRequest({
        url: 'https://vcloud.163.com/app/vod/video/query',
        ...a47
    }, {
        objectNames: [b47]
    }).then(c47 => {
        if (c47.ret && Array.isArray(c47.ret.list) && c47.ret.list.length > 0) {
            if (c47.ret.list[0].vid) {
                return c47.ret.list[0].vid;
            }
            else {
                return Promise.reject(`无法获取文件id: ` + JSON.stringify(c47));
            }
        }
    });
}
function queryMediaUrl(t46, u46) {
    const v46 = {
        vid: t46
    };
    return makeRequest({
        url: 'https://vcloud.163.com/app/vod/video/get',
        ...u46
    }, v46)
        .then(w46 => {
        let x46;
        if (w46.ret && w46.ret.origUrl) {
            x46 = w46.ret.origUrl;
        }
        const y46 = document.getElementById('resultUrl');
        if (typeof x46 === 'string') {
            y46.href = x46;
            y46.innerText = x46;
            return { url: x46 };
        }
        else {
            y46.href = '';
            y46.innerText = x46;
            return Promise.reject(`找不到文件的url地址: ${JSON.stringify(w46)}`);
        }
    });
}
function pauseUpload() {
    if (window.task) {
        window.task.pause();
    }
}
function resumeUpload() {
    if (window.task) {
        window.task.resume();
    }
}
function printStorage() {
    NosUploader.printCaches();
}
window.fileUpload = fileUpload;
window.pauseUpload = pauseUpload;
window.resumeUpload = resumeUpload;
window.fileChange = fileChange;
window.printStorage = printStorage;
