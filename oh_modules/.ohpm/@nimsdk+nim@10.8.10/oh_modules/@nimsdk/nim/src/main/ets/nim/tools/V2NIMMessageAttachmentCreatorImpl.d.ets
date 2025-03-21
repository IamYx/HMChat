import { NIM, NIMServiceConfig, NIMServiceName, V2NIMMessageAttachment, V2NIMMessageAttachmentCreatorInternal, V2NIMMessageLocationAttachment, V2Service } from '@nimsdk/base';
export default class V2NIMMessageAttachmentCreatorImpl extends V2Service implements V2NIMMessageAttachmentCreatorInternal {
    constructor(x148: NIM, y148: NIMServiceName, z148: NIMServiceConfig);
    createLocationMessageAttachment(u148: number, v148: number, w148: string): V2NIMMessageLocationAttachment;
    createCustomMessageAttachment(t148: string): V2NIMMessageAttachment;
}
