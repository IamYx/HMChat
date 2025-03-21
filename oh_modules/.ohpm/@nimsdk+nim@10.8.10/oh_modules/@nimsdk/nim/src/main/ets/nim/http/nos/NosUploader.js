import { NosConfig } from './NosConfig';
import { UploadTask } from './UploadTask';
export const NosUploader = {
    maxFileCache: 6,
    expireTime: 1000 * 60 * 60 * 24,
    getFileUploadInformation: (e61, f61) => {
        const g61 = f61.getFileKey(e61);
        const h61 = f61.getFileInfo(g61);
        if (h61 === null) {
            return null;
        }
        else if (Date.now() - h61.modifyAt > NosUploader.expireTime) {
            f61.removeFileInfo(g61);
            return null;
        }
        else {
            return {
                uploadInfo: {
                    bucketName: h61.bucketName,
                    objectName: h61.objectName,
                    token: h61.token,
                    ctx: h61.ctx,
                    ...(h61.payload ? {
                        payload: h61.payload
                    } : {})
                },
                complete: h61.end
            };
        }
    },
    setMaxFileCache: (d61) => {
        NosUploader.maxFileCache = d61;
    },
    setExpireTime: (c61) => {
        NosUploader.expireTime = c61;
    },
    printCaches: () => {
    },
    createConfig: (b61) => {
        return new NosConfig(b61);
    },
    createTask: (w60, x60, y60, z60, a61) => {
        return new UploadTask(w60, x60, y60, z60, a61);
    }
};
