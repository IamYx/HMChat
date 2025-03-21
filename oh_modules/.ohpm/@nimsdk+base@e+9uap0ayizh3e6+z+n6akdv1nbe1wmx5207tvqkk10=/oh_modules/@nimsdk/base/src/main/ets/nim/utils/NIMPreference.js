import dataPreferences from '@ohos.data.preferences';
export class NIMPreference {
    constructor(c25, d25) {
        this.context = c25;
        this.name = d25;
        this.isRejected = false;
        this.preferencePromise = this.initPreferences();
    }
    async getPreferences() {
        if (this.isRejected) {
            await this.initPreferences();
        }
        return await this.preferencePromise;
    }
    async deletePreferences() {
        try {
            await dataPreferences.deletePreferences(this.context, this.name);
        }
        catch (b25) {
            throw b25;
        }
        ;
    }
    async put(x24, y24) {
        try {
            const a25 = await this.getPreferences();
            await a25.put(x24, y24);
            a25.flush();
        }
        catch (z24) {
            throw z24;
        }
    }
    async has(u24) {
        try {
            const w24 = await this.getPreferences();
            return await w24.has(u24);
        }
        catch (v24) {
            throw v24;
        }
    }
    async get(q24, r24) {
        try {
            const t24 = await this.getPreferences();
            return await t24.get(q24, r24);
        }
        catch (s24) {
            return r24;
        }
    }
    async delete(n24) {
        try {
            const p24 = await this.getPreferences();
            await p24.delete(n24);
            p24.flush();
        }
        catch (o24) {
            throw o24;
        }
    }
    async deleteSync(k24) {
        try {
            const m24 = await this.getPreferences();
            await m24.delete(k24);
            m24.flush();
        }
        catch (l24) {
            throw l24;
        }
    }
    async flush() {
        try {
            const j24 = await this.getPreferences();
            j24.flush();
        }
        catch (i24) {
            throw i24;
        }
    }
    async onChange(g24) {
        const h24 = await this.getPreferences();
        h24.on('change', g24);
    }
    async onMultiChange(e24) {
        const f24 = await this.getPreferences();
        f24.on('multiProcessChange', e24);
    }
    async initPreferences() {
        this.isRejected = false;
        this.preferencePromise = dataPreferences.getPreferences(this.context, this.name)
            .then(d24 => {
            return d24;
        })
            .catch(c24 => {
            this.isRejected = true;
            throw c24;
        });
        return this.preferencePromise;
    }
}
