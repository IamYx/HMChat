export function formatMultiEnterInfo(r7) {
    if (!(r7 && typeof r7 === 'string'))
        return;
    try {
        const s7 = JSON.parse(r7);
        return s7.map((t7) => ({
            roomNick: t7.room_nick,
            roomAvatar: t7.room_avatar,
            enterTime: t7.enter_time,
            clientType: t7.client_type
        }));
    }
    catch {
        return;
    }
}
