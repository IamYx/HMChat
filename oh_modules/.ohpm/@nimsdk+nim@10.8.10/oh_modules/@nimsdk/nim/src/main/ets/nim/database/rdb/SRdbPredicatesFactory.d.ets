import { RdbPredicates } from '@nimsdk/base';
import { SRdbPredicates } from './SRdbPredicates';
import dataRdb from '@ohos.data.relationalStore';
export declare class SRdbPredicatesFactory {
    static make(i51: RdbPredicates): SRdbPredicates;
    static transform(x50: SRdbPredicates, y50: dataRdb.RdbPredicates): void;
}
