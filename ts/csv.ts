/*! csv v0.0.2 | MIT | © Hannes Dröse https://github.com/hd-code/web-snippets */

/**
 * @fileoverview
 * This file gives the possibility to transform arrays of objects to csv strings
 * and backwards.
 */

// -----------------------------------------------------------------------------

/** Converts an array of objects into a csv string. */
export function serialize<T>(data: T[]): string {
    const keys = extractKeys(data);
    const rows = makeRows(data, keys);
    return stringifyRows<any>([keys, ...rows]); // eslint-disable-line @typescript-eslint/no-explicit-any
}

/** Converts a csv string back to an array of objects. */
export function parse<T>(csv: string): T[] {
    const [keys, ...rows] = extractRows(csv);
    return parseObjects(keys as [keyof T], rows);
}

// --- serialize ---------------------------------------------------------------

function extractKeys<T>(data: T[]): (keyof T)[] {
    const keys: {[key: string]: true} = {};
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

function makeRows<T>(data: T[], keys: (keyof T)[]): T[keyof T][][] {
    return data.map(d => makeRow(d, keys));
}

function makeRow<T>(row: T, keys: (keyof T)[]): T[keyof T][] {
    return keys.map(key => row[key]);
}

function stringifyRows<T>(dataLines: T[][]): string {
    const result = dataLines.map(line => stringifyRow(line));
    return result.join('\n');
}

function stringifyRow<T>(data: T[]): string {
    const result = data.map(entry => stringifyEntry(entry));
    return result.join(',');
}

function stringifyEntry<T>(entry: T): string {
    if (entry === undefined || typeof entry === 'function') {
        return '';
    }

    if (typeof entry === 'object') {
        return escape(JSON.stringify(entry));
    }

    return escape('' + entry);
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

const regexRow = /(([^\n"])|("([^"]|"")*"))+/g;
const regexEntry = /(([^,"])|("([^"]|"")*"))+/g;
const regexEscaped = /("([^"]|"")*")/g;
const regex2Quotes = /""/g;

function extractRows(csv: string): string[][] {
    const rows = csv.match(regexRow);
    if (!rows) {
        return [['invalid file']];
    }
    return rows.map(extractRow);
}

function extractRow(row: string): string[] {
    const entries = row.match(regexEntry);
    return entries === null ? [] : entries;
}

function parseObjects<T>(keys: (keyof T)[], rows: string[][]): T[] {
    return rows.map(row => parseObject(keys, row));
}

function parseObject<T>(keys: (keyof T)[], values: string[]): T {
    const result = {} as T;
    keys.forEach((key, index) => {
        const value = values[index];
        if (value !== undefined) {
            result[key] = parseValue(value);
        }
    });
    return result;
}

function parseValue<T>(value: string): T {
    switch (value) {
        case '': return undefined as unknown as T;
        case 'null': return null as unknown as T;
        case 'false': return false as unknown as T;
        case 'true': return true as unknown as T;
    }

    const num = +value;
    if (!isNaN(num)) {
        return num as unknown as T;
    }

    if (isEscaped(value)) {
        return unescape(value) as unknown as T;
    }

    return value as unknown as T;
}

function isEscaped(string: string): boolean {
    return regexEscaped.test(string);
}

function unescape(string: string): string {
    const result = string.substring(1, string.length - 1);
    return result.replace(regex2Quotes, '"');
}
