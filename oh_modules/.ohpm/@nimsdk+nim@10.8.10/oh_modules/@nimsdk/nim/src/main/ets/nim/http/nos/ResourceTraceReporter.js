import { ReporterEventFactory } from "../../repoter/event/ReporterEventFactory";
export var ResourceTraceStep;
(function (p61) {
    p61[p61["start"] = 0] = "start";
    p61[p61["uploading"] = 1] = "uploading";
    p61[p61["success"] = 2] = "success";
    p61[p61["failed"] = 3] = "failed";
    p61[p61["abort"] = 4] = "abort";
})(ResourceTraceStep || (ResourceTraceStep = {}));
class ResourceTraceDataModel {
}
export class ResourceTraceReporter {
    constructor(n61, o61) {
        this.resourceModel = new ResourceTraceDataModel();
        this.action = n61;
        this.core = o61;
    }
    updateReporterTrace(l61, m61) {
        switch (l61) {
            case ResourceTraceStep.start:
                this.resourceModel.startTime = m61.startTime;
                this.resourceModel.offset = m61.offset ?? 0;
                break;
            case ResourceTraceStep.uploading:
                this.resourceModel.total = m61.total;
                this.resourceModel.transferred = m61.transferred;
                break;
            case ResourceTraceStep.success:
                this.resourceModel.total ? this.resourceModel.total : m61.total;
                this.resourceModel.url = m61.url;
                this.reportEvent(0);
                break;
            case ResourceTraceStep.failed:
                this.resourceModel.description = m61.description;
                this.resourceModel.url = m61.url;
                this.resourceModel.total ? this.resourceModel.total : m61.total;
                this.reportEvent(1);
                break;
            case ResourceTraceStep.abort:
                this.resourceModel.description = m61.description;
                this.reportEvent(1);
                break;
            default:
                break;
        }
    }
    reportEvent(i61) {
        const j61 = {
            start_time: this.resourceModel.startTime,
            remote_addr: this.resourceModel.url,
            action: this.action,
            duration: Date.now() - this.resourceModel.startTime,
            operation_type: 0,
            state: i61,
            lib_env: this.resourceModel.description,
            offset: this.resourceModel.offset,
            full_size: this.resourceModel.total,
            transferred_size: this.resourceModel.transferred
        };
        const k61 = ReporterEventFactory.createEvent("nim_sdk_resources", j61);
        this.core.reporterService.addBizEvent(k61);
    }
}
