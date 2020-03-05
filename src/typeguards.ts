/** TypeGuard to check if a value is a `boolean`. */
export function isBool(bool: any): bool is boolean {
    return typeof bool === 'boolean';
}

/** TypeGuard to check if a value is a `number`. */
export function isNumber(num: any): num is number {
    return typeof num === 'number';
}

/** TypeGuard to check if a value is a `number` with no decimals. */
export function isInteger(num: any): num is number {
    return isNumber(num) && Math.floor(num) === num;
}

/** TypeGuard to check if a value is a `string`. */
export function isString(str: any): str is string {
    return typeof str === 'string';
}

/** TypeGuard to check if a value is a JS Date type. */
export function isDate(date: any): date is Date {
    return date instanceof Date;
}

/**
 * TypeGuard to check if a value is an `array`.
 * 
 * Optional: You can pass a TypeGuard (`function`) as a second argument. This 
 * will perform a type check on each element of the array. If the type check
 * fails on any element, the function will return false;
 */
export function isArray<T>(a: any, TypeGuard?: (e:any) => e is T): a is T[] {
    if (!Array.isArray(a)) return false;
    if (!TypeGuard) return true;

    for (let i = 0, ie = a.length; i < ie; i++) {
        if (!TypeGuard(a[i]))
            return false;
    }

    return true;
}

/**
 * TypeGuard to check if a value is an object. If the value is `null`, the type 
 * guard will reject the value. However, just an empty object (like this: `{}`) 
 * is valid. Arrays are also not accepted as valid objects. Use `isArray()`
 * function in that case.
 * 
 * If you want to check the object for specific keys, use `isKeyOfObject()`.
 */
export function isObject(obj:any): obj is object {
    return typeof obj === 'object' && obj !== null && !isArray(obj);
}

/**
 * TypeGuard to check if a value is an `object` and also contains the specified
 * `key`. (`{ key: ... }`)
 * 
 * Optional: You can pass a TypeGuard as a third argument to this function. If 
 * the given key is found, the value associated with that key is then 
 * type-checked by the TypeGuard.
 */
// TODO: find out if there is a better function signature?
export function isKeyOfObject<T,U>(obj: any, key: keyof T, keyTypeGuard?: (e:any) => e is U): obj is T {
    return isObject(obj) && obj.hasOwnProperty(key) && (!keyTypeGuard || keyTypeGuard((obj as any)[key]));
}