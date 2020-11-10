/*! binary v0.0.1 | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */

// -----------------------------------------------------------------------------

/** Transforms a decimal number into a binary number. The returned binary number
 * is a string. Optionally, the number of digits the result should have can be
 * specified. */
export function toBinary(n: number, digits = 0): string {
    const bin = (n >>> 0).toString(2);
    let zeros = '';
    for (let i = 0, ie = digits; i < ie; i++) {
        zeros += '0';
    }
    return !digits ? bin : (zeros + bin).slice(-digits);
}

/** Transforms a decimal number into a binary number. The returned binary number
 * is an array of numbers. Optionally, the number of digits the result should
 * have can be specified. */
export function toBinaryString(n: number, digits?: number): number[] {
    const bin = toBinary(n, digits);
    const result = [];
    for (let i = 0, ie = bin.length; i < ie; i++) {
        result.push(parseInt(bin[i]));
    }
    return result;
}