import { NIMLbsChosenProtocolFamily } from "./internal/types";
export const LINK_DEFAULT_TEST = 'imtest-jd.netease.im:8091';
export const LBS_DEFAULT_TEST = ['https://imtest.netease.im/lbs/webconf'];
const LINK_DEFAULT_ONLINE = 'weblink05.netease.im:443';
const LBS_DEFAULT_ONLINE = ['https://lbs.netease.im/lbs/webconf.jsp'];
export const LINK_DEFAULT = LINK_DEFAULT_ONLINE;
export const LBS_DEFAULT = LBS_DEFAULT_ONLINE;
export const CHOSEN_PROTOCOL_FAMILY_DEFAULT = NIMLbsChosenProtocolFamily.IPV4;
export const TIMEOUT_REQUEST = 1000 * 30;
