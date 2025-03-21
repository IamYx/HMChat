import { ColumnType } from "@nimsdk/base";
export function createTableSql(w52, x52, y52, z52) {
    try {
        let b53 = `CREATE TABLE IF NOT EXISTS ${w52}(`;
        if (typeof x52 === 'string') {
            b53 = b53.concat(`${x52} INTEGER PRIMARY KEY AUTOINCREMENT, `);
        }
        for (let c53 of y52) {
            b53 = b53.concat(`${c53.name} ${c53.type}`);
            b53 = b53.concat(`${c53.length && c53.length > 0 ? `(${c53.length})` : ''}`);
            b53 = b53.concat(`${c53.nullable ? '' : ' NOT NULL'}`);
            b53 = concatDefaultValue(b53, c53);
            b53 = b53.concat(', ');
        }
        if (z52 && z52.length > 0) {
            b53 = b53.concat('PRIMARY KEY (' + z52.join(', ') + ')');
            b53 = b53.concat(', ');
        }
        b53 = `${b53.substring(0, b53.length - 2)})`;
        return b53;
    }
    catch (a53) {
        return '';
    }
}
export function createTableIndex(r52, s52, t52) {
    let u52 = `CREATE INDEX IF NOT EXISTS ${s52} ON ${r52}(`;
    for (let v52 of t52) {
        u52 = u52.concat(`${v52}`);
        u52 = u52.concat(', ');
    }
    u52 = `${u52.substring(0, u52.length - 2)})`;
    return u52;
}
export function createTableUniqueIndex(m52, n52, o52) {
    let p52 = `CREATE UNIQUE INDEX IF NOT EXISTS ${n52} ON ${m52}(`;
    for (let q52 of o52) {
        p52 = p52.concat(`${q52}`);
        p52 = p52.concat(', ');
    }
    p52 = `${p52.substring(0, p52.length - 2)})`;
    return p52;
}
export function queryTableInfoSql(k52) {
    let l52 = `PRAGMA TABLE_INFO(`;
    l52 = l52.concat(`${k52}`);
    l52 = l52.concat(')');
    return l52;
}
export function addTableColumnSql(h52, i52) {
    let j52 = `ALTER TABLE ${h52} ADD `;
    j52 = j52.concat(`${i52.name} ${i52.type}`);
    j52 = j52.concat(`${i52.length && i52.length > 0 ? `(${i52.length})` : ''}`);
    j52 = j52.concat(`${i52.nullable ? '' : ' NOT NULL'}`);
    j52 = concatDefaultValue(j52, i52);
    return j52;
}
export function deleteTableSql(g52) {
    return `DROP TABLE IF EXISTS ${g52}`;
}
export function clearTableSql(f52) {
    return `DELETE FROM ${f52}`;
}
function concatDefaultValue(d52, e52) {
    if (typeof e52.defaultValue === 'undefined') {
        return d52;
    }
    switch (e52.type) {
        case ColumnType.INTEGER:
            d52 = d52.concat(` DEFAULT ${e52.defaultValue} `);
            break;
        case ColumnType.BOOLEAN:
            d52 = d52.concat(` DEFAULT ${e52.defaultValue ? 'true' : 'false'} `);
            break;
        case ColumnType.TEXT:
            d52 = d52.concat(` DEFAULT '${e52.defaultValue.replace(/'/g, "''")}' `);
            break;
        case ColumnType.BLOB:
        default:
            break;
    }
    return d52;
}
