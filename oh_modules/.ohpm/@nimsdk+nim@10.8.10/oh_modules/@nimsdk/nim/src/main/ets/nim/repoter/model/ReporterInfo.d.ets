export declare const enum ReporterTag {
    Login = "login",
    Nos = "nos",
    ChatroomLogin = "chatroomLogin",
    MsgSend = "msgSend",
    MsgReceive = "msgReceive",
    Exceptions = "exceptions",
    Resources = "nim_sdk_resources",
    Sync = "nim_sdk_sync",
    Api = "nim_api_trace",
    Database = "nim_sdk_database_trace",
    Lbs = "nim_sdk_lbs_records"
}
export declare class ReportEventExtension {
    operation_type: number;
    target: string;
    code: number;
    description: string;
    context: string;
    net_type?: number;
    net_connect?: boolean;
    detect_task_id?: string;
    foreground?: boolean;
    foreg_backg_switch?: boolean;
    quick?: boolean;
    constructor(e101: number, f101: string, g101: number, h101: string, i101: string);
}
export declare class ReporterInfo {
    tag: ReporterTag;
    action: number;
    start_time: number;
    user_id?: string;
    state?: number;
    duration?: number;
    extension?: ReportEventExtension[];
    priority?: number;
    trace_id?: string;
    process_id?: string;
    exception_service?: string;
    constructor(b101: ReporterTag, c101: number, d101: number);
}
