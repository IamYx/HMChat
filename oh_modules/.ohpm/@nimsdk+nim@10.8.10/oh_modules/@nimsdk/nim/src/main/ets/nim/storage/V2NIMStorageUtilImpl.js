import { V2Service, validate } from '@nimsdk/base';
import { getThumbOrCoverUrl } from './rules';
export default class V2NIMStorageUtilImpl extends V2Service {
    constructor(d118, e118, f118) {
        super('V2NIMStorageUtil', d118);
        this.core = d118;
    }
    async onLoginStart(c118) {
        this.core.logger.info('V2NIMStorageUtilImpl', 'onLogin', c118);
    }
    async onLoginFinished(b118) {
    }
    onLogout() {
    }
    imageThumbUrl(z117, a118) {
        return z117 + `?imageView&thumbnail=${a118}z${a118}`;
    }
    videoCoverUrl(x117, y117) {
        if (x117.includes('?')) {
            return x117 + `&vframe&offset=${y117}`;
        }
        else {
            return x117 + `?vframe&offset=${y117}`;
        }
    }
    async getImageThumbUrl(r117, s117) {
        const t117 = r117;
        validate(getThumbOrCoverUrl, {
            _attachment: t117,
            thumbSize: s117
        }, '', true);
        const u117 = {
            height: 0
        };
        u117.width = s117?.width ?? 0;
        u117.height = s117?.height ?? 0;
        if (u117.width === 0 && u117.height === 0) {
            u117.width = 150;
        }
        let v117 = t117.url;
        try {
            v117 = await this.core.storageService.v2IShortUrlToLong(t117.url);
        }
        catch (w117) {
            this.core.logger.warn('shortUrlToLong error:', w117);
        }
        return {
            url: this.makeThumbUrl(v117, u117.width, u117.height)
        };
    }
    async getVideoCoverUrl(l117, m117) {
        const n117 = l117;
        validate(getThumbOrCoverUrl, {
            _attachment: n117,
            thumbSize: m117
        }, '', true);
        const o117 = {
            height: 0
        };
        o117.width = m117?.width ?? 0;
        o117.height = m117?.height ?? 0;
        if (o117.width === 0 && o117.height === 0) {
            o117.width = 150;
        }
        let p117 = n117.url;
        try {
            p117 = await this.core.storageService.v2IShortUrlToLong(n117.url);
        }
        catch (q117) {
            this.core.logger.warn('shortUrlToLong error:', q117);
        }
        return {
            url: this.makeVideoCoverUrl(p117, o117.width, o117.height)
        };
    }
    makeThumbUrl(h117, i117, j117) {
        const k117 = new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/);
        if (!k117.test(h117)) {
            this.logger.error('illegal file url:' + h117);
            return h117;
        }
        if (h117.includes('?')) {
            return h117 + `&imageView&thumbnail=${i117}x${j117}`;
        }
        else {
            return h117 + `?imageView&thumbnail=${i117}x${j117}`;
        }
    }
    makeVideoCoverUrl(d117, e117, f117) {
        const g117 = new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/);
        if (!g117.test(d117)) {
            this.logger.error('illegal file url:' + d117);
            return d117;
        }
        if (d117.includes('?')) {
            return d117 + `&vframe&offset=0&resize=${e117}x${f117}&type=png`;
        }
        else {
            return d117 + `?vframe&offset=0&resize=${e117}x${f117}&type=png`;
        }
    }
}
