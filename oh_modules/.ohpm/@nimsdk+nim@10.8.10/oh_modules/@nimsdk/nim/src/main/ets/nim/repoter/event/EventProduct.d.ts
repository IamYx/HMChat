import { ReporterData, ReporterEvent, ReporterEventTag } from "@nimsdk/base";
export interface EventProduct {
    operation(tag: ReporterEventTag, data: ReporterData): ReporterEvent;
}
