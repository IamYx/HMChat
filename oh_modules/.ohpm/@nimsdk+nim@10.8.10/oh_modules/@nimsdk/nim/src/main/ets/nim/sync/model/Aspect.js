const MAIN_SYNC_TABLE_METHODS = [
    'queryBySyncKey',
    'upsertBySyncKey'
];
const MESSAGE_SYNC_TABLE_METHODS = [
    'queryBySyncKey',
    'upsertBySyncKey'
];
export function registerAspect(u140, v140, w140) {
    try {
        if (u140 == 'main_sync_table') {
        }
        else if (u140 == 'message_sync_table') {
        }
    }
    catch (x140) {
        w140.logger.error('Failed to register sync database aspects:', x140);
    }
}
