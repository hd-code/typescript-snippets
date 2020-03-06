/**
 * Deep-clones the passed object.
 *
 * Attention: If the object contains any functions, they will be removed.
 */
export declare function deepClone<T>(original: T): T;
/**
 * Flattens a passed `n`-dimensional array. So after flattening the resulting
 * array as `n - 1` dimensions.
 *
 * This is a pure function, so the original array will not be altered.
 */
export declare function flattenArray<T>(original: T[][]): T[];
