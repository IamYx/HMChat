import { NIM, ReporterEvent } from '@nimsdk/base';
export declare class ReporterDB {
    private rdbStore;
    private table;
    constructor(t100: NIM, u100: string);
    createDB(): Promise<void>;
    addItem(s100: ReporterEvent): Promise<void>;
    getItem(r100: number): Promise<ReporterEvent[]>;
    deleteItems(q100: ReporterEvent[]): Promise<void>;
}
