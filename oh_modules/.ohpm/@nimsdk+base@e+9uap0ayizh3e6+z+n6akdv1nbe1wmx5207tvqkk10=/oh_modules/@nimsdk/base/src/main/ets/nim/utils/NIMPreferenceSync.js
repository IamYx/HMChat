import dataPreferences from '@ohos.data.preferences';
export class NIMPreferenceSync {
    constructor(t25, u25) {
        this.context = t25;
        this.name = u25;
        this.preference = dataPreferences.getPreferencesSync(this.context, { name: this.name });
    }
    put(q25, r25) {
        try {
            this.preference.putSync(q25, r25);
            this.preference.flush();
        }
        catch (s25) {
        }
    }
    batch(l25, m25, n25) {
        try {
            l25.map(p25 => {
                this.preference.putSync(p25, m25);
            });
            if (n25) {
                this.preference.flush();
            }
        }
        catch (o25) {
        }
    }
    has(j25) {
        try {
            return this.preference.hasSync(j25);
        }
        catch (k25) {
            return false;
        }
    }
    get(g25, h25) {
        try {
            return this.preference.getSync(g25, h25);
        }
        catch (i25) {
            return undefined;
        }
    }
    delete(e25) {
        try {
            this.preference.deleteSync(e25);
            this.preference.flush();
        }
        catch (f25) {
        }
    }
}
