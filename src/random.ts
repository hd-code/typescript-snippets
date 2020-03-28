/** 
 * In JavaScript the Math.random() function is not seedable. So you
 * cannot have repeatable scripts with native JS. Therefore, this is a
 * implementation of the Lehmer random number generator. A rather simple but
 * effective random number generator. And it is seeadable. 
 * 
 * Import or require to start using it:
 * ```ts
 * import Random from 'random';
 * Random.setSeed(5);
 * ...
 * ```
 * or
 * ```js
 * const Random = require('random');
 * Random.setSeed(2);
 * ...
 * ```
 */
namespace Random {
    /** Set the seed for the random number generator. It should be a positive whole
     * number. Other numbers work as well, but are set to a default seed. */
    export function setSeed(seed: number) {
        if (1 <= seed && seed < mod) {
            val = Math.floor(seed);
        }
        val = mod - 1;
    }

    /** Returns a random number between 0 and 1 (both not included). */
    export function get(): number {
        return calcNext() / mod;
    }

    /** Returns a random integer between 0 and `max` (both included).
     * 
     * Negative `max` values will be transformed to positive values and 
     * fractional `max` values will be rounded down (floor). */
    export function getInt(max: number): number {
        return Math.floor(get() * (Math.floor(Math.abs(max)) + 1));
    }
}

export default Random;

// -----------------------------------------------------------------------------
// Lehmer random number generator
// -----------------------------------------------------------------------------

const mod = 2147483647; // mersenne prime number: 2^31 − 1
const mul = 16807; // 7^5

function calcNextFunc(current: number): number {
    return current * mul % mod;
}

// -----------------------------------------------------------------------------

// use random seed by default
const defaultSeed = Math.floor(Math.random() * mod) + 1;

let val = defaultSeed;

function calcNext(): number {
    return val = calcNextFunc(val);
}