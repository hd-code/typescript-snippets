/**
 * Pauses the execution of an asynchronous function for a fixed duration.
 * @param milliseconds The duration the execution should be paused in milliseconds.
 */
export async function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


// -----------------------------------------------------------------------------
// CSV
// -----------------------------------------------------------------------------

export function toCSV<T>(data: T[], noHeader?: boolean): string {
    let result = '';

    if (!noHeader) {
        result += getHeader(data[0]);
    }

    for (let i = 0, ie = data.length; i < ie; i++) {
        result += getData(data[i]);
    }

    return result.slice(0, -1);
}

// export function parseCSV<T>(csv: string): T {}

// -----------------------------------------------------------------------------

function getHeader<T>(obj: T): string {
    const result = Object.keys(obj);
    return toCSVLine(result);
}

function getData<T>(obj: T): string {
    const result = Object.values(obj);
    return toCSVLine(result);
}

function toCSVLine<T>(array: T[]): string {
    let result = '';
    for (let i = 0, ie = array.length; i < ie; i++) {
        result += escape('' + array[i]) + ',';
    }
    return result.slice(0, -1) + '\n';
}

function escape(string: string): string {
    return hasToBeEscaped(string)
        ? '"' + string.replace(/"/g, '""') + '"'
        : string;
}

function hasToBeEscaped(string: string): boolean {
    return string.includes(',') || string.includes('"');
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------


function extractValues(line: string): string[] {
    let rest = line;
    let result: string[] = [];
    while (rest.length >= 1) {
        const tmp = extractNextValue(rest);
        result.push(tmp.value);
        rest = tmp.rest;
    }
    return result;
}

function extractNextValue(string: string): { value: string, rest: string } {
    if (string[0] === '"') {
        let endPos = string.indexOf('"', 1);
        while (string[endPos + 1] === '"') endPos = string.indexOf('"', endPos + 2);

        let value = string.substring(1, endPos);
        value = value.replace(/""/g, '"');

        return { value, rest:  string.substring(endPos + 2) };
    }

    let commaPos = string.indexOf(',');
    if (commaPos === -1) commaPos = string.length;

    return {
        value: string.substring(0, commaPos),
        rest:  string.substring(commaPos + 1)
    };
}


// let testString = '13,14,"ein , Komma","ein Satz, mit ""vielen"", Kommas,",text ohne komma,25';

// const result = extractValues(testString);

// console.log(result);




// const test = [
//     { name: 'Hannes "Friedrich" Dröse', age: 24 },
//     { name: 'Patrick, Thurau', age: 30 },
//     { name: 'Nils Reimann', age: 21 },
// ];

// console.log(toCSV(test));