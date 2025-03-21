import { cmdConfigMessageCollect, cmdMapMessageCollect, registerParser, V2NIMErrorCode, V2NIMErrorImpl, V2NIMQueryDirection, validate } from '@nimsdk/base'; import { addCollectionRule, getCollectionListByOptionRule, removeCollectionRule, updateCollectionExtensionRule } from '../Rules'; import { CollectCloud } from './CollectCloud'; import { CollectionOption } from './CollectionOption'; const s41 = '[CollectService]'; export class CollectService { constructor(o50) { this.core = o50; registerParser(o50, { cmdMap: cmdMapMessageCollect, cmdConfig: cmdConfigMessageCollect }); this.cloud = new CollectCloud(o50); } async addCollection(params) { try { this.core.logger.info(s41, 'addCollection', params); validate(addCollectionRule, { params: params }, '', true); return await this.cloud.addCollection(params); } catch (e) { this.core.logger.error(s41, 'addCollection', params, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `addCollection ${JSON.stringify(e)}`, rawError: e } }); } } } async removeCollections(collections) { try { this.core.logger.info(s41, 'removeCollections', collections); validate(removeCollectionRule, { collections: collections }, '', true); return await this.cloud.removeCollections(collections); } catch (e) { this.core.logger.error(s41, 'removeCollections', collections, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `removeCollections ${JSON.stringify(e)}`, rawError: e } }); } } } async updateCollectionExtension(m50, n50) { try { this.core.logger.info(s41, 'updateCollectionExtension', m50, n50); validate(updateCollectionExtensionRule, { collection: m50, serverExtension: n50 }, '', true); return await this.cloud.updateCollectionExtension(m50, n50); } catch (e) { this.core.logger.error(s41, 'updateCollectionExtension', m50, n50, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `updateCollectionExtension ${JSON.stringify(e)}`, rawError: e } }); } } } async getCollectionListByOption(option) { try { this.core.logger.info(s41, 'getCollectionListByOption', option); validate(getCollectionListByOptionRule, option, '', true); let j50 = option.beginTime || 0; let endTime = option.endTime || 0; if (j50 !== 0 && endTime !== 0 && j50 > endTime) { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER, detail: { reason: 'getCollectionListByOption: beginTime cannot be greater than endTime' } }); } const direction = option.direction ?? V2NIMQueryDirection.V2NIM_QUERY_DIRECTION_DESC; if (option.anchorCollection?.collectionId !== undefined) { const l50 = option.anchorCollection.createTime; if (option.direction === V2NIMQueryDirection.V2NIM_QUERY_DIRECTION_DESC) { if (endTime === 0) { endTime = l50; } else if (endTime !== l50) { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER, detail: { reason: 'getCollectionListByOption: When providing anchorCollection, when sorting in descending order, endTime does not need to be provided, or endTime should be equal to anchorCollection.createTime' } }); } } else { if (j50 === 0) { j50 = l50; } else if (j50 !== l50) { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_INVALID_PARAMETER, detail: { reason: 'getCollectionListByOption: When providing anchorCollection, when sorting in ascending order, there is no need to provide beginTime, or beginTime should be equal to anchorCollection.createTime' } }); } } } const k50 = option.anchorCollection?.collectionId ? parseInt(option.anchorCollection.collectionId) : 0; const tag = new CollectionOption(j50, endTime, direction, k50, option.limit); if (option.collectionType !== 0) { tag.collectionType = option.collectionType; } return await this.cloud.getCollectionListByOption(tag); } catch (e) { this.core.logger.error(s41, 'getCollectionListByOption', option, e); if (e instanceof V2NIMErrorImpl || e.name === 'V2NIMError') { throw e; } else { throw new V2NIMErrorImpl({ code: V2NIMErrorCode.V2NIM_ERROR_CODE_UNKNOWN, detail: { reason: `getCollectionListByOption ${JSON.stringify(e)}`, rawError: e } }); } } } } 