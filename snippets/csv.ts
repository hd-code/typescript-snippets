/*! csv v0.1.1 | MIT | https://github.com/hd-code/typescript-snippets */

/**
 * A module modeled after the `JSON` object. It provides a method to
 * `stringify()` an array of records to a csv formatted string. There is also
 * a method to `parse()` a csv formatted string back into an array of records.
 * @module csv
 */

const fieldDelim = ",";
const recordDelim = "\n";
const esc = '"';

type Key = string | number | symbol;
type Record<K extends Key, V> = { [key in K]?: V };

// -----------------------------------------------------------------------------

/**
 * Parse a csv formatted string into an array of records. The records' keys are
 * obtained from the csv header (the very first line).
 */
export function parse<K extends Key, V>(str: string): Record<K, V>[] {
    const rows = extractRows(str);
    return parseRecords(rows[0], rows.slice(1));
}

function parseRecords<K extends Key, V>(
    keys: K[],
    rows: string[][],
): Record<K, V>[] {
    return rows.map((row) => parseRecord(keys, row));
}

function parseRecord<K extends Key, V>(keys: K[], row: string[]): Record<K, V> {
    const result: Record<K, V> = {};
    for (let i = 0, ie = row.length; i < ie; i++) {
        const key = keys[i],
            value = row[i];
        if (value === "") {
            continue;
        }
        result[key] = parseField(value);
    }
    return result;
}

function parseField(str: string): any {
    switch (str) {
        case "":
        case "undefined":
            return undefined;
        case "null":
            return null;
        case "true":
            return true;
        case "false":
            return false;
    }

    const num = +str;
    if (!isNaN(num)) {
        return num;
    }

    str = unescape(str);
    switch (str[0]) {
        case "{":
        case "[":
            try {
                return JSON.parse(str);
            } catch (_) {
                return str;
            }
    }

    return str;
}

function extractRows(str: string): string[][] {
    const result: string[][] = [[]];
    let row = 0;

    let i = 0,
        start = 0,
        escaped = false;
    if (str[0] === esc) {
        i = start = 1;
        escaped = true;
    }
    const handleDelimiter = (record: boolean) => {
        if (escaped) {
            i += 1;
            return;
        }

        result[row].push(str.slice(start, str[i - 1] === esc ? i - 1 : i));
        if (str[i + 1] === esc) {
            i = start = i + 2;
            escaped = true;
        } else {
            i = start = i + 1;
            escaped = false;
        }

        if (record) {
            result.push([]);
            row++;
        }
    };

    while (i < str.length) {
        switch (str[i]) {
            case fieldDelim:
                handleDelimiter(false);
                break;

            case recordDelim:
                handleDelimiter(true);
                break;

            case esc:
                if (!escaped) {
                    throw `Encountered an unexpected escape character at position ${i}`;
                }

                switch (str[i + 1]) {
                    case undefined:
                    case fieldDelim:
                    case recordDelim:
                        escaped = false;
                        i += 1;
                        break;

                    case esc:
                        i += 2;
                        break;

                    default:
                        throw `Encountered an unexpected escape character at position ${i}`;
                }
                break;

            default:
                i += 1;
                break;
        }
    }

    handleDelimiter(false);

    return result;
}

function unescape(str: string): string {
    return str.replace(new RegExp(`${esc}${esc}`, "g"), esc);
}

// -----------------------------------------------------------------------------

/**
 * Converts an array of records into a csv formatted string. The records' keys
 * are encoded as csv header in the first line.
 */
export function stringify<K extends Key, V>(data: Record<K, V>[]): string {
    if (data.length === 0) {
        return "";
    }

    return stringifyRecords(data as Record<K, V>[]);
}

function stringifyRecords<K extends Key, V>(data: Record<K, V>[]): string {
    const keys = extractKeys(data);
    const rows = data.map((record) => stringifyRecord(record, keys as K[]));
    return (
        keys.join(fieldDelim) +
        "\n" +
        rows.map((row) => row.join(fieldDelim)).join("\n")
    );
}

function stringifyRecord<K extends Key, V>(
    record: Record<K, V>,
    keys: K[],
): string[] {
    return keys.map((key) =>
        key in record ? stringifyField(record[key]) : "",
    );
}

function stringifyField<T>(field: T): string {
    switch (typeof field) {
        case "boolean":
            return "" + field;

        case "bigint":
        case "number":
            return escape("" + field);

        case "string":
            return escape(field);

        case "object":
            return escape(JSON.stringify(field));
    }

    return "";
}

function extractKeys<K extends Key, V>(data: Record<K, V>[]): string[] {
    const keys: { [key: string]: boolean } = {};
    data.forEach((record) => {
        Object.keys(record).forEach((key) => (keys[key] = true));
    });
    return Object.keys(keys).map((key) => escape(key));
}

function escape(str: string): string {
    const result = str.replace(new RegExp(esc, "g"), `${esc}${esc}`);
    const regexStr = `[${fieldDelim}${recordDelim}${esc}]`;
    return new RegExp(regexStr).test(result) ? `${esc}${result}${esc}` : result;
}
