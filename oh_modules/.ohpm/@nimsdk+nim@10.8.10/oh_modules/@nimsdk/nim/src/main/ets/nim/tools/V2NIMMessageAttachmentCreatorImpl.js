import { V2Service } from '@nimsdk/base';
export default class V2NIMMessageAttachmentCreatorImpl extends V2Service {
    constructor(x148, y148, z148) {
        super(y148, x148);
        x148.messageAttachmentCreator = this;
    }
    createLocationMessageAttachment(u148, v148, w148) {
        return {
            latitude: typeof u148 === 'number' ? u148 : 0,
            longitude: typeof v148 === 'number' ? v148 : 0,
            address: typeof w148 === 'string' ? w148 : ''
        };
    }
    createCustomMessageAttachment(t148) {
        return {
            raw: typeof t148 === 'string' ? t148 : ''
        };
    }
}
