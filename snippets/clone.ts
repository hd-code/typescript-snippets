/*! clone v0.1.0 | MIT | https://github.com/hd-code/typescript-snippets */

/**
 * Shallow and deep clone objects in JavaScript.
 * @module clone
 */

/**
 * Clones an object, array or primitive value. It creates shallow clones only.
 * So, nested arrays or objects are copied only by reference. Changes to the
 * nested elements in the copy will effect the original and vice versa.
 *
 * If deep clones are needed, use {@link deepClone}. However, deep cloning is a
 * lot slower.
 *
 * _Attention_: Classes are not correctly cloned.
 */
export function clone<T>(original: T): T {
    if (original instanceof Array) {
        return original.slice() as unknown as T;
    }

    if (original !== null && typeof original === "object") {
        return { ...original };
    }

    return original;
}

/**
 * Clones a passed object, array or primitive value. It creates deep clones.
 * So nested arrays or objects will be copied as well. That means that the
 * original and the clone are completely independent from each other.
 *
 * _Attention_: Classes are not correctly cloned.
 */
export function deepClone<T>(original: T): T {
    // TODO: Find solution for Classes and Dates
    if (original instanceof Array) {
        const result: T[] = [];
        for (let i = 0, ie = original.length; i < ie; i++) {
            result.push(deepClone(original[i]));
        }
        return result as unknown as T;
    }

    if (original !== null && typeof original === "object") {
        const result: Partial<T> = {};
        for (const key in original) {
            result[key] = deepClone(original[key]);
        }
        return result as T;
    }

    return original;
}
