/*! aux v1.3.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */
/**
 * @file
 * This file contains some auxiliary function that have found no other place.
 */
/**
 * Transforms a decimal number into a binary number. The returned binary number
 * is a string.
 *
 * Also, it is possible to specify the number of digits the result should have.
 * This is optional.
 * @param n      The decimal number to be transformed.
 * @param digits (optional) The number of digits, the result should have.
 */
export declare function dec2bin(n: number, digits?: number): string;
/**
 * Transforms a decimal number into a binary number. The returned binary number
 * is an array of numbers.
 *
 * Also, it is possible to specify the number of digits the result should have.
 * This is optional.
 * @param n      The decimal number to be transformed.
 * @param digits (optional) The number of digits, the result should have.
 */
export declare function dec2binArray(n: number, digits?: number): number[];
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
export declare function clone<T>(original: T): T;
/**
 * Clones a passed object, array or primitive value. It creates deep clones.
 * So nested arrays or objects will be copied as well. That means that the
 * original and the clone are completely independent from each other.
 *
 * _Attention_: Classes are not correctly cloned.
 * @param original Any object, array or primitive value to be deep cloned.
 */
export declare function deepClone<T>(original: T): T;
/**
 * Flattens a passed `n`-dimensional array. So after flattening the resulting
 * array as `n - 1` dimensions.
 *
 * This is a pure function, so the original array will not be altered.
 * @param original The multi-dimensional array the should be reduced by one dimension.
 */
export declare function flattenArray<T>(original: T[][]): T[];
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
export declare function isInArray<T>(array: T[], callback: (e: T) => boolean): boolean;
/**
 * Pauses the execution of an asynchronous function for a fixed duration.
 * @param milliseconds The duration the execution should be paused in milliseconds.
 */
export declare function sleep(milliseconds: number): Promise<unknown>;
