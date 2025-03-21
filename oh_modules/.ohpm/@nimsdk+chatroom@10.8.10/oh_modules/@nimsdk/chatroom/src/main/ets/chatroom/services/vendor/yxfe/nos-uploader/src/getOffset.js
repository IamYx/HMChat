import { CustomError } from './util';
import http from '@ohos.net.http';
function getOffset(c175, d175, e175, f175) {
    if (c175.uploadState !== 'uploading') {
        return;
    }
    const { config: g175, param: h175 } = c175;
    const i175 = f175.getUploadContext(c175.fileKey);
    if (!i175) {
        return e175(0);
    }
    const j175 = g175.directUploadAddr
        + `/${h175.bucketName}`
        + `/${h175.objectName}`
        + '?uploadContext'
        + `&context=${i175}`
        + `&version=${g175.version}`;
    const k175 = {
        header: {
            'x-nos-token': h175.token,
        },
        readTimeout: g175.getOffsetTimeout,
        connectTimeout: g175.getOffsetTimeout,
    };
    let l175 = http.createHttp();
    l175.request(j175, k175).then((m175) => {
        if (m175.responseCode === 200) {
            let n175;
            try {
                n175 = JSON.parse(m175.result);
            }
            catch (o175) {
                n175 = {
                    errMsg: 'JsonParseError in getOffset',
                    errCode: 500
                };
            }
            if (n175.errCode) {
                c175.config.onError(new CustomError(n175.errMsg, n175.errCode));
            }
            else {
                e175(n175.offset);
            }
        }
        else {
            if (m175.responseCode.toString().match(/^5/)) {
                getOffset(c175, d175 - 1, e175, f175);
            }
            else {
                if (d175 > 0) {
                    if (typeof g175.logger?.error === 'function') {
                        g175.logger.error(`getOffset(${j175}) error. retry after 3 seconds. ${new Date().toTimeString()}`);
                    }
                    setTimeout(() => {
                        getOffset(c175, d175 - 1, e175, f175);
                    }, 3500);
                }
                else {
                    f175.removeFileInfo(c175.fileKey);
                    if (m175.responseCode) {
                        g175.onError(new CustomError(`getOffset(${j175}) error: ${m175.responseCode} ${JSON.stringify(m175.result)}`));
                    }
                    else {
                        g175.onError(new CustomError(`getOffset(${j175}) error. no Error Code`));
                    }
                }
            }
        }
    });
}
export default getOffset;
