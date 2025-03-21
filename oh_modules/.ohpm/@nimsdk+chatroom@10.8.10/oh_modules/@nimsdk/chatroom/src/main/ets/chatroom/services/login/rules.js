import { getEnumValues, V2NIMErrorImpl, V2NIMLoginAuthType } from '@nimsdk/base';
import { locationRule } from '../Info/rules';
export const chatroomLoginRules = {
    roomId: {
        allowEmpty: false,
        type: 'string'
    },
    enterParams: {
        type: 'object',
        required: true,
        rules: {
            anonymousMode: {
                required: false,
                type: 'boolean'
            },
            accountId: {
                required: false,
                type: 'string',
                allowEmpty: false
            },
            token: {
                required: false,
                type: 'string',
                allowEmpty: false
            },
            roomNick: {
                required: false,
                type: 'string'
            },
            roomAvatar: {
                required: false,
                type: 'string'
            },
            loginOption: {
                type: 'object',
                required: false,
                rules: {
                    authType: {
                        type: 'enum',
                        required: false,
                        values: getEnumValues(V2NIMLoginAuthType)
                    },
                    tokenProvider: {
                        required: false,
                        type: 'func'
                    },
                    loginExtensionProvider: {
                        required: false,
                        type: 'func'
                    }
                }
            },
            linkProvider: {
                type: 'func'
            },
            serverExtension: {
                type: 'string',
                required: false,
                allowEmpty: false
            },
            notificationExtension: {
                type: 'string',
                required: false,
                allowEmpty: false
            },
            tagConfig: {
                type: 'object',
                required: false,
                rules: {
                    notifyTargetTags: {
                        type: 'string',
                        required: false
                    },
                    tags: {
                        type: 'array',
                        required: false,
                        itemType: 'string'
                    }
                }
            },
            locationConfig: {
                type: 'object',
                required: false,
                rules: locationRule
            },
            antispamConfig: {
                type: 'object',
                required: false,
                rules: {
                    antispamBusinessId: {
                        type: 'string',
                        required: false,
                        allowEmpty: false
                    }
                }
            }
        }
    }
};
export const validateLinkAddressArray = (o11) => {
    if (!Array.isArray(o11)) {
        throw new V2NIMErrorImpl({
            code: 400,
            message: 'linkAddressArray must be an array'
        });
    }
    else if (o11.length === 0) {
        throw new V2NIMErrorImpl({
            code: 400,
            message: 'linkAddressArray must not be empty'
        });
    }
    else {
        o11.forEach((p11) => {
            if (!p11) {
                throw new V2NIMErrorImpl({
                    code: 400,
                    message: 'linkAddress must not be empty'
                });
            }
        });
    }
};
