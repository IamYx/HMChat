import { invert } from '@nimsdk/vendor';
export const clientTypeMap = {
    Android: 1,
    iOS: 2,
    PC: 4,
    WindowsPhone: 8,
    Web: 16,
    Server: 32,
    Mac: 64
};
export const clientTypeReverseMap = invert(clientTypeMap);
export const sceneMap = {
    p2p: 0,
    team: 1,
    superTeam: 5
};
export const sceneReverseMap = invert(sceneMap);
export var MsgTypeMap;
(function (x22) {
    x22[x22["text"] = 0] = "text";
    x22[x22["image"] = 1] = "image";
    x22[x22["audio"] = 2] = "audio";
    x22[x22["video"] = 3] = "video";
    x22[x22["geo"] = 4] = "geo";
    x22[x22["notification"] = 5] = "notification";
    x22[x22["file"] = 6] = "file";
    x22[x22["tip"] = 10] = "tip";
    x22[x22["robot"] = 11] = "robot";
    x22[x22["g2"] = 12] = "g2";
    x22[x22["custom"] = 100] = "custom";
})(MsgTypeMap || (MsgTypeMap = {}));
