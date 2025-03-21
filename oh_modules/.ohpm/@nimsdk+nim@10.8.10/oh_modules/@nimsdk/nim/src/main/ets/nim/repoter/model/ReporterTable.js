import { ColumnInfo, ColumnType, RdbPredicates, RdbTableImpl } from '@nimsdk/base';
import { ReporterEvent } from '@nimsdk/base';
export const APM_EVENTS_TABLE = {
    tableName: 'events',
    columns: [
        "tag",
        "start_time",
        "user_id",
        "action",
        "duration",
        "state",
        "extension",
        "priority",
        "trace_id",
        "exception_service",
        "process_id"
    ]
};
export const ApmEventsColumns = [
    new ColumnInfo("tag", ColumnType.TEXT, -1, true),
    new ColumnInfo("start_time", ColumnType.INTEGER, -1, true),
    new ColumnInfo("user_id", ColumnType.TEXT, -1, true),
    new ColumnInfo("action", ColumnType.INTEGER, -1, true),
    new ColumnInfo("duration", ColumnType.INTEGER, -1, true),
    new ColumnInfo("state", ColumnType.INTEGER, -1, true),
    new ColumnInfo("extension", ColumnType.TEXT, -1, true),
    new ColumnInfo("priority", ColumnType.INTEGER, -1, true),
    new ColumnInfo("trace_id", ColumnType.TEXT, -1, true),
    new ColumnInfo("exception_service", ColumnType.TEXT, -1, true),
    new ColumnInfo("process_id", ColumnType.TEXT, -1, true)
];
export class ReporterTable extends RdbTableImpl {
    constructor(i102) {
        super(i102, APM_EVENTS_TABLE.tableName);
    }
    async createTable() {
        try {
            this.createTableError = null;
            const h102 = {
                tableName: APM_EVENTS_TABLE.tableName,
                indexName: 'START_TIME_PRIORITY_INDEX',
                columns: ["start_time", "priority"]
            };
            await Promise.all([
                await this.rdbStoreManager.createTable(APM_EVENTS_TABLE.tableName, false, ApmEventsColumns),
                await this.rdbStoreManager.createTableUniqueIndex(h102)
            ]);
        }
        catch (g102) {
            this.createTableError = g102;
        }
    }
    async addItem(d102) {
        try {
            if (typeof d102 === 'undefined') {
                return;
            }
            await this.ensureCreateTable();
            const f102 = generateBucket(d102);
            await this.rdbStoreManager.insertOrReplace(this.tableName, [f102]);
        }
        catch (e102) {
            throw e102;
        }
    }
    async getItem(x101) {
        try {
            await this.ensureCreateTable();
            const z101 = new RdbPredicates(this.tableName)
                .limitAs(x101)
                .orderByDesc('start_time')
                .orderByDesc('priority');
            const a102 = await this.rdbStoreManager.query(z101);
            let b102 = [];
            a102.map(c102 => {
                b102.push(getEventByValue(c102));
            });
            return b102;
        }
        catch (y101) {
            throw y101;
        }
    }
    async deleteItems(s101) {
        try {
            await this.ensureCreateTable();
            const u101 = s101.map(w101 => {
                return w101.trace_id;
            });
            const v101 = new RdbPredicates(this.tableName).in("trace_id", u101);
            await this.rdbStoreManager.delete(v101);
        }
        catch (t101) {
            throw t101;
        }
    }
}
function generateBucket(p101) {
    let q101 = {};
    APM_EVENTS_TABLE.columns.forEach((r101) => {
        switch (r101) {
            case "tag":
                q101[r101] = p101.tag;
                break;
            case "action":
                q101[r101] = p101.action;
                break;
            case "start_time":
                q101[r101] = p101.start_time;
                break;
            case "user_id":
                q101[r101] = p101.user_id;
                break;
            case "duration":
                q101[r101] = p101.duration;
                break;
            case "state":
                q101[r101] = p101.state;
                break;
            case "priority":
                q101[r101] = p101.priority;
                break;
            case "trace_id":
                q101[r101] = p101.trace_id;
                break;
            case "exception_service":
                q101[r101] = p101.exception_service;
                break;
            case "extension":
                q101[r101] = JSON.stringify(p101.extension);
                break;
            case "process_id":
                q101[r101] = p101.priority;
                break;
            default:
                break;
        }
    });
    return q101;
}
function getEventByValue(k101) {
    try {
        const m101 = new ReporterEvent();
        APM_EVENTS_TABLE.columns.forEach((n101) => {
            switch (n101) {
                case "tag":
                    m101.tag = k101[n101];
                    break;
                case "action":
                    m101.action = k101[n101];
                    break;
                case "start_time":
                    m101.start_time = k101[n101];
                    break;
                case "user_id":
                    m101.user_id = k101[n101];
                    break;
                case "state":
                    m101.state = k101[n101];
                    break;
                case "duration":
                    m101.duration = k101[n101];
                    break;
                case "priority":
                    m101.priority = k101[n101];
                    break;
                case "trace_id":
                    m101.trace_id = k101[n101];
                    break;
                case "process_id":
                    m101.process_id = k101[n101];
                    break;
                case "exception_service":
                    m101.exception_service = k101[n101];
                    break;
                case "extension":
                    const o101 = k101[n101];
                    m101.extension = o101 ? JSON.parse(o101) : {};
                    break;
                default:
                    break;
            }
        });
        return m101;
    }
    catch (l101) {
        return new ReporterEvent();
    }
}
