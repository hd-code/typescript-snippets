/*! obray v1.1.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */

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
 */
export function deepClone<T>(original: T): T { // TODO: Find solution for Classes and Dates
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
 */
export function flattenArray<T>(array: T[][]): T[] {
    return array.reduce((result, item) => result.concat(item), []);
}

/** Returns all possible permutations of the elements of an array. By setting
 * the `noDuplicates` flag, permutations that occur several times are removed,
 * so that the permutation just appears once. This can only happen if the
 * original array contains the same element at several positions. */
export function getPermutations<T>(array: T[], noDuplicates = false): T[][] {
    const permutations = permuteArray(array);
    return noDuplicates ? removeDuplicates(permutations) : permutations;
}

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
export function hasKey<T,U>(object: any, key: PropertyKey, typeGuard?: (k: any) => k is U): key is keyof T {
    return !!object && object.hasOwnProperty(key) && (!typeGuard || typeGuard(object[key]));
}

/**
 * TypeGuard to check if a value is an `array`.
 * 
 * Optional: You can pass a typeGuard (`function`) as a second argument. This 
 * will perform a type check on each element of the array. If the type check
 * fails on any element, the function will return false;
 */
export function isArray<T>(array: any, typeGuard?: (e:any) => e is T): array is T[] {
    if (!Array.isArray(array)) return false;
    if (!typeGuard) return true;

    // for loop is a lot fast than any functional implementation
    for (let i = 0, ie = array.length; i < ie; i++) {
        if (!typeGuard(array[i]))
            return false;
    }

    return true;
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
 * TypeGuard to check if a value is an object. If the value is `null`, the type 
 * guard will reject the value. However, just an empty object (like this: `{}`) 
 * is valid. Arrays are also not accepted as valid objects. Use `isArray()`
 * function in that case.
 * 
 * If you want to check the object for specific keys, use `hasKey()`.
 */
export function isObject(object:any): object is object {
    return typeof object === 'object' && object !== null && !Array.isArray(object);
}

/** Distributes the elements of an array into bins of equal size. If the number
 * of elements is not clearly dividable, the first bins will contain one more
 * element then the rest. */
export function splitEqual<T>(array:T[], bins: number): T[][] {
    const numOfElements = array.length;
    let index = 0;

    let result: T[][] = [];
    for (let i = 0; i < bins; i++) {
        const elementsForBin = Math.ceil((numOfElements - index) / (bins - i));

        result[i] = [];
        for (let j = 0; j < elementsForBin; j++) {
            result[i][j] = array[index++];
        }
    }
    return result;
}

// -----------------------------------------------------------------------------

function permuteArray<T>(array: T[]): T[][] {
    if (array.length <= 1) return [array];

    let result: T[][] = [];
    for (let i = 0, ie = array.length; i < ie; i++) {
        const first = array[i];
        const rest = array.filter((_,index) => i !== index);

        const permutations = permuteArray(rest);

        const tmpResult = permutations.map(per => [first, ...per]);
        result = result.concat(tmpResult);
    }
    return result;
}

function removeDuplicates<T>(tuples: T[][]): T[][] {
    return tuples.filter((tuple, index, tuples) => {
        for (let i = index + 1, ie = tuples.length; i < ie; i++) {
            if (isSameTuple(tuple, tuples[i])) return false;
        }
        return true;
    });
}

function isSameTuple<T>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((_, i) => a[i] === b[i]);
}