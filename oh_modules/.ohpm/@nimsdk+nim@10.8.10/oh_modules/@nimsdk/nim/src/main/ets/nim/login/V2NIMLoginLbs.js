import { uniq } from '@nimsdk/vendor';
import { LoginLifeCycleEvent, V2NIMProtocolFamily, NIMLbsChosenProtocolFamily, CHOSEN_PROTOCOL_FAMILY_DEFAULT, } from '@nimsdk/base/';
const TAG = '[V2NIMLoginLbs]';
export default class V2NIMLoginLbs {
    constructor(a87) {
        this.fetchLbsIndex = 0;
        this.fetchLbsPromise = null;
        this.core = a87;
        this.loginService = a87.loginService;
        this.nimPreferenceSync = a87.preferenceSync;
        this.lbsCache = this.loginService.config.lbsUrls;
        this.linkCache = this.loadFromCache();
        if (this.linkCache && this.linkCache.cachedUrls && this.linkCache.cachedUrls.length > 0) {
            if (this.linkCache.isExpired()) {
                this.core.logger.info(TAG, 'link lbs cache expired refresh');
                this.refresh();
            }
            else if (this.linkCache.needFetchNew()) {
                this.core.logger.info(TAG, 'link lbs need fetch new');
                this.fetchLbs();
            }
        }
        else {
            this.core.logger.info(TAG, 'link fetch lbs');
            this.fetchLbs();
        }
    }
    saveToCache(z86) {
        this.core.logger.info(TAG, 'saveToCache', z86);
        this.nimPreferenceSync.put('socketLinkUrls', z86);
    }
    loadFromCache() {
        const v86 = this.nimPreferenceSync.get('socketLinkUrls', "");
        if (v86) {
            try {
                const x86 = JSON.parse(JSON.stringify(v86));
                const y86 = new LinkCache(x86.cachedUrls, x86.timestamp);
                if (y86 && y86.cachedUrls && y86.cachedUrls.length > 0) {
                    this.core.logger.info(TAG, 'loadFromCache', y86);
                    return y86;
                }
                else {
                    return null;
                }
            }
            catch (w86) {
                this.core.logger.error(TAG, 'loadFromCache', w86);
                return null;
            }
        }
    }
    async getLink() {
        this.loginService.lifeCycle.processEvent(LoginLifeCycleEvent.Addressing);
        if (this.linkCache && this.linkCache.cachedUrls && this.linkCache.cachedUrls.length > 0) {
            const u86 = this.linkCache.cachedUrls[0];
            this.core.logger.info(TAG, 'getLbsInfos:use cache link', u86);
            return Promise.resolve(u86);
        }
        else {
            this.fetchLbs();
            this.core.logger.info(TAG, 'first use config', this.loginService.config.linkUrl);
            return this.loginService.config.linkUrl;
        }
    }
    async fetchLbs() {
        if (!this.fetchLbsPromise) {
            this.fetchLbsPromise = this.performFetchLbs();
        }
        return this.fetchLbsPromise;
    }
    async performFetchLbs() {
        try {
            let o86 = this.chooseLbsProtocolFamily();
            const p86 = this.fetchLbsIndex % this.lbsCache.length;
            this.fetchLbsIndex += 1;
            const q86 = await this.doFetchLbs(this.lbsCache[p86], o86);
            this.core.logger.info(TAG, 'performFetchLbs', this.lbsCache[p86], q86);
            const r86 = q86[0];
            if (r86 && r86.length > 0) {
                const t86 = new LinkCache(r86, Date.now());
                this.linkCache = t86;
                this.saveToCache(t86);
            }
            const s86 = q86[1];
            this.lbsCache = s86;
            this.fetchLbsIndex = 0;
            this.core.logger.info(TAG, 'performFetchLbs fetched link', r86);
            return r86;
        }
        catch (n86) {
            this.core.logger.error(`V2NIMLoginService::lbs getLbsInfos error, use default link. error:`, n86);
            return [];
        }
        finally {
            this.fetchLbsPromise = null;
        }
    }
    async doFetchLbs(h86, i86) {
        const j86 = h86.indexOf('?') > -1 ? '&' : '?';
        const k86 = h86 + j86 + 'k=' + this.core.options.appkey + '&id=' + this.core.loginService.getLoginUser() + '&sv=180&pv=1&networkType=' + i86 + '&lv=1';
        this.core.logger.info(TAG, 'doFetchLbs', k86);
        const l86 = await this.loginService.doLoginStepsManager.add(this.core.httpService.request(k86));
        if (l86.code !== 200 || !l86.data) {
            this.core.logger.error(TAG, 'doFetchLbs', l86.code, l86);
            throw new Error(`V2NIMLoginService::getLbsInfos failed, status ${l86.code}`);
        }
        if (typeof l86.data === "string") {
            const m86 = JSON.parse(l86.data);
            return [
                uniq(m86.common['link'].concat(m86.common['mix.link']).concat(m86.common['link.default']).concat([this.loginService.config.linkUrl])),
                uniq([m86.common['lbs']].concat(m86.common['lbs.backup']).concat(this.loginService.config.lbsUrls))
            ];
        }
        else {
            return [];
        }
    }
    chooseLbsProtocolFamily() {
        let e86 = CHOSEN_PROTOCOL_FAMILY_DEFAULT;
        let f86 = this.loginService.config.supportProtocolFamily;
        if (f86 != null) {
            let g86 = f86;
            switch (g86) {
                case V2NIMProtocolFamily.IPV4: {
                    e86 = NIMLbsChosenProtocolFamily.IPV4;
                    break;
                }
                case V2NIMProtocolFamily.IPV6: {
                    e86 = NIMLbsChosenProtocolFamily.IPV6;
                    break;
                }
                case V2NIMProtocolFamily.DUAL_STACK: {
                    e86 = NIMLbsChosenProtocolFamily.DUAL_STACK;
                    break;
                }
            }
        }
        return e86;
    }
    reset() {
    }
    refresh() {
        this.linkCache = null;
        this.nimPreferenceSync.delete('socketLinkUrls');
        this.fetchLbs();
    }
    discard() {
        if (this.linkCache && this.linkCache.cachedUrls && this.linkCache.cachedUrls.length > 0) {
            this.linkCache.cachedUrls.pop();
            const d86 = new LinkCache(this.linkCache.cachedUrls, this.linkCache.timestamp);
            this.saveToCache(d86);
            if (this.linkCache.isExpired()) {
                this.refresh();
            }
            else if (this.linkCache.needFetchNew()) {
                this.fetchLbs();
            }
        }
        else {
            this.fetchLbs();
        }
    }
}
const CACHE_EXPIRATION_INTERVAL = 1000 * 3600 * 24 * 7;
const CACHE_REFRESH_INTERVAL = 1000 * 3600 * 24 * 1;
const CACHE_REFRESH_COUNT = 1;
class LinkCache {
    constructor(b86, c86) {
        this.cachedUrls = b86;
        this.timestamp = c86;
    }
    isExpired() {
        return (Date.now() - this.timestamp > CACHE_EXPIRATION_INTERVAL);
    }
    needFetchNew() {
        if (Date.now() - this.timestamp > CACHE_REFRESH_INTERVAL) {
            return true;
        }
        if (!this.cachedUrls) {
            return true;
        }
        if (this.cachedUrls.length <= CACHE_REFRESH_COUNT) {
            return true;
        }
        return false;
    }
}
