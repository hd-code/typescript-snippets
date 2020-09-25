export function serialize<T>(data: T[]): string {
    const keys = extractKeys(data);
    const rows = extractRows(data, keys);
    return stringifyRows([keys, ...rows]);
}

export function parse<T>(csv: string): T[] {
    const [keys, ...rows] = parseRows(csv);
    return castObjects(keys as [keyof T], rows);
}

// --- serialize ---------------------------------------------------------------

function extractKeys<T>(data: T[]): (keyof T)[] {
    let keys: any = {};
    for (let i = 0, ie = data.length; i < ie; i++) {
        const row = data[i];
        for (const key in row) {
            if (!keys[key]) {
                keys[key] = true;
            }
        }
    }
    return Object.keys(keys) as (keyof T)[];
}

function extractRows<T>(data: T[], keys: (keyof T)[]): any[][] {
    let result = [];
    for (let i = 0, ie = data.length; i < ie; i++) {
        result[i] = extractRow(data[i], keys);
    }
    return result;
}

function extractRow<T>(row: T, keys: (keyof T)[]): any[] {
    let result = [];
    for (let i = 0, ie = keys.length; i < ie; i++) {
        const key = keys[i];
        result[i] = row[key];
    }
    return result;
}

function stringifyRows(dataLines: any[][]): string {
    const result = dataLines.map(line => stringifyRow(line));
    return result.join('\n');
}

function stringifyRow(data: any[]): string {
    const result = data.map(entry => stringifyEntry(entry));
    return result.join(',');
}

function stringifyEntry(entry: any): string {
    if (entry === undefined || typeof entry === 'function')
        return '';

    if (typeof entry === 'object')
        return escape(JSON.stringify(entry));

    return escape(''+entry);
}

function escape(string: string): string {
    return hasToBeEscaped(string)
        ? '"' + string.replace(/"/g, '""') + '"'
        : string;
}

function hasToBeEscaped(string: string): boolean {
    return string.includes(',') || string.includes('"') || string.includes('\n');
}

// --- parse -------------------------------------------------------------------

const regexRow = /(([^\n"])|("([^"]|"")*"))+/g
const regexEntry = /(([^,"])|("([^"]|"")*"))+/g
const regexEscaped = /("([^"]|"")*")/g
const regex2Quotes = /""/g

function parseRows(csv: string): string[][] {
    const rows = csv.match(regexRow);
    if (!rows) return [['invalid file']];

    let result = [];
    for (let i = 0, ie = rows.length; i < ie; i++) {
        result.push(parseRow(rows[i]));
    }
    return result;
}

function parseRow(row: string): string[] {
    const entries = row.match(regexEntry);
    if (!entries) return ['invalid row'];

    let result = [];
    for (let i = 0, ie = entries.length; i < ie; i++) {
        result.push(parseEntry(entries[i]));
    }
    return result;
}

function parseEntry(entry: string): any {
    switch (entry) {
        case '':      return undefined;
        case 'null':  return null;
        case 'false': return false;
        case 'true':  return true;
    }

    const num = +entry;
    if (!isNaN(num))
        return num;

    if (isEscaped(entry))
        return unescape(entry);

    return entry;
}

function isEscaped(string: string): boolean {
    return regexEscaped.test(string);
}

function unescape(string: string): string {
    const result = string.substring(1, string.length-1);
    return result.replace(regex2Quotes, '"');
}

function castObjects<T>(keys: (keyof T)[], rows: any[][]): T[] {
    let result = [];
    for (let i = 0, ie = rows.length; i < ie; i++) {
        result.push(castObject(keys, rows[i]));
    }
    return result;
}

function castObject<T>(keys: (keyof T)[], values: any[]): T {
    let result: any = {};
    for (let i = 0, ie = keys.length; i < ie; i++) {
        if (values[i] !== undefined) {
            result[keys[i]] = values[i];
        }
    }
    return result;
}