import deviceInfo from "@ohos.deviceInfo";
export class ReporterEventCommonInfo {
    constructor(v100, w100, x100, y100, z100, a101) {
        this.app_key = v100;
        this.sdk_ver = w100;
        this.bundle_id = x100;
        this.env = y100;
        this.manufacture = deviceInfo.manufacture;
        this.model = deviceInfo.marketName;
        this.os_name = deviceInfo.osFullName;
        this.os_ver = deviceInfo.displayVersion;
        this.dev_id = deviceInfo.ODID;
        this.platform = 'HarmonyOS';
        this.net_type = z100;
        this.user_id = a101;
    }
}
