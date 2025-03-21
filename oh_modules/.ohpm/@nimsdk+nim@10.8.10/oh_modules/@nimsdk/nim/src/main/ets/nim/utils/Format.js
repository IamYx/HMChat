import { V2NIMMessageType } from "@nimsdk/base";
import { cloneDeep, set, unset } from "@nimsdk/vendor";
export function compatibleAttachmentRawWithV1(z151, a152) {
    const b152 = cloneDeep(z151);
    if (a152 === V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL) {
        const j152 = b152;
        j152.durations.map((k152) => {
            set(k152, 'accid', k152.accountId);
            unset(k152, 'accountId');
        });
    }
    else if (a152 === V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION) {
        const i152 = b152;
        set(i152, 'lat', i152.latitude);
        set(i152, 'lng', i152.longitude);
        set(i152, 'title', i152.address);
        unset(i152, 'latitude');
        unset(i152, 'longitude');
        unset(i152, 'address');
    }
    else if (a152 === V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE) {
        const h152 = b152;
        set(h152, 'h', h152.height);
        set(h152, 'w', h152.width);
        set(h152, 'ext', h152.ext?.startsWith('.') ? h152.ext.substring(1) : h152.ext);
        unset(h152, 'height');
        unset(h152, 'width');
    }
    else if (a152 === V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO) {
        const g152 = b152;
        set(g152, 'h', g152.height);
        set(g152, 'w', g152.width);
        set(g152, 'dur', g152.duration);
        set(g152, 'ext', g152.ext?.startsWith('.') ? g152.ext.substring(1) : g152.ext);
        unset(g152, 'height');
        unset(g152, 'width');
        unset(g152, 'duration');
    }
    else if (a152 === V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO) {
        const f152 = b152;
        set(f152, 'dur', f152.duration);
        unset(f152, 'duration');
        set(f152, 'ext', f152.ext?.startsWith('.') ? f152.ext.substring(1) : f152.ext);
    }
    else if (a152 === V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE) {
        const e152 = b152;
        set(e152, 'ext', e152.ext?.startsWith('.') ? e152.ext.substring(1) : e152.ext);
    }
    return JSON.stringify(b152, (c152, d152) => {
        if (c152 === 'raw') {
            return undefined;
        }
        return d152;
    });
}
export function twoDArrayWithObjectToString(r151, s151 = ',', t151 = ';') {
    let u151 = '';
    for (let v151 = 0; v151 < r151.length; v151++) {
        for (let w151 = 0; w151 < r151[v151].length; w151++) {
            let x151 = r151[v151][w151];
            if (typeof x151 === 'object') {
                let y151 = JSON.stringify(x151);
                u151 += y151;
            }
            else {
                u151 += x151;
            }
            if (w151 < r151[v151].length - 1) {
                u151 += s151;
            }
        }
        if (v151 < r151.length - 1) {
            u151 += t151;
        }
    }
    return u151;
}
