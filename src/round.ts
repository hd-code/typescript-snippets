/*! round 0.0.1 | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */

/** Rounds a number, vector, matrix or tensor to the desired precision. The
 * precisions specifies how many digits after the decimal point should remain.
 * A negative precision will round before the decimal point. */
export default function round<T extends number|number[]|number[][]|number[][][]>(input: T, precision = 0): T {
    if (input instanceof Array) {
        const result = [];
        for (let i = 0, ie = input.length; i < ie; i++) {
            result.push(round(input[i], precision));
        }
        return result as T;
    }
    const factor = 10 ** precision;
    return Math.round((input as number) * factor) / factor as T;
}
