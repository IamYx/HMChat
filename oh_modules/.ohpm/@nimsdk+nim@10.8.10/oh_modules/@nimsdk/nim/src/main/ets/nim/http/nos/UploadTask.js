import { CustomError } from '@nimsdk/base';
import { getOffset } from './GetOffSet';
import uploadTrunk from './uploadTrunk';
import { ResourceTraceReporter, ResourceTraceStep } from './ResourceTraceReporter';
export class UploadTask {
    constructor(c62, d62, e62, f62, g62) {
        this.uploadState = 'paused';
        this.config = e62;
        this.file = c62;
        this.param = d62;
        this.appKey = g62.options.appkey;
        this.fileState = f62;
        this.fileKey = this.fileState.initFile(d62, c62, this.config.enableCache);
        this.reporter = new ResourceTraceReporter(0, g62);
        this.resume();
    }
    resume() {
        if (this.uploadState === 'uploading') {
            return;
        }
        this.setUploadState('uploading');
        const u61 = this.config;
        console.info('resume:: config', JSON.stringify(u61));
        getOffset(this, u61.retryCount, (v61) => {
            console.info('resume:: getOffset', JSON.stringify(v61));
            this.reporter.updateReporterTrace(ResourceTraceStep.start, {
                startTime: Date.now(),
                offset: v61
            });
            uploadTrunk(this, v61, u61.retryCount, (a62, b62) => {
                console.info('resume:: uploadTrunk');
                this.reporter.updateReporterTrace(ResourceTraceStep.success, {
                    total: b62,
                    url: a62
                });
                this.setUploadState('ended');
                if (typeof u61.onComplete === 'function') {
                    u61.onComplete(this.param);
                }
            }, (z61) => {
                if (typeof u61.onUploadProgress === 'function') {
                    this.reporter.updateReporterTrace(ResourceTraceStep.uploading, {
                        total: z61.total,
                        transferred: z61.loaded
                    });
                    u61.onUploadProgress(z61);
                }
            }, (w61, x61, y61) => {
                this.reporter.updateReporterTrace(ResourceTraceStep.failed, {
                    url: w61,
                    total: x61,
                    description: y61
                });
            }, this.fileState, this.appKey);
        }, this.fileState);
    }
    pause() {
        this.setUploadState('paused');
    }
    abort() {
        if (this.uploadState !== 'ended' && this.uploadState !== 'abort') {
            this.setUploadState('abort');
            this.fileState.removeFileInfo(this.fileKey);
            this.config.onError(new CustomError(`Upload Aborted`, 10499, 10499));
            this.reporter.updateReporterTrace(ResourceTraceStep.abort, {
                description: 'Upload Aborted, 10499'
            });
        }
    }
    setContext(t61) {
        this.fileState.setUploadContext(this.fileKey, t61, this.config.enableCache);
        this.param.ctx = t61;
    }
    setComplete() {
        this.fileState.setComplete(this.fileKey, this.config.enableCache);
        this.setUploadState('ended');
    }
    setUploadState(s61) {
        if (s61 !== this.uploadState) {
            this.uploadState = s61;
        }
    }
}
