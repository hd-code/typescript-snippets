/*! round 0.0.1 | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */
/** Rounds a number to the desired precision. The precisions specifies how many
 * digits after the decimal point should remain. A negative precision will round
 * before the decimal point. */
export declare function round(num: number, precision?: number): number;
export declare function round(vector: number[], precision?: number): number[];
export declare function round(matrix: number[][], precision?: number): number[][];
export declare function round(tensor: number[][][], precision?: number): number[][][];
