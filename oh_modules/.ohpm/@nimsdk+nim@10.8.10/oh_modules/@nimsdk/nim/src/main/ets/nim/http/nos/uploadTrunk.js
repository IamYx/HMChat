import fs from '@ohos.file.fs';
import http from '@ohos.net.http';
import { assign } from '@nimsdk/vendor/Index';
import { CustomError, NosHeaders } from './UploadModel';
import deviceInfo from '@ohos.deviceInfo';
import { IM_SDK_VERSION } from '@nimsdk/base';
function uploadTrunk(h62, i62, j62, k62, l62, m62, n62, o62) {
    if (h62.uploadState !== 'uploading') {
        return;
    }
    const { param: p62, config: q62 } = h62;
    const r62 = fs.statSync(h62.file.path);
    const s62 = p62.ctx !== undefined ? p62.ctx : '';
    const t62 = (i62 + q62.trunkSize) >= r62.size;
    const u62 = t62 ? r62.size : (i62 + q62.trunkSize);
    const v62 = t62 ? r62.size - i62 : q62.trunkSize;
    const w62 = q62.directUploadAddr
        + `/${p62.bucketName}`
        + `/${p62.objectName}`;
    const x62 = {
        [NosHeaders.NOS_TOKEN]: p62.token,
    };
    if (p62.md5) {
        assign(x62, { [NosHeaders.CONTENT_MD5]: p62.md5 });
    }
    if (p62.type) {
        let j63 = 'application/octet-stream';
        switch (p62.type) {
            case 'image':
                j63 = 'image/jpeg';
                break;
            case 'audio':
                j63 = 'audio/mpeg';
                break;
            case 'video':
                j63 = 'video/mp4';
                break;
            default:
                j63 = 'application/octet-stream';
                break;
        }
        assign(x62, { [NosHeaders.CONTENT_TYPE]: j63 });
    }
    assign(x62, { ['user-agent']: `NIM/HOS/${deviceInfo.manufacture}/${deviceInfo.osFullName}/${IM_SDK_VERSION}/${o62}` });
    let y62 = fs.openSync(h62.file.path, fs.OpenMode.READ_ONLY);
    let z62 = new ArrayBuffer(v62);
    let a63 = {
        offset: i62,
        length: z62.byteLength
    };
    let b63 = fs.readSync(y62.fd, z62, a63);
    if (b63 != v62) {
        q62.logger.error(`buffer.from mismatch: ${v62} -> ${b63}`);
        return;
    }
    const c63 = {
        method: http.RequestMethod.POST,
        header: x62,
        readTimeout: q62.trunkUploadTimeout,
        connectTimeout: q62.trunkUploadTimeout,
        extraData: z62,
        expectDataType: http.HttpDataType.ARRAY_BUFFER
    };
    console.info('request:: httpRequestOptions', JSON.stringify(c63));
    const d63 = http.createHttp();
    let e63;
    if (s62) {
        e63 = w62 + `?offset=${i62}` + `&complete=${t62}` + `&context=${s62}` + `&version=${q62.version}`;
    }
    else {
        e63 = w62 + `?offset=${i62}` + `&complete=${t62}` + `&version=${q62.version}`;
    }
    d63.request(e63, c63)
        .then((g63) => {
        console.info('request:: httpResponse', JSON.stringify(g63));
        if (g63.responseCode === 200) {
            let h63;
            try {
                h63 = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(g63.result)));
            }
            catch (i63) {
                if (typeof q62.logger?.error === 'function') {
                    q62.logger.error('JsonParseError in uploadTrunk', i63);
                }
                h63 = {
                    errMsg: 'JsonParseError in uploadTrunk'
                };
            }
            h62.setContext(h63.context);
            if (t62) {
                l62({
                    loaded: r62.size,
                    total: r62.size,
                });
                k62(e63, r62.size);
                h62.setComplete();
            }
            else {
                l62({
                    loaded: h63.offset,
                    total: r62.size,
                });
                uploadTrunk(h62, h63.offset, q62.retryCount, k62, l62, m62, n62, o62);
            }
        }
        else if (g63.responseCode.toString().match(/^5/)) {
            if (j62 > 0) {
                uploadTrunk(h62, i62, j62 - 1, k62, l62, m62, n62, o62);
            }
            else {
                n62.removeFileInfo(h62.fileKey);
                m62(w62, r62.size, JSON.stringify(g63));
                q62.onError(new CustomError(JSON.stringify(g63.result), g63.responseCode));
            }
        }
        else {
            if (j62 > 0) {
                if (typeof q62.logger?.error === 'function') {
                    q62.logger.error(`uploadTrunk(${w62}) error. retry after 3 seconds. ${new Date().toTimeString()}`);
                }
                setTimeout(() => {
                    uploadTrunk(h62, i62, j62 - 1, k62, l62, m62, n62, o62);
                }, 3500);
            }
            else {
                n62.removeFileInfo(h62.fileKey);
                if (g63.responseCode) {
                    q62.onError(new CustomError(`uploadTrunk(${w62}) error: ${g63.responseCode} ${JSON.stringify(g63.result)}`));
                }
                else {
                    q62.onError(new CustomError(`uploadTrunk(${w62}) error. no Error Code. Please check your network`));
                }
                m62(w62, r62.size, JSON.stringify(g63));
            }
        }
    })
        .catch((f63) => {
        console.log('httpRequest: ' + f63);
        q62.onError(new CustomError(`uploadTrunk(${w62}) exception: ${f63}}`));
        m62(w62, r62.size, JSON.stringify(f63));
    });
}
export default uploadTrunk;
