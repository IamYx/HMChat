import { V2NIMErrorCode, V2NIMErrorImpl } from '@nimsdk/base'; const s41 = 'RevokeModel'; export class RevokeModel { constructor(w65, table) { this.core = w65; this.table = table; } async isRevoked(clientId) { try { let isRevoked = false; if (clientId) { let kvStore = await this.core.kvManager.getKVStore(this.core.account); const key = 'revoke_' + clientId; isRevoked = await kvStore.get(key); } if (isRevoked) { this.core.logger.info(s41, 'isRevoked', clientId); } return isRevoked; } catch (e) { return false; } } async markRevoked(clientId) { try { this.core.logger.info(s41, 'markRevoked', clientId); if (clientId) { let kvStore = await this.core.kvManager.getKVStore(this.core.account); const key = 'revoke_' + clientId; await kvStore.put(key, true); await this.table.deleteByClientId(clientId); } } catch (e) { this.core.logger.error(s41, `markRevoked`, e); throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `markRevoked ${JSON.stringify(e)}`, rawError: e } }); } } async deleteMessage(v65) { this.core.logger.info(s41, `deleteMessage  ${v65}`); await this.table.deleteByClientId(v65); } } 