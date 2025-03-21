import { NIM, V2NIMDataSyncLevel, V2NIMDataSyncState, V2NIMDataSyncType, V2NIMErrorImpl, V2NIMLoginDataSyncInfo, V2NIMLoginDataSyncInternal, V2NIMLoginServiceInternal } from '@nimsdk/base/';
export default class V2NIMLoginDataSync implements V2NIMLoginDataSyncInternal {
    core: NIM;
    loginService: V2NIMLoginServiceInternal;
    datas: V2NIMLoginDataSyncInfo[];
    constructor(a86: NIM);
    switchDataSync(t85: V2NIMDataSyncType, u85: V2NIMDataSyncState, v85?: V2NIMErrorImpl): Promise<void>;
    setup(s85?: V2NIMDataSyncLevel): void;
    reset(): void;
}
