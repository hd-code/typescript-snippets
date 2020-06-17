/*! obray v1.0.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */
/**
 * @file
 * This offers helpful functions to work on arrays and objects.
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
export declare function getPermutations<T>(array: T[], noDuplicates?: boolean): T[][];
/**
 * TypeGuard to check if a passed object contains the specified key.
 *
 * Also, you can check an array or a string if they have an entry at a specific
 * index. Just pass the array as the object parameter and the index as the key
 * to this function.
 *
 * Optional: You can pass a TypeGuard as a third argument to this function. If
 * the given key is found, the value associated with that key is then
 * type-checked by the TypeGuard.
 */
export declare function hasKey<T, U>(object: any, key: PropertyKey, typeGuard?: (k: any) => k is U): key is keyof T;
/**
 * TypeGuard to check if a value is an `array`.
 *
 * Optional: You can pass a typeGuard (`function`) as a second argument. This
 * will perform a type check on each element of the array. If the type check
 * fails on any element, the function will return false;
 */
export declare function isArray<T>(array: any, typeGuard?: (e: any) => e is T): array is T[];
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
 * TypeGuard to check if a value is an object. If the value is `null`, the type
 * guard will reject the value. However, just an empty object (like this: `{}`)
 * is valid. Arrays are also not accepted as valid objects. Use `isArray()`
 * function in that case.
 *
 * If you want to check the object for specific keys, use `hasKey()`.
 */
export declare function isObject(object: any): object is object;
