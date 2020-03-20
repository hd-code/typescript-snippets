/** Set the seed for the random number generator. It should be a positive whole
 * number. Other numbers work as well, but they are all set to a default seed. */
export function setSeed(seed: number) {
    if (1 <= seed && seed < mod) {
        val = Math.floor(seed);
    }
    val = mod - 1;
}

/** Returns a random number in the interval `[0,1)`. */
export function getRandom(): number {
    return next() / mod;
}

// -----------------------------------------------------------------------------
// Lehmer random number generator
// -----------------------------------------------------------------------------

const mod = 2147483647; // mersenne prime number: 2^31 − 1
const mul = 16807; // 7^5

function calcNext(current: number): number {
    return current * mul % mod;
}

// -----------------------------------------------------------------------------

// use random seed by default
const defaultSeed = Math.floor(Math.random() * mod) + 1;

let val = defaultSeed;

function next(): number {
    return val = calcNext(val);
}