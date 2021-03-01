/*! round 0.0.2 | MIT | © Hannes Dröse https://github.com/hd-code/web-snippets */
/** Rounds a number, vector, matrix or tensor to the desired precision. The
 * precisions specifies how many digits after the decimal point should remain.
 * A negative precision will round before the decimal point. */
export default function round<T extends number | number[] | number[][] | number[][][]>(input: T, precision?: number): T;
