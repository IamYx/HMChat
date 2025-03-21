import { Rules } from '@nimsdk/base';
export declare const chatroomInfoRule: Rules;
export declare const locationRule: Rules;
/**
 * 判断 updateParams 看上去有些多余。但是因为要检测其是否为空对象(allowEmpty: false)，因此需要这么写
 */
export declare const chatroomTagUpdateRule: Rules;
export declare const setTempChatBannedByTagRule: Rules;
