/*! aux v1.3.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */

/**
 * @file
 * This file contains some auxiliary functions that have found no other place.
 */

/**
 * Clones an object, array or primitive value. It creates shallow clones only.
 * So, nested arrays or objects are copied only by reference. Changes to the
 * nested elements in the copy will effect the original and vice versa.
 * 
 * If deep clones are needed, use `deepClone()`. However, deep cloning is a lot
 * slower.
 *
 * _Attention_: Classes are not correctly cloned.
 * @param original Any object, array or primitive value to be cloned.
 */
export function clone<T>(original: T): T {
    if (Array.isArray(original)) return (original as any).slice();
    if (original !== null && typeof original === 'object') return {...original};
    return original;
}

/**
 * Clones a passed object, array or primitive value. It creates deep clones.
 * So nested arrays or objects will be copied as well. That means that the
 * original and the clone are completely independent from each other.
 * 
 * _Attention_: Classes are not correctly cloned.
 * @param original Any object, array or primitive value to be deep cloned.
 */
// TODO: Find solution for Classes and Dates
export function deepClone<T>(original: T): T {
    if (Array.isArray(original)) {
        let result: any = [];
        for (let i = 0, ie = original.length; i < ie; i++) {
            result[i] = deepClone(original[i]);
        }
        return result;
    }

    if (original !== null && typeof original === 'object') {
        let result: any = {};
        for (const key in original) {
            result[key] = deepClone(original[key]);
        }
        return result;
    }

    return original;
}

/**
 * Flattens a passed `n`-dimensional array. So after flattening the resulting
 * array as `n - 1` dimensions.
 * 
 * This is a pure function, so the original array will not be altered.
 * @param original The multi-dimensional array the should be reduced by one dimension.
 */
export function flattenArray<T>(original: T[][]): T[] {
    return original.reduce((result, item) => result.concat(item), []);
}

/** 
 * Basically does the same as `[].some()`. So, it determines whether any element
 * in the array satisfies the given callback function. However, this
 * implementation is a lot faster.
 * 
 * If an element returns true, the execution is stopped immediately and this
 * function returns true. If no element satisfies the callback function, this
 * function returns false.
 * @param array    The array to be checked.
 * @param callback Receives the elements in the array and returns either true or false.
 */
export function isInArray<T>(array: T[], callback: (e: T) => boolean): boolean {
    for (let i = 0, ie = array.length; i < ie; i++) {
        if (callback(array[i])) return true;
    }
    return false;
}

/**
 * Pauses the execution of an asynchronous function for a fixed duration.
 * @param milliseconds The duration the execution should be paused in milliseconds.
 */
export async function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
 }