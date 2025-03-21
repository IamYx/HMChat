export interface V2NIMLoginReconnectInternal {
    reset(): any;
    clearReconnectTimer(): any;
    attempt2ReLogin(): boolean;
    doReLogin(): any;
}
