export interface V2NIMLoginLbsInternal {
    getLink(): Promise<string>;
    refresh(): any;
    discard(): any;
    reset(): any;
}
