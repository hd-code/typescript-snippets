/*! hd-snippets-js v0.1.3 | MIT | Hannes Dröse git+https://github.com/hd-code/hd-snippets-js.git */
/** @file This file contains some auxiliary function that have found no other
 * place. */
/** Deep-clones the passed object.
 *
 * _Attention_: If the object contains any functions, they will be removed. */
export declare function deepClone<T>(original: T): T;
/** Flattens a passed `n`-dimensional array. So after flattening the resulting
 * array as `n - 1` dimensions.
 *
 * This is a pure function, so the original array will not be altered. */
export declare function flattenArray<T>(original: T[][]): T[];
