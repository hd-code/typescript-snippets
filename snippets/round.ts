/*! round v0.1.0 | MIT | https://github.com/hd-code/typescript-snippets */

/**
 * Utility for rounding numbers and arrays of numbers of arbitrary depth.
 * @module round
 */

type Tensor<T> = Tensor<T>[] | T;

/**
 * Rounds a number or an array of numbers of any depth to the desired precision.
 * The precisions specifies how many digits after the decimal point should
 * remain. A negative precision will round before the decimal point.
 */
export function round<T extends Tensor<number>>(x: T, precision = 0): T {
    if (x instanceof Array) {
        return x.map((y) => round(y, precision)) as T;
    }
    const factor = 10 ** Math.trunc(precision);
    return (Math.round((x as number) * factor) / factor) as T;
}
