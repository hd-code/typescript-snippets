/*! binary v0.0.2 | MIT | © Hannes Dröse https://github.com/hd-code/web-snippets */

// -----------------------------------------------------------------------------

/** Transforms a decimal number into a binary number. The returned binary number
 * is an array of numbers. Optionally, the number of digits the result should
 * have can be specified. */
export function toBinary(number: number, digits?: number): number[] {
    return toBinaryString(number, digits)
        .split('')
        .map(digit => parseInt(digit));
}

/** Transforms a decimal number into a binary number. The returned binary number
 * is a string. Optionally, the number of digits the result should have can be
 * specified. */
export function toBinaryString(number: number, digits?: number): string {
    if (digits !== undefined && digits < 1) {
        return '';
    }
    let result = (number >>> 0).toString(2);
    if (digits === undefined) {
        return result;
    }
    while (result.length < digits) {
        result = '0' + result;
    }
    return result.slice(-digits);
}
