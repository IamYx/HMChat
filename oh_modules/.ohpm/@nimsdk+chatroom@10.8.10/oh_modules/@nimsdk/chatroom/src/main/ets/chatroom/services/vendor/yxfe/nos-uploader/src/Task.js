import getOffset from './getOffset';
import uploadTrunk from './uploadTrunk';
import { CustomError } from './util';
class Task {
    constructor(f176, g176, h176, i176) {
        this.uploadState = 'paused';
        this.config = h176;
        this.file = f176;
        this.param = g176;
        this.fileState = i176;
        this.fileKey = this.fileState.initFile(g176, f176, this.config.enableCache);
        this.resume();
    }
    resume() {
        if (this.uploadState === 'uploading') {
            return;
        }
        this.setUploadState('uploading');
        const c176 = this.config;
        console.info('resume:: config', JSON.stringify(c176));
        getOffset(this, c176.retryCount, (d176) => {
            console.info('resume:: getOffset', JSON.stringify(d176));
            uploadTrunk(this, d176, c176.retryCount, () => {
                console.info('resume:: uploadTrunk');
                this.setUploadState('ended');
                if (typeof c176.onComplete === 'function') {
                    c176.onComplete(this.param);
                }
            }, (e176) => {
                if (typeof c176.onUploadProgress === 'function') {
                    c176.onUploadProgress(e176);
                }
            }, this.fileState);
        }, this.fileState);
    }
    pause() {
        this.setUploadState('paused');
    }
    abort() {
        if (this.uploadState !== 'ended' && this.uploadState !== 'abort') {
            this.setUploadState('abort');
            this.fileState.removeFileInfo(this.fileKey);
            this.config.onError(new CustomError(`Upload Aborted`, 10499));
        }
    }
    setUploadState(b176) {
        if (b176 !== this.uploadState) {
            this.uploadState = b176;
        }
    }
    setContext(a176) {
        this.fileState.setUploadContext(this.fileKey, a176, this.config.enableCache);
        this.param.ctx = a176;
    }
    setComplete() {
        this.fileState.setComplete(this.fileKey, this.config.enableCache);
        this.setUploadState('ended');
    }
}
export default Task;
