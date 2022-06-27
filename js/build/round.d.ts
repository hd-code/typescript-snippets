/*! round 0.0.3 | MIT | https://github.com/hd-code/web-snippets */
declare type RecursiveArray<Type> = Array<RecursiveArray<Type> | Type>;
/** Rounds a number or an array of numbers of any depth to the desired
 * precision. The precisions specifies how many digits after the decimal point
 * should remain. A negative precision will round before the decimal point. */
export default function round<T extends number | RecursiveArray<number>>(input: T, precision?: number): T;
export {};
