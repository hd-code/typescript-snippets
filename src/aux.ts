/** @file This file contains some auxiliary function that have found no other
 * place. */

/** Deep-clones the passed object.
 * 
 * _Attention_: If the object contains any functions, they will be removed. */
// TODO: Find solution for Classes and Dates
export function deepClone<T>(original: T): T {
    return JSON.parse(JSON.stringify(original));
}

/** Flattens a passed `n`-dimensional array. So after flattening the resulting
 * array as `n - 1` dimensions.
 * 
 * This is a pure function, so the original array will not be altered. */
export function flattenArray<T>(original: T[][]): T[] {
    return original.reduce((result, item) => result.concat(item), []);
}