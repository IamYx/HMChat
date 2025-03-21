import { CustomError } from './util';
import { NosHeaders } from './const';
import fs from '@ohos.file.fs';
import http from '@ohos.net.http';
import { assign } from '@nimsdk/vendor';
function uploadTrunk(j176, k176, l176, m176, n176, o176) {
    if (j176.uploadState !== 'uploading') {
        return;
    }
    const { param: p176, config: q176 } = j176;
    const r176 = fs.statSync(j176.file.path);
    const s176 = p176.ctx !== undefined ? p176.ctx : '';
    const t176 = (k176 + q176.trunkSize) >= r176.size;
    const u176 = t176 ? r176.size : (k176 + q176.trunkSize);
    const v176 = t176 ? r176.size - k176 : q176.trunkSize;
    const w176 = q176.directUploadAddr
        + `/${p176.bucketName}`
        + `/${p176.objectName}`;
    const x176 = {
        [NosHeaders.NOS_TOKEN]: p176.token,
    };
    if (p176.md5) {
        assign(x176, { [NosHeaders.CONTENT_MD5]: p176.md5 });
    }
    if (p176.type) {
        let i177 = 'application/octet-stream';
        switch (p176.type) {
            case 'image':
                i177 = 'image/jpeg';
                break;
            case 'audio':
                i177 = 'audio/mpeg';
                break;
            case 'video':
                i177 = 'video/mp4';
                break;
            default:
                i177 = 'application/octet-stream';
                break;
        }
        assign(x176, { [NosHeaders.CONTENT_TYPE]: i177 });
    }
    let y176 = fs.openSync(j176.file.path, fs.OpenMode.READ_ONLY);
    let z176 = new ArrayBuffer(v176);
    let a177 = {
        offset: k176,
        length: z176.byteLength
    };
    let b177 = fs.readSync(y176.fd, z176, a177);
    if (b177 != v176) {
        q176.logger.error(`buffer.from mismatch: ${v176} -> ${b177}`);
        return;
    }
    const c177 = {
        method: http.RequestMethod.POST,
        header: x176,
        readTimeout: q176.trunkUploadTimeout,
        connectTimeout: q176.trunkUploadTimeout,
        extraData: z176,
        expectDataType: http.HttpDataType.ARRAY_BUFFER
    };
    console.info('request:: httpRequestOptions', JSON.stringify(c177));
    const d177 = http.createHttp();
    d177.request(w176 + `?offset=${k176}`
        + `&complete=${t176}`
        + `&context=${s176}`
        + `&version=${q176.version}`, c177)
        .then((f177) => {
        console.info('request:: httpResponse', JSON.stringify(f177));
        if (f177.responseCode === 200) {
            let g177;
            try {
                g177 = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(f177.result)));
            }
            catch (h177) {
                if (typeof q176.logger?.error === 'function') {
                    q176.logger.error('JsonParseError in uploadTrunk', h177);
                }
                g177 = {
                    errMsg: 'JsonParseError in uploadTrunk'
                };
            }
            j176.setContext(g177.context);
            if (t176) {
                n176({
                    loaded: r176.size,
                    total: r176.size,
                });
                m176();
                j176.setComplete();
            }
            else {
                n176({
                    loaded: g177.offset,
                    total: r176.size,
                });
                uploadTrunk(j176, g177.offset, q176.retryCount, m176, n176, o176);
            }
        }
        else if (f177.responseCode.toString().match(/^5/)) {
            if (l176 > 0) {
                uploadTrunk(j176, k176, l176 - 1, m176, n176, o176);
            }
            else {
                o176.removeFileInfo(j176.fileKey);
                q176.onError(new CustomError(JSON.stringify(f177.result), f177.responseCode));
            }
        }
        else {
            if (l176 > 0) {
                if (typeof q176.logger?.error === 'function') {
                    q176.logger.error(`uploadTrunk(${w176}) error. retry after 3 seconds. ${new Date().toTimeString()}`);
                }
                setTimeout(() => {
                    uploadTrunk(j176, k176, l176 - 1, m176, n176, o176);
                }, 3500);
            }
            else {
                o176.removeFileInfo(j176.fileKey);
                if (f177.responseCode) {
                    q176.onError(new CustomError(`uploadTrunk(${w176}) error: ${f177.responseCode} ${JSON.stringify(f177.result)}`));
                }
                else {
                    q176.onError(new CustomError(`uploadTrunk(${w176}) error. no Error Code. Please check your network`));
                }
            }
        }
    })
        .catch((e177) => {
        console.log('httpRequest: ' + e177);
        q176.onError(new CustomError(`uploadTrunk(${w176}) exception: ${e177}}`));
    });
}
export default uploadTrunk;
