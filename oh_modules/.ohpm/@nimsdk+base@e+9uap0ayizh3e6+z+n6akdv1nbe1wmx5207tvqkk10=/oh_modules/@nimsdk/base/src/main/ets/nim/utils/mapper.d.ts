/** 三段格式定义 */
export declare const clientTypeMap: {
    Android: number;
    iOS: number;
    PC: number;
    WindowsPhone: number;
    Web: number;
    Server: number;
    Mac: number;
};
export declare const clientTypeReverseMap: any;
export type ClientType = keyof typeof clientTypeMap;
export declare const sceneMap: {
    p2p: number;
    team: number;
    superTeam: number;
};
export declare const sceneReverseMap: any;
export type Scene = keyof typeof sceneMap;
export declare enum MsgTypeMap {
    text = 0,
    image = 1,
    audio = 2,
    video = 3,
    geo = 4,
    notification = 5,
    file = 6,
    tip = 10,
    robot = 11,
    g2 = 12,
    custom = 100
}
export type MsgType = keyof typeof MsgTypeMap;
