import { ColumnInfo, ColumnType, RdbPredicates, RdbTableImpl, V2NIMErrorImpl, V2NIMErrorMap, V2NIMQueryDirection, V2NIMSortOrder, V2NIMTeamMemberRole, V2NIMTeamMemberRoleQueryType } from '@nimsdk/base'; import { V2NIMTeamMemberImpl } from './V2NIMTeamMemberImpl'; import { registerAspect } from './Aspect'; export var TABLE_TEAM_MEMBER; (function (h15) { let i15; (function (j15) { j15["TEAM_ID"] = "team_id"; j15["TEAM_TYPE"] = "team_type"; j15["ACCOUNT_ID"] = "account_id"; j15["MEMBER_ROLE"] = "member_role"; j15["TEAM_NICK"] = "team_nick"; j15["BITS"] = "bits"; j15["JOIN_TIME"] = "join_time"; j15["VALID"] = "valid"; j15["SERVER_EXTENSION"] = "server_extension"; j15["MUTE"] = "mute"; j15["INVITOR_ACCOUNT_ID"] = "invitor_account_id"; j15["UPDATE_TIME"] = "update_time"; })(i15 = h15.COL_ENUM || (h15.COL_ENUM = {})); h15.columnsInfo = [ new ColumnInfo(i15.TEAM_ID, ColumnType.TEXT, -1, false), new ColumnInfo(i15.TEAM_TYPE, ColumnType.INTEGER, -1, false), new ColumnInfo(i15.ACCOUNT_ID, ColumnType.TEXT, -1, false), new ColumnInfo(i15.MEMBER_ROLE, ColumnType.INTEGER, -1, true), new ColumnInfo(i15.TEAM_NICK, ColumnType.TEXT, -1, true), new ColumnInfo(i15.BITS, ColumnType.INTEGER, -1, true), new ColumnInfo(i15.JOIN_TIME, ColumnType.INTEGER, -1, true), new ColumnInfo(i15.VALID, ColumnType.INTEGER, -1, true), new ColumnInfo(i15.SERVER_EXTENSION, ColumnType.TEXT, -1, true), new ColumnInfo(i15.MUTE, ColumnType.INTEGER, -1, true), new ColumnInfo(i15.INVITOR_ACCOUNT_ID, ColumnType.TEXT, -1, true), new ColumnInfo(i15.UPDATE_TIME, ColumnType.INTEGER, -1, true) ]; h15.tableType = { tableName: 'team_member_table', columns: [ i15.TEAM_ID, i15.TEAM_TYPE, i15.ACCOUNT_ID, i15.MEMBER_ROLE, i15.TEAM_NICK, i15.BITS, i15.JOIN_TIME, i15.VALID, i15.SERVER_EXTENSION, i15.MUTE, i15.INVITOR_ACCOUNT_ID, i15.UPDATE_TIME ] }; })(TABLE_TEAM_MEMBER || (TABLE_TEAM_MEMBER = {})); const n13 = TABLE_TEAM_MEMBER.tableType.tableName; const l3 = '[TeamMemberTable]'; export class TeamMemberTable extends RdbTableImpl { constructor(f15, g15) { super(f15); this.logger = g15.logger; registerAspect(TeamMemberTable, g15); } async createTable() { try { this.createTableError = null; const b15 = { tableName: TABLE_TEAM_MEMBER.tableType.tableName, indexName: 'member_team_id_team_type_account_id_unique_index', columns: [ TABLE_TEAM_MEMBER.COL_ENUM.TEAM_TYPE, TABLE_TEAM_MEMBER.COL_ENUM.TEAM_ID, TABLE_TEAM_MEMBER.COL_ENUM.ACCOUNT_ID ] }; const c15 = { tableName: TABLE_TEAM_MEMBER.tableType.tableName, indexName: 'member_team_id_team_type_nick_index', columns: [ TABLE_TEAM_MEMBER.COL_ENUM.TEAM_TYPE, TABLE_TEAM_MEMBER.COL_ENUM.TEAM_ID, TABLE_TEAM_MEMBER.COL_ENUM.TEAM_NICK ] }; const d15 = { tableName: TABLE_TEAM_MEMBER.tableType.tableName, indexName: 'member_account_id', columns: [ TABLE_TEAM_MEMBER.COL_ENUM.TEAM_TYPE, TABLE_TEAM_MEMBER.COL_ENUM.ACCOUNT_ID ] }; const e15 = { tableName: TABLE_TEAM_MEMBER.tableType.tableName, indexName: 'query_by_option_index', columns: [ TABLE_TEAM_MEMBER.COL_ENUM.TEAM_TYPE, TABLE_TEAM_MEMBER.COL_ENUM.TEAM_ID, TABLE_TEAM_MEMBER.COL_ENUM.MEMBER_ROLE, TABLE_TEAM_MEMBER.COL_ENUM.MUTE, TABLE_TEAM_MEMBER.COL_ENUM.JOIN_TIME, TABLE_TEAM_MEMBER.COL_ENUM.ACCOUNT_ID, ] }; await Promise.all([ await this.rdbStoreManager.createTable(TABLE_TEAM_MEMBER.tableType.tableName, false, TABLE_TEAM_MEMBER.columnsInfo), await this.rdbStoreManager.createTableUniqueIndex(b15), await this.rdbStoreManager.createTableIndex(c15), await this.rdbStoreManager.createTableIndex(d15), await this.rdbStoreManager.createTableIndex(e15) ]); } catch (e) { this.logger.error(l3, 'create table data: teamMember', e); this.createTableError = e; } } async update(a15) { try { await this.ensureCreateTable(); this.logger.info(l3, 'update', a15); const predicates = new RdbPredicates(n13) .equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_ID, a15.teamId) .equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_TYPE, a15.teamType) .equalTo(TABLE_TEAM_MEMBER.COL_ENUM.ACCOUNT_ID, a15.accountId); const valueBucket = V2NIMTeamMemberImpl.generateUpdateBucket(a15); await this.rdbStoreManager.update(valueBucket, predicates); } catch (e) { this.logger.error(l3, 'update', a15, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code, desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message, detail: { reason: `team member update ${a15}`, rawError: e } }); } } } async updateInvitor(w14, x14, y14) { try { await this.ensureCreateTable(); this.logger.info(l3, 'updateInvitor', w14, x14, y14); for (const accountId of y14.keys()) { const z14 = y14.get(accountId); const predicates = new RdbPredicates(n13) .equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_ID, x14) .equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_TYPE, w14) .equalTo(TABLE_TEAM_MEMBER.COL_ENUM.ACCOUNT_ID, accountId); const valueBucket = {}; valueBucket[TABLE_TEAM_MEMBER.COL_ENUM.INVITOR_ACCOUNT_ID] = z14; await this.rdbStoreManager.update(valueBucket, predicates); } return; } catch (e) { this.logger.error(l3, 'updateInvitor', w14, x14, y14, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code, desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message, detail: { reason: `team member updateInvitor ${JSON.stringify(y14)}`, rawError: e } }); } } } async updateValidByTeamId(t14, u14, v14) { try { await this.ensureCreateTable(); this.logger.info(l3, 'updateValidByTeamId', t14, u14, v14); const predicates = new RdbPredicates(n13) .equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_ID, u14) .equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_TYPE, t14); const valueBucket = {}; valueBucket[TABLE_TEAM_MEMBER.COL_ENUM.VALID] = v14; await this.rdbStoreManager.update(valueBucket, predicates); return; } catch (e) { this.logger.error(l3, 'updateValidByTeamId', t14, u14, v14, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code, desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message, detail: { reason: `team member updateValidByTeamId teamType:${t14}, teamId:${u14}, inTeam:${v14}`, rawError: e } }); } } } async upsert(member) { try { await this.ensureCreateTable(); this.logger.info(l3, 'upsert member'); const r14 = []; if (member instanceof Array) { if (member.length <= 0) { this.logger.info(l3, 'upsert length <= 0 member', member); return; } member.map((s14) => { r14.push(s14.generateBucket()); }); } else { if (typeof member === 'undefined') { this.logger.info(l3, 'upsert member undefined'); return; } r14.push(member.generateBucket()); } this.logger.info(l3, 'upsert', r14.length); await this.rdbStoreManager.insertOrReplace(n13, r14); } catch (e) { this.logger.error(l3, 'upsert', member, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code, desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message, detail: { reason: `team member upsert ${member}`, rawError: e } }); } } } async queryTeamMember(p14, q14, accountId) { try { await this.ensureCreateTable(); const predicates = new RdbPredicates(n13); predicates.equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_TYPE, p14). and(). equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_ID, q14). and(). equalTo(TABLE_TEAM_MEMBER.COL_ENUM.ACCOUNT_ID, accountId); let values = await this.rdbStoreManager.query(predicates); if (values.length > 0) { return V2NIMTeamMemberImpl.buildFromValueBucket(values[0]); } else { return undefined; } } catch (e) { this.logger.error(l3, 'queryTeamMember', p14, q14, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code, desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message, detail: { reason: `team member queryTeamMember`, rawError: e } }); } } } async queryTeamMembersByTeams(l14, m14, accountId) { try { if (!m14 || m14.length <= 0 || typeof accountId === 'undefined') { return []; } await this.ensureCreateTable(); this.logger.info(l3, 'queryTeamMembersByTeams', l14, m14, accountId); const predicates = new RdbPredicates(n13) .in(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_ID, m14) .equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_TYPE, l14) .equalTo(TABLE_TEAM_MEMBER.COL_ENUM.ACCOUNT_ID, accountId); const values = await this.rdbStoreManager.query(predicates); const n14 = []; values.map(value => { const o14 = V2NIMTeamMemberImpl.buildFromValueBucket(value); n14.push(o14); }); return n14; } catch (e) { this.logger.error(l3, 'queryTeamMembersByTeams', l14, m14, accountId, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code, desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message, detail: { reason: `team member queryTeamMembersByTeams`, rawError: e } }); } } } async queryTeamMembers(g14, h14, i14) { try { if (!i14 || i14.length <= 0) { return []; } await this.ensureCreateTable(); this.logger.info(l3, 'queryTeamMembers', g14, h14, i14); const predicates = new RdbPredicates(n13) .equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_ID, h14) .equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_TYPE, g14) .in(TABLE_TEAM_MEMBER.COL_ENUM.ACCOUNT_ID, i14); let values = await this.rdbStoreManager.query(predicates); const j14 = []; values.map(value => { const k14 = V2NIMTeamMemberImpl.buildFromValueBucket(value); j14.push(k14); }); return j14; } catch (e) { this.logger.error(l3, 'queryTeamMembers', g14, h14, i14, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code, desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message, detail: { reason: `team member queryTeamMembers`, rawError: e } }); } } } async queryByOptions(w13, x13, y13, z13, direction, limit, offset) { try { await this.ensureCreateTable(); this.logger.info(l3, 'queryByOptions', w13, x13, y13, z13, direction, limit, offset); let a14 = ``; if (y13 === V2NIMTeamMemberRoleQueryType.V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_MANAGER) { a14 = ` AND ( ${TABLE_TEAM_MEMBER.COL_ENUM.MEMBER_ROLE} = ${V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_OWNER}
             OR ${TABLE_TEAM_MEMBER.COL_ENUM.MEMBER_ROLE} = ${V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER} ) `; } else if (y13 === V2NIMTeamMemberRoleQueryType.V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_NORMAL) { a14 = ` AND ${TABLE_TEAM_MEMBER.COL_ENUM.MEMBER_ROLE} = ${V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_NORMAL} `; } let b14 = ``; if (z13) { b14 = ` AND ${TABLE_TEAM_MEMBER.COL_ENUM.MUTE} = 1 `; } let c14 = ``; if (direction === V2NIMQueryDirection.V2NIM_QUERY_DIRECTION_ASC) { c14 = ` ORDER BY ${TABLE_TEAM_MEMBER.COL_ENUM.JOIN_TIME} ASC, ${TABLE_TEAM_MEMBER.COL_ENUM.ACCOUNT_ID} ASC `; } else { c14 = ` ORDER BY ${TABLE_TEAM_MEMBER.COL_ENUM.JOIN_TIME} DESC, ${TABLE_TEAM_MEMBER.COL_ENUM.ACCOUNT_ID} ASC `; } const querySql = `
        SELECT * FROM ${n13}
        WHERE ${TABLE_TEAM_MEMBER.COL_ENUM.TEAM_TYPE} = ${w13}
        AND ${TABLE_TEAM_MEMBER.COL_ENUM.TEAM_ID} = ${x13}
        ${a14}
        ${b14}
        ${c14}
        LIMIT ${limit} OFFSET ${offset}
      `; const valueBuckets = await this.rdbStoreManager.queryBySql(querySql); const d14 = []; valueBuckets.map((e14) => { const f14 = V2NIMTeamMemberImpl.buildFromValueBucket(e14); d14.push(f14); }); return d14; } catch (e) { this.logger.error(l3, 'queryByOptions', w13, x13, y13, z13, direction, limit, offset); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code, desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message, detail: { reason: `team member queryByOptions`, rawError: e } }); } } } async queryTeamMembersBy(q13, r13, order, s13) { try { await this.ensureCreateTable(); this.logger.info(l3, 'queryTeamMembersBy', q13, r13, r13, order); const t13 = `%${q13}%`; const predicates = new RdbPredicates(n13).equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_TYPE, r13); if (typeof s13 !== 'undefined' && typeof s13 === 'string') { predicates.and().equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_ID, s13); } if (order === V2NIMSortOrder.V2NIM_SORT_ORDER_ASC) { predicates.and().orderByAsc(TABLE_TEAM_MEMBER.COL_ENUM.JOIN_TIME); } else { predicates.and().orderByDesc(TABLE_TEAM_MEMBER.COL_ENUM.JOIN_TIME); } predicates.and().like(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_NICK, t13); let values = await this.rdbStoreManager.query(predicates); const u13 = []; values.map(value => { const v13 = V2NIMTeamMemberImpl.buildFromValueBucket(value); if (v13.inTeam) { u13.push(v13); } }); return u13; } catch (e) { this.logger.error(l3, 'queryTeamMembersBy', q13, r13, r13, order, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code, desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message, detail: { reason: `team member queryTeamMembersBy`, rawError: e } }); } } } async delete(o13, p13, accountId) { try { await this.ensureCreateTable(); this.logger.info(l3, 'delete', o13, p13, accountId); const predicates = new RdbPredicates(n13) .equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_TYPE, o13); if (p13) { predicates.equalTo(TABLE_TEAM_MEMBER.COL_ENUM.TEAM_ID, p13); } if (accountId) { predicates.equalTo(TABLE_TEAM_MEMBER.COL_ENUM.ACCOUNT_ID, accountId); } return await this.rdbStoreManager.delete(predicates); } catch (e) { this.logger.error(l3, 'delete', o13, p13, accountId, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.code, desc: V2NIMErrorMap.V2NIM_ERROR_CODE_UNKNOWN.message, detail: { reason: `team member delete`, rawError: e } }); } } } } 