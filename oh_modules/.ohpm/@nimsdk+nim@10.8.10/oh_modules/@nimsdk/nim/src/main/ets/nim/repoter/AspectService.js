import util from '@ohos.util';
import { ReporterEventFactory } from './event/ReporterEventFactory';
import systemDateTime from "@ohos.systemDateTime";
export class AspectService {
    constructor(r98) {
        this.core = r98;
        this.apiTraceLRU = new util.LRUCache();
    }
    addAspect(z97, a98) {
        util.Aspect.addBefore(z97, a98, false, (n98, o98, p98) => {
            const q98 = systemDateTime.getTime();
            this.apiTraceLRU.put(q98, `${a98}_key`);
            Reflect.set(n98, `${a98}_key`, q98);
            return o98;
        });
        util.Aspect.addAfter(z97, a98, false, (b98, c98, d98) => {
            const e98 = Reflect.get(b98, `${a98}_key`);
            const f98 = this.apiTraceLRU.get(e98);
            this.apiTraceLRU.remove(e98);
            if (f98 === `${a98}_key`) {
                const g98 = {
                    class_name: b98.constructor.name,
                    api_name: a98
                };
                const h98 = (j98, k98) => {
                    const l98 = systemDateTime.getTime() - e98;
                    g98.duration = l98;
                    g98.state = k98 ? 1 : 0;
                    if (k98) {
                        g98.error_code = j98;
                        g98.error_msg = k98 + JSON.stringify(d98);
                    }
                    const m98 = ReporterEventFactory.createEvent("nim_api_trace", g98);
                    this.core.reporterService.addAPIEvent(m98);
                };
                if (c98 && typeof c98.then === 'function') {
                    g98.action = 1;
                    c98.then(() => h98()).catch((i98) => h98(i98?.code ?? 500, i98?.desc ?? 'Unknown error'));
                }
                else {
                    g98.action = 0;
                    h98();
                }
            }
            return c98;
        });
    }
    addDatabaseAspect(g97, h97) {
        util.Aspect.addBefore(g97, h97, false, (v97, w97, x97) => {
            const y97 = systemDateTime.getTime();
            this.apiTraceLRU.put(y97, `${h97}_key`);
            Reflect.set(v97, `${h97}_key`, y97);
            return w97;
        });
        util.Aspect.addAfter(g97, h97, false, (i97, j97, k97) => {
            const l97 = Reflect.get(i97, `${h97}_key`);
            const m97 = this.apiTraceLRU.get(l97);
            this.apiTraceLRU.remove(l97);
            if (m97 === `${h97}_key`) {
                let n97 = i97["rdbStoreManager"]?.dbName ?? 'db';
                const o97 = {
                    db: n97,
                    class_name: i97.constructor.name,
                    api_name: h97
                };
                let p97 = (r97, s97) => {
                    const t97 = systemDateTime.getTime() - l97;
                    o97.duration = t97;
                    if (t97 < 50) {
                        return;
                    }
                    o97.state = s97 ? 1 : 0;
                    o97.error_code = s97 ? r97 : 200;
                    o97.error_msg = s97;
                    const u97 = ReporterEventFactory.createEvent("nim_sdk_database_trace", o97);
                    this.core.reporterService.addAPIEvent(u97);
                };
                if (j97 && typeof j97.then === 'function') {
                    o97.action = 1;
                    j97.then(() => p97()).catch((q97) => p97(q97?.code ?? 500, q97?.desc ?? 'Unknown error'));
                }
                else {
                    o97.action = 0;
                    p97();
                }
            }
            return j97;
        });
    }
}
