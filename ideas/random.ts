/**
 * @file
 * The JavaScript Math.random() function is not seedable. This package provides
 * an implementation of the Lehmer random number generator. The generator is
 * seedable, but will use a random seed when none was set.
 *
 * Make sure to set the seed only once in your application, ideally on startup.
 */

// -----------------------------------------------------------------------------

/** Returns a random number between 0 and 1 (both included). */
export function getFloat(): number;
/** Returns a random number between 0 and `max` (both included). */
export function getFloat(max: number): number;
/** Returns a random number between `min` and `max` (both included). */
export function getFloat(min: number, max: number): number;

export function getFloat(arg1?: number, arg2?: number): number {
    let min = 0,
        max = 1;

    if (arg2 === undefined) {
        max = arg1 || max;
    } else {
        max = arg2;
        min = arg1 || min;
    }

    const diff = max - min;
    const rand = (getNext() - 1) / (mod - 2);

    return rand * diff + min;
}

// -----------------------------------------------------------------------------

/** The maximum integer that is returned by the `getInt()` function. */
export const MAX_INT = 2147483647 - 1;

// -----------------------------------------------------------------------------

/** Returns an integer between 0 and `MAX_INT` (both included). */
export function getInt(): number;
/** Returns an integer between 0 and `max` (both included).
 *
 * _Note:_ Decimals will be ignored.
 */
export function getInt(max: number): number;
/** Returns an integer between `min` and `max` (both included).
 *
 * _Note:_ Decimals will be ignored.
 */
export function getInt(min: number, max: number): number;

export function getInt(arg1?: number, arg2?: number): number {
    const rand = getNext() - 1;
    let min = 0,
        max = 0;

    if (arg1 === undefined) {
        if (arg2 === undefined) {
            return rand;
        }
        max = toInt(arg2);
    } else {
        if (arg2 === undefined) {
            max = toInt(arg1);
        } else {
            min = toInt(arg1);
            max = toInt(arg2);
        }
    }

    const diff = max - min;
    const mod = Math.abs(diff) + 1;

    const result = rand % mod;

    return (diff > 0 ? 1 : -1) * result + min;
}

// -----------------------------------------------------------------------------

/** Sets the seed for the random number generator to 0. */
export function setSeed(): void;

/** Sets the seed for the random number generator.
 *
 * _Note:_ Decimals will be ignored.
 */
export function setSeed(seed: number): void;

export function setSeed(seed?: number): void {
    if (!seed) {
        val = mod - 1;
        return;
    }

    val = Math.ceil(Math.abs(seed)) % mod;
}

// -----------------------------------------------------------------------------

function toInt(number: number): number {
    return number > 0 ? Math.floor(number) : Math.ceil(number);
}

// -----------------------------------------------------------------------------
// Lehmer random number generator
// -----------------------------------------------------------------------------

const mod = 2147483647; // mersenne prime number: 2^31 − 1 -> 7FFF FFFF in hex
const mul = 16807; // 7^5

// use random seed by default
const defaultSeed = Math.floor(Math.random() * mod) + 1;

let val = defaultSeed;

/** Returns an int between 1 and mod - 1 (both included) */
function getNext(): number {
    val = (val * mul) % mod;
    return val;
}
