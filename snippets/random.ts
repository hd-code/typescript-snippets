/*! random v0.2.0 | MIT | https://github.com/hd-code/typescript-snippets */

/**
 * The JavaScript `Math.random()` function is not seedable. This package
 * provides an implementation of the Lehmer random number generator, which is
 * seedable.
 *
 * Make sure to set the seed only once in your application, ideally on startup.
 * @module random
 */

const MOD = 2147483647; // mersenne prime number: 2^31 − 1 -> 7FFF FFFF in hex
const MUL = 16807; // 7^5

let value: number = Math.floor(Math.random() * (MOD - 1)) + 1;
function lehmer(): number {
    value = (value * MUL) % MOD; // always between 1 and MOD-1
    return value - 1;
}

/** The maximum int value returned by `int()` without args. */
export const MAX_INT = MOD - 2;

/** Returns a random float between 0 and 1 (both included). */
export function float(): number;
/** Returns a random float between 0 and `max` (both included). */
export function float(max: number): number;
/** Returns a random float between `min` and `max` (both included). */
export function float(min: number, max: number): number;
export function float(arg1: number = 1, arg2: number = 0) {
    const min = Math.min(arg1, arg2);
    const max = Math.max(arg1, arg2);
    const range = max - min;
    return (lehmer() / MAX_INT) * range + min;
}

/** Returns a random int between 0 and `MAX_INT` (both included). */
export function int(): number;
/** Returns a random int between 0 and `max` (both included). */
export function int(max: number): number;
/** Returns a random int between `min` and `max` (both included). */
export function int(min: number, max: number): number;
export function int(arg1?: number, arg2?: number) {
    if (arg2 === undefined) {
        if (arg1 === undefined) {
            return lehmer();
        }

        return Math.round((lehmer() / MAX_INT) * Math.trunc(arg1));
    }

    if (arg1 === undefined) {
        return lehmer();
    }

    const min = Math.trunc(Math.min(arg1, arg2));
    const max = Math.trunc(Math.max(arg1, arg2));
    const range = max - min;

    return Math.round((lehmer() / MAX_INT) * range) + min;
}

/** Sets the seed for the random number generator. Defaults to 0. */
export function seed(s: number = 0) {
    value = Math.max(Math.trunc(Math.abs(s)) % MOD, 1);
}
