export interface ExceptionData {
    code: number;
    action?: number;
    description?: string;
    context: string;
    operationType: number;
    target: string;
    timestamp?: number;
}
export interface ApiData {
    class_name: string;
    api_name: string;
    duration?: number;
    error_msg?: string;
    lag?: number;
    error_code?: number;
    state?: number;
    action?: number;
}
export interface LoginData {
    user_id: string;
    duration?: number;
    start_time: number;
    succeed?: boolean;
    error_msg?: string;
    error_code?: number;
    state?: number;
    action?: string;
    operation_type: string;
    target: string;
    code: number;
    description: string;
    context?: string;
    mixlink: boolean;
}
export interface ResourceData {
    duration?: number;
    start_time: number;
    action?: number;
    state?: number;
    operation_type: number;
    remote_addr: string;
    offset: number;
    full_size: number;
    transferred_size: number;
    lib_env?: string;
}
export interface DBData {
    class_name: string;
    db: string;
    api_name: string;
    duration?: number;
    error_msg?: string;
    lag?: number;
    error_code?: number;
    state?: number;
    action?: number;
}
export interface SyncData {
    user_id: string;
    start_time: number;
    sync_begin_time: number;
    sync_duration: number;
    sync_end_time: number;
    description: string;
    action: number;
}
export interface SyncExtensionData {
    code: number;
    action?: number;
    description?: string;
    context: string;
    operationType: number;
    target: string;
    timestamp?: number;
}
export type ReporterData = ExceptionData | ApiData | DBData | LoginData | ResourceData | SyncData;
/**
 * 数据平台对应的TAG
 */
export declare const enum ReporterEventTag {
    Login = "login",
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
export declare const enum ExceptionAction {
    /**
     * webSocket 长链接相关操作，OperationType = 0
     */
    Websocket = 0,
    /**
     * HTTP 相关操作
     * OperationType => get = 0 post = 1
     */
    HTTP = 1,
    Business = 2,
    Library = 3,
    /**
     * 本地数据库操作，OperationType => open = 0, close = 1, checkpoint = 2,
     * 数据库操作，包括 SELECT、UPDATE、DELETE、CREATE TABLE、CREATE INDEX 等 为 3
     */
    Database = 4,
    /** 本地文件操作
     *
     */
    File = 5,
    /**
     * 运行时状态操作
     */
    Runtime = 6,
    LinkKeep = 7
}
export declare const enum ReporterEventPriority {
    High = 0,
    Medium = 1,
    Low = 2
}
export declare class ReporterEvent {
    tag: ReporterEventTag;
    action: number | string;
    start_time: number;
    user_id: string;
    state: number;
    duration?: number;
    extension?: ReportEventExtension[];
    priority: number;
    trace_id: string;
    process_id?: string;
    exception_service?: string;
    succeed?: boolean;
}
export declare class ReporterResourceEvent extends ReporterEvent {
    operation_type: number;
    remote_addr: string;
    offset: number;
    full_size: number;
    transferred_size: number;
    lib_env: string;
}
export declare class ReporterAPIEvent extends ReporterEvent {
    class_name: string;
    api_name: string;
    error_msg: string;
    error_code: number;
    active_id: string;
    lag?: number;
    db?: string;
}
export declare class ReportEventExtension {
    operation_type: number | string;
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
    duration?: number;
    succeed?: boolean;
    constructor(b9: number | string, c9: string, d9: number, e9: string, f9?: string);
}
export declare class ReporterSyncEvent extends ReporterEvent {
    sync_begin_time: number;
    sync_end_time: number;
    sync_duration: number;
    overall_duration: number;
    description: string;
    net_type?: number;
    net_connect?: boolean;
}
export declare class ReporterSyncEventExtension {
    sync_type?: number;
    times?: number;
    total?: number;
    sync_duration: number;
    proc_duration?: number;
    description?: string;
    net_type?: number;
    net_connect?: boolean;
    constructor(u8: number, v8: number, w8: number, x8: number, y8: number, z8?: string);
}
export declare const guid: () => string;
