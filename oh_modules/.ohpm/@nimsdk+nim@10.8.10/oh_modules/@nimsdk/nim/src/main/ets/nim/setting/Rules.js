import { getEnumValues, V2NIMP2PMessageMuteMode, V2NIMTeamMessageMuteMode, V2NIMTeamType } from '@nimsdk/base';
export const teamIdRules = {
    teamId: {
        type: 'string',
        regExp: /^[1-9]\d*$/,
        allowEmpty: false
    }
};
export const teamTypeRules = {
    teamType: {
        type: 'enum',
        values: [V2NIMTeamType.V2NIM_TEAM_TYPE_NORMAL, V2NIMTeamType.V2NIM_TEAM_TYPE_SUPER]
    }
};
export const muteModeRules = {
    muteMode: {
        type: 'enum',
        values: getEnumValues(V2NIMTeamMessageMuteMode)
    }
};
export const setP2PMessageMuteModeRule = {
    accountId: {
        type: 'string',
        required: true,
        allowEmpty: false
    },
    muteMode: {
        type: 'enum',
        required: true,
        values: getEnumValues(V2NIMP2PMessageMuteMode)
    }
};
const setOfflinePushConfigManufacturerRule = {
    type: 'object',
    required: false,
    rules: {
        certificateName: {
            type: 'string',
            required: true,
            allowEmpty: false
        },
        appId: {
            type: 'string',
            required: false,
            allowEmpty: false
        },
        appKey: {
            type: 'string',
            required: false,
            allowEmpty: false
        },
        secret: {
            type: 'string',
            required: false,
            allowEmpty: false
        }
    }
};
export const setOfflinePushConfigRules = {
    config: {
        type: 'object',
        required: true,
        rules: {
            apns: setOfflinePushConfigManufacturerRule,
            hwPush: setOfflinePushConfigManufacturerRule,
            miPush: setOfflinePushConfigManufacturerRule,
            vivoPush: setOfflinePushConfigManufacturerRule,
            oppoPush: setOfflinePushConfigManufacturerRule,
            honorPush: setOfflinePushConfigManufacturerRule,
            fcmPush: setOfflinePushConfigManufacturerRule,
            mzPush: setOfflinePushConfigManufacturerRule
        }
    }
};
export const setDndConfigRule = {
    fromH: { type: 'number', min: 0, max: 23, required: false },
    toH: { type: 'number', min: 0, max: 23, required: false },
    fromM: { type: 'number', min: 0, max: 59, required: false },
    toM: { type: 'number', min: 0, max: 59, required: false }
};
