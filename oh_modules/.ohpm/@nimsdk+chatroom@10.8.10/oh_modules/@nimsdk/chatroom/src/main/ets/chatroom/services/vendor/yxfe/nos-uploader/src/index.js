import Config from './Config';
import Task from './Task';
const NosUploader = {
    maxFileCache: 6,
    expireTime: 1000 * 60 * 60 * 24,
    getFileUploadInformation: (w175, x175) => {
        const y175 = x175.getFileKey(w175);
        const z175 = x175.getFileInfo(y175);
        if (z175 === null) {
            return null;
        }
        else if (Date.now() - z175.modifyAt > NosUploader.expireTime) {
            x175.removeFileInfo(y175);
            return null;
        }
        else {
            return {
                uploadInfo: {
                    bucketName: z175.bucketName,
                    objectName: z175.objectName,
                    token: z175.token,
                    ctx: z175.ctx,
                    ...(z175.payload ? {
                        payload: z175.payload
                    } : {})
                },
                complete: z175.end
            };
        }
    },
    setMaxFileCache: (v175) => {
        NosUploader.maxFileCache = v175;
    },
    setExpireTime: (u175) => {
        NosUploader.expireTime = u175;
    },
    printCaches: () => {
    },
    createConfig: (t175) => {
        return new Config(t175);
    },
    createTask: (p175, q175, r175, s175) => {
        return new Task(p175, q175, r175, s175);
    }
};
export default NosUploader;
