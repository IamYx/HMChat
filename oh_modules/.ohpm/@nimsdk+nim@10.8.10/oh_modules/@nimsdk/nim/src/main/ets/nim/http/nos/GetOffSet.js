import { CustomError } from '@nimsdk/base';
import http from '@ohos.net.http';
export function getOffset(y56, z56, a57, b57) {
    if (y56.uploadState !== 'uploading') {
        return;
    }
    const { config: c57, param: d57 } = y56;
    const e57 = b57.getUploadContext(y56.fileKey);
    if (!e57) {
        return a57(0);
    }
    const f57 = c57.directUploadAddr
        + `/${d57.bucketName}`
        + `/${d57.objectName}`
        + '?uploadContext'
        + `&context=${e57}`
        + `&version=${c57.version}`;
    const g57 = {
        header: {
            'x-nos-token': d57.token,
        },
        readTimeout: c57.getOffsetTimeout,
        connectTimeout: c57.getOffsetTimeout,
    };
    let h57 = http.createHttp();
    h57.request(f57, g57).then((i57) => {
        if (i57.responseCode === 200) {
            let j57;
            try {
                j57 = JSON.parse(i57.result);
            }
            catch (k57) {
                j57 = {
                    errMsg: 'JsonParseError in getOffset',
                    errCode: 500
                };
            }
            if (j57.errCode) {
                y56.config.onError(new CustomError(j57.errMsg, j57.errCode));
            }
            else {
                a57(j57.offset);
            }
        }
        else {
            if (i57.responseCode.toString().match(/^5/)) {
                getOffset(y56, z56 - 1, a57, b57);
            }
            else {
                if (z56 > 0) {
                    if (typeof c57.logger?.error === 'function') {
                        c57.logger.error(`getOffset(${f57}) error. retry after 3 seconds. ${new Date().toTimeString()}`);
                    }
                    setTimeout(() => {
                        getOffset(y56, z56 - 1, a57, b57);
                    }, 3500);
                }
                else {
                    b57.removeFileInfo(y56.fileKey);
                    if (i57.responseCode) {
                        c57.onError(new CustomError(`getOffset(${f57}) error: ${i57.responseCode} ${JSON.stringify(i57.result)}`));
                    }
                    else {
                        c57.onError(new CustomError(`getOffset(${f57}) error. no Error Code`));
                    }
                }
            }
        }
    });
}
