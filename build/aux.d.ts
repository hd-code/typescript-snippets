/*! aux v1.0.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */
/**
 * @file
 * This file contains some auxiliary function that have found no other place.
 */
/**
 * Deep-clones the passed object.
 *
 * _Attention_: If the object contains any functions, they will be removed.
 */
export declare function deepClone<T>(original: T): T;
/**
 * Flattens a passed `n`-dimensional array. So after flattening the resulting
 * array as `n - 1` dimensions.
 *
 * This is a pure function, so the original array will not be altered.
 */
export declare function flattenArray<T>(original: T[][]): T[];
/**
 * Basically does the same as `[].some()`. So, it determines whether any
 * element in the array returns true for the given callback function. However,
 * this implementation is a lot faster.
 *
 * Use it to check if an array contains a certain kind(s) of element.
 */
export declare function isInArray<T>(array: T[], callback: (e: T) => boolean): boolean;
