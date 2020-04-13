/*! type-guards v1.0.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */
/**
 * @file
 * This file contains several type guards that can be used for excessive type
 * checking in Typescript or Javascript.
 */
/** TypeGuard to check if a value is `null`. */
export declare function isNull(value: any): value is null;
/** TypeGuard to check if a value is a `boolean`. */
export declare function isBool(bool: any): bool is boolean;
/** TypeGuard to check if a value is a `number`. */
export declare function isNumber(number: any): number is number;
/** TypeGuard to check if a value is a `number` with no decimals. */
export declare function isInteger(number: any): number is number;
/** TypeGuard to check if a value is a `string`. */
export declare function isString(string: any): string is string;
/** TypeGuard to check if a value is a JS Date type. */
export declare function isDate(date: any): date is Date;
/**
 * TypeGuard to check if a value is an `array`.
 *
 * Optional: You can pass a typeGuard (`function`) as a second argument. This
 * will perform a type check on each element of the array. If the type check
 * fails on any element, the function will return false;
 */
export declare function isArray<T>(array: any, typeGuard?: (e: any) => e is T): array is T[];
/**
 * TypeGuard to check if a value is an object. If the value is `null`, the type
 * guard will reject the value. However, just an empty object (like this: `{}`)
 * is valid. Arrays are also not accepted as valid objects. Use `isArray()`
 * function in that case.
 *
 * If you want to check the object for specific keys, use `hasKey()`.
 */
export declare function isObject(object: any): object is object;
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
