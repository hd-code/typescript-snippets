export function isBool(bool: any): bool is boolean {
    return typeof bool === 'boolean';
}

export function isInteger(num: any): num is number {
    return typeof num === 'number' && Math.floor(num) === num;
}

export function isNumber(num: any): num is number {
    return typeof num === 'number';
}

export function isString(str: any): str is string {
    return typeof str === 'string';
}

// -----------------------------------------------------------------------------

export function isArray<T>(arr: any, typeGuard?: (el: any) => el is T): arr is T[] {
    if (!Array.isArray(arr)) return false;
    if (!typeGuard) return true;
    for (let i = 0, ie = arr.length; i < ie; i++) {
        if (!typeGuard(arr[i])) {
            return false;
        }
    }
    return true;
}

export function isObject<T>(obj: any): obj is T {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

export function hasKey<T,U>(obj: any, key: keyof T, typeGuard?: (el: any) => el is U): key is keyof T {
    return !!obj?.hasOwnProperty(key) && (!typeGuard || typeGuard(obj[key]));
}
