import { ColumnInfo, RdbStoreManager, RdbTableImpl, TableType } from '@nimsdk/base';
import { ReporterEvent } from '@nimsdk/base';
export declare const APM_EVENTS_TABLE: TableType;
export declare const ApmEventsColumns: ColumnInfo[];
export declare class ReporterTable extends RdbTableImpl {
    constructor(i102: RdbStoreManager);
    createTable(): Promise<void>;
    addItem(d102: ReporterEvent): Promise<void>;
    getItem(x101: number): Promise<ReporterEvent[]>;
    deleteItems(s101: ReporterEvent[]): Promise<void>;
}
