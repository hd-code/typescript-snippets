/*! type-guards v0.0.2 | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */
export declare function isUndefined(value: unknown): value is undefined;
export declare function isNull(value: unknown): value is null;
export declare function isBool(bool: unknown): bool is boolean;
export declare function isInteger(num: unknown): num is number;
export declare function isNumber(num: unknown): num is number;
export declare function isString(str: unknown): str is string;
export declare function isArray<T>(arr: unknown, typeGuard?: (el: unknown) => el is T): arr is T[];
export declare function isObject<T>(obj: unknown): obj is T;
export declare function hasKey<T>(obj: unknown, key: keyof T, typeGuard?: (el: unknown) => el is T[keyof T]): key is keyof T;
