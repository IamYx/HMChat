import { V2InternalService } from '../V2NIMInternalService';
import { NIMDatabaseName } from './const';
import { RdbStoreManager } from './RdbStoreManager';
import { NIM } from '../../NIM';
export default interface V2NIMDatabaseServiceInternal extends V2InternalService {
    justBeforeOnLogin(accountId: string): Promise<void>;
    notifyDatabaseReady(accountId: string): Promise<void>;
    getDatabase(core: NIM, name: NIMDatabaseName): RdbStoreManager;
}
