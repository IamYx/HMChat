export function getUploadResponseFormat(l6 = 'file') {
    const m6 = responseBodyMap[l6] || {};
    return JSON.stringify(m6).replace(/"/gi, '\\"');
}
export const responseBodyMap = {
    file: {
        md5: '$(Etag)',
        size: '$(ObjectSize)'
    },
    image: {
        md5: '$(Etag)',
        size: '$(ObjectSize)',
        w: '$(ImageInfo.Width)',
        h: '$(ImageInfo.Height)',
        orientation: '$(ImageInfo.Orientation)'
    },
    audio: {
        md5: '$(Etag)',
        size: '$(ObjectSize)',
        dur: '$(AVinfo.Audio.Duration)'
    },
    video: {
        md5: '$(Etag)',
        size: '$(ObjectSize)',
        dur: '$(AVinfo.Video.Duration)',
        w: '$(AVinfo.Video.Width)',
        h: '$(AVinfo.Video.Height)'
    }
};
