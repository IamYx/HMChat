export declare enum V2NIMDataSyncLevel {
    /**
     * 完全同步. 默认
     *
     * 注: harmony 端目前的“完全同步”就等同于“同步基础数据”，“完全同步”这个概念再未来会扩展到同步群成员与超级群成员。
     */
    V2NIM_DATA_SYNC_TYPE_LEVEL_FULL = 0,
    /**
     * 同步基础数据。
     */
    V2NIM_DATA_SYNC_TYPE_LEVEL_BASIC = 1
}
export declare const V2NIMDataSyncLevelValues: number[];
/**
 * 数据同步的类型
 */
export declare enum V2NIMDataSyncType {
    /**
     * 同步主数据
     */
    V2NIM_DATA_SYNC_TYPE_MAIN = 1
}
/**
 * 数据同步的状态
 */
export declare enum V2NIMDataSyncState {
    /**
     * 等待同步
     */
    V2NIM_DATA_SYNC_STATE_WAITING = 1,
    /**
     * 同步中
     */
    V2NIM_DATA_SYNC_STATE_SYNCING = 2,
    /**
     * 同步完成
     */
    V2NIM_DATA_SYNC_STATE_COMPLETED = 3
}
export interface V2NIMDataSyncDetail {
    /**
     * 类型
     */
    type: V2NIMDataSyncType;
    /**
     * 状态
     */
    state: V2NIMDataSyncState;
}
